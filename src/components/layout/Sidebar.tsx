import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Adjusted relative path

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav is a self-contained component handling its own fixed positioning,
  // width (w-64), background (bg-sidebar), and internal layout.
  // The className prop is passed through to allow MainAppLayout or other consumers
  // to add styling if necessary, though SidebarNav is largely self-styled.
  return <SidebarNav className={cn(className)} />;
};

export default Sidebar;
