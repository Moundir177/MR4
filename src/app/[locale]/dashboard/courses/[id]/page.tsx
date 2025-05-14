import React from 'react';
import { locales } from '@/i18n/settings';
import DashboardCourseClient from './DashboardCourseClient';

// This function is required for static exports with dynamic routes
export function generateStaticParams() {
  // Define the course IDs - in a real app, this would come from your CMS or API
  const courseIds = ['web-development-101', 'course1', 'course2', 'course3', 'course4'];
  
  // Generate all combinations of locales and course IDs
  return locales.flatMap(locale => 
    courseIds.map(id => ({
      locale,
      id
    }))
  );
}

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

export default function CoursePage({ params }: { params: { locale: string, id: string } }) {
  const locale = params.locale || 'en';
  const courseId = params.id;
  
  const dictionary = coursePageDictionary[locale as keyof typeof coursePageDictionary] || coursePageDictionary.en;
  
  return (
    <DashboardCourseClient 
      locale={locale}
      courseId={courseId}
      dictionary={dictionary}
      courseData={courseData}
    />
  );
} 