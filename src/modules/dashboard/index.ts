import { lazy } from 'react';

export const Dashboard = lazy(() =>
  import('./dashboard').then(module => ({
    default: module.Dashboard,
  })),
);
