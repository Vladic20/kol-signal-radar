
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { kols, signals } from '@/data/mockData';
import { SignalCard } from '@/components/ui/signal-card';
import { UsdtPaymentDialog } from '@/components/ui/usdt-payment-dialog';
import { ReferralDashboard } from '@/components/dashboard/ReferralDashboard';
import { Wallet } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, upgradeToPremiun, isPremium, logout } = useAuth();
  const navigate = useNavigate();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const [favoriteKols, setFavoriteKols] = useState<number[]>([1, 3]);
  const [viewedSignals, setViewedSignals] = useState<number[]>([1, 2, 4]);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) return null;
  
  const handleRemoveFromFavorites = (kolId: number) => {
    setFavoriteKols(prev => prev.filter(id => id !== kolId));
  };
  
  const handleClearHistory = () => {
    setViewedSignals([]);
  };
  
  const handleUpgradeToPremium = () => {
    setIsPaymentDialogOpen(true);
  };
  
  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };
  
  const favoriteKolsData = kols.filter(kol => favoriteKols.includes(kol.id));
  const viewedSignalsData = signals.filter(signal => viewedSignals.includes(signal.id));
  
  return (
    <Layout>
      <div className={`py-4 md:py-8 animate-fade-in px-2 md:px-0 ${isMobile ? 'max-w-full' : ''}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('Dashboard')}
        </h1>
        
        {/* Premium banner */}
        {!isPremium && (
          <div className="mb-6 md:mb-8 bg-gradient-to-r from-black/60 to-black/60 border border-neon-purple/30 p-4 md:p-6 rounded-lg">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
              <div className="md:mr-6">
                <h3 className="text-lg md:text-xl font-semibold mb-1">
                  {t('language') === 'en' 
                    ? 'Upgrade to Premium' 
                    : 'Перейти на Premium'}
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  {t('language') === 'en'
                    ? 'Get full access to all KOLs, signals, and premium features'
                    : 'Получите полный доступ ко всем KOL\'ам, сигналам и премиум-функциям'}
                </p>
              </div>
              <Button 
                onClick={handleUpgradeToPremium}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2 w-full md:w-auto"
              >
                <Wallet size={18} />
                {t('subscribeToPremium')}
              </Button>
            </div>
          </div>
        )}

        <UsdtPaymentDialog 
          isOpen={isPaymentDialogOpen} 
          setIsOpen={setIsPaymentDialogOpen} 
        />
        
        <Tabs defaultValue="profile" className="space-y-4 md:space-y-6">
          <TabsList className={`grid w-full bg-black/20 border border-white/10 ${
            isMobile ? 'grid-cols-2 h-auto' : 'grid-cols-4 max-w-lg'
          }`}>
            <TabsTrigger 
              value="profile" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              {isMobile ? 'Профиль' : t('userProfile')}
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              {isMobile ? 'Избранное' : t('favoritesKOLs')}
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              {isMobile ? 'История' : t('viewedSignals')}
            </TabsTrigger>
            <TabsTrigger 
              value="referral" 
              className={`data-[state=active]:bg-neon-purple/20 ${isMobile ? 'text-xs p-2' : ''}`}
            >
              {isMobile ? 'Реферал' : (language === 'en' ? 'Referral' : 'Реферальная')}
            </TabsTrigger>
          </TabsList>
          
          {/* User Profile Tab */}
          <TabsContent value="profile">
            <div className={`grid gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {/* User Info */}
              <div className="bg-black/30 rounded-lg p-4 md:p-6 border border-white/10">
                <h2 className="text-lg md:text-xl font-semibold mb-4">{t('userProfile')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{t('yourName')}</label>
                    <Input value={user.name} readOnly className="bg-black/40 border-white/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{t('email')}</label>
                    <Input value={user.email} readOnly className="bg-black/40 border-white/10" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm md:text-base">{t('language') === 'en' ? 'Account Type' : 'Тип аккаунта'}</span>
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${isPremium ? 'bg-neon-purple/20 text-neon-purple' : 'bg-gray-700 text-gray-300'}`}>
                      {isPremium ? 'Premium' : 'Free'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Settings */}
              <div className="bg-black/30 rounded-lg p-4 md:p-6 border border-white/10">
                <h2 className="text-lg md:text-xl font-semibold mb-4">{t('settings')}</h2>
                <div className="space-y-4 md:space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <label className="block text-sm font-medium text-gray-400 mb-3">{t('changePassword')}</label>
                    <Button variant="outline" className="border-white/20 w-full md:w-auto">
                      {t('language') === 'en' ? 'Change Password' : 'Изменить пароль'}
                    </Button>
                  </div>
                  
                  <div className="pb-4 border-b border-white/10">
                    <label className="block text-sm font-medium text-gray-400 mb-3">{t('languagePreference')}</label>
                    <div className="flex items-center justify-center md:justify-start">
                      <span className={`mr-2 ${language === 'en' ? 'text-white' : 'text-gray-400'}`}>EN</span>
                      <Switch 
                        checked={language === 'ru'} 
                        onCheckedChange={handleLanguageChange} 
                      />
                      <span className={`ml-2 ${language === 'ru' ? 'text-white' : 'text-gray-400'}`}>RU</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">{t('notifications')}</label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base">{t('language') === 'en' ? 'New signals' : 'Новые сигналы'}</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base">{t('language') === 'en' ? 'KOL updates' : 'Обновления KOL'}</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base">{t('language') === 'en' ? 'Marketing emails' : 'Маркетинговые письма'}</span>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8">
              <Button variant="destructive" onClick={logout} className="w-full md:w-auto">
                {t('Logout')}
              </Button>
            </div>
          </TabsContent>
          
          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="bg-black/30 rounded-lg p-4 md:p-6 border border-white/10">
              <h2 className="text-lg md:text-xl font-semibold mb-4">{t('favoritesKOLs')}</h2>
              
              {favoriteKolsData.length > 0 ? (
                <div className="space-y-4">
                  {favoriteKolsData.map(kol => (
                    <div key={kol.id} className="flex flex-col md:flex-row md:items-center justify-between bg-black/40 p-4 rounded-lg space-y-3 md:space-y-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 md:mr-4 flex-shrink-0">
                          <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm md:text-base truncate">{kol.name}</h3>
                          <p className="text-xs md:text-sm text-gray-400">
                            {kol.platforms[0].name} • {kol.accuracy}% {t('accuracy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full md:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-white/20 flex-1 md:flex-none"
                          onClick={() => navigate(`/kol/${kol.id}`)}
                        >
                          {t('details')}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex-1 md:flex-none"
                          onClick={() => handleRemoveFromFavorites(kol.id)}
                        >
                          {t('language') === 'en' ? 'Remove' : 'Удалить'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    {t('language') === 'en' 
                      ? 'You have no favorite KOLs yet' 
                      : 'У вас пока нет избранных KOL\'ов'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-white/20"
                    onClick={() => navigate('/leaderboard')}
                  >
                    {t('language') === 'en' ? 'Browse Leaderboard' : 'Просмотреть лидерборд'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history">
            <div className="bg-black/30 rounded-lg p-4 md:p-6 border border-white/10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
                <h2 className="text-lg md:text-xl font-semibold">{t('viewedSignals')}</h2>
                {viewedSignalsData.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/20 w-full md:w-auto"
                    onClick={handleClearHistory}
                  >
                    {t('language') === 'en' ? 'Clear History' : 'Очистить историю'}
                  </Button>
                )}
              </div>
              
              {viewedSignalsData.length > 0 ? (
                <div className={`grid gap-4 md:gap-6 ${
                  isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {viewedSignalsData.map(signal => {
                    const signalKol = kols.find(k => k.id === signal.kolId);
                    if (!signalKol) return null;
                    
                    return (
                      <SignalCard key={signal.id} signal={signal} kol={signalKol} />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    {t('language') === 'en' 
                      ? 'No viewed signals in your history' 
                      : 'В вашей истории нет просмотренных сигналов'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-white/20"
                    onClick={() => navigate('/')}
                  >
                    {t('language') === 'en' ? 'Browse Signals' : 'Просмотреть сигналы'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Referral Tab */}
          <TabsContent value="referral">
            <ReferralDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
