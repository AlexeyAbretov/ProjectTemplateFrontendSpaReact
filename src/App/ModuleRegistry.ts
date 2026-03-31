import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { createJestWebpackContext, type WebpackRequireContext } from './WebpackRequireContext';

function getModulesRequireContext(): WebpackRequireContext {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return createJestWebpackContext('modules');
  }
  return require.context('@modules', true, /index\.ts$/);
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
    const context = getModulesRequireContext();

    context
      .keys()
      .filter(x => x.startsWith('./'))
      .forEach(key => {
        const module = context(key) as {
          reducer?: { name?: string; value: Reducer };
        };

        if (module.reducer) {
          const moduleName = module.reducer.name;

          if (moduleName) {
            this.registerModuleReducer(moduleName, module.reducer.value);
          }
        }
      });
  }
}
