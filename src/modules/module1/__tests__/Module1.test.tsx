import { renderUiWithProviders } from '@testUtils';
import { Module1 } from '../module1';
import { configureStore } from '@reduxjs/toolkit';
import { Module1Slice } from '../store';
import { Module2Slice } from '@modules/module2/store';

const store = configureStore({
  reducer: {
    Module1: Module1Slice.reducer,
    Module2: Module2Slice.reducer,
  },
  preloadedState: undefined,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

describe('Module1 test', () => {
  it('should render', () => {
    const { container } = renderUiWithProviders(<Module1 />, store);

    expect(container).toMatchSnapshot();
  });
});
