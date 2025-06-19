
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { feedPosts, postComments } from '@/data/feedData';
import { Heart, MessageCircle, Share, ArrowLeft, CheckCircle, Lock, Repeat2, Quote, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, isPremium } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');

  const post = feedPosts.find(p => p.id === Number(id));
  const comments = postComments[Number(id)] || [];

  if (!post) {
    return (
      <Layout>
        <div className="py-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {language === 'en' ? 'Post not found' : 'Пост не найден'}
          </h1>
          <Button onClick={() => navigate('/feed')}>
            {language === 'en' ? 'Back to Feed' : 'Вернуться в ленту'}
          </Button>
        </div>
      </Layout>
    );
  }

  React.useEffect(() => {
    setIsLiked(post.isLiked || false);
    setLikesCount(post.likes);
  }, [post]);

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

  const handleLike = () => {
    if (!user) return;
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;
    setNewComment('');
  };

  const canViewFullPost = !post.isPremium || isPremium;

  // Mock ROI and WinRate data
  const traderStats = {
    roi30d: Math.floor(Math.random() * 50) - 10,
    winRate: Math.floor(Math.random() * 40) + 60,
    lastSignalsPerformance: Math.floor(Math.random() * 50) + 10
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 animate-fade-in">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/feed')}
          className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to Feed' : 'Вернуться в ленту'}
        </Button>

        {/* Main Post */}
        <Card className="glass-effect border-white/10 mb-8">
          <CardContent className="p-8">
            {/* Author Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold text-white">@{post.authorName}</h3>
                  {post.authorVerified && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                  {post.isPremium && (
                    <Badge variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                      <Lock className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                {/* ROI and WinRate */}
                <div className="flex items-center space-x-4 text-sm">
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
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-100 leading-relaxed text-lg">
                {canViewFullPost ? post.content : post.content.slice(0, 150) + '...'}
              </p>
              
              {!canViewFullPost && (
                <div className="mt-4 p-4 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/30 rounded-lg">
                  <p className="text-sm text-gray-300 mb-3">
                    {language === 'en' 
                      ? 'Premium content. Subscribe to view full post and signals.' 
                      : 'Премиум контент. Подпишитесь чтобы увидеть полный пост и сигналы.'}
                  </p>
                  <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                    {language === 'en' ? 'Upgrade to Premium' : 'Перейти на Premium'}
                  </Button>
                </div>
              )}
            </div>

            {/* Images */}
            {post.images && post.images.length > 0 && canViewFullPost && (
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-3 rounded-lg overflow-hidden">
                  {post.images.map((image, index) => (
                    <img key={index} src={image} alt="" className="w-full h-80 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {/* Signal */}
            {post.signal && canViewFullPost && (
              <div className="mb-6 p-6 bg-black/40 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">📊 Trading Signal</h4>
                  <Badge 
                    variant={post.signal.action === 'BUY' ? 'default' : post.signal.action === 'SELL' ? 'destructive' : 'secondary'}
                    className={post.signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' : ''}
                  >
                    {post.signal.action}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm">Symbol</p>
                    <p className="text-white font-semibold text-lg">{post.signal.symbol}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Target</p>
                    <p className="text-white font-semibold text-lg">${post.signal.target.toLocaleString()}</p>
                  </div>
                  {post.signal.stopLoss && (
                    <div>
                      <p className="text-gray-400 text-sm">Stop Loss</p>
                      <p className="text-white font-semibold text-lg">${post.signal.stopLoss.toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400 text-sm">Confidence</p>
                    <p className="text-white font-semibold text-lg">{post.signal.confidence}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mini Analytics */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span className={`font-medium ${traderStats.lastSignalsPerformance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  +{traderStats.lastSignalsPerformance}% {language === 'en' ? 'last 10 signals' : 'за последние 10 сигналов'}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-blue-400">
                  {language === 'en' ? 'High engagement trader' : 'Высокое доверие трейдера'}
                </span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-8 pt-6 border-t border-white/10">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleLike}
                className={`flex items-center space-x-3 ${
                  isLiked ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                }`}
                disabled={!user}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium text-lg">{likesCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center space-x-3 text-gray-400 hover:text-green-400"
                disabled={!user}
              >
                <Repeat2 className="w-6 h-6" />
                <span className="font-medium text-lg">{post.reposts}</span>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="flex items-center space-x-3 text-gray-400 hover:text-purple-400"
                disabled={!user}
              >
                <Quote className="w-6 h-6" />
                <span className="font-medium text-lg">Quote</span>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="flex items-center space-x-3 text-gray-400 hover:text-blue-400"
                disabled={!user}
              >
                <Share className="w-6 h-6" />
                <span className="font-medium text-lg">Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {language === 'en' ? 'Comments' : 'Комментарии'} ({comments.length})
            </h3>

            {/* Add comment form */}
            {user ? (
              <div className="flex space-x-4 mb-8 p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.[0] || 'U'}
                </div>
                <div className="flex-1 space-y-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={language === 'en' ? 'Write a comment...' : 'Написать комментарий...'}
                    className="bg-black/30 border-white/20 text-white resize-none"
                    rows={3}
                  />
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {language === 'en' ? 'Post Comment' : 'Отправить'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center mb-8 p-6 bg-black/20 rounded-lg border border-white/10">
                <p className="text-gray-400 mb-4">
                  {language === 'en' ? 'Login to comment' : 'Войдите, чтобы комментировать'}
                </p>
                <Button variant="outline" className="border-white/20">
                  {language === 'en' ? 'Login' : 'Войти'}
                </Button>
              </div>
            )}

            {/* Comments list */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4 p-4 bg-black/10 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={comment.authorAvatar} alt={comment.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-white">{comment.authorName}</span>
                      <span className="text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                    </div>
                    <p className="text-gray-300 mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-xs text-gray-400 hover:text-white transition-colors">
                        {language === 'en' ? 'Reply' : 'Ответить'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
