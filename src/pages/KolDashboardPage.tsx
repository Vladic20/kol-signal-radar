
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
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 min-w-0">
        <div className="p-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-2">
                KOL Панель
              </h1>
              <p className="text-gray-400">
                Управляйте контентом, подписчиками и доходами
              </p>
            </div>
            
            <div className="flex space-x-3">
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
            <TabsList className="grid grid-cols-6 max-w-3xl bg-black/20 border border-white/10 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neon-purple/20">
                Обзор
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-neon-purple/20">
                Посты
              </TabsTrigger>
              <TabsTrigger value="signals" className="data-[state=active]:bg-neon-purple/20">
                Сигналы
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="data-[state=active]:bg-neon-purple/20">
                Подписчики
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-neon-purple/20">
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="earnings" className="data-[state=active]:bg-neon-purple/20">
                Доходы
              </TabsTrigger>
            </TabsList>

            {/* Обзор */}
            <TabsContent value="overview" className="space-y-6">
              {/* Основные статистики */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{kolStats.totalSubscribers.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Подписчиков</div>
                    <div className="text-xs text-green-400 mt-1">+{kolStats.activeSubscribers} активных</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Wallet className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{formatCurrency(kolStats.monthlyRevenue)}</div>
                    <div className="text-sm text-gray-400">Доход/месяц</div>
                    <div className="text-xs text-green-400 mt-1">+15% к прошлому месяцу</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{kolStats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                    <div className="text-xs text-green-400 mt-1">{kolStats.successfulSignals}/{kolStats.totalSignals} сигналов</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{kolStats.kolPoints.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">KOL Points</div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 mt-1">
                      {kolStats.rank}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Прогресс до следующего ранга */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Прогресс до Platinum ранга
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">8,750 / 15,000 KOL Points</span>
                      <span className="text-white">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                    <p className="text-xs text-gray-400">
                      Осталось набрать 6,250 поинтов для следующего ранга
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Последние посты */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Последние посты
                    </div>
                    <Button variant="ghost" size="sm" className="text-neon-purple">
                      Посмотреть все
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Посты */}
            <TabsContent value="posts" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Мои посты ({kolStats.postsCount})</h2>
                  <p className="text-gray-400">Общие просмотры: {kolStats.totalViews.toLocaleString()}</p>
                </div>
                <Button className="bg-neon-purple hover:bg-neon-purple/80">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать пост
                </Button>
              </div>

              <div className="grid gap-4">
                {feedPosts.slice(0, 8).map(post => (
                  <Card key={post.id} className="glass-effect border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-white mb-2">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {Math.floor(Math.random() * 1000) + 100}
                            </span>
                            <span>{post.likes} лайков</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-white/20">
                            Редактировать
                          </Button>
                          <Button size="sm" variant="destructive">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Сигналы */}
            <TabsContent value="signals" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Мои сигналы</h2>
                  <p className="text-gray-400">
                    {kolStats.successfulSignals} успешных из {kolStats.totalSignals} • Win Rate: {kolStats.winRate}%
                  </p>
                </div>
                <Button className="bg-neon-purple hover:bg-neon-purple/80">
                  <Plus className="w-4 h-4 mr-2" />
                  Новый сигнал
                </Button>
              </div>

              <div className="grid gap-4">
                {recentSignals.map(signal => (
                  <Card key={signal.id} className="glass-effect border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white text-lg">{signal.asset}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={signal.type === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {signal.type === 'Long' ? 'LONG' : 'SHORT'}
                            </Badge>
                            <span className="text-sm text-gray-400">{signal.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">ROI</div>
                          <div className="text-lg font-bold text-green-400">+{Math.floor(Math.random() * 30) + 5}%</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
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

            {/* Подписчики */}
            <TabsContent value="subscribers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-white">{kolStats.totalSubscribers}</div>
                    <div className="text-sm text-gray-400">Всего подписчиков</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-400">{kolStats.activeSubscribers}</div>
                    <div className="text-sm text-gray-400">Активных</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-400">+{Math.floor(Math.random() * 50) + 20}</div>
                    <div className="text-sm text-gray-400">За месяц</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Рост подписчиков</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">График роста подписчиков будет здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Аналитика */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Статистика торговли</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Средний ROI:</span>
                        <span className="text-white font-bold">+{kolStats.averageROI}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Лучший сигнал:</span>
                        <span className="text-green-400 font-bold">+85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Худший сигнал:</span>
                        <span className="text-red-400 font-bold">-12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Популярность контента</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Всего просмотров:</span>
                        <span className="text-white font-bold">{kolStats.totalViews.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Среднее лайков:</span>
                        <span className="text-white font-bold">{Math.floor(Math.random() * 100) + 50}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Вовлечённость:</span>
                        <span className="text-white font-bold">{Math.floor(Math.random() * 10) + 5}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Доходы */}
            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{formatCurrency(kolStats.totalRevenue)}</div>
                    <div className="text-sm text-gray-400">Общий доход</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{formatCurrency(kolStats.monthlyRevenue)}</div>
                    <div className="text-sm text-gray-400">За этот месяц</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{formatCurrency(kolStats.monthlyRevenue / kolStats.activeSubscribers)}</div>
                    <div className="text-sm text-gray-400">На подписчика</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">История доходов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((month, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                        <span className="text-white">{month.month} 2024</span>
                        <div className="text-right">
                          <div className="text-white font-bold">{formatCurrency(month.revenue)}</div>
                          <div className="text-sm text-gray-400">+{month.subscribers} подписчиков</div>
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
