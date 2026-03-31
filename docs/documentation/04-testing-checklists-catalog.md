# 04. Тесты, чек-листы и сценарий "Каталог"

Источник: разделы `13-15` из `DOCUMENTATION.md`.

## 13) Тестирование и Storybook

- тесты: Jest + React Testing Library;
- вспомогательная обёртка: `renderUiWithProviders` из `@testUtils`;
- при тестировании модулей store собирается с нужными слайсами;
- stories располагаются рядом с компонентами, обычно в `__stories__`;
- запуск Storybook: `npm run storybook`.

## 14) Чек-лист для нового модуля

- создать папку `src/modules/<module-name>/`;
- добавить `index.ts` (экспорт компонента, при наличии state - `reducer`);
- добавить основной компонент (`<module-name>.tsx`);
- при необходимости добавить `store/types/constants/selectors/api/components/containers`;
- подключить модуль на странице через `routes` в `src/pages/.../index.tsx`;
- для lazy-экспорта использовать `Suspense`;
- селекторы писать по ключу `reducer.name` в state;
- тесты настраивать с тем же ключом state.

## 15) Типичный сценарий: экран "Каталог"

Цель: маршрут `/catalog`, список товаров и фильтры.

### Вариант A: один модуль `catalog`

- страница `src/pages/catalog-page/` (роут + композитор);
- модуль `src/modules/catalog/`:
  - `index.ts` (компонент + `reducer`);
  - `catalog.tsx`;
  - `store/types/selectors/api/components` по необходимости.

Подходит, когда фильтр и список всегда используются вместе.

### Вариант B: отдельные UI-модули

- `catalog-filter` и `catalog-list` как отдельные блоки;
- страница собирает их в layout;
- общий state можно хранить в одном слайсе `Catalog`.

Практичный компромисс: единый state-модуль `catalog` и разделение UI на подкомпоненты внутри него.
