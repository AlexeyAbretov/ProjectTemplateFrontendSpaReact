import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';

import { Module2Steps } from '../constants';
import { Module2StoreType } from '../types';

export const InitialStore: Module2StoreType = {
  loading: LoadingState.Idle,
  items: [],
  step: Module2Steps.Step1,
};

export const loadItems = createAsyncThunk('Module2Store/items/get', async () => {
  return [
    {
      id: 1,
      name: '1',
      desc: '222',
    },
    {
      id: 2,
      name: '2',
      desc: '221112',
    },
  ];
});

export const Module2Slice = createSlice({
  name: 'Module2Store',
  initialState: InitialStore,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadItems.pending, state => {
      state.loading = LoadingState.Pending;
      state.items = [];
    });

    builder.addCase(loadItems.fulfilled, (state, action) => {
      state.loading = LoadingState.Success;
      state.items = action.payload;
      state.step = Module2Steps.Step2;
    });

    builder.addCase(loadItems.rejected, state => {
      state.loading = LoadingState.Failed;
      state.items = [];
    });
  },
});
