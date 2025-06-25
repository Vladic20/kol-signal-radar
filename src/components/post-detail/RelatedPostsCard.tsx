
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface RelatedPost {
  id: number;
  content: string;
  timestamp: string;
}

interface RelatedPostsCardProps {
  relatedPosts: RelatedPost[];
  formatTime: (timestamp: string) => string;
}

const RelatedPostsCard: React.FC<RelatedPostsCardProps> = ({
  relatedPosts,
  formatTime
}) => {
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
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
  );
};

export default RelatedPostsCard;
