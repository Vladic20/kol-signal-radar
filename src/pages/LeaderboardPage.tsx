
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { KOLTableRow } from '@/components/ui/kol-table-row';
import { TradingViewCallerRow } from '@/components/ui/tradingview-caller-row';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { kols, KOL } from '@/data/mockData';
import { tradingViewCallers, TradingViewCaller } from '@/data/tradingViewCallers';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const LeaderboardPage = () => {
  const { t } = useLanguage();
  const { isPremium } = useAuth();
  const [filteredKols, setFilteredKols] = useState(kols);
  const [visibleKols, setVisibleKols] = useState<KOL[]>([]);
  const [filteredCallers, setFilteredCallers] = useState(tradingViewCallers);
  const [visibleCallers, setVisibleCallers] = useState<TradingViewCaller[]>([]);
  
  // Filters
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [followersFilter, setFollowersFilter] = useState<number>(0);
  const [accuracyFilter, setAccuracyFilter] = useState<number>(0);
  
  // Platform options
  const platforms = ['Twitter', 'Telegram', 'YouTube', 'Discord'];
  
  // Filter and limit KOLs based on premium status
  useEffect(() => {
    let result = [...kols];
    
    // Apply platform filter
    if (platformFilter !== 'all') {
      result = result.filter(kol => 
        kol.platforms.some(p => p.name === platformFilter)
      );
    }
    
    // Apply language filter
    if (languageFilter !== 'all') {
      result = result.filter(kol => 
        kol.language === languageFilter || kol.language === 'Both'
      );
    }
    
    // Apply followers filter
    if (followersFilter > 0) {
      result = result.filter(kol => {
        const totalFollowers = kol.platforms.reduce((sum, p) => sum + p.followers, 0);
        return totalFollowers >= followersFilter * 1000;
      });
    }
    
    // Apply accuracy filter
    if (accuracyFilter > 0) {
      result = result.filter(kol => kol.accuracy >= accuracyFilter);
    }
    
    // Sort by accuracy
    result = result.sort((a, b) => b.accuracy - a.accuracy);
    
    setFilteredKols(result);
    
    // Limit to 5 non-premium KOLs for free users
    if (!isPremium) {
      result = result.filter(kol => !kol.premium).slice(0, 5);
    }
    
    setVisibleKols(result);
  }, [platformFilter, languageFilter, followersFilter, accuracyFilter, isPremium]);

  // Filter TradingView callers
  useEffect(() => {
    let result = [...tradingViewCallers];
    
    // Apply language filter
    if (languageFilter !== 'all') {
      result = result.filter(caller => 
        caller.language === languageFilter || caller.language === 'Both'
      );
    }
    
    // Apply followers filter
    if (followersFilter > 0) {
      result = result.filter(caller => caller.followers >= followersFilter * 1000);
    }
    
    // Apply accuracy filter
    if (accuracyFilter > 0) {
      result = result.filter(caller => caller.accuracy >= accuracyFilter);
    }
    
    // Sort by accuracy
    result = result.sort((a, b) => b.accuracy - a.accuracy);
    
    setFilteredCallers(result);
    
    // Limit to 5 non-premium callers for free users
    if (!isPremium) {
      result = result.filter(caller => !caller.premium).slice(0, 5);
    }
    
    setVisibleCallers(result);
  }, [languageFilter, followersFilter, accuracyFilter, isPremium]);
  
  // Reset all filters
  const resetFilters = () => {
    setPlatformFilter('all');
    setLanguageFilter('all');
    setFollowersFilter(0);
    setAccuracyFilter(0);
  };
  
  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('kolsLeaderboard')}
        </h1>
        
        {/* Filters */}
        <div className="bg-black/30 border border-white/10 rounded-lg p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4">{t('filterBy')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Platform filter - only for KOLs */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('platform')}</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white"
              >
                <option value="all">{t('language') === 'en' ? 'All Platforms' : 'Все платформы'}</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Language filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('language')}</label>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white"
              >
                <option value="all">{t('language') === 'en' ? 'All Languages' : 'Все языки'}</option>
                <option value="EN">English</option>
                <option value="RU">Русский</option>
              </select>
            </div>
            
            {/* Followers slider */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t('minFollowers')}: {followersFilter > 0 ? `${followersFilter}K+` : 'Any'}
              </label>
              <Slider
                defaultValue={[0]}
                max={500}
                step={10}
                value={[followersFilter]}
                onValueChange={(values) => setFollowersFilter(values[0])}
                className="py-4"
              />
            </div>
            
            {/* Accuracy slider */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t('minAccuracy')}: {accuracyFilter > 0 ? `${accuracyFilter}%+` : 'Any'}
              </label>
              <Slider
                defaultValue={[0]}
                max={100}
                step={5}
                value={[accuracyFilter]}
                onValueChange={(values) => setAccuracyFilter(values[0])}
                className="py-4"
              />
            </div>
          </div>
          
          {/* Filter buttons */}
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={resetFilters} 
              className="mr-2 border-white/20"
            >
              {t('resetFilters')}
            </Button>
          </div>
        </div>
        
        {/* Tabs for different types */}
        <Tabs defaultValue="kols" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 h-auto bg-black/20 border border-white/10">
            <TabsTrigger value="kols" className="data-[state=active]:bg-neon-purple/20">
              Social Media KOLs
            </TabsTrigger>
            <TabsTrigger value="tradingview" className="data-[state=active]:bg-neon-purple/20">
              TradingView Callers
            </TabsTrigger>
          </TabsList>
          
          {/* KOLs Tab */}
          <TabsContent value="kols">
            {/* Results count */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">
                {t('language') === 'en' 
                  ? `Showing ${visibleKols.length} of ${filteredKols.length} KOLs`
                  : `Показано ${visibleKols.length} из ${filteredKols.length} KOL'ов`}
              </p>
            </div>
            
            {/* KOLs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-black/30 text-gray-400">
                  <tr>
                    <th className="px-3 py-3 text-center">{t('rank')}</th>
                    <th className="px-3 py-3">{t('name')}</th>
                    <th className="px-3 py-3">{t('platform')}</th>
                    <th className="px-3 py-3 text-right">{t('followers')}</th>
                    <th className="px-3 py-3">{t('signalFreq')}</th>
                    <th className="px-3 py-3">{t('engagement')}</th>
                    <th className="px-3 py-3">{t('reputation')}</th>
                    <th className="px-3 py-3">{t('accuracy')}</th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleKols.map((kol, index) => (
                    <KOLTableRow key={kol.id} kol={kol} rank={index + 1} />
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Premium CTA for KOLs */}
            {!isPremium && filteredKols.length > visibleKols.length && (
              <div className="mt-10 text-center">
                <div className="bg-gradient-to-r from-black/60 to-black/60 border border-neon-purple/30 p-8 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t('language') === 'en' 
                      ? 'Unlock Full KOL Leaderboard'
                      : 'Разблокируйте полный лидерборд KOL\'ов'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {t('language') === 'en'
                      ? `${filteredKols.length - visibleKols.length} more KOLs are available with Premium access`
                      : `Еще ${filteredKols.length - visibleKols.length} KOL'ов доступны с Premium доступом`}
                  </p>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                      {t('subscribeToPremium')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* TradingView Callers Tab */}
          <TabsContent value="tradingview">
            {/* Results count */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">
                {t('language') === 'en' 
                  ? `Showing ${visibleCallers.length} of ${filteredCallers.length} TradingView Callers`
                  : `Показано ${visibleCallers.length} из ${filteredCallers.length} TradingView коллеров`}
              </p>
            </div>
            
            {/* TradingView Callers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-black/30 text-gray-400">
                  <tr>
                    <th className="px-3 py-3 text-center">Rank</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3 text-right">Followers</th>
                    <th className="px-3 py-3 text-right">Ideas</th>
                    <th className="px-3 py-3 text-right">Likes</th>
                    <th className="px-3 py-3">Trading Style</th>
                    <th className="px-3 py-3">Risk Level</th>
                    <th className="px-3 py-3">Accuracy</th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCallers.map((caller, index) => (
                    <TradingViewCallerRow key={caller.id} caller={caller} rank={index + 1} />
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Premium CTA for TradingView Callers */}
            {!isPremium && filteredCallers.length > visibleCallers.length && (
              <div className="mt-10 text-center">
                <div className="bg-gradient-to-r from-black/60 to-black/60 border border-neon-purple/30 p-8 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t('language') === 'en' 
                      ? 'Unlock Full TradingView Callers Leaderboard'
                      : 'Разблокируйте полный лидерборд TradingView коллеров'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {t('language') === 'en'
                      ? `${filteredCallers.length - visibleCallers.length} more TradingView callers are available with Premium access`
                      : `Еще ${filteredCallers.length - visibleCallers.length} TradingView коллеров доступны с Premium доступом`}
                  </p>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                      {t('subscribeToPremium')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
