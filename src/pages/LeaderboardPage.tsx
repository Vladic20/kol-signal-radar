
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { kols } from '@/data/mockData';
import { TrendingUp, Users, Award, ExternalLink, Copy, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleViewProfile = (kolId: number) => {
    navigate(`/kol-profile/${kolId}`);
  };

  const handleStartCopying = (kolId: number) => {
    navigate('/copy-trading');
  };

  const getFilteredKols = () => {
    switch (activeTab) {
      case 'crypto':
        return kols.filter(kol => kol.category === 'crypto');
      case 'stocks':
        return kols.filter(kol => kol.category === 'stocks');
      case 'forex':
        return kols.filter(kol => kol.category === 'forex');
      default:
        return kols;
    }
  };

  return (
    <Layout showSidebar={true}>
      <div className={`py-4 md:py-8 animate-fade-in ${isMobile ? 'px-4 max-w-full' : 'px-0 max-w-6xl mx-auto'}`}>
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Рейтинг KOL
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Лучшие трейдеры и аналитики для копирования
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            <div className="flex justify-center">
              <TabsList className={`bg-black/20 border border-white/10 ${
                isMobile ? 'grid grid-cols-4 w-full max-w-md' : 'grid grid-cols-4 max-w-lg'
              }`}>
                <TabsTrigger 
                  value="all" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  Все
                </TabsTrigger>
                <TabsTrigger 
                  value="crypto" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  Крипто
                </TabsTrigger>
                <TabsTrigger 
                  value="stocks" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  Акции
                </TabsTrigger>
                <TabsTrigger 
                  value="forex" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  Форекс
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-4 md:mt-6">
              <div className={`grid gap-4 md:gap-6 ${
                isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {getFilteredKols().map((kol, index) => (
                  <Card key={kol.id} className="glass-effect border-white/10 hover:border-neon-purple/30 transition-colors">
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                      {/* Header with rank */}
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
                          kol.accuracy >= 80 ? 'bg-green-500/20 text-green-400' :
                          kol.accuracy >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {kol.accuracy}% точность
                        </Badge>
                      </div>

                      {/* Profile */}
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className={isMobile ? 'w-12 h-12' : 'w-16 h-16'}>
                          <AvatarImage src={kol.avatar} alt={kol.name} />
                          <AvatarFallback>{kol.name[0]}</AvatarFallback>
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
                              {kol.platforms[0].followers.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className={`grid grid-cols-2 gap-4 mb-4 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <div className="text-center">
                          <div className={`font-bold text-green-400 ${isMobile ? 'text-base' : 'text-lg'}`}>
                            +{Math.floor(Math.random() * 200) + 50}%
                          </div>
                          <div className="text-gray-400">ROI</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold text-blue-400 ${isMobile ? 'text-base' : 'text-lg'}`}>
                            {Math.floor(Math.random() * 50) + 20}%
                          </div>
                          <div className="text-gray-400">WR</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold text-purple-400 ${isMobile ? 'text-base' : 'text-lg'}`}>
                            {Math.floor(Math.random() * 500) + 100}
                          </div>
                          <div className="text-gray-400">Подписчики</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold text-orange-400 ${isMobile ? 'text-base' : 'text-lg'}`}>
                            {(Math.random() * 10 + 5).toFixed(1)}%
                          </div>
                          <div className="text-gray-400">Вовлечение</div>
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Риск:</span>
                          <Badge className={`${
                            Math.random() > 0.6 ? 'bg-red-500/20 text-red-400' :
                            Math.random() > 0.3 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {Math.random() > 0.6 ? 'Высокий' : Math.random() > 0.3 ? 'Средний' : 'Низкий'}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={`flex space-x-2 ${isMobile ? 'flex-col space-y-2 space-x-0' : ''}`}>
                        <Button 
                          variant="outline" 
                          size={isMobile ? 'sm' : 'default'}
                          className="border-white/20 flex-1"
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
