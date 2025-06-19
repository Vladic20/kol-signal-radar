
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { postComments, Comment } from '@/data/feedData';
import { Heart, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface CommentsDialogProps {
  postId: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CommentsDialog: React.FC<CommentsDialogProps> = ({ postId, isOpen, setIsOpen }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(postComments[postId] || []);

  const handleSubmitComment = () => {
    if (!user || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar || '/placeholder.svg',
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: language === 'ru' ? ru : undefined
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Comments' : 'Комментарии'} ({comments.length})
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Comment Input */}
          {user ? (
            <div className="space-y-3 mb-6 border-b border-white/10 pb-4">
              <Textarea
                placeholder={language === 'en' ? 'Write a comment...' : 'Написать комментарий...'}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-black/40 border-white/10 resize-none"
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Post Comment' : 'Отправить'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 mb-6 border-b border-white/10">
              <p className="text-gray-400 mb-3">
                {language === 'en' 
                  ? 'Login to join the conversation' 
                  : 'Войдите, чтобы участвовать в обсуждении'}
              </p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {language === 'en' ? 'Login' : 'Войти'}
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  {language === 'en' ? 'No comments yet. Be the first!' : 'Пока нет комментариев. Будьте первым!'}
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img src={comment.authorAvatar} alt={comment.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-white text-sm">{comment.authorName}</h4>
                        <span className="text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-100 text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500 h-auto p-1"
                        disabled={!user}
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        <span className="text-xs">{comment.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white h-auto p-1 text-xs"
                        disabled={!user}
                      >
                        {language === 'en' ? 'Reply' : 'Ответить'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
