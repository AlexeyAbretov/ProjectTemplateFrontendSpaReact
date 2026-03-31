import { RouteObject } from 'react-router';

import { createJestWebpackContext, type WebpackRequireContext } from './WebpackRequireContext';

function getPagesRequireContext(): WebpackRequireContext {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return createJestWebpackContext('pages');
  }
  return require.context('../pages', true, /index\.tsx$/);
}

function joinParentPath(parent: string, segment: string | undefined): string {
  if (segment === undefined || segment === '') {
    return parent;
  }
  if (segment.startsWith('/')) {
    return segment;
  }
  const base = parent === '/' ? '' : parent.replace(/\/$/, '');
  const suffix = segment.replace(/^\//, '');
  if (base === '') {
    return `/${suffix}`;
  }
  return `${base}/${suffix}`;
}

function walkRoutes(routes: AppPageRoute[], parentResolved: string, out: AppHeaderNavLink[]): void {
  for (const route of routes) {
    let resolved: string;
    if (route.index) {
      resolved = parentResolved;
    } else {
      resolved = joinParentPath(parentResolved, route.path);
    }

    const pathSegment = route.path;
    const isWildcard = pathSegment === '*' || pathSegment?.includes('*');

    if (route.header !== undefined && !isWildcard) {
      const to = resolved === '' ? '/' : resolved.startsWith('/') ? resolved : `/${resolved}`;
      out.push({
        to,
        label: route.header.label,
        order: route.header.order ?? 0,
      });
    }

    const children = route.children;
    if (children !== undefined && children.length > 0) {
      walkRoutes(children as AppPageRoute[], resolved, out);
    }
  }
}

export function collectHeaderNavLinks(routes: AppPageRoute[]): AppHeaderNavLink[] {
  const out: AppHeaderNavLink[] = [];
  walkRoutes(routes, '', out);
  return out.sort((a, b) => a.order - b.order || a.to.localeCompare(b.to));
}

export class PageRegistry {
  private _routes: RouteObject[] = [];

  registerRoutes(routes: RouteObject[]) {
    this._routes.push(...routes);
  }

  getRoutes() {
    return this._routes;
  }

  getHeaderNavLinks(): AppHeaderNavLink[] {
    return collectHeaderNavLinks(this._routes as AppPageRoute[]);
  }

  load() {
    const context = getPagesRequireContext();

    context
      .keys()
      .filter(x => x.startsWith('./'))
      .forEach(key => {
        const page = context(key) as { routes?: RouteObject[] };

        if (page.routes) {
          this.registerRoutes(page.routes);
        }
      });
  }
}
