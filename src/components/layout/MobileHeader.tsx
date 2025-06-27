
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const MobileHeader = () => {
  const { user } = useAuth();
  const kolPoints = Math.floor(Math.random() * 2000) + 500;
  const userRank = kolPoints > 1500 ? 'Gold' : kolPoints > 1000 ? 'Silver' : 'Bronze';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'KOL Hub - Мой профиль',
        text: `Смотри, я в топе по WinRate! Мой ранг: ${userRank}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 z-40">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">KL</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            KOL Hub
          </span>
        </Link>

        {/* User info and actions */}
        <div className="flex items-center space-x-3">
          {user && (
            <Link to="/user-dashboard" className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-xs font-medium text-white">@{user.name}</p>
                <div className="flex items-center space-x-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    userRank === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                    userRank === 'Silver' ? 'bg-gray-400/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {userRank}
                  </span>
                  <span className="text-xs text-neon-purple">💠 {kolPoints}</span>
                </div>
              </div>
            </Link>
          )}
          
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Search className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>
            {user && (
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
