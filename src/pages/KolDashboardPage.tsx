import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { PostCard } from '@/components/social/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { signals } from '@/data/mockData';
import { feedPosts } from '@/data/feedData';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Wallet, 
  Award,
  Plus,
  Settings,
  Eye,
  DollarSign,
  Target,
  Activity
} from 'lucide-react';

const KolDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  // Моковые данные KOL'а
  const kolStats = {
    totalSubscribers: 1250,
    activeSubscribers: 890,
    totalRevenue: 15400,
    monthlyRevenue: 3200,
    totalSignals: 45,
    successfulSignals: 31,
    winRate: 68.9,
    averageROI: 24.5,
    kolPoints: 8750,
    rank: 'Gold',
    postsCount: 28,
    totalViews: 45600
  };

  const recentSignals = signals.slice(0, 5);
  const myPosts = feedPosts.filter(post => post.authorId === 1).slice(0, 3);

  const monthlyData = [
    { month: 'Янв', revenue: 2100, subscribers: 45 },
    { month: 'Фев', revenue: 2800, subscribers: 62 },
    { month: 'Мар', revenue: 3200, subscribers: 78 }
  ];

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="flex min-h-screen bg-background bg-mesh w-full">
      {!isMobile && <DashboardSidebar />}
      
      {/* Main Content */}
      <div className={`flex-1 min-w-0 ${!isMobile ? 'ml-64' : ''}`}>
        <div className={`p-4 md:p-6 max-w-6xl mx-auto ${isMobile ? 'pt-20 pb-24' : ''}`}>
          {/* Header */}
          <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-2">
                KOL Панель
              </h1>
              <p className="text-sm md:text-base text-gray-400">
                Управляйте контентом, подписчиками и доходами
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
              <Button className="bg-neon-purple hover:bg-neon-purple/80">
                <Plus className="w-4 h-4 mr-2" />
                Создать пост
              </Button>
              <Button variant="outline" className="border-white/20">
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`w-full bg-black/20 border border-white/10 mb-6 md:mb-8 ${
              isMobile ? 'grid grid-cols-3 h-auto' : 'flex flex-wrap max-w-4xl'
            }`}>
              <TabsTrigger 
                value="overview" 
                className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
              >
                Обзор
              </TabsTrigger>
              <TabsTrigger 
                value="posts" 
                className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
              >
                Посты
              </TabsTrigger>
              <TabsTrigger 
                value="signals" 
                className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
              >
                Сигналы
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="subscribers" className="data-[state=active]:bg-neon-purple/20">
                    Подписчики
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-neon-purple/20">
                    Аналитика
                  </TabsTrigger>
                  <TabsTrigger value="earnings" className="data-[state=active]:bg-neon-purple/20">
                    Доходы
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            {/* Mobile additional tabs */}
            {isMobile && (
              <div className="grid grid-cols-3 gap-2 mb-6">
                <Button 
                  variant={activeTab === 'subscribers' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('subscribers')}
                  className="text-xs"
                >
                  Подписчики
                </Button>
                <Button 
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('analytics')}
                  className="text-xs"
                >
                  Аналитика
                </Button>
                <Button 
                  variant={activeTab === 'earnings' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('earnings')}
                  className="text-xs"
                >
                  Доходы
                </Button>
              </div>
            )}

            {/* Обзор */}
            <TabsContent value="overview" className="space-y-4 md:space-y-6">
              {/* Основные статистики */}
              <div className={`grid gap-4 md:gap-6 ${
                isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-4'
              }`}>
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <Users className={`text-blue-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                      {kolStats.totalSubscribers.toLocaleString()}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Подписчиков</div>
                    <div className={`text-green-400 mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      +{kolStats.activeSubscribers} активных
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <Wallet className={`text-green-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                      {formatCurrency(kolStats.monthlyRevenue)}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Доход/месяц</div>
                    <div className={`text-green-400 mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      +15% к прошлому месяцу
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <TrendingUp className={`text-purple-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                      {kolStats.winRate}%
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Win Rate</div>
                    <div className={`text-green-400 mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      {kolStats.successfulSignals}/{kolStats.totalSignals} сигналов
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <Award className={`text-yellow-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                      {kolStats.kolPoints.toLocaleString()}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>KOL Points</div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 mt-1 text-xs">
                      {kolStats.rank}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Progress */}
              <Card className="glass-effect border-white/10">
                <CardHeader className={isMobile ? 'p-4 pb-2' : ''}>
                  <CardTitle className={`text-white flex items-center ${isMobile ? 'text-lg' : ''}`}>
                    <Target className={`mr-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    Прогресс до Platinum ранга
                  </CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? 'p-4 pt-2' : ''}>
                  <div className="space-y-2">
                    <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      <span className="text-gray-400">8,750 / 15,000 KOL Points</span>
                      <span className="text-white">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                    <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      Осталось набрать 6,250 поинтов для следующего ранга
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent posts */}
              <Card className="glass-effect border-white/10">
                <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
                  <CardTitle className={`text-white flex items-center justify-between ${isMobile ? 'text-lg' : ''}`}>
                    <div className="flex items-center">
                      <Activity className={`mr-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      Последние посты
                    </div>
                    <Button variant="ghost" size="sm" className="text-neon-purple">
                      Посмотреть все
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-2' : ''}`}>
                  {myPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                  <h2 className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    Мои посты ({kolStats.postsCount})
                  </h2>
                  <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>
                    Общие просмотры: {kolStats.totalViews.toLocaleString()}
                  </p>
                </div>
                <Button className="bg-neon-purple hover:bg-neon-purple/80 w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать пост
                </Button>
              </div>

              <div className="grid gap-4">
                {feedPosts.slice(0, 8).map(post => (
                  <Card key={post.id} className="glass-effect border-white/10">
                    <CardContent className={isMobile ? 'p-3' : 'p-4'}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0">
                        <div className="flex-1">
                          <p className={`text-white mb-2 ${isMobile ? 'text-sm' : ''}`}>
                            {post.content}
                          </p>
                          <div className={`flex items-center space-x-4 text-gray-400 ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              {Math.floor(Math.random() * 1000) + 100}
                            </span>
                            <span>{post.likes} лайков</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 w-full md:w-auto">
                          <Button size="sm" variant="outline" className="border-white/20 flex-1 md:flex-none">
                            Редактировать
                          </Button>
                          <Button size="sm" variant="destructive" className="flex-1 md:flex-none">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Signals Tab */}
            <TabsContent value="signals" className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                  <h2 className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>Мои сигналы</h2>
                  <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>
                    {kolStats.successfulSignals} успешных из {kolStats.totalSignals} • Win Rate: {kolStats.winRate}%
                  </p>
                </div>
                <Button className="bg-neon-purple hover:bg-neon-purple/80 w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Новый сигнал
                </Button>
              </div>

              <div className="grid gap-4">
                {recentSignals.map(signal => (
                  <Card key={signal.id} className="glass-effect border-white/10">
                    <CardContent className={isMobile ? 'p-3' : 'p-4'}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0">
                        <div className="flex-1">
                          <h3 className={`font-bold text-white ${isMobile ? 'text-base' : 'text-lg'}`}>
                            {signal.asset}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={signal.type === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {signal.type === 'Long' ? 'LONG' : 'SHORT'}
                            </Badge>
                            <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {signal.date}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>ROI</div>
                          <div className={`font-bold text-green-400 ${isMobile ? 'text-base' : 'text-lg'}`}>
                            +{Math.floor(Math.random() * 30) + 5}%
                          </div>
                        </div>
                      </div>
                      
                      <div className={`grid grid-cols-3 gap-4 mt-4 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <div>
                          <span className="text-gray-400">Entry:</span>
                          <div className="text-white font-medium">${signal.entryPrice}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Target:</span>
                          <div className="text-green-400 font-medium">${signal.targetPrice}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Stop:</span>
                          <div className="text-red-400 font-medium">${signal.stopLoss}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Rest of the tabs with similar mobile adaptations */}
            <TabsContent value="subscribers" className="space-y-4 md:space-y-6">
              <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      {kolStats.totalSubscribers}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>Всего подписчиков</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`font-bold text-green-400 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      {kolStats.activeSubscribers}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>Активных</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`font-bold text-blue-400 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      +{Math.floor(Math.random() * 50) + 20}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>За месяц</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect border-white/10">
                <CardHeader className={isMobile ? 'p-4' : ''}>
                  <CardTitle className={`text-white ${isMobile ? 'text-lg' : ''}`}>Рост подписчиков</CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? 'p-4' : ''}>
                  <div className={`text-center ${isMobile ? 'py-6' : 'py-8'}`}>
                    <BarChart3 className={`text-gray-400 mx-auto mb-4 ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`} />
                    <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>
                      График роста подписчиков будет здесь
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4 md:space-y-6">
              <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                <Card className="glass-effect border-white/10">
                  <CardHeader className={isMobile ? 'p-4 pb-2' : ''}>
                    <CardTitle className={`text-white ${isMobile ? 'text-lg' : ''}`}>
                      Статистика торговли
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${isMobile ? 'p-4 pt-2' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Средний ROI:</span>
                        <span className={`text-white font-bold ${isMobile ? 'text-sm' : ''}`}>
                          +{kolStats.averageROI}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Лучший сигнал:</span>
                        <span className={`text-green-400 font-bold ${isMobile ? 'text-sm' : ''}`}>+85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Худший сигнал:</span>
                        <span className={`text-red-400 font-bold ${isMobile ? 'text-sm' : ''}`}>-12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/10">
                  <CardHeader className={isMobile ? 'p-4 pb-2' : ''}>
                    <CardTitle className={`text-white ${isMobile ? 'text-lg' : ''}`}>
                      Популярность контента
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${isMobile ? 'p-4 pt-2' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Всего просмотров:</span>
                        <span className={`text-white font-bold ${isMobile ? 'text-sm' : ''}`}>
                          {kolStats.totalViews.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Среднее лайков:</span>
                        <span className={`text-white font-bold ${isMobile ? 'text-sm' : ''}`}>
                          {Math.floor(Math.random() * 100) + 50}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>Вовлечённость:</span>
                        <span className={`text-white font-bold ${isMobile ? 'text-sm' : ''}`}>
                          {Math.floor(Math.random() * 10) + 5}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="space-y-4 md:space-y-6">
              <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <DollarSign className={`text-green-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      {formatCurrency(kolStats.totalRevenue)}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>Общий доход</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <TrendingUp className={`text-blue-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      {formatCurrency(kolStats.monthlyRevenue)}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>За этот месяц</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className={`text-center ${isMobile ? 'p-4' : 'p-6'}`}>
                    <Users className={`text-purple-400 mx-auto mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    <div className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      {formatCurrency(kolStats.monthlyRevenue / kolStats.activeSubscribers)}
                    </div>
                    <div className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>На подписчика</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect border-white/10">
                <CardHeader className={isMobile ? 'p-4' : ''}>
                  <CardTitle className={`text-white ${isMobile ? 'text-lg' : ''}`}>История доходов</CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? 'p-4' : ''}>
                  <div className="space-y-4">
                    {monthlyData.map((month, index) => (
                      <div key={index} className={`flex justify-between items-center bg-black/20 rounded-lg ${
                        isMobile ? 'p-3' : 'p-3'
                      }`}>
                        <span className={`text-white ${isMobile ? 'text-sm' : ''}`}>{month.month} 2024</span>
                        <div className="text-right">
                          <div className={`text-white font-bold ${isMobile ? 'text-sm' : ''}`}>
                            {formatCurrency(month.revenue)}
                          </div>
                          <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            +{month.subscribers} подписчиков
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default KolDashboardPage;
