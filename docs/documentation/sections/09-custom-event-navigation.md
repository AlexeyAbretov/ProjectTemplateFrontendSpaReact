## 9. Навигация через CustomEvent

Если модуль не должен зависеть от React Router:

- модуль отправляет `window.dispatchEvent(new CustomEvent('EventName'))`;
- страница подписывается на событие и вызывает `navigate('/target-path')`.

Так сохраняется инкапсуляция: модуль не знает URL и детали роутера.
