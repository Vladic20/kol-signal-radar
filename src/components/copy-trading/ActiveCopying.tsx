
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, Square, TrendingUp, TrendingDown, DollarSign, Clock, Target } from 'lucide-react';

export const ActiveCopying: React.FC = () => {
  const { language } = useLanguage();
  const [isActive, setIsActive] = useState(false);

  const activeTrades = [
    {
      id: 1,
      trader: 'CryptoKing_2024',
      symbol: 'BTC/USDT',
      side: 'LONG',
      entry: 42150.50,
      current: 42580.25,
      pnl: +429.75,
      pnlPercent: +1.02,
      size: 0.05,
      time: '2 min ago'
    },
    {
      id: 2,
      trader: 'BTCMaster',
      symbol: 'ETH/USDT',
      side: 'SHORT',
      entry: 2645.80,
      current: 2621.30,
      pnl: +122.50,
      pnlPercent: +0.93,
      size: 0.8,
      time: '5 min ago'
    }
  ];

  const recentTrades = [
    {
      id: 1,
      trader: 'AltcoinPro',
      symbol: 'SOL/USDT',
      side: 'LONG',
      entry: 89.50,
      exit: 92.15,
      pnl: +132.50,
      pnlPercent: +2.96,
      size: 0.5,
      status: 'Closed',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{language === 'en' ? 'Copy Trading Control' : 'Управление Копитрейдингом'}</span>
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className={isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
            >
              {isActive 
                ? (language === 'en' ? 'ACTIVE' : 'АКТИВНО')
                : (language === 'en' ? 'STOPPED' : 'ОСТАНОВЛЕНО')
              }
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setIsActive(true)}
              disabled={isActive}
              className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
            >
              <Play size={16} />
              {language === 'en' ? 'Start Copying' : 'Начать Копирование'}
            </Button>
            <Button
              onClick={() => setIsActive(false)}
              disabled={!isActive}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pause size={16} />
              {language === 'en' ? 'Pause' : 'Пауза'}
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square size={16} />
              {language === 'en' ? 'Stop All' : 'Остановить Все'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-400">+$1,247.50</p>
                <p className="text-xs text-gray-400">
                  {language === 'en' ? 'Total P&L' : 'Общий P&L'}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-neon-blue">+12.4%</p>
                <p className="text-xs text-gray-400">
                  {language === 'en' ? 'Today\'s Return' : 'Доходность Сегодня'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-neon-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-neon-purple">23</p>
                <p className="text-xs text-gray-400">
                  {language === 'en' ? 'Trades Today' : 'Сделок Сегодня'}
                </p>
              </div>
              <Target className="h-8 w-8 text-neon-purple" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-400">78.2%</p>
                <p className="text-xs text-gray-400">
                  {language === 'en' ? 'Win Rate' : 'Процент Побед'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Positions */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Active Positions' : 'Активные Позиции'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTrades.length > 0 ? (
            <div className="space-y-4">
              {activeTrades.map((trade) => (
                <div 
                  key={trade.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold">{trade.symbol}</p>
                      <p className="text-sm text-gray-400">{trade.trader}</p>
                    </div>
                    <Badge 
                      variant={trade.side === 'LONG' ? 'default' : 'secondary'}
                      className={trade.side === 'LONG' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }
                    >
                      {trade.side}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {language === 'en' ? 'Entry:' : 'Вход:'} ${trade.entry.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      {language === 'en' ? 'Current:' : 'Текущая:'} ${trade.current.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold ${trade.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </p>
                    <p className={`text-sm ${trade.pnlPercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnlPercent > 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                    </p>
                  </div>
                  
                  <div className="text-right text-sm text-gray-400">
                    <p>{language === 'en' ? 'Size:' : 'Размер:'} {trade.size}</p>
                    <p>{trade.time}</p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Close' : 'Закрыть'}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              {language === 'en' 
                ? 'No active positions'
                : 'Нет активных позиций'
              }
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Recent Trades' : 'Недавние Сделки'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentTrades.length > 0 ? (
            <div className="space-y-4">
              {recentTrades.map((trade) => (
                <div 
                  key={trade.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold">{trade.symbol}</p>
                      <p className="text-sm text-gray-400">{trade.trader}</p>
                    </div>
                    <Badge 
                      variant={trade.side === 'LONG' ? 'default' : 'secondary'}
                      className={trade.side === 'LONG' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }
                    >
                      {trade.side}
                    </Badge>
                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                      {trade.status}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      ${trade.entry} → ${trade.exit}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold ${trade.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </p>
                    <p className={`text-sm ${trade.pnlPercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnlPercent > 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                    </p>
                  </div>
                  
                  <div className="text-right text-sm text-gray-400">
                    <p>{trade.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              {language === 'en' 
                ? 'No recent trades'
                : 'Нет недавних сделок'
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
