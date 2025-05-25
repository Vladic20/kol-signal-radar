
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { SignalCard } from '@/components/ui/signal-card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { kols } from '@/data/mockData';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { getSignals } from '@/api/signalService';
import { toast } from 'sonner';
import { Signal } from '@/data/mockData';

const HomePage = () => {
  const { t } = useLanguage();
  const { isPremium, isAuthenticated } = useAuth();
  const [visibleSignals, setVisibleSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [uniqueAssets, setUniqueAssets] = useState<string[]>([]);
  
  // Filters
  const [assetFilter, setAssetFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [kolFilter, setKolFilter] = useState('all');
  
  // Загрузка сигналов при монтировании компонента и изменении фильтров
  useEffect(() => {
    const fetchSignals = async () => {
      setLoading(true);
      
      try {
        // Определяем фильтры для API запроса
        const filters = {
          ...(assetFilter !== 'all' ? { asset: assetFilter } : {}),
          ...(typeFilter !== 'all' ? { type: typeFilter } : {}),
          ...(kolFilter !== 'all' ? { kolId: parseInt(kolFilter) } : {})
        };
        
        // Получаем данные через API
        let signals = await getSignals(filters);
        
        // Для неавторизованных пользователей ограничиваем неприватные сигналы
        if (!isPremium) {
          signals = signals.filter(signal => !signal.premium).slice(0, 3);
        }
        
        setVisibleSignals(signals);
        
        // Получаем уникальные активы для фильтра
        const assets = [...new Set(signals.map(signal => signal.asset))];
        setUniqueAssets(assets);
      } catch (error) {
        console.error("Error fetching signals:", error);
        toast.error(t('language') === 'en' ? 'Failed to load signals' : 'Ошибка загрузки сигналов');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSignals();
  }, [assetFilter, typeFilter, kolFilter, isPremium, t]);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('projectTitle')}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
          {isPremium ? (
            <>
              {t('language') === 'en' 
                ? 'Get access to trading signals from the top crypto influencers in the world.'
                : 'Получите доступ к торговым сигналам от ведущих крипто-инфлюенсеров мира.'}
            </>
          ) : (
            <>
              {t('language') === 'en'
                ? 'Unlock unlimited access to premium signals from top crypto influencers.'
                : 'Разблокируйте неограниченный доступ к премиум-сигналам от ведущих крипто-инфлюенсеров.'}
            </>
          )}
        </p>
        {!isPremium && (
          <div className="space-x-4">
            <Link to={isAuthenticated ? '/dashboard' : '/register'}>
              <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transform transition hover:shadow-xl">
                {t('subscribeToPremium')}
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="outline" className="border-neon-blue text-white hover:bg-white/10">
                  {t('Login')}
                </Button>
              </Link>
            )}
          </div>
        )}
      </section>
      
      {/* Signals Section */}
      <section className="py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">{t('latestSignals')}</h2>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
            {/* Asset Filter */}
            <Select value={assetFilter} onValueChange={setAssetFilter}>
              <SelectTrigger className="w-full md:w-[140px] bg-black/20">
                <SelectValue placeholder={t('asset')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('language') === 'en' ? 'All Assets' : 'Все активы'}</SelectItem>
                {uniqueAssets.map((asset) => (
                  <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[120px] bg-black/20">
                <SelectValue placeholder={t('type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('language') === 'en' ? 'All Types' : 'Все типы'}</SelectItem>
                <SelectItem value="Long">{t('long')}</SelectItem>
                <SelectItem value="Short">{t('short')}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* KOL Filter */}
            <Select value={kolFilter} onValueChange={setKolFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-black/20">
                <SelectValue placeholder="KOL" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('language') === 'en' ? 'All KOLs' : 'Все KOL\'ы'}</SelectItem>
                {kols.map((kol) => (
                  <SelectItem key={kol.id} value={kol.id.toString()}>{kol.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Signals Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Показываем скелетон загрузки
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-black/30 h-64 rounded-lg"></div>
            ))
          ) : visibleSignals.length > 0 ? (
            // Показываем сигналы
            visibleSignals.map(signal => {
              const signalKol = kols.find(k => k.id === signal.kolId);
              if (!signalKol) return null;
              
              return (
                <SignalCard key={signal.id} signal={signal} kol={signalKol} />
              );
            })
          ) : (
            // Показываем сообщение, если сигналы не найдены
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-400">
                {t('language') === 'en' 
                  ? 'No signals found matching your filters' 
                  : 'Сигналы, соответствующие вашим фильтрам, не найдены'}
              </p>
            </div>
          )}
        </div>
        
        {!isPremium && (
          <div className="mt-10 text-center">
            <div className="bg-gradient-to-r from-black/60 to-black/60 border border-neon-purple/30 p-8 rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-2">
                {t('language') === 'en' 
                  ? 'Unlock All Trading Signals' 
                  : 'Разблокируйте все торговые сигналы'}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('language') === 'en'
                  ? 'Premium users get unlimited access to all signals, including detailed analysis and trade statistics.'
                  : 'Премиум-пользователи получают неограниченный доступ ко всем сигналам, включая детальный анализ и торговую статистику.'}
              </p>
              <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  {t('subscribeToPremium')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;
