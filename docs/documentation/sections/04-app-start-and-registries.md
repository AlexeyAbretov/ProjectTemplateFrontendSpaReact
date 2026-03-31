## 4. Старт приложения и регистры

Файл **`src/App/appInitializer.ts`** содержит три класса.

### PageRegistry

- **Назначение:** собрать все маршруты приложения из страниц.
- **Как работает:** при вызове `load()` использует `require.context('../pages', true, /index\.tsx$/)`, находит все `index.tsx` в `src/pages/`, импортирует их и для каждого модуля, у которого есть экспорт `routes`, добавляет эти роуты в общий массив.
- **Важно:** каждая страница должна экспортировать массив `routes` (формат React Router: `RouteObject[]`). Имена папок и файлов могут быть любыми, но **точка входа страницы — именно `index.tsx`** в своей папке.

### ModuleRegistry

- **Назначение:** собрать все редюсеры модулей в один Redux store и при старте заменить корневой редюсер на `combineReducers` из всех загруженных слайсов.
- **Как работает:** при вызове `load()` использует `require.context('@modules', true, /index\.ts/)`, находит все `index.ts` в `src/modules/`. Если у модуля есть экспорт `reducer` в формате `{ name: string, value: Reducer }`, то вызывается `registerModuleReducer(name, value)` и редюсер добавляется в store через `replaceReducer`.
- **Ключ в state:** свойство `reducer.name` становится ключом в корневом state (например, `Module1`, `Module2`). Селекторы должны обращаться к `state.Module1`, `state.Module2` и т.д.
- Модуль **может не экспортировать** `reducer` — тогда он просто не участвует в store (как Dashboard).

### AppInitializer

- Вызывает `PageRegistry.load()` и `ModuleRegistry.load()` в `init()`.
- Предоставляет `getRouter()` (роутер на основе собранных routes) и геттер `store` (единый store с динамическими редюсерами).

В **`App.tsx`** при рендере используются `appInitializer.store` и `appInitializer.getRouter()`; инициализация вызывается один раз при импорте (`appInitializer.init()`).
