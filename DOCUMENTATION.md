# Документация шаблона проекта (Project Template Frontend SPA React)

**⚠️ Важно**

Документация соответствует текущей версии шаблона. При изменении архитектуры или правил проекта обновляйте этот документ

---
Этот документ описывает модульную архитектуру шаблона, механизмы динамического роутинга и подключения слайсов Redux, а также пошаговые инструкции для разработчиков.

---

## Оглавление

1. [Обзор архитектуры](#1-обзор-архитектуры)
2. [Схема папок (дерево src/)](#2-схема-папок-дерево-src)
3. [Соглашения по именованию](#3-соглашения-по-именованию)
4. [Старт приложения и регистры](#4-старт-приложения-и-регистры)
5. [Страницы (Pages)](#5-страницы-pages)
6. [Модули (Modules)](#6-модули-modules)
7. [Как добавить новый модуль](#7-как-добавить-новый-модуль)
8. [Как добавить новую страницу и роуты](#8-как-добавить-новую-страницу-и-роуты)
9. [Навигация через CustomEvent](#9-навигация-через-customevent)
10. [Общие ресурсы (shared)](#10-общие-ресурсы-shared)
11. [Переменные окружения и API](#11-переменные-окружения-и-api)
12. [Тестирование и Storybook](#12-тестирование-и-storybook)
13. [Чек-лист для нового модуля](#13-чек-лист-для-нового-модуля)
14. [Типичный сценарий: экран «Каталог»](#14-типичный-сценарий-экран-каталог)

---

## 1. Обзор архитектуры

Проект построен по принципу **модульной SPA**: функциональность разбита на независимые модули, роуты и слайсы Redux подключаются **динамически** при старте приложения. Модули не регистрируются вручную в одном месте — они обнаруживаются через `require.context` по соглашению о структуре папок и экспортах.

### Основные сущности

| Сущность | Назначение |
|----------|------------|
| **Страница (Page)** | Компонент-композитор: подключает модули и объявляет роуты. Живёт в `src/pages/`. |
| **Модуль (Module)** | Изолированный блок функциональности со своим UI, стейтом (опционально) и логикой. Живёт в `src/modules/`. |
| **AppInitializer** | При старте приложения сканирует страницы и модули, собирает роуты и регистрирует редюсеры в одном store. |

### Поток инициализации

1. **Точка входа** — `index.tsx`: `createRoot(container).render(<App />)`.

2. **При первом импорте App** создаётся синглтон `appInitializer` и вместе с ним:
   - **PageRegistry** — пустой список роутов;
   - **ModuleRegistry** — в конструкторе сразу создаётся **store** (`configureStore` с заглушкой `combineReducers`), массив редюсеров пока пуст.

3. **При первом рендере App** вызывается `appInitializer.init()`:
   - **PageRegistry.load()** — `require.context('../pages', true, /index\.tsx$/)` обходит все `index.tsx` в `src/pages/`; у модулей с экспортом `routes` эти роуты добавляются в регистр;
   - **ModuleRegistry.load()** — `require.context('@modules', true, /index\.ts$/)` обходит все `index.ts` в `src/modules/`; у модулей с экспортом `reducer` (объект `{ name, value }`) редюсер регистрируется через `replaceReducer`, store собирается динамически.

4. **Рендер дерева**: `Provider(store)` → `ThemeProvider` → `RouterProvider(router)`, где `router = createBrowserRouter(routes)` из `PageRegistry`, а `store` — из `ModuleRegistry` (уже с подключёнными редюсерами после `load()`).

Итог: роуты берутся из страниц (`src/pages/**/index.tsx` → `routes`), редюсеры — из модулей (`src/modules/**/index.ts` → `reducer.name`, `reducer.value`); один раз вызванный `init()` заполняет оба регистра до первого рендера провайдеров.

Модули **не знают** о роутинге: страница решает, по какому пути отображать модуль. Навигация из модуля в другой экран может идти через `CustomEvent`, а страница слушает события и вызывает `navigate()`.

---

## 2. Схема папок (дерево src/)

Ниже — дерево директории `src/` с кратким пояснением назначения. Не все папки обязательны в каждом модуле; `...` обозначает возможные вложенные компоненты/контейнеры по тому же шаблону.

```
src/
├── index.tsx                    # Точка входа приложения, рендер в #root
├── App/
│   ├── App.tsx                  # Корневой компонент: Provider, ThemeProvider, RouterProvider
│   ├── appInitializer.ts        # PageRegistry, ModuleRegistry, инициализация роутов и store
│   ├── index.ts
│   └── useAppDispatch.ts        # Типизированный хук useDispatch для Redux
│
├── modules/                     # Модули приложения (сканируются по index.ts)
│   ├── dashboard/
│   │   ├── index.ts             # Точка входа модуля (экспорт компонента; reducer опционален)
│   │   ├── dashboard.tsx        # Основной UI-компонент модуля
│   │   ├── api/                 # Запросы к API, специфичные для модуля
│   │   ├── components/          # UI-компоненты, используемые только в этом модуле
│   │   ├── constants/           # Константы модуля
│   │   ├── containers/          # Контейнеры (связка UI + state/selectors)
│   │   ├── selectors/           # Селекторы к стейту модуля (state.ModuleName)
│   │   ├── store/               # Redux slice, thunks (если модуль участвует в store)
│   │   └── types/               # Типы модуля
│   │
│   ├── module1/                 # Пример модуля с reducer и lazy
│   │   ├── index.ts             # lazy(Module1) + reducer { name, value }
│   │   ├── module1.tsx
│   │   ├── __tests__/           # Тесты модуля
│   │   ├── api/
│   │   ├── components/          # Например Module1CustomButton/ с __stories__ и __tests__
│   │   ├── constants/
│   │   ├── containers/
│   │   ├── selectors/
│   │   ├── store/
│   │   └── types/
│   │
│   ├── module2/                 # Модуль с дочерними «подмодулями» по роутам
│   │   └── ...
│   ├── module2-children1/       # Дочерний экран (например /page2/page2-1)
│   │   ├── index.ts             # Только экспорт компонента, без reducer при необходимости
│   │   └── module2-children1.tsx
│   └── module2-children2/
│       └── ...
│
├── pages/                       # Страницы (сканируются по index.tsx)
│   ├── dashboard-page/
│   │   ├── index.tsx            # Обязательный экспорт: routes
│   │   └── dashboard-page.tsx   # Компонент страницы, подключает модули
│   ├── page1/
│   │   ├── index.tsx            # routes для /page1
│   │   └── page1.tsx
│   └── page2/
│       ├── index.tsx            # routes с path /page2 и children
│       └── page2.tsx            # Page2Layout (Outlet + навигация) и Page2
│
├── shared/                      # Общие ресурсы (алиасы @components, @theme и т.д.)
│   ├── components/              # Переиспользуемые UI (Button и т.п.)
│   │   └── Button/
│   │       ├── __stories__/
│   │       ├── __tests__/
│   │       ├── Button.tsx
│   │       ├── Button.styled.tsx
│   │       └── index.ts
│   ├── constants/               # Общие константы (LoadingState и т.д.)
│   ├── selectors/               # Общие селекторы (getAppStore)
│   ├── theme/                   # Тема для styled-components
│   └── utils/                   # Утилиты, в т.ч. testUtils для тестов
│
└── types/                       # Глобальные типы и декларации
    ├── global.d.ts              # declare NODE_ENV, API_PATH и т.п.
    └── styled.d.ts              # Типы для styled-components (theme)
```

**Важно для сканирования:**

- **Страницы:** в `src/pages/` ищутся файлы, совпадающие с шаблоном `**/index.tsx`. В каждом таком файле ожидается экспорт `routes`.
- **Модули:** в `src/modules/` ищутся файлы, совпадающие с шаблоном `**/index.ts`. В каждом таком файле при наличии экспорта `reducer` он регистрируется в store.

---

## 3. Соглашения по именованию

Единый стиль имён упрощает навигацию по проекту и автоматическую генерацию структуры (например, будущими тулзами или плагинами).

| Что | Стиль | Примеры |
|-----|--------|---------|
| **Папки (директории)** | kebab-case | `dashboard-page`, `module2-children1`, `my-feature` |
| **Файлы компонентов/модулей** | kebab-case с суффиксом по смыслу | `dashboard-page.tsx`, `module1.tsx`, `module1-store.ts`, `module1-selectors.ts` |
| **React-компоненты (имена переменных/типов)** | PascalCase | `DashboardPage`, `Module1`, `Module1CustomButton` |
| **Функции, хуки, переменные** | camelCase | `loadItems`, `useAppDispatch`, `getModule2Step` |
| **Константы (enum, «магические» значения)** | PascalCase для типов/enum, UPPER_SNAKE для примитивов при необходимости | `LoadingState`, `Module2Steps`; `API_PATH` в .env |
| **Ключ редюсера в state** | совпадает с `reducer.name` в index.ts, обычно PascalCase | `Module1`, `Module2`, `Catalog` |
| **Имена CustomEvent** | PascalCase, глагол/действие | `OpenModule2Children2`, `OpenCatalogFilters` |
| **Папки компонентов внутри модуля** | PascalCase для UI-компонентов | `Module1CustomButton/`, `Button/` |
| **Служебные папки** | нижнее подчёркивание + мн.ч. | `__tests__/`, `__stories__/`, `__snapshots__/` |

**Дополнительно:**

- Имя основного файла модуля обычно совпадает с именем папки: `module1/module1.tsx`, `dashboard/dashboard.tsx`.
- Файлы store/selectors/types/constants внутри модуля часто именуются как `<module-name>-store.ts`, `<module-name>-selectors.ts` и т.д.
- Алиасы импортов используются везде, где возможно: `@modules/...`, `@components`, `@theme`, `@constants`, `@selectors`, `@useAppDispatch`, `@testUtils`.

---

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

---

## 5. Страницы (Pages)

Страницы лежат в **`src/pages/`**. Каждая страница — это папка с как минимум двумя файлами:

- **`index.tsx`** — обязан экспортировать `routes: RouteObject[]`. Этот файл ищет `PageRegistry`.
- **Компонент страницы** (например, `page1.tsx`, `dashboard-page.tsx`) — рендерит разметку и подключает один или несколько модулей.

### Пример простой страницы (один модуль, один роут)

**`src/pages/page1/index.tsx`:**

```tsx
import { Page1 } from './page1';

export const routes = [
  {
    path: '/page1',
    element: <Page1 />,
  },
];
```

**`src/pages/page1/page1.tsx`:**

```tsx
import { Suspense } from 'react';
import { Module1 } from '@modules/module1';

export const Page1: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Module1 />
    </Suspense>
  );
};
```

Модули часто экспортируются через `lazy()`, поэтому использование `Suspense` здесь уместно.

### Пример страницы с вложенными роутами (Layout + Outlet)

Если у одного пути есть дочерние маршруты, страница задаёт `element` с layout-компонентом и `children` с вложенными `RouteObject`. В layout используется **`<Outlet />`** из React Router для вывода дочернего маршрута.

**`src/pages/page2/index.tsx`:**

```tsx
import { Module2Children1 } from '@modules/module2-children1';
import { Module2Children2 } from '@modules/module2-children2';
import { Page2, Page2Layout } from './page2';

export const routes = [
  {
    path: '/page2',
    element: <Page2Layout />,
    children: [
      { path: '/page2/page2-1', element: <Module2Children1 /> },
      { path: '/page2/page2-2', element: <Module2Children2 /> },
      { index: true, element: <Page2 /> },
    ],
  },
];
```

**`src/pages/page2/page2.tsx`:**

- `Page2Layout` — общий layout с навигацией и `<Outlet />`.
- `Page2` — контент для индексного роута (`index: true`).

Итог: по `/page2` показывается layout и `Page2`, по `/page2/page2-1` — layout и `Module2Children1`, по `/page2/page2-2` — layout и `Module2Children2`.

---

## 6. Модули (Modules)

Модули лежат в **`src/modules/`**. Каждый модуль — папка с обязательной точкой входа **`index.ts`** (именно `.ts`, не `.tsx`), которую сканирует `ModuleRegistry`. Остальная структура — по соглашению.

### Стандартная структура папки модуля

```
src/modules/my-module/
├── index.ts              # Точка входа: экспорт компонента и при необходимости reducer
├── my-module.tsx         # Основной компонент модуля
├── api/
│   ├── index.ts
│   └── my-module-api.ts
├── components/
│   └── ...
├── constants/
│   ├── index.ts
│   └── my-module-constants.ts
├── containers/
│   └── ...
├── selectors/
│   ├── index.ts
│   └── my-module-selectors.ts
├── store/
│   ├── index.ts
│   └── my-module-store.ts
└── types/
    ├── index.ts
    └── my-module-types.ts
```

Не все папки обязательны: если модуль без стейта, можно не иметь `store/`, `selectors/` и т.д.

### Обязательный экспорт из `index.ts`

- **Компонент модуля** — должен быть экспортирован (напрямую или через re-export), чтобы страница могла его импортировать (например, `@modules/module1` → `Module1`).
- **Редюсер (если модуль участвует в Redux):** экспорт в формате:

  ```ts
  export const reducer = {
    name: 'Module1',   // ключ в state
    value: Module1Slice.reducer,
  };
  ```

  `name` должен быть уникальным в приложении и совпадать с тем, как к стейту обращаются селекторы (`state.Module1`).

### Пример модуля с lazy и reducer (module1)

**`src/modules/module1/index.ts`:**

```ts
import { lazy } from 'react';
import { Module1Slice } from './store';

export const Module1 = lazy(() =>
  import('./module1').then(module => ({
    default: module.Module1,
  })),
);

export const reducer = {
  name: 'Module1',
  value: Module1Slice.reducer,
};
```

Здесь компонент загружается лениво, редюсер регистрируется при старте. Модуль без стейта (например, Dashboard) может экспортировать только компонент, без `reducer`.

### Store модуля

Обычно в `store/` лежит слайс RTK (`createSlice`) и при необходимости асинхронные thunk’и. Имя слайса (первый аргумент `createSlice`) может отличаться от ключа в корневом state: ключ в state задаётся только `reducer.name` в `index.ts` (например, `Module1`), а не `name` внутри `createSlice` (например, `Module1Store`).

Селекторы других модулей или общие селекторы обращаются к стейту по ключу из `reducer.name`: `state.Module1`, `state.Module2`.

---

## 7. Как добавить новый модуль

Пошагово.

1. **Создать папку** в `src/modules/`, например `src/modules/my-feature/`.

2. **Добавить минимальную точку входа** `src/modules/my-feature/index.ts`:
   - экспорт компонента (если нужен lazy, по аналогии с module1);
   - при необходимости:
     ```ts
     export const reducer = {
       name: 'MyFeature',
       value: MyFeatureSlice.reducer,
     };
     ```

3. **Создать основной компонент** (например, `my-feature.tsx`) и при необходимости слайс в `store/my-feature-store.ts`, типы в `types/`, константы в `constants/`, селекторы в `selectors/`, API в `api/` по образцу существующих модулей.

4. **Подключить модуль на странице:** в нужной странице (например, в `src/pages/some-page/index.tsx`) добавить роут с `element`, рендерящим ваш модуль, и при необходимости обернуть в `Suspense`, если модуль экспортируется через `lazy()`.

После этого при следующем запуске приложения `ModuleRegistry` подхватит новый `index.ts` и зарегистрирует редюсер (если он экспортирован), а `PageRegistry` уже соберёт роуты из обновлённой страницы. Отдельно регистрировать модуль в каком-то центральном списке не нужно.

---

## 8. Как добавить новую страницу и роуты

1. **Создать папку** в `src/pages/`, например `src/pages/my-page/`.

2. **Создать `index.tsx`** с экспортом `routes`:
   ```tsx
   import { MyPage } from './my-page';

   export const routes = [
     { path: '/my-page', element: <MyPage /> },
   ];
   ```

3. **Создать компонент страницы** (например, `my-page.tsx`), который рендерит нужные модули (и при необходимости общий layout с `<Outlet />` и дочерними роутами).

4. При необходимости добавить ссылки в навигации (например, `<Link to="/my-page">` в существующем layout).

Роуты из всех `pages/*/index.tsx` объединяются в один массив при вызове `PageRegistry.load()`. Порядок зависит от порядка, в котором `require.context` возвращает ключи (обычно по путям), поэтому при конфликтах путей стоит учитывать порядок определения роутов в React Router.

---

## 9. Навигация через CustomEvent

Модули не импортируют `useNavigate` и не зависят от React Router. Чтобы перейти на другой экран, модуль может отправить кастомное событие, а страница (или корневой layout), которая знает о роутинге, подписана на это событие и вызывает `navigate()`.

**В модуле (пример из module2):**

```tsx
<Button
  title="Go to module2-children2"
  onClick={() => {
    const e = new CustomEvent('OpenModule2Children2');
    window.dispatchEvent(e);
  }}
/>
```

**На странице (page2):**

```tsx
useEffect(() => {
  const handler = () => {
    navigate('/page2/page2-2');
  };
  window.addEventListener('OpenModule2Children2', handler);
  return () => window.removeEventListener('OpenModule2Children2', handler);
}, [navigate]);
```

Имена событий и соответствие маршрутам — по соглашению между модулем и страницей. Так сохраняется инкапсуляция: модуль не знает URL и роутер.

---

## 10. Общие ресурсы (shared)

В **`src/shared/`** лежат переиспользуемые части приложения:

- **`components/`** — общие UI-компоненты (например, `Button`). Подключаются через алиас `@components`.
- **`constants/`** — общие константы (например, `LoadingState`). Алиас `@constants`.
- **`theme/`** — тема для styled-components. Алиас `@theme`.
- **`selectors/`** — общие селекторы; например, `getAppStore(state)` возвращает корневой state, чтобы селекторы модулей могли типизированно обращаться к `state.Module1` и т.д. Алиас `@selectors`.
- **`utils/`** — утилиты, в том числе `@testUtils` для тестов (обёртки рендера с Provider и ThemeProvider).

Алиасы заданы в **`tsconfig.json`** (paths) и в **`webpack/webpack.resolve.ts`** (alias), чтобы везде использовать короткие импорты.

---

## 11. Переменные окружения и API

- **Файлы:** `.env.development`, `.env.production`, `.env.jest`. Подставляются через `dotenv` в webpack (см. `webpack.utils.ts`: `getEnvs('.env.development')` и т.д.) и передаются в приложение через `DefinePlugin`.
- **Глобальные переменные:** в `src/types/global.d.ts` объявлены, например, `NODE_ENV` и `API_PATH`. Их значения в рантайме задаёт сборка из соответствующего `.env`.
- **API:** базовый путь к API задаётся через `API_PATH` (например, в `.env.development`: `API_PATH=api/v1/`). В коде используется как глобальная переменная, например: `fetch(\`${API_PATH}module1/list\`)`.
- **Режим разработки и сценарии:** в `public/develop.html` переопределён `window.fetch`: при запросах к URL, содержащему подставленный `API_PATH`, в заголовок запроса добавляется `x-scenario` из `localStorage` (ключ строится по методу и пути). Это нужно для работы с мок-сервером и сценариями (см. README).

---

## 12. Тестирование и Storybook

- **Тесты:** Jest + React Testing Library. Обёртка `renderUiWithProviders` из `@testUtils` подключает `ThemeProvider` и Redux `Provider`. В тестах модулей store собирается вручную с нужными слайсами (см. `src/modules/module1/__tests__/Module1.test.tsx`).
- **Storybook:** истории лежат рядом с компонентами, в папках `__stories__` (например, `Button`, `Module1CustomButton`). Запуск: `npm run storybook`.

При добавлении нового модуля с редюсером в тестах нужно подключать соответствующие слайсы в `configureStore`, и при обращении к стейту использовать тот же ключ, что и в `reducer.name`.

---

## 13. Чек-лист для нового модуля

- [ ] Папка в `src/modules/<module-name>/`.
- [ ] Файл `index.ts`: экспорт компонента (при необходимости через `lazy`) и при наличии стейта — `reducer` в формате `{ name: '...', value: slice.reducer }`.
- [ ] Основной компонент модуля (например, `<module-name>.tsx`).
- [ ] При необходимости: `store/` (slice + thunks), `types/`, `constants/`, `selectors/`, `api/`, `components/`, `containers/`.
- [ ] Подключение на странице: новый или существующий роут в `src/pages/.../index.tsx` с `element`, рендерящим модуль; при lazy — обёртка в `Suspense`.
- [ ] Если навигация из модуля нужна без зависимости от роутера — использовать CustomEvent и подписку на нём в странице/layout с вызовом `navigate()`.
- [ ] Селекторы обращаются к стейту по ключу `reducer.name` (например, `state.Module1`).
- [ ] При написании тестов — создание store с нужными слайсами и тем же ключом state.

---

## 14. Типичный сценарий: экран «Каталог»

**Задача:** сделать экран по пути `/catalog` со списком товаров и фильтром (например, по категории и цене). Ниже — какие сущности завести и куда что положить.

### Вариант A: один модуль «Каталог» (список + фильтр в одном модуле)

Подходит, если фильтр и список тесно связаны и всегда отображаются вместе на одном URL.

**Страница (композитор):**

- **Папка:** `src/pages/catalog-page/`
- **Файлы:**
  - `index.tsx` — экспорт `routes`: один роут `path: '/catalog'`, `element: <CatalogPage />`.
  - `catalog-page.tsx` — компонент страницы, внутри `<Suspense><Catalog /></Suspense>`.

**Модуль:**

- **Папка:** `src/modules/catalog/`
- **Файлы и папки:**
  - `index.ts` — экспорт компонента (при необходимости через `lazy`) и `reducer: { name: 'Catalog', value: CatalogSlice.reducer }`.
  - `catalog.tsx` — основной компонент: разметка страницы, внутри — блок фильтра и список (сами компоненты можно вынести в `components/`).
  - `store/catalog-store.ts` — slice с состоянием: список элементов, параметры фильтра (категория, min/max цена), loading. Thunk для загрузки списка с учётом фильтра.
  - `types/catalog-types.ts` — типы для элемента каталога и состояния фильтра.
  - `constants/` — при необходимости (например, ключи фильтров).
  - `selectors/catalog-selectors.ts` — селекторы к `state.Catalog` (отфильтрованные элементы, текущие значения фильтра).
  - `api/catalog-api.ts` — вызовы `fetch` к API каталога (или вызываются из thunk в store).
  - `components/` — например `CatalogFilter/`, `CatalogList/` или `CatalogItem/` — если хочется разбить UI на подкомпоненты.

**Итог:** один маршрут `/catalog`, одна страница, один модуль. Регистрация редюсера и роута произойдёт автоматически при следующем запуске.

---

### Вариант B: отдельные модули «Список» и «Фильтр» (переиспользуемые блоки)

Подходит, если фильтр или список планируется использовать на других экранах или роутах.

**Страница:**

- `src/pages/catalog-page/` — как выше: `index.tsx` с `routes` для `/catalog`, `catalog-page.tsx` собирает layout и подключает оба модуля.

**Модули:**

- **`src/modules/catalog-filter/`**
  - Отвечает только за UI фильтра и (опционально) за свой кусок state: выбранная категория, диапазон цен.
  - Может экспортировать только компонент (без reducer), а значения фильтра поднимать через callback или контекст; либо завести свой slice `CatalogFilter` и отдавать значения в общий state/селекторы.

- **`src/modules/catalog-list/`**
  - Список товаров: получает данные из state (например, общий slice `Catalog` или отдельный `CatalogList`) или по пропсам.
  - Страница `catalog-page.tsx` рендерит сначала `CatalogFilter`, затем `CatalogList`; оба могут читать/писать общий slice `Catalog` в store (тогда один общий модуль «Catalog» в смысле store, а два — только как UI-модули).

**Практический компромисс:** один модуль **`catalog`** со state и двумя подкомпонентами внутри (`CatalogFilter`, `CatalogList`) в `catalog/components/`. Роут один — `/catalog`, страница одна, редюсер один. Так проще связать фильтр и список через один slice.

---

### Краткий чек-лист для сценария «Каталог»

1. **Страница:** `src/pages/catalog-page/index.tsx` (export `routes`), `catalog-page.tsx` (рендер модуля в Suspense).
2. **Модуль:** `src/modules/catalog/` — `index.ts` (компонент + `reducer`), `catalog.tsx`, `store/`, `types/`, `selectors/`, при необходимости `api/`, `components/`.
3. **Роут:** в `routes` добавить `{ path: '/catalog', element: <CatalogPage /> }`.
4. **Навигация:** ссылка в общем меню: `<Link to="/catalog">Каталог</Link>` (в layout дашборда или в корневой навигации).
5. **Фильтр и список:** либо один компонент в `catalog.tsx` с разбивкой на подкомпоненты в `catalog/components/`, либо два UI-модуля при необходимости переиспользования; в обоих случаях один общий slice `Catalog` обычно удобнее.

После добавления файлов сборка и регистры подхватят новый модуль и новую страницу без правок в центральном конфиге.


