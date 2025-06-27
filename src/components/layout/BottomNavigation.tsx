
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
    { href: '/create-post', icon: Plus, label: 'Пост', isButton: true },
    { href: '/leaderboard', icon: Trophy, label: 'Рейтинг' },
    { href: '/user-dashboard', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-1 py-2 z-50 md:hidden">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          if (item.isButton) {
            return (
              <Link key={item.href} to={item.href} className="flex flex-col items-center">
                <Button
                  size="sm"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 p-0 shadow-lg"
                >
                  <Icon className="w-6 h-6 text-white" />
                </Button>
                <span className="text-xs font-medium text-gray-400 mt-1">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center space-y-1 p-2 min-w-0 transition-colors ${
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
  );
};

export default BottomNavigation;
