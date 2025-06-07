
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { tradingViewCallers } from '@/data/tradingViewCallers';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Heart, FileText, Calendar, Award, Target, BarChart3 } from 'lucide-react';

const TradingViewCallerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { isPremium } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Find caller by ID
  const caller = tradingViewCallers.find(c => c.id === parseInt(id || '0'));
  
  // Check if caller is accessible (premium check)
  const isAccessible = !caller?.premium || isPremium;
  
  // Toggle following status
  const handleToggleFollow = () => {
    setIsFollowing(prev => !prev);
  };
  
  // Redirect if caller is not found
  if (!caller) {
    return <Navigate to="/leaderboard" />;
  }
  
  // Redirect if caller is premium and user is not premium
  if (!isAccessible) {
    return <Navigate to="/leaderboard" />;
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        {/* Caller Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
              <img src={caller.avatar} alt={caller.name} className="w-full h-full object-cover" />
              {caller.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-3xl font-bold">{caller.name}</h1>
                {caller.premium && (
                  <Badge className="bg-gradient-to-r from-neon-purple to-neon-blue text-white">
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 mb-1">@{caller.username}</p>
              <p className="text-gray-400">
                {caller.language === 'EN' ? '🇺🇸 English' : 
                 caller.language === 'RU' ? '🇷🇺 Russian' : 
                 '🇺🇸 English / 🇷🇺 Russian'}
              </p>
            </div>
          </div>
          
          <Button
            variant={isFollowing ? "default" : "outline"}
            className={isFollowing ? "bg-neon-purple hover:bg-neon-purple/80" : "border-neon-purple text-neon-purple hover:bg-neon-purple/10"}
            onClick={handleToggleFollow}
          >
            {isFollowing ? t('following') : t('follow')}
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/30 border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-neon-blue" />
              <div className="text-2xl font-bold">{formatNumber(caller.followers)}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-white/10">
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 mx-auto mb-2 text-neon-purple" />
              <div className="text-2xl font-bold">{caller.ideas}</div>
              <div className="text-sm text-gray-400">Ideas</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-white/10">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold">{formatNumber(caller.likes)}</div>
              <div className="text-sm text-gray-400">Likes</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold">{caller.accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto bg-black/20 border border-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-neon-purple/20">
              Profile Details
            </TabsTrigger>
            <TabsTrigger value="ideas" className="data-[state=active]:bg-neon-purple/20">
              Trading Ideas
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-neon-purple/20">
              Statistics
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-300 mb-6">{caller.bio}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Trading Style:</span>
                      <span className="text-white">{caller.tradingStyle}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Risk Level:</span>
                      <Badge className={
                        caller.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                        caller.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }>
                        {caller.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Reputation:</span>
                      <Badge className={
                        caller.reputation === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                        caller.reputation === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }>
                        {caller.reputation}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Joined:</span>
                      <span className="text-white">{new Date(caller.joined).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Last Active:</span>
                      <span className="text-white">{new Date(caller.lastActive).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Specialization</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {caller.specialization.map((spec, index) => (
                      <Badge key={index} variant="outline" className="border-neon-purple/50 text-neon-purple">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/40 rounded-lg text-center">
                      <Target className="w-6 h-6 mx-auto mb-2 text-green-400" />
                      <div className="text-xl font-bold text-green-400">{caller.winRate}%</div>
                      <div className="text-sm text-gray-400">Win Rate</div>
                    </div>
                    
                    <div className="p-4 bg-black/40 rounded-lg text-center">
                      <BarChart3 className="w-6 h-6 mx-auto mb-2 text-neon-blue" />
                      <div className="text-xl font-bold text-neon-blue">+{caller.avgProfit}%</div>
                      <div className="text-sm text-gray-400">Avg Profit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Ideas Tab */}
          <TabsContent value="ideas">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caller.recentIdeas.map(idea => (
                <Card key={idea.id} className="bg-black/30 border-white/10 hover:border-neon-purple/30 transition-colors cursor-pointer">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className={idea.direction === 'Long' ? 'bg-green-500' : 'bg-red-500'}>
                        {idea.direction}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{idea.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span>{idea.symbol}</span>
                      <span>{idea.timeframe}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-medium">+{idea.profit}%</span>
                      <span className="text-gray-400 text-sm">{new Date(idea.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <div className="text-2xl font-bold mb-2">{caller.scripts}</div>
                  <div className="text-gray-400">Published Scripts</div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold mb-2">{caller.accuracy}%</div>
                  <div className="text-gray-400">Overall Accuracy</div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 border-white/10">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-neon-blue" />
                  <div className="text-2xl font-bold mb-2">+{caller.avgProfit}%</div>
                  <div className="text-gray-400">Average Profit</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TradingViewCallerPage;
