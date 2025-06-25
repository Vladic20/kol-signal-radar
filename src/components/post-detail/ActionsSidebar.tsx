
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Bell, Users, TrendingUp } from 'lucide-react';

interface ActionsSidebarProps {
  user: any;
  isPremium: boolean;
}

const ActionsSidebar: React.FC<ActionsSidebarProps> = ({ user, isPremium }) => {
  return (
    <Card className="glass-effect border-white/10 sticky top-6">
      <CardContent className="p-6 space-y-4">
        {!user ? (
          // Not logged in
          <div className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-lg border border-neon-purple/30">
              <h4 className="font-semibold text-white mb-2">🔍 Вы читаете как гость</h4>
              <p className="text-sm text-gray-300 mb-4">
                Войдите, чтобы взаимодействовать с постами и трейдерами
              </p>
              <div className="space-y-2">
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full border-white/20">
                    Регистрация
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : !isPremium ? (
          // Logged in but not premium
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <h4 className="font-semibold text-white">Перейти на Premium</h4>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Получите доступ к закрытым сигналам и эксклюзивному контенту
              </p>
              <ul className="text-xs text-gray-400 mb-4 space-y-1">
                <li>• Полные сигналы от топ-трейдеров</li>
                <li>• Ранний доступ к коллам</li>
                <li>• Приватные каналы</li>
                <li>• Продвинутая аналитика</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90">
                Подписаться за $29/мес
              </Button>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
              <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Уведомления
              </h5>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full text-xs border-white/20">
                  <Bell className="w-3 h-3 mr-2" />
                  Следить за сигналами
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs border-white/20">
                  <Users className="w-3 h-3 mr-2" />
                  Новые подписчики
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Premium user
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-white">Premium Active</h4>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                У вас есть доступ ко всем премиум функциям
              </p>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
              <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Быстрые действия
              </h5>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full text-xs border-white/20">
                  Добавить в портфель
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs border-white/20">
                  Скопировать сигнал
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs border-white/20">
                  Настроить алерты
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="p-4 bg-black/20 rounded-lg border border-white/10">
          <h5 className="font-medium text-white mb-3">📊 Статистика платформы</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Активных трейдеров</span>
              <span className="text-white">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Сигналов сегодня</span>
              <span className="text-green-400">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Средний ROI</span>
              <span className="text-green-400">+12.3%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsSidebar;
