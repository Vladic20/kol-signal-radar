
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { feedPosts, postComments } from '@/data/feedData';
import { ArrowLeft, Share, Heart, MessageCircle, Repeat, Bell, Link as LinkIcon } from 'lucide-react';
import AuthorProfileCard from '@/components/post-detail/AuthorProfileCard';
import SignalExecutionCard from '@/components/post-detail/SignalExecutionCard';
import CommentsSection from '@/components/post-detail/CommentsSection';
import RelatedPostsCard from '@/components/post-detail/RelatedPostsCard';
import ActionsSidebar from '@/components/post-detail/ActionsSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, isPremium } = useAuth();
  const isMobile = useIsMobile();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [commentSort, setCommentSort] = useState<'top' | 'recent'>('top');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

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
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}м назад`;
    } else if (diffInHours < 24) {
      return `${diffInHours}ч назад`;
    } else if (diffInDays === 1) {
      return 'вчера';
    } else {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Интересный сигнал от ${post.authorName}: ${post.content.slice(0, 100)}...`;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
    }
    setShowShareMenu(false);
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
    status: 'active' as const,
    daysActive: 3,
    targetReached: 68,
    avgTimeToTarget: 2.5
  };

  return (
    <Layout>
      <div className={`max-w-7xl mx-auto py-4 md:py-8 animate-fade-in ${isMobile ? 'px-4' : 'px-6'}`}>
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/feed')}
          className="mb-4 md:mb-6 text-gray-400 hover:text-white flex items-center gap-2"
          size={isMobile ? "sm" : "default"}
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to Feed' : 'Назад в ленту'}
        </Button>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'xl:grid-cols-3 gap-6 lg:gap-8'}`}>
          {/* Main Content */}
          <div className={`${isMobile ? '' : 'xl:col-span-2'} space-y-4 md:space-y-6`}>
            {/* Author Profile Block */}
            <AuthorProfileCard
              post={post}
              traderStats={traderStats}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              user={user}
            />

            {/* Main Post Content */}
            <Card className="glass-effect border-white/10">
              <CardContent className={`${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
                {/* Post metadata */}
                <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <span className="text-xs md:text-sm text-gray-400">
                      {formatTime(post.timestamp)}
                    </span>
                    {post.tags && (
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-neon-purple/50 text-neon-purple">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    
                    {showShareMenu && (
                      <div className={`absolute right-0 top-full mt-2 bg-black/90 border border-white/10 rounded-lg p-2 min-w-[180px] z-50 ${isMobile ? 'shadow-2xl' : ''}`}>
                        <button 
                          onClick={() => handleShare('copy')}
                          className="flex items-center gap-2 w-full p-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Скопировать ссылку
                        </button>
                        <button 
                          onClick={() => handleShare('telegram')}
                          className="flex items-center gap-2 w-full p-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          📱 Поделиться в Telegram
                        </button>
                        <button 
                          onClick={() => handleShare('twitter')}
                          className="flex items-center gap-2 w-full p-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          🐦 Поделиться в X
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4 md:mb-6">
                  <div className="prose prose-invert max-w-none">
                    <p className={`text-gray-100 leading-relaxed whitespace-pre-line ${isMobile ? 'text-base' : 'text-lg'}`}>
                      {canViewFullPost ? post.content : post.content.slice(0, 150) + '...'}
                    </p>
                  </div>
                  
                  {!canViewFullPost && (
                    <div className={`mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/30 rounded-lg`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full flex items-center justify-center">
                          🔒
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Только для Premium</h4>
                          <p className="text-sm text-gray-300">
                            Подпишитесь, чтобы увидеть полный анализ и сигналы
                          </p>
                        </div>
                      </div>
                      <div className={`grid grid-cols-1 ${isMobile ? 'gap-2' : 'md:grid-cols-2 gap-3'}`}>
                        <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90" size={isMobile ? "sm" : "default"}>
                          {language === 'en' ? 'Upgrade to Premium' : 'Перейти на Premium'}
                        </Button>
                        <Button variant="outline" className="border-white/20" size={isMobile ? "sm" : "default"}>
                          Купить доступ к сигналу ($5)
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Images */}
                {post.images && post.images.length > 0 && canViewFullPost && (
                  <div className="mb-4 md:mb-6">
                    <div className="grid grid-cols-1 gap-3 rounded-lg overflow-hidden">
                      {post.images.map((image, index) => (
                        <img key={index} src={image} alt="" className={`w-full object-cover rounded-lg ${isMobile ? 'h-48' : 'h-80'}`} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Trading Signal Card */}
                {post.signal && canViewFullPost && (
                  <SignalExecutionCard
                    signal={post.signal}
                    signalExecution={signalExecution}
                    formatTime={formatTime}
                    timestamp={post.timestamp}
                  />
                )}

                {/* Actions */}
                <div className={`flex items-center justify-between pt-4 md:pt-6 border-t border-white/10 ${isMobile ? 'space-x-4' : 'space-x-6'}`}>
                  <div className={`flex items-center ${isMobile ? 'space-x-4' : 'space-x-6'}`}>
                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "lg"}
                      onClick={handleLike}
                      className={`flex items-center space-x-2 ${
                        isLiked ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                      }`}
                      disabled={!user}
                    >
                      <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium text-sm md:text-base">{likesCount}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "lg"}
                      className="flex items-center space-x-2 text-gray-400 hover:text-blue-400"
                    >
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-medium text-sm md:text-base">{post.comments}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "lg"}
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400"
                      disabled={!user}
                    >
                      <Repeat className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-medium text-sm md:text-base">{post.reposts}</span>
                    </Button>

                    {user && !isMobile && (
                      <Button
                        variant="ghost"
                        size="lg"
                        className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400"
                      >
                        <Bell className="w-5 h-5" />
                        <span className="text-sm">Следить</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Stats */}
            {canViewFullPost && (
              <Card className="glass-effect border-white/10">
                <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                  <h4 className="font-semibold text-white mb-4">📈 Последние результаты автора</h4>
                  <div className={`grid grid-cols-3 gap-2 md:gap-4 text-center`}>
                    <div className={`${isMobile ? 'p-2' : 'p-3'} bg-black/20 rounded-lg`}>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>Последние 5 сигналов</div>
                      <div className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-green-400`}>+12.3%</div>
                    </div>
                    <div className={`${isMobile ? 'p-2' : 'p-3'} bg-black/20 rounded-lg`}>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>Win Rate</div>
                      <div className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-blue-400`}>73%</div>
                    </div>
                    <div className={`${isMobile ? 'p-2' : 'p-3'} bg-black/20 rounded-lg`}>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>Активных сигналов</div>
                      <div className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white`}>8</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <CommentsSection
              comments={comments}
              commentSort={commentSort}
              setCommentSort={setCommentSort}
              user={user}
              newComment={newComment}
              setNewComment={setNewComment}
              handleSubmitComment={handleSubmitComment}
              formatTime={formatTime}
            />
          </div>

          {/* Sidebar - только на десктопе */}
          {!isMobile && (
            <div className="space-y-6">
              {/* Call to Action */}
              <ActionsSidebar user={user} isPremium={isPremium || false} />

              {/* Related Posts */}
              <RelatedPostsCard relatedPosts={relatedPosts} formatTime={formatTime} />
            </div>
          )}
        </div>

        {/* Mobile Bottom Actions */}
        {isMobile && user && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-4 z-40">
            <div className="flex items-center justify-between max-w-sm mx-auto">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400"
              >
                <Bell className="w-4 h-4" />
                <span className="text-xs">Следить</span>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
              >
                Подписаться
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Actions Sidebar как отдельная секция */}
        {isMobile && (
          <div className="mt-6 space-y-4">
            <ActionsSidebar user={user} isPremium={isPremium || false} />
            <RelatedPostsCard relatedPosts={relatedPosts} formatTime={formatTime} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostDetailPage;
