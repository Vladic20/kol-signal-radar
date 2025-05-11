
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

const DashboardPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, upgradeToPremiun, isPremium, logout } = useAuth();
  const navigate = useNavigate();
  
  const [favoriteKols, setFavoriteKols] = useState<number[]>([1, 3]); // Example default favorites
  const [viewedSignals, setViewedSignals] = useState<number[]>([1, 2, 4]); // Example viewed signals
  
  // Redirect if not authenticated
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
    upgradeToPremiun();
  };
  
  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };
  
  // Get favorite KOLs data
  const favoriteKolsData = kols.filter(kol => favoriteKols.includes(kol.id));
  
  // Get viewed signals data
  const viewedSignalsData = signals.filter(signal => viewedSignals.includes(signal.id));
  
  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('Dashboard')}
        </h1>
        
        {/* Premium banner for non-premium users */}
        {!isPremium && (
          <div className="mb-8 bg-gradient-to-r from-black/60 to-black/60 border border-neon-purple/30 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-6">
                <h3 className="text-xl font-semibold mb-1">
                  {t('language') === 'en' 
                    ? 'Upgrade to Premium' 
                    : 'Перейти на Premium'}
                </h3>
                <p className="text-gray-300">
                  {t('language') === 'en'
                    ? 'Get full access to all KOLs, signals, and premium features'
                    : 'Получите полный доступ ко всем KOL\'ам, сигналам и премиум-функциям'}
                </p>
              </div>
              <Button 
                onClick={handleUpgradeToPremium}
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                {t('subscribeToPremium')}
              </Button>
            </div>
          </div>
        )}
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md bg-black/20 border border-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-neon-purple/20">
              {t('userProfile')}
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-neon-purple/20">
              {t('favoritesKOLs')}
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-neon-purple/20">
              {t('viewedSignals')}
            </TabsTrigger>
          </TabsList>
          
          {/* User Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Info */}
              <div className="bg-black/30 rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-4">{t('userProfile')}</h2>
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
                    <span className="font-medium">{t('language') === 'en' ? 'Account Type' : 'Тип аккаунта'}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${isPremium ? 'bg-neon-purple/20 text-neon-purple' : 'bg-gray-700 text-gray-300'}`}>
                      {isPremium ? 'Premium' : 'Free'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Settings */}
              <div className="bg-black/30 rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-4">{t('settings')}</h2>
                <div className="space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <label className="block text-sm font-medium text-gray-400 mb-3">{t('changePassword')}</label>
                    <Button variant="outline" className="border-white/20">
                      {t('language') === 'en' ? 'Change Password' : 'Изменить пароль'}
                    </Button>
                  </div>
                  
                  <div className="pb-4 border-b border-white/10">
                    <label className="block text-sm font-medium text-gray-400 mb-3">{t('languagePreference')}</label>
                    <div className="flex items-center">
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
                        <span>{t('language') === 'en' ? 'New signals' : 'Новые сигналы'}</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t('language') === 'en' ? 'KOL updates' : 'Обновления KOL'}</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t('language') === 'en' ? 'Marketing emails' : 'Маркетинговые письма'}</span>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button variant="destructive" onClick={logout}>
                {t('Logout')}
              </Button>
            </div>
          </TabsContent>
          
          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="bg-black/30 rounded-lg p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">{t('favoritesKOLs')}</h2>
              
              {favoriteKolsData.length > 0 ? (
                <div className="space-y-4">
                  {favoriteKolsData.map(kol => (
                    <div key={kol.id} className="flex items-center justify-between bg-black/40 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{kol.name}</h3>
                          <p className="text-sm text-gray-400">
                            {kol.platforms[0].name} • {kol.accuracy}% {t('accuracy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-white/20"
                          onClick={() => navigate(`/kol/${kol.id}`)}
                        >
                          {t('details')}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
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
            <div className="bg-black/30 rounded-lg p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{t('viewedSignals')}</h2>
                {viewedSignalsData.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/20"
                    onClick={handleClearHistory}
                  >
                    {t('language') === 'en' ? 'Clear History' : 'Очистить историю'}
                  </Button>
                )}
              </div>
              
              {viewedSignalsData.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
