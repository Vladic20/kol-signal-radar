
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PostCard } from '@/components/social/PostCard';
import { CreatePostDialog } from '@/components/social/CreatePostDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { feedPosts } from '@/data/feedData';
import { Plus, TrendingUp, Clock, Star } from 'lucide-react';

const FeedPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  const filteredPosts = feedPosts.sort((a, b) => {
    if (activeTab === 'trending') return b.likes - a.likes;
    if (activeTab === 'recent') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    if (activeTab === 'following') return b.likes - a.likes; // TODO: filter by following
    return 0;
  });

  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
              {language === 'en' ? 'Trading Feed' : 'Лента трейдеров'}
            </h1>
            <p className="text-gray-400 mt-2">
              {language === 'en' 
                ? 'Latest insights and signals from top traders' 
                : 'Последние инсайты и сигналы от топовых трейдеров'}
            </p>
          </div>
          
          {user && (
            <Button 
              onClick={() => setIsCreatePostOpen(true)}
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2"
            >
              <Plus size={20} />
              {language === 'en' ? 'Create Post' : 'Создать пост'}
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 max-w-md bg-black/20 border border-white/10">
            <TabsTrigger value="trending" className="data-[state=active]:bg-neon-purple/20 flex items-center gap-2">
              <TrendingUp size={16} />
              {language === 'en' ? 'Trending' : 'Популярное'}
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-neon-purple/20 flex items-center gap-2">
              <Clock size={16} />
              {language === 'en' ? 'Recent' : 'Новое'}
            </TabsTrigger>
            <TabsTrigger value="following" className="data-[state=active]:bg-neon-purple/20 flex items-center gap-2">
              <Star size={16} />
              {language === 'en' ? 'Following' : 'Подписки'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-white/20">
            {language === 'en' ? 'Load More Posts' : 'Загрузить ещё'}
          </Button>
        </div>

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
