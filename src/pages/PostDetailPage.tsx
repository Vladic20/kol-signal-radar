
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { feedPosts, postComments } from '@/data/feedData';
import { ArrowLeft, Share } from 'lucide-react';
import AuthorProfileCard from '@/components/post-detail/AuthorProfileCard';
import SignalExecutionCard from '@/components/post-detail/SignalExecutionCard';
import CommentsSection from '@/components/post-detail/CommentsSection';
import RelatedPostsCard from '@/components/post-detail/RelatedPostsCard';
import ActionsSidebar from '@/components/post-detail/ActionsSidebar';

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
    status: 'active' as const,
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
            <AuthorProfileCard
              post={post}
              traderStats={traderStats}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              user={user}
            />

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
                  <SignalExecutionCard
                    signal={post.signal}
                    signalExecution={signalExecution}
                    formatTime={formatTime}
                    timestamp={post.timestamp}
                  />
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Call to Action */}
            <ActionsSidebar user={user} isPremium={isPremium} />

            {/* Related Posts */}
            <RelatedPostsCard relatedPosts={relatedPosts} formatTime={formatTime} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
