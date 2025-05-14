'use client';
// Values Component for the About page

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  TrophyIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/solid';
import type { Locale } from '@/i18n/settings';

interface ValuesProps {
  locale: Locale;
  dictionary: any;
}

// Define value item type
type ValueItem = {
  title: string;
  description: string;
};

// Define the values object type with index signature
interface ValuesData {
  title: string;
  subtitle: string;
  innovation: ValueItem;
  collaboration: ValueItem;
  excellence: ValueItem;
  integrity: ValueItem;
  [key: string]: any; // Add index signature to allow dynamic access
}

const values = [
  {
    icon: AcademicCapIcon,
    key: 'innovation',
    gradient: 'from-primary-light to-primary-dark',
    shadow: 'rgba(63, 81, 181, 0.4)'
  },
  {
    icon: UserGroupIcon,
    key: 'collaboration',
    gradient: 'from-secondary to-secondary-dark',
    shadow: 'rgba(255, 64, 129, 0.4)'
  },
  {
    icon: TrophyIcon,
    key: 'excellence',
    gradient: 'from-accent to-accent-dark',
    shadow: 'rgba(255, 171, 64, 0.4)'
  },
  {
    icon: ClipboardDocumentCheckIcon,
    key: 'integrity',
    gradient: 'from-primary-dark to-primary',
    shadow: 'rgba(48, 63, 159, 0.4)'
  }
];

export default function Values({ locale, dictionary }: ValuesProps) {
  // Improve fallback with more robust checking for each property
  const about = {
    values: {
      title: dictionary?.about?.values?.title || 'Our Core Values',
      subtitle: dictionary?.about?.values?.subtitle || 'Principles that guide us',
      innovation: {
        title: dictionary?.about?.values?.innovation?.title || 'Innovation',
        description: dictionary?.about?.values?.innovation?.description || 'We constantly evolve our teaching methods and curriculum to stay ahead of industry trends and provide cutting-edge education.'
      },
      collaboration: {
        title: dictionary?.about?.values?.collaboration?.title || 'Collaboration',
        description: dictionary?.about?.values?.collaboration?.description || 'We foster a collaborative environment where students, instructors, and industry partners work together to achieve mutual success.'
      },
      excellence: {
        title: dictionary?.about?.values?.excellence?.title || 'Excellence',
        description: dictionary?.about?.values?.excellence?.description || 'We strive for excellence in everything we do, setting high standards for our programs, instructors, and student outcomes.'
      },
      integrity: {
        title: dictionary?.about?.values?.integrity?.title || 'Integrity',
        description: dictionary?.about?.values?.integrity?.description || 'We operate with honesty, transparency, and ethical conduct in all our interactions and business practices.'
      }
    } as ValuesData
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 opacity-50" />
            <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary mb-6">
              {about.values.title}
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {about.values.subtitle}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            
            return (
              <motion.div
                key={value.key}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div 
                  className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden border border-gray-100 h-full z-10"
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 25px 50px -12px ${value.shadow}`
                  }}
                >
                  {/* Gradient background that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-white z-0 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-0`} />
                  
                  <div className="flex items-start gap-6 relative z-10">
                    {/* Icon with animated gradient background */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${value.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        style={{ filter: 'blur(8px)' }}
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg relative z-10`}
                        whileHover={{ 
                          rotate: [0, 5, -5, 0],
                          scale: 1.05
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r ${value.gradient}`}>
                        {about.values[value.key]?.title || value.key}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {about.values[value.key]?.description || ''}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${value.gradient} rounded-full`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.3 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: 'left' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 