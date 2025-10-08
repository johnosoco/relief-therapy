import React from 'react';
import { type TherapyService } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useData } from '../contexts/DataContext';
import { serviceIcons } from '../constants';
import { LogoIcon } from './Icons';
import AdPlacement from './AdPlacement';

interface TherapyServicesProps {
  onServiceSelect: (service: TherapyService) => void;
}

// FIX: Extracted props into a separate interface and typed the component as React.FC.
// This resolves the TypeScript error where the 'key' prop was not recognized.
interface ServiceCardProps {
  service: TherapyService;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const { t } = useLanguage();
  const Icon = serviceIcons[service.id] || LogoIcon;

  return (
    <div 
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col group border border-transparent hover:border-blue-300"
    >
        <div className="p-4 sm:p-6">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4">
                <div 
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: service.color }}
                >
                    <Icon className="h-7 w-7 text-white" />
                </div>
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{service.shortDescription}</p>
                </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2">
                <div className="flex items-center gap-1 text-amber-500">
                    <LogoIcon className="w-4 h-4" />
                    <span className="font-bold">{service.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({service.reviewCount} reviews)</span>
                </div>
                <div className="text-gray-700 font-semibold">{service.duration}</div>
            </div>
        </div>
        <div className="mt-auto px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
            <button
                onClick={onSelect}
                className="w-full bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
            >
                {t('welcome.ctaBook')}
            </button>
        </div>
    </div>
  );
};


export default function TherapyServices({ onServiceSelect }: TherapyServicesProps) {
  const { t } = useLanguage();
  const { services: servicesData, isLoading } = useData();
  
  const allServices: TherapyService[] = servicesData.map(service => ({
      ...service,
      title: t(`service.${service.id}.name`),
      shortDescription: t(`service.${service.id}.short`),
      description: t(`service.${service.id}.description`),
      price: t('services.priceFlexible'),
      icon: serviceIcons[service.id] || LogoIcon,
  }));

  const servicesWithAds = allServices.reduce<React.ReactNode[]>((acc, service, index) => {
    acc.push(
        <ServiceCard
            key={service.id}
            service={service}
            onSelect={() => onServiceSelect(service)}
        />
    );
    // Insert an ad after the 4th service (index 3)
    if (index === 3) {
        acc.push(
          <div key="ad-1" className="col-span-2">
            <AdPlacement className="h-48 my-0" />
          </div>
        );
    }
    return acc;
  }, []);

  if (isLoading) {
    return (
        <section id="services" className="py-12 md:py-16 -mt-20 relative z-10">
            <div className="container mx-auto px-5 text-center flex justify-center items-center h-64">
                <div className="spinner w-12 h-12 border-4 border-gray-300 border-b-blue-600"></div>
                <style>{`.spinner { border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; } @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        </section>
    );
  }

  return (
    <section id="services" className="py-12 md:py-16 -mt-20 relative z-10">
        <div className="container mx-auto px-5">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t('services.title')}</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t('services.description')}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
                {servicesWithAds}
            </div>
        </div>
    </section>
  );
}