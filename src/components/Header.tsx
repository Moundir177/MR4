'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon, ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/i18n/settings';
import { usePathname } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { Disclosure } from '@headlessui/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  locale: Locale;
  dictionary: any;
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname();
  // Use useState with undefined initial state to avoid hydration mismatch
  const [isScrolled, setIsScrolled] = useState<boolean | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Create a dictionary fallback
  const headerDict = dictionary?.header || {
    home: 'Home',
    courses: 'Courses',
    programs: 'Programs',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    faq: 'FAQ',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
  };

  // Mock authenticated state - in a real app, this would come from an auth context
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Get cart context
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [showCart, setShowCart] = useState<boolean>(false);
  
  // Toggle cart dropdown
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Initialize scroll state on the client-side only to avoid hydration mismatch
  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigation = [
    { name: headerDict.home, href: `/${locale}` },
    { name: headerDict.courses, href: `/${locale}/courses` },
    { name: headerDict.programs, href: `/${locale}/programs` },
    { name: headerDict.about, href: `/${locale}/about` },
    { name: headerDict.blog, href: `/${locale}/blog` },
    { name: headerDict.contact, href: `/${locale}/contact` },
    { name: headerDict.faq, href: `/${locale}/faq` },
  ];
  
  // Only render styled content after isScrolled has been set on the client
  // This prevents hydration mismatch between server and client
  const isLoaded = isScrolled !== undefined;
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      // Use a default value during server rendering (transparent background)
      !isLoaded ? 'bg-transparent py-4' :
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <Disclosure as="nav" className="container mx-auto px-4 sm:px-6 lg:px-8">
        {({ open }) => (
          <React.Fragment>
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Logo */}
                <Link href={`/${locale}`} className="flex-shrink-0 flex items-center">
                  <div className="h-10 w-auto text-2xl font-bold text-primary">
                    MIRA ACADEMY
                  </div>
                </Link>
              </div>
              
              {/* Navigation Links - Desktop */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? 'text-primary bg-white/20 backdrop-blur-sm'
                        : !isLoaded || !isScrolled 
                          ? 'text-white hover:text-white/80 font-semibold transition-colors'
                          : 'text-gray-700 hover:text-primary transition-colors'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Shopping Cart */}
                <div className="relative">
                  <button 
                    className={`p-2 ${!isLoaded || !isScrolled ? 'text-white' : 'text-gray-600'} hover:text-primary relative`}
                    onClick={toggleCart}
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                  
                  {/* Cart Dropdown */}
                  {showCart && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="p-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">
                          {dictionary[locale as keyof typeof dictionary]?.cart?.title || 'Shopping Cart'}
                        </h3>
                      </div>
                      
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          {dictionary[locale as keyof typeof dictionary]?.cart?.empty || 'Your cart is empty'}
                        </div>
                      ) : (
                        <div>
                          <div className="max-h-60 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div key={item.id} className="p-3 hover:bg-gray-50">
                                <div className="flex gap-2">
                                  <div className="w-10 h-10 relative flex-shrink-0">
                                    <Image
                                      src={item.thumbnail || '/images/courses/placeholder.jpg'}
                                      alt={item.title}
                                      fill
                                      className="object-cover rounded"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                                    <div className="flex justify-between mt-1">
                                      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                      <button 
                                        className="text-xs text-red-500 hover:text-red-700"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        {dictionary[locale as keyof typeof dictionary]?.cart?.remove || 'Remove'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t border-gray-100 p-3">
                            <div className="flex justify-between mb-3">
                              <span className="font-medium text-gray-800">
                                {dictionary[locale as keyof typeof dictionary]?.cart?.total || 'Total'}:
                              </span>
                              <span className="font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
                            </div>
                            <Link 
                              href={`/${locale}/checkout`}
                              className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                              {dictionary[locale as keyof typeof dictionary]?.cart?.checkout || 'Checkout'}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Language Switcher */}
                <LanguageSwitcher />
                
                {/* Auth Buttons or User Menu */}
                <div className="hidden md:flex md:items-center">
                  {isAuthenticated ? (
                    <div className="relative ml-3">
                      <Disclosure>
                        {({ open }) => (
                          <React.Fragment>
                            <Disclosure.Button className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full ${
                              !isLoaded || !isScrolled 
                                ? 'bg-white/10 backdrop-blur-sm border-white/20 border text-white' 
                                : 'border border-gray-200 hover:border-gray-300 text-gray-700'
                            } transition-colors`}>
                              <UserCircleIcon className={`h-6 w-6 ${!isLoaded || !isScrolled ? 'text-white' : 'text-gray-600'}`} />
                              <span className={`font-medium ${!isLoaded || !isScrolled ? 'text-white' : 'text-gray-700'}`}>Ahmed Hassan</span>
                              <ChevronDownIcon className={`h-4 w-4 ${!isLoaded || !isScrolled ? 'text-white/70' : 'text-gray-500'} transition-transform ${
                                open ? 'rotate-180 transform' : ''
                              }`} />
                            </Disclosure.Button>
                            
                            <Transition
                              show={open}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Disclosure.Panel className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Link
                                  href={`/${locale}/dashboard`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                  {headerDict.dashboard}
                                </Link>
                                <Link
                                  href={`/${locale}/profile`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                  {headerDict.profile}
                                </Link>
                                <Link
                                  href={`/${locale}/settings`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                  {headerDict.settings}
                                </Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  onClick={() => setIsAuthenticated(false)}
                                >
                                  {headerDict.logout}
                                </button>
                              </Disclosure.Panel>
                            </Transition>
                          </React.Fragment>
                        )}
                      </Disclosure>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/${locale}/auth?tab=login`}
                        className={`font-medium ${
                          !isLoaded || !isScrolled ? 'text-white hover:text-white/80' : 'text-primary hover:text-primary-dark'
                        }`}
                      >
                        {headerDict.login}
                      </Link>
                      <Link
                        href={`/${locale}/auth?tab=register`}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        {headerDict.register}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center p-2 rounded-md ${
                  !isLoaded || !isScrolled 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:bg-gray-100'
                } hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === item.href
                        ? 'bg-primary-light text-primary'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <div>
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <UserCircleIcon className="h-10 w-10 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">Ahmed Hassan</div>
                        <div className="text-sm font-medium text-gray-500">ahmed.hassan@example.com</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <Disclosure.Button
                        as={Link}
                        href={`/${locale}/dashboard`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {headerDict.dashboard}
                      </Disclosure.Button>
                      <Disclosure.Button
                        as={Link}
                        href={`/${locale}/profile`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {headerDict.profile}
                      </Disclosure.Button>
                      <Disclosure.Button
                        as={Link}
                        href={`/${locale}/settings`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {headerDict.settings}
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="button"
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                        onClick={() => setIsAuthenticated(false)}
                      >
                        {headerDict.logout}
                      </Disclosure.Button>
                    </div>
                  </div>
                ) : (
                  <div className="px-2 space-y-1">
                    <Disclosure.Button
                      as={Link}
                      href={`/${locale}/auth?tab=login`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      {headerDict.login}
                    </Disclosure.Button>
                    <Disclosure.Button
                      as={Link}
                      href={`/${locale}/auth?tab=register`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      {headerDict.register}
                    </Disclosure.Button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </React.Fragment>
        )}
      </Disclosure>
    </header>
  );
} 