
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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({
  navItems,
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen
}: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative top-0 left-0 z-50 md:z-0 h-screen w-64 bg-card border-r transition-transform duration-300 ease-in-out",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link to="/" className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="bg-primary/10 text-primary p-1 rounded">IT</span>
            <span>Ithvaraa Admin</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button 
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"} 
                className={cn(
                  "w-full justify-start font-normal",
                  activeSection === item.id && "font-medium"
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t">
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
