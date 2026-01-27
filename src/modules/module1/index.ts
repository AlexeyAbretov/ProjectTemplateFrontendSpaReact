import { lazy } from 'react';

import { Module1Slice } from './store';

export const Module1 = lazy(() =>
  import('./module1').then(module => ({
    default: module.Module1,
  })),
);

export const reducer = {
  name: 'Module1',
  value: Module1Slice.reducer,
};
