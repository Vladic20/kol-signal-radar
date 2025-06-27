
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
  X,
  LogOut
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

  const menuSections = [
    {
      title: 'Торговля',
      items: [
        { href: '/signals', icon: Signal, label: 'Сигналы' },
        { href: '/token-positions', icon: PieChart, label: 'Long/Short' },
        { href: '/copy-trading', icon: Copy, label: 'Копитрейдинг' },
      ]
    },
    {
      title: 'Социальное',
      items: [
        { href: '/dashboard/referrals', icon: Share2, label: 'Рефералы' },
        { href: '/dashboard/achievements', icon: Trophy, label: 'Достижения' },
      ]
    },
    {
      title: 'Настройки',
      items: [
        { href: '/dashboard/settings', icon: Settings, label: 'Настройки' },
        { href: '/faq', icon: HelpCircle, label: 'Поддержка' },
      ]
    }
  ];

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-black/95 border-white/10 h-[90vh]">
        <DrawerHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Меню
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
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
                <Avatar className="w-14 h-14">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                  <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-lg">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg">@{user?.name}</p>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      userRank === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                      userRank === 'Silver' ? 'bg-gray-400/20 text-gray-300' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {userRank}
                    </span>
                    <span className="text-neon-purple font-medium">💠 {kolPoints}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Sections */}
          <div className="p-2">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-4 py-2 mb-2">
                  {section.title}
                </h3>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleItemClick}
                      className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-neon-purple/10 text-neon-purple' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Logout Button */}
          {user && (
            <div className="p-4 border-t border-white/10 mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 h-12"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="w-5 h-5 mr-4" />
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
