import React, { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appInitializer } from '@store';

appInitializer.init();

export const App: React.FC = (): JSX.Element => {
  return <Provider store={appInitializer.store}>
    <RouterProvider router={appInitializer.getRouter()} />
  </Provider>
}
