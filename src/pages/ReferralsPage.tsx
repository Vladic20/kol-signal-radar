
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2, Trophy, Copy, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const ReferralsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const [copied, setCopied] = useState(false);
  
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 450,
    thisMonthEarnings: 125,
    referralRate: 0.1 // 10%
  };

  const referralsList = [
    { id: 1, name: 'TraderBob', joined: '2024-12-15', earned: 85, status: 'active' },
    { id: 2, name: 'CryptoGirl', joined: '2024-12-10', earned: 150, status: 'active' },
    { id: 3, name: 'BlockMaster', joined: '2024-12-05', earned: 45, status: 'inactive' },
    { id: 4, name: 'DeFiKing', joined: '2024-11-28', earned: 170, status: 'active' },
  ];

  const referralLink = `https://kolhub.com/ref/${user?.id || 'user123'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Присоединяйся к KOL Hub',
        text: 'Лучшая платформа для копирования торговых сигналов',
        url: referralLink,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pt-16 pb-24' : 'pt-20'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Реферальная программа</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{referralStats.totalReferrals}</div>
              <div className="text-sm text-gray-400">Всего рефералов</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{referralStats.activeReferrals}</div>
              <div className="text-sm text-gray-400">Активных</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">${referralStats.totalEarnings}</div>
              <div className="text-sm text-gray-400">Общий доход</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">${referralStats.thisMonthEarnings}</div>
              <div className="text-sm text-gray-400">За месяц</div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="glass-effect border-neon-purple/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Ваша реферальная ссылка
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                value={referralLink}
                readOnly
                className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-white text-sm"
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-white/20"
                  onClick={handleCopyLink}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? 'Скопировано!' : 'Копировать'}
                </Button>
                <Button 
                  className="bg-neon-purple hover:bg-neon-purple/80"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Поделиться
                </Button>
              </div>
            </div>
            
            <div className="bg-neon-purple/10 border border-neon-purple/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">💰 Как это работает:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Приглашайте друзей по своей ссылке</li>
                <li>• Получайте {referralStats.referralRate * 100}% от их торговых комиссий</li>
                <li>• Бонусы за активных рефералов каждый месяц</li>
                <li>• Выплаты каждые 7 дней на ваш баланс</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Referrals List */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Мои рефералы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referralsList.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${referral.name}`} />
                      <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                        {referral.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{referral.name}</p>
                      <p className="text-sm text-gray-400">
                        Присоединился: {new Date(referral.joined).toLocaleDateString('ru')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-green-400">${referral.earned}</div>
                    <Badge 
                      className={referral.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                      }
                    >
                      {referral.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {referralsList.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">У вас пока нет рефералов</p>
                <Button 
                  className="bg-neon-purple hover:bg-neon-purple/80"
                  onClick={handleShare}
                >
                  Пригласить друзей
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralsPage;
