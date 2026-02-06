import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { authApiService } from '../api';
import { AuthStoreType, LoginRequest } from '../types';

export const InitialStore: AuthStoreType = {
  loading: LoadingState.Idle,
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApiService.login(data);
      // Store token in localStorage if needed
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка авторизации');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authApiService.logout();
    localStorage.removeItem('authToken');
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Ошибка выхода из аккаунта');
  }
});

export const AuthSlice = createSlice({
  name: 'AuthStore',
  initialState: InitialStore,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = LoadingState.Pending;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = LoadingState.Success;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = LoadingState.Failed;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, state => {
        state.loading = LoadingState.Pending;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = LoadingState.Success;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = LoadingState.Failed;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = AuthSlice.actions;
