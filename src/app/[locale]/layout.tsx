import React from 'react';
import { Inter, Poppins, Amiri } from 'next/font/google';
import { locales, Locale, localeDirections } from '@/i18n/settings';

// Font definitions
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-amiri',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const direction = localeDirections[locale as keyof typeof localeDirections];

  return (
    <html lang={locale} dir={direction} className={`${poppins.variable} ${amiri.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 