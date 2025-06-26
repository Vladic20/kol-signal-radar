
import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KOLTableRow } from '@/components/ui/kol-table-row';
import { kols } from '@/data/mockData';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LeaderboardPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [platformFilter, setPlatformFilter] = useState('all');
  const isMobile = useIsMobile();

  const filteredAndSortedKols = useMemo(() => {
    let filtered = kols.filter(kol => 
      kol.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (platformFilter === 'all' || kol.platforms.some(p => p.name.toLowerCase() === platformFilter))
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'accuracy':
          return b.accuracy - a.accuracy;
        case 'followers':
          return b.platforms[0].followers - a.platforms[0].followers;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, platformFilter]);

  return (
    <Layout showSidebar={true}>
      <div className="py-4 md:py-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue px-2 md:px-0">
          {t('leaderboard')}
        </h1>
        
        {/* Search and Filters */}
        <div className={`mb-6 md:mb-8 px-2 md:px-0 grid gap-3 md:gap-4 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
        }`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t('searchKOLs')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-white/10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">{t('sortByRank')}</SelectItem>
              <SelectItem value="accuracy">{t('sortByAccuracy')}</SelectItem>
              <SelectItem value="followers">{t('sortByFollowers')}</SelectItem>
              <SelectItem value="name">{t('sortByName')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allPlatforms')}</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="discord">Discord</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-3 md:space-y-4 px-2 md:px-0">
          {filteredAndSortedKols.map((kol, index) => (
            <KOLTableRow key={kol.id} kol={kol} rank={index + 1} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
