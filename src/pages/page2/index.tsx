import { Module2Children1 } from '@modules/module2-children1';
import { Page2, Page2Layout } from './page2';
import { Module2Children2 } from '@modules/module2-children2';

export const routes = [
  {
    path: '/page2',
    element: <Page2Layout />,
    children: [
      { path: '/page2/page2-1', element: <Module2Children1 /> },
      { path: '/page2/page2-2', element: <Module2Children2 /> },
      { index: true, element: <Page2 /> },
    ],
  },
];
