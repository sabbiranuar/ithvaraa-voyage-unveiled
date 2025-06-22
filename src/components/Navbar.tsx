
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <img src="/lovable-uploads/d8cc3cc1-b3a9-404a-88ec-302081c42eff.png" alt="Ithvaraa Logo" className="h-14" />
          </div>
        </div>
        
        <div className="hidden lg:flex items-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-48 h-28 object-cover rounded-lg"
          >
            <source src="https://drive.google.com/uc?export=download&id=107XPWgcyUuJR11CB2ineaz59f7h7sba7" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
