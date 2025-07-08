
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
      <div className={`py-4 md:py-8 animate-fade-in ${isMobile ? 'px-4 max-w-full pb-4' : 'px-0 max-w-6xl mx-auto'}`}>
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Копитрейдинг
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Автоматически копируйте сделки успешных трейдеров
          </p>
        </div>
        
        {/* Centered Container */}
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            {/* Tabs List */}
            <div className="flex justify-center">
              <TabsList className={`bg-black/20 border border-white/10 ${
                isMobile ? 'grid grid-cols-3 w-full max-w-md' : 'grid grid-cols-5 max-w-3xl'
              }`}>
                <TabsTrigger 
                  value="traders" 
                  className={`data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple transition-all ${
                    isMobile ? 'text-xs px-2 py-2' : 'px-4 py-2'
                  }`}
                >
                  {isMobile ? 'Трейдеры' : 'Выбор трейдеров'}
                </TabsTrigger>
                <TabsTrigger 
                  value="parameters" 
                  className={`data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple transition-all ${
                    isMobile ? 'text-xs px-2 py-2' : 'px-4 py-2'
                  }`}
                >
                  {isMobile ? 'Настройки' : 'Параметры'}
                </TabsTrigger>
                <TabsTrigger 
                  value="api" 
                  className={`data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple transition-all ${
                    isMobile ? 'text-xs px-2 py-2' : 'px-4 py-2'
                  }`}
                >
                  API
                </TabsTrigger>
                {!isMobile && (
                  <>
                    <TabsTrigger 
                      value="active" 
                      className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple transition-all px-4 py-2"
                    >
                      Активные
                    </TabsTrigger>
                    <TabsTrigger 
                      value="instructions" 
                      className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple transition-all px-4 py-2"
                    >
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
                  className={`text-xs transition-all hover:scale-105 ${
                    activeTab === 'active' ? 'bg-neon-purple hover:bg-neon-purple/80' : 'hover:bg-white/5'
                  }`}
                >
                  Активные
                </Button>
                <Button 
                  variant={activeTab === 'instructions' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('instructions')}
                  className={`text-xs transition-all hover:scale-105 ${
                    activeTab === 'instructions' ? 'bg-neon-purple hover:bg-neon-purple/80' : 'hover:bg-white/5'
                  }`}
                >
                  Инструкция
                </Button>
              </div>
            )}
            
            {/* Tab Content - Centered */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <TabsContent value="traders" className="space-y-4 md:space-y-6 mt-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <TraderSelection />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="parameters" className="space-y-4 md:space-y-6 mt-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <TradingParameters />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="api" className="space-y-4 md:space-y-6 mt-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <ApiSettings />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="active" className="space-y-4 md:space-y-6 mt-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <ActiveCopying />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="instructions" className="space-y-4 md:space-y-6 mt-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <ApiInstructions />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CopyTradingPage;
