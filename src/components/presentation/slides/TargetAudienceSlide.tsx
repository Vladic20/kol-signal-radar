
import React from 'react';
import { User, Briefcase, GraduationCap, Smartphone } from 'lucide-react';

export const TargetAudienceSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">🎯</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Целевая аудитория</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Наша платформа создана для широкого круга пользователей криптовалютного рынка
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300 hover:scale-105">
          <GraduationCap className="w-16 h-16 text-neon-blue mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-white mb-3 text-center">Новички</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Только начинают торговать</p>
            <p>• Хотят учиться у профи</p>
            <p>• Минимизировать риски</p>
            <p>• Получить первый опыт</p>
          </div>
          <div className="mt-4 text-center">
            <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm">40% аудитории</span>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300 hover:scale-105">
          <User className="w-16 h-16 text-neon-green mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-white mb-3 text-center">Любители</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Торгуют в свободное время</p>
            <p>• Хотят пассивный доход</p>
            <p>• Ищут проверенные стратегии</p>
            <p>• Небольшой капитал</p>
          </div>
          <div className="mt-4 text-center">
            <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-sm">35% аудитории</span>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300 hover:scale-105">
          <Briefcase className="w-16 h-16 text-neon-purple mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-white mb-3 text-center">Профессионалы</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Опытные трейдеры</p>
            <p>• Хотят делиться стратегиями</p>
            <p>• Зарабатывать на подписчиках</p>
            <p>• Строить репутацию</p>
          </div>
          <div className="mt-4 text-center">
            <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm">20% аудитории</span>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105">
          <Smartphone className="w-16 h-16 text-yellow-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-white mb-3 text-center">Мобильные пользователи</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Торгуют с телефона</p>
            <p>• Быстрые решения</p>
            <p>• Социальное взаимодействие</p>
            <p>• Молодая аудитория</p>
          </div>
          <div className="mt-4 text-center">
            <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">5% аудитории</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Демография</h4>
          <div className="space-y-2 text-gray-300">
            <p>• Возраст: 25-45 лет</p>
            <p>• Доход: средний и выше среднего</p>
            <p>• Образование: высшее</p>
            <p>• География: глобальная</p>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Потребности</h4>
          <div className="space-y-2 text-gray-300">
            <p>• Простота использования</p>
            <p>• Прозрачность операций</p>
            <p>• Минимальные комиссии</p>
            <p>• Обучающие материалы</p>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Поведение</h4>
          <div className="space-y-2 text-gray-300">
            <p>• Активны в соцсетях</p>
            <p>• Ищут сообщества</p>
            <p>• Доверяют отзывам</p>
            <p>• Мобильные устройства</p>
          </div>
        </div>
      </div>
    </div>
  );
};
