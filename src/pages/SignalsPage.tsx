
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { SignalCard } from '@/components/ui/signal-card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signals, kols } from '@/data/mockData';
import { TrendingUp, Clock, Filter } from 'lucide-react';

const SignalsPage = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const filteredSignals = signals.filter(signal => {
    if (activeTab === 'all') return true;
    if (activeTab === 'buy') return signal.type === 'Long';
    if (activeTab === 'sell') return signal.type === 'Short';
    return true;
  });

  // Function to get KOL by ID
  const getKolById = (kolId: number) => {
    return kols.find(kol => kol.id === kolId) || kols[0]; // fallback to first KOL if not found
  };

  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
              {language === 'en' ? 'Trading Signals' : 'Торговые сигналы'}
            </h1>
            <p className="text-gray-400 mt-2">
              {language === 'en' 
                ? 'All trading signals from verified KOLs' 
                : 'Все торговые сигналы от проверенных трейдеров'}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 max-w-lg bg-black/20 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-neon-purple/20 flex items-center gap-2">
              <Filter size={16} />
              {language === 'en' ? 'All' : 'Все'}
            </TabsTrigger>
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/20 text-green-400 flex items-center gap-2">
              <TrendingUp size={16} />
              BUY
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20 text-red-400 flex items-center gap-2">
              <TrendingUp size={16} className="rotate-180" />
              SELL
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-neon-purple/20 flex items-center gap-2">
              <Clock size={16} />
              {language === 'en' ? 'Recent' : 'Новые'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Signals Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSignals.map(signal => (
            <SignalCard key={signal.id} signal={signal} kol={getKolById(signal.kolId)} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-white/20">
            {language === 'en' ? 'Load More Signals' : 'Загрузить ещё'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SignalsPage;
