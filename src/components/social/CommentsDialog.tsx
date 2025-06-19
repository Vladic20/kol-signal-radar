
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { postComments, Comment } from '@/data/feedData';

interface CommentsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  postId: number;
}

export const CommentsDialog: React.FC<CommentsDialogProps> = ({
  isOpen,
  setIsOpen,
  postId
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const comments = postComments[postId] || [];

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;
    // Here you would add the comment to your state/database
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
      <DialogContent className="glass-effect border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {language === 'en' ? 'Comments' : 'Комментарии'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add comment form */}
          {user ? (
            <div className="flex space-x-3 p-4 bg-black/20 rounded-lg border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center text-white text-sm font-bold">
                {user.name?.[0] || 'U'}
              </div>
              <div className="flex-1 space-y-3">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={language === 'en' ? 'Write a comment...' : 'Написать комментарий...'}
                  className="bg-black/30 border-white/20 text-white resize-none"
                  rows={3}
                />
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {language === 'en' ? 'Post Comment' : 'Отправить'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
              <p className="text-gray-400 mb-3">
                {language === 'en' ? 'Login to comment' : 'Войдите, чтобы комментировать'}
              </p>
              <Button variant="outline" className="border-white/20">
                {language === 'en' ? 'Login' : 'Войти'}
              </Button>
            </div>
          )}

          {/* Comments list */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3 p-3 bg-black/10 rounded-lg">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img src={comment.authorAvatar} alt={comment.authorName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-white text-sm">{comment.authorName}</span>
                    <span className="text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white">
                      <Heart className="w-3 h-3" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
