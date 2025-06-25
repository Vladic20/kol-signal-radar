
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { tradingViewCallers } from '@/data/tradingViewCallers';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  CheckCircle, 
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
  Activity,
  TrendingUp,
  FileText,
  Heart,
  ExternalLink,
  Code,
  BookOpen
} from 'lucide-react';

const TradingViewCallerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { user, isPremium } = useAuth();
  const isMobile = useIsMobile();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('ideas');

  const caller = tradingViewCallers.find(c => c.id === parseInt(id || '0'));
  if (!caller) {
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const getLanguageFlag = (lang: string) => {
    if (lang === 'EN') return '🇺🇸';
    if (lang === 'RU') return '🇷🇺';
    return '🌍';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-4 md:py-8 animate-fade-in">
        {/* Header with cover and avatar */}
        <div className="relative mb-6">
          {/* TradingView themed cover */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg mb-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" 
                   style={{
                     backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
                   }} />
            </div>
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2 bg-blue-600/80 px-3 py-1 rounded-full">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">TV</span>
                </div>
                <span className="text-white text-sm font-medium">TradingView</span>
              </div>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className={`${isMobile ? 'px-4' : 'px-6'}`}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-24">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-black bg-black mb-4 md:mb-0">
                    <AvatarImage src={caller.avatar} alt={caller.name} />
                    <AvatarFallback>{caller.name[0]}</AvatarFallback>
                  </Avatar>
                  {caller.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                      {caller.name}
                    </h1>
                    {caller.premium && (
                      <Badge className="bg-gradient-to-r from-neon-purple to-neon-blue text-white">
                        Premium
                      </Badge>
                    )}
                    <span className="text-lg">{getLanguageFlag(caller.language)}</span>
                  </div>
                  <p className="text-gray-400 mb-2">@{caller.username}</p>
                  <p className="text-gray-300 mb-4">{caller.bio}</p>
                  
                  {/* Specialization tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caller.specialization.map((spec, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(caller.joined).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      <span>Last active {new Date(caller.lastActive).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-blue-400 hover:underline cursor-pointer">
                        tradingview.com/u/{caller.username}
                      </span>
                    </div>
                  </div>

                  {/* Follow stats */}
                  <div className="flex space-x-4 text-sm">
                    <span className="text-white">
                      <strong>{formatNumber(caller.followers)}</strong>{' '}
                      <span className="text-gray-400">followers</span>
                    </span>
                    <span className="text-white">
                      <strong>{caller.ideas}</strong>{' '}
                      <span className="text-gray-400">ideas</span>
                    </span>
                    <span className="text-white">
                      <strong>{formatNumber(caller.likes)}</strong>{' '}
                      <span className="text-gray-400">likes</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex ${isMobile ? 'flex-col mt-4 space-y-2' : 'space-x-2'} md:mt-0`}>
                {user && (caller.premium ? isPremium : true) ? (
                  <>
                    <Button
                      onClick={handleFollow}
                      className={`${isFollowing 
                        ? 'bg-gray-600 hover:bg-red-600 hover:text-white' 
                        : 'bg-blue-600 hover:bg-blue-700'
                      } ${isMobile ? 'w-full' : ''}`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button variant="outline" className={`border-white/20 ${isMobile ? 'w-full' : ''}`}>
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'w-full' : ''}`}>
                      Follow
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="icon" className="border-white/20">
                  <ExternalLink className="w-4 h-4" />
                </Button>
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
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-lg font-bold text-white">{caller.accuracy}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-lg font-bold text-white">{caller.winRate}%</div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-lg font-bold text-white">+{caller.avgProfit}%</div>
              <div className="text-xs text-gray-400">Avg Profit</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className={`w-5 h-5 ${getRiskColor(caller.riskLevel)}`} />
              </div>
              <div className={`text-lg font-bold ${getRiskColor(caller.riskLevel)}`}>
                {caller.riskLevel}
              </div>
              <div className="text-xs text-gray-400">Risk Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className={`mb-6 ${isMobile ? 'px-4' : 'px-0'}`}>
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white">Trading Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Trading Style</h4>
                  <p className="text-white">{caller.tradingStyle}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Scripts Published</h4>
                  <p className="text-white">{caller.scripts}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Reputation</h4>
                  <Badge className={`${
                    caller.reputation === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                    caller.reputation === 'Good' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {caller.reputation}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className={isMobile ? 'px-4' : 'px-0'}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 max-w-lg bg-black/20 border border-white/10 mb-6">
              <TabsTrigger value="ideas" className="data-[state=active]:bg-blue-500/20">
                <FileText className="w-4 h-4 mr-1" />
                Ideas ({caller.ideas})
              </TabsTrigger>
              <TabsTrigger value="scripts" className="data-[state=active]:bg-blue-500/20">
                <Code className="w-4 h-4 mr-1" />
                Scripts ({caller.scripts})
              </TabsTrigger>
              <TabsTrigger value="likes" className="data-[state=active]:bg-blue-500/20">
                <Heart className="w-4 h-4 mr-1" />
                Likes ({formatNumber(caller.likes)})
              </TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-blue-500/20">
                <BookOpen className="w-4 h-4 mr-1" />
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ideas" className="space-y-4">
              {caller.recentIdeas.map(idea => (
                <Card key={idea.id} className="glass-effect border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{idea.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span>{idea.symbol}</span>
                          <Badge className={`${
                            idea.direction === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {idea.direction}
                          </Badge>
                          <span>{idea.timeframe}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">+{idea.profit}%</div>
                        <div className="text-xs text-gray-400">{idea.date}</div>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-gray-800 rounded mb-3 overflow-hidden">
                      <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 100) + 20}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 50) + 5}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/20">
                        View Idea
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="scripts" className="space-y-4">
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Scripts and indicators will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="likes" className="space-y-4">
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Liked ideas will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <Card className="glass-effect border-white/10">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Educational content will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TradingViewCallerProfilePage;
