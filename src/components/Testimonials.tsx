'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/settings';

interface TestimonialsProps {
  locale: Locale;
  dictionary: any;
}

const testimonials = [
  {
    id: 1,
    name: 'Amina Benali',
    role: 'Web Development Graduate',
    image: '/images/testimonials/testimonial-1.jpg',
    content:
      'MIRA ACADEMY transformed my career. The practical approach and supportive instructors helped me land a job as a developer just one month after graduation!',
  },
  {
    id: 2,
    name: 'Karim Hadj',
    role: 'Digital Marketing Student',
    image: '/images/testimonials/testimonial-2.jpg',
    content:
      'The digital marketing program is exceptional. The instructors bring real-world experience and the curriculum is always up-to-date with the latest trends and tools.',
  },
  {
    id: 3,
    name: 'Yasmine Ferhat',
    role: 'Data Science Graduate',
    image: '/images/testimonials/testimonial-3.jpg',
    content:
      'The data science program at MIRA ACADEMY gave me the skills and confidence to switch careers. The hands-on projects were particularly valuable for building my portfolio.',
  },
  {
    id: 4,
    name: 'Mohammed Rais',
    role: 'UI/UX Design Student',
    image: '/images/testimonials/testimonial-4.jpg',
    content:
      'As someone who came from a non-design background, I was amazed by how quickly I was able to grasp the concepts. The instructors break down complex topics into understandable lessons.',
  },
];

export default function Testimonials({ locale, dictionary }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Add fallback for dictionary
  const home = dictionary?.home?.testimonials ? dictionary.home : {
    testimonials: {
      title: "What Our Students Say",
      subtitle: "Journeys that inspire",
      readAll: "Read All Testimonials"
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Go to specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Go to next or previous slide
  const changeSlide = (direction: number) => {
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    setActiveIndex(newIndex);
  };

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark to-primary z-0" />
      <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-bg.png')] z-0" />
      
      {/* Animated blobs */}
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary-light opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {home.testimonials.title}
          </h2>
          <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
            {home.testimonials.subtitle}
          </p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Decorative quote marks */}
          <motion.div
            className="absolute -top-8 -left-8 text-secondary/20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20 transform -scale-x-100"
            >
              <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.143l.75-3.725c.186.023.398.033.633.033.44 0 .86-.064 1.284-.19.424-.13.8-.32 1.13-.57a2.79 2.79 0 0 0 .742-.95c.17-.34.277-.71.31-1.12.04-.41-.01-.82-.15-1.24-.14-.42-.39-.77-.74-1.05-.35-.27-.78-.47-1.28-.58-.48-.11-.98-.14-1.52-.08-.53.06-1.04.18-1.53.37-.49.2-.91.45-1.25.76-.34.32-.6.65-.8 1.01-.21.36-.35.74-.44 1.16-.13.54-.19 1.06-.19 1.58 0 .95.21 1.85.63 2.69.41.84.98 1.58 1.72 2.2-.17.26-.3.48-.42.69-.12.21-.23.39-.33.55-.1.16-.19.3-.27.41-.08.12-.17.24-.28.38-.14.19-.28.37-.42.52-.15.15-.3.31-.45.5-.26.31-.54.68-.82 1.1-.28.41-.55.87-.8 1.37h2.95c.37-.8.8-1.49 1.27-2.06.47-.58.89-1.05 1.26-1.43l.5-.53c.17-.19.33-.38.49-.59.15-.21.3-.43.42-.66.13-.24.23-.49.3-.75.07-.26.1-.55.1-.85ZM21 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.143l.75-3.725c.19.023.4.033.63.033.44 0 .87-.064 1.29-.19.42-.13.8-.32 1.13-.57a2.79 2.79 0 0 0 .75-.95c.17-.34.27-.71.31-1.12.04-.41-.01-.82-.15-1.24-.14-.42-.39-.77-.74-1.05-.35-.27-.78-.47-1.28-.58-.48-.11-.98-.14-1.52-.08-.53.06-1.04.18-1.53.37-.49.2-.91.45-1.25.76-.34.32-.6.65-.8 1.01-.21.36-.35.74-.44 1.16-.13.54-.19 1.06-.19 1.58 0 .95.21 1.85.63 2.69.41.84.98 1.58 1.72 2.2-.17.26-.3.48-.42.69-.12.21-.23.39-.33.55-.1.16-.19.3-.27.41-.08.12-.17.24-.28.38-.14.19-.28.37-.42.52-.15.15-.3.31-.45.5-.26.31-.54.68-.82 1.1-.28.41-.55.87-.8 1.37h2.95c.37-.8.8-1.49 1.27-2.06.47-.58.89-1.05 1.26-1.43l.5-.53c.17-.19.33-.38.49-.59a4.8 4.8 0 0 0 .42-.66c.13-.24.23-.49.3-.75.07-.26.1-.55.1-.85Z" />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-8 -right-8 text-secondary/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20"
            >
              <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.143l.75-3.725c.186.023.398.033.633.033.44 0 .86-.064 1.284-.19.424-.13.8-.32 1.13-.57a2.79 2.79 0 0 0 .742-.95c.17-.34.277-.71.31-1.12.04-.41-.01-.82-.15-1.24-.14-.42-.39-.77-.74-1.05-.35-.27-.78-.47-1.28-.58-.48-.11-.98-.14-1.52-.08-.53.06-1.04.18-1.53.37-.49.2-.91.45-1.25.76-.34.32-.6.65-.8 1.01-.21.36-.35.74-.44 1.16-.13.54-.19 1.06-.19 1.58 0 .95.21 1.85.63 2.69.41.84.98 1.58 1.72 2.2-.17.26-.3.48-.42.69-.12.21-.23.39-.33.55-.1.16-.19.3-.27.41-.08.12-.17.24-.28.38-.14.19-.28.37-.42.52-.15.15-.3.31-.45.5-.26.31-.54.68-.82 1.1-.28.41-.55.87-.8 1.37h2.95c.37-.8.8-1.49 1.27-2.06.47-.58.89-1.05 1.26-1.43l.5-.53c.17-.19.33-.38.49-.59.15-.21.3-.43.42-.66.13-.24.23-.49.3-.75.07-.26.1-.55.1-.85ZM21 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.143l.75-3.725c.19.023.4.033.63.033.44 0 .87-.064 1.29-.19.42-.13.8-.32 1.13-.57a2.79 2.79 0 0 0 .75-.95c.17-.34.27-.71.31-1.12.04-.41-.01-.82-.15-1.24-.14-.42-.39-.77-.74-1.05-.35-.27-.78-.47-1.28-.58-.48-.11-.98-.14-1.52-.08-.53.06-1.04.18-1.53.37-.49.2-.91.45-1.25.76-.34.32-.6.65-.8 1.01-.21.36-.35.74-.44 1.16-.13.54-.19 1.06-.19 1.58 0 .95.21 1.85.63 2.69.41.84.98 1.58 1.72 2.2-.17.26-.3.48-.42.69-.12.21-.23.39-.33.55-.1.16-.19.3-.27.41-.08.12-.17.24-.28.38-.14.19-.28.37-.42.52-.15.15-.3.31-.45.5-.26.31-.54.68-.82 1.1-.28.41-.55.87-.8 1.37h2.95c.37-.8.8-1.49 1.27-2.06.47-.58.89-1.05 1.26-1.43l.5-.53c.17-.19.33-.38.49-.59a4.8 4.8 0 0 0 .42-.66c.13-.24.23-.49.3-.75.07-.26.1-.55.1-.85Z" />
            </svg>
          </motion.div>
          
          {/* Testimonial carousel */}
          <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/10">
            <div className="relative">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  index === activeIndex && (
                    <motion.div
                      key={testimonial.id}
                      className="p-8 md:p-12"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar with glow effect */}
                        <div className="mb-6 md:mb-0 relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
                          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full relative z-10 flex items-center justify-center text-white text-2xl md:text-3xl font-bold border-4 border-white/20 shadow-xl">
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          {/* Testimonial content */}
                          <motion.p 
                            className="text-white text-lg md:text-xl mb-6 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            "{testimonial.content}"
                          </motion.p>
                          
                          {/* Author info */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                          >
                            <h4 className="text-xl md:text-2xl font-bold text-white">
                              {testimonial.name}
                            </h4>
                            <p className="text-white/70">
                              {testimonial.role}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              
              {/* Navigation arrows */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden md:block">
                <button 
                  onClick={() => changeSlide(-1)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-colors duration-300 border border-white/10"
                  aria-label="Previous testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:block">
                <button 
                  onClick={() => changeSlide(1)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-colors duration-300 border border-white/10"
                  aria-label="Next testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Indicator dots */}
            <div className="flex justify-center py-4 space-x-3 bg-white/5 border-t border-white/10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div 
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-secondary scale-125' 
                        : 'bg-white/30 group-hover:bg-white/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="#" 
            className="inline-block px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 border border-white/20 hover:shadow-lg hover:shadow-secondary/10 backdrop-blur-sm transform hover:-translate-y-1"
          >
            {home.testimonials.readAll}
          </a>
        </motion.div>
      </div>
    </section>
  );
} 