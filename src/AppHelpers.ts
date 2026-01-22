import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { store } from "@store";
import { createBrowserRouter, RouteObject } from "react-router";

export class PageRegistry {
  private _routes: RouteObject[] = [];

  registerRoutes(routes: RouteObject[]) {
    this._routes.push(...routes);
  }

  getRoutes() {
    return this._routes;
  }

  load() {
    const context = require.context('./pages', true, /index\.tsx$/);

    context.keys().filter(x => x.startsWith('./')).forEach((key) => {
      const page = context(key);

      if (page.routes) {
        this.registerRoutes(page.routes);
      }
    });
  };
}

export class ModuleRegistry {
  private _store;

  getStore() {
    return this._store;
  }

  private dynamicReducers: Record<string, Reducer> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(store: any) {
    this._store = store;
  }

  registerModuleReducer(key: string, reducer: Reducer) {
    this.dynamicReducers[key] = reducer;
    this._store.replaceReducer(combineReducers({ ...this.dynamicReducers }));
  }

  load() {
    const context = require.context('./modules', true, /index\.ts$/);

    context.keys().filter(x => x.startsWith('./')).forEach((key) => {
      const module = context(key);

      if (module.reducer) {
        const moduleName = module.reducer.name;

        if (moduleName) {
          this.registerModuleReducer(moduleName, module.reducer.value);
        }
      }
    })
  }
}

export class AppInitializer {
    private _pageRegistry = new PageRegistry();;
    private _moduleRegistry = new ModuleRegistry(store);

    init() {
        this._pageRegistry.load();
        this._moduleRegistry.load();
    }

    getRouter() {
        return createBrowserRouter([
            ...this._pageRegistry.getRoutes()
        ]);
    }

    getStore() {
        return this._moduleRegistry.getStore();
    }
}