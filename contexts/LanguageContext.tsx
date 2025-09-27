import React, { createContext, useState, useCallback, PropsWithChildren } from 'react';
import { type Language } from '../types';
import { useData } from './DataContext';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// FIX: Changed component props to use PropsWithChildren to fix type error in index.tsx.
export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>('en');
  const { translations } = useData();

  const t = useCallback((key: string, replacements?: { [key: string]: string }): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    
    let translatedString = typeof result === 'string' ? result : key;

    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`{{${rKey}}}`, 'g');
            translatedString = translatedString.replace(regex, replacements[rKey]);
        });
    }

    return translatedString;
  }, [language, translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};