
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background bg-mesh w-full">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar - показываем только если пользователь авторизован и showSidebar = true */}
        {user && showSidebar && <DashboardSidebar />}
        
        {/* Main Content */}
        <main className={`flex-1 pt-20 px-4 ${user && showSidebar ? 'ml-64' : ''}`}>
          <div className="container mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
