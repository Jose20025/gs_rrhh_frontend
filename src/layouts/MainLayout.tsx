import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export const MainLayout = () => {
  return (
    <div className="h-screen">
      <Outlet />

      <Toaster richColors theme="light" />
    </div>
  );
};
