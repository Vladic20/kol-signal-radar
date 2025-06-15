import React from 'react';
import Layout from '@/components/layout/Layout';
import { PresentationSlide } from '@/components/presentation/PresentationSlide';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  type: 'image' | 'text' | 'custom';
  src?: string;
  title: string;
  icon?: string;
  content?: string[];
  footer?: string;
  customComponent?: string;
}

const PresentationPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides: SlideData[] = [
    {
      type: 'custom' as const,
      title: 'Копитрейдинг',
      customComponent: 'CopyTradingSlide'
    },
    {
      type: 'custom' as const,
      title: 'Проблема',
      customComponent: 'ProblemSlide'
    },
    {
      type: 'custom' as const,
      title: 'Целевая аудитория',
      customComponent: 'TargetAudienceSlide'
    },
    {
      type: 'custom' as const,
      title: 'Что уже сделано',
      customComponent: 'CompletedWorkSlide'
    },
    {
      type: 'custom' as const,
      title: 'Интеграции',
      customComponent: 'IntegrationsSlide'
    },
    {
      type: 'text' as const,
      title: 'Social Layer = 100x',
      icon: '🧬',
      content: [
        'Лайки, комменты, фолловинг трейдеров.',
        'Карточки трейдов с обсуждениями.',
        'Репутация на основе on-chain данных и win-rate.',
        'Возможность "отвечать сделкой" (торговый баттл).',
        'Коммьюнити превращается в торговую соцсеть с вирусным ростом.'
      ]
    },
    {
      type: 'text' as const,
      title: 'Данные и аналитика',
      icon: '📊',
      content: [
        'Win-rate, средний PnL, Drawdown, Sharpe ratio.',
        'Dashboard каждого трейдера.',
        'Алгоритмы выделяют эффективных игроков.',
        'Инструменты не уступают профессиональным терминалам.'
      ]
    },
    {
      type: 'custom' as const,
      title: 'Монетизация',
      customComponent: 'MonetizationSlide'
    },
    {
      type: 'custom' as const,
      title: 'Преимущества проекта',
      customComponent: 'AdvantagesSlide'
    },
    {
      type: 'custom' as const,
      title: 'Roadmap',
      customComponent: 'RoadmapSlide'
    },
    {
      type: 'text' as const,
      title: 'Стратегия роста',
      icon: '🚀',
      content: [
        'Бонусы за трейды и рефералов',
        'Стимулы за фолловеров (Social loop)',
        'Гемификация (битвы трейдеров)',
        'Интернациональные KOL\'ы',
        'Web3-коммьюнити и трейдер DAO'
      ]
    },
    {
      type: 'text' as const,
      title: 'Traction',
      icon: '📈',
      content: [
        'MVP готов, первые 15+ пользователей',
        'Интеграция биржам (Bybit, Binance)',
        'Отзывы от трейдеров — высокий интерес',
        'Готовы к запуску копитрейдинга в июле'
      ]
    },
    {
      type: 'text' as const,
      title: 'Pitch: зачем инвестировать',
      icon: '💸',
      content: [
        'Ниша не занята, хотя спрос огромен',
        'Copytrading + social = взрывной рост',
        'Модель прибыли уже рабочая, даже без токена',
        'Мы не строим хайп, мы строим продукт'
      ],
      footer: '👉 Присоединяйтесь на раннем этапе и займите лидирующую позицию в трейдинг-социальной экосистеме.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background animate-fade-in">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-12 text-center text-gradient">
            Презентация продукта
          </h1>
          
          <div className="mb-8">
            <PresentationSlide slide={slides[currentSlide]} />
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full">
              <span className="text-sm text-gray-300 font-medium">
                Слайд {currentSlide + 1} из {slides.length}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-3 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue scale-110'
                    : 'bg-white/20 hover:bg-white/40 hover:scale-105'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="glass-effect border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => goToSlide(0)}
                className="glass-effect border-white/20 hover:bg-white/10"
              >
                В начало
              </Button>
            </div>
            
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далее
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PresentationPage;
