import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader'; // Adjusted relative path

interface HeaderProps {
  className?: string;
  // title?: string; // Title could be a prop if TopHeader was designed to accept it.
                    // Given TopHeader.tsx hardcodes 'Dashboard', this prop is omitted for now.
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // TopHeader is a self-contained component handling its own fixed positioning,
  // height (h-[60px]), background (bg-card/surface), and internal layout.
  // It also handles responsive adjustments for sidebar width (md:left-64).
  // The className prop is passed through for any additional styling needs.
  return <TopHeader className={cn(className)} />;
};

export default Header;
