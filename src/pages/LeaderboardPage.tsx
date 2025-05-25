import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { KOLTableRow } from '@/components/ui/kol-table-row';
import { AdZone } from '@/components/ads/AdZone';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { kols, KOL } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';

const LeaderboardPage = () => {
  const { t } = useLanguage();
  const { isPremium } = useAuth();
  const [filteredKols, setFilteredKols] = useState(kols);
  const [visibleKols, setVisibleKols] = useState<KOL[]>([]);
  
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
        {/* Top Ad Banner */}
        <div className="mb-6">
          <AdZone type="banner" position="top" />
        </div>

        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('kolsLeaderboard')}
        </h1>
        
        {/* Filters */}
        <div className="bg-black/30 border border-white/10 rounded-lg p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4">{t('filterBy')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Platform filter */}
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
        
        {/* Sponsored Post */}
        <div className="mb-8">
          <AdZone type="sponsored-post" position="middle" />
        </div>
        
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
        
        {/* Bottom Ad Banner */}
        <div className="mt-8 mb-6">
          <AdZone type="banner" position="bottom" />
        </div>
        
        {/* Premium CTA */}
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
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
