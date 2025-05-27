
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Copy, DollarSign, Users, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const ReferralDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [showEarnings, setShowEarnings] = useState(true);
  
  // Mock data - в реальном приложении эти данные будут загружаться с API
  const referralData = {
    code: 'KRYPTO_USER123',
    totalReferrals: 24,
    premiumReferrals: 8,
    totalEarnings: 485.60,
    pendingEarnings: 125.40,
    commissionRate: 15, // в процентах
    recentReferrals: [
      { id: 1, name: 'Alex K.', date: '2024-01-15', premium: true, earnings: 15.80 },
      { id: 2, name: 'Maria S.', date: '2024-01-14', premium: false, earnings: 0 },
      { id: 3, name: 'John D.', date: '2024-01-12', premium: true, earnings: 15.80 },
      { id: 4, name: 'Sarah L.', date: '2024-01-10', premium: true, earnings: 15.80 },
      { id: 5, name: 'Mike R.', date: '2024-01-08', premium: false, earnings: 0 },
    ]
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.code);
    toast.success(
      language === 'en' 
        ? 'Referral code copied to clipboard!' 
        : 'Реферальный код скопирован в буфер обмена!'
    );
  };

  const copyReferralLink = () => {
    const link = `https://kolplatform.com/register?ref=${referralData.code}`;
    navigator.clipboard.writeText(link);
    toast.success(
      language === 'en' 
        ? 'Referral link copied to clipboard!' 
        : 'Реферальная ссылка скопирована в буфер обмена!'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent mb-2">
          {language === 'en' ? 'Referral Program' : 'Реферальная Программа'}
        </h2>
        <p className="text-gray-300">
          {language === 'en' 
            ? 'Earn up to 15% commission from premium subscriptions of your referrals'
            : 'Зарабатывайте до 15% комиссии с премиум-подписок ваших рефералов'
          }
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Users size={16} />
              {language === 'en' ? 'Total Referrals' : 'Всего Рефералов'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{referralData.totalReferrals}</div>
            <p className="text-xs text-gray-400 mt-1">
              {referralData.premiumReferrals} {language === 'en' ? 'premium users' : 'премиум пользователей'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <DollarSign size={16} />
              {language === 'en' ? 'Total Earnings' : 'Общий Заработок'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white">
                {showEarnings ? `$${referralData.totalEarnings}` : '***'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEarnings(!showEarnings)}
                className="p-1 h-auto"
              >
                {showEarnings ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'en' ? 'All time earnings' : 'За все время'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <TrendingUp size={16} />
              {language === 'en' ? 'Pending Payout' : 'К Выплате'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-blue">
              {showEarnings ? `$${referralData.pendingEarnings}` : '***'}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'en' ? 'Available for withdrawal' : 'Доступно к выводу'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {language === 'en' ? 'Commission Rate' : 'Ставка Комиссии'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-purple">{referralData.commissionRate}%</div>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'en' ? 'From premium subscriptions' : 'С премиум подписок'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {language === 'en' ? 'Your Referral Code' : 'Ваш Реферальный Код'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={referralData.code} 
              readOnly 
              className="bg-black/40 border-white/20 text-white font-mono"
            />
            <Button onClick={copyReferralCode} variant="outline" className="border-white/20">
              <Copy size={16} className="mr-2" />
              {language === 'en' ? 'Copy Code' : 'Копировать'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={copyReferralLink} className="bg-gradient-to-r from-neon-purple to-neon-blue">
              <Copy size={16} className="mr-2" />
              {language === 'en' ? 'Copy Referral Link' : 'Копировать Ссылку'}
            </Button>
            <Button variant="outline" className="border-white/20">
              {language === 'en' ? 'Request Payout' : 'Запросить Выплату'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {language === 'en' ? 'Recent Referrals' : 'Последние Рефералы'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralData.recentReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full flex items-center justify-center text-white font-semibold">
                    {referral.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{referral.name}</p>
                    <p className="text-sm text-gray-400">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      referral.premium 
                        ? 'bg-neon-purple/20 text-neon-purple' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {referral.premium 
                        ? (language === 'en' ? 'Premium' : 'Премиум')
                        : (language === 'en' ? 'Free' : 'Бесплатно')
                      }
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white mt-1">
                    {showEarnings 
                      ? (referral.earnings > 0 ? `+$${referral.earnings}` : '$0.00')
                      : '***'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Program Info */}
      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {language === 'en' ? 'Program Benefits' : 'Преимущества Программы'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">
                {language === 'en' ? 'Commission Structure' : 'Структура Комиссий'}
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• {language === 'en' ? '15% from premium subscriptions' : '15% с премиум подписок'}</li>
                <li>• {language === 'en' ? 'Monthly payouts' : 'Ежемесячные выплаты'}</li>
                <li>• {language === 'en' ? 'No minimum withdrawal limit' : 'Без минимальной суммы вывода'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">
                {language === 'en' ? 'How it Works' : 'Как это Работает'}
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• {language === 'en' ? 'Share your referral code' : 'Поделитесь своим кодом'}</li>
                <li>• {language === 'en' ? 'Users register with your code' : 'Пользователи регистрируются по коду'}</li>
                <li>• {language === 'en' ? 'Earn when they upgrade to premium' : 'Зарабатывайте при покупке премиума'}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
