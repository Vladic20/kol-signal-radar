
import React from 'react';
import { Link, Zap, Shield, BarChart3 } from 'lucide-react';

export const IntegrationsSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">🔗</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Интеграции</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Мы интегрированы с ведущими криптобиржами и сервисами для обеспечения лучшего опыта торговли
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="glass-effect p-8 rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-yellow-400 mb-2">BINANCE</div>
            <p className="text-gray-300">Крупнейшая криптобиржа в мире</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Мгновенное исполнение ордеров</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Максимальная ликвидность</span>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">500+ торговых пар</span>
            </div>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-orange-400 mb-2">BYBIT</div>
            <p className="text-gray-300">Лидер деривативной торговли</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Высокое кредитное плечо</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Продвинутые инструменты</span>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Низкие комиссии</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300">
          <Link className="w-12 h-12 text-neon-blue mb-4 mx-auto block" />
          <h3 className="text-lg font-semibold text-white mb-3 text-center">OKX Exchange</h3>
          <p className="text-gray-300 text-sm text-center">Глобальная криптобиржа с широким выбором инструментов</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300">
          <BarChart3 className="w-12 h-12 text-neon-green mb-4 mx-auto block" />
          <h3 className="text-lg font-semibold text-white mb-3 text-center">TradingView</h3>
          <p className="text-gray-300 text-sm text-center">Профессиональные графики и технический анализ</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
          <Shield className="w-12 h-12 text-neon-purple mb-4 mx-auto block" />
          <h3 className="text-lg font-semibold text-white mb-3 text-center">CoinGecko API</h3>
          <p className="text-gray-300 text-sm text-center">Актуальные данные о ценах и рыночной капитализации</p>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Технические особенности интеграций</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">API подключения</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                <span className="text-gray-300">REST API для основных операций</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                <span className="text-gray-300">WebSocket для real-time данных</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                <span className="text-gray-300">Автоматическое переподключение</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Безопасность</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                <span className="text-gray-300">Шифрование всех API ключей</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                <span className="text-gray-300">Ограничения по IP адресам</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                <span className="text-gray-300">Двухфакторная аутентификация</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full border border-neon-purple/30">
          <span className="text-white font-medium">Планируется добавить: Kraken, Huobi, Gate.io</span>
        </div>
      </div>
    </div>
  );
};
