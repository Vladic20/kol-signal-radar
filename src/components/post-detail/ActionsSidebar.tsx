
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, AlertTriangle } from 'lucide-react';

interface ActionsSidebarProps {
  user: any;
  isPremium: boolean;
}

const ActionsSidebar: React.FC<ActionsSidebarProps> = ({ user, isPremium }) => {
  return (
    <Card className="glass-effect border-white/10">
      <CardContent className="p-6">
        <h4 className="font-bold text-white mb-4">Действия</h4>
        {!user ? (
          <div className="space-y-3">
            <Link to="/login">
              <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                Войти, чтобы копировать
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="w-full border-white/20">
                Зарегистрироваться
              </Button>
            </Link>
          </div>
        ) : !isPremium ? (
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
              Подписаться на трейдера за $5
            </Button>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full border-white/20">
                Перейти на Premium
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Добавить в портфель
            </Button>
            <Button variant="outline" className="w-full border-white/20 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Следить за сигналами
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionsSidebar;
