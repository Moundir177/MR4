'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/settings';

interface StatsProps {
  locale: Locale;
  dictionary: any;
}

const stats = [
  { key: 'students', value: '5,000+' },
  { key: 'courses', value: '50+' },
  { key: 'instructors', value: '30+' },
  { key: 'partners', value: '20+' },
];

// Default fallback labels in case dictionary is missing
const fallbackLabels = {
  students: 'Students Enrolled',
  courses: 'Courses Available',
  instructors: 'Expert Instructors',
  partners: 'Industry Partners'
};

export default function Stats({ dictionary }: StatsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.key}
              className="p-6 rounded-xl bg-accent/20 backdrop-blur-sm"
              variants={item}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary-dark mb-2">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {dictionary?.home?.stats?.[stat.key] || fallbackLabels[stat.key as keyof typeof fallbackLabels]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 