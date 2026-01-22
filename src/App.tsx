import React, { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppInitializer } from './AppHelpers';

const appInitializer = new AppInitializer();
appInitializer.init();

export const App: React.FC = (): JSX.Element => {
    return <Provider store={appInitializer.getStore()}>
      <RouterProvider router={appInitializer.getRouter()} />
    </Provider>
}
