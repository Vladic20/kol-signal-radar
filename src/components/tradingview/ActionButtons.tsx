
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Bell, ExternalLink, Share, MoreHorizontal } from 'lucide-react';
import { TradingViewCaller } from '@/data/tradingViewCallers';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActionButtonsProps {
  caller: TradingViewCaller;
  user: any;
  isPremium: boolean;
  isFollowing: boolean;
  onFollow: () => void;
}

const ActionButtons = ({ caller, user, isPremium, isFollowing, onFollow }: ActionButtonsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col mt-4 space-y-2' : 'space-x-2'} md:mt-0`}>
      {user && (caller.premium ? isPremium : true) ? (
        <>
          <Button
            onClick={onFollow}
            className={`${isFollowing 
              ? 'bg-gray-600 hover:bg-red-600 hover:text-white' 
              : 'bg-blue-600 hover:bg-blue-700'
            } ${isMobile ? 'w-full' : ''}`}
          >
            <Users className="w-4 h-4 mr-2" />
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          <Button variant="outline" className={`border-white/20 ${isMobile ? 'w-full' : ''}`}>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </>
      ) : (
        <Link to="/login">
          <Button className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'w-full' : ''}`}>
            Follow
          </Button>
        </Link>
      )}
      <Button variant="outline" size="icon" className="border-white/20">
        <ExternalLink className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" className="border-white/20">
        <Share className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" className="border-white/20">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ActionButtons;
