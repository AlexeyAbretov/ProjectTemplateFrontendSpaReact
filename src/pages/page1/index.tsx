import { Page1 } from './page1';

export const routes: AppPageRoute[] = [
  {
    path: '/page1',
    element: <Page1 />,
    header: { label: 'Page1', order: 1 },
  },
];
