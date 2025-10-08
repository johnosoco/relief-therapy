import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LogoIcon } from './Icons';

// Using a standard X for clarity, as a logo for a close button is bad UX.
// This is defined locally to be consistent with other components in the project.
const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


export default function AdBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-4 py-3">
          <div className="flex items-center gap-3">
             <div className="hidden sm:block bg-white/20 p-2 rounded-full">
                <LogoIcon className="w-6 h-6 text-white" />
             </div>
            <p className="font-semibold text-center sm:text-left">
              <span className="font-bold text-sm bg-white/20 px-2 py-0.5 rounded-full mr-2">Ad</span>
              {t('adBanner.text')}
            </p>
          </div>
          <a
            href="https://reliefpsychologicalservice.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-white text-orange-600 font-bold py-2 px-4 rounded-lg text-sm hover:bg-orange-50 transition-colors duration-300 shadow-md"
          >
            {t('adBanner.cta')}
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1/2 -translate-y-1/2 right-3 sm:relative sm:top-auto sm:right-auto sm:translate-y-0 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss advertisement"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}