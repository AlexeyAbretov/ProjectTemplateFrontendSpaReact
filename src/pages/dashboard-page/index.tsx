import { DashboardPage } from './dashboard-page';

export const routes: AppPageRoute[] = [
  { path: '/', element: <DashboardPage />, header: { label: 'Dashboard', order: 0 } },
];
