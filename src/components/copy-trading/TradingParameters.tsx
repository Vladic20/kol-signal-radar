
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, DollarSign, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

export const TradingParameters: React.FC = () => {
  const { language } = useLanguage();
  const [parameters, setParameters] = useState({
    maxPositionSize: 100,
    riskPerTrade: [2],
    stopLoss: 5,
    takeProfit: 15,
    maxDailyLoss: 10,
    maxOpenPositions: 5,
    copyRatio: [1],
    autoStopLoss: true,
    autoTakeProfit: true,
    followOnlyProfitable: false,
    copyOnlyHighConfidence: true,
    slippageProtection: [0.5],
    tradingHours: 'all'
  });

  const handleSaveParameters = () => {
    // Здесь будет логика сохранения параметров
    console.log('Saving parameters:', parameters);
  };

  return (
    <div className="space-y-6">
      {/* Position Management */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign size={20} />
            {language === 'en' ? 'Position Management' : 'Управление Позициями'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxPosition">
                {language === 'en' ? 'Max Position Size (USDT)' : 'Макс. Размер Позиции (USDT)'}
              </Label>
              <Input
                id="maxPosition"
                type="number"
                value={parameters.maxPositionSize}
                onChange={(e) => setParameters(prev => ({
                  ...prev,
                  maxPositionSize: parseFloat(e.target.value) || 0
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxPositions">
                {language === 'en' ? 'Max Open Positions' : 'Макс. Открытых Позиций'}
              </Label>
              <Input
                id="maxPositions"
                type="number"
                value={parameters.maxOpenPositions}
                onChange={(e) => setParameters(prev => ({
                  ...prev,
                  maxOpenPositions: parseInt(e.target.value) || 0
                }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>
              {language === 'en' ? 'Risk Per Trade: ' : 'Риск на Сделку: '}
              <span className="text-neon-blue font-bold">{parameters.riskPerTrade[0]}%</span>
            </Label>
            <Slider
              value={parameters.riskPerTrade}
              onValueChange={(value) => setParameters(prev => ({
                ...prev,
                riskPerTrade: value
              }))}
              max={10}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>
              {language === 'en' ? 'Copy Ratio: ' : 'Коэффициент Копирования: '}
              <span className="text-neon-purple font-bold">{parameters.copyRatio[0]}x</span>
            </Label>
            <Slider
              value={parameters.copyRatio}
              onValueChange={(value) => setParameters(prev => ({
                ...prev,
                copyRatio: value
              }))}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            {language === 'en' ? 'Risk Management' : 'Управление Рисками'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stopLoss">
                {language === 'en' ? 'Stop Loss (%)' : 'Стоп-лосс (%)'}
              </Label>
              <Input
                id="stopLoss"
                type="number"
                value={parameters.stopLoss}
                onChange={(e) => setParameters(prev => ({
                  ...prev,
                  stopLoss: parseFloat(e.target.value) || 0
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="takeProfit">
                {language === 'en' ? 'Take Profit (%)' : 'Тейк-профит (%)'}
              </Label>
              <Input
                id="takeProfit"
                type="number"
                value={parameters.takeProfit}
                onChange={(e) => setParameters(prev => ({
                  ...prev,
                  takeProfit: parseFloat(e.target.value) || 0
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxDailyLoss">
                {language === 'en' ? 'Max Daily Loss (%)' : 'Макс. Дневной Убыток (%)'}
              </Label>
              <Input
                id="maxDailyLoss"
                type="number"
                value={parameters.maxDailyLoss}
                onChange={(e) => setParameters(prev => ({
                  ...prev,
                  maxDailyLoss: parseFloat(e.target.value) || 0
                }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>
              {language === 'en' ? 'Slippage Protection: ' : 'Защита от Проскальзывания: '}
              <span className="text-yellow-400 font-bold">{parameters.slippageProtection[0]}%</span>
            </Label>
            <Slider
              value={parameters.slippageProtection}
              onValueChange={(value) => setParameters(prev => ({
                ...prev,
                slippageProtection: value
              }))}
              max={2}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            {language === 'en' ? 'Advanced Settings' : 'Расширенные Настройки'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoStopLoss" className="text-base">
                  {language === 'en' ? 'Auto Stop Loss' : 'Автоматический Стоп-лосс'}
                </Label>
                <p className="text-sm text-gray-400">
                  {language === 'en' 
                    ? 'Automatically set stop loss for all positions'
                    : 'Автоматически устанавливать стоп-лосс для всех позиций'
                  }
                </p>
              </div>
              <Switch
                id="autoStopLoss"
                checked={parameters.autoStopLoss}
                onCheckedChange={(checked) => setParameters(prev => ({
                  ...prev,
                  autoStopLoss: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoTakeProfit" className="text-base">
                  {language === 'en' ? 'Auto Take Profit' : 'Автоматический Тейк-профит'}
                </Label>
                <p className="text-sm text-gray-400">
                  {language === 'en'
                    ? 'Automatically set take profit for all positions'
                    : 'Автоматически устанавливать тейк-профит для всех позиций'
                  }
                </p>
              </div>
              <Switch
                id="autoTakeProfit"
                checked={parameters.autoTakeProfit}
                onCheckedChange={(checked) => setParameters(prev => ({
                  ...prev,
                  autoTakeProfit: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="followOnlyProfitable" className="text-base">
                  {language === 'en' ? 'Follow Only Profitable Trades' : 'Копировать Только Прибыльные'}
                </Label>
                <p className="text-sm text-gray-400">
                  {language === 'en'
                    ? 'Only copy trades from profitable signals'
                    : 'Копировать только сделки из прибыльных сигналов'
                  }
                </p>
              </div>
              <Switch
                id="followOnlyProfitable"
                checked={parameters.followOnlyProfitable}
                onCheckedChange={(checked) => setParameters(prev => ({
                  ...prev,
                  followOnlyProfitable: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="copyOnlyHighConfidence" className="text-base">
                  {language === 'en' ? 'High Confidence Only' : 'Только Высокая Уверенность'}
                </Label>
                <p className="text-sm text-gray-400">
                  {language === 'en'
                    ? 'Copy only high confidence signals'
                    : 'Копировать только сигналы с высокой уверенностью'
                  }
                </p>
              </div>
              <Switch
                id="copyOnlyHighConfidence"
                checked={parameters.copyOnlyHighConfidence}
                onCheckedChange={(checked) => setParameters(prev => ({
                  ...prev,
                  copyOnlyHighConfidence: checked
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradingHours">
              {language === 'en' ? 'Trading Hours' : 'Торговые Часы'}
            </Label>
            <Select
              value={parameters.tradingHours}
              onValueChange={(value) => setParameters(prev => ({
                ...prev,
                tradingHours: value
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === 'en' ? '24/7 Trading' : 'Круглосуточно'}
                </SelectItem>
                <SelectItem value="active">
                  {language === 'en' ? 'Active Hours Only' : 'Только Активные Часы'}
                </SelectItem>
                <SelectItem value="custom">
                  {language === 'en' ? 'Custom Schedule' : 'Настраиваемое Расписание'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={20} />
            {language === 'en' ? 'Risk Warning' : 'Предупреждение о Рисках'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p>
            {language === 'en'
              ? 'Copy trading involves significant risk. Past performance does not guarantee future results. Only invest funds you can afford to lose.'
              : 'Копитрейдинг связан со значительными рисками. Прошлые результаты не гарантируют будущие. Инвестируйте только те средства, которые можете позволить себе потерять.'
            }
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSaveParameters}
          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 px-8 py-3"
        >
          {language === 'en' ? 'Save Trading Parameters' : 'Сохранить Параметры Торговли'}
        </Button>
      </div>
    </div>
  );
};
