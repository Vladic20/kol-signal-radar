
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Bell, Users, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActionsSidebarProps {
  user: any;
  isPremium: boolean;
}

const ActionsSidebar: React.FC<ActionsSidebarProps> = ({ user, isPremium }) => {
  const isMobile = useIsMobile();

  return (
    <Card className={`glass-effect border-white/10 ${!isMobile ? 'sticky top-6' : ''}`}>
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'} space-y-4`}>
        {!user ? (
          // Not logged in
          <div className="text-center space-y-4">
            <div className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-lg border border-neon-purple/30`}>
              <h4 className={`font-semibold text-white ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>🔍 Вы читаете как гость</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 ${isMobile ? 'mb-3' : 'mb-4'}`}>
                Войдите, чтобы взаимодействовать с постами и трейдерами
              </p>
              <div className={`space-y-2 ${isMobile ? 'flex flex-col' : ''}`}>
                <Link to="/login">
                  <Button 
                    className={`bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 ${isMobile ? 'w-full text-sm' : 'w-full'}`}
                    size={isMobile ? "sm" : "default"}
                  >
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    className={`border-white/20 ${isMobile ? 'w-full text-sm' : 'w-full'}`}
                    size={isMobile ? "sm" : "default"}
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : !isPremium ? (
          // Logged in but not premium
          <div className="space-y-4">
            <div className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30`}>
              <div className={`flex items-center gap-2 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                <Crown className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                <h4 className={`font-semibold text-white ${isMobile ? 'text-sm' : ''}`}>Перейти на Premium</h4>
              </div>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 ${isMobile ? 'mb-3' : 'mb-4'}`}>
                Получите доступ к закрытым сигналам и эксклюзивному контенту
              </p>
              <ul className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-400 ${isMobile ? 'mb-3' : 'mb-4'} space-y-1`}>
                <li>• Полные сигналы от топ-трейдеров</li>
                <li>• Ранний доступ к коллам</li>
                <li>• Приватные каналы</li>
                <li>• Продвинутая аналитика</li>
              </ul>
              <Button 
                className={`bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 ${isMobile ? 'w-full text-sm' : 'w-full'}`}
                size={isMobile ? "sm" : "default"}
              >
                Подписаться за $29/мес
              </Button>
            </div>

            <div className={`${isMobile ? 'p-3' : 'p-4'} bg-black/20 rounded-lg border border-white/10`}>
              <h5 className={`font-medium text-white ${isMobile ? 'mb-2 text-sm' : 'mb-3'} flex items-center gap-2`}>
                <Bell className="w-4 h-4" />
                Уведомления
              </h5>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-white/20 ${isMobile ? 'w-full text-xs' : 'w-full text-xs'}`}
                >
                  <Bell className="w-3 h-3 mr-2" />
                  Следить за сигналами
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-white/20 ${isMobile ? 'w-full text-xs' : 'w-full text-xs'}`}
                >
                  <Users className="w-3 h-3 mr-2" />
                  Новые подписчики
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Premium user
          <div className="space-y-4">
            <div className={`${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/30`}>
              <div className={`flex items-center gap-2 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                <Crown className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <h4 className={`font-semibold text-white ${isMobile ? 'text-sm' : ''}`}>Premium Active</h4>
              </div>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 ${isMobile ? 'mb-3' : 'mb-4'}`}>
                У вас есть доступ ко всем премиум функциям
              </p>
            </div>

            <div className={`${isMobile ? 'p-3' : 'p-4'} bg-black/20 rounded-lg border border-white/10`}>
              <h5 className={`font-medium text-white ${isMobile ? 'mb-2 text-sm' : 'mb-3'} flex items-center gap-2`}>
                <TrendingUp className="w-4 h-4" />
                Быстрые действия
              </h5>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-white/20 ${isMobile ? 'w-full text-xs' : 'w-full text-xs'}`}
                >
                  Добавить в портфель
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-white/20 ${isMobile ? 'w-full text-xs' : 'w-full text-xs'}`}
                >
                  Скопировать сигнал
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-white/20 ${isMobile ? 'w-full text-xs' : 'w-full text-xs'}`}
                >
                  Настроить алерты
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className={`${isMobile ? 'p-3' : 'p-4'} bg-black/20 rounded-lg border border-white/10`}>
          <h5 className={`font-medium text-white ${isMobile ? 'mb-2 text-sm' : 'mb-3'}`}>📊 Статистика платформы</h5>
          <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
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
