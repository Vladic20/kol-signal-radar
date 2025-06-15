
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PresentationSlide } from '@/components/presentation/PresentationSlide';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PresentationPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      type: 'image',
      src: '/lovable-uploads/b2df216b-2b9d-4247-99e9-77b4bc081bc8.png',
      title: 'Копитрейдинг'
    },
    {
      type: 'image',
      src: '/lovable-uploads/e518731e-1a7f-4288-8ad2-8ca401417d89.png',
      title: 'Проблема'
    },
    {
      type: 'image',
      src: '/lovable-uploads/5145d53b-ec6d-4c1f-86d8-06c554c60e09.png',
      title: 'Целевая аудитория'
    },
    {
      type: 'image',
      src: '/lovable-uploads/353079b5-d0b4-415d-a271-bc1f7d7de5dd.png',
      title: 'Что уже сделано'
    },
    {
      type: 'image',
      src: '/lovable-uploads/3a647144-882c-403a-b954-aaeb7e293c1c.png',
      title: 'Интеграции'
    },
    {
      type: 'text',
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
      type: 'text',
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
      type: 'image',
      src: '/lovable-uploads/72278c30-fe14-4831-8cbe-39d775b32ead.png',
      title: 'Монетизация'
    },
    {
      type: 'image',
      src: '/lovable-uploads/a98b2e54-acfa-44f5-80f2-f18b42022c87.png',
      title: 'Преимущества проекта'
    },
    {
      type: 'image',
      src: '/lovable-uploads/5d82d667-da03-47aa-a82a-16f1a002cc05.png',
      title: 'Roadmap'
    },
    {
      type: 'text',
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
      type: 'text',
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
      type: 'text',
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
      <div className="py-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Презентация продукта
          </h1>
          
          {/* Slide Display */}
          <div className="relative mb-8">
            <PresentationSlide slide={slides[currentSlide]} />
            
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 hover:bg-black/70"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 hover:bg-black/70"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Slide Counter */}
          <div className="text-center mb-6">
            <span className="text-gray-400">
              {currentSlide + 1} из {slides.length}
            </span>
          </div>
          
          {/* Slide Dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-neon-purple'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="border-white/20"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Предыдущий
            </Button>
            
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
            >
              Следующий
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PresentationPage;
