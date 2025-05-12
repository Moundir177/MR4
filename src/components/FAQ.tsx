'use client';
// FAQ Component for displaying frequently asked questions

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import type { Locale } from '@/i18n/settings';

interface FAQProps {
  locale: Locale;
  dictionary: any;
}

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ({ locale, dictionary }: FAQProps) {
  // Fallback for FAQ dictionary with robust checking
  const faq = {
    title: dictionary?.faq?.title || 'Frequently Asked Questions',
    subtitle: dictionary?.faq?.subtitle || 'Find answers to common questions about our programs and services',
    items: dictionary?.faq?.items || [
      {
        question: 'What types of courses does MIRA ACADEMY offer?',
        answer: 'MIRA ACADEMY offers a wide range of professional courses including business management, digital marketing, computer science, design, and more. Our programs are designed to provide practical skills that are in demand in today\'s job market.'
      },
      {
        question: 'Are the courses available online or in-person?',
        answer: 'We offer both online and in-person learning options. Our flexible approach allows students to choose the learning format that best suits their needs and schedule. Some courses also offer hybrid options combining both formats.'
      },
      {
        question: 'How do I register for a course?',
        answer: 'Registration is simple! Browse our programs, select the course you\'re interested in, and follow the registration process on the course page. If you need assistance, our support team is available to guide you through the process.'
      },
      {
        question: 'Are there any prerequisites for enrolling in courses?',
        answer: 'Prerequisites vary depending on the course level. Basic courses typically don\'t require prior knowledge, while advanced courses may require foundational understanding or completion of prerequisite courses. Each course page lists specific requirements.'
      },
      {
        question: 'Does MIRA ACADEMY offer certification upon course completion?',
        answer: 'Yes, upon successful completion of our courses, students receive a MIRA ACADEMY certificate that validates their skills and knowledge. Many of our programs also prepare students for industry-recognized certifications.'
      }
    ]
  };

  // State to track which FAQ item is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-neutral-50">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 opacity-50" />
            <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary mb-4">
              {faq.title}
            </h2>
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {faq.subtitle}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.items.map((item: FAQItem, index: number) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center"
                onClick={() => toggleExpand(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-8">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-2"
                >
                  <ChevronDownIcon className={`w-5 h-5 ${expandedIndex === index ? 'text-primary' : 'text-gray-400'} transition-colors duration-300`} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
} 