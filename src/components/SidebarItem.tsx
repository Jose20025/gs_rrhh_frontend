import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import { SidebarMenuItem } from './ui/sidebar';

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ href, icon, title }: SidebarItemProps) => {
  return (
    <SidebarMenuItem>
      <NavLink
        to={href}
        className={({ isActive }) =>
          cn('flex items-center gap-2 rounded p-2 text-sm transition-colors', {
            'bg-gray-200 text-gray-800': isActive,
            'text-gray-600 hover:bg-gray-100': !isActive,
          })
        }
      >
        {icon}
        <span>{title}</span>
      </NavLink>
    </SidebarMenuItem>
  );
};
