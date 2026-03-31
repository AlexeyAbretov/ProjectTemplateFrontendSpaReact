---
name: react-module-page-scaffold
description: Creates and updates pages/modules in this modular React SPA with dynamic discovery. Use when adding a new module, adding a new page, wiring routes, exporting reducer objects, or scaffolding feature folders under src/pages and src/modules.
---
# React Module/Page Scaffold

## When To Use

Apply this skill when the user asks to:

- add a new module in `src/modules`
- add a new page in `src/pages`
- add or update routes
- connect a module to a page
- scaffold Redux slice wiring for a module

## Project Invariants

- Pages are discovered from `src/pages/**/index.tsx` and must export `routes`.
- Modules are discovered from `src/modules/**/index.ts`.
- Module Redux registration is optional, but if present, export:

```ts
export const reducer = {
  name: 'ModuleName',
  value: ModuleSlice.reducer,
};
```

- `reducer.name` is the state key used by selectors.
- Do not create manual central registries for pages/modules.

## Naming And Structure

- Folders/files by feature name: `kebab-case`.
- Component/type names: `PascalCase`.
- Function/variable/hook names: `camelCase`.
- Prefer aliases: `@modules`, `@components`, `@constants`, `@theme`, `@selectors`, `@api`, `@app`, `@useAppDispatch`.

## Workflow

Copy this checklist and track progress:

```md
Task progress:
- [ ] Identify feature/page names and URL
- [ ] Create or update module entrypoint
- [ ] Create or update page entrypoint with routes
- [ ] Connect page component to module (Suspense for lazy)
- [ ] Add/update selectors using reducer.name key
- [ ] Run lint/tests for touched scope
- [ ] Update docs when behavior/conventions changed
```

### 1) Clarify target shape

Before coding, infer or confirm:

- module folder name (for example `catalog`)
- page folder name (for example `catalog-page`)
- route path (for example `/catalog`)
- whether module needs Redux state

### 2) Create or update module

Minimum files:

- `src/modules/<module-name>/index.ts`
- `src/modules/<module-name>/<module-name>.tsx`

Optional feature folders:

- `store/`, `selectors/`, `types/`, `api/`, `components/`, `containers/`, `constants/`

Containers should stay thin: Redux wiring and composition only; move markup to `components/`.

Each new UI component under `components/` needs a sibling `__stories__` folder with CSF 3 stories (`*.stories.ts` or `*.stories.tsx`); title prefix `ModuleName/Components/ComponentName` (see `DOCUMENTATION.md` §13).

For lazy export pattern:

```ts
import { lazy } from 'react';

export const Catalog = lazy(() =>
  import('./catalog').then(module => ({
    default: module.Catalog,
  })),
);
```

If Redux is needed, also export `reducer`.

### 3) Create or update page

Required files:

- `src/pages/<page-name>/index.tsx` with exported `routes`
- `src/pages/<page-name>/<page-name>.tsx` page component

Page should compose modules and keep routing knowledge in page/layout layer.
Use `Suspense` when rendering lazy modules.

### 4) Navigation decoupling rule

If module-triggered navigation must avoid router coupling:

- dispatch a `CustomEvent` inside module
- listen and `navigate()` inside page/layout

### 5) Validation

After edits:

- ensure imports follow `simple-import-sort/imports`
- ensure selectors read from `state[reducer.name]` key
- add or update Storybook stories for any new component under `components/`
- run relevant lint/tests for touched code
- report what was verified and what remains

## Output Requirements For The Agent

When finishing a task with this skill:

- list changed files
- state whether module/page discovery contracts were respected
- state whether `reducer.name`/selectors are aligned
- include next commands if verification was not run
