import React from 'react';
import { Copy, TrendingUp, Users, Shield } from 'lucide-react';
export const CopyTradingSlide: React.FC = () => {
  return <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-pulse-light">📈</div>
        <h1 className="text-5xl font-bold text-gradient mb-6">Копитрейдинг</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Автоматическое копирование сделок успешных трейдеров с полной прозрачностью и контролем
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
          <Copy className="w-12 h-12 text-neon-blue mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Автокопирование</h3>
          <p className="text-gray-300">Мгновенное повторение сделок лучших трейдеров</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
          <TrendingUp className="w-12 h-12 text-neon-green mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Высокая доходность</h3>
          <p className="text-gray-300">Следуйте за трейдерами с подтвержденной прибыльностью</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
          <Users className="w-12 h-12 text-neon-purple mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Социальная торговля</h3>
          <p className="text-gray-300">Обсуждения, рейтинги и сообщество трейдеров</p>
        </div>

        <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
          <Shield className="w-12 h-12 text-neon-blue mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Полный контроль</h3>
          <p className="text-gray-300">Управление рисками и лимитами в реальном времени</p>
        </div>
      </div>

      <div className="glass-effect p-8 rounded-2xl border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Преимущества платформы</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green mb-2">5%</div>
            <p className="text-gray-300">Минимальная комиссия</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue mb-2">24/7</div>
            <p className="text-gray-300">Круглосуточная торговля</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple mb-2">100+</div>
            <p className="text-gray-300">Проверенных трейдеров</p>
          </div>
        </div>
      </div>
    </div>;
};