import React, { JSX } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '@theme';

import { appInitializer } from './appInitializer';

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
