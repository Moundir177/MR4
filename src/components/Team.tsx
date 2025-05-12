'use client';
// Team Component for the About page

import React from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/settings';

interface TeamProps {
  locale: Locale;
  dictionary: any;
}

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Mansour',
    role: 'CEO & Founder',
    image: '/images/team/team-1.jpg',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 2,
    name: 'Ahmed Khalid',
    role: 'Lead Instructor',
    image: '/images/team/team-2.jpg',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 3,
    name: 'Leila Benmoussa',
    role: 'Program Director',
    image: '/images/team/team-3.jpg',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 4,
    name: 'Karim Hassan',
    role: 'Marketing Director',
    image: '/images/team/team-4.jpg',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

export default function Team({ locale, dictionary }: TeamProps) {
  // Add fallback for about dictionary
  const about = dictionary?.about?.team ? dictionary.about : {
    team: {
      title: 'Meet Our Team',
      subtitle: 'The experts behind MIRA ACADEMY',
      description: 'Our team of dedicated professionals brings a wealth of industry experience and teaching expertise to provide you with the best educational experience.'
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      
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
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 opacity-50" />
            <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary mb-6">
              {about.team.title}
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-6"
          >
            {about.team.subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-3xl mx-auto"
          >
            {about.team.description}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="relative rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Member Image with overlay */}
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Image placeholder with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-primary-dark/20" />
                  
                  {/* Social icons that appear on hover */}
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a 
                      href={member.socialLinks.linkedin} 
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.socialLinks.twitter} 
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                  
                  {/* Placeholder for member photo */}
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary-dark/30">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-primary-dark mb-3">{member.role}</p>
                  
                  {/* Decorative underline */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-primary-dark mx-auto transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 