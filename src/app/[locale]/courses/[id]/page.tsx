'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ClockIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  StarIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  ShoppingCartIcon,
  HeartIcon,
  BookmarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/solid';
import CourseDetailClient from './CourseDetailClient';

// Course detail page dictionary
const courseDetailDictionary = {
  en: {
    overview: 'Overview',
    curriculum: 'Curriculum',
    instructor: 'Instructor',
    reviews: 'Reviews',
    reviewsCount: 'Reviews',
    relatedCourses: 'Related Courses',
    enrollNow: 'Enroll Now',
    addToWishlist: 'Add to Wishlist',
    addToCart: 'Add to Cart',
    whatYouWillLearn: 'What you will learn',
    courseIncludes: 'This course includes',
    totalHours: 'Total Hours',
    totalLessons: 'Total Lessons',
    difficultyLevel: 'Difficulty Level',
    lastUpdated: 'Last Updated',
    students: 'students',
    totalStudents: 'Total Students',
    rating: 'Rating',
    preview: 'Preview',
    courseDescription: 'Course Description',
    requirements: 'Requirements',
    targetAudience: 'Target Audience',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    allLevels: 'All Levels',
    hours: 'hours',
    lessons: 'lessons',
    certificate: 'Certificate of completion',
    lifetime: 'Full lifetime access',
    resources: 'Downloadable resources',
    price: 'Price',
    free: 'Free',
  },
  fr: {
    overview: 'Aperçu',
    curriculum: 'Programme',
    instructor: 'Formateur',
    reviews: 'Avis',
    reviewsCount: 'Avis',
    relatedCourses: 'Cours Connexes',
    enrollNow: 'S\'inscrire Maintenant',
    addToWishlist: 'Ajouter aux Favoris',
    addToCart: 'Ajouter au Panier',
    whatYouWillLearn: 'Ce que vous apprendrez',
    courseIncludes: 'Ce cours comprend',
    totalHours: 'Heures Totales',
    totalLessons: 'Leçons Totales',
    difficultyLevel: 'Niveau de Difficulté',
    lastUpdated: 'Dernière Mise à Jour',
    students: 'étudiants',
    totalStudents: 'Nombre d\'Étudiants',
    rating: 'Évaluation',
    preview: 'Aperçu',
    courseDescription: 'Description du Cours',
    requirements: 'Prérequis',
    targetAudience: 'Public Cible',
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    allLevels: 'Tous Niveaux',
    hours: 'heures',
    lessons: 'leçons',
    certificate: 'Certificat d\'achèvement',
    lifetime: 'Accès à vie complet',
    resources: 'Ressources téléchargeables',
    price: 'Prix',
    free: 'Gratuit',
  },
  ar: {
    overview: 'نظرة عامة',
    curriculum: 'المنهج',
    instructor: 'المدرب',
    reviews: 'التقييمات',
    reviewsCount: 'التقييمات',
    relatedCourses: 'دورات ذات صلة',
    enrollNow: 'سجل الآن',
    addToWishlist: 'أضف إلى قائمة الرغبات',
    addToCart: 'أضف إلى السلة',
    whatYouWillLearn: 'ما ستتعلمه',
    courseIncludes: 'تشمل هذه الدورة',
    totalHours: 'إجمالي الساعات',
    totalLessons: 'إجمالي الدروس',
    difficultyLevel: 'مستوى الصعوبة',
    lastUpdated: 'آخر تحديث',
    students: 'طلاب',
    totalStudents: 'إجمالي الطلاب',
    rating: 'التقييم',
    preview: 'معاينة',
    courseDescription: 'وصف الدورة',
    requirements: 'المتطلبات',
    targetAudience: 'الجمهور المستهدف',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    allLevels: 'جميع المستويات',
    hours: 'ساعات',
    lessons: 'دروس',
    certificate: 'شهادة إتمام',
    lifetime: 'وصول كامل مدى الحياة',
    resources: 'موارد قابلة للتنزيل',
    price: 'السعر',
    free: 'مجاني',
  },
};

// Mock course data - this would normally come from an API
const coursesData = [
  {
    id: 'course1',
    title: {
      en: 'Web Development Fundamentals',
      fr: 'Fondamentaux du Développement Web',
      ar: 'أساسيات تطوير الويب'
    },
    description: {
      en: 'Learn the core concepts of HTML, CSS, and JavaScript to build modern websites. This comprehensive course takes you from the basics to more advanced techniques in web development.',
      fr: 'Apprenez les concepts fondamentaux de HTML, CSS et JavaScript pour créer des sites web modernes. Ce cours complet vous guide des bases aux techniques avancées du développement web.',
      ar: 'تعلم المفاهيم الأساسية لـ HTML و CSS و JavaScript لبناء مواقع ويب حديثة. تأخذك هذه الدورة الشاملة من الأساسيات إلى التقنيات المتقدمة في تطوير الويب.'
    },
    fullDescription: {
      en: 'This course is designed to take you from zero to hero in web development. Starting with the fundamentals of HTML structure, you\'ll progress to styling with CSS and adding interactivity with JavaScript. By the end of this course, you\'ll be able to build responsive websites that work across multiple devices and screen sizes.\n\nYou\'ll learn about modern web development practices, including CSS frameworks, JavaScript libraries, and responsive design principles. Through hands-on projects, you\'ll apply what you learn to create real-world websites.',
      fr: 'Ce cours est conçu pour vous faire passer de débutant à expert en développement web. En commençant par les fondamentaux de la structure HTML, vous progresserez vers le style avec CSS et l\'ajout d\'interactivité avec JavaScript. À la fin de ce cours, vous serez capable de créer des sites web responsives qui fonctionnent sur plusieurs appareils et tailles d\'écran.\n\nVous apprendrez les pratiques modernes de développement web, y compris les frameworks CSS, les bibliothèques JavaScript et les principes de conception responsive. À travers des projets pratiques, vous appliquerez ce que vous apprenez pour créer des sites web réels.',
      ar: 'تم تصميم هذه الدورة لنقلك من الصفر إلى الاحتراف في تطوير الويب. بدءًا من أساسيات بنية HTML، ستتقدم إلى التصميم باستخدام CSS وإضافة التفاعلية باستخدام JavaScript. بحلول نهاية هذه الدورة، ستكون قادرًا على بناء مواقع ويب متجاوبة تعمل عبر أجهزة وأحجام شاشات متعددة.\n\nستتعلم ممارسات تطوير الويب الحديثة، بما في ذلك أطر عمل CSS ومكتبات JavaScript ومبادئ التصميم المتجاوب. من خلال المشاريع العملية، ستطبق ما تتعلمه لإنشاء مواقع ويب واقعية.'
    },
    thumbnail: '/images/courses/web-dev.jpg',
    instructor: {
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg',
      bio: {
        en: 'Senior web developer with over 10 years of experience in building modern web applications. Ahmed has worked with major tech companies and has helped hundreds of students master web development.',
        fr: 'Développeur web senior avec plus de 10 ans d\'expérience dans la création d\'applications web modernes. Ahmed a travaillé avec des grandes entreprises technologiques et a aidé des centaines d\'étudiants à maîtriser le développement web.',
        ar: 'مطور ويب متمرس بخبرة تزيد عن 10 سنوات في بناء تطبيقات الويب الحديثة. عمل أحمد مع كبرى شركات التكنولوجيا وساعد مئات الطلاب على إتقان تطوير الويب.'
      }
    },
    rating: 4.8,
    reviews: 342,
    students: 1245,
    level: 'beginner',
    duration: 12.5,
    lessons: 48,
    price: 49.99,
    category: 'web-development',
    featured: true,
    lastUpdated: '2023-10-15',
    learningOutcomes: [
      {
        en: 'Build responsive websites using HTML5, CSS3, and JavaScript',
        fr: 'Créer des sites web responsives avec HTML5, CSS3 et JavaScript',
        ar: 'إنشاء مواقع ويب متجاوبة باستخدام HTML5 و CSS3 و JavaScript'
      },
      {
        en: 'Understand core web development principles and best practices',
        fr: 'Comprendre les principes fondamentaux du développement web et les meilleures pratiques',
        ar: 'فهم مبادئ تطوير الويب الأساسية وأفضل الممارسات'
      },
      {
        en: 'Work with popular frameworks like Bootstrap and jQuery',
        fr: 'Travailler avec des frameworks populaires comme Bootstrap et jQuery',
        ar: 'العمل مع أطر العمل الشائعة مثل Bootstrap و jQuery'
      },
      {
        en: 'Deploy websites to hosting platforms',
        fr: 'Déployer des sites web sur des plateformes d\'hébergement',
        ar: 'نشر مواقع الويب على منصات الاستضافة'
      }
    ],
    requirements: [
      {
        en: 'Basic computer skills',
        fr: 'Compétences informatiques de base',
        ar: 'مهارات كمبيوتر أساسية'
      },
      {
        en: 'No prior coding experience required',
        fr: 'Aucune expérience de codage préalable requise',
        ar: 'لا تتطلب خبرة مسبقة في البرمجة'
      }
    ],
    curriculum: [
      {
        title: {
          en: 'Getting Started with HTML',
          fr: 'Commencer avec HTML',
          ar: 'البدء مع HTML'
        },
        lessons: 12,
        duration: 3.5
      },
      {
        title: {
          en: 'CSS Styling Fundamentals',
          fr: 'Fondamentaux du style CSS',
          ar: 'أساسيات التصميم CSS'
        },
        lessons: 14,
        duration: 4
      },
      {
        title: {
          en: 'JavaScript Basics',
          fr: 'Bases de JavaScript',
          ar: 'أساسيات JavaScript'
        },
        lessons: 10,
        duration: 3
      },
      {
        title: {
          en: 'Responsive Web Design',
          fr: 'Conception Web Responsive',
          ar: 'تصميم الويب المتجاوب'
        },
        lessons: 8,
        duration: 2
      }
    ]
  },
  // Additional courses would be here
];

// Helper functions
const getLevelText = (level: string, dictionary: any) => {
  const levelMap: {[key: string]: string} = {
    'beginner': 'beginner',
    'intermediate': 'intermediate',
    'advanced': 'advanced',
    'all': 'allLevels'
  };
  return dictionary[levelMap[level] || 'allLevels'];
};

// Client-side date formatting function to prevent hydration mismatch
const formatDate = (dateString: string, locale: string) => {
  // Use a consistent date format that will be the same on server and client
  const date = new Date(dateString);
  
  // Simple manual formatting to avoid Intl API which can differ between server/client
  const months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  };
  
  const month = months[locale as keyof typeof months]?.[date.getMonth()] || months.en[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  if (locale === 'ar') {
    return `${day} ${month} ${year}`;
  }
  
  return `${month} ${day}, ${year}`;
};

export default function CourseDetailPage({ params }: { params: { id: string, locale: string } }) {
  const id = params.id;
  const locale = params.locale || 'en';
  
  // Find the course in our mock data
  const course = coursesData.find(c => c.id === id);
  const dictionary = courseDetailDictionary[locale as keyof typeof courseDetailDictionary];
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link href={`/${locale}/courses`} className="text-primary hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CourseDetailClient 
      course={course} 
      locale={locale} 
      dictionary={dictionary}
      getLevelText={getLevelText}
      formatDate={formatDate}
    />
  );
} 