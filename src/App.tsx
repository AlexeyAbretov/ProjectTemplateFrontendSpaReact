import React, { JSX } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { registerModuleReducer, store } from './store';
import { Provider } from 'react-redux';

class ModuleRegistry {
  private _routes: RouteObject[] = [];

  registerRoutes(routes: RouteObject[]) {
    this._routes.push(...routes);
  }

  getRoutes() {
    return this._routes;
  }
}

const moduleRegistry = new ModuleRegistry();

const loadPages = () => {
  // Webpack магия: ищем все index.ts внутри папок в src/modules
  // true означает рекурсивный поиск
  const context = require.context('./pages', true, /index\.tsx$/);

  context.keys().filter(x => x.startsWith('./')).forEach((key) => {
    const page = context(key);

    // 1. Если модуль экспортирует роуты
    if (page.routes) {
      moduleRegistry.registerRoutes(page.routes);
    }
  });
};

const loadModules = () => {
  // Webpack магия: ищем все index.ts внутри папок в src/modules
  // true означает рекурсивный поиск
  const context = require.context('./modules', true, /index\.ts$/);

  context.keys().filter(x => x.startsWith('./')).forEach((key) => {
    const module = context(key);

    // 2. Если модуль экспортирует редьюсер (например, под ключом 'reducer')
    // Мы берем имя папки как ключ для стора
    if (module.reducer) {
      const moduleName = module.reducer.name;

      if (moduleName) {
        registerModuleReducer(moduleName, module.reducer.value);
      }
    }
  });
};

loadPages();
loadModules();

const getRouter = () => createBrowserRouter([
  ...moduleRegistry.getRoutes()
]);

export const App: React.FC = (): JSX.Element => {
    return <Provider store={store}>
      <RouterProvider router={getRouter()} />
    </Provider>
}
