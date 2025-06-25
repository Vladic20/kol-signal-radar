
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PostCard } from '@/components/social/PostCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { kols, signals } from '@/data/mockData';
import { feedPosts } from '@/data/feedData';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  CheckCircle, 
  Lock, 
  TrendingUp, 
  Users, 
  Bell, 
  MessageCircle, 
  Share,
  MoreHorizontal,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Star,
  BarChart3,
  Target,
  Activity
} from 'lucide-react';

const KolProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { user, isPremium } = useAuth();
  const isMobile = useIsMobile();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const kol = kols.find(k => k.id === parseInt(id || '0'));
  if (!kol) {
    return (
      <Layout>
        <div className="py-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Трейдер не найден</h1>
          <Link to="/leaderboard">
            <Button variant="outline">Вернуться к лидерборду</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get posts by this KOL
  const kolPosts = feedPosts.filter(post => post.authorId === kol.id);
  const kolSignals = signals.filter(signal => signal.kolId === kol.id);

  // Calculate total followers across platforms
  const totalFollowers = kol.platforms.reduce((sum, platform) => sum + platform.followers, 0);

  // Mock stats
  const stats = {
    posts: kolPosts.length,
    signals: kolSignals.length,
    following: Math.floor(totalFollowers * 0.1),
    followers: totalFollowers,
    winRate: kol.accuracy,
    avgProfit: Math.floor(Math.random() * 20) + 10,
    totalTrades: Math.floor(Math.random() * 500) + 100,
    roi30d: Math.floor(Math.random() * 50) + 10
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Helper function to format date for timeAgo
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-4 md:py-8 animate-fade-in">
        {/* Header with cover and avatar */}
        <div className="relative mb-6">
          {/* Cover Image */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-lg mb-4" />
          
          {/* Profile Info */}
          <div className={`${isMobile ? 'px-4' : 'px-6'}`}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-24">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-black bg-black mb-4 md:mb-0">
                  <AvatarImage src={kol.avatar} alt={kol.name} />
                  <AvatarFallback>{kol.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                      {kol.name}
                    </h1>
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    {kol.premium && (
                      <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 mb-2">@{kol.name.toLowerCase().replace(/\s+/g, '_')}</p>
                  <p className="text-gray-300 mb-4">
                    Профессиональный трейдер • Аналитик криптовалют • ROI 30d: +{stats.roi30d}%
                  </p>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>На платформе с 2022</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{language === 'en' ? 'Global' : 'Глобально'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-neon-purple hover:underline cursor-pointer">
                        tradingview.com/u/{kol.name}
                      </span>
                    </div>
                  </div>

                  {/* Follow stats */}
                  <div className="flex space-x-4 text-sm">
                    <span className="text-white">
                      <strong>{formatNumber(stats.following)}</strong>{' '}
                      <span className="text-gray-400">подписок</span>
                    </span>
                    <span className="text-white">
                      <strong>{formatNumber(stats.followers)}</strong>{' '}
                      <span className="text-gray-400">подписчиков</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex ${isMobile ? 'flex-col mt-4 space-y-2' : 'space-x-2'} md:mt-0`}>
                {user ? (
                  <>
                    <Button
                      onClick={handleFollow}
                      className={`${isFollowing 
                        ? 'bg-gray-600 hover:bg-red-600 hover:text-white' 
                        : 'bg-neon-purple hover:bg-neon-purple/80'
                      } ${isMobile ? 'w-full' : ''}`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {isFollowing ? 'Отписаться' : 'Подписаться'}
                    </Button>
                    <Button variant="outline" className={`border-white/20 ${isMobile ? 'w-full' : ''}`}>
                      <Bell className="w-4 h-4 mr-2" />
                      Уведомления
                    </Button>
                    <Button variant="outline" size="icon" className="border-white/20">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button className={`bg-neon-purple hover:bg-neon-purple/80 ${isMobile ? 'w-full' : ''}`}>
                      Подписаться
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="icon" className="border-white/20">
                  <Share className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-white/20">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Stats Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 ${isMobile ? 'px-4' : 'px-0'}`}>
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-lg font-bold text-white">{stats.winRate}%</div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-lg font-bold text-white">+{stats.avgProfit}%</div>
              <div className="text-xs text-gray-400">Avg Profit</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-lg font-bold text-white">{stats.totalTrades}</div>
              <div className="text-xs text-gray-400">Total Trades</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-lg font-bold text-white">+{stats.roi30d}%</div>
              <div className="text-xs text-gray-400">ROI 30d</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className={isMobile ? 'px-4' : 'px-0'}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 max-w-lg bg-black/20 border border-white/10 mb-6">
              <TabsTrigger value="posts" className="data-[state=active]:bg-neon-purple/20">
                Посты ({stats.posts})
              </TabsTrigger>
              <TabsTrigger value="signals" className="data-[state=active]:bg-neon-purple/20">
                Сигналы ({stats.signals})
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-neon-purple/20">
                Медиа
              </TabsTrigger>
              <TabsTrigger value="likes" className="data-[state=active]:bg-neon-purple/20">
                Лайки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {kolPosts.length > 0 ? (
                kolPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-400">Пока нет постов</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="signals" className="space-y-4">
              {kolSignals.length > 0 ? (
                kolSignals.map(signal => (
                  <Card key={signal.id} className="glass-effect border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-white text-lg">{signal.asset}</h3>
                          <Badge className={`mt-1 ${
                            signal.type === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {signal.type === 'Long' ? 'BUY' : 'SELL'}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">{getTimeAgo(signal.date)}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
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
                ))
              ) : (
                <Card className="glass-effect border-white/10">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-400">Пока нет сигналов</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">Медиа контент появится здесь</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="likes" className="space-y-4">
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">Лайкнутые посты появятся здесь</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default KolProfilePage;
