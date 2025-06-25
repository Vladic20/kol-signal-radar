
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Comment {
  id: number;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentsSectionProps {
  comments: Comment[];
  commentSort: 'top' | 'recent';
  setCommentSort: (sort: 'top' | 'recent') => void;
  user: any;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleSubmitComment: () => void;
  formatTime: (timestamp: string) => string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  commentSort,
  setCommentSort,
  user,
  newComment,
  setNewComment,
  handleSubmitComment,
  formatTime
}) => {
  return (
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
  );
};

export default CommentsSection;
