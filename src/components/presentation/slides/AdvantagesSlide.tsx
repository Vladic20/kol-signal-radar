
import React from 'react';
import { Zap, Shield, Users, BarChart3, Globe, Smartphone } from 'lucide-react';

export const AdvantagesSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">⚡</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Преимущества проекта</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Наши конкурентные преимущества делают платформу уникальной на рынке копитрейдинга
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300 hover:scale-105">
          <Zap className="w-16 h-16 text-neon-blue mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Мгновенное исполнение</h3>
          <p className="text-gray-300 text-sm">Латентность менее 100мс для копирования сделок благодаря прямым API подключениям</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300 hover:scale-105">
          <Shield className="w-16 h-16 text-neon-green mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Максимальная безопасность</h3>
          <p className="text-gray-300 text-sm">Средства не покидают ваш аккаунт на бирже, мы только копируем сделки</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300 hover:scale-105">
          <Users className="w-16 h-16 text-neon-purple mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Социальная торговля</h3>
          <p className="text-gray-300 text-sm">Уникальная социальная платформа с обсуждениями, рейтингами и комьюнити</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105">
          <BarChart3 className="w-16 h-16 text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Продвинутая аналитика</h3>
          <p className="text-gray-300 text-sm">ИИ-анализ трейдеров, риск-менеджмент и персонализированные рекомендации</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300 hover:scale-105">
          <Globe className="w-16 h-16 text-neon-blue mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Мультибиржевость</h3>
          <p className="text-gray-300 text-sm">Поддержка всех популярных криптобирж в одном интерфейсе</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300 hover:scale-105">
          <Smartphone className="w-16 h-16 text-neon-green mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Мобильная оптимизация</h3>
          <p className="text-gray-300 text-sm">Полнофункциональное мобильное приложение для торговли в движении</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-effect p-8 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
          <h3 className="text-2xl font-semibold text-white mb-6">Технические преимущества</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Микросервисная архитектура для высокой надежности</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Горизонтальное масштабирование для роста нагрузки</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Резервное копирование и disaster recovery</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Мониторинг в реальном времени 24/7</p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <h3 className="text-2xl font-semibold text-white mb-6">Бизнес преимущества</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Низкие операционные расходы благодаря автоматизации</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Быстрый выход на международные рынки</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Сетевой эффект увеличивает ценность платформы</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Множественные источники монетизации</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Сравнение с конкурентами</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 text-white">Функция</th>
                <th className="text-center py-3 text-neon-green">Наша платформа</th>
                <th className="text-center py-3 text-gray-400">Конкурент A</th>
                <th className="text-center py-3 text-gray-400">Конкурент B</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 text-gray-300">Социальные функции</td>
                <td className="text-center py-3 text-neon-green">✓</td>
                <td className="text-center py-3 text-red-400">✗</td>
                <td className="text-center py-3 text-yellow-400">Частично</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-gray-300">Мультибиржевость</td>
                <td className="text-center py-3 text-neon-green">✓</td>
                <td className="text-center py-3 text-yellow-400">Частично</td>
                <td className="text-center py-3 text-red-400">✗</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-gray-300">ИИ-аналитика</td>
                <td className="text-center py-3 text-neon-green">✓</td>
                <td className="text-center py-3 text-red-400">✗</td>
                <td className="text-center py-3 text-red-400">✗</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300">Низкие комиссии</td>
                <td className="text-center py-3 text-neon-green">0.1%</td>
                <td className="text-center py-3 text-gray-400">0.5%</td>
                <td className="text-center py-3 text-gray-400">1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
