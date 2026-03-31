## 2. Схема папок (дерево src/)

Ниже — дерево директории `src/` с кратким пояснением назначения. Не все папки обязательны в каждом модуле; `...` обозначает возможные вложенные компоненты/контейнеры по тому же шаблону.

```txt
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
