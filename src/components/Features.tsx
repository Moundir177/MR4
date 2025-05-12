'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { Locale } from '@/i18n/settings';

interface FeaturesProps {
  locale: Locale;
  dictionary: any;
}

const features = [
  {
    key: 'quality',
    icon: AcademicCapIcon,
    gradient: 'from-primary-light to-primary-dark',
    shadowColor: 'rgba(63, 81, 181, 0.4)',
    iconGradient: 'from-primary-light to-primary',
  },
  {
    key: 'practical',
    icon: ClipboardDocumentCheckIcon,
    gradient: 'from-secondary to-secondary-dark',
    shadowColor: 'rgba(255, 64, 129, 0.4)',
    iconGradient: 'from-secondary-light to-secondary',
  },
  {
    key: 'certification',
    icon: TrophyIcon,
    gradient: 'from-accent to-accent-dark',
    shadowColor: 'rgba(255, 171, 64, 0.4)',
    iconGradient: 'from-accent-light to-accent',
  },
  {
    key: 'support',
    icon: UserGroupIcon,
    gradient: 'from-secondary-light to-secondary',
    shadowColor: 'rgba(255, 89, 131, 0.4)',
    iconGradient: 'from-secondary-light to-secondary-dark',
  },
];

export default function Features({ locale, dictionary }: FeaturesProps) {
  // Add fallback for the dictionary
  const home = dictionary?.home?.features ? dictionary.home : {
    features: {
      title: 'Why Choose MIRA ACADEMY?',
      subtitle: 'Our commitment to your success',
      quality: {
        title: 'Superior Quality Training',
        description: 'Programs developed by industry professionals, tailored to actual business needs to guarantee your employability.'
      },
      practical: {
        title: 'Practical & Immersive Approach',
        description: 'Learning focused on practice and concrete field experience, with real projects and relevant case studies.'
      },
      certification: {
        title: 'Recognized Certifications',
        description: 'Obtain internationally recognized certifications that enhance your professional profile and strengthen your credibility.'
      },
      support: {
        title: 'Personalized Support',
        description: 'Individual follow-up to help you achieve your professional goals, with dedicated mentors throughout your journey.'
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0" />
      
      {/* Animated decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
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
              {home.features.title}
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {home.features.subtitle}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }} // 24 * 4 = 96px
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.key}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative z-10">
                  {/* Card with 3D-like hover effect */}
                  <motion.div
                    className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-5px]"
                    style={{
                      boxShadow: `0 15px 30px -10px ${feature.shadowColor}`
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Feature icon with pulsing gradient background */}
                    <div className="relative mb-6">
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        style={{ 
                          filter: 'blur(8px)',
                          transform: 'scale(1.35)'
                        }}
                      />
                      <motion.div 
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg relative z-10`}
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
                    
                    {/* Animated title with gradient on hover */}
                    <motion.div
                      className={`text-xl font-bold mb-3 transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r ${feature.gradient}`}
                      style={{
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        backgroundSize: "200% 100%",
                        backgroundPosition: "left bottom"
                      }}
                      whileHover={{
                        backgroundPosition: ["left bottom", "right bottom"]
                      }}
                    >
                      {home.features[feature.key].title}
                    </motion.div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {home.features[feature.key].description}
                    </p>
                    
                    {/* Decorative line with gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 mx-2">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 0.3 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative background element */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 blur-xl -z-10 transition-opacity duration-300 scale-90`}
                  style={{ transform: 'translate(8%, 8%)' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 