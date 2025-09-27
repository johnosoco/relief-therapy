import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon } from './Icons';

interface CEOProfileModalProps {
    visible: boolean;
    onClose: () => void;
    onContactClick: () => void;
}

// STEP 1: Create an `assets` folder in your project's root directory.
// STEP 2: Place the CEO's image file inside and name it `ceo-profile.jpg`.
const ceoImageUrl = "/assets/ceo-profile.jpg";


export default function CEOProfileModal({ visible, onClose, onContactClick }: CEOProfileModalProps) {
  const { t } = useLanguage();

  if (!visible) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ceo-modal-title"
    >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 transition-colors z-10" aria-label="Close modal">
                <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="p-8">
                <div className="text-center mb-12">
                    <h2 id="ceo-modal-title" className="text-3xl font-bold text-slate-800">{t('ceoProfile.title')}</h2>
                </div>
                <div className="bg-slate-50 rounded-2xl shadow-lg p-8 grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 flex justify-center">
                        <img 
                            src={ceoImageUrl}
                            alt={t('ceoProfile.name')}
                            className="w-40 h-40 rounded-full object-cover border-4 border-orange-400"
                        />
                    </div>
                    <div className="md:col-span-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-800">{t('ceoProfile.name')}</h3>
                        <p className="text-blue-600 font-medium mb-4">{t('ceoProfile.role')}</p>
                        <p className="text-gray-600 italic text-md mb-6">"{t('ceoProfile.message')}"</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-center">
                            <div className="p-2">
                                <p className="text-2xl font-bold text-orange-500">{t('ceoProfile.stat1Value')}</p>
                                <p className="text-sm text-gray-500">{t('ceoProfile.stat1')}</p>
                            </div>
                            <div className="p-2">
                                <p className="text-2xl font-bold text-orange-500">{t('ceoProfile.stat2Value')}</p>
                                <p className="text-sm text-gray-500">{t('ceoProfile.stat2')}</p>
                            </div>
                            <div className="p-2">
                                <p className="text-2xl font-bold text-orange-500">{t('ceoProfile.stat3Value')}</p>
                                <p className="text-sm text-gray-500">{t('ceoProfile.stat3')}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                            <a href={`mailto:${t('contactModal.email')}`} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">Email</a>
                            <a href={`tel:${t('contactModal.phone')}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm">Phone</a>
                            <button onClick={onContactClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">{t('ceoProfile.contact')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}