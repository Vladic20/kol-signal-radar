
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Activity, Link as LinkIcon } from 'lucide-react';
import { TradingViewCaller } from '@/data/tradingViewCallers';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileHeaderProps {
  caller: TradingViewCaller;
}

const ProfileHeader = ({ caller }: ProfileHeaderProps) => {
  const isMobile = useIsMobile();

  const getLanguageFlag = (lang: string) => {
    if (lang === 'EN') return '🇺🇸';
    if (lang === 'RU') return '🇷🇺';
    return '🌍';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="relative mb-6">
      {/* TradingView themed cover */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" 
               style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
               }} />
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-2 bg-blue-600/80 px-3 py-1 rounded-full">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">TV</span>
            </div>
            <span className="text-white text-sm font-medium">TradingView</span>
          </div>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className={`${isMobile ? 'px-4' : 'px-6'}`}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-24">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-black bg-black mb-4 md:mb-0">
                <AvatarImage src={caller.avatar} alt={caller.name} />
                <AvatarFallback>{caller.name[0]}</AvatarFallback>
              </Avatar>
              {caller.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                  {caller.name}
                </h1>
                {caller.premium && (
                  <Badge className="bg-gradient-to-r from-neon-purple to-neon-blue text-white">
                    Premium
                  </Badge>
                )}
                <span className="text-lg">{getLanguageFlag(caller.language)}</span>
              </div>
              <p className="text-gray-400 mb-2">@{caller.username}</p>
              <p className="text-gray-300 mb-4">{caller.bio}</p>
              
              {/* Specialization tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {caller.specialization.map((spec, index) => (
                  <Badge key={index} variant="outline" className="border-white/20 text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(caller.joined).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span>Last active {new Date(caller.lastActive).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-blue-400 hover:underline cursor-pointer">
                    tradingview.com/u/{caller.username}
                  </span>
                </div>
              </div>

              {/* Follow stats */}
              <div className="flex space-x-4 text-sm">
                <span className="text-white">
                  <strong>{formatNumber(caller.followers)}</strong>{' '}
                  <span className="text-gray-400">followers</span>
                </span>
                <span className="text-white">
                  <strong>{caller.ideas}</strong>{' '}
                  <span className="text-gray-400">ideas</span>
                </span>
                <span className="text-white">
                  <strong>{formatNumber(caller.likes)}</strong>{' '}
                  <span className="text-gray-400">likes</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
