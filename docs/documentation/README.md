# Документация проекта по частям

Этот набор файлов разбивает исходный `DOCUMENTATION.md` на тематические части для удобной работы в Cursor.

## Содержание

1. [01-architecture-and-start.md](./01-architecture-and-start.md)  
   Обзор архитектуры, структура `src`, соглашения по именованию, инициализация приложения.

2. [02-pages-modules-routing.md](./02-pages-modules-routing.md)  
   Страницы, модули, добавление новых сущностей и навигация через `CustomEvent`.

3. [03-shared-env-api-mocks.md](./03-shared-env-api-mocks.md)  
   Общие ресурсы, алиасы, переменные окружения, API и mock-сценарии.

4. [04-testing-checklists-catalog.md](./04-testing-checklists-catalog.md)  
   Тестирование, Storybook, чек-листы и типовой сценарий экрана "Каталог".

5. [05-error-boundary.md](./05-error-boundary.md)  
   Error Boundary: концепция, уровни, пропсы, примеры.

6. [06-planning-and-delivery.md](./06-planning-and-delivery.md)  
   Планирование в трекере и цикл до PR (**опционально**, только по явному запросу в промпте; см. §17–§18).

## Посекционная версия (18 файлов)

Для работы по каждому разделу отдельно добавлена версия в `docs/documentation/sections/`:

1. [01-overview-architecture.md](./sections/01-overview-architecture.md)
2. [02-src-tree.md](./sections/02-src-tree.md)
3. [03-naming-conventions.md](./sections/03-naming-conventions.md)
4. [04-app-start-and-registries.md](./sections/04-app-start-and-registries.md)
5. [05-pages.md](./sections/05-pages.md)
6. [06-modules.md](./sections/06-modules.md)
7. [07-add-new-module.md](./sections/07-add-new-module.md)
8. [08-add-new-page-and-routes.md](./sections/08-add-new-page-and-routes.md)
9. [09-custom-event-navigation.md](./sections/09-custom-event-navigation.md)
10. [10-shared-resources.md](./sections/10-shared-resources.md)
11. [11-env-and-api.md](./sections/11-env-and-api.md)
12. [12-mock-server-and-scenarios.md](./sections/12-mock-server-and-scenarios.md)
13. [13-testing-and-storybook.md](./sections/13-testing-and-storybook.md)
14. [14-new-module-checklist.md](./sections/14-new-module-checklist.md)
15. [15-catalog-scenario.md](./sections/15-catalog-scenario.md)
16. [16-error-boundary.md](./sections/16-error-boundary.md)
17. [17-planning-feature-tracker.md](./sections/17-planning-feature-tracker.md)
18. [18-feature-implementation-delivery.md](./sections/18-feature-implementation-delivery.md)

## Примечание

- Исходный файл `DOCUMENTATION.md` сохранён как основной источник (добавлена только ссылка на разбитую версию).
- При обновлениях можно править нужную часть отдельно, а затем синхронизировать общий документ при необходимости.
