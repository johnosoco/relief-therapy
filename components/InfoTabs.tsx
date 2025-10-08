import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useData } from '../contexts/DataContext';
import { BuildingOfficeIcon, MapPinIcon, FaceSmileIcon, UsersIcon as CommunityIcon, PlusIcon, MinusIcon, QuoteIcon } from './Icons';

interface InfoTabsProps {
  onGetStartedClick: () => void;
  initialTab?: string;
}

export default function InfoTabs({ onGetStartedClick, initialTab = 'visitorSupport' }: InfoTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.disconnect() };
  }, []);

  const tabs = [
    { id: 'visitorSupport', label: 'Visitor Support' },
    { id: 'faq', label: 'FAQ' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'visitorSupport': return <VisitorSupportContent onGetStartedClick={onGetStartedClick} />;
      case 'faq': return <FaqContent />;
      case 'testimonials': return <TestimonialsContent />;
      default: return null;
    }
  };

  return (
    <section id="info-tabs" ref={sectionRef} className={`py-16 md:py-24 bg-white transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-5">
        <div className="flex justify-center border-b border-gray-200 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 focus:outline-none -mb-px ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-blue-600'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="tabpanel">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}

// Merged content components:

const VisitorSupportContent = ({ onGetStartedClick }: { onGetStartedClick: () => void }) => {
  const { t } = useLanguage();
  const featureList = [
    { id: 'accommodation', icon: BuildingOfficeIcon, titleKey: 'visitorSupport.accommodationTitle', descKey: 'visitorSupport.accommodationDesc' },
    { id: 'navigation', icon: MapPinIcon, titleKey: 'visitorSupport.navigationTitle', descKey: 'visitorSupport.navigationDesc' },
    { id: 'psychological', icon: FaceSmileIcon, titleKey: 'visitorSupport.psychologicalTitle', descKey: 'visitorSupport.psychologicalDesc' },
    { id: 'community', icon: CommunityIcon, titleKey: 'visitorSupport.communityTitle', descKey: 'visitorSupport.communityDesc' },
  ];
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('visitorSupport.title')}</h2>
        <p className="text-lg font-medium text-blue-600 mb-4">{t('visitorSupport.subtitle')}</p>
        <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-12">{t('visitorSupport.description')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {featureList.map((feature) => (
          <div key={feature.id} className="bg-slate-50 p-6 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t(feature.titleKey)}</h3>
            <p className="text-sm text-gray-600">{t(feature.descKey)}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={onGetStartedClick} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:-translate-y-0.5">
            {t('visitorSupport.getStarted')}
        </button>
      </div>
    </div>
  );
};


const FaqContent = () => {
  const { t } = useLanguage();
  const { faqs: faqsData, isLoading } = useData();
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (faqsData && faqsData.length > 0 && openId === null) setOpenId(faqsData[0].id);
  }, [faqsData, openId]);

  if (isLoading) return <div className="text-center p-8">Loading FAQs...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">{t('faq.title')}</h2>
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-4">
        {faqsData.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface FaqItemProps {
  faq: {id: number, question: string, answer: string};
  isOpen: boolean;
  onClick: () => void;
}

// FIX: Changed component to be of type React.FC to correctly handle the 'key' prop, and removed the unused 'index' prop from props.
const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick }) => {
  const { t } = useLanguage();
  const questionId = `faq-question-${faq.id}`;
  const answerId = `faq-answer-${faq.id}`;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        id={questionId}
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="font-semibold text-lg text-gray-800">{t(faq.question)}</span>
        {isOpen ? <MinusIcon className="w-5 h-5 text-blue-600" /> : <PlusIcon className="w-5 h-5 text-gray-500" />}
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pb-5 pr-10">
          <p className="text-gray-600 leading-relaxed">{t(faq.answer)}</p>
        </div>
      </div>
    </div>
  );
};


const TestimonialsContent = () => {
    const { t } = useLanguage();
    const { testimonials: testimonialsData, isLoading } = useData();
    
    if (isLoading) return <div className="text-center p-8">Loading Testimonials...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">{t('testimonials.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="bg-slate-50 p-8 rounded-2xl flex flex-col items-start border-l-4 border-orange-500">
                <QuoteIcon className="w-10 h-10 text-sky-200 mb-4" />
                <blockquote className="text-gray-600 italic mb-4 flex-grow">
                    <p>"{t(testimonial.quote)}"</p>
                </blockquote>
                <footer className="font-semibold text-gray-800 self-end mt-2">
                    - {t(testimonial.author)}
                </footer>
                </div>
            ))}
            </div>
        </div>
    );
};
