
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { kols, signals } from '@/data/mockData';
import { feedPosts } from '@/data/feedData';
import ProfileHeader from '@/components/kol-profile/ProfileHeader';
import ProfileActions from '@/components/kol-profile/ProfileActions';
import TradingStatsGrid from '@/components/kol-profile/TradingStatsGrid';
import ProfileTabs from '@/components/kol-profile/ProfileTabs';
import { useIsMobile } from '@/hooks/use-mobile';

const KolProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const isMobile = useIsMobile();

  const kol = kols.find(k => k.id === parseInt(id || '0'));
  if (!kol) {
    return (
      <Layout>
        <div className={`py-4 md:py-8 text-center px-2 md:px-0 ${isMobile ? 'max-w-full' : ''}`}>
          <h1 className="text-xl md:text-2xl font-bold text-white mb-4">Трейдер не найден</h1>
          <Link to="/leaderboard">
            <Button variant="outline" className="w-full md:w-auto">Вернуться к лидерборду</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const kolPosts = feedPosts.filter(post => post.authorId === kol.id);
  const kolSignals = signals.filter(signal => signal.kolId === kol.id);
  const totalFollowers = kol.platforms.reduce((sum, platform) => sum + platform.followers, 0);

  const stats = {
    posts: kolPosts.length,
    signals: kolSignals.length,
    following: Math.floor(totalFollowers * 0.1),
    followers: totalFollowers,
    winRate: kol.accuracy,
    avgProfit: Math.floor(Math.random() * 20) + 10,
    totalTrades: Math.floor(Math.random() * 500) + 100,
    roi30d: Math.floor(Math.random() * 50) + 10,
    signals30d: Math.floor(Math.random() * 20) + 5,
    tradingFrequency: 'Ежедневно'
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Layout>
      <div className={`max-w-4xl mx-auto py-4 md:py-8 animate-fade-in ${
        isMobile ? 'px-4 max-w-full pb-4' : 'px-0'
      }`}>
        <ProfileHeader kol={kol} stats={stats} />
        
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-end'} mb-6`}>
          <ProfileActions 
            user={user} 
            isFollowing={isFollowing} 
            onFollow={handleFollow} 
          />
        </div>

        <TradingStatsGrid stats={stats} />

        <ProfileTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          posts={kolPosts}
          signals={kolSignals}
          stats={stats}
        />
      </div>
    </Layout>
  );
};

export default KolProfilePage;
