'use client';
// Blog Posts Component for the Blog page

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ClipboardDocumentCheckIcon 
} from '@heroicons/react/24/outline';
import type { Locale } from '@/i18n/settings';

interface BlogPostsProps {
  locale: Locale;
  dictionary: any;
}

// Sample blog posts data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: '1',
    title: 'How to Choose the Right Programming Language for Your Career',
    excerpt: 'Explore the factors to consider when selecting a programming language to learn for your career growth in the tech industry.',
    image: '/images/blog/blog-1.jpg',
    category: 'career',
    date: '2023-06-15',
    author: 'Sarah Mansour',
    readTime: 5
  },
  {
    id: '2',
    title: 'The Impact of AI on the Future of Professional Training',
    excerpt: 'An in-depth look at how artificial intelligence is reshaping education and professional training methodologies.',
    image: '/images/blog/blog-2.jpg',
    category: 'technology',
    date: '2023-05-28',
    author: 'Ahmed Khalid',
    readTime: 8
  },
  {
    id: '3',
    title: 'Essential Soft Skills for Every Tech Professional',
    excerpt: 'Beyond technical abilities: the crucial interpersonal skills that can accelerate your career in technology.',
    image: '/images/blog/blog-3.jpg',
    category: 'career',
    date: '2023-05-10',
    author: 'Leila Benmoussa',
    readTime: 6
  },
  {
    id: '4',
    title: 'Building a Portfolio That Gets You Hired',
    excerpt: 'Practical strategies for creating an impressive portfolio that showcases your skills to potential employers.',
    image: '/images/blog/blog-4.jpg',
    category: 'career',
    date: '2023-04-22',
    author: 'Karim Hassan',
    readTime: 7
  },
  {
    id: '5',
    title: 'The Rise of Remote Learning: Benefits and Challenges',
    excerpt: 'Examining how remote education has evolved and what it means for the future of professional development.',
    image: '/images/blog/blog-5.jpg',
    category: 'education',
    date: '2023-04-05',
    author: 'Sarah Mansour',
    readTime: 6
  },
  {
    id: '6',
    title: 'Cybersecurity Fundamentals Every Professional Should Know',
    excerpt: 'An introduction to essential cybersecurity concepts that all modern professionals should understand.',
    image: '/images/blog/blog-6.jpg',
    category: 'technology',
    date: '2023-03-18',
    author: 'Ahmed Khalid',
    readTime: 9
  }
];

export default function BlogPosts({ locale, dictionary }: BlogPostsProps) {
  // Add fallback for blog dictionary
  const blog = dictionary?.blog ? dictionary.blog : {
    readMore: 'Read More',
    minRead: 'min read',
    categories: 'Categories',
    search: 'Search articles',
    searchPlaceholder: 'Type to search...',
    allCategories: 'All Categories',
    categoryList: {
      career: 'Career Development',
      technology: 'Technology',
      education: 'Education',
    }
  };
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get unique categories from blog posts
  const categorySet = new Set(blogPosts.map(post => post.category));
  const categories = ['all', ...Array.from(categorySet)];
  
  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Format date based on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="relative">
      {/* Search and filter section */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={blog.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{blog.categories}</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? blog.allCategories : (blog.categoryList && blog.categoryList[category]) || category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog posts grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform group-hover:-translate-y-2">
                {/* Image or placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary-light/20 to-primary-dark/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-primary-dark/0 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs uppercase tracking-wider py-1 px-2 rounded-full">
                    {(blog.categoryList && blog.categoryList[post.category]) || post.category}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                    <div className="flex items-center">
                      <AcademicCapIcon className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">
                      {post.readTime} {blog.minRead}
                    </span>
                    
                    <Link 
                      href={`/${locale}/blog/${post.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-300"
                    >
                      {blog.readMore}
                      <ClipboardDocumentCheckIcon className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No blog posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
} 