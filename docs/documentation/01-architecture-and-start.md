# 01. Архитектура и старт приложения

Источник: разделы `1-4` из `DOCUMENTATION.md`.

## 1) Обзор архитектуры

Проект реализован как модульная SPA:

- страницы (`src/pages`) объявляют роуты;
- модули (`src/modules`) содержат UI и, при необходимости, Redux-слайсы;
- инициализатор приложения динамически находит роуты и редюсеры.

Ключевая идея: централизованный ручной реестр не нужен, подключение выполняется через сканирование `index.tsx` и `index.ts`.

## 2) Схема папок `src/`

Базовые области:

- `src/App` - корневой `App`, `appInitializer`, типизированный dispatch-хук;
- `src/pages` - страницы, сканируются по `**/index.tsx` и экспортируют `routes`;
- `src/modules` - модули, сканируются по `**/index.ts`, могут экспортировать `reducer`;
- `src/shared` - переиспользуемые ресурсы (components/constants/theme/selectors/utils/api);
- `src/types` - глобальные декларации и типы.

## 3) Соглашения по именованию

- папки и имена файлов по домену - `kebab-case`;
- React-компоненты - `PascalCase`;
- функции/переменные/хуки - `camelCase`;
- ключи редюсеров в state соответствуют `reducer.name` (обычно `PascalCase`);
- служебные папки: `__tests__`, `__stories__`, `__snapshots__`.

### Сортировка импортов

Используется `simple-import-sort/imports`:

1. внешние пакеты;
2. алиасы проекта;
3. side-effect импорты;
4. parent relative;
5. local relative;
6. стили.

Автоисправление: `npm run lint:fix`.

## 4) Старт приложения и регистры

`src/App/appInitializer.ts`:

- `PageRegistry` - собирает роуты из `src/pages/**/index.tsx`;
- `ModuleRegistry` - собирает редюсеры из `src/modules/**/index.ts`;
- `AppInitializer` - вызывает загрузку и отдаёт `store` + `router`.

Поток:

1. рендер из `index.tsx`;
2. создание singleton-инициализатора;
3. `init()` загружает страницы и модули;
4. рендер провайдеров (`Provider`, `ThemeProvider`, `RouterProvider`).

## Полезно помнить

- Страница обязана экспортировать `routes`.
- Модуль может не иметь `reducer`.
- Селекторы обращаются к state через ключ `reducer.name`.
