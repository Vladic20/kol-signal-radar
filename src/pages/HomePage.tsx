
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import StatsSection from '@/components/home/StatsSection';
import TopKOLsSection from '@/components/home/TopKOLsSection';
import LatestSignalsSection from '@/components/home/LatestSignalsSection';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout showSidebar={true}>
      <div className="py-8 space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <StatsSection />
        
        {/* Top KOLs Section */}
        <TopKOLsSection />
        
        {/* Latest Signals Section */}
        <LatestSignalsSection />
      </div>
    </Layout>
  );
};

export default HomePage;
