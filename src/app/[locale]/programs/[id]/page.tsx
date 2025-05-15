import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/dist/client/components/not-found';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// This is used to trigger not-found.tsx
export const dynamicParams = true;

// Mock program details
const programDetails = {
  'web-development': {
    id: 'web-development',
    title: {
      en: 'Web Development',
      fr: 'Développement Web',
      ar: 'تطوير الويب'
    }
  },
  'data-science': {
    id: 'data-science',
    title: {
      en: 'Data Science',
      fr: 'Science des Données',
      ar: 'علوم البيانات'
    }
  }
};

// Static params generation (works in a server component)
export function generateStaticParams() {
  const ids = Object.keys(programDetails);
  
  // Return supported locales and program IDs
  return [
    { locale: 'en', id: 'web-development' },
    { locale: 'en', id: 'data-science' },
    { locale: 'fr', id: 'web-development' },
    { locale: 'fr', id: 'data-science' },
    { locale: 'ar', id: 'web-development' },
    { locale: 'ar', id: 'data-science' }
  ];
}

// Server component - no "use client" directive
export default async function ProgramDetailPage({
  params: { locale, id },
}: {
  params: { locale: Locale; id: string };
}) {
  const dict = await getDictionary(locale);
  const program = programDetails[id as keyof typeof programDetails];
  
  // If program doesn't exist, use Next.js notFound() function
  if (!program) {
    return notFound();
  }
  
  return (
    <main className="min-h-screen bg-neutral">
      <Header locale={locale} dictionary={dict} />
      
      {/* Program content */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">
          {program.title[locale as keyof typeof program.title] || program.id}
        </h1>
        {/* The rest of your program page content */}
      </div>
      
      <Footer dictionary={dict} locale={locale} />
      <div className="fixed bottom-4 right-4 z-50">
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </main>
  );
} 