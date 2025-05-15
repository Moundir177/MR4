import React from 'react';
import BlogPosts from '@/components/BlogPosts';

// Server component - no "use client" directive
export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  // Simple title based on locale
  const title = locale === 'fr' ? 'Blog' : 
                locale === 'ar' ? 'المدونة' : 
                'Blog';
  
  // Mock dictionary object for BlogPosts component
  const dictionary = {
    blog: {
      title: title,
      readMore: locale === 'fr' ? 'Lire plus' : 
                locale === 'ar' ? 'اقرأ المزيد' : 
                'Read more'
    }
  };
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="grid gap-8">
        <BlogPosts locale={locale} dictionary={dictionary} />
      </div>
    </main>
  );
}

// This function is server-side only, so it works correctly without "use client"
export function generateStaticParams() {
  // Return supported locales
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' }
  ];
} 