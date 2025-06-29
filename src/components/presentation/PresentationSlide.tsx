
import React from 'react';
import { CopyTradingSlide } from './slides/CopyTradingSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { TargetAudienceSlide } from './slides/TargetAudienceSlide';
import { CompletedWorkSlide } from './slides/CompletedWorkSlide';
import { IntegrationsSlide } from './slides/IntegrationsSlide';
import { MonetizationSlide } from './slides/MonetizationSlide';
import { AdvantagesSlide } from './slides/AdvantagesSlide';
import { RoadmapSlide } from './slides/RoadmapSlide';

interface SlideData {
  type: 'image' | 'text' | 'custom';
  src?: string;
  title: string;
  icon?: string;
  content?: string[];
  footer?: string;
  customComponent?: string;
}

interface PresentationSlideProps {
  slide: SlideData;
}

export const PresentationSlide: React.FC<PresentationSlideProps> = ({ slide }) => {
  // Рендер кастомных компонентов по названию слайда
  if (slide.type === 'custom' || slide.customComponent) {
    switch (slide.title) {
      case 'Копитрейдинг':
        return <CopyTradingSlide />;
      case 'Проблема':
        return <ProblemSlide />;
      case 'Целевая аудитория':
        return <TargetAudienceSlide />;
      case 'Что уже сделано':
        return <CompletedWorkSlide />;
      case 'Интеграции':
        return <IntegrationsSlide />;
      case 'Монетизация':
        return <MonetizationSlide />;
      case 'Преимущества проекта':
        return <AdvantagesSlide />;
      case 'Roadmap':
        return <RoadmapSlide />;
      default:
        break;
    }
  }

  // Рендер текстовых слайдов
  if (slide.type === 'text') {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="glass-effect rounded-2xl p-8 border border-white/10 shadow-2xl bg-gradient-to-br from-black/20 via-black/10 to-transparent">
          <div className="text-center mb-8">
            {slide.icon && (
              <div className="text-6xl mb-6 animate-pulse-light">{slide.icon}</div>
            )}
            <h2 className="text-4xl font-bold text-gradient mb-8">
              {slide.title}
            </h2>
            
            {slide.content && (
              <div className="space-y-4 max-w-4xl mx-auto">
                {slide.content.map((item, index) => (
                  <div
                    key={index}
                    className="text-lg text-gray-200 p-6 glass-effect rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue mt-3 flex-shrink-0"></div>
                      <p className="text-left">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {slide.footer && (
              <div className="mt-10 p-8 glass-effect rounded-xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 shadow-xl">
                <p className="text-xl text-white font-medium leading-relaxed">
                  {slide.footer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Рендер слайдов с изображениями (если остались)
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="glass-effect rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-black/20 to-black/10">
          <h2 className="text-2xl font-bold text-center text-gradient">
            {slide.title}
          </h2>
        </div>
        <div className="p-8 bg-gradient-to-br from-black/10 to-transparent">
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
