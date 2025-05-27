
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiInstructions } from '@/components/copy-trading/ApiInstructions';
import { ApiSettings } from '@/components/copy-trading/ApiSettings';
import { TraderSelection } from '@/components/copy-trading/TraderSelection';
import { TradingParameters } from '@/components/copy-trading/TradingParameters';
import { ActiveCopying } from '@/components/copy-trading/ActiveCopying';
import { useLanguage } from '@/contexts/LanguageContext';
import { Copy, Settings, Users, TrendingUp, Activity } from 'lucide-react';

const CopyTradingPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('instructions');

  const getTabContent = () => {
    switch (activeTab) {
      case 'instructions':
        return <ApiInstructions />;
      case 'settings':
        return <ApiSettings />;
      case 'traders':
        return <TraderSelection />;
      case 'parameters':
        return <TradingParameters />;
      case 'active':
        return <ActiveCopying />;
      default:
        return <ApiInstructions />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent mb-4">
              {language === 'en' ? 'Copy Trading Platform' : 'Платформа Копитрейдинга'}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Follow successful traders and automatically copy their trading strategies'
                : 'Следуйте за успешными трейдерами и автоматически копируйте их торговые стратегии'
              }
            </p>
          </div>

          {/* Main Content */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gradient bg-gradient-to-r from-neon-purple to-neon-blue">
                {language === 'en' ? 'Setup Copy Trading' : 'Настройка Копитрейдинга'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="instructions" className="flex items-center gap-2">
                    <Copy size={16} />
                    {language === 'en' ? 'API Guide' : 'API Инструкция'}
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings size={16} />
                    {language === 'en' ? 'API Settings' : 'API Настройки'}
                  </TabsTrigger>
                  <TabsTrigger value="traders" className="flex items-center gap-2">
                    <Users size={16} />
                    {language === 'en' ? 'Select Trader' : 'Выбор Трейдера'}
                  </TabsTrigger>
                  <TabsTrigger value="parameters" className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    {language === 'en' ? 'Parameters' : 'Параметры'}
                  </TabsTrigger>
                  <TabsTrigger value="active" className="flex items-center gap-2">
                    <Activity size={16} />
                    {language === 'en' ? 'Active' : 'Активные'}
                  </TabsTrigger>
                </TabsList>

                <div className="min-h-[600px]">
                  {getTabContent()}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CopyTradingPage;
