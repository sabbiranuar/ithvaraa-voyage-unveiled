
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({
  navItems,
  activeSection,
  setActiveSection,
  isMobileOpen,
  setIsMobileOpen
}: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 md:z-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          "flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="text-lg font-bold text-primary">
            Ithvaraa Admin
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    activeSection === item.id && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  )}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Website
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
