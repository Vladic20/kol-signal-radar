
import React from 'react';
import { AlertTriangle, TrendingDown, Users, DollarSign } from 'lucide-react';

export const ProblemSlide: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">⚠️</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Проблема</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Современные проблемы в мире криптотрейдинга требуют инновационных решений
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-effect p-8 rounded-xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent">
          <AlertTriangle className="w-16 h-16 text-red-400 mb-6 mx-auto" />
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Основные проблемы</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">95% трейдеров теряют деньги из-за отсутствия опыта</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Сложность анализа рынка для новичков</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Отсутствие доверенных источников сигналов</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-3 flex-shrink-0"></div>
              <p className="text-gray-300">Изолированность от сообщества трейдеров</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-effect p-6 rounded-xl border border-white/10">
            <TrendingDown className="w-12 h-12 text-red-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Статистика потерь</h4>
            <p className="text-gray-300">Большинство начинающих трейдеров теряют весь капитал в первые месяцы</p>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-white/10">
            <Users className="w-12 h-12 text-yellow-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Отсутствие наставничества</h4>
            <p className="text-gray-300">Нет простого способа учиться у успешных трейдеров</p>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-white/10">
            <DollarSign className="w-12 h-12 text-red-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Высокие барьеры входа</h4>
            <p className="text-gray-300">Сложные инструменты и высокие комиссии</p>
          </div>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Наше решение</h3>
        <p className="text-lg text-gray-200 text-center max-w-4xl mx-auto">
          Мы создаем платформу, которая позволяет новичкам учиться у профессионалов, 
          автоматически копируя их стратегии и получая доступ к сообществу единомышленников.
        </p>
      </div>
    </div>
  );
};
