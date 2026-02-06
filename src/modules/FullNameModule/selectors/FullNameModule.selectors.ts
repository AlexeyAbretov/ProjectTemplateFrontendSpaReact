import { createSelector } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';
import { getAppStore } from '@selectors';

import { FullNameStoreType } from '../types';

export const getFullNameModuleState = createSelector(
  [getAppStore],
  state => state.FullNameModule as FullNameStoreType,
);

export const getFullNameModuleFullNameContainerProps = createSelector(
  [getFullNameModuleState],
  state => ({
    isLoading: state.loading === LoadingState.Pending,
    error: state.error,
    fullName: state.fullName,
  }),
);
