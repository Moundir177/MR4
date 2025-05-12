'use client';
// Contact Info Component for the Contact page

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  TrophyIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import type { Locale } from '@/i18n/settings';

interface ContactInfoProps {
  locale: Locale;
  dictionary: any;
}

const contactItems = [
  {
    icon: AcademicCapIcon,
    key: 'address',
    gradient: 'from-primary-light to-primary-dark',
    shadow: 'rgba(63, 81, 181, 0.4)'
  },
  {
    icon: UserGroupIcon,
    key: 'phone',
    gradient: 'from-secondary to-secondary-dark',
    shadow: 'rgba(255, 64, 129, 0.4)'
  },
  {
    icon: TrophyIcon,
    key: 'email',
    gradient: 'from-accent to-accent-dark',
    shadow: 'rgba(255, 171, 64, 0.4)'
  },
  {
    icon: ClipboardDocumentCheckIcon,
    key: 'hours',
    gradient: 'from-primary-dark to-primary',
    shadow: 'rgba(48, 63, 159, 0.4)'
  }
];

export default function ContactInfo({ locale, dictionary }: ContactInfoProps) {
  // Add fallback for contact dictionary
  const contact = dictionary?.contact?.info ? dictionary.contact : {
    info: {
      title: 'Contact Information',
      subtitle: 'Reach out to us through any of these channels',
      address: {
        title: 'Our Location',
        value: '123 Education Street, Algiers, Algeria',
        link: 'https://maps.google.com'
      },
      phone: {
        title: 'Phone Number',
        value: '+213 23 456 789',
        link: 'tel:+21323456789'
      },
      email: {
        title: 'Email Address',
        value: 'info@mira-academy.com',
        link: 'mailto:info@mira-academy.com'
      },
      hours: {
        title: 'Working Hours',
        value: 'Monday - Friday: 9AM - 6PM',
        link: '#'
      }
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark to-primary z-0" />
      <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] mix-blend-overlay opacity-10 z-0" />
      
      {/* Decorative elements */}
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1>{contact.info.title}</h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {contact.info.subtitle}
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <a
                  href={contact.info[item.key].link}
                  className="block h-full bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
                  target={item.key === 'address' ? '_blank' : undefined}
                  rel={item.key === 'address' ? 'noopener noreferrer' : undefined}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="mb-4 relative">
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-20`}
                        style={{ filter: 'blur(8px)' }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center relative z-10`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2">{contact.info[item.key].title}</h3>
                    <p className="text-white/80">{contact.info[item.key].value}</p>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 