import { configureStore } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { fullNameApiService } from '../../api';
import { clearError, FullNameSlice, saveFullName } from '../FullNameModule.store';

jest.mock('../../api', () => ({
  fullNameApiService: {
    saveFullName: jest.fn(),
  },
}));

describe('FullNameSlice', () => {
  const saveMock = fullNameApiService.saveFullName as jest.MockedFunction<
    typeof fullNameApiService.saveFullName
  >;

  beforeEach(() => {
    saveMock.mockReset();
  });

  it('handles saveFullName success', async () => {
    saveMock.mockResolvedValue({
      id: '1',
      lastName: 'A',
      firstName: 'B',
      middleName: undefined,
    });

    const store = configureStore({
      reducer: { FullNameModule: FullNameSlice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    await store.dispatch(saveFullName({ lastName: 'A', firstName: 'B', middleName: undefined }));

    const s = store.getState().FullNameModule;
    expect(s.loading).toBe(LoadingState.Success);
    expect(s.fullName).toMatchObject({ lastName: 'A' });
    expect(s.error).toBeNull();
  });

  it('handles saveFullName rejection', async () => {
    saveMock.mockRejectedValue(new Error('fail'));

    const store = configureStore({
      reducer: { FullNameModule: FullNameSlice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    await store.dispatch(saveFullName({ lastName: 'A', firstName: 'B', middleName: undefined }));

    expect(store.getState().FullNameModule.loading).toBe(LoadingState.Failed);
    expect(store.getState().FullNameModule.error).toBeTruthy();
  });

  it('clearError resets error', () => {
    const store = configureStore({
      reducer: { FullNameModule: FullNameSlice.reducer },
      preloadedState: {
        FullNameModule: {
          loading: LoadingState.Failed,
          fullName: null,
          error: 'e',
        },
      },
    });

    store.dispatch(clearError());
    expect(store.getState().FullNameModule.error).toBeNull();
  });
});
