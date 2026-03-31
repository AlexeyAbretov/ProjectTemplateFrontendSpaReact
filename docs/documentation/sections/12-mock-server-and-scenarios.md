## 12. Работа с мок-сервером и сценариями x-scenario

В dev-режиме (`public/develop.html`) переопределяется `window.fetch`:

- для API-запросов считывается сценарий из `localStorage`;
- сценарий передаётся в заголовке `x-scenario`;
- ключ формата: `{METHOD}-{path-with-dashes}`.

Пример:

```js
localStorage.setItem('GET-api-v1-module1-list', 'http400');
```

Проксирование `/api/` настроено на mock-сервер в `webpack/webpack.devserver.ts`.
