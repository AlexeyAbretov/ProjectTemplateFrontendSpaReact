import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { AuthSlice } from '@modules/AuthModule/store';
import { renderUiWithProviders } from '@testUtils';

import { LoginPage } from '../LoginPage';

jest.mock('@modules/AuthModule/api', () => ({
  authApiService: {
    login: jest.fn().mockResolvedValue({
      user: { id: '1', email: 'u@e.com' },
      token: 't',
    }),
    logout: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('LoginPage', () => {
  it('submits login through container', async () => {
    const store = configureStore({
      reducer: { AuthStore: AuthSlice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    renderUiWithProviders(<LoginPage />, store);

    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), {
      target: { value: 'u@e.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: 'secret12' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() => {
      expect(store.getState().AuthStore.isAuthenticated).toBe(true);
    });
  });
});
