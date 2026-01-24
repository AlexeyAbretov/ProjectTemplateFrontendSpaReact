import { createBrowserRouter, RouteObject } from 'react-router';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

export class PageRegistry {
  private _routes: RouteObject[] = [];

  registerRoutes(routes: RouteObject[]) {
    this._routes.push(...routes);
  }

  getRoutes() {
    return this._routes;
  }

  load() {
    const context = require.context('../pages', true, /index\.tsx$/);

    context
      .keys()
      .filter(x => x.startsWith('./'))
      .forEach(key => {
        const page = context(key);

        if (page.routes) {
          this.registerRoutes(page.routes);
        }
      });
  }
}

export class ModuleRegistry {
  private _store = configureStore({
    reducer: (state, action) => {
      const combined = combineReducers({ ...this.dynamicReducers });
      return combined(state, action);
    },
    preloadedState: undefined,
    devTools:
      NODE_ENV === 'development'
        ? {
            name: 'ModuleExampleStore',
            trace: true,
            traceLimit: 25,
          }
        : false,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  getStore() {
    return this._store;
  }

  private dynamicReducers: Record<string, Reducer> = {};

  registerModuleReducer(key: string, reducer: Reducer) {
    this.dynamicReducers[key] = reducer;
    this._store.replaceReducer(combineReducers({ ...this.dynamicReducers }));
  }

  load() {
    const context = require.context('@modules', true, /index\.ts$/);

    context
      .keys()
      .filter(x => x.startsWith('./'))
      .forEach(key => {
        const module = context(key);

        if (module.reducer) {
          const moduleName = module.reducer.name;

          if (moduleName) {
            this.registerModuleReducer(moduleName, module.reducer.value);
          }
        }
      });
  }
}

export class AppInitializer {
  private _pageRegistry = new PageRegistry();
  private _moduleRegistry = new ModuleRegistry();

  init() {
    this._pageRegistry.load();
    this._moduleRegistry.load();
  }

  getRouter() {
    return createBrowserRouter([...this._pageRegistry.getRoutes()]);
  }

  get store() {
    return this._moduleRegistry.getStore();
  }
}

export const appInitializer = new AppInitializer();
