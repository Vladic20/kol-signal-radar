
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { TradingViewCaller } from '@/data/tradingViewCallers';
import { useIsMobile } from '@/hooks/use-mobile';

interface TradingStatsCardsProps {
  caller: TradingViewCaller;
}

const TradingStatsCards = ({ caller }: TradingStatsCardsProps) => {
  const isMobile = useIsMobile();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 ${isMobile ? 'px-4' : 'px-0'}`}>
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-lg font-bold text-white">{caller.accuracy}%</div>
          <div className="text-xs text-gray-400">Accuracy</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white">{caller.winRate}%</div>
          <div className="text-xs text-gray-400">Win Rate</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-white">+{caller.avgProfit}%</div>
          <div className="text-xs text-gray-400">Avg Profit</div>
        </CardContent>
      </Card>
      
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className={`w-5 h-5 ${getRiskColor(caller.riskLevel)}`} />
          </div>
          <div className={`text-lg font-bold ${getRiskColor(caller.riskLevel)}`}>
            {caller.riskLevel}
          </div>
          <div className="text-xs text-gray-400">Risk Level</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingStatsCards;
