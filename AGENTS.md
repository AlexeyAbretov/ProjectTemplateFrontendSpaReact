# AGENTS

This file defines persistent instructions for AI agents working in this repository.

## Goal

Make minimal, safe, and architecture-consistent changes for a modular React SPA with dynamic page/module discovery.

## Source Of Truth

- Product and architecture details: `DOCUMENTATION.md`
- Split docs for quick navigation: `docs/documentation/README.md`

When guidance conflicts, prefer `DOCUMENTATION.md` and existing code behavior.

## Architecture Invariants

- Pages are discovered from `src/pages/**/index.tsx` and must export `routes`.
- Modules are discovered from `src/modules/**/index.ts` and may export `reducer`.
- Redux state key must match `reducer.name` from module `index.ts`.
- Do not add manual central registries for pages/modules.
- Keep module routing knowledge in pages/layouts, not in modules.

## Coding Rules

- Keep changes focused; avoid unrelated refactors.
- Preserve existing naming style:
  - folders/files: `kebab-case`
  - components/types: `PascalCase`
  - variables/functions/hooks: `camelCase`
- Prefer existing aliases (`@modules`, `@components`, `@constants`, `@theme`, `@selectors`, `@app`, `@useAppDispatch`, `@api`).
- Keep import order compatible with `simple-import-sort/imports`.
- Follow existing patterns for lazy modules and `Suspense`.

## Adding Or Modifying Modules

- Required entrypoint: `src/modules/<module>/index.ts`.
- If module uses Redux, export:

```ts
export const reducer = {
  name: 'ModuleName',
  value: ModuleSlice.reducer,
};
```

- Ensure selectors read from `state[reducer.name]`.
- Do not change reducer key names without updating dependent selectors/tests.
- Module containers: keep JSX minimal; put layout and presentational markup in `components/`.

## Adding Or Modifying Pages

- Required entrypoint: `src/pages/<page>/index.tsx` with exported `routes`.
- Keep route composition in page layer.
- For module-triggered navigation, prefer `CustomEvent` + page-side `navigate()` when decoupling is needed.

## Shared Resources And Config

- API calls should use shared API client (`@api`) unless a clear local exception exists.
- When adding a new alias, keep configs in sync:
  - `tsconfig.json`
  - `webpack/webpack.resolve.ts`
  - `.storybook/webpack.config.ts`

## Quality Gates Before Finishing

- Run relevant checks for touched code when possible (lint/test/build scope).
- Verify no obvious type/lint issues were introduced.
- Keep docs updated if behavior or conventions changed.

## Safety

- Never commit secrets or environment values.
- Never use destructive git commands unless explicitly requested.
- If workspace has unrelated user changes, do not revert them.

## Response Style For Agents

- Report what changed and why, with concrete file paths.
- Keep answers concise and actionable.
- If verification was not run, explicitly say what should be run next.
