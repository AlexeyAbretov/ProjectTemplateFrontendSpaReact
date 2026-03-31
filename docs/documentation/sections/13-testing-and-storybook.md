## 13. Тестирование и Storybook

- тесты: Jest + React Testing Library;
- вспомогательная обёртка: `renderUiWithProviders` из `@testUtils`;
- при тестировании модулей store собирается с нужными слайсами;
- Storybook: папка `__stories__` рядом с компонентом, файлы `*.stories.ts` / `*.stories.tsx`, CSF 3 (`Meta`, `StoryObj`);
- **обязательно** добавлять stories для каждого нового UI-компонента в `src/modules/**/components/` и `src/shared/components/`; префикс title: `ModuleName/Components/...` или `Components/...`;
- запуск: `npm run storybook`, сборка: `npm run build-storybook`.
