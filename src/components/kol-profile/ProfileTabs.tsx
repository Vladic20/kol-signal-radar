
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/social/PostCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  posts: any[];
  signals: any[];
  stats: {
    posts: number;
    signals: number;
  };
}

const ProfileTabs = ({ activeTab, onTabChange, posts, signals, stats }: ProfileTabsProps) => {
  const isMobile = useIsMobile();

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className={isMobile ? 'px-4' : 'px-0'}>
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-4 max-w-lg bg-black/20 border border-white/10 mb-6">
          <TabsTrigger value="posts" className="data-[state=active]:bg-neon-purple/20">
            Посты ({stats.posts})
          </TabsTrigger>
          <TabsTrigger value="signals" className="data-[state=active]:bg-neon-purple/20">
            Сигналы ({stats.signals})
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-neon-purple/20">
            Медиа
          </TabsTrigger>
          <TabsTrigger value="likes" className="data-[state=active]:bg-neon-purple/20">
            Лайки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Card className="glass-effect border-white/10">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">Пока нет постов</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="signals" className="space-y-4">
          {signals.length > 0 ? (
            signals.map(signal => (
              <Card key={signal.id} className="glass-effect border-white/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg">{signal.asset}</h3>
                      <Badge className={`mt-1 ${
                        signal.type === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {signal.type === 'Long' ? 'BUY' : 'SELL'}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-400">{getTimeAgo(signal.date)}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Entry:</span>
                      <div className="text-white font-medium">${signal.entryPrice}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Target:</span>
                      <div className="text-green-400 font-medium">${signal.targetPrice}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Stop:</span>
                      <div className="text-red-400 font-medium">${signal.stopLoss}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="glass-effect border-white/10">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">Пока нет сигналов</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">Медиа контент появится здесь</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="likes" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">Лайкнутые посты появятся здесь</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
