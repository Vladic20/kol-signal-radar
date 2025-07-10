
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import BottomNavigation from './BottomNavigation';
import MobileHeader from './MobileHeader';
import FloatingCreateButton from '../common/FloatingCreateButton';
import CreatePostModal from '../social/CreatePostModal';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Global create post handler
  const handleCreatePost = () => {
    setIsCreatePostModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background bg-mesh w-full">
      {/* Desktop Navbar */}
      {!isMobile && <Navbar />}
      
      {/* Mobile Header */}
      {isMobile && <MobileHeader />}
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        {user && showSidebar && !isMobile && <DashboardSidebar />}
        
        {/* Main Content */}
        <main className={`flex-1 ${
          isMobile 
            ? 'pt-12 pb-24 px-0' 
            : `pt-20 px-4 ${user && showSidebar ? 'ml-64' : ''}`
        }`}>
          <div className={`mx-auto ${
            isMobile 
              ? 'max-w-full px-0' 
              : 'container max-w-6xl'
          }`}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Desktop Footer */}
      {!isMobile && <Footer />}
      
      {/* Mobile Bottom Navigation with integrated create button */}
      {isMobile && (
        <BottomNavigation 
          onCreatePost={handleCreatePost}
        />
      )}
      
      {/* Floating Create Button for Desktop only */}
      {user && !isMobile && <FloatingCreateButton />}
      
      {/* Global Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
