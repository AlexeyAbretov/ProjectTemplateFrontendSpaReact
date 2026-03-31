import { createElement } from 'react';

import { AppInitializer, ModuleRegistry, PageRegistry } from '../appInitializer';

describe('PageRegistry', () => {
  afterEach(() => {
    delete (globalThis as { __jestWebpackPages?: unknown }).__jestWebpackPages;
  });

  it('registerRoutes and getRoutes', () => {
    const reg = new PageRegistry();
    reg.registerRoutes([{ path: '/a' }, { path: '/b' }]);
    expect(reg.getRoutes()).toHaveLength(2);
  });

  it('load imports routes from webpack context', () => {
    (globalThis as { __jestWebpackPages: Record<string, unknown> }).__jestWebpackPages = {
      './demo/index.tsx': () => ({
        routes: [{ path: '/demo', element: createElement('span') }],
      }),
    };
    const reg = new PageRegistry();
    reg.load();
    expect(reg.getRoutes().some(r => r.path === '/demo')).toBe(true);
  });
});

describe('ModuleRegistry', () => {
  afterEach(() => {
    delete (globalThis as { __jestWebpackModules?: unknown }).__jestWebpackModules;
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
    (globalThis as { __jestWebpackModules: Record<string, unknown> }).__jestWebpackModules = {
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
    delete (globalThis as { __jestWebpackPages?: unknown }).__jestWebpackPages;
    delete (globalThis as { __jestWebpackModules?: unknown }).__jestWebpackModules;
  });

  it('init loads registries and getRouter returns router config', () => {
    const init = new AppInitializer();
    init.init();
    const router = init.getRouter();
    expect(router).toBeDefined();
    expect(init.store).toBeDefined();
  });
});
