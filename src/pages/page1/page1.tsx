import { Suspense } from 'react';

import { ErrorBoundary, SuspenseFallback } from '@components';
import { Module1 } from '@modules/module1';

export const Page1: React.FC = () => {
  return (
    <ErrorBoundary level="module" componentName="page1">
      <Suspense fallback={<SuspenseFallback />}>
        <Module1 />
      </Suspense>
    </ErrorBoundary>
  );
};
