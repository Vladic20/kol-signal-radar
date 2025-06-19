
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { feedPosts } from '@/data/feedData';
import { TrendingUp, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const FeedPreview: React.FC = () => {
  const { language } = useLanguage();
  const trendingPosts = feedPosts.slice(0, 3);

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: language === 'ru' ? ru : undefined
    });
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingUp className="w-5 h-5 text-neon-purple" />
          🔥 {language === 'en' ? 'What Traders Are Discussing Now' : 'Что обсуждают трейдеры сейчас'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingPosts.map((post) => (
          <div key={post.id} className="p-4 bg-black/30 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white text-sm">{post.authorName}</span>
                  <span className="text-xs text-gray-400">{formatTime(post.timestamp)}</span>
                  {post.isPremium && (
                    <Badge variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2">
                  {post.content.slice(0, 120)}...
                </p>
                
                {post.signal && (
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                    <span className="flex items-center">
                      📊 {post.signal.symbol}
                    </span>
                    <Badge 
                      variant={post.signal.action === 'BUY' ? 'default' : post.signal.action === 'SELL' ? 'destructive' : 'secondary'}
                      className={`text-xs ${post.signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' : ''}`}
                    >
                      {post.signal.action}
                    </Badge>
                    <span>{post.signal.confidence}% confidence</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-4">
          <Link to="/feed">
            <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2">
              {language === 'en' ? 'Go to Feed' : 'Перейти в ленту'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
