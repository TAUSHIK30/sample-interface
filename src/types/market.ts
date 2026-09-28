export type CategoryType = 
  | 'indices' 
  | 'crypto' 
  | 'futures' 
  | 'forex' 
  | 'bonds' 
  | 'commodities'
  | 'stocks';

export type RegionType = 'everywhere' | 'us' | 'europe' | 'asia';

export interface ChartPoint {
  time: string;
  price: number;
}

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  subName?: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  category: CategoryType;
  badgeNumber?: string;
  badgeColor?: string;
  iconType?: 'nvda' | 'aapl' | 'msft' | 'tsla' | 'btc' | 'eth' | 'gold' | 'oil' | 'flag-us' | 'flag-eu' | 'flag-jp' | 'flag-gb' | 'generic';
  sparkline: number[];
  dayHigh: number;
  dayLow: number;
  open: number;
  prevClose: number;
  week52High: number;
  week52Low: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  divYield?: string;
  description: string;
  history?: {
    '1D': ChartPoint[];
    '5D': ChartPoint[];
    '1M': ChartPoint[];
    '1Y': ChartPoint[];
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  sourceIcon?: string;
  timeAgo: string;
  category: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  readTime: string;
  summary: string;
  content: string;
  relatedSymbols: string[];
}

export interface CommunityIdea {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorReputation: number;
  title: string;
  symbol: string;
  timeframe: string;
  bias: 'LONG' | 'SHORT';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  likesCount: number;
  commentsCount: number;
  publishedTime: string;
  description: string;
  tags: string[];
  isLiked?: boolean;
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  country: string;
  flag: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  forecast: string;
  previous: string;
  actual?: string;
}
