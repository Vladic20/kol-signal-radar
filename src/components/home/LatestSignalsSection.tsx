
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { signals } from '@/data/mockData';
import { SignalCard } from '@/components/ui/signal-card';
import { Signal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LatestSignalsSection: React.FC = () => {
  const { language } = useLanguage();
  const latestSignals = signals.slice(0, 3);

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Signal className="w-5 h-5 text-neon-blue" />
          {language === 'en' ? 'Latest Trading Signals' : 'Последние торговые сигналы'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {latestSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} kol={null} />
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link to="/signals">
            <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2">
              {language === 'en' ? 'View All Signals' : 'Все сигналы'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
