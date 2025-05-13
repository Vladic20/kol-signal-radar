export type Signal = {
  id: number;
  asset: string;
  type: 'Long' | 'Short';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  date: string;
  kolId: number;
  premium: boolean;
  status: 'Open' | 'Closed' | 'Canceled';
  result?: number;
  description?: string;
};

export type KOL = {
  id: number;
  name: string;
  avatar: string;
  description: string;
  performance: {
    winRate: number;
    averageReturn: number;
  };
  socialLinks: {
    twitter?: string;
    telegram?: string;
    youtube?: string;
  };
  followers: number;
};

export const signals: Signal[] = [
  {
    id: 1,
    asset: 'BTC/USDT',
    type: 'Long',
    entryPrice: 26000,
    targetPrice: 28000,
    stopLoss: 25000,
    date: '2024-01-26T12:00:00Z',
    kolId: 1,
    premium: false,
    status: 'Open',
    description: 'Potential upward movement based on recent market analysis.',
  },
  {
    id: 2,
    asset: 'ETH/USDT',
    type: 'Short',
    entryPrice: 1600,
    targetPrice: 1500,
    stopLoss: 1650,
    date: '2024-01-25T18:00:00Z',
    kolId: 2,
    premium: true,
    status: 'Open',
    result: -2.5,
    description: 'Expecting a short-term correction due to overbought conditions.',
  },
  {
    id: 3,
    asset: 'XRP/USDT',
    type: 'Long',
    entryPrice: 0.60,
    targetPrice: 0.65,
    stopLoss: 0.58,
    date: '2024-01-24T09:00:00Z',
    kolId: 3,
    premium: false,
    status: 'Closed',
    result: 8.3,
    description: 'Positive sentiment around upcoming regulatory news.',
  },
  {
    id: 4,
    asset: 'LTC/USDT',
    type: 'Short',
    entryPrice: 110,
    targetPrice: 100,
    stopLoss: 115,
    date: '2024-01-23T15:00:00Z',
    kolId: 1,
    premium: true,
    status: 'Closed',
    result: 5.1,
    description: 'Technical indicators suggest a downward trend.',
  },
  {
    id: 5,
    asset: 'ADA/USDT',
    type: 'Long',
    entryPrice: 1.20,
    targetPrice: 1.30,
    stopLoss: 1.15,
    date: '2024-01-22T21:00:00Z',
    kolId: 2,
    premium: false,
    status: 'Open',
    description: 'Bullish pattern forming on the daily chart.',
  },
  {
    id: 6,
    asset: 'DOT/USDT',
    type: 'Short',
    entryPrice: 25.00,
    targetPrice: 23.00,
    stopLoss: 26.00,
    date: '2024-01-21T03:00:00Z',
    kolId: 3,
    premium: true,
    status: 'Canceled',
    description: 'Market volatility causing uncertainty.',
  },
  {
    id: 7,
    asset: 'SOL/USDT',
    type: 'Long',
    entryPrice: 40.00,
    targetPrice: 45.00,
    stopLoss: 38.00,
    date: '2024-01-20T10:00:00Z',
    kolId: 1,
    premium: false,
    status: 'Open',
    description: 'Increased adoption and network growth.',
  },
    {
    id: 8,
    asset: 'BNB/USDT',
    type: 'Short',
    entryPrice: 300.00,
    targetPrice: 280.00,
    stopLoss: 310.00,
    date: '2024-01-19T16:00:00Z',
    kolId: 2,
    premium: true,
    status: 'Open',
    description: 'Regulatory concerns impacting market sentiment.',
  },
  {
    id: 9,
    asset: 'LINK/USDT',
    type: 'Long',
    entryPrice: 20.00,
    targetPrice: 22.00,
    stopLoss: 19.00,
    date: '2024-01-18T07:00:00Z',
    kolId: 3,
    premium: false,
    status: 'Closed',
    result: 10.2,
    description: 'Growing demand for oracle services.',
  },
  {
    id: 10,
    asset: 'MATIC/USDT',
    type: 'Short',
    entryPrice: 1.50,
    targetPrice: 1.40,
    stopLoss: 1.55,
    date: '2024-01-17T13:00:00Z',
    kolId: 1,
    premium: true,
    status: 'Closed',
    result: 6.8,
    description: 'Profit-taking after recent price surge.',
  },
  {
    id: 11,
    asset: 'AVAX/USDT',
    type: 'Long',
    entryPrice: 75.00,
    targetPrice: 80.00,
    stopLoss: 72.00,
    date: '2024-01-16T19:00:00Z',
    kolId: 2,
    premium: false,
    status: 'Open',
    description: 'Expanding ecosystem and partnerships.',
  },
  {
    id: 12,
    asset: 'UNI/USDT',
    type: 'Short',
    entryPrice: 30.00,
    targetPrice: 28.00,
    stopLoss: 31.00,
    date: '2024-01-15T01:00:00Z',
    kolId: 3,
    premium: true,
    status: 'Canceled',
    description: 'Regulatory scrutiny affecting DeFi tokens.',
  },
  {
    id: 13,
    asset: 'TRX/USDT',
    type: 'Long',
    entryPrice: 0.08,
    targetPrice: 0.09,
    stopLoss: 0.075,
    date: '2024-01-14T08:00:00Z',
    kolId: 1,
    premium: false,
    status: 'Open',
    description: 'Network upgrades improving scalability.',
  },
  {
    id: 14,
    asset: 'DOGE/USDT',
    type: 'Short',
    entryPrice: 0.07,
    targetPrice: 0.065,
    stopLoss: 0.072,
    date: '2024-01-13T14:00:00Z',
    kolId: 2,
    premium: true,
    status: 'Open',
    description: 'Speculative bubble deflating.',
  },
  {
    id: 15,
    asset: 'SHIB/USDT',
    type: 'Long',
    entryPrice: 0.00001,
    targetPrice: 0.000012,
    stopLoss: 0.000009,
    date: '2024-01-12T20:00:00Z',
    kolId: 3,
    premium: false,
    status: 'Closed',
    result: 15.5,
    description: 'Community-driven initiatives boosting value.',
  },
  {
    id: 16,
    asset: 'XLM/USDT',
    type: 'Short',
    entryPrice: 0.30,
    targetPrice: 0.28,
    stopLoss: 0.31,
    date: '2024-01-11T02:00:00Z',
    kolId: 1,
    premium: true,
    status: 'Closed',
    result: 9.2,
    description: 'Competition from faster payment solutions.',
  },
  {
    id: 17,
    asset: 'EOS/USDT',
    type: 'Long',
    entryPrice: 3.00,
    targetPrice: 3.30,
    stopLoss: 2.80,
    date: '2024-01-10T09:00:00Z',
    kolId: 2,
    premium: false,
    status: 'Open',
    description: 'Revival efforts gaining traction.',
  },
  {
    id: 18,
    asset: 'XTZ/USDT',
    type: 'Short',
    entryPrice: 4.50,
    targetPrice: 4.20,
    stopLoss: 4.60,
    date: '2024-01-09T15:00:00Z',
    kolId: 3,
    premium: true,
    status: 'Canceled',
    description: 'Market correction impacting altcoins.',
  },
  {
    id: 19,
    asset: 'FIL/USDT',
    type: 'Long',
    entryPrice: 50.00,
    targetPrice: 55.00,
    stopLoss: 48.00,
    date: '2024-01-08T21:00:00Z',
    kolId: 1,
    premium: false,
    status: 'Open',
    description: 'Growing demand for decentralized storage.',
  },
  {
    id: 20,
    asset: 'THETA/USDT',
    type: 'Short',
    entryPrice: 6.00,
    targetPrice: 5.50,
    stopLoss: 6.20,
    date: '2024-01-07T03:00:00Z',
    kolId: 2,
    premium: true,
    status: 'Open',
    description: 'Competition in the video streaming space.',
  },
];

export const kols: KOL[] = [
  {
    id: 1,
    name: 'CryptoExpert123',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Experienced trader specializing in Bitcoin and Ethereum.',
    performance: {
      winRate: 75,
      averageReturn: 12.5,
    },
    socialLinks: {
      twitter: 'https://twitter.com/CryptoExpert123',
      telegram: 'https://t.me/CryptoExpert123',
    },
    followers: 150000,
  },
  {
    id: 2,
    name: 'AltcoinGuru',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'Passionate about altcoins with high growth potential.',
    performance: {
      winRate: 68,
      averageReturn: 18.2,
    },
    socialLinks: {
      twitter: 'https://twitter.com/AltcoinGuru',
      youtube: 'https://youtube.com/AltcoinGuru',
    },
    followers: 120000,
  },
  {
    id: 3,
    name: 'DeFiAnalyst',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'In-depth analysis of DeFi projects and trends.',
    performance: {
      winRate: 70,
      averageReturn: 15.8,
    },
    socialLinks: {
      twitter: 'https://twitter.com/DeFiAnalyst',
      telegram: 'https://t.me/DeFiAnalyst',
    },
    followers: 90000,
  },
];

export interface Translation {
  en: string;
  ru: string;
}

export const translations: { [key: string]: Translation } = {
  // Navigation & Authentication
  "Login": {
    en: "Login",
    ru: "Войти"
  },
  "Register": {
    en: "Register",
    ru: "Регистрация"
  },
  "Email": {
    en: "Email",
    ru: "Эл. почта"
  },
  "Password": {
    en: "Password",
    ru: "Пароль"
  },
  "Dashboard": {
    en: "Dashboard",
    ru: "Панель"
  },
  "Leaderboard": {
    en: "Leaderboard",
    ru: "Лидеры"
  },
  "About": {
    en: "About",
    ru: "О нас"
  },
  "FAQ": {
    en: "FAQ",
    ru: "ЧЗВ"
  },
  "Home": {
    en: "Home",
    ru: "Главная"
  },
  "Logout": {
    en: "Logout",
    ru: "Выйти"
  },
  
  // Main page content
  "projectTitle": {
    en: "Crypto Trading Signals",
    ru: "Торговые Сигналы Крипто"
  },
  "latestSignals": {
    en: "Latest Signals",
    ru: "Последние Сигналы"
  },
  "asset": {
    en: "Asset",
    ru: "Актив"
  },
  "type": {
    en: "Type",
    ru: "Тип"
  },
  "long": {
    en: "Long",
    ru: "Лонг"
  },
  "short": {
    en: "Short",
    ru: "Шорт"
  },
  "entryPrice": {
    en: "Entry Price",
    ru: "Цена Входа"
  },
  "targetPrice": {
    en: "Target Price",
    ru: "Целевая Цена"
  },
  "stopLoss": {
    en: "Stop Loss",
    ru: "Стоп-лосс"
  },
  "status": {
    en: "Status",
    ru: "Статус"
  },
  "open": {
    en: "Open",
    ru: "Открыт"
  },
  "closed": {
    en: "Closed",
    ru: "Закрыт"
  },
  "canceled": {
    en: "Canceled",
    ru: "Отменен"
  },
  
  // Premium content
  "premiumContent": {
    en: "Premium Content",
    ru: "Премиум Контент"
  },
  "subscribeToPremium": {
    en: "Subscribe to Premium",
    ru: "Подписаться на Премиум"
  },
  
  // Language selector
  "language": {
    en: "en",
    ru: "ru"
  },
  
  // Additional Terms for Other Components
  "entry": {
    en: "Entry",
    ru: "Вход"
  },
  "target": {
    en: "Target",
    ru: "Цель"
  },
  "details": {
    en: "Details",
    ru: "Детали"
  },
  "premiumOnly": {
    en: "Premium Only",
    ru: "Только Премиум"
  },
  
  // About page
  "aboutTitle": {
    en: "About Our Platform",
    ru: "О Нашей Платформе"
  },
  "mission": {
    en: "Our Mission",
    ru: "Наша Миссия"
  },
  "contactUs": {
    en: "Contact Us",
    ru: "Связаться с Нами"
  },
  "yourName": {
    en: "Your Name",
    ru: "Ваше Имя"
  },
  "email": {
    en: "Email",
    ru: "Электронная почта"
  },
  "message": {
    en: "Message",
    ru: "Сообщение"
  },
  "send": {
    en: "Send",
    ru: "Отправить"
  },
  
  // Dashboard page
  "userProfile": {
    en: "User Profile",
    ru: "Профиль Пользователя"
  },
  "favoritesKOLs": {
    en: "Favorite KOLs",
    ru: "Избранные KOL"
  },
  "viewedSignals": {
    en: "Viewed Signals",
    ru: "Просмотренные Сигналы"
  },
  "settings": {
    en: "Settings",
    ru: "Настройки"
  },
  "changePassword": {
    en: "Change Password",
    ru: "Изменить Пароль"
  },
  "languagePreference": {
    en: "Language Preference",
    ru: "Предпочтительный Язык"
  },
  "notifications": {
    en: "Notifications",
    ru: "Уведомления"
  },
  "entryPrice": {
    en: "Entry Price",
    ru: "Цена входа"
  },
  "targetPrice": {
    en: "Target Price",
    ru: "Целевая цена"
  },
  "stopLoss": {
    en: "Stop Loss",
    ru: "Стоп-лосс"
  }
};

export const faqQuestions = [
  {
    question: {
      en: "What are crypto trading signals?",
      ru: "Что такое торговые сигналы криптовалют?"
    },
    answer: {
      en: "Crypto trading signals are professional recommendations for entering trades on cryptocurrency markets, based on technical analysis or experienced traders' insights.",
      ru: "Торговые сигналы криптовалют - это профессиональные рекомендации по входу в сделки на рынках криптовалют, основанные на техническом анализе или опыте трейдеров."
    }
  },
  {
    question: {
      en: "How do I use the signals on this platform?",
      ru: "Как использовать сигналы на этой платформе?"
    },
    answer: {
      en: "Our platform shows you the entry price, target price, and stop-loss for each signal. You can implement these in your preferred trading platform.",
      ru: "Наша платформа показывает вам цену входа, целевую цену и стоп-лосс для каждого сигнала. Вы можете использовать их на вашей предпочтительной торговой платформе."
    }
  },
  {
    question: {
      en: "What is the difference between Long and Short signals?",
      ru: "В чем разница между сигналами Long и Short?"
    },
    answer: {
      en: "Long signals suggest buying an asset expecting its price to rise, while Short signals suggest selling (or shorting) an asset expecting its price to fall.",
      ru: "Сигналы Long предполагают покупку актива в ожидании роста цены, а сигналы Short предполагают продажу (или короткую позицию) актива в ожидании падения цены."
    }
  },
  {
    question: {
      en: "What do I get with a Premium subscription?",
      ru: "Что я получаю с Премиум-подпиской?"
    },
    answer: {
      en: "Premium subscribers get access to all signals including exclusive ones, detailed market analysis, and performance statistics from top KOLs.",
      ru: "Премиум-подписчики получают доступ ко всем сигналам, включая эксклюзивные, подробный анализ рынка и статистику производительности от ведущих KOL."
    }
  },
  {
    question: {
      en: "How accurate are the signals?",
      ru: "Насколько точны сигналы?"
    },
    answer: {
      en: "Signal accuracy varies by KOL and market conditions. We provide performance statistics for each KOL to help you evaluate their track record.",
      ru: "Точность сигналов зависит от KOL и рыночных условий. Мы предоставляем статистику производительности для каждого KOL, чтобы помочь вам оценить их послужной список."
    }
  }
];

export const engagementData = [
  { name: 'Jan', followers: 400 },
  { name: 'Feb', followers: 600 },
  { name: 'Mar', followers: 800 },
  { name: 'Apr', followers: 1000 },
  { name: 'May', followers: 1400 },
  { name: 'Jun', followers: 1700 },
  { name: 'Jul', followers: 2000 },
];
