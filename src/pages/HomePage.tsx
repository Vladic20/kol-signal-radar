
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatsSection } from '@/components/home/StatsSection';
import { TopKOLsSection } from '@/components/home/TopKOLsSection';
import { LatestSignalsSection } from '@/components/home/LatestSignalsSection';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout showSidebar={true}>
      <div className="py-4 md:py-8 space-y-8 md:space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center py-8 md:py-16">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            {t('heroTitle')}
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-8 max-w-3xl mx-auto px-4">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="px-2 md:px-0">
          <StatsSection />
        </div>
        
        {/* Top KOLs Section */}
        <div className="px-2 md:px-0">
          <TopKOLsSection />
        </div>
        
        {/* Latest Signals Section */}
        <div className="px-2 md:px-0">
          <LatestSignalsSection />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
