import { Suspense } from 'react';

import { Module1 } from '@modules/module1';

export const Page1: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Module1 />
    </Suspense>
  );
};
