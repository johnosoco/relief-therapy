import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { useData } from './contexts/DataContext';
import { useAuth } from './hooks/useAuth';
import { type TherapyService } from './types';

// Components
import Welcome from './components/Welcome';
import TherapyServices from './components/TherapyServices';
import BookingModal from './components/BookingModal';
import ContactModal from './components/ContactModal';
import AccommodationModal from './components/AccommodationModal';
import CEOProfileModal from './components/CEOProfileModal';
import InfoTabs from './components/InfoTabs';
import Testimonials from './components/Testimonials';
import LiveChat from './components/LiveChat';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import UserMenu from './components/UserMenu';
import ProfileModal from './components/ProfileModal';
import AdBanner from './components/AdBanner';
import AdPlacement from './components/AdPlacement';


// Icons
import { LogoIcon, UkFlagIcon, EthiopiaFlagIcon } from './components/Icons';


// Splash Screen Component
const SplashScreen = () => (
  <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ease-out">
    <LogoIcon className="h-24 w-auto mb-4 animate-pulse" />
    <h1 className="text-2xl font-bold text-gray-700">Relief Psychological Service</h1>
    <p className="text-gray-500 mt-2">Your safe space for emotional healing.</p>
  </div>
);

// Auth Loader Component
const AuthLoader = () => (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center">
        <div className="spinner w-12 h-12 border-4 border-gray-300 border-b-blue-600"></div>
        <style>{`.spinner { border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; } @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
);

// Main Application Component (for authenticated users)
const MainApplication = () => {
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [isAccommodationModalVisible, setAccommodationModalVisible] = useState(false);
  const [isCEOModalVisible, setCEOModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [initialInfoTab, setInitialInfoTab] = useState('visitorSupport');
  
  const [selectedService, setSelectedService] = useState<TherapyService | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { isLoading } = useData();
  const { user } = useAuth();

  const [originalMeta] = useState(() => {
    const descriptionTag = document.querySelector('meta[name="description"]');
    return {
      title: document.title,
      description: descriptionTag ? descriptionTag.getAttribute('content') || '' : '',
    };
  });

  useEffect(() => {
    const descriptionTag = document.querySelector('meta[name="description"]');

    if (selectedService) {
        document.title = `${selectedService.title} | Relief Psychological Service`;
        if (descriptionTag) {
            descriptionTag.setAttribute('content', selectedService.shortDescription);
        }
    } else {
        document.title = originalMeta.title;
        if (descriptionTag) {
            descriptionTag.setAttribute('content', originalMeta.description);
        }
    }
  }, [selectedService, originalMeta]);

  useEffect(() => {
    if (!isLoading) {
      const loader = document.getElementById('loader');
      if (loader) {
          loader.style.opacity = '0';
          loader.addEventListener('transitionend', () => loader.remove());
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
        setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (service: TherapyService) => {
    setSelectedService(service);
    setBookingModalVisible(true);
  };

  const handleOpenContactModal = () => {
    setContactModalVisible(true);
  };
  
  const handleOpenAccommodationModal = () => {
    setAccommodationModalVisible(true);
  };
  
  const handleOpenCEOModal = () => {
    setCEOModalVisible(true);
  };
  
  const handleOpenProfileModal = () => {
    setProfileModalVisible(true);
  };

  const handleCloseModals = () => {
    setBookingModalVisible(false);
    setContactModalVisible(false);
    setAccommodationModalVisible(false);
    setCEOModalVisible(false);
    setProfileModalVisible(false);
    setSelectedService(null);
  };
  
  const scrollToSection = (id: string, tabId?: string) => {
    const element = document.getElementById(id);
    if (element) {
        // Adjust for sticky header height
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    }
    if (tabId) {
      setInitialInfoTab(tabId);
    }
  };
  
  const genericService: TherapyService = useMemo(() => ({
      id: 'general-inquiry',
      title: t('services.generalInquiry.title'),
      description: t('services.generalInquiry.description'),
      shortDescription: '',
      price: t('services.priceFlexible'),
      icon: LogoIcon,
      color: '#2563eb', // blue-600
      duration: 'N/A',
      category: 'Inquiry',
      rating: 0,
      reviewCount: 0,
  }), [t]);
  
  const handleOpenBookingModal = () => {
      setSelectedService(genericService);
      setBookingModalVisible(true);
  };

  return (
    <div className="bg-slate-50 text-gray-800 font-sans" id="home">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#home" className="flex items-center">
                <LogoIcon className="h-14 w-auto" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={handleOpenCEOModal} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {t('header.meetTheCEO')}
              </button>
              <button onClick={() => scrollToSection('info-tabs', 'visitorSupport')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {t('header.nav.visitorSupport')}
              </button>
            </div>
            <div className="flex items-center gap-2">
                <a 
                    href="https://reliefpsychologicalservice.com/en/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-white hover:bg-slate-100 text-blue-600 font-bold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 shadow-sm border border-sky-200"
                >
                    <LogoIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{t('header.visitSite')}</span>
                </a>
                <button 
                    onClick={() => setLanguage('en')} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${language === 'en' ? 'bg-sky-100 text-sky-700' : 'hover:bg-gray-100'}`}
                >
                    <UkFlagIcon className="h-5 w-5 rounded-full"/>
                    <span className="text-sm font-semibold">EN</span>
                </button>
                <button 
                    onClick={() => setLanguage('am')} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${language === 'am' ? 'bg-sky-100 text-sky-700' : 'hover:bg-gray-100'}`}
                >
                    <EthiopiaFlagIcon className="h-5 w-5 rounded-full"/>
                    <span className="text-sm font-semibold">አማ</span>
                </button>
                <div className="flex items-center gap-2 ml-2">
                  { user && <UserMenu onOpenProfileModal={handleOpenProfileModal} /> }
                  <button 
                      onClick={handleOpenContactModal} 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                      {t('header.contact')}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </header>
      
      <AdBanner />

      <main>
        <Welcome 
          onOpenBookingModal={handleOpenBookingModal} 
          onScrollToServices={() => scrollToSection('services')}
        />
        
        <TherapyServices onServiceSelect={handleServiceSelect} />
        
        <div className="container mx-auto px-5">
            <AdPlacement className="h-auto md:h-60" />
        </div>
        
        <InfoTabs 
            onGetStartedClick={handleOpenAccommodationModal} 
            initialTab={initialInfoTab}
        />

      </main>

      <Footer onScrollToSection={scrollToSection} onOpenAccommodationModal={handleOpenAccommodationModal} onOpenCEOModal={handleOpenCEOModal} />

      <BookingModal
        visible={isBookingModalVisible}
        service={selectedService}
        onClose={handleCloseModals}
      />
      
      <ContactModal
        visible={isContactModalVisible}
        onClose={handleCloseModals}
      />

      <AccommodationModal
        visible={isAccommodationModalVisible}
        onClose={handleCloseModals}
      />

      <CEOProfileModal
        visible={isCEOModalVisible}
        onClose={handleCloseModals}
        onContactClick={handleOpenContactModal}
      />
      
      <ProfileModal
        visible={isProfileModalVisible}
        onClose={handleCloseModals}
      />

      <LiveChat />
      {showBackToTop && (
        <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-5 z-50 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-110"
            aria-label="Go to top"
        >
            <LogoIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

const JsonLdSchema = () => {
    const { services: servicesData, isLoading: isDataLoading } = useData();
    const { t } = useLanguage();
  
    useEffect(() => {
      const existingSchema = document.querySelector('script[data-schema-id="item-list-schema"]');
      if (existingSchema) {
        existingSchema.remove();
      }
  
      if (!isDataLoading && servicesData.length > 0) {
        const schema = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t('services.title'),
          itemListElement: servicesData.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'PsychologicalTreatment',
              name: t(`service.${service.id}.name`),
              description: t(`service.${service.id}.short`),
              url: 'https://reliefpsychologicalservice.com/en/#services',
              provider: {
                '@type': 'MedicalBusiness',
                name: 'Relief Psychological Service',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: String(service.rating),
                reviewCount: String(service.reviewCount),
              },
            },
          })),
        };
  
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema-id', 'item-list-schema');
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
  
        return () => {
          script.remove();
        };
      }
    }, [isDataLoading, servicesData, t]);
  
    return null;
};


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    // Hide the initial HTML loader once React hydrates
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => loader.remove());
    }

    // Then, show the splash screen for a duration
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (showSplash) {
    return <SplashScreen />;
  }

  if (isLoading) {
    return <AuthLoader />;
  }
  
  return (
    <>
      <JsonLdSchema />
      {user ? <MainApplication /> : <AuthModal />}
    </>
  );
}

export default App;