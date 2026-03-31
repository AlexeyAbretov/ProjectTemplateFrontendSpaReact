import { createElement } from 'react';

import { collectHeaderNavLinks } from '../PageRegistry';

describe('collectHeaderNavLinks', () => {
  it('collects header entries and sorts by order then path', () => {
    const routes: AppPageRoute[] = [
      { path: '/b', element: createElement('span'), header: { label: 'B', order: 1 } },
      { path: '/a', element: createElement('span'), header: { label: 'A', order: 1 } },
      { path: '/', element: createElement('span'), header: { label: 'Home', order: 0 } },
    ];
    const links = collectHeaderNavLinks(routes);
    expect(links.map(l => l.to)).toEqual(['/', '/a', '/b']);
    expect(links.map(l => l.label)).toEqual(['Home', 'A', 'B']);
  });

  it('resolves relative child paths under parent', () => {
    const routes: AppPageRoute[] = [
      {
        path: '/parent',
        element: createElement('span'),
        header: { label: 'Parent' },
        children: [
          {
            path: 'child',
            element: createElement('span'),
            header: { label: 'Child' },
          },
        ],
      },
    ];
    const links = collectHeaderNavLinks(routes);
    expect(links).toContainEqual({ to: '/parent', label: 'Parent', order: 0 });
    expect(links).toContainEqual({ to: '/parent/child', label: 'Child', order: 0 });
  });

  it('skips wildcard routes even with header', () => {
    const routes: AppPageRoute[] = [
      { path: '*', element: createElement('span'), header: { label: '404' } },
    ];
    expect(collectHeaderNavLinks(routes)).toEqual([]);
  });
});
