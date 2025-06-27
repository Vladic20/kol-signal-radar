
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerClose 
} from '@/components/ui/drawer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Signal, 
  Settings, 
  Trophy, 
  Share2, 
  Copy,
  PieChart,
  HelpCircle,
  X
} from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileSidebar = ({ isOpen, setIsOpen }: MobileSidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const kolPoints = Math.floor(Math.random() * 2000) + 500;
  const userRank = kolPoints > 1500 ? 'Gold' : kolPoints > 1000 ? 'Silver' : 'Bronze';

  const menuItems = [
    { href: '/signals', icon: Signal, label: 'Сигналы' },
    { href: '/token-positions', icon: PieChart, label: 'Long/Short' },
    { href: '/copy-trading', icon: Copy, label: 'Копитрейдинг' },
    { href: '/dashboard/referrals', icon: Share2, label: 'Рефералы' },
    { href: '/dashboard/achievements', icon: Trophy, label: 'Достижения' },
    { href: '/dashboard/settings', icon: Settings, label: 'Настройки' },
    { href: '/faq', icon: HelpCircle, label: 'Поддержка' },
  ];

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-black/95 border-white/10 h-[85vh]">
        <DrawerHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              KOL Hub
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          {/* User Profile Section */}
          {user && (
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                  <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-white font-medium">@{user?.name}</p>
                  <div className="flex items-center space-x-2 text-sm">
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
            </div>
          )}

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleItemClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-neon-purple/10 text-neon-purple' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          {user && (
            <div className="p-4 border-t border-white/10 mt-auto">
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-gray-300 hover:text-white hover:bg-white/5"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                Выйти
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
