import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Module2 } from '@modules/module2';

export const Page2Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      navigate('/page2/page2-2');
    };

    window.addEventListener('OpenModule2Children2', handler);

    return () => {
      window.removeEventListener('OpenModule2Children2', handler);
    };
  });

  return (
    <div>
      <nav>
        <Link to="/page2">Список</Link>
        <Link to="/page2/page2-1">Элемент</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export const Page2: React.FC = () => {
  return <Module2 />;
};
