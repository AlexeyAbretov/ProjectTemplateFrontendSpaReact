import { Store, UnknownAction } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { theme } from '@theme';
import { JSX, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

export const TestComponentWrapper: React.FC<PropsWithChildren> = ({ children }): JSX.Element => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderUiWithProviders = (ui: React.ReactElement, store: Store<any, UnknownAction>) => {
  return render(
    <TestComponentWrapper>
      <Provider store={store}>{ui}</Provider>
    </TestComponentWrapper>,
  );
};
