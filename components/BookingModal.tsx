import React, { useState, useEffect, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { type TherapyService } from '../types';
import { XMarkIcon, CheckCircleIcon, UserIcon, EnvelopeIcon, PhoneIcon, CalendarDaysIcon, ClockIcon } from './Icons';

interface BookingModalProps {
  visible: boolean;
  service: TherapyService | null;
  onClose: () => void;
}

export interface FormData {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    notes: string;
    sendEmailCopy: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    date?: string;
    time?: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
    sendEmailCopy: true,
};

export default function BookingModal({ visible, service, onClose }: BookingModalProps) {
    const { t } = useLanguage();
    const { user: loggedInUser } = useAuth();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsSubmitted(false);
            setErrors({});
            setSubmitError('');
            if (loggedInUser) {
                setFormData({
                    ...initialFormData,
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                });
            } else {
                setFormData(initialFormData);
            }
        }
    }, [visible, loggedInUser]);
    
    const getMinDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = t('bookingModal.validation.nameRequired');
        if (!formData.email.trim()) newErrors.email = t('bookingModal.validation.emailRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('bookingModal.validation.emailInvalid');
        if (!formData.date) newErrors.date = t('bookingModal.validation.dateRequired');
        if (!formData.time) newErrors.time = t('bookingModal.validation.timeRequired');
        
        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            
            const serviceID = 'service_txnnuzj';
            const templateID = 'template_cwo7o5s';
            const publicKey = 'g_CgIiJ0gl1LwjgLY';

            const messageBody = `
                New booking request with the following details:
                
                Service: ${service?.title}
                Preferred Date: ${formData.date}
                Preferred Time: ${formData.time}
                Phone Number: ${formData.phone || 'Not provided'}
                
                Additional Notes:
                ${formData.notes || 'None'}
            `.trim().replace(/^ +/gm, '');

            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: messageBody,
                form_type: 'Booking Request',
                service_title: service?.title,
            };
            
            // Note: Sending a copy to the client should be configured via
            // the "Auto Reply" feature in your EmailJS template settings for reliability.

            try {
                await emailjs.send(serviceID, templateID, templateParams, publicKey);
                setIsSubmitted(true);
            } catch (error) {
                console.error("Failed to send booking email via EmailJS:", error);
                setSubmitError(t('bookingModal.submitError'));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (!visible || !service) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            aria-describedby="booking-modal-description"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 transition-colors z-10" aria-label="Close modal">
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="p-8">
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                            <h2 id="booking-modal-title" className="text-2xl font-bold text-gray-800 mb-2">{t('bookingModal.successTitle')}</h2>
                            <p id="booking-modal-description" className="text-gray-600 mb-6 max-w-md mx-auto">{t('bookingModal.successMessage')}</p>
                            <button onClick={onClose} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                                {t('bookingModal.close')}
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 id="booking-modal-title" className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('bookingModal.title')}</h2>
                            <p id="booking-modal-description" className="text-center text-gray-500 mb-1">{t('bookingModal.subtitle')}</p>
                            <p className="text-center text-blue-600 font-semibold mb-8">{service.title}</p>
                            
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                    <InputField icon={<UserIcon />} label={t('bookingModal.form.name')} name="name" value={formData.name} onChange={handleInputChange} error={errors.name} required readOnly={!!loggedInUser} />
                                    <InputField icon={<EnvelopeIcon />} label={t('bookingModal.form.email')} name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} required readOnly={!!loggedInUser} />
                                    <InputField icon={<PhoneIcon />} label={t('bookingModal.form.phone')} name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField icon={<CalendarDaysIcon/>} label={t('bookingModal.form.date')} name="date" type="date" value={formData.date} onChange={handleInputChange} error={errors.date} min={getMinDate()} required />
                                        <InputField icon={<ClockIcon/>} label={t('bookingModal.form.time')} name="time" type="time" value={formData.time} onChange={handleInputChange} error={errors.time} required />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{t('bookingModal.form.notes')}</label>
                                        <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleInputChange} className="mt-1 block w-full input"></textarea>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="sendEmailCopy"
                                                name="sendEmailCopy"
                                                type="checkbox"
                                                checked={formData.sendEmailCopy}
                                                onChange={handleInputChange}
                                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="sendEmailCopy" className="font-medium text-gray-700">{t('bookingModal.form.sendEmailCopy')}</label>
                                        </div>
                                    </div>

                                    {submitError && <p className="text-red-500 text-sm mt-2 text-center">{submitError}</p>}

                                    <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-2 disabled:bg-orange-400 disabled:cursor-not-allowed">
                                        {isSubmitting ? t('bookingModal.submitting') : t('bookingModal.submit')}
                                    </button>
                                </form>
                                <aside className="bg-slate-50 p-6 rounded-lg mt-8 md:mt-0">
                                    <h3 className="font-bold text-lg text-gray-800 mb-4">{t('bookingModal.payment.title')}</h3>
                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <p className="flex justify-between"><span>{t('services.priceFlexible')}:</span> <strong>{t('bookingModal.payment.priceEtb')} / {t('bookingModal.payment.priceUsd')}</strong></p>
                                    </div>
                                    <h4 className="font-semibold text-gray-700 mb-2">{t('bookingModal.payment.methods')}</h4>
                                    <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
                                        <li><strong>{t('bookingModal.payment.telebirr')}:</strong> {t('bookingModal.payment.telebirrNumber')}</li>
                                        <li><strong>{t('bookingModal.payment.bank')}:</strong>
                                            <ul className="pl-4 mt-1 space-y-1 text-xs">
                                                <li>{t('bookingModal.payment.bankAccountName')}</li>
                                                <li><strong>{t('bookingModal.payment.cbe')}:</strong> {t('bookingModal.payment.cbeAccount')}</li>
                                                <li><strong>{t('bookingModal.payment.abyssinia')}:</strong> {t('bookingModal.payment.abyssiniaAccount')}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
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
                    border-color: #2563eb;
                    box-shadow: 0 0 0 1px #2563eb;
                }
            `}</style>
        </div>
    );
}

const InputField = ({ icon, label, name, type = 'text', value, onChange, error, ...props }: any) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400" aria-hidden="true">
                {React.cloneElement(icon, { className: 'w-5 h-5' })}
            </span>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full input pl-10 ${error ? 'border-red-500' : 'border-gray-300'} ${props.readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                {...props}
            />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);