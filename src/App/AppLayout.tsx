import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ErrorBoundary, SuspenseFallback } from '@components';

import { appInitializer } from './AppInitializer';
import { Footer, Header, Layout, Main, Nav, NavLink } from './AppLayout.styled';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const headerNavLinks = appInitializer.getHeaderNavLinks();

  return (
    <Layout>
      <Header>
        <Nav>
          {headerNavLinks.map(({ to, label, order }) => (
            <NavLink key={`${to}::${label}::${order}`} to={to}>
              {label}
            </NavLink>
          ))}
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
