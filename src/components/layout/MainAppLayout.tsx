import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  /** Optional className to be applied to the main content's inner container div. */
  mainContentClassName?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, mainContentClassName }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar component, renders SidebarNav which is fixed positioned. */}
      <Sidebar />
      
      {/* This div acts as the main content column, offset for the fixed sidebar on medium screens and up. */}
      {/* It uses flexbox to arrange Header (fixed, out of flow but part of this conceptual column) and main content. */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Header component, renders TopHeader which is fixed positioned. */}
        <Header />
        
        {/* Main content area */}
        <main 
          className={cn(
            "flex-1",        // Ensures main content takes up available vertical space in the flex column.
            "mt-[60px]",     // Margin-top to account for the fixed Header's height (h-[60px]).
            "p-6",           // Padding around the main content area, as per layout requirements (mainContent.layout).
            "min-w-0",       // Essential for flex children to prevent overflow issues and allow text truncation.
            "overflow-y-auto" // Enables vertical scrolling for main content if it exceeds viewport height (overall.sizing.mainContent).
          )}
        >
          {/* Inner container for children, applying flex column layout and gap between items. */}
          {/* This corresponds to mainContent.container requirements. */}
          <div className={cn("flex flex-col gap-6", mainContentClassName)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
