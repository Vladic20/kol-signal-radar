
import React from 'react';
import { Calendar, CheckCircle, Clock, Star } from 'lucide-react';

export const RoadmapSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 max-h-screen overflow-hidden">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-pulse-light">🗺️</div>
        <h1 className="text-4xl font-bold text-gradient mb-4">Roadmap</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Пошаговый план развития платформы на ближайшие 18 месяцев
        </p>
      </div>

      <div className="space-y-6">
        {/* Q2 2025 - Completed */}
        <div className="glass-effect p-6 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-400 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Q2 2025 - Завершено</h3>
              <p className="text-green-400 text-sm">MVP и базовая функциональность</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Разработка MVP платформы</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Интеграция с Binance и Bybit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Система рейтингов трейдеров</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Базовое копирование сделок</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Первые 15+ пользователей</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Тестирование и оптимизация</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q3 2025 - In Progress */}
        <div className="glass-effect p-6 rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <div className="flex items-center mb-4">
            <Clock className="w-10 h-10 text-yellow-400 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Q3 2025 - В процессе</h3>
              <p className="text-yellow-400 text-sm">Социальные функции и масштабирование</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Система лайков и комментариев</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Фолловинг трейдеров</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Торговые баттлы</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Мобильное приложение (iOS/Android)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Расширенная аналитика</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">1,000+ активных пользователей</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q4 2025 - Planned */}
        <div className="glass-effect p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center mb-4">
            <Calendar className="w-10 h-10 text-blue-400 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Q4 2025 - Запланировано</h3>
              <p className="text-blue-400 text-sm">ИИ и международная экспансия</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">ИИ-анализ трейдеров</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Персонализированные рекомендации</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Автоматический риск-менеджмент</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Интеграция с OKX, Kraken</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Многоязычная поддержка</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">10,000+ пользователей</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q1-Q2 2026 - Future */}
        <div className="glass-effect p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
          <div className="flex items-center mb-4">
            <Star className="w-10 h-10 text-purple-400 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Q1-Q2 2026 - Будущее</h3>
              <p className="text-purple-400 text-sm">Токенизация и DeFi интеграция</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">Запуск собственного токена</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">Трейдер DAO</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">DeFi протоколы</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">NFT коллекции трейдеров</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">Стейкинг и yield farming</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">100,000+ пользователей</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect p-5 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Финансовые метрики по месяцам</h3>
        <div className="grid grid-cols-6 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400 mb-1">$548</div>
            <p className="text-gray-300 text-xs">Июль</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400 mb-1">$1,095</div>
            <p className="text-gray-300 text-xs">Август</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400 mb-1">$3,190</div>
            <p className="text-gray-300 text-xs">Сентябрь</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400 mb-1">$4,650</div>
            <p className="text-gray-300 text-xs">Октябрь</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-pink-400 mb-1">$9,030</div>
            <p className="text-gray-300 text-xs">Декабрь</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400 mb-1">$22,900</div>
            <p className="text-gray-300 text-xs">Июнь</p>
          </div>
        </div>
      </div>
    </div>
  );
};
