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

### Сортировка импортов (линтинг)

Порядок импортов в файлах задаётся правилом **`simple-import-sort/imports`** (плагин `eslint-plugin-simple-import-sort`) в **`eslint.config.mts`**. Линтер выдаёт ошибку при нарушении порядка; автоисправление: `npm run lint:fix`.

**Порядок групп (сверху вниз):**

1. **Внешние пакеты** — `react`, `react-dom` и остальные зависимости из `node_modules` (`^react`, `^@?\\w`).
2. **Внутренние алиасы проекта** — импорты через `@components`, `@theme`, `@constants`, `@modules`, `@testUtils`, `@app`, `@useAppDispatch`, `@selectors`.
3. **Side-effect импорты** — импорты только ради побочного эффекта (например, полифиллы).
4. **Родительские относительные пути** — `../`, `../../` и т.д.
5. **Локальные относительные пути** — `./` (текущая папка и подпапки).
6. **Стили** — импорты файлов `.css`, `.scss` и т.п. (`^.+\\.s?css$`).
