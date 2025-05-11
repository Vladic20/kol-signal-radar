
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Signal, KOL } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignalCardProps {
  signal: Signal;
  kol: KOL;
}

export function SignalCard({ signal, kol }: SignalCardProps) {
  const { t, language } = useLanguage();
  const { isPremium } = useAuth();
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleKolClick = () => {
    navigate(`/kol/${kol.id}`);
  };
  
  // Check if premium content is accessible
  const isPremiumAccessible = !signal.premium || isPremium;

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:border-neon-purple/50 ${isPremiumAccessible ? '' : 'opacity-80'}`}>
      <CardHeader className="p-4 bg-gradient-to-r from-secondary to-secondary/60 flex flex-row justify-between items-center space-y-0">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">{signal.asset}</span>
          <Badge variant={signal.type === 'Long' ? 'default' : 'destructive'} className="bg-gradient-to-r from-neon-green to-neon-blue text-white">
            {t(signal.type.toLowerCase())}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(signal.date)}
        </div>
      </CardHeader>
      <CardContent className={`p-4 pt-5 ${!isPremiumAccessible ? 'blur-sm' : ''}`}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground">{t('entry')}</div>
            <div className="font-semibold">${signal.entryPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">{t('target')}</div>
            <div className="font-semibold">${signal.targetPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">{t('stopLoss')}</div>
            <div className="font-semibold">${signal.stopLoss.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">{t('status')}</div>
            <Badge variant={
              signal.status === 'Open' ? 'outline' : 
              signal.status === 'Closed' ? 'default' : 'secondary'
            }>
              {t(signal.status.toLowerCase())}
            </Badge>
            {signal.result && (
              <span className={`ml-2 ${signal.result > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {signal.result > 0 ? '+' : ''}{signal.result}%
              </span>
            )}
          </div>
          
          <div className="flex items-center" onClick={handleKolClick}>
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 cursor-pointer">
              <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm cursor-pointer hover:text-neon-purple">
              {kol.name}
            </div>
          </div>
        </div>
      </CardContent>
      
      {!isPremiumAccessible && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <Lock className="w-8 h-8 mb-2 text-neon-purple" />
          <span className="font-semibold text-white">{t('premiumOnly')}</span>
        </div>
      )}
    </Card>
  );
}
