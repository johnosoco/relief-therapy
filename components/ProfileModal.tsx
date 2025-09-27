import React, { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { XMarkIcon, UserCircleIcon, PencilSquareIcon, EnvelopeIcon, UserIcon, CalendarDaysIcon, CheckCircleIcon } from './Icons';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal = ({ visible, onClose }: ProfileModalProps) => {
  const { t } = useLanguage();
  const { user, updateUser, isLoading: isAuthLoading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (visible && user) {
      setFormData({ name: user.name, email: user.email });
    }
    // Reset states when modal is opened/closed or user changes
    if (visible) {
        setIsEditing(false);
        setError('');
        setSuccess('');
    }
  }, [visible, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!user) return;
    
    if (!formData.name.trim() || !formData.email.trim()) {
        setError("Name and email cannot be empty.");
        return;
    }

    try {
      await updateUser({ name: formData.name, email: formData.email });
      setSuccess(t('auth.updateSuccess'));
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
    setIsEditing(false);
    setError('');
  };

  if (!visible || !user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10" aria-label="Close modal">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
                <UserCircleIcon className="w-12 h-12 text-blue-500" />
                <div>
                    <h2 id="profile-modal-title" className="text-2xl font-bold text-gray-800">
                      {t('auth.myProfile')}
                    </h2>
                    <p className="text-gray-500">View and edit your personal information.</p>
                </div>
            </div>

            {success && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm p-3 rounded-md mb-4">
                    <CheckCircleIcon className="w-5 h-5" />
                    {success}
                </div>
            )}
            {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4">{error}</p>}


            {/* Personal Information Section */}
            <div className="bg-slate-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Personal Information</h3>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
                            <PencilSquareIcon className="w-4 h-4" />
                            {t('auth.edit')}
                        </button>
                    )}
                </div>
                {!isEditing ? (
                    <div className="space-y-3">
                        <InfoRow icon={<UserIcon />} label={t('auth.form.name')} value={user.name} />
                        <InfoRow icon={<EnvelopeIcon />} label={t('auth.form.email')} value={user.email} />
                    </div>
                ) : (
                    <form onSubmit={handleSaveChanges} className="space-y-4">
                        <InputField icon={<UserIcon />} label={t('auth.form.name')} name="name" value={formData.name} onChange={handleInputChange} required />
                        <InputField icon={<EnvelopeIcon />} label={t('auth.form.email')} name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                        <div className="flex justify-end gap-3 pt-2">
                             <button type="button" onClick={handleCancelEdit} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                {t('auth.cancel')}
                            </button>
                            <button type="submit" disabled={isAuthLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:bg-blue-400">
                                {isAuthLoading ? t('auth.loading') : t('auth.saveChanges')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
            
            {/* Booking History Section */}
            <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                    {t('auth.bookingHistory')}
                </h3>
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <CalendarDaysIcon className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">{t('auth.bookingHistoryPlaceholder')}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// FIX: Replaced JSX.Element with React.ReactElement to fix "Cannot find namespace 'JSX'" error.
// Also, extracted props to an interface for better readability.
interface InfoRowProps {
    icon: React.ReactElement;
    label: string;
    value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
    <div className="flex items-center">
        <span className="flex-shrink-0 w-8 text-gray-400">{React.cloneElement(icon, { className: 'w-5 h-5' })}</span>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

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

export default ProfileModal;
