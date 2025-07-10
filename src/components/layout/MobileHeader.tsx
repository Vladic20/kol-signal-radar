
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import MobileSidebar from './MobileSidebar';

const MobileHeader = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 px-4 py-2 z-40">
        <div className="flex items-center justify-center w-full">
          {/* Centered Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KL</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              KOL Hub
            </span>
          </Link>
        </div>
      </div>

      <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default MobileHeader;
