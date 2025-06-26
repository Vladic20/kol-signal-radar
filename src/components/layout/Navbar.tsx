
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, BarChart3, TrendingUp, PieChart, Copy, Newspaper, Presentation, Signal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { href: '/home', label: 'Главная', icon: BarChart3 },
    { href: '/leaderboard', label: 'Таблица лидеров', icon: TrendingUp },
    { href: '/signals', label: 'Сигналы', icon: Signal },
    { href: '/feed', label: language === 'en' ? 'Feed' : 'Лента', icon: Newspaper },
    { href: '/crypto-news', label: 'Crypto News', icon: Newspaper },
    { href: '/copy-trading', label: 'Копитрейдинг', icon: Copy },
    { href: '/token-positions', label: 'Long/Short', icon: PieChart },
    { href: '/presentation', label: 'Презентация', icon: Presentation },
    { href: '/about', label: 'О нас', icon: User },
  ];

  // Определяем тип пользователя для показа правильного дашборда
  const isKOL = user?.email?.includes('kol') || user?.name?.toLowerCase().includes('trader');
  const dashboardUrl = isKOL ? '/kol-dashboard' : '/user-dashboard';

  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KL</span>
            </div>
            <span className="text-xl font-bold text-gradient">KOL Leaderboard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={handleLanguageToggle} className="text-foreground/80">
              {language === 'en' ? 'РУС' : 'ENG'}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate(dashboardUrl)}>
                    <User className="w-4 h-4 mr-2" />
                    {isKOL ? 'KOL Панель' : 'Личный кабинет'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="w-4 h-4 mr-2" />
                    Старый дашборд
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button>Регистрация</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <Button variant="ghost" onClick={handleLanguageToggle} className="justify-start">
                  {language === 'en' ? 'РУС' : 'ENG'}
                </Button>
                
                {user ? (
                  <>
                    <Button variant="ghost" onClick={() => navigate(dashboardUrl)} className="justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {isKOL ? 'KOL Панель' : 'Личный кабинет'}
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">Войти</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Регистрация</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
