
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TraderSelection } from '@/components/copy-trading/TraderSelection';
import { TradingParameters } from '@/components/copy-trading/TradingParameters';
import { ApiSettings } from '@/components/copy-trading/ApiSettings';
import { ActiveCopying } from '@/components/copy-trading/ActiveCopying';
import { ApiInstructions } from '@/components/copy-trading/ApiInstructions';

const CopyTradingPage = () => {
  const [activeTab, setActiveTab] = useState('traders');

  return (
    <Layout showSidebar={true}>
      <div className="py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          Копитрейдинг
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl bg-black/20 border border-white/10">
            <TabsTrigger value="traders" className="data-[state=active]:bg-neon-purple/20">
              Трейдеры
            </TabsTrigger>
            <TabsTrigger value="parameters" className="data-[state=active]:bg-neon-purple/20">
              Параметры
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-neon-purple/20">
              API
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-neon-purple/20">
              Активные
            </TabsTrigger>
            <TabsTrigger value="instructions" className="data-[state=active]:bg-neon-purple/20">
              Инструкция
            </TabsTrigger>
          </TabsList>
          
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
