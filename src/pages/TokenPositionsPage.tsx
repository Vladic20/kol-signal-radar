
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import TokenPositionChart from '@/components/token-positions/TokenPositionChart';
import { tokenPositionsData } from '@/data/tokenPositionsData';

const TokenPositionsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = useMemo(() => {
    return tokenPositionsData.filter(token =>
      token.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleTokenClick = (token: string) => {
    console.log(`Clicked on ${token} for detailed analytics`);
    // Here you would navigate to detailed analytics page
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Long/Short Позиции Токенов
            </h1>
            <p className="text-muted-foreground">
              Анализ соотношения длинных и коротких позиций по криптовалютам
            </p>
          </div>

          {/* Search Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск токенов по названию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Token Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTokens.map((tokenData) => (
              <TokenPositionChart
                key={tokenData.token}
                tokenData={tokenData}
                onClick={() => handleTokenClick(tokenData.token)}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredTokens.length === 0 && (
            <Card className="mt-8">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  Токены не найдены. Попробуйте изменить поисковый запрос.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TokenPositionsPage;
