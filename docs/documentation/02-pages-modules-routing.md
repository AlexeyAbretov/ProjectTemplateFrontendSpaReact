# 02. Страницы, модули и роутинг

Источник: разделы `5-9` из `DOCUMENTATION.md`.

## 5) Страницы (Pages)

Каждая страница в `src/pages/<page-name>/` обычно содержит:

- `index.tsx` - экспорт `routes: RouteObject[]` (опционально поле `header: { label, order? }` на маршруте — пункт навигации в шапке; тип `AppPageRoute` в `src/App/types/App.d.ts`);
- `<page-name>.tsx` - компонент страницы.

Рекомендация: оборачивать lazy-модули в `Suspense`.

Для вложенных маршрутов используется layout с `<Outlet />` и `children` в `routes`. Ссылки шапки строятся из роутов с `header` (`PageRegistry.getHeaderNavLinks()` / `AppLayout`); `*` в `path` не попадает в шапку.

## 6) Модули (Modules)

Каждый модуль в `src/modules/<module-name>/`:

- обязан иметь `index.ts` (точка входа);
- экспортирует UI-компонент;
- при использовании Redux дополнительно экспортирует:

```ts
export const reducer = {
  name: 'ModuleName',
  value: ModuleSlice.reducer,
};
```

`name` - это ключ в корневом `state`.

**Контейнеры (`containers/`):** минимум разметки — связка store и UI; вёрстку выносить в `components/`.

## 7) Как добавить новый модуль

1. создать `src/modules/my-feature/`;
2. добавить `index.ts` (экспорт компонента, опционально `reducer`);
3. создать `my-feature.tsx` и, при необходимости, `store/types/selectors/api/constants/components`;
4. подключить модуль на странице через роут/компонент.

Дополнительная ручная регистрация в "центральном файле" не требуется.

## 8) Как добавить новую страницу и роуты

1. создать `src/pages/my-page/`;
2. добавить `index.tsx` с экспортом `routes`;
3. добавить `my-page.tsx`;
4. при необходимости добавить пункт в шапку через `header: { label, order? }` на маршруте (см. п. 5 выше и `DOCUMENTATION.md`).

Роуты объединяются автоматически при `PageRegistry.load()`.

## 9) Навигация через `CustomEvent`

Если модуль не должен зависеть от React Router:

- модуль отправляет `window.dispatchEvent(new CustomEvent('EventName'))`;
- страница подписывается на событие и вызывает `navigate('/target-path')`.

Так сохраняется инкапсуляция: модуль не знает URL и детали роутера.
