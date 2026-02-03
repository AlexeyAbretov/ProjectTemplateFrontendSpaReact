import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '@components';

import { App } from './App';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <ErrorBoundary level="app">
      <App />
    </ErrorBoundary>,
  );
} else {
  console.error('Root container element not found!');
}
