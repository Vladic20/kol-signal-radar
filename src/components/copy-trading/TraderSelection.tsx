
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, TrendingUp, TrendingDown, Users, Star, Copy } from 'lucide-react';

export const TraderSelection: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('profit');
  const [selectedTraders, setSelectedTraders] = useState<number[]>([]);

  // Мокап данных трейдеров
  const traders = [
    {
      id: 1,
      name: 'CryptoKing_2024',
      avatar: '👑',
      winRate: 78.5,
      totalProfit: 156.7,
      monthlyReturn: 23.4,
      followers: 1250,
      trades: 847,
      maxDrawdown: -12.3,
      rating: 4.8,
      strategy: 'Scalping',
      riskLevel: 'Medium'
    },
    {
      id: 2,
      name: 'BTCMaster',
      avatar: '🚀',
      winRate: 72.1,
      totalProfit: 89.3,
      monthlyReturn: 18.7,
      followers: 890,
      trades: 623,
      maxDrawdown: -8.9,
      rating: 4.6,
      strategy: 'Swing Trading',
      riskLevel: 'Low'
    },
    {
      id: 3,
      name: 'AltcoinPro',
      avatar: '💎',
      winRate: 85.2,
      totalProfit: 234.1,
      monthlyReturn: 31.2,
      followers: 2100,
      trades: 1205,
      maxDrawdown: -18.7,
      rating: 4.9,
      strategy: 'Trend Following',
      riskLevel: 'High'
    }
  ];

  const toggleTraderSelection = (traderId: number) => {
    setSelectedTraders(prev => 
      prev.includes(traderId) 
        ? prev.filter(id => id !== traderId)
        : [...prev, traderId]
    );
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'High': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="glass-effect">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder={language === 'en' ? 'Search traders...' : 'Поиск трейдеров...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit">
                  {language === 'en' ? 'Total Profit' : 'Общая Прибыль'}
                </SelectItem>
                <SelectItem value="winRate">
                  {language === 'en' ? 'Win Rate' : 'Процент Побед'}
                </SelectItem>
                <SelectItem value="followers">
                  {language === 'en' ? 'Followers' : 'Подписчики'}
                </SelectItem>
                <SelectItem value="rating">
                  {language === 'en' ? 'Rating' : 'Рейтинг'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Traders List */}
      <div className="grid gap-6">
        {traders.map((trader) => (
          <Card 
            key={trader.id} 
            className={`glass-effect transition-all hover:border-neon-purple/30 ${
              selectedTraders.includes(trader.id) ? 'border-neon-blue/50 bg-neon-blue/5' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{trader.avatar}</div>
                  <div>
                    <CardTitle className="text-lg">{trader.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400">{trader.rating}</span>
                      <Badge variant="outline" className={getRiskColor(trader.riskLevel)}>
                        {trader.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant={selectedTraders.includes(trader.id) ? "default" : "outline"}
                  onClick={() => toggleTraderSelection(trader.id)}
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  {selectedTraders.includes(trader.id) 
                    ? (language === 'en' ? 'Selected' : 'Выбрано')
                    : (language === 'en' ? 'Select' : 'Выбрать')
                  }
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {trader.winRate}%
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'en' ? 'Win Rate' : 'Процент Побед'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue">
                    +{trader.totalProfit}%
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'en' ? 'Total Profit' : 'Общая Прибыль'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-purple">
                    +{trader.monthlyReturn}%
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'en' ? 'Monthly' : 'За Месяц'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-300">
                    {trader.followers}
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'en' ? 'Followers' : 'Подписчики'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-300">
                    {trader.trades}
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'en' ? 'Trades' : 'Сделки'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {trader.maxDrawdown}%
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'en' ? 'Max DD' : 'Макс. Просадка'}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                    {trader.strategy}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={14} />
                    <span className="text-sm">
                      {trader.followers} {language === 'en' ? 'followers' : 'подписчиков'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Traders Summary */}
      {selectedTraders.length > 0 && (
        <Card className="glass-effect border-neon-blue/30">
          <CardHeader>
            <CardTitle className="text-neon-blue">
              {language === 'en' 
                ? `Selected Traders (${selectedTraders.length})` 
                : `Выбранные Трейдеры (${selectedTraders.length})`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedTraders.map(traderId => {
                const trader = traders.find(t => t.id === traderId);
                return trader ? (
                  <Badge key={traderId} variant="outline" className="text-neon-blue border-neon-blue/30">
                    {trader.avatar} {trader.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
