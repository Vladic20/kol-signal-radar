
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { kols } from '@/data/mockData';
import { TrendingUp, Users, Award, ExternalLink, Copy, Star, Filter, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('roi');
  const [platformFilter, setPlatformFilter] = useState('all');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleViewProfile = (kolId: number) => {
    navigate(`/kol-profile/${kolId}`);
  };

  const handleStartCopying = (kolId: number) => {
    navigate('/copy-trading');
  };

  // Generate mock data for enhanced stats
  const enhancedKols = kols.map((kol, index) => ({
    ...kol,
    roi: Math.floor(Math.random() * 300) + 50,
    winRate: Math.floor(Math.random() * 40) + 60,
    totalFollowers: Math.floor(Math.random() * 50000) + 10000,
    engagement: Math.floor(Math.random() * 15) + 5,
    riskLevel: Math.random() > 0.6 ? 'Высокий' : Math.random() > 0.3 ? 'Средний' : 'Низкий',
    totalTrades: Math.floor(Math.random() * 500) + 100,
    avgReturn: (Math.random() * 20 + 5).toFixed(1)
  }));

  const getFilteredKols = () => {
    let filtered = enhancedKols;
    
    // Platform filter
    if (platformFilter !== 'all') {
      filtered = filtered.filter(kol => 
        kol.platforms.some(platform => platform.name.toLowerCase() === platformFilter)
      );
    }

    // Sort
    switch (sortBy) {
      case 'roi':
        return filtered.sort((a, b) => b.roi - a.roi);
      case 'winrate':
        return filtered.sort((a, b) => b.winRate - a.winRate);
      case 'followers':
        return filtered.sort((a, b) => b.totalFollowers - a.totalFollowers);
      case 'engagement':
        return filtered.sort((a, b) => b.engagement - a.engagement);
      default:
        return filtered;
    }
  };

  return (
    <Layout showSidebar={true}>
      <div className={`py-4 md:py-8 animate-fade-in ${isMobile ? 'px-4 max-w-full' : 'px-0 max-w-6xl mx-auto'}`}>
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Рейтинг KOL
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Лучшие крипто-трейдеры и аналитики для копирования
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap gap-4 mb-6 ${isMobile ? 'justify-center' : 'justify-between'} items-center`}>
          <div className="flex flex-wrap gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className={`bg-black/20 border-white/10 ${isMobile ? 'w-32' : 'w-40'}`}>
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roi">По ROI</SelectItem>
                <SelectItem value="winrate">По Win Rate</SelectItem>
                <SelectItem value="followers">По подписчикам</SelectItem>
                <SelectItem value="engagement">По активности</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className={`bg-black/20 border-white/10 ${isMobile ? 'w-32' : 'w-40'}`}>
                <SelectValue placeholder="Платформа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KOL Cards */}
        <div className={`grid gap-4 md:gap-6 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {getFilteredKols().map((kol, index) => (
            <Card key={kol.id} className="glass-effect border-white/10 hover:border-neon-purple/30 transition-all duration-200 hover:scale-105">
              <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                {/* Header with rank and accuracy */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center text-white font-bold ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <Star className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400`} />
                    )}
                  </div>
                  <Badge className={`${
                    kol.winRate >= 80 ? 'bg-green-500/20 text-green-400' :
                    kol.winRate >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {kol.winRate}% WR
                  </Badge>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className={isMobile ? 'w-12 h-12' : 'w-16 h-16'}>
                    <AvatarImage src={kol.avatar} alt={kol.name} />
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                      {kol.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-white truncate ${isMobile ? 'text-base' : 'text-lg'}`}>
                      {kol.name}
                    </h3>
                    <p className={`text-gray-400 truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {kol.platforms[0].name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Users className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gray-400`} />
                      <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {kol.totalFollowers.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className={`grid grid-cols-2 gap-3 mb-4 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <div className="text-center bg-green-500/10 rounded-lg p-2">
                    <div className={`font-bold text-green-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      +{kol.roi}%
                    </div>
                    <div className="text-gray-400 text-xs">ROI</div>
                  </div>
                  <div className="text-center bg-blue-500/10 rounded-lg p-2">
                    <div className={`font-bold text-blue-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {kol.winRate}%
                    </div>
                    <div className="text-gray-400 text-xs">Win Rate</div>
                  </div>
                  <div className="text-center bg-purple-500/10 rounded-lg p-2">
                    <div className={`font-bold text-purple-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {(kol.totalFollowers / 1000).toFixed(1)}K
                    </div>
                    <div className="text-gray-400 text-xs">Followers</div>
                  </div>
                  <div className="text-center bg-orange-500/10 rounded-lg p-2">
                    <div className={`font-bold text-orange-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {kol.engagement}%
                    </div>
                    <div className="text-gray-400 text-xs">Engagement</div>
                  </div>
                </div>

                {/* Risk Level */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Риск:</span>
                    <Badge className={`${
                      kol.riskLevel === 'Высокий' ? 'bg-red-500/20 text-red-400' :
                      kol.riskLevel === 'Средний' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {kol.riskLevel}
                    </Badge>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className={`flex justify-between items-center mb-4 text-xs text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <span>Сделок: {kol.totalTrades}</span>
                  <span>Ср. доход: {kol.avgReturn}%</span>
                </div>

                {/* Actions */}
                <div className={`flex gap-2 ${isMobile ? 'flex-col space-y-2' : 'flex-row'}`}>
                  <Button 
                    variant="outline" 
                    size={isMobile ? 'sm' : 'default'}
                    className="border-white/20 flex-1 hover:bg-white/5"
                    onClick={() => handleViewProfile(kol.id)}
                  >
                    <ExternalLink className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />
                    Профиль
                  </Button>
                  <Button 
                    size={isMobile ? 'sm' : 'default'}
                    className="bg-neon-purple hover:bg-neon-purple/80 flex-1"
                    onClick={() => handleStartCopying(kol.id)}
                  >
                    <Copy className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />
                    Копировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
