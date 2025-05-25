
import React from 'react';
import { AdBanner } from './AdBanner';
import { SponsoredPost } from './SponsoredPost';

interface AdZoneProps {
  type: 'banner' | 'sponsored-post' | 'sidebar';
  position?: 'top' | 'middle' | 'bottom' | 'side';
  className?: string;
}

export function AdZone({ type, position = 'middle', className = '' }: AdZoneProps) {
  const renderAd = () => {
    switch (type) {
      case 'banner':
        return (
          <AdBanner 
            format={position === 'side' ? 'vertical' : 'horizontal'}
            size={position === 'top' ? 'small' : 'medium'}
          />
        );
      
      case 'sponsored-post':
        return (
          <SponsoredPost
            title="Новая эра криптотрейдинга"
            description="Откройте для себя революционную платформу с AI-аналитикой, минимальными комиссиями и максимальной безопасностью. Присоединяйтесь к тысячам успешных трейдеров."
            sponsor="CryptoTech Solutions"
            cta="Начать торговать"
          />
        );
      
      case 'sidebar':
        return (
          <div className="space-y-4">
            <AdBanner format="square" size="medium" />
            <AdBanner format="vertical" size="small" />
          </div>
        );
      
      default:
        return <AdBanner />;
    }
  };

  return (
    <div className={`ad-zone ad-zone--${type} ad-zone--${position} ${className}`}>
      {renderAd()}
    </div>
  );
}
