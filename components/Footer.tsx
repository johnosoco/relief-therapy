import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface FooterProps {
    onScrollToSection: (id: string) => void;
    onOpenAccommodationModal: () => void;
    onOpenCEOModal: () => void;
}

export default function Footer({ onScrollToSection, onOpenAccommodationModal, onOpenCEOModal }: FooterProps) {
    const { t } = useLanguage();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        onScrollToSection(id);
    };

    return (
        <footer className="bg-gray-800 text-gray-300 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">{t('footer.aboutTitle')}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('footer.aboutText')}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinksTitle')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="text-gray-400 hover:text-white transition-colors">{t('footer.linkServices')}</a></li>
                        <li><a href="#visitor-support" onClick={(e) => { e.preventDefault(); onOpenAccommodationModal(); }} className="text-gray-400 hover:text-white transition-colors">{t('footer.linkVisitorSupport')}</a></li>
                        <li><a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')} className="text-gray-400 hover:text-white transition-colors">{t('footer.linkFaq')}</a></li>
                        <li><a href="#testimonials" onClick={(e) => handleLinkClick(e, 'testimonials')} className="text-gray-400 hover:text-white transition-colors">{t('footer.linkTestimonials')}</a></li>
                        <li><a href="#ceo" onClick={(e) => { e.preventDefault(); onOpenCEOModal(); }} className="text-gray-400 hover:text-white transition-colors">{t('footer.linkCeoProfile')}</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contactTitle')}</h3>
                    <p className="text-gray-400 text-sm">{t('contactModal.email')}</p>
                    <p className="text-gray-400 text-sm">{t('contactModal.phone')}</p>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                <p>{t('footer.copyright')}</p>
            </div>
        </footer>
    );
}