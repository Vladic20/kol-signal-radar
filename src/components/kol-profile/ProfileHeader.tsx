
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, MapPin, Link as LinkIcon, Lock } from 'lucide-react';
import { KOL } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileHeaderProps {
  kol: KOL;
  stats: {
    following: number;
    followers: number;
    roi30d: number;
  };
}

const ProfileHeader = ({ kol, stats }: ProfileHeaderProps) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="relative mb-6">
      {/* Cover Image */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-lg mb-4" />
      
      {/* Profile Info */}
      <div className={`${isMobile ? 'px-4' : 'px-6'}`}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-24">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-black bg-black mb-4 md:mb-0">
              <AvatarImage src={kol.avatar} alt={kol.name} />
              <AvatarFallback>{kol.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                  {kol.name}
                </h1>
                <CheckCircle className="w-5 h-5 text-blue-500" />
                {kol.premium && (
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 mb-2">@{kol.name.toLowerCase().replace(/\s+/g, '_')}</p>
              <p className="text-gray-300 mb-4">
                Профессиональный трейдер • Аналитик криптовалют • ROI 30d: +{stats.roi30d}%
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>На платформе с 2022</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{language === 'en' ? 'Global' : 'Глобально'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-neon-purple hover:underline cursor-pointer">
                    tradingview.com/u/{kol.name}
                  </span>
                </div>
              </div>

              {/* Follow stats */}
              <div className="flex space-x-4 text-sm">
                <span className="text-white">
                  <strong>{formatNumber(stats.following)}</strong>{' '}
                  <span className="text-gray-400">подписок</span>
                </span>
                <span className="text-white">
                  <strong>{formatNumber(stats.followers)}</strong>{' '}
                  <span className="text-gray-400">подписчиков</span>
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
