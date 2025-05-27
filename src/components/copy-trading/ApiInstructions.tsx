
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Shield, Key, AlertTriangle } from 'lucide-react';

export const ApiInstructions: React.FC = () => {
  const { language } = useLanguage();

  const exchanges = [
    {
      name: 'Binance',
      logo: '₿',
      steps: language === 'en' 
        ? [
          'Go to Binance Account → API Management',
          'Click "Create API" and enter label',
          'Enable "Spot & Margin Trading" permissions',
          'Set IP restrictions for security',
          'Save API Key and Secret Key'
        ]
        : [
          'Перейдите в Binance Аккаунт → Управление API',
          'Нажмите "Создать API" и введите название',
          'Включите разрешения "Спот и Маржинальная торговля"',
          'Установите IP ограничения для безопасности',
          'Сохраните API Key и Secret Key'
        ],
      url: 'https://www.binance.com/en/my/settings/api-management'
    },
    {
      name: 'Bybit',
      logo: '⚡',
      steps: language === 'en'
        ? [
          'Go to Bybit Account → API Management',
          'Click "Create New Key"',
          'Select "Trade" permissions',
          'Add IP whitelist for security',
          'Copy API Key and Secret'
        ]
        : [
          'Перейдите в Bybit Аккаунт → Управление API',
          'Нажмите "Создать новый ключ"',
          'Выберите разрешения "Торговля"',
          'Добавьте IP в белый список',
          'Скопируйте API Key и Secret'
        ],
      url: 'https://www.bybit.com/app/user/api-management'
    },
    {
      name: 'OKX',
      logo: '🟦',
      steps: language === 'en'
        ? [
          'Go to OKX Account → API Management',
          'Create new API key',
          'Set trading permissions',
          'Configure IP restrictions',
          'Save credentials securely'
        ]
        : [
          'Перейдите в OKX Аккаунт → Управление API',
          'Создайте новый API ключ',
          'Установите торговые разрешения',
          'Настройте IP ограничения',
          'Сохраните данные безопасно'
        ],
      url: 'https://www.okx.com/account/my-api'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Warning */}
      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle size={20} />
            {language === 'en' ? 'Security Warning' : 'Предупреждение о Безопасности'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <ul className="space-y-2">
            <li>• {language === 'en' 
              ? 'Never share your API keys with anyone'
              : 'Никогда не делитесь своими API ключами'
            }</li>
            <li>• {language === 'en'
              ? 'Always enable IP restrictions'
              : 'Всегда включайте IP ограничения'
            }</li>
            <li>• {language === 'en'
              ? 'Only enable necessary permissions'
              : 'Включайте только необходимые разрешения'
            }</li>
            <li>• {language === 'en'
              ? 'Monitor your API usage regularly'
              : 'Регулярно проверяйте использование API'
            }</li>
          </ul>
        </CardContent>
      </Card>

      {/* Exchange Instructions */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {exchanges.map((exchange) => (
          <Card key={exchange.name} className="glass-effect hover:border-neon-purple/30 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{exchange.logo}</div>
                  <CardTitle className="text-xl">{exchange.name}</CardTitle>
                </div>
                <Badge variant="outline" className="text-neon-blue border-neon-blue/30">
                  {language === 'en' ? 'Supported' : 'Поддерживается'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {exchange.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-neon-purple/20 text-neon-purple rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <a 
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors"
                >
                  <ExternalLink size={16} />
                  {language === 'en' ? 'Open API Management' : 'Открыть Управление API'}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Required Permissions */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            {language === 'en' ? 'Required Permissions' : 'Необходимые Разрешения'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-400">
                {language === 'en' ? '✅ Required' : '✅ Необходимо'}
              </h4>
              <ul className="space-y-1 text-gray-300">
                <li>• {language === 'en' ? 'Read Account Info' : 'Чтение информации аккаунта'}</li>
                <li>• {language === 'en' ? 'Spot Trading' : 'Спот торговля'}</li>
                <li>• {language === 'en' ? 'Future Trading' : 'Фьючерсная торговля'}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-400">
                {language === 'en' ? '❌ Not Required' : '❌ Не требуется'}
              </h4>
              <ul className="space-y-1 text-gray-300">
                <li>• {language === 'en' ? 'Withdraw' : 'Вывод средств'}</li>
                <li>• {language === 'en' ? 'Deposit' : 'Пополнение'}</li>
                <li>• {language === 'en' ? 'Transfer' : 'Переводы'}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
