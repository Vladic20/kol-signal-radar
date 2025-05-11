
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Определение типа контекста для глобального состояния API
interface ApiContextType {
  // Глобальное состояние загрузки для блокировки UI при важных запросах
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  
  // Счетчик активных запросов для показа индикатора загрузки
  pendingRequests: number;
  incrementPendingRequests: () => void;
  decrementPendingRequests: () => void;
}

// Создание контекста с начальными значениями
const ApiContext = createContext<ApiContextType>({
  globalLoading: false,
  setGlobalLoading: () => {},
  pendingRequests: 0,
  incrementPendingRequests: () => {},
  decrementPendingRequests: () => {}
});

// Хук для использования контекста API
export const useApiContext = () => useContext(ApiContext);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0);

  const incrementPendingRequests = () => {
    setPendingRequests(prev => prev + 1);
  };

  const decrementPendingRequests = () => {
    setPendingRequests(prev => Math.max(0, prev - 1));
  };

  const value = {
    globalLoading,
    setGlobalLoading,
    pendingRequests,
    incrementPendingRequests,
    decrementPendingRequests
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
