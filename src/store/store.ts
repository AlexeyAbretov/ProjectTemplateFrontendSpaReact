import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Объект, куда мы будем динамически записывать редьюсеры из модулей
const dynamicReducers: Record<string, Reducer> = {};

// Базовый стор
export const store = configureStore({
  reducer: (state, action) => {
    // Если в динамических редьюсерах что-то появилось, объединяем их
    const combined = combineReducers({ ...dynamicReducers });
    return combined(state, action);
  },
  preloadedState: undefined,
  devTools: {
    name: 'ModuleExampleStore',
    trace: true,
    traceLimit: 25
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});

// Функция для регистрации редьюсера из модуля
export const registerModuleReducer = (key: string, reducer: Reducer) => {
  dynamicReducers[key] = reducer;
  // Пересобираем редьюсер (Redux Toolkit это подхватит)
  store.replaceReducer(combineReducers({ ...dynamicReducers }));
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
