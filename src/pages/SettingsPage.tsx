
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, Key, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pt-16 pb-24' : 'pt-20'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-sm sticky top-0 z-40">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Настройки</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Profile Settings */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <User className="w-5 h-5 mr-2 text-neon-purple" />
              Профиль
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Имя пользователя</label>
              <Input
                value={user?.name || ''}
                className="bg-black/40 border-white/10"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <Input
                value={user?.email || ''}
                className="bg-black/40 border-white/10"
                placeholder="email@example.com"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Биография</label>
              <Input
                className="bg-black/40 border-white/10"
                placeholder="Расскажите о себе..."
              />
            </div>
            <Button className="bg-neon-purple hover:bg-neon-purple/80">
              Сохранить изменения
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Bell className="w-5 h-5 mr-2 text-neon-purple" />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Push-уведомления</span>
                <p className="text-sm text-gray-400">Получать уведомления в браузере</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Email уведомления</span>
                <p className="text-sm text-gray-400">Получать уведомления на почту</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Новые подписчики</span>
                <p className="text-sm text-gray-400">Уведомлять о новых подписчиках</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Лайки и комментарии</span>
                <p className="text-sm text-gray-400">Уведомлять об активности</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Shield className="w-5 h-5 mr-2 text-neon-purple" />
              Приватность и безопасность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Видимость профиля</label>
              <Select defaultValue="public">
                <SelectTrigger className="bg-black/40 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Публичный</SelectItem>
                  <SelectItem value="private">Приватный</SelectItem>
                  <SelectItem value="followers">Только подписчики</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Показывать статистику</span>
                <p className="text-sm text-gray-400">Отображать PnL и статистику торговли</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/10" />
            <Button variant="outline" className="border-white/20 w-full">
              Изменить пароль
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Palette className="w-5 h-5 mr-2 text-neon-purple" />
              Внешний вид
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Тема</label>
              <Select defaultValue="dark">
                <SelectTrigger className="bg-black/40 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Темная</SelectItem>
                  <SelectItem value="light">Светлая</SelectItem>
                  <SelectItem value="auto">Автоматическая</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Язык</label>
              <Select defaultValue="ru">
                <SelectTrigger className="bg-black/40 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Key className="w-5 h-5 mr-2 text-neon-purple" />
              API настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Binance API Key</label>
              <Input
                className="bg-black/40 border-white/10"
                placeholder="Введите API ключ"
                type="password"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Binance Secret Key</label>
              <Input
                className="bg-black/40 border-white/10"
                placeholder="Введите секретный ключ"
                type="password"
              />
            </div>
            <Button variant="outline" className="border-white/20 w-full">
              Проверить подключение
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="glass-effect border-red-500/20">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
