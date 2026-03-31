---
name: docs-sync
description: Keeps project documentation synchronized after architecture or workflow changes. Use when code changes affect conventions, routes/modules patterns, setup steps, or developer instructions.
---
# Docs Sync

## When To Use

Apply this skill when changes affect:

- architecture conventions
- page/module creation workflow
- aliases, environment setup, API behavior
- testing/Storybook process
- error-handling patterns

## Documentation Targets

- Main source: `DOCUMENTATION.md`
- Split docs index: `docs/documentation/README.md`
- Section docs: `docs/documentation/sections/*.md`
- Agent instructions: `AGENTS.md` (if behavior for agents changed)

## Workflow

```md
Task progress:
- [ ] Identify changed behavior/conventions
- [ ] Update relevant section files first
- [ ] Reflect same changes in DOCUMENTATION.md
- [ ] Ensure links/index stay valid
- [ ] Add concise note in final response about updated docs
```

## Rules

- Keep terminology consistent with existing docs.
- Do not leave split docs and main doc diverged after substantive changes.
- Keep edits concise and actionable; avoid rewriting unchanged sections.

## Output Requirements For The Agent

- List exactly which doc files were updated.
- State whether docs are fully synchronized or partially deferred.
