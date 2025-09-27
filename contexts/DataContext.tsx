import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import { type SerializableTherapyServiceData, type Translations } from '../types';
import { therapyServicesData as onlineServices, faqsData as onlineFaqs, translations as onlineTranslations } from '../constants';

interface FaqData {
    id: number;
    question: string;
    answer: string;
}

interface DataContextType {
  services: SerializableTherapyServiceData[];
  faqs: FaqData[];
  translations: Translations;
  isOffline: boolean;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const CACHE_KEYS = {
    SERVICES: 'relief-psych-cached-services',
    FAQS: 'relief-psych-cached-faqs',
    TRANSLATIONS: 'relief-psych-cached-translations'
};

// FIX: Changed component props to use PropsWithChildren to fix type error in index.tsx.
export const DataProvider = ({ children }: PropsWithChildren) => {
    const [services, setServices] = useState<SerializableTherapyServiceData[]>([]);
    const [faqs, setFaqs] = useState<FaqData[]>([]);
    const [translations, setTranslations] = useState<Translations>({ en: {}, am: {} });
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    
    useEffect(() => {
        const loadData = () => {
            setIsLoading(true);
            try {
                if (!isOffline) {
                    // Online: load from constants and update cache
                    localStorage.setItem(CACHE_KEYS.SERVICES, JSON.stringify(onlineServices));
                    localStorage.setItem(CACHE_KEYS.FAQS, JSON.stringify(onlineFaqs));
                    localStorage.setItem(CACHE_KEYS.TRANSLATIONS, JSON.stringify(onlineTranslations));

                    setServices(onlineServices);
                    setFaqs(onlineFaqs);
                    setTranslations(onlineTranslations);
                } else {
                    // Offline: load from cache
                    const cachedServices = localStorage.getItem(CACHE_KEYS.SERVICES);
                    const cachedFaqs = localStorage.getItem(CACHE_KEYS.FAQS);
                    const cachedTranslations = localStorage.getItem(CACHE_KEYS.TRANSLATIONS);
                    
                    if (cachedServices && cachedFaqs && cachedTranslations) {
                        setServices(JSON.parse(cachedServices));
                        setFaqs(JSON.parse(cachedFaqs));
                        setTranslations(JSON.parse(cachedTranslations));
                    } else {
                        // Fallback to online constants if cache is empty, ensures first-time offline works if app is bundled.
                        setServices(onlineServices);
                        setFaqs(onlineFaqs);
                        setTranslations(onlineTranslations);
                    }
                }
            } catch (error) {
                console.error("Failed to load or cache data:", error);
                // Fallback to bundled data on any error
                setServices(onlineServices);
                setFaqs(onlineFaqs);
                setTranslations(onlineTranslations);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [isOffline]);

    const value = { services, faqs, translations, isOffline, isLoading };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};