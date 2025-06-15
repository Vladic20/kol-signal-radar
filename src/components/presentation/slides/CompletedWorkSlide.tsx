import React from 'react';
import { CheckCircle, Code, Database, Smartphone, Globe } from 'lucide-react';
export const CompletedWorkSlide: React.FC = () => {
  return <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">✅</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Что уже сделано</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Наша команда уже достигла значительных результатов в разработке платформы
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-effect p-6 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">MVP платформы</h3>
            </div>
            <p className="text-gray-300 mb-4">Полнофункциональная версия с основными возможностями</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Регистрация и авторизация пользователей</p>
              <p>• Система рейтингов трейдеров</p>
              <p>• Базовый функционал копирования</p>
              <p>• Интерфейс управления портфелем</p>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Backend инфраструктура</h3>
            </div>
            <p className="text-gray-300 mb-4">Надежная серверная архитектура</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• API для всех функций платформы</p>
              <p>• База данных для хранения данных</p>
              <p>• Система безопасности</p>
              <p>• Мониторинг и логирование</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-effect p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Фронтенд приложение</h3>
            </div>
            <p className="text-gray-300 mb-4">Современный и интуитивный интерфейс</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• React-приложение с TypeScript</p>
              <p>• Адаптивный дизайн для всех устройств</p>
              <p>• Темная тема и современный UI</p>
              <p>• Оптимизация производительности</p>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-orange-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Интеграции</h3>
            </div>
            <p className="text-gray-300 mb-4">Подключение к внешним сервисам</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• API криптобирж (Binance, Bybit)</p>
              <p>• Системы уведомлений</p>
              <p>• Аналитические сервисы</p>
              <p>• Платежные системы</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-neon-green mb-2">15+</div>
          <p className="text-gray-300 text-sm">Активных пользователей</p>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-neon-blue mb-2">2</div>
          <p className="text-gray-300 text-sm">Интегрированных биржи</p>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-neon-purple mb-2">95%</div>
          <p className="text-gray-300 text-sm">Время работы</p>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-neon-green mb-2">0.1s</div>
          <p className="text-gray-300 text-sm">Скорость выполнения</p>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Следующие этапы</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Smartphone className="w-12 h-12 text-neon-blue mb-3 mx-auto" />
            <h4 className="text-lg font-semibold text-white mb-2">Мобильное приложение</h4>
            <p className="text-gray-300 text-sm">iOS и Android версии</p>
          </div>
          <div>
            <Globe className="w-12 h-12 text-neon-green mb-3 mx-auto" />
            <h4 className="text-lg font-semibold text-white mb-2">Социальные функции</h4>
            <p className="text-gray-300 text-sm">Чаты, комментарии, лайки</p>
          </div>
          <div>
            <Database className="w-12 h-12 text-neon-purple mb-3 mx-auto" />
            <h4 className="text-lg font-semibold text-white mb-2">Расширенная аналитика</h4>
            <p className="text-gray-300 text-sm">ИИ-анализ и прогнозы</p>
          </div>
        </div>
      </div>
    </div>;
};