
import React from 'react';
import { Link } from 'react-router-dom';
import { TradingViewCaller } from '@/data/tradingViewCallers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lock, TrendingUp, Users, Heart, FileText } from 'lucide-react';

interface TradingViewCallerRowProps {
  caller: TradingViewCaller;
  rank: number;
}

export const TradingViewCallerRow = ({ caller, rank }: TradingViewCallerRowProps) => {
  const { isPremium } = useAuth();
  const { t } = useLanguage();
  const isAccessible = !caller.premium || isPremium;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
      <td className="px-3 py-4 text-center">
        <div className="flex items-center justify-center">
          <span className="text-lg font-bold text-neon-purple">#{rank}</span>
        </div>
      </td>
      
      <td className="px-3 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={caller.avatar}
              alt={caller.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {caller.verified && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white">{caller.name}</span>
              {caller.premium && (
                <Badge variant="secondary" className="bg-gradient-to-r from-neon-purple to-neon-blue text-white text-xs">
                  Premium
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-400">@{caller.username}</div>
            <div className="text-xs text-gray-500">
              {caller.language === 'EN' ? '🇺🇸 English' : 
               caller.language === 'RU' ? '🇷🇺 Russian' : 
               '🇺🇸 English / 🇷🇺 Russian'}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-3 py-4 text-right">
        <div className="flex items-center justify-end space-x-1 text-gray-300">
          <Users className="w-4 h-4" />
          <span>{formatNumber(caller.followers)}</span>
        </div>
      </td>
      
      <td className="px-3 py-4 text-right">
        <div className="flex items-center justify-end space-x-1 text-gray-300">
          <FileText className="w-4 h-4" />
          <span>{caller.ideas}</span>
        </div>
      </td>
      
      <td className="px-3 py-4 text-right">
        <div className="flex items-center justify-end space-x-1 text-gray-300">
          <Heart className="w-4 h-4" />
          <span>{formatNumber(caller.likes)}</span>
        </div>
      </td>
      
      <td className="px-3 py-4">
        <span className="text-gray-300">{caller.tradingStyle}</span>
      </td>
      
      <td className="px-3 py-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          caller.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
          caller.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {caller.riskLevel}
        </span>
      </td>
      
      <td className="px-3 py-4">
        <div className="flex items-center justify-center space-x-1">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-medium">{caller.accuracy}%</span>
        </div>
      </td>
      
      <td className="px-3 py-4">
        {isAccessible ? (
          <Link to={`/tradingview-caller/${caller.id}`}>
            <Button variant="outline" size="sm" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10">
              {t('language') === 'en' ? 'View Profile' : 'Смотреть'}
            </Button>
          </Link>
        ) : (
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">Premium</span>
          </div>
        )}
      </td>
    </tr>
  );
};
