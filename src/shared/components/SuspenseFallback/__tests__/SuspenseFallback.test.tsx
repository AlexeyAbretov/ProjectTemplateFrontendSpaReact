import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@theme';

import { SuspenseFallback } from '../SuspenseFallback';

const LazyChild = React.lazy(async () => ({
  default: () => <div>loaded</div>,
}));

describe('SuspenseFallback', () => {
  it('renders loading text', () => {
    render(
      <ThemeProvider theme={theme}>
        <SuspenseFallback />
      </ThemeProvider>,
    );
    expect(screen.getByText('Загрузка…')).toBeInTheDocument();
  });

  it('is used as Suspense fallback', async () => {
    render(
      <ThemeProvider theme={theme}>
        <Suspense fallback={<SuspenseFallback />}>
          <LazyChild />
        </Suspense>
      </ThemeProvider>,
    );
    expect(await screen.findByText('loaded')).toBeInTheDocument();
  });
});
