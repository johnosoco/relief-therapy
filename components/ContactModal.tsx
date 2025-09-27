

import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, EnvelopeIcon, PhoneIcon } from './Icons';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ContactModal({ visible, onClose }: ContactModalProps) {
  const { t } = useLanguage();

  if (!visible) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-8 text-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 id="contact-modal-title" className="text-3xl font-bold text-gray-800 mb-2">{t('contactModal.title')}</h2>
        <p id="contact-modal-description" className="text-gray-600 mb-8">{t('contactModal.description')}</p>

        <div className="space-y-4 text-left">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <EnvelopeIcon className="h-6 w-6 text-blue-600"/>
                <a href={`mailto:${t('contactModal.email')}`} className="text-lg text-gray-700 hover:text-blue-600 font-medium">
                    {t('contactModal.email')}
                </a>
            </div>
             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <PhoneIcon className="h-6 w-6 text-blue-600"/>
                <a href={`tel:${t('contactModal.phone')}`} className="text-lg text-gray-700 hover:text-blue-600 font-medium">
                    {t('contactModal.phone')}
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}