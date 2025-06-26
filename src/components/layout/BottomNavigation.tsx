
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Plus, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const BottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { href: '/home', icon: Home, label: 'Главная' },
    { href: '/feed', icon: TrendingUp, label: 'Лента' },
    { href: '/create-post', icon: Plus, label: 'Пост', isButton: true },
    { href: '/leaderboard', icon: Users, label: 'Рейтинг' },
    { href: '/user-dashboard', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 px-2 py-2 z-50 md:hidden">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          if (item.isButton) {
            return (
              <Button
                key={item.href}
                size="sm"
                className="w-12 h-12 rounded-full bg-neon-purple hover:bg-neon-purple/80 p-0"
              >
                <Icon className="w-5 h-5 text-white" />
              </Button>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center space-y-1 p-2 min-w-0 ${
                isActive ? 'text-neon-purple' : 'text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-neon-purple' : 'text-gray-400'}`} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
