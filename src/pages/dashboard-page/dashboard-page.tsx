import { ErrorBoundary } from '@components';
import { Dashboard } from '@modules/dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <ErrorBoundary level="page">
      <Dashboard />
    </ErrorBoundary>
  );
};
