
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TradingViewCaller } from '@/data/tradingViewCallers';
import { useIsMobile } from '@/hooks/use-mobile';

interface TradingProfileCardProps {
  caller: TradingViewCaller;
}

const TradingProfileCard = ({ caller }: TradingProfileCardProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`mb-6 ${isMobile ? 'px-4' : 'px-0'}`}>
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white">Trading Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Trading Style</h4>
              <p className="text-white">{caller.tradingStyle}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Scripts Published</h4>
              <p className="text-white">{caller.scripts}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Reputation</h4>
              <Badge className={`${
                caller.reputation === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                caller.reputation === 'Good' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {caller.reputation}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingProfileCard;
