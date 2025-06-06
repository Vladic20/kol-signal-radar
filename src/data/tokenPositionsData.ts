
export interface TokenPositionData {
  token: string;
  name: string;
  long: number;
  short: number;
  volume: number;
  price: number;
  change24h: number;
}

export const tokenPositionsData: TokenPositionData[] = [
  {
    token: "BTC",
    name: "Bitcoin",
    long: 65,
    short: 35,
    volume: 2500000000,
    price: 43500,
    change24h: 2.3
  },
  {
    token: "ETH",
    name: "Ethereum",
    long: 58,
    short: 42,
    volume: 1800000000,
    price: 2650,
    change24h: -1.2
  },
  {
    token: "SOL",
    name: "Solana",
    long: 72,
    short: 28,
    volume: 450000000,
    price: 98.5,
    change24h: 5.7
  },
  {
    token: "ADA",
    name: "Cardano",
    long: 45,
    short: 55,
    volume: 320000000,
    price: 0.52,
    change24h: -3.1
  },
  {
    token: "AVAX",
    name: "Avalanche",
    long: 68,
    short: 32,
    volume: 280000000,
    price: 36.8,
    change24h: 4.2
  },
  {
    token: "DOT",
    name: "Polkadot",
    long: 52,
    short: 48,
    volume: 195000000,
    price: 7.25,
    change24h: 0.8
  },
  {
    token: "MATIC",
    name: "Polygon",
    long: 61,
    short: 39,
    volume: 380000000,
    price: 0.89,
    change24h: 2.9
  },
  {
    token: "LINK",
    name: "Chainlink",
    long: 59,
    short: 41,
    volume: 290000000,
    price: 14.8,
    change24h: -0.5
  },
  {
    token: "UNI",
    name: "Uniswap",
    long: 48,
    short: 52,
    volume: 210000000,
    price: 6.7,
    change24h: -2.8
  },
  {
    token: "ATOM",
    name: "Cosmos",
    long: 66,
    short: 34,
    volume: 165000000,
    price: 10.2,
    change24h: 3.4
  },
  {
    token: "ICP",
    name: "Internet Computer",
    long: 44,
    short: 56,
    volume: 145000000,
    price: 5.1,
    change24h: -4.2
  },
  {
    token: "ALGO",
    name: "Algorand",
    long: 57,
    short: 43,
    volume: 125000000,
    price: 0.18,
    change24h: 1.7
  }
];
