
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, User, Bell, Shield, Key, LogOut, Save } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Криптотрейдер с 5-летним опытом',
    isPublic: true,
    notifications: {
      posts: true,
      trades: true,
      follows: true,
      achievements: true
    }
  });

  const handleSave = () => {
    console.log('Saving profile:', profile);
    // TODO: Implement save logic
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pt-16 pb-24' : 'pt-20'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Настройки</h1>
        <Button 
          size="sm" 
          className="bg-neon-purple hover:bg-neon-purple/80"
          onClick={handleSave}
        >
          <Save className="w-4 h-4 mr-1" />
          Сохранить
        </Button>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Profile Settings */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Профиль
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} />
                <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                  {profile.name[0]}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="border-white/20">
                Изменить фото
              </Button>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Имя</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-black/40 border-white/10"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-black/40 border-white/10"
                type="email"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Описание</label>
              <Input
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-black/40 border-white/10"
                placeholder="Расскажите о себе..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Приватность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Публичный профиль</span>
                <p className="text-sm text-gray-400">Профиль виден всем пользователям</p>
              </div>
              <Switch 
                checked={profile.isPublic}
                onCheckedChange={(checked) => setProfile({ ...profile, isPublic: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Новые посты</span>
                <p className="text-sm text-gray-400">От KOL'ов на которых подписаны</p>
              </div>
              <Switch 
                checked={profile.notifications.posts}
                onCheckedChange={(checked) => setProfile({ 
                  ...profile, 
                  notifications: { ...profile.notifications, posts: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Торговые сигналы</span>
                <p className="text-sm text-gray-400">Уведомления о новых сделках</p>
              </div>
              <Switch 
                checked={profile.notifications.trades}
                onCheckedChange={(checked) => setProfile({ 
                  ...profile, 
                  notifications: { ...profile.notifications, trades: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Новые подписки</span>
                <p className="text-sm text-gray-400">Когда кто-то подписывается на вас</p>
              </div>
              <Switch 
                checked={profile.notifications.follows}
                onCheckedChange={(checked) => setProfile({ 
                  ...profile, 
                  notifications: { ...profile.notifications, follows: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Достижения</span>
                <p className="text-sm text-gray-400">Новые бейджи и награды</p>
              </div>
              <Switch 
                checked={profile.notifications.achievements}
                onCheckedChange={(checked) => setProfile({ 
                  ...profile, 
                  notifications: { ...profile.notifications, achievements: checked }
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Key className="w-5 h-5 mr-2" />
              API настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full border-white/20"
              onClick={() => navigate('/copy-trading')}
            >
              Настроить копитрейдинг
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-white/20"
            >
              Управление API ключами
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="glass-effect border-red-500/20">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
