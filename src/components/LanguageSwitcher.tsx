'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

// Language options
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

// Language switcher dictionary
const switcherDictionary = {
  en: {
    selectLanguage: 'Select Language',
  },
  fr: {
    selectLanguage: 'Sélectionner la Langue',
  },
  ar: {
    selectLanguage: 'اختر اللغة',
  }
};

interface LanguageSwitcherProps {
  currentLocale?: string;
}

const LanguageSwitcher = ({ currentLocale: propLocale }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current locale from prop or pathname
  const currentLocale = propLocale || pathname?.split('/')[1] || 'en';
  
  // Get dictionary for current locale
  const dictionary = switcherDictionary[currentLocale as keyof typeof switcherDictionary] || switcherDictionary.en;
  
  // Find current language
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  // Get redirect path when switching language
  const getRedirectPath = (locale: string) => {
    // Remove the first segment (current locale) and join the rest
    const pathSegments = pathname?.split('/') || [];
    const pathWithoutLocale = pathSegments.slice(2).join('/');
    
    return `/${locale}/${pathWithoutLocale}`;
  };
  
  return (
    <div className="relative" onBlur={closeDropdown}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none"
      >
        <GlobeAltIcon className="h-5 w-5 text-gray-400" />
        <span className="text-white">{currentLanguage.flag} {currentLanguage.name}</span>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {dictionary.selectLanguage}
            </div>
            {languages.map((language) => (
              <Link
                key={language.code}
                href={getRedirectPath(language.code)}
                locale={language.code}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm ${
                  currentLocale === language.code
                    ? 'bg-gray-100 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                <div className="flex items-center">
                  <span className="mr-2">{language.flag}</span>
                  <span>{language.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 