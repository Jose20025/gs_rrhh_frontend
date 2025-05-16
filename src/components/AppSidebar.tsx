import { UserCircleIcon, LogOutIcon, HomeIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from './ui/sidebar';
import { SidebarItem } from './SidebarItem';
import { useAuthStore } from '@/stores/auth.store';

const links = {
  GENERAL: [
    {
      href: '/',
      title: 'Inicio',
      icon: HomeIcon,
    },
  ],
};

export const AppSidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Sidebar>
      <SidebarContent>
        {Object.entries(links).map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarItem
                    key={`${item.href}-${item.title}`}
                    href={item.href}
                    title={item.title}
                    icon={<item.icon size={20} />}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuItem className="mb-1 flex flex-row items-center gap-2">
          <UserCircleIcon className="text-foreground/70" size={28} />

          <span className="text-foreground/70 text-base font-semibold">
            {user?.name}
          </span>
        </SidebarMenuItem>

        <Button onClick={logout} variant={'destructive'} className="w-full">
          <LogOutIcon className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
