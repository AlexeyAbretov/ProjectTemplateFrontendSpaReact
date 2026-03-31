---
name: safe-refactor-checklist
description: Applies a safe refactoring workflow for this React SPA. Use when changing existing modules/pages/selectors/store wiring, renaming reducer keys, or restructuring files to avoid regressions.
---
# Safe Refactor Checklist

## When To Use

Apply this skill when the task includes:

- refactoring existing code
- moving or renaming modules/pages/files
- changing Redux slice wiring or selectors
- changing route composition

## High-Risk Areas In This Project

- module discovery contract: `src/modules/**/index.ts`
- page discovery contract: `src/pages/**/index.tsx` with `routes`
- `reducer.name` key and selector alignment
- alias imports and import sorting
- lazy module rendering with `Suspense`

## Workflow

```md
Task progress:
- [ ] Identify impacted contracts (routes/reducer/selectors/aliases)
- [ ] Make minimal edits with no unrelated changes
- [ ] Update all direct references after rename/move
- [ ] Validate reducer.name and selector state access
- [ ] Run lint/tests for touched scope
- [ ] Document behavior changes if any
```

## Required Validations

- Discovery still works (`index.ts` and `index.tsx` entrypoints preserved).
- Selectors read from the correct root state key.
- Route exports remain valid `routes` arrays.
- Import order matches `simple-import-sort/imports`.

## Output Requirements For The Agent

- List changed files.
- Explicitly state what contract risks were checked.
- Explicitly state what was tested and what was not.
