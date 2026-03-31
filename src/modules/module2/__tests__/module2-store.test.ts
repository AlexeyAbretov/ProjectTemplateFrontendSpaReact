import { configureStore } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { Module2Steps } from '../constants';
import { InitialStore, loadItems, Module2Slice } from '../store';

describe('Module2Slice', () => {
  it('handles loadItems lifecycle', async () => {
    const store = configureStore({
      reducer: { Module2: Module2Slice.reducer },
    });

    expect(store.getState().Module2).toMatchObject({
      loading: InitialStore.loading,
      items: InitialStore.items,
      step: InitialStore.step,
    });

    const pendingAction = loadItems.pending(undefined, 'req-1');
    store.dispatch(pendingAction);
    expect(store.getState().Module2.loading).toBe(LoadingState.Pending);

    await store.dispatch(loadItems());
    const state = store.getState().Module2;
    expect(state.loading).toBe(LoadingState.Success);
    expect(state.items).toHaveLength(2);
    expect(state.step).toBe(Module2Steps.Step2);
  });

  it('handles loadItems.rejected', () => {
    const store = configureStore({
      reducer: { Module2: Module2Slice.reducer },
    });
    store.dispatch(loadItems.rejected(new Error('x'), 'req-2', undefined, undefined as never));
    expect(store.getState().Module2.loading).toBe(LoadingState.Failed);
    expect(store.getState().Module2.items).toEqual([]);
  });
});
