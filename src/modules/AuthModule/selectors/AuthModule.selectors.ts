import { createSelector } from '@reduxjs/toolkit';

import { LoadingState } from '@constants';
import { getAppStore } from '@selectors';

import { AuthStoreType } from '../types';

export const getAuthModuleState = createSelector(
  [getAppStore],
  state => state.AuthStore as AuthStoreType,
);

export const getAuthModuleLoginContainerProps = createSelector([getAuthModuleState], state => ({
  isLoading: state.loading === LoadingState.Pending,
  error: state.error,
}));
