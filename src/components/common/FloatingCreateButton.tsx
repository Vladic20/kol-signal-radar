
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingCreateButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Hide button on create post page
  if (location.pathname === '/create-post') {
    return null;
  }

  const handleClick = () => {
    navigate('/create-post');
  };

  return (
    <Button
      onClick={handleClick}
      className={`fixed ${
        isMobile 
          ? 'bottom-28 right-4 w-14 h-14 rounded-full shadow-lg z-40' 
          : 'bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50'
      } bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-all duration-200 hover:scale-105`}
    >
      <Plus className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
    </Button>
  );
};

export default FloatingCreateButton;
