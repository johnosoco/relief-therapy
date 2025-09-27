import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BuildingOfficeIcon, MapPinIcon, FaceSmileIcon, UsersIcon } from './Icons';

interface VisitorSupportProps {
  onGetStartedClick: () => void;
}

const featureList = [
    { 
        id: 'accommodation', 
        icon: BuildingOfficeIcon, 
        titleKey: 'visitorSupport.accommodationTitle', 
        descKey: 'visitorSupport.accommodationDesc' 
    },
    { 
        id: 'navigation', 
        icon: MapPinIcon, 
        titleKey: 'visitorSupport.navigationTitle', 
        descKey: 'visitorSupport.navigationDesc' 
    },
    { 
        id: 'psychological', 
        icon: FaceSmileIcon, 
        titleKey: 'visitorSupport.psychologicalTitle', 
        descKey: 'visitorSupport.psychologicalDesc' 
    },
    { 
        id: 'community', 
        icon: UsersIcon, 
        titleKey: 'visitorSupport.communityTitle', 
        descKey: 'visitorSupport.communityDesc' 
    },
];

export default function VisitorSupport({ onGetStartedClick }: VisitorSupportProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        },
        { threshold: 0.1 }
    );
    if (sectionRef.current) {
        observer.observe(sectionRef.current);
    }
    return () => {
        if (sectionRef.current) {
            observer.disconnect();
        }
    };
  }, []);

  return (
    <section 
      id="visitor-support" 
      ref={sectionRef}
      className={`py-12 md:py-16 bg-sky-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-5">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('visitorSupport.title')}</h2>
            <p className="text-lg font-medium text-blue-600 mb-4">{t('visitorSupport.subtitle')}</p>
            <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-12">{t('visitorSupport.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featureList.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div 
                        key={feature.id} 
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
                            <Icon className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{t(feature.titleKey)}</h3>
                        <p className="text-sm text-gray-600">{t(feature.descKey)}</p>
                    </div>
                );
            })}
        </div>

        <div className="text-center">
            <button
                onClick={onGetStartedClick}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                {t('visitorSupport.getStarted')}
            </button>
        </div>
      </div>
    </section>
  );
}