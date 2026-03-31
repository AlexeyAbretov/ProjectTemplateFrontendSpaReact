## 10. Общие ресурсы (shared)

Основные директории:

- `api` - `ApiClient` и работа с HTTP;
- `components` - общие UI-компоненты;
- `constants` - общие константы;
- `theme` - тема приложения;
- `selectors` - общие селекторы;
- `utils` - вспомогательные утилиты и test-utils.

### Алиасы путей

Поддерживаются в нескольких местах:

- `tsconfig.json` (`compilerOptions.paths`);
- `webpack/webpack.resolve.ts` (`resolve.alias`);
- `.storybook/webpack.config.ts` (`resolve.alias`).

Примеры алиасов: `@api`, `@modules/*`, `@components`, `@constants`, `@theme`, `@selectors`, `@app`, `@useAppDispatch`, `@testUtils`.
