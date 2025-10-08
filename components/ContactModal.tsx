import React, { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, CheckCircleIcon, UserIcon, EnvelopeIcon } from './Icons';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    message: '',
};

export default function ContactModal({ visible, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
      onClose();
      // Delay state reset to allow for closing animation
      setTimeout(() => {
          setFormData(initialFormData);
          setIsSubmitted(false);
          setErrors({});
          setSubmitError('');
      }, 300);
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contactModal.validation.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('contactModal.validation.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contactModal.validation.emailInvalid');
    if (!formData.message.trim()) newErrors.message = t('contactModal.validation.messageRequired');
    else if (formData.message.trim().length < 10) newErrors.message = t('contactModal.validation.messageMinLength');
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);
    
    const serviceID = 'service_txnnuzj';
    const templateID = 'template_cwo7o5s';
    const publicKey = 'g_CgIiJ0gl1LwjgLY';

    const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        form_type: 'Contact Message'
    };

    try {
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        setIsSubmitted(true);
    } catch (error) {
        console.error("Failed to send contact message via EmailJS:", error);
        setSubmitError(t('contactModal.submitError'));
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" 
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XMarkIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
            <div className="text-center py-4">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                <h2 id="contact-modal-title" className="text-2xl font-bold text-gray-800 mb-2">{t('contactModal.successTitle')}</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">{t('contactModal.successMessage')}</p>
                <button onClick={handleClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                    {t('bookingModal.close')}
                </button>
            </div>
        ) : (
            <>
                <h2 id="contact-modal-title" className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('contactModal.title')}</h2>
                <p className="text-center text-gray-600 mb-8">{t('contactModal.description')}</p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <InputField icon={<UserIcon />} label={t('contactModal.form.name')} name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} error={errors.name} required />
                    <InputField icon={<EnvelopeIcon />} label={t('contactModal.form.email')} name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} error={errors.email} required />
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contactModal.form.message')}</label>
                        <div className="relative mt-1">
                             <textarea id="message" name="message" rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required className={`block w-full rounded-md shadow-sm sm:text-sm py-2 px-3 border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}></textarea>
                        </div>
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}
                     <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-blue-400">
                        {isSubmitting ? t('contactModal.submitting') : t('contactModal.submit')}
                    </button>
                </form>
            </>
        )}
      </div>
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
                className={`block w-full rounded-md shadow-sm pl-10 sm:text-sm py-2 border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                {...props}
            />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);