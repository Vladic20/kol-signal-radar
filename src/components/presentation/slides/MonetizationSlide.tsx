
import React from "react";
import {
  Percent,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export const MonetizationSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <span className="text-5xl drop-shadow-glow animate-pulse-light">💰</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent mb-2">
          Монетизация
        </h1>
        <div className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-2">
          Многоуровневая модель монетизации обеспечивает стабильный доход для всех участников экосистемы
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0">
        {/* Комиссии с торгов */}
        <div className="rounded-2xl border border-green-500/40 bg-gradient-to-br from-green-800/25 via-green-700/10 to-transparent shadow-lg p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Percent className="w-8 h-8 text-neon-green drop-shadow" />
            <h3 className="text-2xl font-semibold text-neon-green">Комиссии с торгов</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-transparent border border-green-600/20">
              <span className="text-gray-200 text-base">Копирование сделок</span>
              <span className="text-neon-green font-semibold">0.1% - 0.5%</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gradient-to-r from-green-400/10 to-transparent border border-green-600/20">
              <span className="text-gray-200 text-base">Профитшеринг</span>
              <span className="text-neon-green font-semibold">10% - 30%</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gradient-to-r from-green-400/10 to-transparent border border-green-600/20">
              <span className="text-gray-200 text-base">Премиум подписки</span>
              <span className="text-neon-green font-semibold">$29 – $99/мес</span>
            </div>
          </div>
        </div>
        {/* Дополнительные услуги */}
        <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-800/25 via-blue-700/10 to-transparent shadow-lg p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-8 h-8 text-neon-blue drop-shadow" />
            <h3 className="text-2xl font-semibold text-neon-blue">Дополнительные услуги</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-600/20">
              <span className="text-gray-200 text-base">Аналитика и сигналы</span>
              <span className="text-neon-blue font-semibold">$19 – $49/мес</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400/10 to-transparent border border-blue-600/20">
              <span className="text-gray-200 text-base">Личный менеджер</span>
              <span className="text-neon-blue font-semibold">$199+/мес</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400/10 to-transparent border border-blue-600/20">
              <span className="text-gray-200 text-base">API доступ</span>
              <span className="text-neon-blue font-semibold">$99/мес</span>
            </div>
          </div>
        </div>
      </div>

      {/* Модели */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Freemium */}
        <div className="bg-black/80 glass-effect border border-white/10 rounded-2xl text-center shadow-md p-5 flex flex-col items-center">
          <DollarSign className="text-neon-green w-9 h-9 mb-2" />
          <div className="text-lg font-semibold text-white mb-1">Freemium модель</div>
          <div className="text-xs text-gray-300">Базовые функции бесплатно, продвинутые — по подписке</div>
        </div>
        {/* Performance fees */}
        <div className="bg-black/80 glass-effect border border-white/10 rounded-2xl text-center shadow-md p-5 flex flex-col items-center">
          <TrendingUp className="text-neon-blue w-9 h-9 mb-2" />
          <div className="text-lg font-semibold text-white mb-1">Performance fees</div>
          <div className="text-xs text-gray-300">Комиссия с прибыли успешных трейдеров</div>
        </div>
        {/* Referral */}
        <div className="bg-black/80 glass-effect border border-white/10 rounded-2xl text-center shadow-md p-5 flex flex-col items-center">
          <Users className="text-neon-purple w-9 h-9 mb-2" />
          <div className="text-lg font-semibold text-white mb-1">Реферальная программа</div>
          <div className="text-xs text-gray-300">Вознаграждение за привлечение новых пользователей</div>
        </div>
        {/* Partner */}
        <div className="bg-black/80 glass-effect border border-white/10 rounded-2xl text-center shadow-md p-5 flex flex-col items-center">
          <Percent className="text-yellow-400 w-9 h-9 mb-2" />
          <div className="text-lg font-semibold text-white mb-1">Партнерские программы</div>
          <div className="text-xs text-gray-300">Интеграции с биржами и финансовыми сервисами</div>
        </div>
      </div>
      {/* Прогноз доходов */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-700/20 via-purple-900/10 to-black/10 p-7 shadow-xl text-center max-w-4xl mx-auto">
        <div className="text-2xl md:text-3xl font-semibold text-white mb-6 tracking-tight">Прогноз доходов</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-2">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-neon-green mb-1">$50K</div>
            <div className="text-base text-gray-200 mb-1">Месяц 6</div>
            <div className="text-xs text-gray-400">1,000 пользователей<br />$50 ARPU</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-neon-blue mb-1">$500K</div>
            <div className="text-base text-gray-200 mb-1">Год 1</div>
            <div className="text-xs text-gray-400">10,000 пользователей<br />$50 ARPU</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-neon-purple mb-1">$2M</div>
            <div className="text-base text-gray-200 mb-1">Год 2</div>
            <div className="text-xs text-gray-400">25,000 пользователей<br />$80 ARPU</div>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xs text-gray-500">* ARPU – Average Revenue Per User</span>
        </div>
      </div>
      {/* Слайд номер */}
      <div className="text-center pt-3">
        <span className="text-sm text-gray-400">Слайд 8 из 13</span>
      </div>
    </div>
  );
};
