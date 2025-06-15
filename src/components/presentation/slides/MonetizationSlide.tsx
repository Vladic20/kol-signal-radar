
import React from 'react';
import { DollarSign, Percent, Users, TrendingUp } from 'lucide-react';

export const MonetizationSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">💰</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Монетизация</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Многоуровневая модель монетизации обеспечивает стабильный доход для всех участников экосистемы
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-effect p-8 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="flex items-center mb-6">
            <Percent className="w-12 h-12 text-green-400 mr-4" />
            <h3 className="text-2xl font-semibold text-white">Комиссии с торгов</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
              <span className="text-gray-300">Копирование сделок</span>
              <span className="text-green-400 font-semibold">0.1% - 0.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
              <span className="text-gray-300">Профит-шеринг</span>
              <span className="text-green-400 font-semibold">10% - 30%</span>
            </div>
            <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
              <span className="text-gray-300">Премиум подписки</span>
              <span className="text-green-400 font-semibold">$29 - $99/мес</span>
            </div>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center mb-6">
            <Users className="w-12 h-12 text-blue-400 mr-4" />
            <h3 className="text-2xl font-semibold text-white">Дополнительные услуги</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
              <span className="text-gray-300">Аналитика и сигналы</span>
              <span className="text-blue-400 font-semibold">$19 - $49/мес</span>
            </div>
            <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
              <span className="text-gray-300">Личный менеджер</span>
              <span className="text-blue-400 font-semibold">$199+/мес</span>
            </div>
            <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
              <span className="text-gray-300">API доступ</span>
              <span className="text-blue-400 font-semibold">$99/мес</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-white/10 text-center">
          <DollarSign className="w-12 h-12 text-neon-green mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-white mb-2">Freemium модель</h4>
          <p className="text-gray-300 text-sm">Базовые функции бесплатно, продвинутые — по подписке</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 text-center">
          <TrendingUp className="w-12 h-12 text-neon-blue mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-white mb-2">Performance fees</h4>
          <p className="text-gray-300 text-sm">Комиссия с прибыли успешных трейдеров</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 text-center">
          <Users className="w-12 h-12 text-neon-purple mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-white mb-2">Реферальная программа</h4>
          <p className="text-gray-300 text-sm">Вознаграждение за привлечение новых пользователей</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 text-center">
          <Percent className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-white mb-2">Партнерские программы</h4>
          <p className="text-gray-300 text-sm">Интеграции с биржами и финансовыми сервисами</p>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Прогноз доходов</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green mb-2">$50K</div>
            <p className="text-gray-300 mb-2">Месяц 6</p>
            <div className="text-sm text-gray-400">
              <p>1,000 пользователей</p>
              <p>$50 ARPU</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue mb-2">$500K</div>
            <p className="text-gray-300 mb-2">Год 1</p>
            <div className="text-sm text-gray-400">
              <p>10,000 пользователей</p>
              <p>$50 ARPU</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple mb-2">$2M</div>
            <p className="text-gray-300 mb-2">Год 2</p>
            <div className="text-sm text-gray-400">
              <p>25,000 пользователей</p>
              <p>$80 ARPU</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-300">* ARPU - Average Revenue Per User</p>
        </div>
      </div>
    </div>
  );
};
