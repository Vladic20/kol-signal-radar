
export interface FeedPost {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  authorVerified: boolean;
  content: string;
  images?: string[];
  signal?: {
    symbol: string;
    action: 'BUY' | 'SELL' | 'HOLD';
    target: number;
    stopLoss?: number;
    confidence: number;
  };
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  isLiked?: boolean;
  isPremium?: boolean;
  tags?: string[];
}

export interface Comment {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export const feedPosts: FeedPost[] = [
  {
    id: 1,
    authorId: 1,
    authorName: "CryptoSage",
    authorAvatar: "/lovable-uploads/353079b5-d0b4-415d-a271-bc1f7d7de5dd.png",
    authorVerified: true,
    content: "🚀 Bitcoin показывает сильные сигналы восходящего тренда! Пробитие сопротивления на 45,000$ открывает путь к новым высотам. Фундаментальный анализ также поддерживает бычий сценарий.",
    signal: {
      symbol: "BTC/USDT",
      action: "BUY",
      target: 48000,
      stopLoss: 42000,
      confidence: 85
    },
    timestamp: "2024-12-19T10:30:00Z",
    likes: 234,
    comments: 45,
    reposts: 12,
    isPremium: false,
    tags: ["BTC", "Technical Analysis", "Bull Market"]
  },
  {
    id: 2,
    authorId: 3,
    authorName: "AltcoinHunter",
    authorAvatar: "/lovable-uploads/b2df216b-2b9d-4247-99e9-77b4bc081bc8.png",
    authorVerified: true,
    content: "Ethereum готовится к крупному движению! 📈 Накопление в зоне 2,200-2,300$ создало мощную поддержку. Ожидаю пробитие к 2,800$ в ближайшие недели.",
    images: ["/lovable-uploads/5145d53b-ec6d-4c1f-86d8-06c554c60e09.png"],
    signal: {
      symbol: "ETH/USDT",
      action: "BUY",
      target: 2800,
      stopLoss: 2150,
      confidence: 78
    },
    timestamp: "2024-12-19T09:15:00Z",
    likes: 189,
    comments: 32,
    reposts: 8,
    isPremium: true,
    tags: ["ETH", "Altcoins", "Price Prediction"]
  },
  {
    id: 3,
    authorId: 2,
    authorName: "WhaleTracker",
    authorAvatar: "/lovable-uploads/72278c30-fe14-4831-8cbe-39d775b32ead.png",
    authorVerified: true,
    content: "🐋 Крупный кит только что переместил 50,000 BTC на Coinbase! Это может означать как готовность к продаже, так и институциональную покупку. Следим за движениями рынка внимательно.",
    timestamp: "2024-12-19T08:45:00Z",
    likes: 156,
    comments: 67,
    reposts: 23,
    isPremium: false,
    tags: ["Whale Alert", "Market Analysis", "Bitcoin"]
  },
  {
    id: 4,
    authorId: 4,
    authorName: "DeFiMaster",
    authorAvatar: "/lovable-uploads/a98b2e54-acfa-44f5-80f2-f18b42022c87.png",
    authorVerified: false,
    content: "Новый DeFi протокол показывает интересную динамику! APY в 120% выглядит привлекательно, но не забывайте про риски impermanent loss. DYOR всегда!",
    signal: {
      symbol: "UNI/USDT",
      action: "HOLD",
      target: 15,
      confidence: 65
    },
    timestamp: "2024-12-19T07:30:00Z",
    likes: 92,
    comments: 28,
    reposts: 5,
    isPremium: false,
    tags: ["DeFi", "Yield Farming", "Risk Management"]
  },
  {
    id: 5,
    authorId: 1,
    authorName: "CryptoSage",
    authorAvatar: "/lovable-uploads/353079b5-d0b4-415d-a271-bc1f7d7de5dd.png",
    authorVerified: true,
    content: "⚠️ Важное обновление по SOL! Технический анализ показывает формирование 'голова и плечи' - медвежий паттерн. Рекомендую фиксировать прибыль и ждать коррекции.",
    signal: {
      symbol: "SOL/USDT",
      action: "SELL",
      target: 85,
      stopLoss: 105,
      confidence: 82
    },
    timestamp: "2024-12-19T06:00:00Z",
    likes: 267,
    comments: 89,
    reposts: 34,
    isPremium: true,
    tags: ["SOL", "Technical Analysis", "Risk Warning"]
  }
];

export const postComments: { [postId: number]: Comment[] } = {
  1: [
    {
      id: 1,
      authorId: 5,
      authorName: "TradingNinja",
      authorAvatar: "/lovable-uploads/5d82d667-da03-47aa-a82a-16f1a002cc05.png",
      content: "Полностью согласен! Уже открыл позицию по 44,500$",
      timestamp: "2024-12-19T10:45:00Z",
      likes: 12
    },
    {
      id: 2,
      authorId: 6,
      authorName: "CryptoNewbie",
      authorAvatar: "/lovable-uploads/e518731e-1a7f-4288-8ad2-8ca401417d89.png",
      content: "Какой таймфрейм рекомендуете для этой сделки?",
      timestamp: "2024-12-19T11:00:00Z",
      likes: 8
    }
  ],
  2: [
    {
      id: 3,
      authorId: 7,
      authorName: "EthMaxi",
      authorAvatar: "/lovable-uploads/3a647144-882c-403a-b954-aaeb7e293c1c.png",
      content: "ETH к луне! 🚀 Спасибо за анализ",
      timestamp: "2024-12-19T09:30:00Z",
      likes: 15
    }
  ]
};
