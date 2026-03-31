import { configureStore } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';

import { renderUiWithProviders } from '@testUtils';

import { Module2 } from '../module2';
import { Module2Slice } from '../store';

describe('Module2', () => {
  it('loads items on mount and shows button', async () => {
    const store = configureStore({
      reducer: { Module2: Module2Slice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    renderUiWithProviders(<Module2 />, store);

    expect(screen.getByText('Module 2')).toBeInTheDocument();
    await waitFor(() => {
      expect(store.getState().Module2.items.length).toBeGreaterThan(0);
    });
    expect(screen.getByRole('button', { name: /Go to module2-children2/ })).toBeInTheDocument();
  });
});
