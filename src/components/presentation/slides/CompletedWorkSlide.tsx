
import React from 'react';
import { CheckCircle, Code, Database, Smartphone, Globe } from 'lucide-react';

export const CompletedWorkSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4 animate-pulse-light">✅</div>
        <h1 className="text-4xl font-bold text-gradient mb-4">Что уже сделано</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Наша команда уже достигла значительных результатов в разработке платформы
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass-effect p-5 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
            <div className="flex items-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">MVP платформы</h3>
            </div>
            <p className="text-gray-300 mb-3 text-sm">Полнофункциональная версия с основными возможностями</p>
            <div className="space-y-1 text-xs text-gray-300">
              <p>• Регистрация и авторизация пользователей</p>
              <p>• Система рейтингов трейдеров</p>
              <p>• Базовый функционал копирования</p>
              <p>• Интерфейс управления портфелем</p>
            </div>
          </div>

          <div className="glass-effect p-5 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
            <div className="flex items-center mb-3">
              <Database className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Backend инфраструктура</h3>
            </div>
            <p className="text-gray-300 mb-3 text-sm">Надежная серверная архитектура</p>
            <div className="space-y-1 text-xs text-gray-300">
              <p>• API для всех функций платформы</p>
              <p>• База данных для хранения данных</p>
              <p>• Система безопасности</p>
              <p>• Мониторинг и логирование</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-effect p-5 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
            <div className="flex items-center mb-3">
              <Code className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Фронтенд приложение</h3>
            </div>
            <p className="text-gray-300 mb-3 text-sm">Современный и интуитивный интерфейс</p>
            <div className="space-y-1 text-xs text-gray-300">
              <p>• React-приложение с TypeScript</p>
              <p>• Адаптивный дизайн для всех устройств</p>
              <p>• Темная тема и современный UI</p>
              <p>• Оптимизация производительности</p>
            </div>
          </div>

          <div className="glass-effect p-5 rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
            <div className="flex items-center mb-3">
              <Globe className="w-6 h-6 text-orange-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Интеграции</h3>
            </div>
            <p className="text-gray-300 mb-3 text-sm">Подключение к внешним сервисам</p>
            <div className="space-y-1 text-xs text-gray-300">
              <p>• API криптобирж (Binance, Bybit)</p>
              <p>• Системы уведомлений</p>
              <p>• Аналитические сервисы</p>
              <p>• Платежные системы</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <div className="glass-effect p-3 rounded-xl border border-white/10 text-center">
          <div className="text-xl font-bold text-neon-green mb-1">15+</div>
          <p className="text-gray-300 text-xs">Активных пользователей</p>
        </div>
        <div className="glass-effect p-3 rounded-xl border border-white/10 text-center">
          <div className="text-xl font-bold text-neon-blue mb-1">2</div>
          <p className="text-gray-300 text-xs">Интегрированных бирж</p>
        </div>
        <div className="glass-effect p-3 rounded-xl border border-white/10 text-center">
          <div className="text-xl font-bold text-neon-purple mb-1">95%</div>
          <p className="text-gray-300 text-xs">Время работы</p>
        </div>
        <div className="glass-effect p-3 rounded-xl border border-white/10 text-center">
          <div className="text-xl font-bold text-neon-green mb-1">0.1s</div>
          <p className="text-gray-300 text-xs">Скорость выполнения</p>
        </div>
      </div>

      <div className="glass-effect p-6 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-xl font-bold text-white mb-3 text-center">Следующие этапы</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <Smartphone className="w-8 h-8 text-neon-blue mb-2 mx-auto" />
            <h4 className="text-sm font-semibold text-white mb-1">Мобильное приложение</h4>
            <p className="text-gray-300 text-xs">iOS и Android версии</p>
          </div>
          <div>
            <Globe className="w-8 h-8 text-neon-green mb-2 mx-auto" />
            <h4 className="text-sm font-semibold text-white mb-1">Социальные функции</h4>
            <p className="text-gray-300 text-xs">Чаты, комментарии, лайки</p>
          </div>
          <div>
            <Database className="w-8 h-8 text-neon-purple mb-2 mx-auto" />
            <h4 className="text-sm font-semibold text-white mb-1">Расширенная аналитика</h4>
            <p className="text-gray-300 text-xs">ИИ-анализ и прогнозы</p>
          </div>
        </div>
      </div>
    </div>
  );
};
