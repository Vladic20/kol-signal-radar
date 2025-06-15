
import React from "react";
import {
  Crown,
  Building2,
  Percent,
  Megaphone,
  UserCheck2,
  BadgePercent,
} from "lucide-react";

export const MonetizationSlide: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Заголовок */}
      <div className="text-center">
        <div className="flex justify-center mb-1">
          <span className="text-5xl drop-shadow-glow" style={{ color: "#FFA726" }}>
            <DollarIcon />
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          Монетизация
        </h1>
        <div className="mx-auto border-b-[3px] border-yellow-500 w-44 mb-5 opacity-60"></div>
        <div className="bg-[#252737]/80 border border-[#65686E] rounded-xl px-5 py-3 text-lg md:text-2xl font-semibold text-white max-w-2xl mx-auto mb-2">
          Модель Freemium + White-label + реклама
          <div className="text-base font-normal text-slate-300 mt-2 tracking-normal">
            Диверсифицированные источники дохода
          </div>
        </div>
      </div>

      {/* Карточки */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Premium-подписка */}
        <div className="bg-[#19223C] border border-[#40455a] rounded-xl shadow-xl p-6 flex flex-col min-h-[210px] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            <div className="font-semibold text-white text-lg">Premium-подписка</div>
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">$29/мес</div>
          <div className="text-xs py-1 px-2 rounded-lg bg-yellow-500/10 text-yellow-300 w-max mb-2">
            Бесплатный доступ с ограничениями
          </div>
          <div className="text-gray-200 text-base mb-2">
            Бесплатный доступ к базовым сигналам, премиум-функции по подписке
          </div>
          <ul className="list-disc text-gray-300 ml-5 mt-1 text-sm leading-relaxed space-y-0.5">
            <li>Детальные профили KOL</li>
            <li>Расширенная аналитика</li>
            <li>Приоритетные уведомления</li>
          </ul>
        </div>
        {/* White-label для фондов */}
        <div className="bg-[#202541] border border-blue-700/40 rounded-xl shadow-xl p-6 flex flex-col min-h-[210px] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            <div className="font-semibold text-white text-lg">White-label для&nbsp;фондов</div>
          </div>
          <div className="text-2xl font-bold text-blue-300 mb-1">$2,000+/мес</div>
          <div className="text-gray-200 text-base mb-2">
            Корпоративные решения с брендингом
          </div>
          <ul className="list-disc text-gray-300 ml-5 mt-1 text-sm leading-relaxed space-y-0.5">
            <li>Кастомизация интерфейса</li>
            <li>Собственный брендинг</li>
            <li>Техническая поддержка</li>
          </ul>
        </div>
        {/* Премиум-продвижение профиля */}
        <div className="bg-[#222b3b] border border-[#4D7F49]/30 rounded-xl shadow-xl p-6 flex flex-col min-h-[210px] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck2 className="w-6 h-6 text-green-400" />
            <div className="font-semibold text-white text-lg">Премиум-продвижение профиля</div>
          </div>
          <div className="text-2xl font-bold text-green-300 mb-1">от $59/мес</div>
          <div className="text-gray-200 text-base mb-2">
            Повышенный приоритет в ленте, баннеры, теги &quot;топ трейдер&quot;, рекламные вставки в Telegram и Twitter
          </div>
        </div>
        {/* Реклама */}
        <div className="bg-[#213135] border border-green-900/40 rounded-xl shadow-xl p-6 flex flex-col min-h-[210px] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Megaphone className="w-6 h-6 text-pink-400" />
            <div className="font-semibold text-white text-lg">Баннерная реклама</div>
          </div>
          <div className="text-2xl font-bold text-pink-300 mb-1">$1,000–5,000/мес</div>
          <div className="text-gray-200 text-base mb-2">
            Биржи, проекты, криптосервисы
          </div>
          <ul className="list-disc text-gray-300 ml-5 mt-1 text-sm leading-relaxed space-y-0.5">
            <li>Спонсорские посты</li>
            <li>Партнерские программы</li>
          </ul>
        </div>
      </div>

      {/* Диаграмма распределения */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8">
        <div className="rounded-xl bg-gradient-to-tr from-yellow-400/70 to-yellow-500/90 text-white text-center p-4 flex flex-col items-center border-2 border-yellow-400/60 shadow">
          <div className="text-lg md:text-xl font-semibold">60% <span className="block text-sm font-normal">Premium</span></div>
        </div>
        <div className="rounded-xl bg-gradient-to-tr from-blue-400/65 to-blue-500/80 text-white text-center p-4 flex flex-col items-center border-2 border-blue-400/60 shadow">
          <div className="text-lg md:text-xl font-semibold">25% <span className="block text-sm font-normal">White-label</span></div>
        </div>
        <div className="rounded-xl bg-gradient-to-tr from-green-400/80 to-emerald-500/90 text-white text-center p-4 flex flex-col items-center border-2 border-green-400/60 shadow">
          <div className="text-lg md:text-xl font-semibold">10% <span className="block text-sm font-normal">Реклама</span></div>
        </div>
        <div className="rounded-xl bg-gradient-to-tr from-purple-500/70 to-purple-700/90 text-white text-center p-4 flex flex-col items-center border-2 border-purple-400/50 shadow">
          <div className="text-lg md:text-xl font-semibold">5% <span className="block text-sm font-normal">Копитрейдинг</span></div>
        </div>
      </div>
      {/* Номер слайда*/}
      <div className="text-center pt-5">
        <span className="text-sm text-gray-400">Слайд 8 из 13</span>
      </div>
    </div>
  );
};

// Кастомный икон для доллара
function DollarIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="19" fill="url(#dollar-bg-grad)" />
      <path d="M19 9V29M19 9C21.4853 9 23.5 10.7909 23.5 13C23.5 15.2091 21.4853 17 19 17C16.5147 17 14.5 18.7909 14.5 21C14.5 23.2091 16.5147 25 19 25M19 9C16.5147 9 14.5 10.7909 14.5 13C14.5 15.2091 16.5147 17 19 17M19 29C21.4853 29 23.5 27.2091 23.5 25C23.5 22.7909 21.4853 21 19 21C16.5147 21 14.5 19.2091 14.5 17" stroke="#FFA726" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="dollar-bg-grad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FFA726" />
        </linearGradient>
      </defs>
    </svg>
  );
}

