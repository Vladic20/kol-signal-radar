import React, { useState } from 'react';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FeedPost } from '@/data/feedData';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Repeat2, 
  Quote, 
  X, 
  CheckCircle, 
  Lock,
  MoreHorizontal,
  Send,
  TrendingUp,
  Copy
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PostDetailModalProps {
  post: FeedPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ 
  post, 
  isOpen, 
  onClose 
}) => {
  const { user, isPremium } = useAuth();
  const { language } = useLanguage();
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'CryptoAnalyst',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=analyst',
      content: 'Отличный анализ! Согласен с вашими выводами по BTC',
      timestamp: '2ч назад',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'TraderMax',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=trader',
      content: 'Уже скопировал сигнал, спасибо за качественный контент! 🚀',
      timestamp: '1ч назад',
      likes: 8,
      isLiked: true
    }
  ]);

  if (!post) return null;

  const canViewFullPost = !post.isPremium || isPremium;

  const handleLike = () => {
    if (!user) return;
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (!comment.trim() || !user) return;
    
    const newComment = {
      id: comments.length + 1,
      author: user.name || 'User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
      content: comment,
      timestamp: 'только что',
      likes: 0,
      isLiked: false
    };
    
    setComments([newComment, ...comments]);
    setComment('');
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

  // Mock ROI and WinRate data
  const traderStats = {
    roi30d: Math.floor(Math.random() * 50) - 10,
    winRate: Math.floor(Math.random() * 40) + 60,
    lastSignalsPerformance: Math.floor(Math.random() * 50) + 10
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95vw] md:w-full bg-black/95 border-white/10 p-0 overflow-hidden">
        <DialogTitle className="sr-only">Post Details</DialogTitle>
        <DialogDescription className="sr-only">View and interact with this post</DialogDescription>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/95 z-10">
          <h2 className="text-lg font-semibold text-white">Пост</h2>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 max-h-[calc(90vh-80px)]">
          <div className="p-4 space-y-4">
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <Link 
                to={`/kol/${post.authorId}`} 
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                onClick={onClose}
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
                  
                  {/* Enhanced Stats */}
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
              
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-gray-100 leading-relaxed text-lg">
                {canViewFullPost ? post.content : post.content.slice(0, 150) + '...'}
              </p>
              
              {!canViewFullPost && (
                <div className="p-4 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/30 rounded-lg">
                  <p className="text-sm text-gray-300 mb-3">
                    {language === 'en' 
                      ? 'Premium content. Subscribe to view full post and signals.' 
                      : 'Премиум контент. Подпишитесь чтобы увидеть полный пост и сигналы.'}
                  </p>
                  <Link to="/dashboard" onClick={onClose}>
                    <Button size="sm" className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                      {language === 'en' ? 'Upgrade to Premium' : 'Перейти на Premium'}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Images */}
            {post.images && post.images.length > 0 && canViewFullPost && (
              <div className="space-y-2">
                {post.images.map((image, index) => (
                  <img key={index} src={image} alt="" className="w-full rounded-lg" />
                ))}
              </div>
            )}

            {/* Signal */}
            {post.signal && canViewFullPost && (
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📊</span>
                    <h4 className="font-semibold text-white">Trading Signal</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={post.signal.action === 'BUY' ? 'default' : post.signal.action === 'SELL' ? 'destructive' : 'secondary'}
                      className={post.signal.action === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                                post.signal.action === 'SELL' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                    >
                      {post.signal.action}
                    </Badge>
                    <Button size="sm" className="btn-primary text-xs md:text-sm">
                      <Copy className="w-3 h-3 mr-1" />
                      Копировать
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Symbol</p>
                    <p className="text-white font-medium">{post.signal.symbol}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Target</p>
                    <p className="text-white font-medium">${post.signal.target.toLocaleString()}</p>
                  </div>
                  {post.signal.stopLoss && (
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Stop Loss</p>
                      <p className="text-white font-medium">${post.signal.stopLoss.toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Confidence</p>
                    <p className="text-white font-medium">{post.signal.confidence}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Stats */}
            <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">
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
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-4">
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
                    className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{comments.length}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
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
                  >
                    <Quote className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>

              {/* Comment Input */}
              {user && (
                <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 mb-4">
                  <Avatar className="w-8 h-8 flex-shrink-0 self-start">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xs">
                      {user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Написать комментарий..."
                      className="flex-1 min-h-[60px] md:min-h-[80px] bg-black/20 border-white/10 resize-none text-sm"
                    />
                    <Button
                      onClick={handleComment}
                      disabled={!comment.trim()}
                      size="sm"
                      className="bg-neon-purple hover:bg-neon-purple/80 self-end md:self-end w-full md:w-auto"
                    >
                      <Send className="w-4 h-4 mr-2 md:mr-0" />
                      <span className="md:hidden">Отправить</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Комментарии ({comments.length})</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 p-3 bg-black/20 rounded-lg">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xs">
                      {comment.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white text-sm">@{comment.author}</h4>
                      <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center space-x-1 text-xs ${
                          comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                        <span>{comment.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Ответить
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};