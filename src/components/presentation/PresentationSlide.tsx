
import React from 'react';

interface SlideData {
  type: 'image' | 'text';
  src?: string;
  title: string;
  icon?: string;
  content?: string[];
  footer?: string;
}

interface PresentationSlideProps {
  slide: SlideData;
}

export const PresentationSlide: React.FC<PresentationSlideProps> = ({ slide }) => {
  if (slide.type === 'image') {
    return (
      <div className="w-full h-[600px] glass-effect rounded-xl overflow-hidden">
        <img
          src={slide.src}
          alt={slide.title}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[600px] glass-effect rounded-xl p-8 flex flex-col justify-center">
      <div className="text-center mb-8">
        {slide.icon && (
          <div className="text-6xl mb-4">{slide.icon}</div>
        )}
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-6">
          {slide.title}
        </h2>
        
        {slide.content && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {slide.content.map((item, index) => (
              <div
                key={index}
                className="text-lg text-gray-300 p-4 bg-black/20 rounded-lg border border-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        )}
        
        {slide.footer && (
          <div className="mt-8 p-6 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-lg border border-neon-purple/30">
            <p className="text-xl text-white font-medium">
              {slide.footer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
