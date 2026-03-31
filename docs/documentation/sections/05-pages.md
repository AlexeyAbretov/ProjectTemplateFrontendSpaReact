## 5. Страницы (Pages)

Каждая страница в `src/pages/<page-name>/` обычно содержит:

- `index.tsx` - экспорт `routes: RouteObject[]`;
- `<page-name>.tsx` - компонент страницы.

Рекомендация: оборачивать lazy-модули в `Suspense`.

Для вложенных маршрутов используется layout с `<Outlet />` и `children` в `routes`.
