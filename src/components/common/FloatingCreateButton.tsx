
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import CreatePostModal from '@/components/social/CreatePostModal';

const FloatingCreateButton = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hide button on mobile (since we have it in bottom nav)
  if (isMobile) {
    return null;
  }

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-all duration-200 hover:scale-105"
      >
        <Plus className="w-8 h-8 text-white" />
      </Button>
      
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingCreateButton;
