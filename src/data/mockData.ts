
export interface KOL {
  id: number;
  name: string;
  avatar: string;
  platforms: {
    name: 'Twitter' | 'Telegram' | 'YouTube' | 'Discord';
    handle: string;
    url: string;
    followers: number;
  }[];
  signalFrequency: string;
  engagement: string;
  reputation: 'Clean' | 'Mixed' | 'Controversial';
  accuracy: number;
  bio: string;
  language: 'EN' | 'RU' | 'Both';
  premium: boolean;
}

export interface Signal {
  id: number;
  kolId: number;
  asset: string;
  type: 'Long' | 'Short';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  date: string;
  status: 'Open' | 'Closed' | 'Canceled';
  result?: number; // Percentage gain/loss if closed
  premium: boolean;
}

export const kols: KOL[] = [
  {
    id: 1,
    name: "CryptoMaster",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=cryptomaster&backgroundColor=b6e3f4",
    platforms: [
      {
        name: "Twitter",
        handle: "@CryptoMaster",
        url: "https://twitter.com/cryptomaster",
        followers: 245000,
      },
      {
        name: "Telegram",
        handle: "CryptoMasterSignals",
        url: "https://t.me/cryptomastersignals",
        followers: 125000,
      }
    ],
    signalFrequency: "7-10 per week",
    engagement: "3.5K likes/post",
    reputation: "Clean",
    accuracy: 78,
    bio: "Professional trader since 2016. Former hedge fund analyst. Focused on Bitcoin and top 10 altcoins.",
    language: "EN",
    premium: false
  },
  {
    id: 2,
    name: "АльтКоинер",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=altcoiner&backgroundColor=c0aede",
    platforms: [
      {
        name: "Telegram",
        handle: "АльтКоинер",
        url: "https://t.me/altcoiner",
        followers: 89000,
      },
      {
        name: "YouTube",
        handle: "AltCoiner Crypto",
        url: "https://youtube.com/altcoiner",
        followers: 67000,
      }
    ],
    signalFrequency: "3-5 per week",
    engagement: "1.2K likes/post",
    reputation: "Clean",
    accuracy: 72,
    bio: "Торгую с 2017 года. Специализируюсь на альткоинах и DeFi-проектах. Технический аналитик.",
    language: "RU",
    premium: false
  },
  {
    id: 3,
    name: "Whale Alert",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=whalealert&backgroundColor=ffdfbf",
    platforms: [
      {
        name: "Twitter",
        handle: "@WhaleAlert",
        url: "https://twitter.com/whalealert",
        followers: 520000,
      },
      {
        name: "Discord",
        handle: "WhaleAlert",
        url: "https://discord.gg/whalealert",
        followers: 155000,
      }
    ],
    signalFrequency: "5-7 per week",
    engagement: "8.7K likes/post",
    reputation: "Clean",
    accuracy: 82,
    bio: "Tracking large cryptocurrency transactions and market moves. Early Bitcoin investor and whale watcher.",
    language: "EN",
    premium: false
  },
  {
    id: 4,
    name: "Token Trader",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=tokentrader&backgroundColor=ffd5dc",
    platforms: [
      {
        name: "Twitter",
        handle: "@TokenTrader",
        url: "https://twitter.com/tokentrader",
        followers: 178000,
      },
      {
        name: "Telegram",
        handle: "TokenTraderSignals",
        url: "https://t.me/tokentradersignals",
        followers: 94000,
      }
    ],
    signalFrequency: "Daily signals",
    engagement: "2.3K likes/post",
    reputation: "Mixed",
    accuracy: 68,
    bio: "Full-time crypto trader specializing in technical analysis and chart patterns. Trading since 2018.",
    language: "EN",
    premium: true
  },
  {
    id: 5,
    name: "КриптоГуру",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=cryptoguru&backgroundColor=c1e1c1",
    platforms: [
      {
        name: "YouTube",
        handle: "КриптоГуру",
        url: "https://youtube.com/cryptoguru",
        followers: 320000,
      },
      {
        name: "Telegram",
        handle: "CryptoGuruRU",
        url: "https://t.me/cryptogururu",
        followers: 180000,
      }
    ],
    signalFrequency: "2-3 per week",
    engagement: "4.2K likes/post",
    reputation: "Clean",
    accuracy: 75,
    bio: "Инвестор и аналитик криптовалютного рынка. Образование в сфере финансов. Люблю глубокий анализ проектов.",
    language: "RU",
    premium: true
  }
];

export const signals: Signal[] = [
  {
    id: 1,
    kolId: 1,
    asset: "BTC/USDT",
    type: "Long",
    entryPrice: 68500,
    targetPrice: 72000,
    stopLoss: 67200,
    date: "2023-05-10T14:30:00Z",
    status: "Open",
    premium: false
  },
  {
    id: 2,
    kolId: 3,
    asset: "ETH/USDT",
    type: "Long",
    entryPrice: 3850,
    targetPrice: 4200,
    stopLoss: 3700,
    date: "2023-05-09T09:15:00Z",
    status: "Open",
    premium: false
  },
  {
    id: 3,
    kolId: 2,
    asset: "SOL/USDT",
    type: "Short",
    entryPrice: 145.50,
    targetPrice: 130,
    stopLoss: 152,
    date: "2023-05-08T18:45:00Z",
    status: "Closed",
    result: 8.2,
    premium: false
  },
  {
    id: 4,
    kolId: 1,
    asset: "BNB/USDT",
    type: "Long",
    entryPrice: 570,
    targetPrice: 620,
    stopLoss: 550,
    date: "2023-05-08T10:00:00Z",
    status: "Closed",
    result: -3.5,
    premium: false
  },
  {
    id: 5,
    kolId: 4,
    asset: "XRP/USDT",
    type: "Long",
    entryPrice: 0.585,
    targetPrice: 0.65,
    stopLoss: 0.55,
    date: "2023-05-07T20:30:00Z",
    status: "Closed",
    result: 10.2,
    premium: true
  },
  {
    id: 6,
    kolId: 5,
    asset: "AVAX/USDT",
    type: "Short",
    entryPrice: 35.2,
    targetPrice: 31,
    stopLoss: 37,
    date: "2023-05-07T16:20:00Z",
    status: "Closed",
    result: 5.7,
    premium: true
  },
  {
    id: 7,
    kolId: 3,
    asset: "DOT/USDT",
    type: "Long",
    entryPrice: 6.8,
    targetPrice: 7.5,
    stopLoss: 6.5,
    date: "2023-05-06T13:10:00Z",
    status: "Canceled",
    premium: false
  },
  {
    id: 8,
    kolId: 2,
    asset: "NEAR/USDT",
    type: "Short",
    entryPrice: 5.92,
    targetPrice: 5.4,
    stopLoss: 6.15,
    date: "2023-05-06T08:45:00Z",
    status: "Open",
    premium: true
  },
  {
    id: 9,
    kolId: 4,
    asset: "LINK/USDT",
    type: "Long",
    entryPrice: 15.3,
    targetPrice: 16.8,
    stopLoss: 14.7,
    date: "2023-05-05T22:30:00Z",
    status: "Closed",
    result: 7.8,
    premium: true
  },
  {
    id: 10,
    kolId: 5,
    asset: "ADA/USDT",
    type: "Long",
    entryPrice: 0.39,
    targetPrice: 0.43,
    stopLoss: 0.37,
    date: "2023-05-05T14:15:00Z",
    status: "Open",
    premium: true
  }
];

// Sample engagement data for charts
export const engagementData = {
  1: [
    { month: 'Jan', likes: 2800, comments: 420 },
    { month: 'Feb', likes: 3200, comments: 480 },
    { month: 'Mar', likes: 2900, comments: 390 },
    { month: 'Apr', likes: 3500, comments: 520 },
    { month: 'May', likes: 4200, comments: 630 },
    { month: 'Jun', likes: 3800, comments: 570 }
  ],
  2: [
    { month: 'Jan', likes: 950, comments: 210 },
    { month: 'Feb', likes: 1100, comments: 240 },
    { month: 'Mar', likes: 1250, comments: 280 },
    { month: 'Apr', likes: 1400, comments: 310 },
    { month: 'May', likes: 1200, comments: 260 },
    { month: 'Jun', likes: 1350, comments: 290 }
  ],
  3: [
    { month: 'Jan', likes: 7500, comments: 980 },
    { month: 'Feb', likes: 8200, comments: 1050 },
    { month: 'Mar', likes: 9100, comments: 1200 },
    { month: 'Apr', likes: 8700, comments: 1100 },
    { month: 'May', likes: 9500, comments: 1280 },
    { month: 'Jun', likes: 10200, comments: 1350 }
  ],
  4: [
    { month: 'Jan', likes: 1800, comments: 320 },
    { month: 'Feb', likes: 2100, comments: 380 },
    { month: 'Mar', likes: 2400, comments: 420 },
    { month: 'Apr', likes: 2200, comments: 390 },
    { month: 'May', likes: 2500, comments: 450 },
    { month: 'Jun', likes: 2300, comments: 410 }
  ],
  5: [
    { month: 'Jan', likes: 3500, comments: 580 },
    { month: 'Feb', likes: 3800, comments: 620 },
    { month: 'Mar', likes: 4200, comments: 690 },
    { month: 'Apr', likes: 4500, comments: 730 },
    { month: 'May', likes: 4100, comments: 670 },
    { month: 'Jun', likes: 4300, comments: 700 }
  ]
};

// FAQ Questions
export const faqQuestions = [
  {
    question: {
      en: "Who are KOLs?",
      ru: "Кто такие KOL'ы?"
    },
    answer: {
      en: "KOLs (Key Opinion Leaders) are influential figures in the cryptocurrency space who have significant followings and provide market analysis, trading signals, and insights about crypto projects. They can be found on platforms like Twitter, Telegram, YouTube, and Discord.",
      ru: "KOL (Ключевые Лидеры Мнений) — это влиятельные фигуры в криптовалютном пространстве, имеющие значительную аудиторию и предоставляющие рыночный анализ, торговые сигналы и информацию о криптопроектах. Их можно найти на таких платформах, как Twitter, Telegram, YouTube и Discord."
    }
  },
  {
    question: {
      en: "How does the leaderboard work?",
      ru: "Как работает лидерборд?"
    },
    answer: {
      en: "The KOL Leaderboard ranks crypto influencers based on several metrics including follower count, engagement rates, signal accuracy, and reputation. We constantly monitor and update these metrics to ensure accurate rankings. Premium users get access to the complete list and detailed profiles.",
      ru: "Лидерборд KOL ранжирует крипто-инфлюенсеров на основе нескольких метрик, включая количество подписчиков, уровень вовлеченности, точность сигналов и репутацию. Мы постоянно отслеживаем и обновляем эти метрики для обеспечения точных рейтингов. Премиум-пользователи получают доступ к полному списку и подробным профилям."
    }
  },
  {
    question: {
      en: "What benefits does Premium subscription provide?",
      ru: "Какие преимущества дает Premium-подписка?"
    },
    answer: {
      en: "Premium subscription unlocks full access to all KOLs on the leaderboard, detailed profile information, complete history of trading signals, notification system for new signals, ability to comment on KOL profiles, and ad-free experience. It's the best way to maximize your trading potential with KOL insights.",
      ru: "Premium-подписка открывает полный доступ ко всем KOL в лидерборде, подробную информацию о профилях, полную историю торговых сигналов, систему уведомлений о новых сигналах, возможность комментировать профили KOL и отсутствие рекламы. Это лучший способ максимизировать ваш торговый потенциал с помощью аналитики от KOL."
    }
  },
  {
    question: {
      en: "How accurate are the signals from KOLs?",
      ru: "Насколько точны сигналы от KOL'ов?"
    },
    answer: {
      en: "Signal accuracy varies by individual KOL. We track historical accuracy and display it as a percentage on each profile. Remember that all trading carries risk, and even the highest-rated KOLs can make unsuccessful predictions. Always do your own research and manage your risk appropriately.",
      ru: "Точность сигналов варьируется в зависимости от конкретного KOL. Мы отслеживаем историческую точность и отображаем ее в процентах на каждом профиле. Помните, что вся торговля связана с риском, и даже самые высокорейтинговые KOL могут делать неудачные прогнозы. Всегда проводите собственное исследование и соответствующим образом управляйте своим риском."
    }
  },
  {
    question: {
      en: "Can I filter KOLs by language or platform?",
      ru: "Могу ли я фильтровать KOL'ов по языку или платформе?"
    },
    answer: {
      en: "Yes, our platform allows filtering by language (English and Russian) and by platforms (Twitter, Telegram, YouTube, Discord). Premium users have access to additional advanced filtering options for more specific searches.",
      ru: "Да, наша платформа позволяет фильтровать по языку (английский и русский) и по платформам (Twitter, Telegram, YouTube, Discord). Премиум-пользователи имеют доступ к дополнительным расширенным опциям фильтрации для более конкретных запросов."
    }
  },
  {
    question: {
      en: "How is the reputation of KOLs determined?",
      ru: "Как определяется репутация KOL'ов?"
    },
    answer: {
      en: "Reputation is determined through community feedback, history of interactions, reported incidents, and overall behavior in the crypto space. We label KOLs as 'Clean' (no negative incidents), 'Mixed' (some controversial history), or 'Controversial' (significant negative reports or behavior).",
      ru: "Репутация определяется через отзывы сообщества, историю взаимодействий, сообщенные инциденты и общее поведение в криптопространстве. Мы отмечаем KOL как 'Чистый' (нет отрицательных инцидентов), 'Смешанный' (некоторая спорная история) или 'Спорный' (значительные негативные отчеты или поведение)."
    }
  }
];

// Translation dictionary
export const translations = {
  // Navigation
  "Home": {
    en: "Home",
    ru: "Главная"
  },
  "Leaderboard": {
    en: "Leaderboard",
    ru: "Лидерборд"
  },
  "Dashboard": {
    en: "Dashboard",
    ru: "Личный кабинет"
  },
  "About": {
    en: "About",
    ru: "О проекте"
  },
  "FAQ": {
    en: "FAQ",
    ru: "FAQ"
  },
  "Login": {
    en: "Login",
    ru: "Вход"
  },
  "Register": {
    en: "Register",
    ru: "Регистрация"
  },
  "Logout": {
    en: "Logout",
    ru: "Выход"
  },
  
  // Home Page
  "projectTitle": {
    en: "KOL Leaderboard — Best Crypto Traders and Their Signals for Your Investments",
    ru: "KOL Лидерборд — лучшие крипто-трейдеры и их сигналы для ваших инвестиций"
  },
  "latestSignals": {
    en: "Latest Trading Signals",
    ru: "Последние торговые сигналы"
  },
  "viewMore": {
    en: "View More",
    ru: "Смотреть еще"
  },
  "subscribeToPremium": {
    en: "Subscribe to Premium",
    ru: "Подписаться на Premium"
  },
  
  // Signal Card
  "asset": {
    en: "Asset",
    ru: "Актив"
  },
  "type": {
    en: "Type",
    ru: "Тип"
  },
  "entry": {
    en: "Entry",
    ru: "Вход"
  },
  "target": {
    en: "Target",
    ru: "Цель"
  },
  "stopLoss": {
    en: "Stop Loss",
    ru: "Стоп-лосс"
  },
  "date": {
    en: "Date",
    ru: "Дата"
  },
  "status": {
    en: "Status",
    ru: "Статус"
  },
  "by": {
    en: "by",
    ru: "от"
  },
  "long": {
    en: "Long",
    ru: "Лонг"
  },
  "short": {
    en: "Short",
    ru: "Шорт"
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
  "result": {
    en: "Result",
    ru: "Результат"
  },
  "premiumOnly": {
    en: "Premium Only",
    ru: "Только Premium"
  },
  
  // Leaderboard Page
  "kolsLeaderboard": {
    en: "Crypto KOLs Leaderboard",
    ru: "Лидерборд крипто KOL'ов"
  },
  "rank": {
    en: "Rank",
    ru: "Ранг"
  },
  "name": {
    en: "Name",
    ru: "Имя"
  },
  "platform": {
    en: "Platform",
    ru: "Платформа"
  },
  "followers": {
    en: "Followers",
    ru: "Подписчики"
  },
  "signalFreq": {
    en: "Signal Frequency",
    ru: "Частота сигналов"
  },
  "engagement": {
    en: "Engagement",
    ru: "Вовлеченность"
  },
  "reputation": {
    en: "Reputation",
    ru: "Репутация"
  },
  "accuracy": {
    en: "Accuracy",
    ru: "Точность"
  },
  "details": {
    en: "Details",
    ru: "Подробнее"
  },
  "clean": {
    en: "Clean",
    ru: "Чистая"
  },
  "mixed": {
    en: "Mixed",
    ru: "Смешанная"
  },
  "controversial": {
    en: "Controversial",
    ru: "Спорная"
  },
  
  // Filter Labels
  "filterBy": {
    en: "Filter by",
    ru: "Фильтровать по"
  },
  "platform": {
    en: "Platform",
    ru: "Платформа"
  },
  "language": {
    en: "Language",
    ru: "Язык"
  },
  "minFollowers": {
    en: "Min Followers",
    ru: "Мин. подписчиков"
  },
  "minAccuracy": {
    en: "Min Accuracy",
    ru: "Мин. точность"
  },
  "applyFilters": {
    en: "Apply Filters",
    ru: "Применить фильтры"
  },
  "resetFilters": {
    en: "Reset Filters",
    ru: "Сбросить фильтры"
  },
  
  // Profile Page
  "follow": {
    en: "Follow",
    ru: "Отслеживать"
  },
  "following": {
    en: "Following",
    ru: "Отслеживается"
  },
  "profileDetails": {
    en: "Profile Details",
    ru: "Детали профиля"
  },
  "engagementStats": {
    en: "Engagement Statistics",
    ru: "Статистика вовлеченности"
  },
  "tradingSignals": {
    en: "Trading Signals",
    ru: "Торговые сигналы"
  },
  "comments": {
    en: "Comments",
    ru: "Комментарии"
  },
  "leaveComment": {
    en: "Leave a Comment",
    ru: "Оставить комментарий"
  },
  "submitComment": {
    en: "Submit Comment",
    ru: "Отправить комментарий"
  },
  
  // Dashboard Page
  "userProfile": {
    en: "User Profile",
    ru: "Профиль пользователя"
  },
  "settings": {
    en: "Settings",
    ru: "Настройки"
  },
  "favoritesKOLs": {
    en: "Favorite KOLs",
    ru: "Избранные KOL'ы"
  },
  "viewedSignals": {
    en: "Viewed Signals",
    ru: "Просмотренные сигналы"
  },
  "changePassword": {
    en: "Change Password",
    ru: "Изменить пароль"
  },
  "languagePreference": {
    en: "Language Preference",
    ru: "Предпочитаемый язык"
  },
  "notifications": {
    en: "Notifications",
    ru: "Уведомления"
  },
  
  // Auth Pages
  "email": {
    en: "Email",
    ru: "Email"
  },
  "password": {
    en: "Password",
    ru: "Пароль"
  },
  "confirmPassword": {
    en: "Confirm Password",
    ru: "Подтверждение пароля"
  },
  "forgotPassword": {
    en: "Forgot Password?",
    ru: "Забыли пароль?"
  },
  "loginWith": {
    en: "Login with",
    ru: "Войти через"
  },
  "noAccount": {
    en: "Don't have an account?",
    ru: "Нет аккаунта?"
  },
  "alreadyAccount": {
    en: "Already have an account?",
    ru: "Уже есть аккаунт?"
  },
  "resetPassword": {
    en: "Reset Password",
    ru: "Сбросить пароль"
  },
  
  // About Page
  "aboutTitle": {
    en: "About KOL Leaderboard",
    ru: "О KOL Лидерборде"
  },
  "mission": {
    en: "KOL Leaderboard helps traders find reliable opinion leaders and use their signals for successful trading",
    ru: "KOL Лидерборд помогает трейдерам находить надежных лидеров мнений и использовать их сигналы для успешной торговли"
  },
  "contactUs": {
    en: "Contact Us",
    ru: "Связаться с нами"
  },
  "yourName": {
    en: "Your Name",
    ru: "Ваше имя"
  },
  "message": {
    en: "Message",
    ru: "Сообщение"
  },
  "send": {
    en: "Send",
    ru: "Отправить"
  }
};
