import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, UserIcon, EnvelopeIcon, LockClosedIcon, GoogleIcon } from './Icons';


interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onForgotPasswordClick: () => void;
}

const AuthModal = ({ visible, onClose, onForgotPasswordClick }: AuthModalProps) => {
  const { t } = useLanguage();
  const { login, signup, isLoading } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginView) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
  };
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 id="auth-modal-title" className="text-2xl font-bold text-center text-gray-800 mb-4">
          {isLoginView ? t('auth.loginTitle') : t('auth.signupTitle')}
        </h2>

        {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <InputField icon={<UserIcon />} label={t('auth.form.name')} name="name" value={formData.name} onChange={handleInputChange} required />
          )}
          <InputField icon={<EnvelopeIcon />} label={t('auth.form.email')} name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          <div>
            <InputField icon={<LockClosedIcon />} label={t('auth.form.password')} name="password" type="password" value={formData.password} onChange={handleInputChange} required />
            {isLoginView && (
                <div className="text-right mt-1">
                    <button type="button" onClick={onForgotPasswordClick} className="text-sm font-medium text-blue-600 hover:underline">
                        {t('auth.forgotPassword')}
                    </button>
                </div>
            )}
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-blue-400">
            {isLoading ? t('auth.loading') : (isLoginView ? t('auth.login') : t('auth.signup'))}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t('auth.orContinueWith')}</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors">
          <GoogleIcon className="w-5 h-5" />
          {t('auth.continueWithGoogle')}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLoginView ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button onClick={toggleView} className="font-medium text-blue-600 hover:underline">
            {isLoginView ? t('auth.signup') : t('auth.login')}
          </button>
        </p>
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

export default AuthModal;