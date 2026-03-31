## 14. Чек-лист для нового модуля

- создать папку `src/modules/<module-name>/`;
- добавить `index.ts` (экспорт компонента, при наличии state - `reducer`);
- добавить основной компонент (`<module-name>.tsx`);
- при необходимости добавить `store/types/constants/selectors/api/components/containers`;
- в `containers/` — минимум JSX (данные и `dispatch`); разметка в `components/`;
- для каждого компонента в `components/` — `__stories__` с историями Storybook;
- подключить модуль на странице через `routes` в `src/pages/.../index.tsx`;
- для lazy-экспорта использовать `Suspense`;
- селекторы писать по ключу `reducer.name` в state;
- тесты настраивать с тем же ключом state.
