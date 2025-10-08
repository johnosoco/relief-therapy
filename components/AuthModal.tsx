import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { UserIcon, EnvelopeIcon, LockClosedIcon, LogoIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from './Icons';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';


const AuthScreen = () => {
  const { t } = useLanguage();
  const { login, signup, isLoading } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // State for modals
  const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [isResetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      if (isLoginView) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      // On success, AuthProvider updates user state, and App.tsx will render MainApplication.
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
  };
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccessMessage('');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleOpenForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleOpenResetPasswordModal = (token: string) => {
    setForgotPasswordModalVisible(false);
    setResetToken(token);
    setResetPasswordModalVisible(true);
  };

  const handleCloseModals = () => {
    setForgotPasswordModalVisible(false);
    setResetPasswordModalVisible(false);
    setResetToken(null);
  };
  
  const handleResetSuccess = () => {
    handleCloseModals();
    setIsLoginView(true);
    setSuccessMessage(t('auth.passwordResetSuccess'));
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100 flex flex-col items-center justify-center p-4">
        <a href="#" className="flex items-center mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
            <LogoIcon className="h-20 w-auto" />
        </a>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative p-8">
          <h2 id="auth-modal-title" className="text-2xl font-bold text-center text-gray-800 mb-4">
            {isLoginView ? t('auth.loginTitle') : t('auth.signupTitle')}
          </h2>

          {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}
          {successMessage && (
            <div className="flex items-center gap-2 bg-green-50 text-green-800 text-sm p-3 rounded-md mb-4 text-center">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                <span>{successMessage}</span>
            </div>
           )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <InputField icon={<UserIcon />} label={t('auth.form.name')} name="name" value={formData.name} onChange={handleInputChange} required />
            )}
            <InputField icon={<EnvelopeIcon />} label={t('auth.form.email')} name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            <div>
              <InputField 
                icon={<LockClosedIcon />} 
                label={t('auth.form.password')} 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                value={formData.password} 
                onChange={handleInputChange} 
                toggleVisibility={() => setShowPassword(!showPassword)}
                isPasswordVisible={showPassword}
                required 
              />
              {isLoginView && (
                  <div className="text-right mt-1">
                      <button type="button" onClick={handleOpenForgotPasswordModal} className="text-sm font-medium text-blue-600 hover:underline">
                          {t('auth.forgotPassword')}
                      </button>
                  </div>
              )}
            </div>
            
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-blue-400">
              {isLoading ? t('auth.loading') : (isLoginView ? t('auth.login') : t('auth.signup'))}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isLoginView ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
            <button onClick={toggleView} className="font-medium text-blue-600 hover:underline">
              {isLoginView ? t('auth.signup') : t('auth.login')}
            </button>
          </p>
        </div>
      </div>
      <ForgotPasswordModal
        visible={isForgotPasswordModalVisible}
        onClose={handleCloseModals}
        onResetLinkSent={handleOpenResetPasswordModal}
      />
      <ResetPasswordModal
        visible={isResetPasswordModalVisible}
        onClose={handleCloseModals}
        token={resetToken}
        onSuccess={handleResetSuccess}
      />
    </>
  );
};

const InputField = ({ icon, label, name, type = 'text', value, onChange, toggleVisibility, isPasswordVisible, ...props }: any) => (
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
            {toggleVisibility && (
                <button type="button" onClick={toggleVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" aria-label={isPasswordVisible ? "Hide password" : "Show password"}>
                    {isPasswordVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            )}
        </div>
    </div>
);

export default AuthScreen;
