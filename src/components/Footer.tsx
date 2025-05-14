'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon
} from '@heroicons/react/24/solid';

// Footer dictionary
const footerDictionary = {
  en: {
    quickLinks: 'Quick Links',
    home: 'Home',
    courses: 'Courses',
    about: 'About Us',
    contact: 'Contact',
    categories: 'Categories',
    webDevelopment: 'Web Development',
    dataScienceAI: 'Data Science & AI',
    mobileDevelopment: 'Mobile Development',
    design: 'UI/UX Design',
    programming: 'Programming',
    marketing: 'Digital Marketing',
    company: 'Company',
    careers: 'Careers',
    blog: 'Blog',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    helpCenter: 'Help Center',
    contactUs: 'Contact Us',
    getInTouch: 'Get in Touch',
    followUs: 'Follow Us',
    subscribeNewsletter: 'Subscribe to Our Newsletter',
    subscribeText: 'Get the latest updates and promotions',
    emailAddress: 'Email Address',
    subscribe: 'Subscribe',
    copyright: '© 2023 MirAcademy. All rights reserved.',
    becomeInstructor: 'Become an Instructor',
    affiliateProgram: 'Affiliate Program',
    investorRelations: 'Investor Relations',
    accessibility: 'Accessibility',
  },
  fr: {
    quickLinks: 'Liens Rapides',
    home: 'Accueil',
    courses: 'Cours',
    about: 'À Propos',
    contact: 'Contact',
    categories: 'Catégories',
    webDevelopment: 'Développement Web',
    dataScienceAI: 'Science des Données & IA',
    mobileDevelopment: 'Développement Mobile',
    design: 'Design UI/UX',
    programming: 'Programmation',
    marketing: 'Marketing Digital',
    company: 'Entreprise',
    careers: 'Carrières',
    blog: 'Blog',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    helpCenter: 'Centre d\'Aide',
    contactUs: 'Contactez-Nous',
    getInTouch: 'Entrer en Contact',
    followUs: 'Suivez-Nous',
    subscribeNewsletter: 'Abonnez-vous à Notre Newsletter',
    subscribeText: 'Recevez les dernières mises à jour et promotions',
    emailAddress: 'Adresse Email',
    subscribe: 'S\'abonner',
    copyright: '© 2023 MirAcademy. Tous droits réservés.',
    becomeInstructor: 'Devenir Instructeur',
    affiliateProgram: 'Programme d\'Affiliation',
    investorRelations: 'Relations Investisseurs',
    accessibility: 'Accessibilité',
  },
  ar: {
    quickLinks: 'روابط سريعة',
    home: 'الرئيسية',
    courses: 'الدورات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    categories: 'التصنيفات',
    webDevelopment: 'تطوير الويب',
    dataScienceAI: 'علوم البيانات والذكاء الاصطناعي',
    mobileDevelopment: 'تطوير الجوال',
    design: 'تصميم واجهة المستخدم/تجربة المستخدم',
    programming: 'البرمجة',
    marketing: 'التسويق الرقمي',
    company: 'الشركة',
    careers: 'الوظائف',
    blog: 'المدونة',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    helpCenter: 'مركز المساعدة',
    contactUs: 'اتصل بنا',
    getInTouch: 'ابق على تواصل',
    followUs: 'تابعنا',
    subscribeNewsletter: 'اشترك في نشرتنا الإخبارية',
    subscribeText: 'احصل على آخر التحديثات والعروض',
    emailAddress: 'البريد الإلكتروني',
    subscribe: 'اشترك',
    copyright: '© 2023 مير أكاديمي. جميع الحقوق محفوظة.',
    becomeInstructor: 'كن مدرسًا',
    affiliateProgram: 'برنامج الشراكة',
    investorRelations: 'علاقات المستثمرين',
    accessibility: 'إمكانية الوصول',
  }
};

// Social media icons defined as custom SVGs
const SocialIcons = {
  Facebook: ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.088-1.643-.13-2.467-.127-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
    </svg>
  ),
  Twitter: ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  ),
  Instagram: ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  LinkedIn: ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
    </svg>
  ),
  YouTube: ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
    </svg>
  ),
};

interface FooterProps {
  locale?: string;
  dictionary?: any;
}

const Footer = ({ locale: propLocale, dictionary: propDictionary }: FooterProps = {}) => {
  // Get locale from pathname or props
  const pathname = usePathname();
  const locale = propLocale || pathname?.split('/')[1] || 'en';
  
  const dictionary = footerDictionary[locale as keyof typeof footerDictionary] || footerDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  return (
    <footer className={`bg-gray-900 text-white pt-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and About */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image 
                src="/logo-white.svg" 
                alt="MirAcademy" 
                width={180} 
                height={40}
                className="h-10 w-auto"
              />
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              MirAcademy - Transforming education through technology and innovation. 
              Learn from industry experts and gain skills that matter.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">123 Education St, Tech City, 10001</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">contact@miracademy.com</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/courses`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.courses}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.contact}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.categories}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/courses?category=web-development`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.webDevelopment}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/courses?category=data-science`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.dataScienceAI}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/courses?category=mobile-development`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.mobileDevelopment}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/courses?category=design`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.design}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/courses?category=programming`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.programming}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.subscribeNewsletter}</h3>
            <p className="text-gray-400 mb-4">{dictionary.subscribeText}</p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={dictionary.emailAddress}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
              />
              <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors">
                {dictionary.subscribe}
              </button>
            </div>
          </div>
        </div>
        
        {/* Social Media & Language Switcher */}
        <div className="border-t border-gray-800 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-semibold mb-3">{dictionary.followUs}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <SocialIcons.Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <SocialIcons.Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <SocialIcons.Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <SocialIcons.LinkedIn className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <SocialIcons.YouTube className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Copyright & Legal Links */}
        <div className="border-t border-gray-800 py-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">{dictionary.copyright}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href={`/${locale}/privacy-policy`} className="text-gray-400 hover:text-white">
                {dictionary.privacyPolicy}
              </Link>
              <Link href={`/${locale}/terms-of-service`} className="text-gray-400 hover:text-white">
                {dictionary.termsOfService}
              </Link>
              <Link href={`/${locale}/help-center`} className="text-gray-400 hover:text-white">
                {dictionary.helpCenter}
              </Link>
              <Link href={`/${locale}/accessibility`} className="text-gray-400 hover:text-white">
                {dictionary.accessibility}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 