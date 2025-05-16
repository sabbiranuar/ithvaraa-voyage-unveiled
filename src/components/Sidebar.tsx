
import React from 'react';
import { X, Home, Users, Map, Image, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import logo from '/lovable-uploads/84eed264-6c40-4c6b-8298-4e5a56cfb8bf.png';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Map, label: 'Trips', href: '#trips' },
    { icon: Image, label: 'Gallery', href: '#gallery' },
    { icon: Users, label: 'Team', href: '#team' },
    { icon: Calendar, label: 'Senior & Family Trips', href: '#family-trips' },
    { icon: Heart, label: 'Community Engagement', href: '#community' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center gap-2">
              <img src={logo} alt="Ithvaraa Logo" className="h-12" />
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="py-6 px-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 text-base font-normal"
                onClick={() => handleNavClick(item.href)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t">
            <Button className="w-full bg-primary hover:bg-primary/90">Contact Us</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
