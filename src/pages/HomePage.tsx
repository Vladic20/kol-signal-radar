
import React from 'react';
import Layout from '@/components/layout/Layout';
import { TopKOLsSection } from '@/components/home/TopKOLsSection';
import { LatestSignalsSection } from '@/components/home/LatestSignalsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeedPreview } from '@/components/social/FeedPreview';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-12 animate-fade-in">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Latest Signals Section - at the top */}
        <LatestSignalsSection />

        {/* Feed Preview Section - what traders are discussing */}
        <section>
          <FeedPreview />
        </section>

        {/* Top KOLs Section - leaderboard preview */}
        <TopKOLsSection />
      </div>
    </Layout>
  );
};

export default HomePage;
