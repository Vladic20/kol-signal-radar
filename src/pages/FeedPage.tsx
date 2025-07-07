
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PostCard } from '@/components/social/PostCard';
import { PostDetailModal } from '@/components/social/PostDetailModal';
import CreatePostModal from '@/components/social/CreatePostModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { feedPosts, FeedPost } from '@/data/feedData';
import { Plus, TrendingUp, Users, Clock, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FeedPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');
  const isMobile = useIsMobile();

  const handlePostClick = (post: FeedPost) => {
    setSelectedPost(post);
    setIsPostDetailOpen(true);
  };

  const handleClosePostDetail = () => {
    setIsPostDetailOpen(false);
    setSelectedPost(null);
  };

  // Фильтруем посты в зависимости от вкладки
  const getFilteredPosts = () => {
    switch (activeTab) {
      case 'following':
        return feedPosts.filter(post => post.isFollowing);
      case 'recent':
        return [...feedPosts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      default:
        return feedPosts.filter(post => post.likes >= 50);
    }
  };

  return (
    <Layout showSidebar={true}>
      <div className={`py-4 md:py-8 ${isMobile ? 'max-w-full px-0' : 'max-w-2xl px-0'} mx-auto`}>
        {/* Header */}
        <div className={`flex justify-between items-center mb-6 md:mb-8 ${isMobile ? 'px-4' : 'px-0'}`}>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Лента
          </h1>
          {!isMobile && (
            <Button 
              onClick={() => setIsCreatePostOpen(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать пост
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className={isMobile ? 'px-4' : 'px-0'}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 md:mb-8">
            <TabsList className={`grid w-full grid-cols-3 bg-black/20 border border-white/10 ${
              isMobile ? 'h-12 sticky top-16 z-30' : 'h-10'
            }`}>
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple flex items-center space-x-1 md:space-x-2 text-xs md:text-sm transition-all"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Популярное</span>
                <span className="sm:hidden">Топ</span>
              </TabsTrigger>
              <TabsTrigger 
                value="following" 
                className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple flex items-center space-x-1 md:space-x-2 text-xs md:text-sm transition-all"
              >
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Подписки</span>
                <span className="sm:hidden">Мои</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple flex items-center space-x-1 md:space-x-2 text-xs md:text-sm transition-all"
              >
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Недавние</span>
                <span className="sm:hidden">Новые</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-3 md:space-y-6 mt-4 md:mt-6">
              <div className={isMobile ? 'px-0' : ''}>
                {getFilteredPosts().map(post => (
                  <div key={post.id} className={`${isMobile ? 'mb-3' : 'mb-6'}`}>
                    <PostCard post={post} onPostClick={handlePostClick} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="following" className="space-y-3 md:space-y-6 mt-4 md:mt-6">
              <div className={isMobile ? 'px-0' : ''}>
                {getFilteredPosts().length > 0 ? (
                  getFilteredPosts().map(post => (
                    <div key={post.id} className={`${isMobile ? 'mb-3' : 'mb-6'}`}>
                      <PostCard post={post} onPostClick={handlePostClick} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Users className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400 mb-4 text-sm md:text-base">Подпишитесь на KOL'ов, чтобы видеть их посты</p>
                    <Button variant="outline" className="border-white/20 text-sm hover:bg-white/5">
                      Найти KOL'ов
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-3 md:space-y-6 mt-4 md:mt-6">
              <div className={isMobile ? 'px-0' : ''}>
                {getFilteredPosts().map(post => (
                    <div key={post.id} className={`${isMobile ? 'mb-3' : 'mb-6'}`}>
                      <PostCard post={post} onPostClick={handlePostClick} />
                    </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal 
          isOpen={isCreatePostOpen} 
          onClose={() => setIsCreatePostOpen(false)} 
        />

        {/* Post Detail Modal */}
        <PostDetailModal
          post={selectedPost}
          isOpen={isPostDetailOpen}
          onClose={handleClosePostDetail}
        />
      </div>
    </Layout>
  );
};

export default FeedPage;
