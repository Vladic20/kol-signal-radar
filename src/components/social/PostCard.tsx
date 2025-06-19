
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { FeedPost } from '@/data/feedData';
import { Heart, MessageCircle, Share, MoreHorizontal, CheckCircle, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { CommentsDialog } from './CommentsDialog';

interface PostCardProps {
  post: FeedPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { language } = useLanguage();
  const { user, isPremium } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleLike = () => {
    if (!user) return;
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: language === 'ru' ? ru : undefined
    });
  };

  const canViewFullPost = !post.isPremium || isPremium;

  return (
    <Card className="glass-effect border-white/10 hover:border-white/20 transition-all">
      <CardContent className="p-6">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to={`/kol/${post.authorId}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-white">{post.authorName}</h3>
                {post.authorVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
                {post.isPremium && (
                  <Badge variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-400">{formatTime(post.timestamp)}</p>
            </div>
          </Link>
          
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-100 leading-relaxed">
            {canViewFullPost ? post.content : post.content.slice(0, 150) + '...'}
          </p>
          
          {!canViewFullPost && (
            <div className="mt-3 p-3 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/30 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">
                {language === 'en' 
                  ? 'Premium content. Subscribe to view full post and signals.' 
                  : 'Премиум контент. Подпишитесь чтобы увидеть полный пост и сигналы.'}
              </p>
              <Link to="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                  {language === 'en' ? 'Upgrade to Premium' : 'Перейти на Premium'}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && canViewFullPost && (
          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2 rounded-lg overflow-hidden">
              {post.images.map((image, index) => (
                <img key={index} src={image} alt="" className="w-full h-64 object-cover" />
              ))}
            </div>
          </div>
        )}

        {/* Signal */}
        {post.signal && canViewFullPost && (
          <div className="mb-4 p-4 bg-black/40 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">📊 Trading Signal</h4>
              <Badge 
                variant={post.signal.action === 'BUY' ? 'default' : post.signal.action === 'SELL' ? 'destructive' : 'secondary'}
                className={post.signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' : ''}
              >
                {post.signal.action}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Symbol</p>
                <p className="text-white font-medium">{post.signal.symbol}</p>
              </div>
              <div>
                <p className="text-gray-400">Target</p>
                <p className="text-white font-medium">${post.signal.target.toLocaleString()}</p>
              </div>
              {post.signal.stopLoss && (
                <div>
                  <p className="text-gray-400">Stop Loss</p>
                  <p className="text-white font-medium">${post.signal.stopLoss.toLocaleString()}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Confidence</p>
                <p className="text-white font-medium">{post.signal.confidence}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
              disabled={!user}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCommentsOpen(true)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-400 hover:text-white"
              disabled={!user}
            >
              <Share className="w-4 h-4" />
              <span>{post.reposts}</span>
            </Button>
          </div>

          {!user && (
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-white/20">
                {language === 'en' ? 'Login to Interact' : 'Войти для взаимодействия'}
              </Button>
            </Link>
          )}
        </div>

        {/* Comments Dialog */}
        <CommentsDialog 
          postId={post.id}
          isOpen={isCommentsOpen}
          setIsOpen={setIsCommentsOpen}
        />
      </CardContent>
    </Card>
  );
};
