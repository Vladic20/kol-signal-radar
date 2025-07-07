import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { FeedPost } from '@/data/feedData';
import { Heart, MessageCircle, Share, MoreHorizontal, CheckCircle, Lock, Repeat2, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CommentsDialog } from './CommentsDialog';
import { PointsNotification } from '@/components/ui/points-notification';

interface PostCardProps {
  post: FeedPost;
  onPostClick?: (post: FeedPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPostClick }) => {
  const { language } = useLanguage();
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReposting, setIsReposting] = useState(false);
  const [showPointsNotification, setShowPointsNotification] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // Show points notification
    if (!isLiked) {
      setShowPointsNotification(true);
    }
    
    // Add heart animation
    const target = e.currentTarget;
    target.classList.add('animate-scale-in');
    setTimeout(() => target.classList.remove('animate-scale-in'), 200);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCommentsOpen(true);
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    setIsReposting(true);
    // Add repost logic here
    setTimeout(() => setIsReposting(false), 500);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return language === 'en' ? `${diffInMinutes}m ago` : `${diffInMinutes}м назад`;
    } else if (diffInHours < 24) {
      return language === 'en' ? `${diffInHours}h ago` : `${diffInHours}ч назад`;
    } else if (diffInDays < 7) {
      return language === 'en' ? `${diffInDays}d ago` : `${diffInDays}д назад`;
    } else {
      return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
        day: 'numeric',
        month: 'short'
      }).format(date);
    }
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  const canViewFullPost = !post.isPremium || isPremium;

  // Mock ROI and WinRate data
  const traderStats = {
    roi30d: Math.floor(Math.random() * 50) - 10, // -10 to +40
    winRate: Math.floor(Math.random() * 40) + 60, // 60-100%
    lastSignalsPerformance: Math.floor(Math.random() * 50) + 10 // 10-60%
  };

  return (
    <>
      <Card 
        className="glass-effect border-white/10 hover:border-white/20 transition-all cursor-pointer hover:scale-[1.02]"
        onClick={handlePostClick}
      >
        <CardContent className="p-6">
          {/* Author Header */}
          <div className="flex items-center justify-between mb-4">
            <Link 
              to={`/kol/${post.authorId}`} 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-white">@{post.authorName}</h3>
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
                
                {/* ROI and WinRate */}
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-gray-400">{formatTime(post.timestamp)}</span>
                  <span className="text-gray-400">•</span>
                  <span className={`font-medium ${traderStats.roi30d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ROI30d: {traderStats.roi30d > 0 ? '+' : ''}{traderStats.roi30d}%
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-blue-400 font-medium">
                    WR: {traderStats.winRate}%
                  </span>
                </div>
              </div>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
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
                <Link to="/dashboard" onClick={(e) => e.stopPropagation()}>
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

          {/* Mini Analytics */}
          <div className="mb-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <span>📊</span>
              <span className={`font-medium ${traderStats.lastSignalsPerformance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                +{traderStats.lastSignalsPerformance}% {language === 'en' ? 'last 10 signals' : 'за последние 10 сигналов'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-400">
                {language === 'en' ? 'High engagement' : 'Высокое доверие'}
              </span>
            </div>
          </div>

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
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isLiked ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                }`}
                disabled={!user}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{likesCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{post.comments}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRepost}
                className={`flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all duration-200 ${
                  isReposting ? 'text-green-400 animate-pulse' : ''
                }`}
                disabled={!user}
              >
                <Repeat2 className="w-5 h-5" />
                <span className="font-medium">{post.reposts}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                disabled={!user}
                onClick={(e) => e.stopPropagation()}
              >
                <Quote className="w-5 h-5" />
              </Button>
            </div>

            {!user && (
              <Link to="/login" onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" size="sm" className="border-white/20">
                  {language === 'en' ? 'Login to Interact' : 'Войти для взаимодействия'}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments Dialog */}
      <CommentsDialog 
        postId={post.id}
        isOpen={isCommentsOpen}
        setIsOpen={setIsCommentsOpen}
      />

      {/* Points Notification */}
      <PointsNotification
        points={2}
        action="for liking post 💜"
        show={showPointsNotification}
        onHide={() => setShowPointsNotification(false)}
      />
    </>
  );
};
