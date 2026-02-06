import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { fullNameApiService } from '../api';
import { FullNameRequest, FullNameResponse, FullNameStoreType } from '../types';

// Define the initial state
export const InitialStore: FullNameStoreType = {
  loading: LoadingState.Idle,
  fullName: null,
  error: null,
};

// Define async thunks
export const saveFullName = createAsyncThunk<
  FullNameResponse,
  FullNameRequest,
  { rejectValue: string }
>('fullName/saveFullName', async (data, { rejectWithValue }) => {
  try {
    const response = await fullNameApiService.saveFullName(data);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Failed to save full name');
  }
});

// Create the slice
export const FullNameSlice = createSlice({
  name: 'FullNameModule',
  initialState: InitialStore,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveFullName.pending, state => {
        state.loading = LoadingState.Pending;
        state.error = null;
      })
      .addCase(saveFullName.fulfilled, (state, action: PayloadAction<FullNameResponse>) => {
        state.loading = LoadingState.Success;
        state.fullName = action.payload;
        state.error = null;
      })
      .addCase(saveFullName.rejected, (state, action) => {
        state.loading = LoadingState.Failed;
        state.error = (action.payload as string) || 'An error occurred';
      });
  },
});

export const { clearError } = FullNameSlice.actions;
