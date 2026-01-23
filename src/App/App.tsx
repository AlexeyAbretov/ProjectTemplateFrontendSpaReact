import React, { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appInitializer } from './appInitializer';
import { ThemeProvider } from 'styled-components';
import { theme } from '@theme';

appInitializer.init();

export const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={appInitializer.store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={appInitializer.getRouter()} />
      </ThemeProvider>
    </Provider>
  );
};
