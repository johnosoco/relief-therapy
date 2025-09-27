import React, { useState, useEffect, FormEvent } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, CheckCircleIcon, BuildingOfficeIcon, HomeIcon } from './Icons';

interface AccommodationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    accommodationType: 'hotel' | 'guestHouse' | 'apartment' | '';
    duration: string;
    area: string;
    budget: string;
    guests: string;
    notes: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    accommodationType?: string;
    duration?: string;
    guests?: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    accommodationType: '',
    duration: '',
    area: '',
    budget: '',
    guests: '1',
    notes: '',
};

export default function AccommodationModal({ visible, onClose }: AccommodationModalProps) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsSubmitted(false);
            setFormData(initialFormData);
            setErrors({});
        }
    }, [visible]);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = t('accommodationModal.validation.nameRequired');
        if (!formData.email.trim()) newErrors.email = t('accommodationModal.validation.emailRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('accommodationModal.validation.emailInvalid');
        if (!formData.accommodationType) newErrors.accommodationType = t('accommodationModal.validation.accommodationTypeRequired');
        if (!formData.duration.trim()) newErrors.duration = t('accommodationModal.validation.durationRequired');
        if (!formData.guests.trim()) newErrors.guests = t('accommodationModal.validation.guestsRequired');
        else if (isNaN(Number(formData.guests)) || Number(formData.guests) <= 0) newErrors.guests = t('accommodationModal.validation.guestsInvalid');
        
        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log("Accommodation request submitted:", formData);
            setIsSubmitted(true);
        }
    };

    if (!visible) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accommodation-modal-title"
            aria-describedby="accommodation-modal-description"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 transition-colors z-10" aria-label="Close modal">
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="p-8">
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                            <h2 id="accommodation-modal-title" className="text-2xl font-bold text-gray-800 mb-2">{t('accommodationModal.successTitle')}</h2>
                            <p id="accommodation-modal-description" className="text-gray-600 mb-6 max-w-md mx-auto">{t('accommodationModal.successMessage')}</p>
                            <button onClick={onClose} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                                {t('bookingModal.close')}
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 id="accommodation-modal-title" className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('accommodationModal.title')}</h2>
                            <p id="accommodation-modal-description" className="text-center text-gray-500 mb-8">{t('accommodationModal.subtitle')}</p>

                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.name')}</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={`mt-1 block w-full input ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.email')}</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={`mt-1 block w-full input ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                
                                <div>
                                    <fieldset>
                                        <legend className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.accommodationType')}</legend>
                                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {(['hotel', 'guestHouse', 'apartment'] as const).map(type => (
                                                <label key={type} className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.accommodationType === type ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-500' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                                                    <input type="radio" name="accommodationType" value={type} checked={formData.accommodationType === type} onChange={(e) => setFormData(p => ({...p, accommodationType: e.target.value as any}))} className="absolute h-full w-full opacity-0" />
                                                    <div className="flex items-center">
                                                        {type === 'hotel' && <BuildingOfficeIcon className="w-5 h-5 mr-2 text-sky-700" />}
                                                        {type === 'guestHouse' && <HomeIcon className="w-5 h-5 mr-2 text-sky-700" />}
                                                        {type === 'apartment' && <BuildingOfficeIcon className="w-5 h-5 mr-2 text-sky-700" />}
                                                        <span className="font-medium">{t(`accommodationModal.form.types.${type}`)}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                    {errors.accommodationType && <p className="text-red-500 text-xs mt-1">{errors.accommodationType}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.duration')}</label>
                                        <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required className={`mt-1 block w-full input ${errors.duration ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.guests')}</label>
                                        <input type="number" id="guests" name="guests" min="1" value={formData.guests} onChange={handleInputChange} required className={`mt-1 block w-full input ${errors.guests ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.area')}</label>
                                        <input type="text" id="area" name="area" value={formData.area} onChange={handleInputChange} className="mt-1 block w-full input" />
                                    </div>
                                     <div>
                                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.budget')}</label>
                                        <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className="mt-1 block w-full input" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{t('accommodationModal.form.notes')}</label>
                                    <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleInputChange} className="mt-1 block w-full input"></textarea>
                                </div>
                                
                                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-6">
                                    {t('accommodationModal.submit')}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                .input {
                    padding: 0.5rem 0.75rem;
                    background-color: white;
                    border-radius: 0.375rem;
                    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                    border: 1px solid #d1d5db;
                }
                .input:focus {
                    outline: none;
                    border-color: #0d9488;
                    box-shadow: 0 0 0 1px #0d9488;
                }
            `}</style>
        </div>
    );
}