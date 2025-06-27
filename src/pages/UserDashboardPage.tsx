import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardRightPanel from '@/components/dashboard/DashboardRightPanel';
import { PostCard } from '@/components/social/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { kols, signals } from '@/data/mockData';
import { feedPosts } from '@/data/feedData';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Heart, 
  Bookmark, 
  ExternalLink,
  Copy,
  Trophy,
  Share2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  // Redirect mobile users to mobile profile
  useEffect(() => {
    if (isMobile) {
      navigate('/mobile-profile');
      return;
    }
  }, [isMobile, navigate]);

  // Моковые данные пользователя
  const userStats = {
    following: 8,
    totalPnL: 2450,
    winRate: 67,
    activeCopies: 3,
    savedPosts: 12,
    kolPoints: 1250,
    referrals: 2,
    referralEarnings: 150
  };

  const followedKols = kols.slice(0, userStats.following);
  const recentPosts = feedPosts.slice(0, 5);
  const copyTradingResults = [
    { kolName: 'CryptoMaster', pnl: +850, trades: 12, winRate: 75 },
    { kolName: 'BlockchainPro', pnl: +1200, trades: 8, winRate: 62.5 },
    { kolName: 'DeFiExpert', pnl: +400, trades: 15, winRate: 60 }
  ];

  const formatCurrency = (amount: number) => {
    return `${amount >= 0 ? '+' : ''}$${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <div className="flex min-h-screen bg-background bg-mesh w-full">
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 mr-80 min-w-0">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-2">
              Личный кабинет
            </h1>
            <p className="text-gray-400">
              Добро пожаловать, {user?.name}! Управляйте своими подписками и отслеживайте результаты.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 max-w-2xl bg-black/20 border border-white/10 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neon-purple/20">
                Обзор
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="data-[state=active]:bg-neon-purple/20">
                Подписки
              </TabsTrigger>
              <TabsTrigger value="copy-trading" className="data-[state=active]:bg-neon-purple/20">
                Копитрейдинг
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-neon-purple/20">
                Сохранённое
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-neon-purple/20">
                Рефералы
              </TabsTrigger>
            </TabsList>

            {/* Обзор */}
            <TabsContent value="overview" className="space-y-6">
              {/* Статистические карточки */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{formatCurrency(userStats.totalPnL)}</div>
                    <div className="text-sm text-gray-400">Общий PnL</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{userStats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{userStats.following}</div>
                    <div className="text-sm text-gray-400">Подписок</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Copy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{userStats.activeCopies}</div>
                    <div className="text-sm text-gray-400">Активных копий</div>
                  </CardContent>
                </Card>
              </div>

              {/* Лента от подписок */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Лента подписок
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                  <Button variant="outline" className="w-full border-white/20">
                    Посмотреть всю ленту
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Подписки */}
            <TabsContent value="subscriptions" className="space-y-6">
              <div className="grid gap-4">
                {followedKols.map(kol => (
                  <Card key={kol.id} className="glass-effect border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={kol.avatar} alt={kol.name} />
                            <AvatarFallback>{kol.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{kol.name}</h3>
                            <p className="text-sm text-gray-400">
                              {kol.accuracy}% точность • {kol.platforms[0].followers.toLocaleString()} подписчиков
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20"
                            onClick={() => navigate(`/kol-profile/${kol.id}`)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Профиль
                          </Button>
                          <Button size="sm" variant="destructive">
                            Отписаться
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Копитрейдинг */}
            <TabsContent value="copy-trading" className="space-y-6">
              <div className="grid gap-4">
                {copyTradingResults.map((result, index) => (
                  <Card key={index} className="glass-effect border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-white">{result.kolName}</h3>
                          <p className="text-sm text-gray-400">
                            {result.trades} сделок • {result.winRate}% успех
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${result.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(result.pnl)}
                          </div>
                          <Badge className={result.pnl >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {result.pnl >= 0 ? 'Прибыль' : 'Убыток'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/80">
                Настроить копитрейдинг
              </Button>
            </TabsContent>

            {/* Сохранённое */}
            <TabsContent value="saved" className="space-y-6">
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bookmark className="w-5 h-5 mr-2" />
                    Сохранённые посты ({userStats.savedPosts})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">Здесь будут ваши сохранённые посты</p>
                    <Button variant="outline" className="border-white/20">
                      Посмотреть все посты
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Рефералы */}
            <TabsContent value="referrals" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Share2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{userStats.referrals}</div>
                    <div className="text-sm text-gray-400">Приглашено друзей</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{formatCurrency(userStats.referralEarnings)}</div>
                    <div className="text-sm text-gray-400">Заработано</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Реферальная ссылка</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      value={`https://kolhub.com/ref/${user?.id}`}
                      readOnly
                      className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
                    />
                    <Button variant="outline" className="border-white/20">
                      Копировать
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Получайте 10% от всех покупок приглашённых пользователей
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Panel */}
      <div className="fixed right-0 top-0 h-screen w-80 p-6 overflow-y-auto">
        <DashboardRightPanel />
      </div>
    </div>
  );
};

export default UserDashboardPage;
