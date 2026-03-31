import { Suspense } from 'react';
import { render, screen } from '@testing-library/react';

import { DashboardPage } from '../dashboard-page';

describe('DashboardPage', () => {
  it('renders dashboard inside error boundary', async () => {
    render(
      <Suspense fallback={null}>
        <DashboardPage />
      </Suspense>,
    );
    expect(await screen.findByText('Dasboard module')).toBeInTheDocument();
  });
});
