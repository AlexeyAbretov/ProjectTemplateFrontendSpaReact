## 13. Тестирование и Storybook

- тесты: Jest + React Testing Library;
- вспомогательная обёртка: `renderUiWithProviders` из `@testUtils`;
- при тестировании модулей store собирается с нужными слайсами;
- **обязательные тесты** для новой прикладной логики (store, API, формы, страницы, утилиты, `appInitializer` и т.д.) в `__tests__` или `*.test.ts(x)`; типы-only и пустые barrel-файлы — по согласованию; для UI — минимум рендер или сценарий;
- **покрытие:** `npm run test:coverage`, пороги в `jest.config.js` (`coverageThreshold`): минимум **80%** по **строкам** и **операторам**; отдельные пороги для функций и веток; в `collectCoverageFrom` исключены все **`src/**/index.ts`** (barrel), stories, `src/types/**`, корневой `src/index.tsx`; **`index.tsx`** страниц в отчёте участвуют;
- тесты динамического реестра: `globalThis.__jestWebpackPages` / `__jestWebpackModules` (см. `src/App/__tests__/appInitializer.test.ts`); в Jest без webpack — `webpackRequireContext` в `appInitializer.ts`;
- Storybook: папка `__stories__` рядом с компонентом, файлы `*.stories.ts` / `*.stories.tsx`, CSF 3 (`Meta`, `StoryObj`);
- **обязательно** добавлять stories для каждого нового UI-компонента в `src/modules/**/components/` и `src/shared/components/`; префикс title: `ModuleName/Components/...` или `Components/...`;
- запуск: `npm run storybook`, сборка: `npm run build-storybook`.
