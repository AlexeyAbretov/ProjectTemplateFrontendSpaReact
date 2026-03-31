## 6. Модули (Modules)

Каждый модуль в `src/modules/<module-name>/`:

- обязан иметь `index.ts` (точка входа);
- экспортирует UI-компонент;
- при использовании Redux дополнительно экспортирует:

```ts
export const reducer = {
  name: 'ModuleName',
  value: ModuleSlice.reducer,
};
```

`name` - это ключ в корневом `state`.
