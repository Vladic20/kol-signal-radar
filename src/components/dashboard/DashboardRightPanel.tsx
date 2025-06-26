
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { kols } from '@/data/mockData';
import { TrendingUp, Users, Target, Award, ExternalLink } from 'lucide-react';

const DashboardRightPanel = () => {
  const { user } = useAuth();

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
    <div className="w-80 space-y-6">
      {/* Статистика пользователя */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white">Моя статистика</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">KOL Points</span>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-white">{userStats.kolPoints}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Ранг</span>
            <Badge className="bg-orange-500/20 text-orange-400">
              {userStats.rank}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Подписок</span>
            <span className="font-bold text-white">{userStats.followingCount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Общий PnL</span>
            <span className="font-bold text-green-400">{userStats.totalPnL}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Win Rate</span>
            <span className="font-bold text-white">{userStats.winRate}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Рекомендуемые KOL'ы */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Топ трейдеры
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topKols.map((kol) => (
            <div key={kol.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={kol.avatar} alt={kol.name} />
                  <AvatarFallback>{kol.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{kol.name}</p>
                  <p className="text-xs text-gray-400">{kol.accuracy}% точность</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-xs">
                Подписаться
              </Button>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-neon-purple hover:bg-neon-purple/10">
            Смотреть всех
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Последние достижения */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Достижения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Первый профит</p>
              <p className="text-xs text-gray-400">2 дня назад</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">5 подписок</p>
              <p className="text-xs text-gray-400">1 неделю назад</p>
            </div>
          </div>

          <Button variant="ghost" className="w-full text-neon-purple hover:bg-neon-purple/10">
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
          <Button size="sm" className="w-full bg-gradient-to-r from-neon-purple to-neon-blue">
            Подать заявку
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardRightPanel;
