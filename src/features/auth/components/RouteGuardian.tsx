import { useAuthStore } from '@/stores/auth.store';
import { Navigate, Outlet } from 'react-router';

export const RouteGuardian = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
