
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
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 z-40">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-3 flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KL</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                KOL Hub
              </span>
            </Link>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="w-10 h-10 p-0 rounded-full hover:bg-white/10">
              <Search className="w-5 h-5" />
            </Button>
            <Button size="sm" variant="ghost" className="w-10 h-10 p-0 relative rounded-full hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 rounded-full hover:bg-white/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default MobileHeader;
