
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../data/mockData';

type LanguageType = 'en' | 'ru';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  // Translation function
  const t = (key: keyof typeof translations) => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${String(key)}`);
      return String(key);
    }
    return translations[key][language] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
