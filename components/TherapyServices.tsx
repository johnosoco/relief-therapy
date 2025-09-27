import React, { useState } from 'react';
import { type TherapyService } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useData } from '../contexts/DataContext';
import { serviceIcons } from '../constants';
import { StarIcon } from './Icons';

interface TherapyServicesProps {
  onServiceSelect: (service: TherapyService) => void;
}

export default function TherapyServices({ onServiceSelect }: TherapyServicesProps) {
  const { t } = useLanguage();
  const { services: servicesData, isLoading } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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

  const services: TherapyService[] = servicesData.map(service => ({
      ...service,
      icon: serviceIcons[service.id as keyof typeof serviceIcons],
      title: t(`service.${service.id}.name`),
      description: t(`service.${service.id}.description`),
      shortDescription: t(`service.${service.id}.short`),
      price: t('services.priceFlexible'),
  }));

  const handleCardClick = (service: TherapyService) => {
    onServiceSelect(service);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, service: TherapyService) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(service);
    }
  };

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => 
    selectedCategory === 'All' || service.category === selectedCategory
  );

  return (
    <section 
      id="services" 
      className="py-12 md:py-16 -mt-20 relative z-10"
    >
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">{t('services.title')}</h2>
        <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-10">{t('services.description')}</p>
        
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {t(`categories.${category.toLowerCase()}`)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => handleCardClick(service)}
              onKeyDown={(e) => handleKeyDown(e, service)}
              role="button"
              tabIndex={0}
              aria-label={`Select service: ${service.title}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ borderLeft: `4px solid ${service.color}` }}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${service.color}20` }}>
                  <service.icon className="h-6 w-6" style={{ color: service.color }} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4 h-10">{service.shortDescription}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-amber-400"/>
                    <span className="font-semibold text-gray-700">{service.rating}</span>
                    <span className="text-gray-500">({service.reviewCount})</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}