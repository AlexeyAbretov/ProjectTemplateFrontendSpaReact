import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { Module1StoreType } from '../types';

export const InitialStore: Module1StoreType = {
  loading: LoadingState.Idle,
  items: [],
  step: '',
};

export const loadItems = createAsyncThunk('Module1Store/items/get', async (step: string) => {
  return {
    step,
    items: [
      {
        id: 1,
        name: '1',
      },
      {
        id: 2,
        name: '2',
      },
    ],
  };
});

export const Module1Slice = createSlice({
  name: 'Module1Store',
  initialState: InitialStore,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadItems.pending, state => {
      state.loading = LoadingState.Pending;
      state.items = [];
    });

    builder.addCase(loadItems.fulfilled, (state, action) => {
      state.loading = LoadingState.Success;
      state.items = action.payload.items;
      state.step = action.payload.step;
    });

    builder.addCase(loadItems.rejected, state => {
      state.loading = LoadingState.Failed;
      state.items = [];
    });
  },
});
