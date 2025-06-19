
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { feedPosts, postComments } from '@/data/feedData';
import { 
  Heart, MessageCircle, Share, ArrowLeft, CheckCircle, Lock, Repeat2, Quote, Send, 
  TrendingUp, Users, Target, Clock, ThumbsUp, ThumbsDown, Search, BarChart3,
  AlertTriangle, CheckCircle2, Play
} from 'lucide-react';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, isPremium } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [commentSort, setCommentSort] = useState<'top' | 'recent'>('top');
  const [isFollowing, setIsFollowing] = useState(false);

  const post = feedPosts.find(p => p.id === Number(id));
  const comments = postComments[Number(id)] || [];
  const relatedPosts = feedPosts.filter(p => p.authorId === post?.authorId && p.id !== post?.id).slice(0, 3);

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

    if (diffInMinutes < 60) {
      return `${diffInMinutes}м назад`;
    } else if (diffInHours < 24) {
      return `${diffInHours}ч назад`;
    } else {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long'
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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const canViewFullPost = !post.isPremium || isPremium;

  // Mock data
  const traderStats = {
    roi30d: 24.6,
    winRate: 73,
    followers: 1247,
    signals: 156
  };

  const signalExecution = {
    status: 'active', // 'active' | 'completed' | 'closed'
    daysActive: 3,
    targetReached: 68,
    avgTimeToTarget: 2.5
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 animate-fade-in">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/feed')}
          className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to Feed' : 'Назад в ленту'}
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Author Profile Block */}
            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                      <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-white">@{post.authorName}</h3>
                        {post.authorVerified && <CheckCircle className="w-5 h-5 text-blue-500" />}
                        {post.isPremium && (
                          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                            <Lock className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span className="text-green-400 font-semibold">ROI30d: +{traderStats.roi30d}%</span>
                        <span>•</span>
                        <span className="text-blue-400">WR: {traderStats.winRate}%</span>
                        <span>•</span>
                        <span>{traderStats.followers} подписчиков</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to={`/kol/${post.authorId}`}>
                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      📈 Перейти в профиль трейдера
                    </Button>
                  </Link>
                  
                  {user && !isFollowing && (
                    <Button 
                      variant="outline" 
                      onClick={handleFollow}
                      className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Подписаться на трейдера
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Main Post Content */}
            <Card className="glass-effect border-white/10">
              <CardContent className="p-8">
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

                {/* Trading Signal Card */}
                {post.signal && canViewFullPost && (
                  <div className="mb-6 p-6 bg-black/40 border border-white/10 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        📊 Trading Signal
                        <Badge className={
                          signalExecution.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                          signalExecution.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }>
                          {signalExecution.status === 'active' ? 'В работе' :
                           signalExecution.status === 'completed' ? 'Исполнен' : 'Закрыт'}
                        </Badge>
                      </h4>
                      <div className="text-sm text-gray-400">
                        {formatTime(post.timestamp)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Symbol</p>
                        <p className="text-white font-semibold text-lg">{post.signal.symbol}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Action</p>
                        <Badge 
                          className={post.signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                        >
                          {post.signal.action}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Target</p>
                        <p className="text-white font-semibold text-lg">${post.signal.target.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Confidence</p>
                        <p className="text-white font-semibold text-lg">{post.signal.confidence}%</p>
                      </div>
                    </div>

                    {post.signal.stopLoss && (
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Stop Loss: <span className="text-white">${post.signal.stopLoss.toLocaleString()}</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Execution History */}
                {post.signal && canViewFullPost && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      История исполнения
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">📊 Сделка открыта {signalExecution.daysActive} дня назад</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">🎯 Цена достигнута</span>
                        <span className="text-green-400 font-semibold">{signalExecution.targetReached}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">⏳ Среднее время до цели</span>
                        <span className="text-blue-400">{signalExecution.avgTimeToTarget} дня</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-8">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleLike}
                      className={`flex items-center space-x-3 ${
                        isLiked ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                      }`}
                      disabled={!user}
                    >
                      ❤️ <span className="font-medium text-lg">{likesCount}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex items-center space-x-3 text-gray-400 hover:text-blue-400"
                    >
                      💬 <span className="font-medium text-lg">{post.comments}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex items-center space-x-3 text-gray-400 hover:text-green-400"
                      disabled={!user}
                    >
                      🔁 <span className="font-medium text-lg">{post.reposts}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex items-center space-x-3 text-gray-400 hover:text-blue-400"
                      disabled={!user}
                    >
                      <Share className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Комментарии ({comments.length})
                  </h3>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={commentSort === 'top' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCommentSort('top')}
                      className="text-xs"
                    >
                      Топ
                    </Button>
                    <Button 
                      variant={commentSort === 'recent' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCommentSort('recent')}
                      className="text-xs"
                    >
                      Свежие
                    </Button>
                  </div>
                </div>

                {/* Add comment form */}
                {user ? (
                  <div className="flex space-x-4 mb-8 p-4 bg-black/20 rounded-lg border border-white/10">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-neon-purple to-neon-blue text-white text-sm font-bold">
                        {user.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Написать комментарий..."
                        className="bg-black/30 border-white/20 text-white resize-none"
                        rows={3}
                      />
                      <Button 
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Отправить
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center mb-8 p-6 bg-black/20 rounded-lg border border-white/10">
                    <p className="text-gray-400 mb-4">Войдите, чтобы комментировать</p>
                    <Link to="/login">
                      <Button variant="outline" className="border-white/20">
                        Войти
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Comments list */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4 p-4 bg-black/10 rounded-lg">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                        <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-white">{comment.authorName}</span>
                          <span className="text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                        </div>
                        <p className="text-gray-300 mb-3">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-green-400 transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                          <button className="text-xs text-gray-400 hover:text-white transition-colors">
                            Ответить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Call to Action */}
            <Card className="glass-effect border-white/10">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-4">Действия</h4>
                {!user ? (
                  <div className="space-y-3">
                    <Link to="/login">
                      <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                        Войти, чтобы копировать
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" className="w-full border-white/20">
                        Зарегистрироваться
                      </Button>
                    </Link>
                  </div>
                ) : !isPremium ? (
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
                      Подписаться на трейдера за $5
                    </Button>
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full border-white/20">
                        Перейти на Premium
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Добавить в портфель
                    </Button>
                    <Button variant="outline" className="w-full border-white/20 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Следить за сигналами
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card className="glass-effect border-white/10">
                <CardContent className="p-6">
                  <h4 className="font-bold text-white mb-4">Похожие посты трейдера</h4>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} to={`/post/${relatedPost.id}`}>
                        <div className="p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors border border-white/10">
                          <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                            {relatedPost.content.slice(0, 100)}...
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{formatTime(relatedPost.timestamp)}</span>
                            <span className="text-green-400">+13.5%</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
