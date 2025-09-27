import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useData } from '../contexts/DataContext';
import { PlusIcon, MinusIcon } from './Icons';

// FIX: Extracted props into a separate interface for clarity and to potentially resolve type inference issues.
interface FaqItemProps {
  faq: {id: number, question: string, answer: string};
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick, index }) => {
  const { t } = useLanguage();
  const itemRef = useRef<HTMLDivElement>(null);
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
    if (itemRef.current) {
        observer.observe(itemRef.current);
    }
    return () => {
        if (itemRef.current) {
            observer.disconnect();
        }
    };
  }, []);

  const questionId = `faq-question-${faq.id}`;
  const answerId = `faq-answer-${faq.id}`;

  return (
    <div 
      ref={itemRef}
      className={`border-b border-gray-200 last:border-b-0 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        id={questionId}
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
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
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-5 pr-10">
          <p className="text-gray-600 leading-relaxed">{t(faq.answer)}</p>
        </div>
      </div>
    </div>
  );
};

export default function Faq() {
  const { t } = useLanguage();
  const { faqs: faqsData, isLoading } = useData();
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (faqsData && faqsData.length > 0 && openId === null) {
      setOpenId(faqsData[0].id);
    }
  }, [faqsData, openId]);
  
  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  
  if (isLoading) {
      return (
          <section id="faq" className="py-16 bg-slate-50">
              <div className="container mx-auto px-4 text-center flex justify-center items-center h-64">
                   <div className="spinner w-12 h-12 border-4 border-gray-300 border-b-blue-600"></div>
                  <style>{`.spinner { border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; } @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
          </section>
      );
  }

  return (
    <section 
      id="faq" 
      className="py-16 bg-slate-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">{t('faq.title')}</h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4">
          {faqsData.map((faq, index) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onClick={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}