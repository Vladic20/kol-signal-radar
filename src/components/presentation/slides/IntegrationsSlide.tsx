
import React from 'react';
import { Link, Zap, Shield, BarChart3 } from 'lucide-react';

export const IntegrationsSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 max-h-screen overflow-hidden">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-pulse-light">🔗</div>
        <h1 className="text-4xl font-bold text-gradient mb-4">Интеграции</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Мы интегрированы с ведущими криптобиржами для обеспечения лучшего опыта торговли
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="glass-effect p-6 rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-yellow-400 mb-2">BINANCE</div>
            <p className="text-gray-300 text-sm">Крупнейшая криптобиржа в мире</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">Мгновенное исполнение ордеров</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">Максимальная ликвидность</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">500+ торговых пар</span>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-orange-400 mb-2">BYBIT</div>
            <p className="text-gray-300 text-sm">Лидер деривативной торговли</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-gray-300 text-sm">Высокое кредитное плечо</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-orange-400" />
              <span className="text-gray-300 text-sm">Продвинутые инструменты</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span className="text-gray-300 text-sm">Низкие комиссии</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-effect p-5 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300">
          <BarChart3 className="w-10 h-10 text-neon-green mb-3 mx-auto block" />
          <h3 className="text-base font-semibold text-white mb-2 text-center">TradingView</h3>
          <p className="text-gray-300 text-sm text-center">Профессиональные графики и технический анализ</p>
        </div>

        <div className="glass-effect p-5 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
          <Shield className="w-10 h-10 text-neon-purple mb-3 mx-auto block" />
          <h3 className="text-base font-semibold text-white mb-2 text-center">CoinGecko API</h3>
          <p className="text-gray-300 text-sm text-center">Актуальные данные о ценах и рыночной капитализации</p>
        </div>
      </div>

      <div className="glass-effect p-5 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Технические особенности интеграций</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-semibold text-white mb-3">API подключения</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                <span className="text-gray-300 text-sm">REST API для основных операций</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                <span className="text-gray-300 text-sm">WebSocket для real-time данных</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-3">Безопасность</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                <span className="text-gray-300 text-sm">Шифрование всех API ключей</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                <span className="text-gray-300 text-sm">Двухфакторная аутентификация</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full border border-neon-purple/30">
          <span className="text-white font-medium text-sm">Планируется добавить: Kraken, Huobi, Gate.io, OKX, KuCoin, Bitget</span>
        </div>
      </div>
    </div>
  );
};
