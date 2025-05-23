
import React, { useState } from 'react';
import { Home, Shield, Star, Image, Users, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/DashboardOverview';
import FeaturesManager from '@/components/admin/FeaturesManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import TeamManager from '@/components/admin/TeamManager';
import ContactManager from '@/components/admin/ContactManager';

type AdminSection = 'dashboard' | 'features' | 'testimonials' | 'gallery' | 'team' | 'contact';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Navigation items for the admin panel
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'features', label: 'Features', icon: Shield },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  // Render the active section content
  const renderContent = () => {
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
    <div className="min-h-screen bg-background flex">
      {/* Admin Sidebar with improved styling */}
      <AdminSidebar 
        navItems={navItems} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection as (section: string) => void} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title={navItems.find(item => item.id === activeSection)?.label || 'Dashboard'} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {renderContent()}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Admin;
