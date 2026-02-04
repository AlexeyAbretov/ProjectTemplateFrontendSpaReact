import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { eventBus } from '@shared';

import { ErrorBoundary } from '@components';
import { Module2 } from '@modules/module2';

export const Page2Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = eventBus.on('OpenModule2Children2', () => {
      navigate('/page2/page2-2');
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <ErrorBoundary level="page">
      <div>
        <nav>
          <Link to="/page2">Список</Link>
          <Link to="/page2/page2-1">Элемент</Link>
        </nav>
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export const Page2: React.FC = () => {
  return (
    <ErrorBoundary level="module">
      <Module2 />
    </ErrorBoundary>
  );
};
