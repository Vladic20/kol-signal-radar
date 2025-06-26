
import React, { useState, useEffect } from 'react';

interface PointsNotificationProps {
  points: number;
  action: string;
  show: boolean;
  onHide: () => void;
}

export const PointsNotification: React.FC<PointsNotificationProps> = ({ 
  points, 
  action, 
  show, 
  onHide 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-neon-purple to-neon-blue p-3 rounded-lg shadow-lg border border-white/20">
        <div className="flex items-center space-x-2 text-white">
          <span className="text-lg">💠</span>
          <span className="font-medium">+{points} Points</span>
        </div>
        <p className="text-xs text-white/80 mt-1">{action}</p>
      </div>
    </div>
  );
};
