import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, EnvelopeIcon, CheckCircleIcon } from './Icons';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onResetLinkSent: (token: string) => void;
}

const ForgotPasswordModal = ({ visible, onClose, onResetLinkSent }: ForgotPasswordModalProps) => {
  const { t } = useLanguage();
  const { sendPasswordResetLink, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sentToken, setSentToken] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) return;

    try {
      const token = await sendPasswordResetLink(email);
      setSentToken(token);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XMarkIcon className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 id="forgot-password-modal-title" className="text-2xl font-bold text-center text-gray-800 mb-2">
              {t('auth.forgotPasswordTitle')}
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">{t('auth.forgotPasswordDesc')}</p>

            {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField icon={<EnvelopeIcon />} label={t('auth.form.email')} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-blue-400">
                {isLoading ? t('auth.loading') : t('auth.sendResetLink')}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4"/>
            <h2 id="forgot-password-modal-title" className="text-2xl font-bold text-gray-800 mb-2">{t('auth.resetLinkSentTitle')}</h2>
            <p className="text-sm text-gray-600 mb-4">{t('auth.resetLinkSentDesc')}</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-4">
                <p className="text-sm text-yellow-800">{t('auth.resetLinkSentDemo')}</p>
            </div>
            <button
                onClick={() => onResetLinkSent(sentToken)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
                {t('auth.resetPasswordDemoCta')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ icon, label, name, type = 'text', value, onChange, ...props }: any) => (
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 sm:text-sm py-2"
                {...props}
            />
        </div>
    </div>
);

export default ForgotPasswordModal;
