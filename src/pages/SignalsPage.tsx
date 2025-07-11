
import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SignalCard } from '@/components/ui/signal-card';
import { signals, kols } from '@/data/mockData';
import { Search, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SignalsPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const isMobile = useIsMobile();

  const filteredAndSortedSignals = useMemo(() => {
    let filtered = signals.filter(signal => {
      const kol = kols.find(k => k.id === signal.kolId);
      const matchesSearch = kol?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           signal.asset.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || signal.type === filterType;
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'profit':
          const aProfit = a.result || ((a.targetPrice / a.entryPrice - 1) * 100);
          const bProfit = b.result || ((b.targetPrice / b.entryPrice - 1) * 100);
          return bProfit - aProfit;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [searchTerm, filterType, sortBy]);

  return (
    <Layout showSidebar={true}>
      <div className="py-4 md:py-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue px-2 md:px-0">
          {t('signals') || 'Торговые сигналы'}
        </h1>
        
        {/* Search and Filters */}
        <div className={`mb-6 md:mb-8 px-2 md:px-0 grid gap-3 md:gap-4 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'
        }`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск по монете или KOL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-white/10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue placeholder="Стратегия" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 border-white/10">
              <SelectItem value="all">Все стратегии</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 border-white/10">
              <SelectItem value="newest">По дате</SelectItem>
              <SelectItem value="profit">По ROI</SelectItem>
              <SelectItem value="trader">По трейдеру</SelectItem>
            </SelectContent>
          </Select>
          
          {!isMobile && (
            <Button variant="outline" className="border-white/20">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          )}
        </div>

        {/* Signals Grid */}
        <div className={`grid gap-4 md:gap-6 px-2 md:px-0 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredAndSortedSignals.map(signal => {
            const signalKol = kols.find(k => k.id === signal.kolId);
            if (!signalKol) return null;
            
            return (
              <SignalCard key={signal.id} signal={signal} kol={signalKol} />
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 md:mt-12 px-2 md:px-0">
          <Button variant="outline" className="border-white/20">
            Загрузить ещё
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SignalsPage;
