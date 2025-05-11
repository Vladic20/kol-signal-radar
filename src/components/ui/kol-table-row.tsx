
import React from 'react';
import { KOL } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface KOLTableRowProps {
  kol: KOL;
  rank: number;
}

export function KOLTableRow({ kol, rank }: KOLTableRowProps) {
  const { t } = useLanguage();
  const { isPremium } = useAuth();
  const navigate = useNavigate();
  
  const handleDetailsClick = () => {
    if (isPremium || !kol.premium) {
      navigate(`/kol/${kol.id}`);
    }
  };
  
  // Get the main platform with most followers
  const mainPlatform = [...kol.platforms].sort((a, b) => b.followers - a.followers)[0];

  return (
    <tr className={`border-b border-white/10 hover:bg-white/5 transition-colors ${kol.premium && !isPremium ? 'opacity-80' : ''}`}>
      <td className="px-3 py-3 text-center">{rank}</td>
      <td className="px-3 py-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-semibold">{kol.name}</div>
            <div className="text-xs text-muted-foreground">
              {kol.language === 'EN' ? '🇺🇸 English' : kol.language === 'RU' ? '🇷🇺 Russian' : '🇺🇸 English / 🇷🇺 Russian'}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center">
          {mainPlatform.name === 'Twitter' && (
            <svg className="w-5 h-5 mr-2 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 2 18.28a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z" />
            </svg>
          )}
          {mainPlatform.name === 'Telegram' && (
            <svg className="w-5 h-5 mr-2 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.75 8.34l-1.85 8.7c-.14.62-.5.77-.99.47l-2.77-2.04-1.33 1.28c-.14.14-.28.28-.56.28l.2-2.79L16.59 9c.35-.31-.08-.45-.52-.17l-7.12 4.47-3.05-.95c-.67-.21-.68-.67.14-.99L16.5 7.33c.56-.21 1.04.13 1.25 1.01z" />
            </svg>
          )}
          {mainPlatform.name === 'YouTube' && (
            <svg className="w-5 h-5 mr-2 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.015 3.015 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          )}
          {mainPlatform.name === 'Discord' && (
            <svg className="w-5 h-5 mr-2 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
            </svg>
          )}
          <span>{mainPlatform.name}</span>
        </div>
      </td>
      <td className="px-3 py-3 text-right">
        {mainPlatform.followers >= 1000000
          ? `${(mainPlatform.followers / 1000000).toFixed(1)}M`
          : mainPlatform.followers >= 1000
          ? `${(mainPlatform.followers / 1000).toFixed(1)}K`
          : mainPlatform.followers}
      </td>
      <td className="px-3 py-3">{kol.signalFrequency}</td>
      <td className="px-3 py-3">{kol.engagement}</td>
      <td className="px-3 py-3">
        <div className={`text-center px-2 py-0.5 rounded-full text-xs inline-block
          ${kol.reputation === 'Clean' 
            ? 'bg-green-900/30 text-green-400' 
            : kol.reputation === 'Mixed' 
            ? 'bg-yellow-900/30 text-yellow-400' 
            : 'bg-red-900/30 text-red-400'}`
        }>
          {t(kol.reputation.toLowerCase())}
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full ${
              kol.accuracy >= 75 ? 'bg-green-500' : 
              kol.accuracy >= 60 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`} 
            style={{ width: `${kol.accuracy}%` }}
          ></div>
        </div>
        <div className="text-xs text-center mt-1">{kol.accuracy}%</div>
      </td>
      <td className="px-3 py-3">
        <Button 
          size="sm" 
          onClick={handleDetailsClick}
          className={`w-full ${kol.premium && !isPremium ? 'bg-gray-700' : ''}`}
          disabled={kol.premium && !isPremium}
        >
          {kol.premium && !isPremium ? (
            <span className="flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              {t('premiumOnly')}
            </span>
          ) : (
            t('details')
          )}
        </Button>
      </td>
    </tr>
  );
}
