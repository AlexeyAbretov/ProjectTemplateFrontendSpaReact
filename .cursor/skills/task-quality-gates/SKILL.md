---
name: task-quality-gates
description: Enforces final quality gates before completing implementation tasks. Use for any non-trivial code change to ensure lint/tests/build checks and clear reporting of verification status.
---
# Task Quality Gates

## When To Use

Apply this skill for non-trivial implementation work.

## Required Checks (Scope-Based)

- Lint on touched scope (or project lint if scope-lint unavailable).
- Relevant tests for changed modules/pages/components.
- Build check when configuration or cross-cutting behavior changed.

## Workflow

```md
Task progress:
- [ ] Determine minimal verification scope
- [ ] Run lint/tests/build as applicable
- [ ] Fix introduced issues
- [ ] Re-run failed checks once after fixes
- [ ] Report verification outcomes clearly
```

## Reporting Format

- Checks run: list commands.
- Result: pass/fail per command.
- If not run: explain why and provide exact next commands.

## Rule

Do not claim validation that was not executed.
