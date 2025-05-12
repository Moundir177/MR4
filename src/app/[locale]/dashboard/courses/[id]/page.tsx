'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ChevronDownIcon, 
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

// Course page dictionary
const coursePageDictionary = {
  en: {
    backToDashboard: 'Back to Dashboard',
    courseProgress: 'Course Progress',
    overview: 'Overview',
    modules: 'Modules',
    announcements: 'Announcements',
    discussion: 'Discussion',
    grades: 'Grades',
    resources: 'Resources',
    continueButton: 'Continue Learning',
    completeButton: 'Mark as Complete',
    startButton: 'Start Module',
    completed: 'Completed',
    inProgress: 'In Progress',
    locked: 'Locked',
    estimatedTime: 'Estimated Time',
    module: 'Module',
    certificate: 'Certificate',
    downloadCertificate: 'Download Certificate',
    videoLesson: 'Video Lesson',
    reading: 'Reading',
    quiz: 'Quiz',
    assignment: 'Assignment',
    minutes: 'minutes',
    hours: 'hours',
    lastUpdated: 'Last Updated',
    progressOverview: 'Progress Overview',
    modulesCompleted: 'Modules Completed',
    quizzesCompleted: 'Quizzes Completed',
    assignmentsCompleted: 'Assignments Completed',
    overallProgress: 'Overall Progress'
  },
  fr: {
    backToDashboard: 'Retour au Tableau de Bord',
    courseProgress: 'Progression du Cours',
    overview: 'Aperçu',
    modules: 'Modules',
    announcements: 'Annonces',
    discussion: 'Discussion',
    grades: 'Notes',
    resources: 'Ressources',
    continueButton: 'Continuer l\'Apprentissage',
    completeButton: 'Marquer comme Terminé',
    startButton: 'Commencer le Module',
    completed: 'Terminé',
    inProgress: 'En Cours',
    locked: 'Verrouillé',
    estimatedTime: 'Temps Estimé',
    module: 'Module',
    certificate: 'Certificat',
    downloadCertificate: 'Télécharger le Certificat',
    videoLesson: 'Leçon Vidéo',
    reading: 'Lecture',
    quiz: 'Quiz',
    assignment: 'Devoir',
    minutes: 'minutes',
    hours: 'heures',
    lastUpdated: 'Dernière Mise à Jour',
    progressOverview: 'Aperçu de la Progression',
    modulesCompleted: 'Modules Terminés',
    quizzesCompleted: 'Quiz Terminés',
    assignmentsCompleted: 'Devoirs Terminés',
    overallProgress: 'Progression Globale'
  },
  ar: {
    backToDashboard: 'العودة إلى لوحة التحكم',
    courseProgress: 'تقدم الدورة',
    overview: 'نظرة عامة',
    modules: 'الوحدات',
    announcements: 'الإعلانات',
    discussion: 'النقاش',
    grades: 'الدرجات',
    resources: 'الموارد',
    continueButton: 'متابعة التعلم',
    completeButton: 'وضع علامة مكتمل',
    startButton: 'بدء الوحدة',
    completed: 'مكتمل',
    inProgress: 'قيد التقدم',
    locked: 'مغلق',
    estimatedTime: 'الوقت المقدر',
    module: 'وحدة',
    certificate: 'شهادة',
    downloadCertificate: 'تحميل الشهادة',
    videoLesson: 'درس فيديو',
    reading: 'قراءة',
    quiz: 'اختبار',
    assignment: 'واجب',
    minutes: 'دقائق',
    hours: 'ساعات',
    lastUpdated: 'آخر تحديث',
    progressOverview: 'نظرة عامة على التقدم',
    modulesCompleted: 'الوحدات المكتملة',
    quizzesCompleted: 'الاختبارات المكتملة',
    assignmentsCompleted: 'الواجبات المكتملة',
    overallProgress: 'التقدم العام'
  }
};

// Sample course data - would come from API
const courseData = {
  id: 'web-development-101',
  title: 'Web Development Fundamentals',
  description: 'Master the basics of HTML, CSS, and JavaScript to build responsive websites.',
  image: '/images/courses/web-dev.jpg',
  instructor: 'John Doe',
  totalModules: 8,
  completedModules: 5,
  progress: 78,
  totalQuizzes: 8,
  completedQuizzes: 6,
  totalAssignments: 5,
  completedAssignments: 4,
  lastAccessed: '2023-07-12',
  modules: [
    {
      id: 1,
      title: 'Introduction to Web Development',
      status: 'completed',
      progress: 100,
      estimatedTime: 45,
      isExpanded: true,
      lessons: [
        {
          id: 101,
          title: 'What is Web Development?',
          type: 'reading',
          duration: 10,
          status: 'completed'
        },
        {
          id: 102,
          title: 'The Role of HTML, CSS, and JavaScript',
          type: 'video',
          duration: 15,
          status: 'completed'
        },
        {
          id: 103,
          title: 'Setting Up Your Development Environment',
          type: 'reading',
          duration: 10,
          status: 'completed'
        },
        {
          id: 104,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'completed'
        }
      ]
    },
    {
      id: 2,
      title: 'HTML Fundamentals',
      status: 'completed',
      progress: 100,
      estimatedTime: 60,
      isExpanded: false,
      lessons: [
        {
          id: 201,
          title: 'HTML Document Structure',
          type: 'reading',
          duration: 15,
          status: 'completed'
        },
        {
          id: 202,
          title: 'Working with Text and Lists',
          type: 'video',
          duration: 20,
          status: 'completed'
        },
        {
          id: 203,
          title: 'HTML Forms and Input Elements',
          type: 'video',
          duration: 15,
          status: 'completed'
        },
        {
          id: 204,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'completed'
        }
      ]
    },
    {
      id: 3,
      title: 'CSS Basics',
      status: 'completed',
      progress: 100,
      estimatedTime: 75,
      isExpanded: false,
      lessons: [
        {
          id: 301,
          title: 'CSS Selectors and Properties',
          type: 'reading',
          duration: 15,
          status: 'completed'
        },
        {
          id: 302,
          title: 'The Box Model',
          type: 'video',
          duration: 20,
          status: 'completed'
        },
        {
          id: 303,
          title: 'Colors and Typography',
          type: 'reading',
          duration: 15,
          status: 'completed'
        },
        {
          id: 304,
          title: 'CSS Layout Basics',
          type: 'video',
          duration: 15,
          status: 'completed'
        },
        {
          id: 305,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'completed'
        }
      ]
    },
    {
      id: 4,
      title: 'JavaScript Fundamentals',
      status: 'completed',
      progress: 100,
      estimatedTime: 90,
      isExpanded: false,
      lessons: [
        {
          id: 401,
          title: 'Introduction to JavaScript',
          type: 'reading',
          duration: 15,
          status: 'completed'
        },
        {
          id: 402,
          title: 'Variables and Data Types',
          type: 'video',
          duration: 20,
          status: 'completed'
        },
        {
          id: 403,
          title: 'Control Flow: Conditionals and Loops',
          type: 'video',
          duration: 25,
          status: 'completed'
        },
        {
          id: 404,
          title: 'Functions and Scope',
          type: 'reading',
          duration: 20,
          status: 'completed'
        },
        {
          id: 405,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'completed'
        }
      ]
    },
    {
      id: 5,
      title: 'DOM Manipulation',
      status: 'completed',
      progress: 100,
      estimatedTime: 80,
      isExpanded: false,
      lessons: [
        {
          id: 501,
          title: 'The Document Object Model',
          type: 'reading',
          duration: 15,
          status: 'completed'
        },
        {
          id: 502,
          title: 'Selecting and Modifying Elements',
          type: 'video',
          duration: 20,
          status: 'completed'
        },
        {
          id: 503,
          title: 'Event Handling',
          type: 'video',
          duration: 25,
          status: 'completed'
        },
        {
          id: 504,
          title: 'DOM Traversal and Manipulation',
          type: 'reading',
          duration: 10,
          status: 'completed'
        },
        {
          id: 505,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'completed'
        }
      ]
    },
    {
      id: 6,
      title: 'Responsive Web Design',
      status: 'inProgress',
      progress: 60,
      estimatedTime: 85,
      isExpanded: false,
      lessons: [
        {
          id: 601,
          title: 'Introduction to Responsive Design',
          type: 'reading',
          duration: 15,
          status: 'completed'
        },
        {
          id: 602,
          title: 'Media Queries',
          type: 'video',
          duration: 20,
          status: 'completed'
        },
        {
          id: 603,
          title: 'Flexible Layouts',
          type: 'video',
          duration: 20,
          status: 'completed'
        },
        {
          id: 604,
          title: 'CSS Grid and Flexbox',
          type: 'reading',
          duration: 20,
          status: 'inProgress'
        },
        {
          id: 605,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'notStarted'
        }
      ]
    },
    {
      id: 7,
      title: 'CSS Frameworks',
      status: 'locked',
      progress: 0,
      estimatedTime: 70,
      isExpanded: false,
      lessons: [
        {
          id: 701,
          title: 'Introduction to CSS Frameworks',
          type: 'reading',
          duration: 10,
          status: 'locked'
        },
        {
          id: 702,
          title: 'Getting Started with Bootstrap',
          type: 'video',
          duration: 20,
          status: 'locked'
        },
        {
          id: 703,
          title: 'Responsive Components',
          type: 'video',
          duration: 20,
          status: 'locked'
        },
        {
          id: 704,
          title: 'Customizing Bootstrap',
          type: 'reading',
          duration: 10,
          status: 'locked'
        },
        {
          id: 705,
          title: 'Module Quiz',
          type: 'quiz',
          duration: 10,
          status: 'locked'
        }
      ]
    },
    {
      id: 8,
      title: 'Final Project',
      status: 'locked',
      progress: 0,
      estimatedTime: 120,
      isExpanded: false,
      lessons: [
        {
          id: 801,
          title: 'Project Requirements',
          type: 'reading',
          duration: 15,
          status: 'locked'
        },
        {
          id: 802,
          title: 'Planning Your Project',
          type: 'video',
          duration: 20,
          status: 'locked'
        },
        {
          id: 803,
          title: 'Project Workshop',
          type: 'video',
          duration: 25,
          status: 'locked'
        },
        {
          id: 804,
          title: 'Final Project Submission',
          type: 'assignment',
          duration: 60,
          status: 'locked'
        }
      ]
    }
  ]
};

export default function CoursePage() {
  // Get locale from pathname since useParams() doesn't work in client components
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const locale = pathParts[1] || 'en';
  const courseId = pathParts[pathParts.length - 1];
  
  const dictionary = coursePageDictionary[locale as keyof typeof coursePageDictionary] || coursePageDictionary.en;
  
  // State for managing expanded modules
  const [modules, setModules] = useState(courseData.modules);
  
  // Function to toggle module expansion
  const toggleModule = (moduleId: number) => {
    setModules(
      modules.map(module => 
        module.id === moduleId 
          ? { ...module, isExpanded: !module.isExpanded } 
          : module
      )
    );
  };

  // Tabs
  const [activeTab, setActiveTab] = useState('modules');
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href={`/${locale}/dashboard`}
            className="inline-flex items-center text-primary hover:text-primary-dark"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            {dictionary.backToDashboard}
          </Link>
        </div>
        
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-48 h-32 bg-gray-200 rounded-lg relative overflow-hidden">
              {/* Course image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpenIcon className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">{courseData.title}</h1>
              <p className="text-gray-600 mb-4">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center">
                  <AcademicCapIcon className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-600 text-sm">{courseData.instructor}</span>
                </div>
                
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-600 text-sm">
                    {dictionary.lastUpdated}: {courseData.lastAccessed}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="md:self-center">
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <span className="text-2xl font-bold text-primary">{courseData.progress}%</span>
                  <p className="text-sm text-gray-600">{dictionary.courseProgress}</p>
                </div>
                
                <Link
                  href={`/${locale}/dashboard/courses/${courseId}/learn/${courseData.modules.find(m => m.status === 'inProgress')?.id || courseData.modules[0].id}`}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.continueButton}
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'overview' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.overview}
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'modules' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.modules}
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'discussion' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.discussion}
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'resources' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.resources}
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{dictionary.progressOverview}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{dictionary.modulesCompleted}</p>
                        <p className="text-lg font-semibold">
                          {courseData.completedModules}/{courseData.totalModules}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                        <BookOpenIcon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{dictionary.quizzesCompleted}</p>
                        <p className="text-lg font-semibold">
                          {courseData.completedQuizzes}/{courseData.totalQuizzes}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                        <DocumentTextIcon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{dictionary.assignmentsCompleted}</p>
                        <p className="text-lg font-semibold">
                          {courseData.completedAssignments}/{courseData.totalAssignments}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                        <DocumentTextIcon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{dictionary.overallProgress}</p>
                        <p className="text-lg font-semibold">
                          {courseData.progress}%
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                        <ChartBarIcon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{dictionary.courseProgress}</span>
                    <span className="font-medium">{courseData.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary rounded-full h-2.5"
                      style={{ width: `${courseData.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'modules' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {modules.map(module => (
                    <div key={module.id} className="overflow-hidden">
                      <div 
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          module.status === 'locked' ? 'opacity-60' : ''
                        }`}
                        onClick={() => module.status !== 'locked' && toggleModule(module.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {module.status === 'completed' ? (
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                              </div>
                            ) : module.status === 'inProgress' ? (
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            )}
                            
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {dictionary.module} {module.id}: {module.title}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                {module.estimatedTime} {module.estimatedTime >= 60 
                                  ? `${Math.floor(module.estimatedTime / 60)} ${dictionary.hours} ${module.estimatedTime % 60} ${dictionary.minutes}` 
                                  : `${module.estimatedTime} ${dictionary.minutes}`}
                                
                                {module.status !== 'locked' && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>
                                      {module.status === 'completed' 
                                        ? dictionary.completed 
                                        : module.status === 'inProgress' 
                                          ? `${module.progress}% ${dictionary.completed}`
                                          : dictionary.locked}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {module.status !== 'locked' && (
                            <div className="flex items-center">
                              {module.isExpanded ? (
                                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Module Lessons */}
                      {module.isExpanded && (
                        <div className="px-4 pb-4">
                          <div className="pl-9 border-l-2 border-gray-200 space-y-4">
                            {module.lessons.map(lesson => (
                              <div 
                                key={lesson.id}
                                className={`flex gap-3 items-start p-2 rounded-lg ${
                                  lesson.status === 'completed' 
                                    ? 'bg-green-50' 
                                    : lesson.status === 'inProgress'
                                      ? 'bg-blue-50'
                                      : lesson.status === 'locked'
                                        ? 'opacity-50'
                                        : ''
                                }`}
                              >
                                {/* Lesson Type Icon */}
                                {lesson.type === 'video' ? (
                                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                    <PlayIcon className="w-4 h-4 text-primary" />
                                  </div>
                                ) : lesson.type === 'reading' ? (
                                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                    <DocumentTextIcon className="w-4 h-4 text-primary" />
                                  </div>
                                ) : lesson.type === 'quiz' ? (
                                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                    <DocumentTextIcon className="w-4 h-4 text-primary" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                    <DocumentTextIcon className="w-4 h-4 text-primary" />
                                  </div>
                                )}
                                
                                <div className="flex-grow">
                                  <div className="flex justify-between">
                                    <div>
                                      <p className="font-medium text-gray-800">{lesson.title}</p>
                                      <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span className="capitalize">
                                          {lesson.type === 'video'
                                            ? dictionary.videoLesson
                                            : lesson.type === 'reading'
                                              ? dictionary.reading
                                              : lesson.type === 'quiz'
                                                ? dictionary.quiz
                                                : dictionary.assignment}
                                        </span>
                                        <span className="mx-1">•</span>
                                        <ClockIcon className="w-3 h-3 mr-1" />
                                        <span>{lesson.duration} {dictionary.minutes}</span>
                                      </div>
                                    </div>
                                    
                                    {lesson.status === 'completed' && (
                                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'discussion' && (
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-64">
                <div className="text-center">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-500">Discussion forum will be available soon</h3>
                </div>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-64">
                <div className="text-center">
                  <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-500">Resources will be available soon</h3>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{dictionary.courseProgress}</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{dictionary.overallProgress}</span>
                  <span className="font-medium">{courseData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary rounded-full h-2.5"
                    style={{ width: `${courseData.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dictionary.modulesCompleted}</span>
                  <span className="font-medium text-sm">
                    {courseData.completedModules}/{courseData.totalModules}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dictionary.quizzesCompleted}</span>
                  <span className="font-medium text-sm">
                    {courseData.completedQuizzes}/{courseData.totalQuizzes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dictionary.assignmentsCompleted}</span>
                  <span className="font-medium text-sm">
                    {courseData.completedAssignments}/{courseData.totalAssignments}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  href={`/${locale}/dashboard/courses/${courseId}/learn/${courseData.modules.find(m => m.status === 'inProgress')?.id || courseData.modules[0].id}`}
                  className="w-full block text-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.continueButton}
                </Link>
              </div>
            </div>
            
            {/* Certificate Card (if progress is 100%) */}
            {courseData.progress === 100 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{dictionary.certificate}</h3>
                
                <div className="relative aspect-[4/3] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <AcademicCapIcon className="w-16 h-16 text-gray-300" />
                </div>
                
                <button className="w-full text-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors">
                  {dictionary.downloadCertificate}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 