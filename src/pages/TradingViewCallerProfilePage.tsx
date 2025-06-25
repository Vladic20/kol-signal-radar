
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('ideas');

  const caller = tradingViewCallers.find(c => c.id === parseInt(id || '0'));
  if (!caller) {
    return (
      <Layout>
        <div className="py-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Трейдер не найден</h1>
          <Link to="/leaderboard">
            <Button variant="outline">Вернуться к лидерборду</Button>
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
      <div className="max-w-4xl mx-auto py-4 md:py-8 animate-fade-in">
        <ProfileHeader caller={caller} />
        
        <div className="flex justify-end mb-6">
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
