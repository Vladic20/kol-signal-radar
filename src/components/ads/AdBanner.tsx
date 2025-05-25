
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  format?: 'horizontal' | 'vertical' | 'square';
  size?: 'small' | 'medium' | 'large';
  sponsored?: boolean;
}

export function AdBanner({ format = 'horizontal', size = 'medium', sponsored = true }: AdBannerProps) {
  const getSizeClasses = () => {
    if (format === 'horizontal') {
      switch (size) {
        case 'small': return 'h-20';
        case 'medium': return 'h-32';
        case 'large': return 'h-48';
        default: return 'h-32';
      }
    }
    if (format === 'vertical') {
      switch (size) {
        case 'small': return 'w-48 h-64';
        case 'medium': return 'w-56 h-80';
        case 'large': return 'w-64 h-96';
        default: return 'w-56 h-80';
      }
    }
    // square format
    switch (size) {
      case 'small': return 'w-32 h-32';
      case 'medium': return 'w-48 h-48';
      case 'large': return 'w-64 h-64';
      default: return 'w-48 h-48';
    }
  };

  return (
    <Card className={`${getSizeClasses()} bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border-neon-purple/30 hover:border-neon-purple/50 transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
      {sponsored && (
        <Badge className="absolute top-2 left-2 text-xs bg-neon-purple/80 text-white">
          Реклама
        </Badge>
      )}
      
      <div className="p-4 h-full flex flex-col justify-center items-center text-center">
        <div className="text-gradient text-lg font-bold mb-2">
          CryptoExchange Pro
        </div>
        <p className="text-sm text-gray-300 mb-3">
          Торгуйте криптовалютой с минимальными комиссиями
        </p>
        <div className="flex items-center text-neon-blue text-sm group-hover:text-neon-purple transition-colors">
          <span>Подробнее</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
    </Card>
  );
}
