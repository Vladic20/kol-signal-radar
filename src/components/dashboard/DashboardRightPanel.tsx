
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { kols } from '@/data/mockData';
import { TrendingUp, Users, Target, Award, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardRightPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Топ KOL'ы для рекомендаций
  const topKols = kols.slice(0, 3);

  // Моковые данные пользователя
  const userStats = {
    kolPoints: 1250,
    rank: 'Bronze',
    followingCount: 8,
    totalPnL: '+$2,450',
    winRate: 67
  };

  return (
    <div className="w-72 space-y-4 h-fit">
      {/* Статистика пользователя */}
      <Card className="glass-effect border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Моя статистика</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg">
              <Award className="w-4 h-4 text-yellow-400 mb-1" />
              <span className="font-bold text-white">{userStats.kolPoints}</span>
              <span className="text-xs text-gray-400">KOL Points</span>
            </div>
            
            <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg">
              <Badge className="bg-orange-500/20 text-orange-400 text-xs mb-1">
                {userStats.rank}
              </Badge>
              <span className="text-xs text-gray-400">Ранг</span>
            </div>
            
            <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg">
              <span className="font-bold text-white">{userStats.followingCount}</span>
              <span className="text-xs text-gray-400">Подписок</span>
            </div>
            
            <div className="flex flex-col items-center p-2 bg-black/20 rounded-lg">
              <span className="font-bold text-green-400">{userStats.totalPnL}</span>
              <span className="text-xs text-gray-400">PnL</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="text-gray-400 text-sm">Win Rate</span>
            <span className="font-bold text-white">{userStats.winRate}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Рекомендуемые KOL'ы */}
      <Card className="glass-effect border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Топ трейдеры
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {topKols.map((kol) => (
            <div key={kol.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={kol.avatar} alt={kol.name} />
                  <AvatarFallback className="text-xs">{kol.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{kol.name}</p>
                  <p className="text-xs text-gray-400">{kol.accuracy}%</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/20 text-xs h-7 px-2"
                onClick={() => navigate(`/kol-profile/${kol.id}`)}
              >
                Подписаться
              </Button>
            </div>
          ))}
          <Button 
            variant="ghost" 
            className="w-full text-neon-purple hover:bg-neon-purple/10 text-sm h-8"
            onClick={() => navigate('/leaderboard')}
          >
            Смотреть всех
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Последние достижения */}
      <Card className="glass-effect border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Достижения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Target className="w-3 h-3 text-yellow-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Первый профит</p>
              <p className="text-xs text-gray-400">2 дня назад</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="w-3 h-3 text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">5 подписок</p>
              <p className="text-xs text-gray-400">1 неделю назад</p>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full text-neon-purple hover:bg-neon-purple/10 text-sm h-8"
          >
            Все достижения
          </Button>
        </CardContent>
      </Card>

      {/* Промо блок */}
      <Card className="glass-effect border-white/10 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10">
        <CardContent className="p-4 text-center">
          <h3 className="text-sm font-semibold text-white mb-2">
            🚀 Станьте KOL трейдером
          </h3>
          <p className="text-xs text-gray-300 mb-3">
            Делитесь сигналами и зарабатывайте на подписчиках
          </p>
          <Button size="sm" className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-xs h-8">
            Подать заявку
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardRightPanel;
