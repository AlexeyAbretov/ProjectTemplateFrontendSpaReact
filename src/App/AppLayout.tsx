import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ErrorBoundary, SuspenseFallback } from '@components';

import { Footer, Header, Layout, Main, Nav, NavLink } from './AppLayout.styled';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  return (
    <Layout>
      <Header>
        <Nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/page1">Page1</NavLink>
          <NavLink to="/page2">Page2</NavLink>
        </Nav>
      </Header>
      <Main>
        <ErrorBoundary level="page">
          <Suspense key={location.pathname} fallback={<SuspenseFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Main>
      <Footer>© {new Date().getFullYear()}</Footer>
    </Layout>
  );
};
