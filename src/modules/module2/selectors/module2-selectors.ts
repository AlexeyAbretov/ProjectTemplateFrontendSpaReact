import { createSelector } from '@reduxjs/toolkit';
import { Module2StoreType } from '../types';
import { getAppStore } from '@selectors';

export const getModule2State = createSelector(
  [getAppStore],
  state => state.Module2 as Module2StoreType,
);

export const getModule2Step = createSelector([getModule2State], state => state.step);
