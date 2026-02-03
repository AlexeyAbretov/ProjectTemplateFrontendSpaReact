import { ErrorBoundary } from '@components';
import { Module2Children1 } from '@modules/module2-children1';
import { Module2Children2 } from '@modules/module2-children2';

import { Page2, Page2Layout } from './page2';

export const routes = [
  {
    path: '/page2',
    element: <Page2Layout />,
    children: [
      {
        path: '/page2/page2-1',
        element: (
          <ErrorBoundary level="module">
            <Module2Children1 />
          </ErrorBoundary>
        ),
      },
      {
        path: '/page2/page2-2',
        element: (
          <ErrorBoundary level="module">
            <Module2Children2 />
          </ErrorBoundary>
        ),
      },
      { index: true, element: <Page2 /> },
    ],
  },
];
