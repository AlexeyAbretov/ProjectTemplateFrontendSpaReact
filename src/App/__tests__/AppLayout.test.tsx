import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@theme';

import { appInitializer } from '../AppInitializer';
import { AppLayout } from '../AppLayout';

describe('AppLayout', () => {
  beforeEach(() => {
    jest.spyOn(appInitializer, 'getHeaderNavLinks').mockReturnValue([
      { to: '/', label: 'Dashboard', order: 0 },
      { to: '/page1', label: 'Page1', order: 1 },
      { to: '/page2', label: 'Page2', order: 2 },
    ]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders nav and outlet child', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<span>inner</span>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(appInitializer.getHeaderNavLinks).toHaveBeenCalled();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('inner')).toBeInTheDocument();
  });
});
