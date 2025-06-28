
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Copy, UserMinus, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { kols } from '@/data/mockData';
import { feedPosts } from '@/data/feedData';

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Mock subscribed KOLs (first 5)
  const subscribedKols = kols.slice(0, 5);
  
  // Recent posts from subscriptions
  const recentPosts = feedPosts.filter(post => post.isFollowing).slice(0, 3);

  const handleUnsubscribe = (kolId: number) => {
    console.log('Unsubscribing from KOL:', kolId);
    // TODO: Implement unsubscribe logic
  };

  const handleCopyTrading = (kolId: number) => {
    console.log('Starting copy trading for KOL:', kolId);
    navigate('/copy-trading');
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
        <h1 className="text-xl font-bold">Мои подписки</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{subscribedKols.length}</div>
              <div className="text-sm text-gray-400">Подписок</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">+$2,450</div>
              <div className="text-sm text-gray-400">Общий PnL</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">67%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">3</div>
              <div className="text-sm text-gray-400">Активных копий</div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribed KOLs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Мои KOL'ы</h2>
          <div className="space-y-4">
            {subscribedKols.map((kol) => (
              <Card key={kol.id} className="glass-effect border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={kol.avatar} alt={kol.name} />
                        <AvatarFallback>{kol.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{kol.name}</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">
                            {kol.platforms[0].followers.toLocaleString()} подписчиков
                          </span>
                          <Badge className="bg-green-500/20 text-green-400">
                            {kol.accuracy}% точность
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        +{Math.floor(Math.random() * 500 + 100)}%
                      </div>
                      <div className="text-sm text-gray-400">ROI</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-white/20"
                      onClick={() => navigate(`/kol-profile/${kol.id}`)}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Профиль
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-neon-purple hover:bg-neon-purple/80"
                      onClick={() => handleCopyTrading(kol.id)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Копировать
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleUnsubscribe(kol.id)}
                    >
                      <UserMinus className="w-4 h-4 mr-1" />
                      Отписаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Последние посты
          </h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="glass-effect border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                      <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-white">{post.authorName}</span>
                        <span className="text-sm text-gray-400">{post.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                        <span>🔄 {post.reposts}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 border-white/20"
            onClick={() => navigate('/feed')}
          >
            Посмотреть всю ленту
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
