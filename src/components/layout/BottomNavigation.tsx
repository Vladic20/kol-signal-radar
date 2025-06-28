
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Trophy, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { href: '/', icon: Home, label: 'Главная' },
    { href: '/feed', icon: TrendingUp, label: 'Лента' },
    { 
      href: '/create-post', 
      icon: Plus, 
      label: 'Пост', 
      isCreateButton: true,
      onClick: () => navigate('/create-post')
    },
    { href: '/leaderboard', icon: Trophy, label: 'Рейтинг' },
    { href: user ? '/mobile-profile' : '/login', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-2 z-50 md:hidden">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          if (item.isCreateButton) {
            return (
              <Button
                key={item.href}
                onClick={item.onClick}
                className="w-12 h-12 rounded-full bg-neon-purple hover:bg-neon-purple/80 flex items-center justify-center shadow-lg"
              >
                <Icon className="w-6 h-6 text-white" />
              </Button>
            );
          }
          
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
  );
};

export default BottomNavigation;
