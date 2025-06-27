
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Plus, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const BottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { href: '/', icon: Home, label: 'Главная' },
    { href: '/feed', icon: TrendingUp, label: 'Лента' },
    { href: '/leaderboard', icon: Trophy, label: 'Рейтинг' },
    { href: user ? '/mobile-profile' : '/login', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-2 py-2 z-50 md:hidden">
      <div className="flex items-center justify-center max-w-sm mx-auto relative">
        {/* Left navigation items */}
        <div className="flex items-center justify-around flex-1">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center space-y-1 p-3 min-w-0 transition-colors ${
                  isActive ? 'text-neon-purple' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-neon-purple' : 'text-gray-400'}`} />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Central floating Create Post button */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2">
          <Link to="/create-post">
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 p-0 shadow-2xl border-4 border-black"
            >
              <Plus className="w-8 h-8 text-white" />
            </Button>
          </Link>
        </div>

        {/* Right navigation items */}
        <div className="flex items-center justify-around flex-1">
          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center space-y-1 p-3 min-w-0 transition-colors ${
                  isActive ? 'text-neon-purple' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-neon-purple' : 'text-gray-400'}`} />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
