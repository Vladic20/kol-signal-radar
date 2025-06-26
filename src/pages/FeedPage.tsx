
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PostCard } from '@/components/social/PostCard';
import { CreatePostDialog } from '@/components/social/CreatePostDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { feedPosts } from '@/data/feedData';
import { Plus, TrendingUp, Users, Clock } from 'lucide-react';

const FeedPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

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
      <div className="py-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Лента
          </h1>
          <Button 
            onClick={() => setIsCreatePostOpen(true)}
            className="bg-neon-purple hover:bg-neon-purple/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            Создать пост
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10">
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-neon-purple/20 flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Популярное</span>
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="data-[state=active]:bg-neon-purple/20 flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Подписки</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recent" 
              className="data-[state=active]:bg-neon-purple/20 flex items-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Недавние</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6 mt-6">
            {getFilteredPosts().map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="following" className="space-y-6 mt-6">
            {getFilteredPosts().length > 0 ? (
              getFilteredPosts().map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Подпишитесь на KOL'ов, чтобы видеть их посты</p>
                <Button variant="outline" className="border-white/20">
                  Найти KOL'ов
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6 mt-6">
            {getFilteredPosts().map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Create Post Dialog */}
        <CreatePostDialog 
          isOpen={isCreatePostOpen} 
          setIsOpen={setIsCreatePostOpen} 
        />
      </div>
    </Layout>
  );
};

export default FeedPage;
