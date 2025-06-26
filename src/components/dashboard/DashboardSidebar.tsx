
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
  Bell,
  Bookmark,
  Share2,
  Trophy,
  Wallet
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, isActive }: SidebarItemProps) => (
  <Link to={href}>
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className={`w-full justify-start space-x-3 ${isActive ? 'bg-neon-purple/20' : 'hover:bg-white/5'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  </Link>
);

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const userNavItems = [
    { href: '/dashboard', icon: Home, label: 'Главная' },
    { href: '/feed', icon: TrendingUp, label: 'Лента' },
    { href: '/dashboard/subscriptions', icon: Users, label: 'Подписки' },
    { href: '/dashboard/saved', icon: Bookmark, label: 'Сохранённое' },
    { href: '/dashboard/copy-trading', icon: BarChart3, label: 'Копитрейдинг' },
    { href: '/dashboard/referrals', icon: Share2, label: 'Рефералы' },
    { href: '/dashboard/achievements', icon: Trophy, label: 'Достижения' },
    { href: '/dashboard/settings', icon: Settings, label: 'Настройки' },
  ];

  const kolNavItems = [
    { href: '/kol-dashboard', icon: Home, label: 'Обзор' },
    { href: '/kol-dashboard/posts', icon: TrendingUp, label: 'Мои посты' },
    { href: '/kol-dashboard/signals', icon: BarChart3, label: 'Сигналы' },
    { href: '/kol-dashboard/subscribers', icon: Users, label: 'Подписчики' },
    { href: '/kol-dashboard/analytics', icon: TrendingUp, label: 'Аналитика' },
    { href: '/kol-dashboard/earnings', icon: Wallet, label: 'Доходы' },
    { href: '/kol-dashboard/settings', icon: Settings, label: 'Настройки' },
  ];

  // Определяем, является ли пользователь KOL'ом (пример логики)
  const isKOL = user?.email?.includes('kol') || user?.name?.toLowerCase().includes('trader');
  const navItems = isKOL ? kolNavItems : userNavItems;

  return (
    <div className="w-64 h-screen bg-black/20 border-r border-white/10 fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KL</span>
          </div>
          <span className="text-lg font-bold text-gradient">KOL Hub</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">
              {isKOL ? 'KOL Трейдер' : 'Пользователь'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.href}
          />
        ))}
      </nav>

      {/* Premium Upgrade (for non-KOL users) */}
      {!isKOL && !user?.isPremium && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 p-4 rounded-lg border border-neon-purple/30">
            <h3 className="text-sm font-semibold text-white mb-2">Премиум доступ</h3>
            <p className="text-xs text-gray-300 mb-3">Получите полный доступ к сигналам</p>
            <Button size="sm" className="w-full bg-neon-purple hover:bg-neon-purple/80">
              Подключить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
