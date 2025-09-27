import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { testimonialsData } from '../constants';
import { QuoteIcon } from './Icons';

export default function Testimonials() {
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
      id="testimonials" 
      ref={sectionRef}
      className={`py-12 md:py-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">{t('testimonials.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-start border-l-4 border-orange-500">
              <QuoteIcon className="w-10 h-10 text-sky-200 mb-4" />
              <blockquote className="text-gray-600 italic mb-4 flex-grow">
                <p>"{t(`testimonials.${testimonial.id}.quote`)}"</p>
              </blockquote>
              <footer className="font-semibold text-gray-800 self-end mt-2">
                - {t(`testimonials.${testimonial.id}.author`)}
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}