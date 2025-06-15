
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
        'Лайки, комменты, фолловинг трейдеров с рейтинговой системой на основе реальных результатов.',
        'Карточки трейдов с детальными обсуждениями, анализом стратегий и комментариями сообщества.',
        'Репутация на основе on-chain данных и win-rate с прозрачной верификацией всех сделок.',
        'Возможность "отвечать сделкой" (торговый баттл) с публичными соревнованиями трейдеров.',
        'Коммьюнити превращается в торговую соцсеть с вирусным ростом и геймификацией.',
        'Интеграция с популярными мессенджерами и социальными сетями для расширения охвата.',
        'Система наставничества, где опытные трейдеры могут обучать новичков за вознаграждение.'
      ]
    },
    {
      type: 'text' as const,
      title: 'Данные и аналитика',
      icon: '📊',
      content: [
        'Win-rate, средний PnL, Drawdown, Sharpe ratio с детализацией по временным периодам и активам.',
        'Dashboard каждого трейдера с визуализацией портфеля, истории сделок и статистики эффективности.',
        'Алгоритмы машинного обучения выделяют эффективных игроков и прогнозируют их будущие результаты.',
        'Инструменты технического анализа не уступают профессиональным терминалам Bloomberg и TradingView.',
        'Система оповещений о важных событиях на рынке и изменениях в портфелях копируемых трейдеров.',
        'Анализ корреляций между различными активами и стратегиями для оптимизации диверсификации.',
        'Бэктестинг стратегий на исторических данных с возможностью моделирования различных сценариев.'
      ]
    },
    {
      type: 'custom' as const,
      title: 'Финансовая модель',
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
        'Бонусная программа за активные трейды и привлечение рефералов с многоуровневой структурой вознаграждений.',
        'Стимулы за фолловеров (Social loop) - чем больше подписчиков, тем выше статус и доходы трейдера.',
        'Геймификация платформы: битвы трейдеров, турниры, лиги с призовыми фондами и рейтинговой системой.',
        'Партнерство с международными KOL\'ами и криптоинфлюенсерами для продвижения в разных регионах.',
        'Создание Web3-коммьюнити и трейдер DAO для децентрализованного управления развитием платформы.',
        'Интеграция с популярными криптовалютными медиа и образовательными платформами.',
        'Запуск программы амбассадоров для органического роста пользовательской базы в ключевых рынках.'
      ]
    },
    {
      type: 'text' as const,
      title: 'Traction',
      icon: '📈',
      content: [
        'MVP готов и протестирован, первые 15+ активных пользователей уже используют платформу ежедневно.',
        'Успешная интеграция с ведущими биржами (Bybit, Binance) с планами расширения на 6+ бирж.',
        'Положительные отзывы от трейдеров — высокий интерес к социальным функциям и простоте использования.',
        'Готовы к полномасштабному запуску копитрейдинга в июле 2025 года с полным функционалом.',
        'Заключены предварительные соглашения с 3 крупными криптофондами для тестирования платформы.',
        'Команда разработки из 8 специалистов с опытом в финтех и криптовалютной индустрии.',
        'Подготовлена маркетинговая стратегия с бюджетом на первые 6 месяцев активного продвижения.'
      ]
    },
    {
      type: 'text' as const,
      title: 'Pitch: зачем инвестировать',
      icon: '💸',
      content: [
        'Ниша социального копитрейдинга практически не занята, хотя спрос на такие решения огромен и растет.',
        'Уникальная комбинация копитрейдинга и социальных функций создает вирусный эффект роста пользователей.',
        'Финансовая модель уже проработана и прибыльна даже без собственного токена или сложных схем.',
        'Мы не строим хайп-проект — мы создаем реальный продукт с понятной ценностью для пользователей.',
        'Команда имеет опыт успешного запуска финтех-продуктов и глубокое понимание криптовалютного рынка.',
        'Первые результаты показывают высокую пользовательскую вовлеченность и готовность платить за сервис.',
        'Масштабируемость решения позволяет быстро выйти на международные рынки с минимальными затратами.'
      ],
      footer: '👉 Присоединяйтесь на раннем этапе и займите лидирующую позицию в трейдинг-социальной экосистеме будущего.'
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-8 text-center text-gradient">
            Презентация продукта
          </h1>
          
          <div className="mb-6">
            <PresentationSlide slide={slides[currentSlide]} />
          </div>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full">
              <span className="text-sm text-gray-300 font-medium">
                Слайд {currentSlide + 1} из {slides.length}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
