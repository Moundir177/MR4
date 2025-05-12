'use client';
// Courses List Component to display available courses

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/settings';

interface CoursesListProps {
  locale: Locale;
  dictionary: any;
}

type CourseCategory = 'all' | 'business' | 'development' | 'design' | 'marketing';

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  image: string;
  instructor: string;
  featured?: boolean;
};

export default function CoursesList({ locale, dictionary }: CoursesListProps) {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback for courses data
  const coursesData = {
    title: dictionary?.courses?.title || 'Our Courses',
    subtitle: dictionary?.courses?.subtitle || 'Expand your skills with our professional courses',
    categories: dictionary?.courses?.categories || {
      all: 'All Courses',
      business: 'Business',
      development: 'Development',
      design: 'Design',
      marketing: 'Marketing'
    },
    searchPlaceholder: dictionary?.courses?.searchPlaceholder || 'Search courses...',
    notFound: dictionary?.courses?.notFound || 'No courses found matching your criteria.',
    loadMore: dictionary?.courses?.loadMore || 'Load More',
    coursesList: dictionary?.courses?.list || [
      {
        id: 'web-development-101',
        title: 'Web Development Fundamentals',
        description: 'Master the basics of HTML, CSS, and JavaScript to build responsive websites.',
        category: 'development',
        level: 'Beginner',
        duration: '8 weeks',
        price: '$399',
        image: '/images/courses/web-dev.jpg',
        instructor: 'John Doe',
        featured: true
      },
      {
        id: 'digital-marketing-essentials',
        title: 'Digital Marketing Essentials',
        description: 'Learn the core strategies of effective digital marketing campaigns.',
        category: 'marketing',
        level: 'Intermediate',
        duration: '6 weeks',
        price: '$349',
        image: '/images/courses/digital-marketing.jpg',
        instructor: 'Sarah Johnson',
        featured: true
      },
      {
        id: 'ui-ux-design',
        title: 'UI/UX Design Principles',
        description: 'Create beautiful, user-friendly interfaces with modern design principles.',
        category: 'design',
        level: 'Intermediate',
        duration: '10 weeks',
        price: '$449',
        image: '/images/courses/ui-ux.jpg',
        instructor: 'Michael Chen',
        featured: true
      },
      {
        id: 'business-management',
        title: 'Business Management Skills',
        description: 'Develop essential skills for effective business management and leadership.',
        category: 'business',
        level: 'Advanced',
        duration: '12 weeks',
        price: '$549',
        image: '/images/courses/business.jpg',
        instructor: 'Lisa Rodriguez',
        featured: false
      },
      {
        id: 'react-advanced',
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, and state management.',
        category: 'development',
        level: 'Advanced',
        duration: '8 weeks',
        price: '$479',
        image: '/images/courses/react.jpg',
        instructor: 'David Wilson',
        featured: false
      },
      {
        id: 'graphic-design-basics',
        title: 'Graphic Design Fundamentals',
        description: 'Learn the core principles of effective graphic design for print and digital media.',
        category: 'design',
        level: 'Beginner',
        duration: '6 weeks',
        price: '$329',
        image: '/images/courses/graphic-design.jpg',
        instructor: 'Emma Taylor',
        featured: false
      }
    ]
  };

  // Filter courses based on active category and search term
  const filteredCourses = coursesData.coursesList.filter((course: Course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 z-0" />
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
              {coursesData.title}
            </h2>
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {coursesData.subtitle}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/3">
              <input
                type="text"
                placeholder={coursesData.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <div className="inline-flex flex-wrap gap-2 justify-center">
                {Object.entries(coursesData.categories).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key as CourseCategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === key
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {value as string}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Cards */}
        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course, index: number) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/${locale}/courses/${course.id}`} className="block h-full">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full border border-gray-100 flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      {/* Use a placeholder image first, as we don't know if these images exist */}
                      <div className="absolute inset-0 bg-gray-200" />
                      {course.featured && (
                        <div className="absolute top-3 left-3 z-20 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
                        {course.level} · {course.duration}
                      </div>
                      <div className="absolute bottom-3 right-3 z-20 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        {course.price}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-2 flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          course.category === 'development' ? 'bg-blue-500' :
                          course.category === 'design' ? 'bg-purple-500' :
                          course.category === 'marketing' ? 'bg-green-500' :
                          'bg-orange-500'
                        }`}></span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                          {coursesData.categories[course.category as keyof typeof coursesData.categories]}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
                      
                      <div className="flex items-center mt-auto">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                          {course.instructor.split(' ').map(name => name[0]).join('')}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{course.instructor}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{coursesData.notFound}</p>
          </div>
        )}
        
        {/* Load More Button - In a real app, this would be connected to pagination logic */}
        {filteredCourses.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-all"
              onClick={() => {/* Would handle loading more courses */}}
            >
              {coursesData.loadMore}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
} 