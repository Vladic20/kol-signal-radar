
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Lock, TrendingUp, Users } from 'lucide-react';

interface AuthorProfileCardProps {
  post: {
    authorId: number;
    authorName: string;
    authorAvatar: string;
    authorVerified: boolean;
    isPremium?: boolean;
  };
  traderStats: {
    roi30d: number;
    winRate: number;
    followers: number;
    signals: number;
  };
  isFollowing: boolean;
  onFollow: () => void;
  user: any;
}

const AuthorProfileCard: React.FC<AuthorProfileCardProps> = ({
  post,
  traderStats,
  isFollowing,
  onFollow,
  user
}) => {
  return (
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
              onClick={onFollow}
              className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Подписаться на трейдера
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorProfileCard;
