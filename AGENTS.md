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
- New UI components under `src/modules/**/components/` and `src/shared/components/` must include Storybook stories in `__stories__` (CSF 3); see `DOCUMENTATION.md` (section on testing and Storybook).

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

## Planning And Feature Delivery (optional)

- §17–§18 and the linked split docs describe an **optional** tracker/git workflow. **Do not** create milestones, issues, wiki pages, feature branches, or PRs under this workflow **unless the user explicitly asks in the prompt** (e.g. “plan in Gitea per §17”, “implement with branch + PR per §18”). Otherwise follow normal architecture and quality gates only.
- **Planning** (milestone, issue breakdown, task order, wiki or fallback status table): `DOCUMENTATION.md` §17; `docs/documentation/sections/17-planning-feature-tracker.md`.
- **Implementation and delivery** (`feature/*` branch, PR, closing issues, Router test wrapping, etc.): `DOCUMENTATION.md` §18; `docs/documentation/sections/18-feature-implementation-delivery.md`.
- Short index: `docs/documentation/06-planning-and-delivery.md`.

## Quality Gates Before Finishing

- Run relevant checks for touched code when possible (lint/test/build scope).
- After implementation, run tests for the affected area and run a production build (`npm run build`). The build must complete without errors; fix webpack/TypeScript warnings the build surfaces so the output stays clean.
- Verify no obvious type/lint issues were introduced.
- Keep docs updated if behavior or conventions changed.
- New application code should include tests (see `DOCUMENTATION.md` section on testing); `npm run test:coverage` must meet `coverageThreshold` in `jest.config.js` (lines and statements at least 80%).

## Safety

- Never commit secrets or environment values.
- Never use destructive git commands unless explicitly requested.
- If workspace has unrelated user changes, do not revert them.

## Response Style For Agents

- Report what changed and why, with concrete file paths.
- Keep answers concise and actionable.
- If verification was not run, explicitly say what should be run next.
