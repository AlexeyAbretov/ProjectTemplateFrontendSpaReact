import { createElement } from 'react';
import { createBrowserRouter } from 'react-router';

import { AppLayout } from './AppLayout';
import { ModuleRegistry } from './ModuleRegistry';
import { PageRegistry } from './PageRegistry';

export { ModuleRegistry } from './ModuleRegistry';
export { PageRegistry } from './PageRegistry';

export class AppInitializer {
  private _pageRegistry = new PageRegistry();
  private _moduleRegistry = new ModuleRegistry();

  init() {
    this._pageRegistry.load();
    this._moduleRegistry.load();
  }

  getRouter() {
    return createBrowserRouter([
      {
        element: createElement(AppLayout),
        children: this._pageRegistry.getRoutes(),
      },
    ]);
  }

  get store() {
    return this._moduleRegistry.getStore();
  }

  getHeaderNavLinks(): AppHeaderNavLink[] {
    return this._pageRegistry.getHeaderNavLinks();
  }
}

export const appInitializer = new AppInitializer();
