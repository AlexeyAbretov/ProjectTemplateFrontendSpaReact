import { render, screen } from '@testing-library/react';

import { Dashboard } from '../dashboard';

describe('Dashboard', () => {
  it('renders', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dasboard module')).toBeInTheDocument();
  });
});
