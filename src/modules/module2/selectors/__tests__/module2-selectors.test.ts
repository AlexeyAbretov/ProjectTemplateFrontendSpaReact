import { configureStore } from '@reduxjs/toolkit';

import { Module2Steps } from '../../constants';
import { InitialStore, Module2Slice } from '../../store';
import { getModule2Step } from '../module2-selectors';

describe('module2 selectors', () => {
  it('getModule2Step reads state', () => {
    const store = configureStore({
      reducer: { Module2: Module2Slice.reducer },
      preloadedState: {
        Module2: { ...InitialStore, step: Module2Steps.Step2 },
      },
    });

    expect(getModule2Step(store.getState())).toBe(Module2Steps.Step2);
  });
});
