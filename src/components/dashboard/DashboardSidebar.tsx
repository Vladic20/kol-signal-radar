
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
  Signal,
  Bell,
  Plus,
  Info
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  badge?: string;
}

const SidebarItem = ({ href, icon: Icon, label, isActive, badge }: SidebarItemProps) => (
  <Link to={href} className="block">
    <Button 
      variant="ghost" 
      className={`w-full justify-start space-x-3 h-11 px-4 text-left hover:bg-white/5 transition-colors relative ${
        isActive ? 'bg-neon-purple/10 text-neon-purple border-r-2 border-neon-purple' : 'text-gray-300 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
      {badge && (
        <span className="absolute right-3 bg-neon-purple text-white text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Button>
  </Link>
);

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't render sidebar on mobile - we'll use bottom navigation instead
  if (isMobile) {
    return null;
  }

  const mainNavItems = [
    { href: '/feed', icon: TrendingUp, label: 'Лента' },
    { href: '/signals', icon: Signal, label: 'Сигналы' },
    { href: '/leaderboard', icon: Users, label: 'Рейтинг KOL' },
    { href: '/copy-trading', icon: Copy, label: 'Копитрейдинг' },
    { href: '/token-positions', icon: PieChart, label: 'Long/Short' },
    { href: '/crypto-news', icon: Newspaper, label: 'Новости' },
  ];

  const userNavItems = [
    { href: '/user-dashboard', icon: User, label: 'Личный кабинет' },
    { href: '/dashboard/subscriptions', icon: Users, label: 'Подписки' },
    { href: '/dashboard/achievements', icon: Trophy, label: 'Достижения' },
    { href: '/dashboard/settings', icon: Settings, label: 'Настройки' },
    { href: '/dashboard/referrals', icon: Share2, label: 'Рефералы' },
  ];

  // Определяем, является ли пользователь KOL'ом
  const isKOL = user?.email?.includes('kol') || user?.name?.toLowerCase().includes('trader');
  const kolPoints = Math.floor(Math.random() * 2000) + 500;
  const userRank = kolPoints > 1500 ? 'Gold' : kolPoints > 1000 ? 'Silver' : 'Bronze';

  return (
    <div className="w-64 h-screen bg-black/95 border-r border-white/10 fixed left-0 top-0 z-50 flex flex-col">
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

      {/* User Profile with KOL Points */}
      {user && (
        <div className="p-4 border-b border-white/10">
          <Link to="/user-dashboard" className="block">
            <div className="flex items-center space-x-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
              <Avatar className="w-10 h-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                  {user?.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">@{user?.name}</p>
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${
                    userRank === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                    userRank === 'Silver' ? 'bg-gray-400/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {userRank}
                  </span>
                  <span className="text-neon-purple">💠 {kolPoints}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="p-2">
          <div className="mb-2 px-4 py-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Основное
            </p>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
              <Bell className="w-3 h-3" />
            </Button>
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
          
          {/* Create Post Button */}
          <div className="px-2 py-2">
            <Button className="w-full bg-neon-purple hover:bg-neon-purple/80 text-sm h-10">
              <Plus className="w-4 h-4 mr-2" />
              Создать пост
            </Button>
          </div>
        </div>

        {/* User Navigation */}
        {user && (
          <div className="p-2 border-t border-white/10">
            <div className="mb-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Пользователь
              </p>
            </div>
            {userNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.href}
                badge={item.href === '/dashboard/achievements' ? '3' : undefined}
              />
            ))}
          </div>
        )}
      </nav>

      {/* KOL Points Info */}
      {user && (
        <div className="p-4 border-t border-white/10">
          <div className="bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 p-3 rounded-lg border border-neon-purple/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">KOL Points</h3>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-300 mb-2">За посты, лайки и сигналы</p>
            <div className="flex items-center justify-between">
              <span className="text-neon-purple font-bold">💠 {kolPoints}</span>
              <Button size="sm" variant="outline" className="border-neon-purple/30 text-xs h-6">
                <Share2 className="w-3 h-3 mr-1" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
