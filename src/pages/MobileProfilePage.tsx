
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { feedPosts } from '@/data/feedData';
import { PostCard } from '@/components/social/PostCard';
import { 
  TrendingUp, 
  Users, 
  Copy, 
  Settings,
  Share2,
  Trophy,
  BarChart3,
  Edit3,
  ChevronRight,
  Bookmark,
  Award
} from 'lucide-react';

const MobileProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('posts');

  // Mock user stats
  const userStats = {
    following: 8,
    followers: 156,
    totalPnL: 2450,
    winRate: 67,
    activeCopies: 3,
    kolPoints: 1250,
    posts: 24
  };

  const userPosts = feedPosts.slice(0, 5);
  const userRank = userStats.kolPoints > 1500 ? 'Gold' : userStats.kolPoints > 1000 ? 'Silver' : 'Bronze';

  if (!isMobile) {
    navigate('/user-dashboard');
    return null;
  }

  const quickActions = [
    { 
      icon: Users, 
      label: 'Мои подписки', 
      action: () => navigate('/following'),
      count: userStats.following
    },
    { 
      icon: Bookmark, 
      label: 'Сохранённое', 
      action: () => navigate('/saved'),
      count: 12
    },
    { 
      icon: Copy, 
      label: 'Мои копии', 
      action: () => navigate('/copy-trading'),
      count: userStats.activeCopies
    },
    { 
      icon: Award, 
      label: 'Достижения', 
      action: () => navigate('/achievements'),
      count: 4
    },
  ];

  const profileActions = [
    { icon: Settings, label: 'Настройки', action: () => navigate('/dashboard') },
    { icon: Share2, label: 'Поделиться', action: () => {} },
  ];

  return (
    <div className="pb-20 pt-16 bg-background min-h-screen">
      {/* Profile Header */}
      <div className="px-4 mb-6">
        {/* User Info */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20 border-2 border-neon-purple/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
              <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-2xl">
                {user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{user?.name}</h1>
              <p className="text-gray-400">@{user?.name}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  userRank === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                  userRank === 'Silver' ? 'bg-gray-400/20 text-gray-300' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {userRank}
                </span>
                <span className="text-sm text-neon-purple font-semibold">💠 {userStats.kolPoints}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-white/20">
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Profile Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {profileActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-12 border-white/20 text-white justify-center space-x-2"
              onClick={action.action}
            >
              <action.icon className="w-4 h-4" />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-1 mb-6">
          <div className="text-center p-3">
            <div className="text-lg font-bold text-white">{userStats.posts}</div>
            <div className="text-xs text-gray-400">Постов</div>
          </div>
          <div className="text-center p-3">
            <div className="text-lg font-bold text-white">{userStats.followers}</div>
            <div className="text-xs text-gray-400">Подписчиков</div>
          </div>
          <div className="text-center p-3">
            <div className="text-lg font-bold text-white">{userStats.following}</div>
            <div className="text-xs text-gray-400">Подписок</div>
          </div>
          <div className="text-center p-3">
            <div className="text-lg font-bold text-green-400">{userStats.winRate}%</div>
            <div className="text-xs text-gray-400">Win Rate</div>
          </div>
        </div>

        {/* Trading Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">
                ${Math.abs(userStats.totalPnL).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Total PnL</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Copy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{userStats.activeCopies}</div>
              <div className="text-xs text-gray-400">Активных копий</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-2 mb-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-14 border border-white/10 text-white justify-between hover:bg-white/5 px-4"
              onClick={action.action}
            >
              <div className="flex items-center space-x-3">
                <action.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{action.count}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10 mb-4 h-12">
            <TabsTrigger value="posts" className="data-[state=active]:bg-neon-purple/20 text-sm">
              Посты
            </TabsTrigger>
            <TabsTrigger value="trades" className="data-[state=active]:bg-neon-purple/20 text-sm">
              Сделки
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-neon-purple/20 text-sm">
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4 mt-4">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="trades" className="mt-4">
            <Card className="glass-effect border-white/10">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">История сделок скоро будет доступна</p>
                <Button variant="outline" className="border-white/20">
                  Настроить копитрейдинг
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="space-y-4">
              <Card className="glass-effect border-white/10">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-4">Активность за месяц</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Постов создано</span>
                      <span className="text-white font-medium">{userStats.posts}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Лайков получено</span>
                      <span className="text-white font-medium">234</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Комментариев</span>
                      <span className="text-white font-medium">89</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Подписчиков привлечено</span>
                      <span className="text-white font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/10">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-4">Достижения</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-black/20 rounded-lg">
                      <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-sm text-white font-medium">Первый пост</div>
                      <div className="text-xs text-gray-400">Получено</div>
                    </div>
                    <div className="text-center p-3 bg-black/20 rounded-lg">
                      <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-sm text-white font-medium">100+ подписчиков</div>
                      <div className="text-xs text-gray-400">Получено</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-white/20"
                    onClick={() => navigate('/achievements')}
                  >
                    Смотреть все достижения
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileProfilePage;
