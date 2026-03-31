import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ErrorBoundary } from '../ErrorBoundary';

let shouldThrow = true;
const MutableThrow: React.FC = () => {
  if (shouldThrow) {
    throw new Error('render boom');
  }
  return <div>ok</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true;
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    shouldThrow = false;
    render(
      <ErrorBoundary>
        <MutableThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('ok')).toBeInTheDocument();
    shouldThrow = true;
  });

  it('renders ErrorFallback and retry clears error', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary level="page" componentName="t">
        <MutableThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Ошибка в Страница/)).toBeInTheDocument();
    expect(screen.getByText('render boom')).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: 'Повторить' }));

    expect(screen.getByText('ok')).toBeInTheDocument();
    shouldThrow = true;
  });

  it('uses custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>custom</div>}>
        <MutableThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('custom')).toBeInTheDocument();
  });
});
