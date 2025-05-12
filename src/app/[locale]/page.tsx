import React from 'react';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Programs from '@/components/Programs';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import LatestBlogs from '@/components/LatestBlogs';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-neutral">
      <Header locale={locale} dictionary={dict} />
      <Hero locale={locale} dictionary={dict} />
      <Stats locale={locale} dictionary={dict} />
      <Features locale={locale} dictionary={dict} />
      <Programs locale={locale} dictionary={dict} />
      <Testimonials locale={locale} dictionary={dict} />
      <LatestBlogs locale={locale} dictionary={dict} />
      <FAQ locale={locale} dictionary={dict} />
      <Footer locale={locale} dictionary={dict} />
      <div className="fixed bottom-4 right-4 z-50">
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </main>
  );
} 