
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, EyeOff, TestTube, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ApiSettings: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [apiConfig, setApiConfig] = useState({
    exchange: '',
    apiKey: '',
    apiSecret: '',
    testMode: true
  });

  const handleSave = () => {
    if (!apiConfig.exchange || !apiConfig.apiKey || !apiConfig.apiSecret) {
      toast({
        title: language === 'en' ? 'Error' : 'Ошибка',
        description: language === 'en' 
          ? 'Please fill in all required fields'
          : 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    // Здесь будет логика сохранения API настроек
    toast({
      title: language === 'en' ? 'Success' : 'Успешно',
      description: language === 'en'
        ? 'API settings saved successfully'
        : 'Настройки API успешно сохранены'
    });
  };

  const handleTest = () => {
    if (!apiConfig.apiKey || !apiConfig.apiSecret) {
      toast({
        title: language === 'en' ? 'Error' : 'Ошибка',
        description: language === 'en'
          ? 'Please enter API credentials first'
          : 'Сначала введите API данные',
        variant: 'destructive'
      });
      return;
    }

    // Здесь будет логика тестирования API
    toast({
      title: language === 'en' ? 'Testing API...' : 'Тестирование API...',
      description: language === 'en'
        ? 'Connection test in progress'
        : 'Выполняется тест подключения'
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Exchange API Configuration' : 'Настройка API Биржи'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exchange Selection */}
          <div className="space-y-2">
            <Label htmlFor="exchange">
              {language === 'en' ? 'Select Exchange' : 'Выберите Биржу'}
            </Label>
            <Select value={apiConfig.exchange} onValueChange={(value) => 
              setApiConfig(prev => ({ ...prev, exchange: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder={
                  language === 'en' ? 'Choose exchange...' : 'Выберите биржу...'
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binance">Binance</SelectItem>
                <SelectItem value="bybit">Bybit</SelectItem>
                <SelectItem value="okx">OKX</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">
              {language === 'en' ? 'API Key' : 'API Ключ'}
            </Label>
            <Input
              id="apiKey"
              type="text"
              placeholder={language === 'en' ? 'Enter your API key...' : 'Введите ваш API ключ...'}
              value={apiConfig.apiKey}
              onChange={(e) => setApiConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              className="font-mono"
            />
          </div>

          {/* API Secret */}
          <div className="space-y-2">
            <Label htmlFor="apiSecret">
              {language === 'en' ? 'API Secret' : 'API Секрет'}
            </Label>
            <div className="relative">
              <Input
                id="apiSecret"
                type={showApiSecret ? 'text' : 'password'}
                placeholder={language === 'en' ? 'Enter your API secret...' : 'Введите ваш API секрет...'}
                value={apiConfig.apiSecret}
                onChange={(e) => setApiConfig(prev => ({ ...prev, apiSecret: e.target.value }))}
                className="font-mono pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setShowApiSecret(!showApiSecret)}
              >
                {showApiSecret ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
            </div>
          </div>

          {/* Test Mode Toggle */}
          <div className="flex items-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <input
              type="checkbox"
              id="testMode"
              checked={apiConfig.testMode}
              onChange={(e) => setApiConfig(prev => ({ ...prev, testMode: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <Label htmlFor="testMode" className="text-blue-400 font-medium">
                {language === 'en' ? 'Test Mode (Recommended)' : 'Тестовый Режим (Рекомендуется)'}
              </Label>
              <p className="text-sm text-gray-400">
                {language === 'en'
                  ? 'Use testnet for safe testing without real funds'
                  : 'Используйте тестовую сеть для безопасного тестирования без реальных средств'
                }
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleTest} variant="outline" className="flex items-center gap-2">
              <TestTube size={16} />
              {language === 'en' ? 'Test Connection' : 'Тест Подключения'}
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              {language === 'en' ? 'Save Settings' : 'Сохранить Настройки'}
            </Button>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={() => setApiConfig({ exchange: '', apiKey: '', apiSecret: '', testMode: true })}
            >
              <Trash2 size={16} />
              {language === 'en' ? 'Clear' : 'Очистить'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-400">
            {language === 'en' ? 'Security Best Practices' : 'Лучшие Практики Безопасности'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <ul className="space-y-2">
            <li>• {language === 'en'
              ? 'Always start with test mode to verify functionality'
              : 'Всегда начинайте с тестового режима для проверки функциональности'
            }</li>
            <li>• {language === 'en'
              ? 'Set appropriate position size limits'
              : 'Установите подходящие лимиты размера позиций'
            }</li>
            <li>• {language === 'en'
              ? 'Monitor your account balance regularly'
              : 'Регулярно проверяйте баланс вашего счета'
            }</li>
            <li>• {language === 'en'
              ? 'Keep API keys secure and never share them'
              : 'Держите API ключи в безопасности и никогда не делитесь ими'
            }</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
