import { createElement } from 'react';
import type { RouteObject } from 'react-router';

import { AppInitializer, ModuleRegistry, PageRegistry } from '../AppInitializer';

/** Test-only globals used by `createJestWebpackContext` when `NODE_ENV === 'test'`. */
const jestWebpackGlobal = globalThis as typeof globalThis & {
  __jestWebpackPages?: Record<string, unknown>;
  __jestWebpackModules?: Record<string, unknown>;
};

describe('PageRegistry', () => {
  afterEach(() => {
    delete jestWebpackGlobal.__jestWebpackPages;
  });

  it('registerRoutes and getRoutes', () => {
    const reg = new PageRegistry();
    reg.registerRoutes([{ path: '/a' }, { path: '/b' }]);
    expect(reg.getRoutes()).toHaveLength(2);
  });

  it('load imports routes from webpack context', () => {
    jestWebpackGlobal.__jestWebpackPages = {
      './demo/index.tsx': () => ({
        routes: [{ path: '/demo', element: createElement('span') }],
      }),
    };
    const reg = new PageRegistry();
    reg.load();
    expect(reg.getRoutes().some(r => r.path === '/demo')).toBe(true);
  });

  it('getHeaderNavLinks collects header from registered routes', () => {
    const reg = new PageRegistry();
    reg.registerRoutes([
      {
        path: '/z',
        element: createElement('span'),
        header: { label: 'Z', order: 2 },
      },
      {
        path: '/a',
        element: createElement('span'),
        header: { label: 'A', order: 1 },
      },
    ] as unknown as RouteObject[]);
    expect(reg.getHeaderNavLinks()).toEqual([
      { to: '/a', label: 'A', order: 1 },
      { to: '/z', label: 'Z', order: 2 },
    ]);
  });
});

describe('ModuleRegistry', () => {
  afterEach(() => {
    delete jestWebpackGlobal.__jestWebpackModules;
  });

  const dummyReducer = (state: Record<string, unknown> = {}, action: { type: string }) => {
    if (action.type === 'test/ping') {
      return { ...state, ping: true };
    }
    return state;
  };

  it('registerModuleReducer updates store', () => {
    const reg = new ModuleRegistry();
    reg.registerModuleReducer('TestMod', dummyReducer);
    reg.getStore().dispatch({ type: 'test/ping' });
    expect((reg.getStore().getState() as { TestMod: { ping?: boolean } }).TestMod.ping).toBe(true);
  });

  it('load registers reducers from context', () => {
    jestWebpackGlobal.__jestWebpackModules = {
      './mod/index.ts': () => ({
        reducer: { name: 'DynMod', value: dummyReducer },
      }),
    };
    const reg = new ModuleRegistry();
    reg.load();
    reg.getStore().dispatch({ type: 'test/ping' });
    expect((reg.getStore().getState() as { DynMod: { ping?: boolean } }).DynMod.ping).toBe(true);
  });
});

describe('AppInitializer', () => {
  afterEach(() => {
    delete jestWebpackGlobal.__jestWebpackPages;
    delete jestWebpackGlobal.__jestWebpackModules;
  });

  it('init loads registries and getRouter returns router config', () => {
    const init = new AppInitializer();
    init.init();
    const router = init.getRouter();
    expect(router).toBeDefined();
    expect(init.store).toBeDefined();
  });
});
