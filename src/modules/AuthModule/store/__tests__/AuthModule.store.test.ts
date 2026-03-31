import { configureStore } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { authApiService } from '../../api';
import { AuthSlice, clearError, login, logout } from '../AuthModule.store';

jest.mock('../../api', () => ({
  authApiService: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}));

describe('AuthSlice', () => {
  const loginMock = authApiService.login as jest.MockedFunction<typeof authApiService.login>;
  const logoutMock = authApiService.logout as jest.MockedFunction<typeof authApiService.logout>;

  beforeEach(() => {
    loginMock.mockReset();
    logoutMock.mockReset();
    localStorage.clear();
  });

  const createStore = () =>
    configureStore({
      reducer: { AuthStore: AuthSlice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

  it('login success stores user and token', async () => {
    loginMock.mockResolvedValue({
      user: { id: '1', email: 'a@b.c' },
      token: 'tok',
    });

    const store = createStore();
    await store.dispatch(login({ email: 'a@b.c' }));

    const s = store.getState().AuthStore;
    expect(s.loading).toBe(LoadingState.Success);
    expect(s.isAuthenticated).toBe(true);
    expect(s.token).toBe('tok');
    expect(localStorage.getItem('authToken')).toBe('tok');
  });

  it('login failure clears session', async () => {
    loginMock.mockRejectedValue(new Error('bad'));

    const store = createStore();
    await store.dispatch(login({ email: 'a@b.c' }));

    const s = store.getState().AuthStore;
    expect(s.loading).toBe(LoadingState.Failed);
    expect(s.isAuthenticated).toBe(false);
    expect(s.error).toBeTruthy();
  });

  it('logout success clears state', async () => {
    logoutMock.mockResolvedValue(undefined);
    localStorage.setItem('authToken', 't');

    const store = configureStore({
      reducer: { AuthStore: AuthSlice.reducer },
      preloadedState: {
        AuthStore: {
          loading: LoadingState.Success,
          isAuthenticated: true,
          user: { id: '1', email: 'x@y.z' },
          token: 't',
          error: null,
        },
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    await store.dispatch(logout());

    const s = store.getState().AuthStore;
    expect(s.isAuthenticated).toBe(false);
    expect(s.token).toBeNull();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('logout rejection sets error', async () => {
    logoutMock.mockRejectedValue(new Error('no'));

    const store = createStore();
    await store.dispatch(logout());

    expect(store.getState().AuthStore.loading).toBe(LoadingState.Failed);
    expect(store.getState().AuthStore.error).toBeTruthy();
  });

  it('clearError resets error', () => {
    const store = configureStore({
      reducer: { AuthStore: AuthSlice.reducer },
      preloadedState: {
        AuthStore: {
          loading: LoadingState.Failed,
          isAuthenticated: false,
          user: null,
          token: null,
          error: 'x',
        },
      },
    });

    store.dispatch(clearError());
    expect(store.getState().AuthStore.error).toBeNull();
  });
});
