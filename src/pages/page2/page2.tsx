import { Module2 } from '@modules/module2';
import { Link, Outlet } from 'react-router-dom';

export const Page2Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/page2">Список</Link>
        <Link to="/page2/page2-1">Элемент</Link>
        <Link to="/page2/page2-2">Просмотр</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export const Page2: React.FC = () => {
  return <Module2 />;
};
