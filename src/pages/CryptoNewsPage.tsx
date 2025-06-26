import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { NewsCard } from '@/components/ui/news-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';

// Mock news data
const mockNews = [
  {
    id: 1,
    title: "Bitcoin достиг нового максимума в $73,000",
    excerpt: "Крупнейшая криптовалюта показывает невероятный рост на фоне институционального интереса",
    imageUrl: "/lovable-uploads/72278c30-fe14-4831-8cbe-39d775b32ead.png",
    category: "Bitcoin",
    publishedAt: "2024-01-15T10:30:00Z",
    source: "CoinDesk",
    url: "#"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Staking Rewards Hit Record Numbers",
    excerpt: "Сеть Ethereum демонстрирует беспрецедентное участие в стейкинге, поскольку пользователи блокируют ETH для привлекательных возможностей получения дохода.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
    category: "Ethereum",
    publishedAt: "2024-01-14T15:45:00Z",
    source: "ETH Daily",
    url: "#"
  },
  {
    id: 3,
    title: "DOGE Sees Massive Rally After Elon Musk Tweet",
    excerpt: "Dogecoin испытал 40% рост после загадочного твита генерального директора Tesla, подчеркивая продолжающееся влияние социальных сетей на мем-монеты.",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop",
    category: "DOGE",
    publishedAt: "2024-01-13T09:20:00Z",
    source: "Meme Crypto Weekly",
    url: "#"
  },
  {
    id: 4,
    title: "Shiba Inu Announces Major Ecosystem Update",
    excerpt: "Команда SHIB раскрывает планы по улучшению функций полезности и совместимости между сетями в своей предстоящей дорожной карте.",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop",
    category: "Shiba Inu",
    publishedAt: "2024-01-12T14:15:00Z",
    source: "Shib Central",
    url: "#"
  },
  {
    id: 5,
    title: "Uniswap V4 Launch Brings Revolutionary Features",
    excerpt: "Последняя версия Uniswap представляет хуки и другие продвинутые функции, которые обещают изменить торговлю в DeFi.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    category: "Uniswap V4",
    publishedAt: "2024-01-11T11:30:00Z",
    source: "DeFi Pulse",
    url: "#"
  },
  {
    id: 6,
    title: "PancakeSwap Reaches $100B in Total Volume",
    excerpt: "DEX на основе BSC отмечает важную веху, поскольку объем торгов превышает отметку в $100 миллиардов.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
    category: "PancakeSwap",
    publishedAt: "2024-01-10T16:45:00Z",
    source: "Pancake News",
    url: "#"
  },
  {
    id: 7,
    title: "Binance Launches New Futures Trading Features",
    excerpt: "The worlds largest crypto exchange introduces advanced order types and risk management tools for professional traders.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    category: "Binance",
    publishedAt: "2024-01-09T13:20:00Z",
    source: "Binance Blog",
    url: "#"
  },
  {
    id: 8,
    title: "Coinbase Expands to 10 New Countries",
    excerpt: "The US-based exchange continues global expansion efforts, bringing crypto services to emerging markets.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    category: "Coinbase",
    publishedAt: "2024-01-08T10:15:00Z",
    source: "Coinbase News",
    url: "#"
  },
  {
    id: 9,
    title: "New DeFi Protocol Launches on Testnet",
    excerpt: "A revolutionary lending protocol begins testing phase with innovative features that could change DeFi lending forever.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
    category: "New DeFi Protocol",
    publishedAt: "2024-01-07T12:00:00Z",
    source: "DeFi Labs",
    url: "#"
  },
  {
    id: 10,
    title: "NFT Gaming Platform Enters Beta Testing",
    excerpt: "Early access users get first look at the next generation of blockchain gaming with play-to-earn mechanics.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
    category: "NFT Gaming Platform",
    publishedAt: "2024-01-06T14:30:00Z",
    source: "GameFi Today",
    url: "#"
  }
];

const CryptoNewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredNews = mockNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || news.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout showSidebar={true}>
      <div className="py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          Криптовалютные новости
        </h1>
        
        {/* Search and Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск новостей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-white/10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="bitcoin">Bitcoin</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="defi">DeFi</SelectItem>
              <SelectItem value="nft">NFT</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black/40 border-white/10">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Сначала новые</SelectItem>
              <SelectItem value="oldest">Сначала старые</SelectItem>
              <SelectItem value="popular">Популярные</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-white/20">
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map(news => (
            <NewsCard 
              key={news.id} 
              title={news.title}
              excerpt={news.excerpt}
              imageUrl={news.imageUrl}
              category={news.category}
              publishedAt={news.publishedAt}
              source={news.source}
              url={news.url}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-white/20">
            Загрузить ещё новости
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CryptoNewsPage;
