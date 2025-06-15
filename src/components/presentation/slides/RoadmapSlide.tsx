
import React from 'react';
import { Calendar, CheckCircle, Clock, Star } from 'lucide-react';

export const RoadmapSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">🗺️</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Roadmap</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Пошаговый план развития платформы на ближайшие 18 месяцев
        </p>
      </div>

      <div className="space-y-8">
        {/* Q2 2024 - Completed */}
        <div className="glass-effect p-8 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-400 mr-4" />
            <div>
              <h3 className="text-2xl font-semibold text-white">Q2 2024 - Завершено</h3>
              <p className="text-green-400">MVP и базовая функциональность</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Разработка MVP платформы</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Интеграция с Binance и Bybit</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Система рейтингов трейдеров</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Базовое копирование сделок</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Первые 15+ пользователей</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Тестирование и оптимизация</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q3 2024 - In Progress */}
        <div className="glass-effect p-8 rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <div className="flex items-center mb-6">
            <Clock className="w-12 h-12 text-yellow-400 mr-4" />
            <div>
              <h3 className="text-2xl font-semibold text-white">Q3 2024 - В процессе</h3>
              <p className="text-yellow-400">Социальные функции и масштабирование</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Система лайков и комментариев</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Фолловинг трейдеров</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Торговые баттлы</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Мобильное приложение (iOS/Android)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Расширенная аналитика</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">1,000+ активных пользователей</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q4 2024 - Planned */}
        <div className="glass-effect p-8 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center mb-6">
            <Calendar className="w-12 h-12 text-blue-400 mr-4" />
            <div>
              <h3 className="text-2xl font-semibold text-white">Q4 2024 - Запланировано</h3>
              <p className="text-blue-400">ИИ и международная экспансия</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">ИИ-анализ трейдеров</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Персонализированные рекомендации</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Автоматический риск-менеджмент</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Интеграция с OKX, Kraken</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Многоязычная поддержка</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">10,000+ пользователей</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q1-Q2 2025 - Future */}
        <div className="glass-effect p-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
          <div className="flex items-center mb-6">
            <Star className="w-12 h-12 text-purple-400 mr-4" />
            <div>
              <h3 className="text-2xl font-semibold text-white">Q1-Q2 2025 - Будущее</h3>
              <p className="text-purple-400">Токенизация и DeFi интеграция</p>
            </div>
          </div>
          <div className="grid m

-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Запуск собственного токена</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Трейдер DAO</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">DeFi протоколы</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">NFT коллекции трейдеров</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Стейкинг и yield farming</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">100,000+ пользователей</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Ключевые метрики по этапам</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">15+</div>
            <p className="text-gray-300 text-sm">Пользователи Q2 2024</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">1K</div>
            <p className="text-gray-300 text-sm">Пользователи Q3 2024</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">10K</div>
            <p className="text-gray-300 text-sm">Пользователи Q4 2024</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">100K</div>
            <p className="text-gray-300 text-sm">Пользователи 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};
