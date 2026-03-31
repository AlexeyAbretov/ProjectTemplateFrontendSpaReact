## 5. Страницы (Pages)

Каждая страница в `src/pages/<page-name>/` обычно содержит:

- `index.tsx` - экспорт `routes: RouteObject[]` (в типе страницы — `AppPageRoute`: к объекту маршрута можно добавить `header?: { label: string; order?: number }` для пункта в шапке приложения; см. `src/App/types/App.d.ts` и `PageRegistry`);
- `<page-name>.tsx` - компонент страницы.

Рекомендация: оборачивать lazy-модули в `Suspense`.

Для вложенных маршрутов используется layout с `<Outlet />` и `children` в `routes`.

Ссылки в шапке (`AppLayout` / `Header`) собираются из всех роутов с `header`, сортировка по `order`, затем по пути; маршруты с `*` в `path` пропускаются.
