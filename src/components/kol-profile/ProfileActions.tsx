
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Bell, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileActionsProps {
  user: any;
  isFollowing: boolean;
  onFollow: () => void;
}

const ProfileActions = ({ user, isFollowing, onFollow }: ProfileActionsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col mt-4 space-y-2' : 'space-x-2'} md:mt-0`}>
      {user ? (
        <>
          <Button
            onClick={onFollow}
            className={`${isFollowing 
              ? 'bg-gray-600 hover:bg-red-600 hover:text-white' 
              : 'bg-neon-purple hover:bg-neon-purple/80'
            } ${isMobile ? 'w-full' : ''}`}
          >
            <Users className="w-4 h-4 mr-2" />
            {isFollowing ? 'Отписаться' : 'Подписаться'}
          </Button>
          <Button variant="outline" className={`border-white/20 ${isMobile ? 'w-full' : ''}`}>
            <Bell className="w-4 h-4 mr-2" />
            Уведомления
          </Button>
          <Button variant="outline" size="icon" className="border-white/20">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <Link to="/login">
          <Button className={`bg-neon-purple hover:bg-neon-purple/80 ${isMobile ? 'w-full' : ''}`}>
            Подписаться
          </Button>
        </Link>
      )}
      <Button variant="outline" size="icon" className="border-white/20">
        <Share className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" className="border-white/20">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProfileActions;
