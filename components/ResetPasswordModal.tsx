import React, { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, LockClosedIcon, CheckCircleIcon } from './Icons';

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  token: string | null;
}

const ResetPasswordModal = ({ visible, onClose, onSuccess, token }: ResetPasswordModalProps) => {
  const { t } = useLanguage();
  const { resetPassword, isLoading } = useAuth();
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (visible) {
        setFormData({ newPassword: '', confirmPassword: '' });
        setError('');
        setIsSuccess(false);
    }
  }, [visible]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword.length < 8) {
      setError(t('auth.validation.passwordMinLength'));
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('auth.validation.passwordMismatch'));
      return;
    }
    if (!token) {
      setError('Invalid session. Please try again.');
      return;
    }

    try {
      await resetPassword(token, formData.newPassword);
      setIsSuccess(true);
      setTimeout(() => {
          onSuccess();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-password-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XMarkIcon className="h-6 w-6" />
        </button>

        {isSuccess ? (
            <div className="text-center">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('auth.passwordResetSuccess')}</h2>
                <p className="text-sm text-gray-600">You will be redirected to the login page shortly.</p>
            </div>
        ) : (
            <>
                <h2 id="reset-password-modal-title" className="text-2xl font-bold text-center text-gray-800 mb-2">
                {t('auth.resetPasswordTitle')}
                </h2>
                <p className="text-center text-sm text-gray-600 mb-6">{t('auth.resetPasswordDesc')}</p>

                {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField icon={<LockClosedIcon />} label={t('auth.form.newPassword')} name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} required />
                    <InputField icon={<LockClosedIcon />} label={t('auth.form.confirmPassword')} name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} required />
                    
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-blue-400">
                        {isLoading ? t('auth.loading') : t('auth.resetPassword')}
                    </button>
                </form>
            </>
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

export default ResetPasswordModal;
