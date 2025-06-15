import React from 'react';
import { DollarSign, Percent, Users, TrendingUp } from 'lucide-react';
export const MonetizationSlide: React.FC = () => {
  return <div className="w-full max-w-6xl mx-auto space-y-6 max-h-screen overflow-hidden">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-pulse-light">💰</div>
        <h1 className="text-4xl font-bold text-gradient mb-4">Монетизация</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Многоуровневая модель монетизации обеспечивает стабильный доход для всех участников экосистемы
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="flex items-center mb-4">
            <Percent className="w-10 h-10 text-green-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Комиссии с торгов</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 glass-effect rounded-lg">
              <span className="text-gray-300 text-sm">Копирование сделок</span>
              <span className="text-green-400 font-semibold">0.1% - 0.5%</span>
            </div>
            <div className="flex justify-between items-center p-2 glass-effect rounded-lg">
              <span className="text-gray-300 text-sm">Премиум подписки</span>
              <span className="text-green-400 font-semibold">$29/мес</span>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center mb-4">
            <Users className="w-10 h-10 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Дополнительные услуги</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 glass-effect rounded-lg">
              <span className="text-gray-300 text-sm">Аналитика и сигналы</span>
              <span className="text-blue-400 font-semibold">$19 - $49/мес</span>
            </div>
            <div className="flex justify-between items-center p-2 glass-effect rounded-lg">
              <span className="text-gray-300 text-sm">Премиум-продвижение профиля</span>
              <span className="text-blue-400 font-semibold">от $59/мес</span>
            </div>
            <div className="flex justify-between items-center p-2 glass-effect rounded-lg">
              <span className="text-gray-300 text-sm">Баннерная реклама</span>
              <span className="text-blue-400 font-semibold">$1,000–5,000/мес</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <DollarSign className="w-10 h-10 text-neon-green mb-3 mx-auto" />
          <h4 className="text-base font-semibold text-white mb-2">Freemium модель</h4>
          
          <p className="text-gray-300 text-xs">Бесплатный доступ к базовым сигналам, премиум-функции по подписке</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <TrendingUp className="w-10 h-10 text-neon-blue mb-3 mx-auto" />
          <h4 className="text-base font-semibold text-white mb-2">Performance fees</h4>
          <p className="text-gray-300 text-xs">Комиссия с прибыли успешных трейдеров</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <Users className="w-10 h-10 text-neon-purple mb-3 mx-auto" />
          <h4 className="text-base font-semibold text-white mb-2">Реферальная программа</h4>
          <p className="text-gray-300 text-xs">Вознаграждение за привлечение новых пользователей</p>
        </div>

        <div className="glass-effect p-4 rounded-xl border border-white/10 text-center">
          <Percent className="w-10 h-10 text-yellow-400 mb-3 mx-auto" />
          <h4 className="text-base font-semibold text-white mb-2">Партнерские программы</h4>
          <p className="text-gray-300 text-xs">Интеграции с биржами и финансовыми сервисами</p>
        </div>
      </div>
    </div>;
};