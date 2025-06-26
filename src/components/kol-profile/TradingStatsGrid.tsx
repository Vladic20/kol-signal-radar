
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, Target, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TradingStatsGridProps {
  stats: {
    winRate: number;
    avgProfit: number;
    totalTrades: number;
    roi30d: number;
  };
}

const TradingStatsGrid = ({ stats }: TradingStatsGridProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 ${isMobile ? 'px-4' : 'px-0'}`}>
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-lg font-bold text-white">{stats.winRate}%</div>
          <div className="text-xs text-gray-400">Win Rate</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white">+{stats.avgProfit}%</div>
          <div className="text-xs text-gray-400">Avg Profit</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-white">{stats.totalTrades}</div>
          <div className="text-xs text-gray-400">Total Trades</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-lg font-bold text-white">+{stats.roi30d}%</div>
          <div className="text-xs text-gray-400">ROI 30d</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingStatsGrid;
