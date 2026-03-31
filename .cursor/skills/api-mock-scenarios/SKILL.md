---
name: api-mock-scenarios
description: Uses project mock-server scenario flow for API behavior testing. Use when debugging API responses, reproducing 4xx/5xx/empty states, or validating UI behavior under scenario headers.
---
# API Mock Scenarios

## When To Use

Apply this skill when user asks to:

- debug API errors in development
- reproduce specific backend responses
- validate loading/empty/error UI states

## Project-Specific Mechanism

- Dev mode uses `public/develop.html` fetch interception.
- API requests include `x-scenario` from `localStorage`.
- Scenario key format: `{METHOD}-{path-with-dashes}`.

Example:

```js
localStorage.setItem('GET-api-v1-module1-list', 'http400');
```

## Workflow

```md
Task progress:
- [ ] Identify request method and full API path
- [ ] Build correct scenario key
- [ ] Set scenario value in localStorage
- [ ] Reproduce request and verify UI behavior
- [ ] Clear or reset scenario after verification
```

## Validation Notes

- Confirm `API_PATH` and dev proxy assumptions before concluding.
- Mention exact scenario key/value used in the final report.
