
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  TrendingUp, 
  Users, 
  User, 
  Settings, 
  BarChart3,
  Bookmark,
  Share2,
  Trophy,
  Wallet,
  Newspaper,
  Copy,
  PieChart,
  Signal
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, isActive }: SidebarItemProps) => (
  <Link to={href} className="block">
    <Button 
      variant="ghost" 
      className={`w-full justify-start space-x-3 h-12 px-4 text-left hover:bg-white/5 transition-colors ${
        isActive ? 'bg-neon-purple/10 text-neon-purple border-r-2 border-neon-purple' : 'text-gray-300 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  </Link>
);

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const mainNavItems = [
    { href: '/home', icon: Home, label: 'Главная' },
    { href: '/feed', icon: TrendingUp, label: 'Лента' },
    { href: '/leaderboard', icon: Users, label: 'KOL рейтинг' },
    { href: '/signals', icon: Signal, label: 'Сигналы' },
    { href: '/copy-trading', icon: Copy, label: 'Копитрейдинг' },
    { href: '/token-positions', icon: PieChart, label: 'Long/Short' },
    { href: '/crypto-news', icon: Newspaper, label: 'Новости' },
  ];

  const userNavItems = [
    { href: '/user-dashboard', icon: User, label: 'Личный кабинет' },
    { href: '/dashboard/subscriptions', icon: Users, label: 'Подписки' },
    { href: '/dashboard/saved', icon: Bookmark, label: 'Сохранённое' },
    { href: '/dashboard/referrals', icon: Share2, label: 'Рефералы' },
    { href: '/dashboard/achievements', icon: Trophy, label: 'Достижения' },
    { href: '/dashboard/settings', icon: Settings, label: 'Настройки' },
  ];

  // Определяем, является ли пользователь KOL'ом
  const isKOL = user?.email?.includes('kol') || user?.name?.toLowerCase().includes('trader');

  return (
    <div className="w-64 h-screen bg-black/95 border-r border-white/10 fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KL</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            KOL Hub
          </span>
        </Link>
      </div>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
              <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                {user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {isKOL ? 'KOL Трейдер' : 'Пользователь'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="p-2">
          <div className="mb-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Основное
            </p>
          </div>
          {mainNavItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>

        {/* User Navigation */}
        {user && (
          <div className="p-2 border-t border-white/10">
            <div className="mb-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Личное
              </p>
            </div>
            {userNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>
        )}
      </nav>

      {/* Premium Upgrade (for non-KOL users) */}
      {user && !isKOL && !user?.isPremium && (
        <div className="p-4 border-t border-white/10">
          <div className="bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 p-3 rounded-lg border border-neon-purple/30">
            <h3 className="text-sm font-semibold text-white mb-1">Премиум доступ</h3>
            <p className="text-xs text-gray-300 mb-3">Получите полный доступ к сигналам</p>
            <Button size="sm" className="w-full bg-neon-purple hover:bg-neon-purple/80 text-xs h-8">
              <Wallet className="w-3 h-3 mr-1" />
              Подключить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
