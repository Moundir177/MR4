'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DocumentTextIcon,
  LanguageIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import StreakTracker from '@/components/StreakTracker';

// Profile page dictionary
const profileDictionary = {
  en: {
    title: 'Profile',
    subtitle: 'Manage your account settings and preferences',
    personalInfo: 'Personal Information',
    accountSettings: 'Account Settings',
    preferences: 'Preferences',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    bio: 'Biography',
    location: 'Location',
    website: 'Website',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    accountSecurity: 'Account Security',
    notifications: 'Notifications',
    paymentMethods: 'Payment Methods',
    purchaseHistory: 'Purchase History',
    certificates: 'Certificates',
    language: 'Language Preferences',
    darkMode: 'Dark Mode',
    emailNotifications: 'Email Notifications',
    save: 'Save Changes',
    cancel: 'Cancel',
    back: 'Back',
    joined: 'Joined',
    lastLogin: 'Last Login',
    changePhoto: 'Change Photo',
    deleteAccount: 'Delete Account',
    passwordInfo: 'Your password must be at least 8 characters',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    securitySettings: 'Security Settings',
    twoFactorAuth: 'Two-Factor Authentication',
    loginHistory: 'Login History',
    saveSuccess: 'Your changes have been saved successfully',
    learningActivity: 'Learning Activity',
  },
  fr: {
    title: 'Profil',
    subtitle: 'Gérez les paramètres et préférences de votre compte',
    personalInfo: 'Informations Personnelles',
    accountSettings: 'Paramètres du Compte',
    preferences: 'Préférences',
    fullName: 'Nom Complet',
    email: 'Adresse Email',
    phone: 'Numéro de Téléphone',
    bio: 'Biographie',
    location: 'Localisation',
    website: 'Site Web',
    editProfile: 'Modifier le Profil',
    changePassword: 'Changer le Mot de Passe',
    accountSecurity: 'Sécurité du Compte',
    notifications: 'Notifications',
    paymentMethods: 'Méthodes de Paiement',
    purchaseHistory: 'Historique d\'Achats',
    certificates: 'Certificats',
    language: 'Préférences de Langue',
    darkMode: 'Mode Sombre',
    emailNotifications: 'Notifications par Email',
    save: 'Enregistrer les Modifications',
    cancel: 'Annuler',
    back: 'Retour',
    joined: 'Inscrit le',
    lastLogin: 'Dernière Connexion',
    changePhoto: 'Changer la Photo',
    deleteAccount: 'Supprimer le Compte',
    passwordInfo: 'Votre mot de passe doit comporter au moins 8 caractères',
    currentPassword: 'Mot de Passe Actuel',
    newPassword: 'Nouveau Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    securitySettings: 'Paramètres de Sécurité',
    twoFactorAuth: 'Authentification à Deux Facteurs',
    loginHistory: 'Historique de Connexion',
    saveSuccess: 'Vos modifications ont été enregistrées avec succès',
    learningActivity: 'Activité d\'Apprentissage',
  },
  ar: {
    title: 'الملف الشخصي',
    subtitle: 'إدارة إعدادات وتفضيلات حسابك',
    personalInfo: 'المعلومات الشخصية',
    accountSettings: 'إعدادات الحساب',
    preferences: 'التفضيلات',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    bio: 'السيرة الذاتية',
    location: 'الموقع',
    website: 'الموقع الإلكتروني',
    editProfile: 'تعديل الملف الشخصي',
    changePassword: 'تغيير كلمة المرور',
    accountSecurity: 'أمان الحساب',
    notifications: 'الإشعارات',
    paymentMethods: 'طرق الدفع',
    purchaseHistory: 'سجل المشتريات',
    certificates: 'الشهادات',
    language: 'تفضيلات اللغة',
    darkMode: 'الوضع المظلم',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    save: 'حفظ التغييرات',
    cancel: 'إلغاء',
    back: 'رجوع',
    joined: 'تاريخ الانضمام',
    lastLogin: 'آخر تسجيل دخول',
    changePhoto: 'تغيير الصورة',
    deleteAccount: 'حذف الحساب',
    passwordInfo: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    securitySettings: 'إعدادات الأمان',
    twoFactorAuth: 'المصادقة الثنائية',
    loginHistory: 'سجل تسجيل الدخول',
    saveSuccess: 'تم حفظ التغييرات بنجاح',
    learningActivity: 'نشاط التعلم',
  }
};

// Mock user data
const userData = {
  name: 'Ahmed Hassan',
  email: 'ahmed.hassan@example.com',
  avatar: null,
  phone: '+1 (555) 123-4567',
  bio: 'Full Stack Developer and lifelong learner passionate about web technologies and education.',
  location: 'Cairo, Egypt',
  website: 'https://ahmedhassan.dev',
  joinDate: '2023-01-15',
  lastLogin: '2023-07-20T14:30:00Z'
};

// Add this mock data for the streak tracker demonstration
const mockActivityHistory = [
  { date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'high' as const, minutesLearned: 45 },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'medium' as const, minutesLearned: 30 },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'high' as const, minutesLearned: 50 },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'low' as const, minutesLearned: 15 },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'none' as const, minutesLearned: 0 },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'medium' as const, minutesLearned: 25 },
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'high' as const, minutesLearned: 60 },
  { date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'max' as const, minutesLearned: 90 },
  { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'high' as const, minutesLearned: 45 },
  { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'medium' as const, minutesLearned: 30 },
  { date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'high' as const, minutesLearned: 70 },
  { date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'low' as const, minutesLearned: 10 },
  { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'medium' as const, minutesLearned: 20 },
  { date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'high' as const, minutesLearned: 55 },
  { date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'medium' as const, minutesLearned: 25 },
  { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), activityLevel: 'low' as const, minutesLearned: 15 },
];

export default function ProfilePage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = profileDictionary[locale as keyof typeof profileDictionary] || profileDictionary.en;
  
  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    bio: userData.bio,
    location: userData.location,
    website: userData.website,
  });
  
  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to a backend
    // For this demo, we'll just update the UI
    setEditMode(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  // Format date for specific locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    if (locale === 'en') {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (locale === 'fr') {
      return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (locale === 'ar') {
      return date.toLocaleDateString('ar-SA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Profile navigation items
  const profileNavItems = [
    {
      title: dictionary.accountSettings,
      items: [
        {
          id: 'security',
          name: dictionary.accountSecurity,
          icon: <ShieldCheckIcon className="h-5 w-5" />,
          href: `/${locale}/profile/security`
        },
        {
          id: 'notifications',
          name: dictionary.notifications,
          icon: <BellIcon className="h-5 w-5" />,
          href: `/${locale}/profile/notifications`
        },
        {
          id: 'payment',
          name: dictionary.paymentMethods,
          icon: <CreditCardIcon className="h-5 w-5" />,
          href: `/${locale}/profile/payment`
        }
      ]
    },
    {
      title: dictionary.preferences,
      items: [
        {
          id: 'language',
          name: dictionary.language,
          icon: <LanguageIcon className="h-5 w-5" />,
          href: `/${locale}/profile/language`
        },
        {
          id: 'certificates',
          name: dictionary.certificates,
          icon: <DocumentTextIcon className="h-5 w-5" />,
          href: `/${locale}/profile/certificates`
        }
      ]
    }
  ];
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/${locale}/dashboard`}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>{dictionary.back}</span>
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{dictionary.title}</h1>
          <p className="text-gray-600">{dictionary.subtitle}</p>
        </div>
        
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <CheckIcon className="h-5 w-5 mr-2" />
            <span>{dictionary.saveSuccess}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">{dictionary.personalInfo}</h2>
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)} 
                    className="flex items-center text-primary hover:text-primary-dark"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    <span>{dictionary.editProfile}</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setEditMode(false)} 
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <span>{dictionary.cancel}</span>
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Profile Photo */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {userData.avatar ? (
                          <Image
                            src={userData.avatar}
                            alt={userData.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <UserCircleIcon className="h-20 w-20 text-gray-400" />
                        )}
                      </div>
                      {editMode && (
                        <button 
                          type="button" 
                          className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white"
                        >
                          <PencilIcon className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    {editMode && (
                      <button 
                        type="button" 
                        className="mt-2 text-sm text-primary hover:text-primary-dark"
                      >
                        {dictionary.changePhoto}
                      </button>
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.fullName}
                        </label>
                        {editMode ? (
                          <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800">{formData.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.email}
                        </label>
                        {editMode ? (
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800">{formData.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.phone}
                        </label>
                        {editMode ? (
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800">{formData.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.location}
                        </label>
                        {editMode ? (
                          <input 
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800">{formData.location}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.website}
                        </label>
                        {editMode ? (
                          <input 
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800">{formData.website}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.bio}
                        </label>
                        {editMode ? (
                          <textarea 
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-800">{formData.bio}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Account Info */}
                    {!editMode && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{dictionary.joined}</p>
                          <p className="text-sm text-gray-800">{formatDate(userData.joinDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{dictionary.lastLogin}</p>
                          <p className="text-sm text-gray-800">{formatDate(userData.lastLogin)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Save Button */}
                {editMode && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                    >
                      {dictionary.save}
                    </button>
                  </div>
                )}
              </form>
            </div>
            
            {/* Password Change Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{dictionary.changePassword}</h2>
              <p className="text-sm text-gray-600 mb-4">{dictionary.passwordInfo}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dictionary.currentPassword}
                  </label>
                  <input 
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dictionary.newPassword}
                    </label>
                    <input 
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dictionary.confirmPassword}
                    </label>
                    <input 
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.save}
                </button>
              </div>
            </div>
            
            {/* Learning Streak */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{dictionary.learningActivity}</h2>
              <StreakTracker 
                currentStreak={14} 
                longestStreak={21} 
                lastActivityDate={new Date().toISOString()} 
                activityHistory={mockActivityHistory}
                locale={locale}
              />
            </div>
            
            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-red-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Danger Zone</h2>
              <p className="text-sm text-gray-600 mb-4">
                Deleting your account will remove all of your information from our database. This cannot be undone.
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
              >
                {dictionary.deleteAccount}
              </button>
            </div>
          </div>
          
          {/* Sidebar Navigation */}
          <div className="space-y-8">
            {profileNavItems.map((section) => (
              <div key={section.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-800 p-6 border-b border-gray-100">
                  {section.title}
                </h3>
                <nav className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 text-gray-500">{item.icon}</div>
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 