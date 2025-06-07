
export interface TradingViewCaller {
  id: number;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  ideas: number;
  likes: number;
  scripts: number;
  reputation: 'Excellent' | 'Good' | 'Average';
  accuracy: number;
  winRate: number;
  avgProfit: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  tradingStyle: string;
  bio: string;
  joined: string;
  lastActive: string;
  premium: boolean;
  verified: boolean;
  language: 'EN' | 'RU' | 'Both';
  specialization: string[];
  recentIdeas: {
    id: number;
    title: string;
    symbol: string;
    direction: 'Long' | 'Short';
    timeframe: string;
    profit: number;
    date: string;
    image: string;
  }[];
}

export const tradingViewCallers: TradingViewCaller[] = [
  {
    id: 1,
    name: "CryptoMaster Pro",
    username: "cryptomaster_pro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    followers: 45230,
    ideas: 1250,
    likes: 28900,
    scripts: 45,
    reputation: 'Excellent',
    accuracy: 87,
    winRate: 78,
    avgProfit: 15.5,
    riskLevel: 'Medium',
    tradingStyle: "Swing Trading",
    bio: "Professional trader with 8+ years of experience in cryptocurrency markets. Specialized in technical analysis and market structure.",
    joined: "2019-03-15",
    lastActive: "2024-01-15",
    premium: true,
    verified: true,
    language: 'EN',
    specialization: ['BTC', 'ETH', 'DeFi', 'Technical Analysis'],
    recentIdeas: [
      {
        id: 1,
        title: "BTC Breaking Major Resistance - Target $50K",
        symbol: "BTCUSDT",
        direction: 'Long',
        timeframe: "4H",
        profit: 12.5,
        date: "2024-01-14",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "ETH Consolidation Before Next Move",
        symbol: "ETHUSDT",
        direction: 'Long',
        timeframe: "1D",
        profit: 8.3,
        date: "2024-01-12",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: 2,
    name: "Алтcoin Аналитик",
    username: "altcoin_analytics_ru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    followers: 23450,
    ideas: 890,
    likes: 15600,
    scripts: 12,
    reputation: 'Good',
    accuracy: 79,
    winRate: 71,
    avgProfit: 11.2,
    riskLevel: 'High',
    tradingStyle: "Scalping",
    bio: "Специализируюсь на анализе альткоинов и поиске недооцененных проектов. Активно торгую на волатильности.",
    joined: "2020-07-22",
    lastActive: "2024-01-15",
    premium: false,
    verified: true,
    language: 'RU',
    specialization: ['Altcoins', 'DeFi', 'GameFi', 'Scalping'],
    recentIdeas: [
      {
        id: 3,
        title: "SOL готова к прорыву - цель $120",
        symbol: "SOLUSDT",
        direction: 'Long',
        timeframe: "1H",
        profit: 18.7,
        date: "2024-01-13",
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: 3,
    name: "TechAnalyst",
    username: "tech_analyst_tv",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    followers: 67890,
    ideas: 2100,
    likes: 45300,
    scripts: 78,
    reputation: 'Excellent',
    accuracy: 91,
    winRate: 85,
    avgProfit: 19.8,
    riskLevel: 'Low',
    tradingStyle: "Position Trading",
    bio: "Senior technical analyst with expertise in chart patterns and market psychology. Focus on high-probability setups.",
    joined: "2018-11-08",
    lastActive: "2024-01-15",
    premium: true,
    verified: true,
    language: 'Both',
    specialization: ['Technical Analysis', 'Chart Patterns', 'Market Psychology', 'Risk Management'],
    recentIdeas: [
      {
        id: 4,
        title: "Major Support Level Hold - BTC Long Setup",
        symbol: "BTCUSDT",
        direction: 'Long',
        timeframe: "1D",
        profit: 22.1,
        date: "2024-01-11",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        title: "MATIC Triangle Breakout Imminent",
        symbol: "MATICUSDT",
        direction: 'Long',
        timeframe: "4H",
        profit: 15.4,
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop"
      }
    ]
  }
];
