
import React from 'react';
import { Zap, Shield, Users, BarChart3, Globe, Smartphone, TrendingUp, DollarSign } from 'lucide-react';

export const AdvantagesSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4 animate-pulse-light">⚡</div>
        <h1 className="text-4xl font-bold text-gradient mb-4">Преимущества проекта</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Наши конкурентные преимущества делают платформу уникальной на рынке копитрейдинга
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-effect p-4 rounded-xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300 hover:scale-105">
          <Zap className="w-12 h-12 text-neon-blue mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Мгновенное исполнение</h3>
          <p className="text-gray-300 text-sm">Латентность менее 100мс для копирования сделок благодаря прямым API подключениям</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300 hover:scale-105">
          <Shield className="w-12 h-12 text-neon-green mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Максимальная безопасность</h3>
          <p className="text-gray-300 text-sm">Средства не покидают ваш аккаунт на бирже, мы только копируем сделки</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300 hover:scale-105">
          <Users className="w-12 h-12 text-neon-purple mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Социальная торговля</h3>
          <p className="text-gray-300 text-sm">Уникальная социальная платформа с обсуждениями, рейтингами и комьюнити</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105">
          <BarChart3 className="w-12 h-12 text-yellow-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Продвинутая аналитика</h3>
          <p className="text-gray-300 text-sm">ИИ-анализ трейдеров, риск-менеджмент и персонализированные рекомендации</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300 hover:scale-105">
          <Globe className="w-12 h-12 text-neon-blue mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Мультибиржевость</h3>
          <p className="text-gray-300 text-sm">Поддержка всех популярных криптобирж в одном интерфейсе</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300 hover:scale-105">
          <Smartphone className="w-12 h-12 text-neon-green mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Мобильная оптимизация</h3>
          <p className="text-gray-300 text-sm">Полнофункциональное мобильное приложение для торговли в движении</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
          <h3 className="text-xl font-semibold text-white mb-4">Технические преимущества</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Микросервисная архитектура для высокой надежности</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Горизонтальное масштабирование для роста нагрузки</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Резервное копирование и disaster recovery</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Мониторинг в реальном времени 24/7</p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <h3 className="text-xl font-semibold text-white mb-4">Бизнес преимущества</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Низкие операционные расходы благодаря автоматизации</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Быстрый выход на международные рынки</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Сетевой эффект увеличивает ценность платформы</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">Множественные источники монетизации</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect p-6 rounded-xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">Ключевые показатели</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-neon-green mb-2 mx-auto" />
            <div className="text-2xl font-bold text-neon-green mb-1">95%+</div>
            <p className="text-gray-300 text-sm">Точность копирования</p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-neon-blue mb-2 mx-auto" />
            <div className="text-2xl font-bold text-neon-blue mb-1">&lt;100ms</div>
            <p className="text-gray-300 text-sm">Задержка исполнения</p>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-neon-purple mb-2 mx-auto" />
            <div className="text-2xl font-bold text-neon-purple mb-1">100%</div>
            <p className="text-gray-300 text-sm">Безопасность средств</p>
          </div>
          <div className="text-center">
            <DollarSign className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
            <div className="text-2xl font-bold text-yellow-400 mb-1">0.1%</div>
            <p className="text-gray-300 text-sm">Минимальная комиссия</p>
          </div>
        </div>
      </div>
    </div>
  );
};
