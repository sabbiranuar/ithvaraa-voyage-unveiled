
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '/lovable-uploads/84eed264-6c40-4c6b-8298-4e5a56cfb8bf.png';

interface NavbarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 py-2 px-4',
        isScrolled ? 'transparent-header shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            <img src={logo} alt="Ithvaraa Logo" className="h-14" />
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-primary font-medium">
          <a href="#home" className="hover:text-secondary transition-colors">Home</a>
          <a href="#about" className="hover:text-secondary transition-colors">About</a>
          <a href="#features" className="hover:text-secondary transition-colors">Why Us</a>
          <a href="#gallery" className="hover:text-secondary transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
        </nav>
        
        <div>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
