import { FullNameSlice } from './FullNameModule.store';

export const reducer = {
  name: 'FullNameModule',
  value: FullNameSlice.reducer,
};

export { clearError, FullNameSlice, InitialStore, saveFullName } from './FullNameModule.store';
