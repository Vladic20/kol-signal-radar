
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TokenData {
  token: string;
  name: string;
  long: number;
  short: number;
  volume: number;
  price: number;
  change24h: number;
}

interface TokenPositionChartProps {
  tokenData: TokenData;
  onClick: () => void;
}

const TokenPositionChart: React.FC<TokenPositionChartProps> = ({ tokenData, onClick }) => {
  const { token, name, long, short, volume, price, change24h } = tokenData;

  const chartData = [
    { name: 'Long', value: long, color: '#10b981' },
    { name: 'Short', value: short, color: '#ef4444' }
  ];

  const formatVolume = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name} позиции</p>
          <p className="text-sm text-muted-foreground">
            {data.value}% ({formatVolume(volume * data.value / 100)})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-card"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{token}</CardTitle>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{formatPrice(price)}</p>
            <div className={`flex items-center text-xs ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change24h >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(change24h).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Chart */}
        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Stats */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">Long</span>
            </div>
            <span className="text-sm font-medium">{long}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-sm">Short</span>
            </div>
            <span className="text-sm font-medium">{short}%</span>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Объем</span>
              <span className="text-xs font-medium">{formatVolume(volume)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenPositionChart;
