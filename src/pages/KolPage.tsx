import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { kols, signals, engagementData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignalCard } from '@/components/ui/signal-card';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lock } from 'lucide-react';

const KolPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { isPremium } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<{ author: string; text: string; date: string }[]>([]);
  
  // Find KOL by ID
  const kol = kols.find(k => k.id === parseInt(id || '0'));
  
  // Find signals by KOL ID
  const kolSignals = signals.filter(s => s.kolId === parseInt(id || '0'));
  
  // Get engagement data for this KOL
  const engagement = engagementData[parseInt(id || '0') as keyof typeof engagementData] || [];
  
  // Check if KOL is accessible (premium check)
  const isAccessible = !kol?.premium || isPremium;
  
  // Toggle following status
  const handleToggleFollow = () => {
    setIsFollowing(prev => !prev);
  };
  
  // Handle comment submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments(prev => [
      {
        author: 'You',
        text: newComment,
        date: new Date().toISOString()
      },
      ...prev
    ]);
    
    setNewComment('');
  };
  
  // Redirect if KOL is not found
  if (!kol) {
    return <Navigate to="/leaderboard" />;
  }
  
  // Redirect if KOL is premium and user is not premium
  if (!isAccessible) {
    return <Navigate to="/leaderboard" />;
  }
  
  // Get total followers across all platforms
  const totalFollowers = kol.platforms.reduce((sum, platform) => sum + platform.followers, 0);
  
  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        {/* KOL Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{kol.name}</h1>
              <p className="text-gray-400">
                {kol.language === 'EN' ? '🇺🇸 English' : kol.language === 'RU' ? '🇷🇺 Russian' : '🇺🇸 English / 🇷🇺 Russian'}
              </p>
            </div>
          </div>
          
          <Button
            variant={isFollowing ? "default" : "outline"}
            className={isFollowing ? "bg-neon-purple hover:bg-neon-purple/80" : "border-neon-purple text-neon-purple hover:bg-neon-purple/10"}
            onClick={handleToggleFollow}
          >
            {isFollowing ? t('following') : t('follow')}
          </Button>
        </div>
        
        {/* Main content tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto bg-black/20 border border-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-neon-purple/20">
              {t('profileDetails')}
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-neon-purple/20">
              {t('tradingSignals')}
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-neon-purple/20">
              {t('comments')}
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-black/30 rounded-lg p-6 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">{t('profileDetails')}</h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-300">{kol.bio}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-md font-medium mb-2">Platforms</h3>
                      <div className="space-y-2">
                        {kol.platforms.map((platform, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              {platform.name === 'Twitter' && (
                                <svg className="w-5 h-5 mr-2 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 2 18.28a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z" />
                                </svg>
                              )}
                              {platform.name === 'Telegram' && (
                                <svg className="w-5 h-5 mr-2 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.75 8.34l-1.85 8.7c-.14.62-.5.77-.99.47l-2.77-2.04-1.33 1.28c-.14.14-.28.28-.56.28l.2-2.79L16.59 9c.35-.31-.08-.45-.52-.17l-7.12 4.47-3.05-.95c-.67-.21-.68-.67.14-.99L16.5 7.33c.56-.21 1.04.13 1.25 1.01z" />
                                </svg>
                              )}
                              {platform.name === 'YouTube' && (
                                <svg className="w-5 h-5 mr-2 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.015 3.015 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              )}
                              {platform.name === 'Discord' && (
                                <svg className="w-5 h-5 mr-2 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                </svg>
                              )}
                              <span>{platform.name}</span>
                            </div>
                            <span className="text-gray-400">
                              {platform.followers >= 1000000
                                ? `${(platform.followers / 1000000).toFixed(1)}M`
                                : platform.followers >= 1000
                                ? `${(platform.followers / 1000).toFixed(1)}K`
                                : platform.followers}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-black/40 rounded-lg">
                        <div className="text-sm text-gray-400">{t('signalFreq')}</div>
                        <div className="text-xl font-medium">{kol.signalFrequency}</div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg">
                        <div className="text-sm text-gray-400">{t('engagement')}</div>
                        <div className="text-xl font-medium">{kol.engagement}</div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg">
                        <div className="text-sm text-gray-400">{t('reputation')}</div>
                        <div className={`text-xl font-medium ${
                          kol.reputation === 'Clean' ? 'text-green-400' : 
                          kol.reputation === 'Mixed' ? 'text-yellow-400' : 
                          'text-red-400'
                        }`}>
                          {t(kol.reputation.toLowerCase())}
                        </div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg">
                        <div className="text-sm text-gray-400">{t('accuracy')}</div>
                        <div className="text-xl font-medium">{kol.accuracy}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Engagement Chart */}
              <div className="bg-black/30 rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-4">{t('engagementStats')}</h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagement}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                          borderColor: 'rgba(255, 255, 255, 0.1)' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="likes" 
                        stroke="#9b87f5" 
                        fill="#9b87f580" 
                        name="Likes" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="comments" 
                        stroke="#1EAEDB" 
                        fill="#1EAEDB80" 
                        name="Comments" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-400 text-center">
                  {t('language') === 'en' 
                    ? 'Monthly engagement metrics across all platforms' 
                    : 'Ежемесячные показатели вовлеченности по всем платформам'}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Signals Tab */}
          <TabsContent value="signals">
            {/* Signals Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {kolSignals.length > 0 ? (
                kolSignals.map(signal => (
                  <SignalCard key={signal.id} signal={signal} kol={kol} />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-gray-400">
                    {t('language') === 'en' 
                      ? 'No signals available for this KOL yet' 
                      : 'Пока нет доступных сигналов для этого KOL\'а'}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Comments Tab */}
          <TabsContent value="comments">
            <div className="bg-black/30 rounded-lg p-6 border border-white/10">
              {/* Comment form */}
              <form onSubmit={handleSubmitComment} className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{t('leaveComment')}</h3>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full h-24 bg-black/40 border border-white/10 rounded-md p-3 text-white resize-none"
                  placeholder={t('language') === 'en' ? "Share your thoughts about this KOL..." : "Поделитесь своими мыслями об этом KOL'е..."}
                />
                <Button type="submit" className="mt-4 bg-neon-purple hover:bg-neon-purple/80">
                  {t('submitComment')}
                </Button>
              </form>
              
              {/* Comments list */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t('comments')}</h3>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-gray-400">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    {t('language') === 'en' 
                      ? 'No comments yet. Be the first to comment!' 
                      : 'Пока нет комментариев. Будьте первым, кто оставит комментарий!'}
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default KolPage;
