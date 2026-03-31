import { apiClientInstance } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';

import { Module1Slice } from '@modules/module1/store';
import { Module2Slice } from '@modules/module2/store';
import { renderUiWithProviders } from '@testUtils';

import { Page1 } from '../page1';

describe('Page1', () => {
  it('renders Module1 inside suspense', async () => {
    jest.spyOn(apiClientInstance, 'get').mockResolvedValue([]);

    const store = configureStore({
      reducer: {
        Module1: Module1Slice.reducer,
        Module2: Module2Slice.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    renderUiWithProviders(<Page1 />, store);

    await waitFor(() => {
      expect(screen.getByText('Module 1')).toBeInTheDocument();
    });
  });
});
