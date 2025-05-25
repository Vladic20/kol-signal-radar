
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { NewsCard } from '@/components/ui/news-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Coins, ArrowRightLeft, Building2, FlaskConical } from 'lucide-react';

const CryptoNewsPage = () => {
  const { language } = useLanguage();

  // Mock news data for different categories
  const newsData = {
    cryptocurrency: [
      {
        id: 1,
        title: language === 'en' ? 'Bitcoin Reaches New All-Time High Above $70,000' : 'Биткоин достигает нового исторического максимума выше $70,000',
        excerpt: language === 'en' 
          ? 'Bitcoin surged to unprecedented levels as institutional adoption continues to grow, with major corporations adding BTC to their treasury reserves.'
          : 'Биткоин взлетел до беспрецедентных уровней, поскольку институциональное принятие продолжает расти, а крупные корпорации добавляют BTC в свои казначейские резервы.',
        category: language === 'en' ? 'Cryptocurrency' : 'Криптовалюты',
        publishedAt: '2024-01-15T10:30:00Z',
        source: 'CryptoNews Today',
        imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=500&h=300&fit=crop',
        url: 'https://example.com/bitcoin-ath'
      },
      {
        id: 2,
        title: language === 'en' ? 'Ethereum 2.0 Staking Rewards Hit Record Numbers' : 'Награды за стейкинг Ethereum 2.0 достигают рекордных значений',
        excerpt: language === 'en'
          ? 'The Ethereum network sees unprecedented staking participation as users lock up ETH for attractive yield opportunities.'
          : 'Сеть Ethereum демонстрирует беспрецедентное участие в стейкинге, поскольку пользователи блокируют ETH для привлекательных возможностей получения дохода.',
        category: language === 'en' ? 'Cryptocurrency' : 'Криптовалюты',
        publishedAt: '2024-01-14T15:45:00Z',
        source: 'ETH Daily',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop'
      }
    ],
    memcoin: [
      {
        id: 3,
        title: language === 'en' ? 'DOGE Sees Massive Rally After Elon Musk Tweet' : 'DOGE демонстрирует массовый рост после твита Илона Маска',
        excerpt: language === 'en'
          ? 'Dogecoin experienced a 40% surge following a cryptic tweet from Tesla CEO, highlighting the continued influence of social media on meme coins.'
          : 'Dogecoin испытал 40% рост после загадочного твита генерального директора Tesla, подчеркивая продолжающееся влияние социальных сетей на мем-монеты.',
        category: language === 'en' ? 'Memcoin' : 'Мемкоины',
        publishedAt: '2024-01-13T09:20:00Z',
        source: 'Meme Crypto Weekly',
        imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop'
      },
      {
        id: 4,
        title: language === 'en' ? 'Shiba Inu Announces Major Ecosystem Update' : 'Shiba Inu анонсирует крупное обновление экосистемы',
        excerpt: language === 'en'
          ? 'The SHIB team reveals plans for enhanced utility features and cross-chain compatibility in their upcoming roadmap.'
          : 'Команда SHIB раскрывает планы по улучшению функций полезности и совместимости между сетями в своей предстоящей дорожной карте.',
        category: language === 'en' ? 'Memcoin' : 'Мемкоины',
        publishedAt: '2024-01-12T14:15:00Z',
        source: 'Shib Central'
      }
    ],
    dex: [
      {
        id: 5,
        title: language === 'en' ? 'Uniswap V4 Launch Brings Revolutionary Features' : 'Запуск Uniswap V4 приносит революционные функции',
        excerpt: language === 'en'
          ? 'The latest version of Uniswap introduces hooks and other advanced features that promise to reshape DeFi trading.'
          : 'Последняя версия Uniswap представляет хуки и другие продвинутые функции, которые обещают изменить торговлю в DeFi.',
        category: 'DEX',
        publishedAt: '2024-01-11T11:30:00Z',
        source: 'DeFi Pulse',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
      },
      {
        id: 6,
        title: language === 'en' ? 'PancakeSwap Reaches $100B in Total Volume' : 'PancakeSwap достигает $100 млрд общего объема',
        excerpt: language === 'en'
          ? 'The BSC-based DEX celebrates a major milestone as trading volume surpasses the $100 billion mark.'
          : 'DEX на основе BSC отмечает важную веху, поскольку объем торгов превышает отметку в $100 миллиардов.',
        category: 'DEX',
        publishedAt: '2024-01-10T16:45:00Z',
        source: 'Pancake News'
      }
    ],
    exchanges: [
      {
        id: 7,
        title: language === 'en' ? 'Binance Launches New Futures Trading Features' : 'Binance запускает новые функции фьючерсной торговли',
        excerpt: language === 'en'
          ? 'The worlds largest crypto exchange introduces advanced order types and risk management tools for professional traders.'
          : 'Крупнейшая в мире криптовалютная биржа представляет продвинутые типы ордеров и инструменты управления рисками для профессиональных трейдеров.',
        category: language === 'en' ? 'Exchanges' : 'Биржи',
        publishedAt: '2024-01-09T13:20:00Z',
        source: 'Binance Blog',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop'
      },
      {
        id: 8,
        title: language === 'en' ? 'Coinbase Expands to 10 New Countries' : 'Coinbase расширяется на 10 новых стран',
        excerpt: language === 'en'
          ? 'The US-based exchange continues global expansion efforts, bringing crypto services to emerging markets.'
          : 'Базирующаяся в США биржа продолжает усилия по глобальному расширению, предоставляя криптовалютные услуги развивающимся рынкам.',
        category: language === 'en' ? 'Exchanges' : 'Биржи',
        publishedAt: '2024-01-08T10:15:00Z',
        source: 'Coinbase News'
      }
    ],
    sandbox: [
      {
        id: 9,
        title: language === 'en' ? 'New DeFi Protocol Launches on Testnet' : 'Новый DeFi протокол запускается в тестовой сети',
        excerpt: language === 'en'
          ? 'A revolutionary lending protocol begins testing phase with innovative features that could change DeFi lending forever.'
          : 'Революционный протокол кредитования начинает фазу тестирования с инновационными функциями, которые могут навсегда изменить кредитование в DeFi.',
        category: language === 'en' ? 'Sandbox' : 'Песочница',
        publishedAt: '2024-01-07T12:00:00Z',
        source: 'DeFi Labs',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop'
      },
      {
        id: 10,
        title: language === 'en' ? 'NFT Gaming Platform Enters Beta Testing' : 'Игровая платформа NFT входит в бета-тестирование',
        excerpt: language === 'en'
          ? 'Early access users get first look at the next generation of blockchain gaming with play-to-earn mechanics.'
          : 'Пользователи раннего доступа получают первый взгляд на следующее поколение блокчейн-игр с механикой игры для заработка.',
        category: language === 'en' ? 'Sandbox' : 'Песочница',
        publishedAt: '2024-01-06T14:30:00Z',
        source: 'GameFi Today'
      }
    ]
  };

  const categories = [
    {
      id: 'cryptocurrency',
      label: language === 'en' ? 'Cryptocurrency' : 'Криптовалюты',
      icon: TrendingUp,
      description: language === 'en' ? 'General crypto news, market updates and trends' : 'Общие новости криптовалют, обновления рынка и тенденции'
    },
    {
      id: 'memcoin',
      label: language === 'en' ? 'Memcoin' : 'Мемкоины',
      icon: Coins,
      description: language === 'en' ? 'Meme coin news, price dynamics and community sentiment' : 'Новости мем-монет, динамика цен и настроения сообщества'
    },
    {
      id: 'dex',
      label: 'DEX',
      icon: ArrowRightLeft,
      description: language === 'en' ? 'Decentralized exchange updates, new listings and DeFi developments' : 'Обновления децентрализованных бирж, новые листинги и разработки DeFi'
    },
    {
      id: 'exchanges',
      label: language === 'en' ? 'Exchanges' : 'Биржи',
      icon: Building2,
      description: language === 'en' ? 'Centralized exchange news, regulatory changes and platform features' : 'Новости централизованных бирж, изменения в регулировании и функции платформ'
    },
    {
      id: 'sandbox',
      label: language === 'en' ? 'Sandbox' : 'Песочница',
      icon: FlaskConical,
      description: language === 'en' ? 'Experimental crypto topics, new DeFi projects and test environments' : 'Экспериментальные темы криптовалют, новые проекты DeFi и тестовые среды'
    }
  ];

  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            {language === 'en' ? 'Crypto News Hub' : 'Центр Криптовалютных Новостей'}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Stay updated with the latest cryptocurrency news, market trends, and developments across all major categories'
              : 'Будьте в курсе последних новостей криптовалют, тенденций рынка и разработок во всех основных категориях'}
          </p>
        </div>

        <Tabs defaultValue="cryptocurrency" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/30 border border-white/10 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-blue/20 data-[state=active]:text-white"
                >
                  <IconComponent size={16} />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <category.icon className="text-neon-blue" size={24} />
                  <h2 className="text-2xl font-semibold text-white">{category.label}</h2>
                </div>
                <p className="text-gray-400">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData[category.id as keyof typeof newsData]?.map((news) => (
                  <NewsCard
                    key={news.id}
                    title={news.title}
                    excerpt={news.excerpt}
                    category={news.category}
                    publishedAt={news.publishedAt}
                    imageUrl={news.imageUrl}
                    source={news.source}
                    url={news.url}
                  />
                ))}
              </div>

              {(!newsData[category.id as keyof typeof newsData] || newsData[category.id as keyof typeof newsData].length === 0) && (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    {language === 'en' 
                      ? 'No news available in this category at the moment.'
                      : 'В данной категории пока нет новостей.'}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default CryptoNewsPage;
