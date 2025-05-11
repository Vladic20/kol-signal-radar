export interface Signal {
  id: number;
  kolId: number;
  asset: string;
  type: string;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  date: string;
  status: string;
  premium: boolean;
  result: number | null;
}

export interface KOL {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  platforms: { name: string; url: string; followers: number }[];
  language: string;
  signalFrequency: string;
  accuracy: number;
  engagement: number;
  reputation: string;
  premium: boolean;
  statistics: {
    successRate: { month: string; rate: number }[];
    performance: number;
  };
}

export const signals: Signal[] = [
  {
    id: 1,
    kolId: 1,
    asset: "BTC",
    type: "Long",
    entryPrice: 65000,
    targetPrice: 72000,
    stopLoss: 62000,
    date: "2025-05-08T10:30:00Z",
    status: "Open",
    premium: false,
    result: null
  },
  {
    id: 2,
    kolId: 2,
    asset: "ETH",
    type: "Long",
    entryPrice: 3500,
    targetPrice: 4000,
    stopLoss: 3300,
    date: "2025-05-07T15:45:00Z",
    status: "Closed",
    premium: false,
    result: 12
  },
  {
    id: 3,
    kolId: 1,
    asset: "XRP",
    type: "Short",
    entryPrice: 0.55,
    targetPrice: 0.45,
    stopLoss: 0.60,
    date: "2025-05-06T09:20:00Z",
    status: "Closed",
    premium: true,
    result: -15
  },
  {
    id: 4,
    kolId: 3,
    asset: "LTC",
    type: "Long",
    entryPrice: 150,
    targetPrice: 180,
    stopLoss: 140,
    date: "2025-05-05T18:00:00Z",
    status: "Open",
    premium: false,
    result: null
  },
  {
    id: 5,
    kolId: 2,
    asset: "ADA",
    type: "Short",
    entryPrice: 1.20,
    targetPrice: 1.00,
    stopLoss: 1.25,
    date: "2025-05-04T12:30:00Z",
    status: "Canceled",
    premium: true,
    result: 0
  },
  {
    id: 6,
    kolId: 1,
    asset: "BNB",
    type: "Long",
    entryPrice: 400,
    targetPrice: 450,
    stopLoss: 380,
    date: "2025-05-03T21:10:00Z",
    status: "Closed",
    premium: false,
    result: 10
  },
  {
    id: 7,
    kolId: 3,
    asset: "SOL",
    type: "Long",
    entryPrice: 80,
    targetPrice: 95,
    stopLoss: 75,
    date: "2025-05-02T08:45:00Z",
    status: "Open",
    premium: true,
    result: null
  },
  {
    id: 8,
    kolId: 2,
    asset: "DOT",
    type: "Short",
    entryPrice: 25,
    targetPrice: 22,
    stopLoss: 26,
    date: "2025-05-01T16:20:00Z",
    status: "Closed",
    premium: false,
    result: -8
  },
  {
    id: 9,
    kolId: 1,
    asset: "AVAX",
    type: "Long",
    entryPrice: 70,
    targetPrice: 80,
    stopLoss: 65,
    date: "2025-04-30T14:00:00Z",
    status: "Open",
    premium: true,
    result: null
  },
  {
    id: 10,
    kolId: 3,
    asset: "DOGE",
    type: "Long",
    entryPrice: 0.08,
    targetPrice: 0.10,
    stopLoss: 0.07,
    date: "2025-04-29T23:55:00Z",
    status: "Closed",
    premium: false,
    result: 25
  },
  {
    id: 11,
    kolId: 2,
    asset: "SHIB",
    type: "Short",
    entryPrice: 0.000025,
    targetPrice: 0.000020,
    stopLoss: 0.000026,
    date: "2025-04-28T07:30:00Z",
    status: "Open",
    premium: true,
    result: null
  },
  {
    id: 12,
    kolId: 1,
    asset: "MATIC",
    type: "Long",
    entryPrice: 0.90,
    targetPrice: 1.00,
    stopLoss: 0.85,
    date: "2025-04-27T11:15:00Z",
    status: "Closed",
    premium: false,
    result: 11
  },
  {
    id: 13,
    kolId: 3,
    asset: "TRX",
    type: "Short",
    entryPrice: 0.065,
    targetPrice: 0.055,
    stopLoss: 0.066,
    date: "2025-04-26T19:05:00Z",
    status: "Open",
    premium: true,
    result: null
  },
  {
    id: 14,
    kolId: 2,
    asset: "LINK",
    type: "Long",
    entryPrice: 18,
    targetPrice: 21,
    stopLoss: 17,
    date: "2025-04-25T02:40:00Z",
    status: "Closed",
    premium: false,
    result: 17
  },
  {
    id: 15,
    kolId: 1,
    asset: "XLM",
    type: "Short",
    entryPrice: 0.14,
    targetPrice: 0.12,
    stopLoss: 0.145,
    date: "2025-04-24T15:25:00Z",
    status: "Canceled",
    premium: true,
    result: 0
  },
  {
    id: 16,
    kolId: 3,
    asset: "VET",
    type: "Long",
    entryPrice: 0.03,
    targetPrice: 0.035,
    stopLoss: 0.028,
    date: "2025-04-23T06:10:00Z",
    status: "Open",
    premium: false,
    result: null
  },
  {
    id: 17,
    kolId: 2,
    asset: "XMR",
    type: "Long",
    entryPrice: 250,
    targetPrice: 280,
    stopLoss: 240,
    date: "2025-04-22T13:50:00Z",
    status: "Closed",
    premium: true,
    result: 12
  },
  {
    id: 18,
    kolId: 1,
    asset: "EOS",
    type: "Short",
    entryPrice: 2.70,
    targetPrice: 2.30,
    stopLoss: 2.75,
    date: "2025-04-21T22:35:00Z",
    status: "Open",
    premium: false,
    result: null
  },
  {
    id: 19,
    kolId: 3,
    asset: "XTZ",
    type: "Long",
    entryPrice: 4.20,
    targetPrice: 4.80,
    stopLoss: 4.00,
    date: "2025-04-20T09:00:00Z",
    status: "Closed",
    premium: true,
    result: 14
  },
  {
    id: 20,
    kolId: 2,
    asset: "IOTA",
    type: "Short",
    entryPrice: 0.40,
    targetPrice: 0.35,
    stopLoss: 0.41,
    date: "2025-04-19T17:40:00Z",
    status: "Open",
    premium: false,
    result: null
  }
];

// Исправление для удаления дублирования свойства signalCount
export const kols: KOL[] = [
  {
    id: 1,
    name: "Crypto Master",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Former Wall Street trader with 7+ years in crypto. Specializing in BTC and ETH technical analysis.",
    platforms: [
      { name: "Twitter", url: "https://twitter.com/cryptomaster", followers: 145000 },
      { name: "Telegram", url: "https://t.me/cryptomaster", followers: 52000 },
    ],
    language: "EN",
    signalFrequency: "Daily",
    accuracy: 78,
    engagement: 67,
    reputation: "Clean",
    premium: false,
    statistics: {
      successRate: [
        { month: "Jan", rate: 75 },
        { month: "Feb", rate: 82 },
        { month: "Mar", rate: 78 },
        { month: "Apr", rate: 80 },
        { month: "May", rate: 77 }
      ],
      performance: 320
    }
  },
  {
    id: 2,
    name: "Altcoin Alchemist",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    bio: "Passionate about discovering the next hidden gems in altcoins. Focused on long-term growth.",
    platforms: [
      { name: "Telegram", url: "https://t.me/altcoin", followers: 88000 },
      { name: "YouTube", url: "https://youtube.com/altcoin", followers: 35000 },
    ],
    language: "EN",
    signalFrequency: "Weekly",
    accuracy: 65,
    engagement: 55,
    reputation: "Clean",
    premium: true,
    statistics: {
      successRate: [
        { month: "Jan", rate: 60 },
        { month: "Feb", rate: 68 },
        { month: "Mar", rate: 62 },
        { month: "Apr", rate: 65 },
        { month: "May", rate: 63 }
      ],
      performance: 210
    }
  },
  {
    id: 3,
    name: "Trading Titan",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    bio: "Expert in short-term trading and leveraging market volatility. Risk management is my top priority.",
    platforms: [
      { name: "Twitter", url: "https://twitter.com/titan", followers: 210000 },
      { name: "Discord", url: "https://discord.gg/titan", followers: 95000 },
    ],
    language: "RU",
    signalFrequency: "Hourly",
    accuracy: 82,
    engagement: 72,
    reputation: "Clean",
    premium: false,
    statistics: {
      successRate: [
        { month: "Jan", rate: 85 },
        { month: "Feb", rate: 80 },
        { month: "Mar", rate: 88 },
        { month: "Apr", rate: 79 },
        { month: "May", rate: 83 }
      ],
      performance: 450
    }
  },
  {
    id: 4,
    name: "Crypto Visionary",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    bio: "Focused on identifying long-term trends and investment opportunities in the crypto space.",
    platforms: [
      { name: "YouTube", url: "https://youtube.com/visionary", followers: 60000 },
      { name: "Telegram", url: "https://t.me/visionary", followers: 40000 },
    ],
    language: "EN",
    signalFrequency: "Weekly",
    accuracy: 70,
    engagement: 60,
    reputation: "Clean",
    premium: true,
    statistics: {
      successRate: [
        { month: "Jan", rate: 68 },
        { month: "Feb", rate: 72 },
        { month: "Mar", rate: 65 },
        { month: "Apr", rate: 70 },
        { month: "May", rate: 67 }
      ],
      performance: 280
    }
  },
  {
    id: 5,
    name: "Blockchain Baron",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: "Specializes in blockchain technology and its impact on various industries. Providing insights and analysis.",
    platforms: [
      { name: "Twitter", url: "https://twitter.com/baron", followers: 180000 },
      { name: "Medium", url: "https://medium.com/@baron", followers: 75000 },
    ],
    language: "EN",
    signalFrequency: "Daily",
    accuracy: 75,
    engagement: 65,
    reputation: "Clean",
    premium: false,
    statistics: {
      successRate: [
        { month: "Jan", rate: 72 },
        { month: "Feb", rate: 78 },
        { month: "Mar", rate: 75 },
        { month: "Apr", rate: 73 },
        { month: "May", rate: 77 }
      ],
      performance: 350
    }
  },
  {
    id: 6,
    name: "DeFi Diva",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    bio: "Exploring the world of decentralized finance and its potential for financial revolution.",
    platforms: [
      { name: "Telegram", url: "https://t.me/diva", followers: 92000 },
      { name: "Discord", url: "https://discord.gg/diva", followers: 68000 },
    ],
    language: "RU",
    signalFrequency: "Weekly",
    accuracy: 68,
    engagement: 58,
    reputation: "Clean",
    premium: true,
    statistics: {
      successRate: [
        { month: "Jan", rate: 65 },
        { month: "Feb", rate: 70 },
        { month: "Mar", rate: 63 },
        { month: "Apr", rate: 68 },
        { month: "May", rate: 66 }
      ],
      performance: 260
    }
  },
  {
    id: 7,
    name: "Market Maverick",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    bio: "Analyzing market trends and providing actionable insights for traders and investors.",
    platforms: [
      { name: "Twitter", url: "https://twitter.com/maverick", followers: 230000 },
      { name: "YouTube", url: "https://youtube.com/maverick", followers: 110000 },
    ],
    language: "EN",
    signalFrequency: "Daily",
    accuracy: 80,
    engagement: 70,
    reputation: "Clean",
    premium: false,
    statistics: {
      successRate: [
        { month: "Jan", rate: 78 },
        { month: "Feb", rate: 82 },
        { month: "Mar", rate: 80 },
        { month: "Apr", rate: 79 },
        { month: "May", rate: 81 }
      ],
      performance: 400
    }
  },
  {
    id: 8,
    name: "Crypto Oracle",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    bio: "Predicting market movements and identifying lucrative opportunities in the crypto space.",
    platforms: [
      { name: "Telegram", url: "https://t.me/oracle", followers: 105000 },
      { name: "Discord", url: "https://discord.gg/oracle", followers: 72000 },
    ],
    language: "RU",
    signalFrequency: "Weekly",
    accuracy: 72,
    engagement: 62,
    reputation: "Clean",
    premium: true,
    statistics: {
      successRate: [
        { month: "Jan", rate: 70 },
        { month: "Feb", rate: 75 },
        { month: "Mar", rate: 72 },
        { month: "Apr", rate: 71 },
        { month: "May", rate: 73 }
      ],
      performance: 300
    }
  },
  {
    id: 9,
    name: "Trading Tactician",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    bio: "Developing and implementing effective trading strategies for maximizing profits and minimizing risks.",
    platforms: [
      { name: "Twitter", url: "https://twitter.com/tactician", followers: 250000 },
      { name: "YouTube", url: "https://youtube.com/tactician", followers: 120000 },
    ],
    language: "EN",
    signalFrequency: "Daily",
    accuracy: 85,
    engagement: 75,
    reputation: "Clean",
    premium: false,
    statistics: {
      successRate: [
        { month: "Jan", rate: 82 },
        { month: "Feb", rate: 85 },
        { month: "Mar", rate: 83 },
        { month: "Apr", rate: 84 },
        { month: "May", rate: 86 }
      ],
      performance: 480
    }
  },
  {
    id: 10,
    name: "Crypto Alchemist",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    bio: "Transforming market insights into profitable trading opportunities with precision and expertise.",
    platforms: [
      { name: "Telegram", url: "https://t.me/alchemist", followers: 110000 },
      { name: "Discord", url: "https://discord.gg/alchemist", followers: 75000 },
    ],
    language: "RU",
    signalFrequency: "Weekly",
    accuracy: 74,
    engagement: 64,
    reputation: "Clean",
    premium: true,
    statistics: {
      successRate: [
        { month: "Jan", rate: 72 },
        { month: "Feb", rate: 76 },
        { month: "Mar", rate: 73 },
        { month: "Apr", rate: 74 },
        { month: "May", rate: 75 }
      ],
      performance: 320
    }
  }
];
