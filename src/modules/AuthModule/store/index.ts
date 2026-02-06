import { AuthSlice } from './AuthModule.store';

export const reducer = {
  name: AuthSlice.name,
  value: AuthSlice.reducer,
};

export { AuthSlice, clearError, InitialStore, login, logout } from './AuthModule.store';
