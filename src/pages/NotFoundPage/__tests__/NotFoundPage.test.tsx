import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { NotFoundPage } from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 and link home', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /На главную/ })).toHaveAttribute('href', '/');
  });
});
