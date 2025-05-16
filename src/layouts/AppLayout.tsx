import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
