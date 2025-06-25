
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Lock, TrendingUp, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <Card className="glass-effect border-white/10">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className={`flex items-start justify-between ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <div className="flex items-center space-x-3 md:space-x-4 flex-1">
            <Avatar className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} flex-shrink-0`}>
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className={`flex items-center space-x-2 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white truncate`}>
                  @{post.authorName}
                </h3>
                {post.authorVerified && <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />}
                {post.isPremium && (
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs flex-shrink-0">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <div className={`flex flex-wrap items-center gap-1 md:gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
                <span className="text-green-400 font-semibold">ROI30d: +{traderStats.roi30d}%</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-blue-400">WR: {traderStats.winRate}%</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{traderStats.followers} подписчиков</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-3'}`}>
          <Link to={`/kol/${post.authorId}`} className="flex-1">
            <Button 
              className={`bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 flex items-center gap-2 ${isMobile ? 'w-full justify-center text-sm' : ''}`}
              size={isMobile ? "sm" : "default"}
            >
              <TrendingUp className="w-4 h-4" />
              📈 Перейти в профиль трейдера
            </Button>
          </Link>
          
          {user && !isFollowing && (
            <Button 
              variant="outline" 
              onClick={onFollow}
              className={`border-neon-purple text-neon-purple hover:bg-neon-purple/10 flex items-center gap-2 ${isMobile ? 'w-full justify-center text-sm' : ''}`}
              size={isMobile ? "sm" : "default"}
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
