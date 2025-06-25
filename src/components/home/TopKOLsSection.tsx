import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { kols } from '@/data/mockData';
import { Crown, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TopKOLsSection: React.FC = () => {
  const { language } = useLanguage();
  const topKols = kols.slice(0, 3);

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Crown className="w-5 h-5 text-yellow-500" />
          {language === 'en' ? 'Top Performing KOLs' : 'Топ трейдеров'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {topKols.map((kol, index) => (
            <div key={kol.id} className="p-4 bg-black/30 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
                  </div>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-xs font-bold text-black">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{kol.name}</h3>
                  <p className="text-sm text-gray-400">{kol.platforms[0].name}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Accuracy</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    {kol.accuracy}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Followers</span>
                  <span className="text-white text-sm">{kol.platforms[0].followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Engagement</span>
                  <span className="text-white text-sm">{kol.engagement}</span>
                </div>
              </div>
              
              <Link to={`/kol-profile/${kol.id}`}>
                <Button variant="outline" size="sm" className="w-full border-white/20">
                  {language === 'en' ? 'View Profile' : 'Посмотреть профиль'}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link to="/leaderboard">
            <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2">
              {language === 'en' ? 'View Full Leaderboard' : 'Полная таблица лидеров'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
