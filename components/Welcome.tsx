import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WaveDivider } from './Icons';

interface WelcomeProps {
    onOpenBookingModal: () => void;
    onScrollToServices: () => void;
}

export default function Welcome({ onOpenBookingModal, onScrollToServices }: WelcomeProps) {
    const { t } = useLanguage();

    return (
        <div className="relative bg-gradient-to-b from-sky-50 to-slate-50 pb-20">
            <section className="py-20 md:py-24 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">{t('welcome.title')}</h1>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mb-10">
                        {t('welcome.description')}
                    </p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        <button
                            onClick={onOpenBookingModal}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {t('welcome.ctaBook')}
                        </button>
                        <button
                            onClick={onScrollToServices}
                            className="bg-white hover:bg-slate-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-lg border border-sky-200 transform hover:-translate-y-0.5"
                        >
                            {t('welcome.ctaExplore')}
                        </button>
                    </div>
                </div>
            </section>
            <div className="absolute bottom-0 left-0 w-full h-20 text-slate-50 fill-current pointer-events-none">
                <WaveDivider />
            </div>
        </div>
    );
}