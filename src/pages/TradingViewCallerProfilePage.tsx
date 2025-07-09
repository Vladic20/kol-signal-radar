
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { tradingViewCallers } from '@/data/tradingViewCallers';
import ProfileHeader from '@/components/tradingview/ProfileHeader';
import ActionButtons from '@/components/tradingview/ActionButtons';
import TradingStatsCards from '@/components/tradingview/TradingStatsCards';
import TradingProfileCard from '@/components/tradingview/TradingProfileCard';
import ContentTabs from '@/components/tradingview/ContentTabs';

const TradingViewCallerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { user, isPremium } = useAuth();
  const isMobile = useIsMobile();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('ideas');

  const caller = tradingViewCallers.find(c => c.id === parseInt(id || '0'));
  if (!caller) {
    return (
      <Layout>
        <div className={`py-4 md:py-8 text-center ${isMobile ? 'px-4 max-w-full pb-4' : 'px-0'}`}>
          <h1 className="text-xl md:text-2xl font-bold text-white mb-4">Трейдер не найден</h1>
          <Link to="/leaderboard">
            <Button variant="outline" className="w-full md:w-auto">Вернуться к лидерборду</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Layout>
      <div className={`max-w-4xl mx-auto py-4 md:py-8 animate-fade-in ${
        isMobile ? 'px-4 max-w-full pb-4' : 'px-0'
      }`}>
        <ProfileHeader caller={caller} />
        
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-end'} mb-6`}>
          <ActionButtons 
            caller={caller}
            user={user}
            isPremium={isPremium}
            isFollowing={isFollowing}
            onFollow={handleFollow}
          />
        </div>

        <TradingStatsCards caller={caller} />
        
        <TradingProfileCard caller={caller} />

        <ContentTabs 
          caller={caller}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </Layout>
  );
};

export default TradingViewCallerProfilePage;
