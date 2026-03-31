import { apiClientInstance } from '@api';
import { configureStore } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { loadItems, Module1Slice } from '../module1-store';

describe('Module1Slice', () => {
  it('fulfills loadItems with API data', async () => {
    jest.spyOn(apiClientInstance, 'get').mockResolvedValue([{ id: 1, name: 'n' }]);

    const store = configureStore({
      reducer: { Module1: Module1Slice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    await store.dispatch(loadItems('step-a'));

    expect(store.getState().Module1.loading).toBe(LoadingState.Success);
    expect(store.getState().Module1.items).toEqual([{ id: 1, name: 'n' }]);
    expect(store.getState().Module1.step).toBe('step-a');
  });

  it('fulfills with empty items when API throws', async () => {
    jest.spyOn(apiClientInstance, 'get').mockRejectedValue(new Error('network'));

    const store = configureStore({
      reducer: { Module1: Module1Slice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    await store.dispatch(loadItems('step-b'));

    expect(store.getState().Module1.loading).toBe(LoadingState.Success);
    expect(store.getState().Module1.items).toEqual([]);
    expect(store.getState().Module1.step).toBe('step-b');
  });
});
