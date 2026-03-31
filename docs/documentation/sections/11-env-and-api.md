## 11. Переменные окружения и API

Используются env-файлы:

- `.env.development`
- `.env.production`
- `.env.jest`

Глобальные переменные (например, `NODE_ENV`, `API_PATH`) объявлены в `src/types/global.d.ts`.

Базовый API путь задаётся через `API_PATH`. Для запросов рекомендуется использовать `ApiClient` из `@api`.
