import { Link } from 'react-router-dom';

import { Dashboard } from '@modules/dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <>
      <Dashboard />
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>
      </nav>
    </>
  );
};
