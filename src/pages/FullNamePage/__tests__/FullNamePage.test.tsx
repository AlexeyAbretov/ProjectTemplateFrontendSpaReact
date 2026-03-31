import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { FullNameSlice } from '@modules/FullNameModule/store';
import { renderUiWithProviders } from '@testUtils';

import { FullNamePage } from '../FullNamePage';

jest.mock('@modules/FullNameModule/api', () => ({
  fullNameApiService: {
    saveFullName: jest.fn().mockResolvedValue({
      id: '1',
      lastName: 'Петров',
      firstName: 'Пётр',
      middleName: undefined,
    }),
  },
}));

describe('FullNamePage', () => {
  it('saves full name via container', async () => {
    const store = configureStore({
      reducer: { FullNameModule: FullNameSlice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    renderUiWithProviders(<FullNamePage />, store);

    fireEvent.change(screen.getByPlaceholderText('Введите фамилию'), {
      target: { value: 'Петров' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите имя'), {
      target: { value: 'Пётр' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => {
      expect(store.getState().FullNameModule.fullName?.lastName).toBe('Петров');
    });

    expect(screen.getByText(/Сохраненные данные/)).toBeInTheDocument();
  });
});
