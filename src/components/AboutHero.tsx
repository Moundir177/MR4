'use client';
// About Hero Component for the About page

import React from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/settings';

interface AboutHeroProps {
  locale: Locale;
  dictionary: any;
}

export default function AboutHero({ locale, dictionary }: AboutHeroProps) {
  // Improve fallback for about dictionary with more robust checking
  const about = {
    hero: {
      title: dictionary?.about?.hero?.title || 'About MIRA ACADEMY',
      subtitle: dictionary?.about?.hero?.subtitle || 'Our Journey of Excellence',
      description: dictionary?.about?.hero?.description || 'Founded with a vision to transform professional education, MIRA ACADEMY has been at the forefront of innovative training since its inception. We believe in combining theoretical knowledge with practical skills to prepare our students for real-world challenges.'
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light z-0" />
      <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] mix-blend-overlay opacity-10 z-0" />
      
      {/* Animated decorative elements */}
      <motion.div 
        className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
                {about.hero.title}
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl font-light mb-8 text-white/90 drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {about.hero.subtitle}
          </motion.p>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-lg text-white/80 leading-relaxed">
              {about.hero.description}
            </p>
            
            {/* Animated line */}
            <motion.div 
              className="w-24 h-1 bg-secondary mx-auto mt-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 