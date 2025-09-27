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
import Faq from './components/Faq';
import Testimonials from './components/Testimonials';
import LiveChat from './components/LiveChat';
import Footer from './components/Footer';
import VisitorSupport from './components/VisitorSupport';
import AuthModal from './components/AuthModal';
import UserMenu from './components/UserMenu';
import ProfileModal from './components/ProfileModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import ResetPasswordModal from './components/ResetPasswordModal';


// Icons
import { LogoIcon, EthiopiaFlagIcon, UsaFlagIcon, SparklesIcon, ArrowUpIcon } from './components/Icons';


function App() {
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [isAccommodationModalVisible, setAccommodationModalVisible] = useState(false);
  const [isCEOModalVisible, setCEOModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [isResetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const [selectedService, setSelectedService] = useState<TherapyService | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { isLoading } = useData();
  const { user } = useAuth();

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

  const handleOpenAuthModal = () => {
    setAuthModalVisible(true);
  };
  
  const handleOpenForgotPasswordModal = () => {
    handleCloseModals();
    setForgotPasswordModalVisible(true);
  };

  const handleOpenResetPasswordModal = (token: string) => {
    handleCloseModals();
    setResetToken(token);
    setResetPasswordModalVisible(true);
  };

  const handleOpenProfileModal = () => {
    setProfileModalVisible(true);
  };

  const handleCloseModals = () => {
    setBookingModalVisible(false);
    setContactModalVisible(false);
    setAccommodationModalVisible(false);
    setCEOModalVisible(false);
    setAuthModalVisible(false);
    setProfileModalVisible(false);
    setForgotPasswordModalVisible(false);
    setResetPasswordModalVisible(false);
    setSelectedService(null);
    setResetToken(null);
  };
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const genericService: TherapyService = useMemo(() => ({
      id: 'general-inquiry',
      title: t('services.generalInquiry.title'),
      description: t('services.generalInquiry.description'),
      shortDescription: '',
      price: t('services.priceFlexible'),
      icon: SparklesIcon,
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
              <a href="https://reliefpsychologicalservice.com/en/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {t('header.visitSite')}
              </a>
              <button onClick={handleOpenCEOModal} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {t('header.meetTheCEO')}
              </button>
              <button onClick={handleOpenAccommodationModal} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {t('header.nav.visitorSupport')}
              </button>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setLanguage('en')} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${language === 'en' ? 'bg-sky-100 text-sky-700' : 'hover:bg-gray-100'}`}
                >
                    <UsaFlagIcon className="h-5 w-5 rounded-full"/>
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
                  { user ? <UserMenu onOpenProfileModal={handleOpenProfileModal} /> : (
                      <button onClick={handleOpenAuthModal} className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-lg">
                          {t('auth.login')}
                      </button>
                  )}
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
      
      <main>
        <Welcome 
          onOpenBookingModal={handleOpenBookingModal} 
          onScrollToServices={() => scrollToSection('services')}
        />
        
        <TherapyServices onServiceSelect={handleServiceSelect} />
        <VisitorSupport onGetStartedClick={handleOpenAccommodationModal} />
        <Faq />
        <Testimonials />

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
      
      <AuthModal
        visible={isAuthModalVisible}
        onClose={handleCloseModals}
        onForgotPasswordClick={handleOpenForgotPasswordModal}
      />

      <ForgotPasswordModal
        visible={isForgotPasswordModalVisible}
        onClose={handleCloseModals}
        onResetLinkSent={handleOpenResetPasswordModal}
      />

      <ResetPasswordModal
        visible={isResetPasswordModalVisible}
        onClose={handleCloseModals}
        token={resetToken}
        onSuccess={() => {
          handleCloseModals();
          handleOpenAuthModal();
        }}
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
            <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;