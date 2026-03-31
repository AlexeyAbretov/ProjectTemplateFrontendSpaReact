import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { eventBus } from '@shared';
import { act, render, screen, waitFor } from '@testing-library/react';

import { Module2Slice } from '@modules/module2/store';
import { renderUiWithProviders } from '@testUtils';

import { Page2, Page2Layout } from '../page2';

describe('Page2', () => {
  it('renders Module2', async () => {
    const store = configureStore({
      reducer: { Module2: Module2Slice.reducer },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    renderUiWithProviders(<Page2 />, store);

    await waitFor(() => {
      expect(screen.getByText('Module 2')).toBeInTheDocument();
    });
  });
});

describe('Page2Layout', () => {
  it('navigates on OpenModule2Children2', async () => {
    render(
      <MemoryRouter initialEntries={['/page2']}>
        <Routes>
          <Route path="/page2" element={<Page2Layout />}>
            <Route index element={<div>start</div>} />
            <Route path="page2-2" element={<div data-testid="target">child2</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('start')).toBeInTheDocument();

    await act(async () => {
      eventBus.emit('OpenModule2Children2');
    });

    await waitFor(() => {
      expect(screen.getByTestId('target')).toBeInTheDocument();
    });
  });
});
