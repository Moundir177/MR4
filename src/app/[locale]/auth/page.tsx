'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  AcademicCapIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid';

// Auth dictionary fallback
const authDictionary = {
  en: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phone: 'Phone Number',
    education: 'Education Level',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    loginButton: 'Login',
    registerButton: 'Create Account',
    orLoginWith: 'Or Login With',
    orRegisterWith: 'Or Register With',
    googleLogin: 'Google',
    facebookLogin: 'Facebook',
    linkedinLogin: 'LinkedIn',
    noAccount: 'Don\'t have an account?',
    alreadyAccount: 'Already have an account?',
    signUpHere: 'Sign up here',
    loginHere: 'Login here',
    termsAgree: 'I agree to the',
    termsAndConditions: 'Terms and Conditions',
    byRegistering: 'By registering, you agree to our Terms and Conditions',
    educationLevels: [
      'High School',
      'Associate Degree',
      'Bachelor\'s Degree',
      'Master\'s Degree',
      'PhD',
      'Other'
    ]
  },
  fr: {
    login: 'Connexion',
    register: 'Inscription',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    fullName: 'Nom complet',
    phone: 'Numéro de téléphone',
    education: 'Niveau d\'éducation',
    forgotPassword: 'Mot de passe oublié ?',
    rememberMe: 'Se souvenir de moi',
    loginButton: 'Se connecter',
    registerButton: 'Créer un compte',
    orLoginWith: 'Ou connectez-vous avec',
    orRegisterWith: 'Ou inscrivez-vous avec',
    googleLogin: 'Google',
    facebookLogin: 'Facebook',
    linkedinLogin: 'LinkedIn',
    noAccount: 'Vous n\'avez pas de compte ?',
    alreadyAccount: 'Vous avez déjà un compte ?',
    signUpHere: 'Inscrivez-vous ici',
    loginHere: 'Connectez-vous ici',
    termsAgree: 'J\'accepte les',
    termsAndConditions: 'Termes et Conditions',
    byRegistering: 'En vous inscrivant, vous acceptez nos Termes et Conditions',
    educationLevels: [
      'Lycée',
      'Bac+2',
      'Licence',
      'Master',
      'Doctorat',
      'Autre'
    ]
  },
  ar: {
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    education: 'المستوى التعليمي',
    forgotPassword: 'نسيت كلمة المرور؟',
    rememberMe: 'تذكرني',
    loginButton: 'تسجيل الدخول',
    registerButton: 'إنشاء حساب',
    orLoginWith: 'أو سجل الدخول باستخدام',
    orRegisterWith: 'أو أنشئ حسابًا باستخدام',
    googleLogin: 'جوجل',
    facebookLogin: 'فيسبوك',
    linkedinLogin: 'لينكد إن',
    noAccount: 'ليس لديك حساب؟',
    alreadyAccount: 'لديك حساب بالفعل؟',
    signUpHere: 'سجل هنا',
    loginHere: 'سجل الدخول هنا',
    termsAgree: 'أوافق على',
    termsAndConditions: 'الشروط والأحكام',
    byRegistering: 'بالتسجيل، فإنك توافق على الشروط والأحكام الخاصة بنا',
    educationLevels: [
      'الثانوية',
      'دبلوم',
      'بكالوريوس',
      'ماجستير',
      'دكتوراه',
      'أخرى'
    ]
  }
};

export default function AuthPage() {
  // Get locale from pathname since useParams() doesn't work in client components
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  // Use a default tab state instead of searchParams
  const [activeTab, setActiveTab] = useState(0);
  const dictionary = authDictionary[locale as keyof typeof authDictionary] || authDictionary.en;
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // Form handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setRegisterForm({
      ...registerForm,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle authentication logic
    console.log('Login submitted', loginForm);
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle registration logic
    console.log('Register submitted', registerForm);
  };
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Column - Decorative */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-primary to-primary-dark text-white p-12">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">MIRA ACADEMY</h2>
                  <p className="text-white/80 text-lg mb-8">
                    Join our community of learners and transform your career with industry-relevant skills.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                        <AcademicCapIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Expert-Led Courses</h3>
                        <p className="text-white/70">Learn from industry professionals with real-world experience</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Recognized Certificates</h3>
                        <p className="text-white/70">Earn certificates valued by top employers worldwide</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Career Support</h3>
                        <p className="text-white/70">Get job placement assistance and career coaching</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Link 
                    href={`/${locale}`}
                    className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                  >
                    <ArrowLeftIcon className="w-5 h-5 mr-2 rotate-180" />
                    Back to Homepage
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column - Auth Forms */}
            <div className="p-8 md:p-12 md:w-1/2">
              <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                <Tab.List className="flex rounded-lg bg-gray-100 p-1 mb-8">
                  <Tab as={React.Fragment}>
                    {({ selected }) => (
                      <button
                        className={`w-full py-3 text-sm font-medium rounded-md ${
                          selected
                            ? 'bg-white text-primary shadow'
                            : 'text-gray-500 hover:text-gray-700'
                        } transition-all duration-200 focus:outline-none`}
                      >
                        {dictionary.login}
                      </button>
                    )}
                  </Tab>
                  <Tab as={React.Fragment}>
                    {({ selected }) => (
                      <button
                        className={`w-full py-3 text-sm font-medium rounded-md ${
                          selected
                            ? 'bg-white text-primary shadow'
                            : 'text-gray-500 hover:text-gray-700'
                        } transition-all duration-200 focus:outline-none`}
                      >
                        {dictionary.register}
                      </button>
                    )}
                  </Tab>
                </Tab.List>
                
                <Tab.Panels>
                  {/* Login Form */}
                  <Tab.Panel>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.email}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={loginForm.email}
                              onChange={handleLoginChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              {dictionary.password}
                            </label>
                            <button type="button" className="text-sm text-primary hover:text-primary-dark">
                              {dictionary.forgotPassword}
                            </button>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              value={loginForm.password}
                              onChange={handleLoginChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            checked={loginForm.rememberMe}
                            onChange={handleLoginChange}
                            className="h-4 w-4 text-primary focus:ring-primary rounded"
                          />
                          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                            {dictionary.rememberMe}
                          </label>
                        </div>
                        
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                          >
                            {dictionary.loginButton}
                          </button>
                        </div>
                      </form>
                      
                      <div className="mt-8">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">{dictionary.orLoginWith}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with Google</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                          </button>
                          
                          <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with Facebook</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with LinkedIn</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                          {dictionary.noAccount}{' '}
                          <button
                            type="button"
                            onClick={() => setActiveTab(1)}
                            className="text-primary hover:text-primary-dark font-medium"
                          >
                            {dictionary.signUpHere}
                          </button>
                        </p>
                      </div>
                    </motion.div>
                  </Tab.Panel>
                  
                  {/* Register Form */}
                  <Tab.Panel>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleRegisterSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.fullName}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="fullName"
                              name="fullName"
                              type="text"
                              autoComplete="name"
                              required
                              value={registerForm.fullName}
                              onChange={handleRegisterChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.email}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="registerEmail"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={registerForm.email}
                              onChange={handleRegisterChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              {dictionary.phone}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                value={registerForm.phone}
                                onChange={handleRegisterChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                placeholder="+1 (555) 987-6543"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                              {dictionary.education}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <select
                                id="education"
                                name="education"
                                value={registerForm.education}
                                onChange={handleRegisterChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary appearance-none bg-none"
                              >
                                <option value="" disabled>Select education level</option>
                                {dictionary.educationLevels.map((level, index) => (
                                  <option key={index} value={level}>{level}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.password}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="registerPassword"
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              required
                              value={registerForm.password}
                              onChange={handleRegisterChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.confirmPassword}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              autoComplete="new-password"
                              required
                              value={registerForm.confirmPassword}
                              onChange={handleRegisterChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="agreeToTerms"
                              name="agreeToTerms"
                              type="checkbox"
                              required
                              checked={registerForm.agreeToTerms}
                              onChange={handleRegisterChange}
                              className="h-4 w-4 text-primary focus:ring-primary rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="agreeToTerms" className="text-gray-700">
                              {dictionary.termsAgree}{' '}
                              <Link href={`/${locale}/terms`} className="text-primary hover:text-primary-dark">
                                {dictionary.termsAndConditions}
                              </Link>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                          >
                            {dictionary.registerButton}
                          </button>
                        </div>
                      </form>
                      
                      <div className="mt-8">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">{dictionary.orRegisterWith}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign up with Google</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                          </button>
                          
                          <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign up with Facebook</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign up with LinkedIn</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                          {dictionary.alreadyAccount}{' '}
                          <button
                            type="button"
                            onClick={() => setActiveTab(0)}
                            className="text-primary hover:text-primary-dark font-medium"
                          >
                            {dictionary.loginHere}
                          </button>
                        </p>
                      </div>
                    </motion.div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 