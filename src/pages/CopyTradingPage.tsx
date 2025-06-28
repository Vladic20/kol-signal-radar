
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TraderSelection } from '@/components/copy-trading/TraderSelection';
import { TradingParameters } from '@/components/copy-trading/TradingParameters';
import { ApiSettings } from '@/components/copy-trading/ApiSettings';
import { ActiveCopying } from '@/components/copy-trading/ActiveCopying';
import { ApiInstructions } from '@/components/copy-trading/ApiInstructions';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const CopyTradingPage = () => {
  const [activeTab, setActiveTab] = useState('traders');
  const isMobile = useIsMobile();

  return (
    <Layout showSidebar={true}>
      <div className={`py-4 md:py-8 animate-fade-in ${isMobile ? 'px-2 max-w-full' : 'px-0 max-w-6xl mx-auto'}`}>
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Копитрейдинг
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Автоматически копируйте сделки успешных трейдеров
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            <div className="flex justify-center">
              <TabsList className={`bg-black/20 border border-white/10 ${
                isMobile ? 'grid grid-cols-3 w-full max-w-md' : 'grid grid-cols-5 max-w-2xl'
              }`}>
                <TabsTrigger 
                  value="traders" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  {isMobile ? 'Трейдеры' : 'Выбор трейдеров'}
                </TabsTrigger>
                <TabsTrigger 
                  value="parameters" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  {isMobile ? 'Настройки' : 'Параметры'}
                </TabsTrigger>
                <TabsTrigger 
                  value="api" 
                  className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs px-2' : 'px-4'}`}
                >
                  API
                </TabsTrigger>
                {!isMobile && (
                  <>
                    <TabsTrigger value="active" className="data-[state=active]:bg-neon-purple/20 px-4">
                      Активные
                    </TabsTrigger>
                    <TabsTrigger value="instructions" className="data-[state=active]:bg-neon-purple/20 px-4">
                      Инструкция
                    </TabsTrigger>
                  </>
                )}
              </TabsList>
            </div>
            
            {/* Mobile additional tabs */}
            {isMobile && (
              <div className="grid grid-cols-2 gap-2 mb-4 max-w-md mx-auto">
                <Button 
                  variant={activeTab === 'active' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('active')}
                  className="text-xs"
                >
                  Активные
                </Button>
                <Button 
                  variant={activeTab === 'instructions' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('instructions')}
                  className="text-xs"
                >
                  Инструкция
                </Button>
              </div>
            )}
            
            <div className="max-w-3xl mx-auto">
              <TabsContent value="traders" className="space-y-4 md:space-y-6">
                <TraderSelection />
              </TabsContent>
              
              <TabsContent value="parameters" className="space-y-4 md:space-y-6">
                <TradingParameters />
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4 md:space-y-6">
                <ApiSettings />
              </TabsContent>
              
              <TabsContent value="active" className="space-y-4 md:space-y-6">
                <ActiveCopying />
              </TabsContent>
              
              <TabsContent value="instructions" className="space-y-4 md:space-y-6">
                <ApiInstructions />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CopyTradingPage;
