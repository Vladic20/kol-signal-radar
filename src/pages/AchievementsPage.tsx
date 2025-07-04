
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Trophy, Target, Users, Heart, Crown, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AchievementsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const achievements = [
    {
      id: 1,
      icon: TrendingUp,
      title: 'Первый профит',
      description: 'Закрыли первую прибыльную сделку',
      earned: true,
      date: '15.12.2024',
      color: 'text-green-400'
    },
    {
      id: 2,
      icon: Target,
      title: 'Первый стоп',
      description: 'Дисциплина в управлении рисками',
      earned: true,
      date: '10.12.2024',
      color: 'text-red-400'
    },
    {
      id: 3,
      icon: Users,
      title: '10 подписок',
      description: 'Набрали первых 10 подписчиков',
      earned: true,
      date: '20.12.2024',
      color: 'text-blue-400'
    },
    {
      id: 4,
      icon: Heart,
      title: '50 лайков на пост',
      description: 'Получили 50+ лайков на один пост',
      earned: true,
      date: '22.12.2024',
      color: 'text-pink-400'
    },
    {
      id: 5,
      icon: Crown,
      title: 'Топ 3 KOL',
      description: 'Вошли в топ-3 рейтинга KOL',
      earned: false,
      date: null,
      color: 'text-yellow-400'
    },
    {
      id: 6,
      icon: Trophy,
      title: 'Gold статус',
      description: 'Достигли Gold ранга',
      earned: false,
      date: null,
      color: 'text-yellow-500'
    }
  ];

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;

  return (
    <Layout showSidebar={true}>
      <div className={`py-4 md:py-8 animate-fade-in ${isMobile ? 'px-4 max-w-full' : 'px-0 max-w-4xl mx-auto'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Достижения</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Progress */}
        <Card className="glass-effect border-white/10 mb-6">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-white">{earnedCount}/{totalCount}</span>
            </div>
            <p className="text-gray-400">Достижений разблокировано</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-neon-purple to-neon-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${(earnedCount / totalCount) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            
            return (
              <Card 
                key={achievement.id} 
                className={`glass-effect transition-all duration-200 ${
                  achievement.earned 
                    ? 'border-white/20 bg-black/40' 
                    : 'border-gray-600/20 bg-gray-900/20 opacity-60'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-black/40' : 'bg-gray-700/40'
                    }`}>
                      <Icon className={`w-7 h-7 ${achievement.earned ? achievement.color : 'text-gray-500'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.earned ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-gray-400' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-neon-purple mt-1">
                          Получено: {achievement.date}
                        </p>
                      )}
                    </div>
                    
                    {achievement.earned && (
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next Achievement */}
        <Card className="glass-effect border-neon-purple/20 mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-white mb-2">Следующее достижение</h3>
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-sm text-white">Топ 3 KOL</p>
                <p className="text-xs text-gray-400">Войдите в топ-3 рейтинга</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AchievementsPage;
