
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, Star, Target } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: '150+',
      label: language === 'en' ? 'Verified KOLs' : 'Проверенных KOL',
      color: 'text-blue-400'
    },
    {
      icon: Target,
      value: '89%',
      label: language === 'en' ? 'Average Accuracy' : 'Средняя точность',
      color: 'text-green-400'
    },
    {
      icon: TrendingUp,
      value: '1.2M+',
      label: language === 'en' ? 'Signals Tracked' : 'Отслеженных сигналов',
      color: 'text-purple-400'
    },
    {
      icon: Star,
      value: '25K+',
      label: language === 'en' ? 'Active Users' : 'Активных пользователей',
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="glass-effect border-white/10 text-center">
            <CardContent className="p-6">
              <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
