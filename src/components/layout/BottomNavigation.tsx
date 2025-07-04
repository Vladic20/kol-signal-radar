
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Trophy, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface BottomNavigationProps {
  onCreatePost?: () => void;
}

const BottomNavigation = ({ onCreatePost }: BottomNavigationProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { href: '/feed', icon: Home, label: 'Лента' },
    { href: '/leaderboard', icon: TrendingUp, label: 'Рейтинг' },
    { href: '/copy-trading', icon: Trophy, label: 'Копи' },
    { href: user ? '/user-dashboard' : '/login', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-2 py-2 z-50 md:hidden">
      <div className="flex items-center justify-center w-full max-w-md mx-auto">
        {/* Left Items */}
        <div className="flex flex-1 justify-around">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center justify-center space-y-1 p-2 transition-colors min-w-[50px] ${
                  isActive ? 'text-neon-purple' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-neon-purple' : 'text-gray-400'}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Center Create Button */}
        <div className="flex-shrink-0 px-2">
          <Button
            onClick={onCreatePost}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Right Items */}
        <div className="flex flex-1 justify-around">
          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center justify-center space-y-1 p-2 transition-colors min-w-[50px] ${
                  isActive ? 'text-neon-purple' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-neon-purple' : 'text-gray-400'}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
