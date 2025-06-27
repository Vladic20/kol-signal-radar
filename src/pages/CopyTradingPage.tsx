
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
      <div className={`py-4 md:py-8 animate-fade-in px-2 md:px-0 ${isMobile ? 'max-w-full' : ''}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          Копитрейдинг
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <TabsList className={`w-full bg-black/20 border border-white/10 ${
            isMobile ? 'grid grid-cols-3 h-auto' : 'grid grid-cols-5 max-w-4xl'
          }`}>
            <TabsTrigger 
              value="traders" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              {isMobile ? 'Трейдеры' : 'Трейдеры'}
            </TabsTrigger>
            <TabsTrigger 
              value="parameters" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              {isMobile ? 'Настройки' : 'Параметры'}
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              API
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="active" className="data-[state=active]:bg-neon-purple/20">
                  Активные
                </TabsTrigger>
                <TabsTrigger value="instructions" className="data-[state=active]:bg-neon-purple/20">
                  Инструкция
                </TabsTrigger>
              </>
            )}
          </TabsList>
          
          {/* Mobile additional tabs */}
          {isMobile && (
            <div className="grid grid-cols-2 gap-2 mb-4">
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
          
          <TabsContent value="traders">
            <TraderSelection />
          </TabsContent>
          
          <TabsContent value="parameters">
            <TradingParameters />
          </TabsContent>
          
          <TabsContent value="api">
            <ApiSettings />
          </TabsContent>
          
          <TabsContent value="active">
            <ActiveCopying />
          </TabsContent>
          
          <TabsContent value="instructions">
            <ApiInstructions />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CopyTradingPage;
