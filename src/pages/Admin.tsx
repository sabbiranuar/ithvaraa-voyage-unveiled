
import React, { useState } from 'react';
import { Shield, Map, Users, Image, Star, Phone, Home } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardOverview from '@/components/admin/DashboardOverview';
import FeaturesManager from '@/components/admin/FeaturesManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import TeamManager from '@/components/admin/TeamManager';
import ContactManager from '@/components/admin/ContactManager';

type AdminSection = 'dashboard' | 'features' | 'testimonials' | 'gallery' | 'team' | 'contact';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Admin navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'features', label: 'Features', icon: Shield },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  // Render the active section content
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'features':
        return <FeaturesManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'team':
        return <TeamManager />;
      case 'contact':
        return <ContactManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <AdminSidebar 
        navItems={navItems} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection as (section: string) => void} 
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title={navItems.find(item => item.id === activeSection)?.label || 'Dashboard'} 
          toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
