'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PlayIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid';

// My Learning page dictionary
const myLearningDictionary = {
  en: {
    title: 'My Learning',
    subtitle: 'Access your purchased courses and track your progress',
    inProgress: 'In Progress',
    completed: 'Completed',
    archived: 'Archived',
    noCourses: 'You have no courses in this category',
    browseCoursesButton: 'Browse Courses',
    hours: 'hours',
    lessons: 'lessons',
    continueButton: 'Continue Learning',
    lastAccessed: 'Last accessed:',
    progress: 'Progress:',
    search: 'Search your courses',
    backButton: 'Back to Home',
    daysAgo: 'days ago',
    hoursAgo: 'hours ago',
    minutesAgo: 'minutes ago',
    justNow: 'just now'
  },
  fr: {
    title: 'Mes Apprentissages',
    subtitle: 'Accédez à vos cours achetés et suivez vos progrès',
    inProgress: 'En Cours',
    completed: 'Terminé',
    archived: 'Archivé',
    noCourses: 'Vous n\'avez pas de cours dans cette catégorie',
    browseCoursesButton: 'Parcourir les Cours',
    hours: 'heures',
    lessons: 'leçons',
    continueButton: 'Continuer l\'Apprentissage',
    lastAccessed: 'Dernier accès:',
    progress: 'Progrès:',
    search: 'Rechercher vos cours',
    backButton: 'Retour à l\'Accueil',
    daysAgo: 'jours',
    hoursAgo: 'heures',
    minutesAgo: 'minutes',
    justNow: 'à l\'instant'
  },
  ar: {
    title: 'تعلمي',
    subtitle: 'الوصول إلى الدورات التي اشتريتها وتتبع تقدمك',
    inProgress: 'قيد التقدم',
    completed: 'مكتمل',
    archived: 'مؤرشف',
    noCourses: 'ليس لديك دورات في هذه الفئة',
    browseCoursesButton: 'تصفح الدورات',
    hours: 'ساعات',
    lessons: 'دروس',
    continueButton: 'مواصلة التعلم',
    lastAccessed: 'آخر وصول:',
    progress: 'التقدم:',
    search: 'ابحث في دوراتك',
    backButton: 'العودة إلى الصفحة الرئيسية',
    daysAgo: 'أيام',
    hoursAgo: 'ساعات',
    minutesAgo: 'دقائق',
    justNow: 'الآن'
  }
};

// Mock enrolled courses for demo purposes
const enrolledCourses = [
  {
    id: 'course1',
    title: 'Web Development Fundamentals',
    description: 'Learn the core concepts of HTML, CSS, and JavaScript to build modern websites.',
    thumbnail: '/images/courses/web-dev.jpg',
    duration: 4.5,
    lessons: 42,
    progress: 65,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    category: 'webDevelopment',
    status: 'inProgress'
  },
  {
    id: 'course2',
    title: 'Advanced React.js',
    description: 'Master React.js hooks, context API, and build complex applications with Redux.',
    thumbnail: '/images/courses/react.jpg',
    duration: 7.5,
    lessons: 56,
    progress: 32,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    category: 'webDevelopment',
    status: 'inProgress'
  },
  {
    id: 'course5',
    title: 'Mobile App Development with Flutter',
    description: 'Build cross-platform mobile applications with Google\'s Flutter framework.',
    thumbnail: '/images/courses/flutter.jpg',
    duration: 8,
    lessons: 64,
    progress: 100,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    category: 'mobileDevelopment',
    status: 'completed'
  }
];

export default function MyLearningPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = myLearningDictionary[locale as keyof typeof myLearningDictionary] || myLearningDictionary.en;
  
  // State for tab selection
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed' | 'archived'>('inProgress');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter courses based on active tab and search query
  const filteredCourses = enrolledCourses
    .filter(course => course.status === activeTab)
    .filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Format time since last access
  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 86400; // days
    if (interval > 1) {
      return Math.floor(interval) + ' ' + dictionary.daysAgo;
    }
    
    interval = seconds / 3600; // hours
    if (interval > 1) {
      return Math.floor(interval) + ' ' + dictionary.hoursAgo;
    }
    
    interval = seconds / 60; // minutes
    if (interval > 1) {
      return Math.floor(interval) + ' ' + dictionary.minutesAgo;
    }
    
    return dictionary.justNow;
  };
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>{dictionary.backButton}</span>
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search bar */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={dictionary.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('inProgress')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'inProgress' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {dictionary.inProgress}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'completed' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {dictionary.completed}
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'archived' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {dictionary.archived}
            </button>
          </nav>
        </div>
        
        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:shadow-md">
                <div className="relative h-40 bg-gray-200">
                  {course.thumbnail && (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary">
                      <PlayIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center mr-4">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{course.duration} {dictionary.hours}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-1" />
                      <span>{course.lessons} {dictionary.lessons}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{dictionary.progress}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {dictionary.lastAccessed} {formatTimeSince(course.lastAccessed)}
                    </div>
                    <Link 
                      href={`/${locale}/courses/${course.id}`}
                      className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {dictionary.continueButton}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <AcademicCapIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">{dictionary.noCourses}</h3>
            <Link 
              href={`/${locale}/courses`}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
            >
              {dictionary.browseCoursesButton}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
} 