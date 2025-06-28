
import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { kols } from '@/data/mockData';
import { Search, ExternalLink, Copy, Users, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const LeaderboardPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [platformFilter, setPlatformFilter] = useState('all');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const filteredAndSortedKols = useMemo(() => {
    let filtered = kols.filter(kol => 
      kol.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (platformFilter === 'all' || kol.platforms.some(p => p.name.toLowerCase() === platformFilter))
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'accuracy':
          return b.accuracy - a.accuracy;
        case 'followers':
          return b.platforms[0].followers - a.platforms[0].followers;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, platformFilter]);

  const handleKolClick = (kolId: number) => {
    navigate(`/kol-profile/${kolId}`);
  };

  const handleCopyTrading = (kolId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/copy-trading');
  };

  return (
    <Layout showSidebar={true}>
      <div className="py-4 md:py-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue px-2 md:px-0">
          {t('leaderboard')}
        </h1>
        
        {/* Search and Filters */}
        <div className={`mb-6 md:mb-8 px-2 md:px-0 grid gap-3 md:gap-4 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
        }`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t('searchKOLs')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-white/10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">{t('sortByRank')}</SelectItem>
              <SelectItem value="accuracy">{t('sortByAccuracy')}</SelectItem>
              <SelectItem value="followers">{t('sortByFollowers')}</SelectItem>
              <SelectItem value="name">{t('sortByName')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allPlatforms')}</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="discord">Discord</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KOL Cards */}
        <div className="space-y-3 md:space-y-4 px-2 md:px-0">
          {filteredAndSortedKols.map((kol, index) => {
            const roi = Math.floor(Math.random() * 200 + 50);
            const winRate = Math.floor(Math.random() * 30 + 65);
            const engagement = Math.floor(Math.random() * 10 + 2);
            
            return (
              <Card 
                key={kol.id} 
                className="glass-effect border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                onClick={() => handleKolClick(kol.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Rank Badge */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                        index === 1 ? 'bg-gray-400/20 text-gray-300' :
                        index === 2 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Avatar and Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={kol.avatar} alt={kol.name} />
                            <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                              {kol.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white text-lg">{kol.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <Users className="w-4 h-4" />
                              <span>{kol.platforms[0].followers.toLocaleString()}</span>
                              <span>•</span>
                              <span>{engagement}% Engagement</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Desktop Stats */}
                        {!isMobile && (
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">+{roi}%</div>
                            <div className="text-sm text-gray-400">ROI</div>
                          </div>
                        )}
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{kol.accuracy}%</div>
                          <div className="text-xs text-gray-400">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">+{roi}%</div>
                          <div className="text-xs text-gray-400">ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{winRate}%</div>
                          <div className="text-xs text-gray-400">Win Rate</div>
                        </div>
                      </div>

                      {/* Platforms */}
                      <div className="flex items-center space-x-2 mb-3">
                        {kol.platforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline" className="border-white/20 text-gray-300 text-xs">
                            {platform.name}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-white/20 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleKolClick(kol.id);
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Профиль
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-neon-purple hover:bg-neon-purple/80 flex-1"
                          onClick={(e) => handleCopyTrading(kol.id, e)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Копировать
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
