import React from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import FAQ from '@/components/FAQ';
import type { Locale } from '@/i18n/settings';

interface FAQPageProps {
  params: {
    locale: Locale;
  };
}

export default async function FAQPage({ params: { locale } }: FAQPageProps) {
  const dictionary = await getDictionary(locale);

  return (
    <main>
      <FAQ locale={locale} dictionary={dictionary} />
    </main>
  );
} 