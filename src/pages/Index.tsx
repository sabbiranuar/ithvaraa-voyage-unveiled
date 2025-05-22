
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GallerySection from '@/components/GallerySection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <GallerySection />
        <TeamSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* Admin link - typically this would be hidden and protected */}
      <div className="fixed bottom-4 right-4">
        <Link 
          to="/admin" 
          className="bg-gray-800/80 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-sm flex items-center shadow-lg"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Index;
