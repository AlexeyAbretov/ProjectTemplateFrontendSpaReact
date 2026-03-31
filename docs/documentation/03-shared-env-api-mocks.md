# 03. Shared, алиасы, env, API и mock-сценарии

Источник: разделы `10-12` из `DOCUMENTATION.md`.

## 10) Общие ресурсы (`src/shared`)

Основные директории:

- `api` - `ApiClient` и работа с HTTP;
- `components` - общие UI-компоненты;
- `constants` - общие константы;
- `theme` - тема приложения;
- `selectors` - общие селекторы;
- `utils` - вспомогательные утилиты и test-utils.

## Алиасы путей

Поддерживаются в нескольких местах:

- `tsconfig.json` (`compilerOptions.paths`);
- `webpack/webpack.resolve.ts` (`resolve.alias`);
- `.storybook/webpack.config.ts` (`resolve.alias`).

Примеры алиасов: `@api`, `@modules/*`, `@components`, `@constants`, `@theme`, `@selectors`, `@app`, `@useAppDispatch`, `@testUtils`.

Если добавляется новый алиас, его нужно синхронно прописывать в соответствующих конфигурациях.

## 11) Переменные окружения и API

Используются env-файлы:

- `.env.development`
- `.env.production`
- `.env.jest`

Глобальные переменные (например, `NODE_ENV`, `API_PATH`) объявлены в `src/types/global.d.ts`.

Базовый API путь задаётся через `API_PATH`. Для запросов рекомендуется использовать `ApiClient` из `@api`.

## 12) Mock-сервер и `x-scenario`

В dev-режиме (`public/develop.html`) переопределяется `window.fetch`:

- для API-запросов считывается сценарий из `localStorage`;
- сценарий передаётся в заголовке `x-scenario`;
- ключ формата: `{METHOD}-{path-with-dashes}`.

Пример:

```js
localStorage.setItem('GET-api-v1-module1-list', 'http400');
```

Проксирование `/api/` настроено на mock-сервер в `webpack/webpack.devserver.ts`.
