'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Achievements from '@/components/Achievements';
import { 
  TrophyIcon,
  StarIcon,
  FireIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid';

// Page dictionary
const pageDictionary = {
  en: {
    title: 'Achievements & Badges',
    subtitle: 'Track your learning progress and earn badges as you complete courses, quizzes, and more.',
    recentAchievements: 'Recently Earned',
  },
  fr: {
    title: 'Réalisations & Badges',
    subtitle: 'Suivez votre progression d\'apprentissage et gagnez des badges en terminant des cours, des quiz et plus encore.',
    recentAchievements: 'Récemment Obtenus',
  },
  ar: {
    title: 'الإنجازات والشارات',
    subtitle: 'تتبع تقدمك في التعلم واكسب شارات أثناء إكمال الدورات والاختبارات والمزيد.',
    recentAchievements: 'حصلت عليها مؤخرًا',
  }
};

// Mock user achievements data
const mockUserData = {
  level: 8,
  xpPoints: 4250,
  nextLevelPoints: 5000,
  streakDays: 14,
  coursesCompleted: 7,
  quizzesCompleted: 23,
  hoursLearned: 56,
  badges: [
    {
      id: 'badge1',
      title: {
        en: 'First Course',
        fr: 'Premier Cours',
        ar: 'الدورة الأولى'
      },
      description: {
        en: 'Complete your first course',
        fr: 'Compléter votre premier cours',
        ar: 'أكمل دورتك الأولى'
      },
      icon: <AcademicCapIcon className="h-6 w-6 text-green-500" />,
      status: 'unlocked' as const,
      unlockedAt: '2023-09-12',
      category: 'course' as const,
      image: '/images/badges/first-course.png'
    },
    {
      id: 'badge2',
      title: {
        en: 'Perfect Quiz',
        fr: 'Quiz Parfait',
        ar: 'اختبار مثالي'
      },
      description: {
        en: 'Score 100% on a quiz',
        fr: 'Obtenir 100% à un quiz',
        ar: 'احصل على 100٪ في اختبار'
      },
      icon: <StarIcon className="h-6 w-6 text-yellow-500" />,
      status: 'unlocked' as const,
      unlockedAt: '2023-09-28',
      category: 'quiz' as const,
      image: '/images/badges/perfect-quiz.png'
    },
    {
      id: 'badge3',
      title: {
        en: '7 Day Streak',
        fr: '7 Jours Consécutifs',
        ar: '7 أيام متتالية'
      },
      description: {
        en: 'Learn for 7 consecutive days',
        fr: 'Apprendre pendant 7 jours consécutifs',
        ar: 'تعلم لمدة 7 أيام متتالية'
      },
      icon: <FireIcon className="h-6 w-6 text-orange-500" />,
      status: 'unlocked' as const,
      unlockedAt: '2023-10-05',
      category: 'streak' as const,
      image: '/images/badges/week-streak.png'
    },
    {
      id: 'badge4',
      title: {
        en: 'Social Learner',
        fr: 'Apprenant Social',
        ar: 'متعلم اجتماعي'
      },
      description: {
        en: 'Participate in 10 discussion threads',
        fr: 'Participer à 10 discussions',
        ar: 'شارك في 10 مناقشات'
      },
      icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
      status: 'unlocked' as const,
      unlockedAt: '2023-10-22',
      category: 'social' as const,
      image: '/images/badges/social-learner.png'
    },
    {
      id: 'badge5',
      title: {
        en: '30 Day Streak',
        fr: '30 Jours Consécutifs',
        ar: '30 يوم متتالي'
      },
      description: {
        en: 'Learn for 30 consecutive days',
        fr: 'Apprendre pendant 30 jours consécutifs',
        ar: 'تعلم لمدة 30 يومًا متتاليًا'
      },
      icon: <FireIcon className="h-6 w-6 text-red-500" />,
      status: 'locked' as const,
      progress: 14,
      maxProgress: 30,
      category: 'streak' as const
    },
    {
      id: 'badge6',
      title: {
        en: 'Explorer',
        fr: 'Explorateur',
        ar: 'مستكشف'
      },
      description: {
        en: 'Enroll in 5 different course categories',
        fr: 'S\'inscrire à 5 catégories de cours différentes',
        ar: 'سجل في 5 فئات دورة مختلفة'
      },
      icon: <LightBulbIcon className="h-6 w-6 text-indigo-500" />,
      status: 'locked' as const,
      progress: 3,
      maxProgress: 5,
      category: 'course' as const
    },
    {
      id: 'badge7',
      title: {
        en: 'Night Owl',
        fr: 'Oiseau de Nuit',
        ar: 'بومة الليل'
      },
      description: {
        en: 'Study after 10 PM for 5 days',
        fr: 'Étudier après 22h pendant 5 jours',
        ar: 'ادرس بعد الساعة 10 مساءً لمدة 5 أيام'
      },
      icon: <ClockIcon className="h-6 w-6 text-purple-500" />,
      status: 'locked' as const,
      progress: 2,
      maxProgress: 5,
      category: 'streak' as const
    },
    {
      id: 'badge8',
      title: {
        en: 'Helpful Peer',
        fr: 'Pair Utile',
        ar: 'زميل مفيد'
      },
      description: {
        en: 'Get 5 "helpful" votes on your comments',
        fr: 'Obtenir 5 votes "utile" sur vos commentaires',
        ar: 'احصل على 5 أصوات "مفيدة" على تعليقاتك'
      },
      icon: <CheckBadgeIcon className="h-6 w-6 text-teal-500" />,
      status: 'locked' as const,
      progress: 0,
      maxProgress: 5,
      category: 'social' as const
    }
  ]
};

export default function AchievementsPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = pageDictionary[locale as keyof typeof pageDictionary] || pageDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  return (
    <main className={`min-h-screen bg-neutral-50 pt-24 pb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600">{dictionary.subtitle}</p>
        </div>
        
        {/* Achievements Component */}
        <div className="max-w-5xl mx-auto">
          <Achievements 
            badges={mockUserData.badges}
            level={mockUserData.level}
            xpPoints={mockUserData.xpPoints}
            nextLevelPoints={mockUserData.nextLevelPoints}
            streakDays={mockUserData.streakDays}
            coursesCompleted={mockUserData.coursesCompleted}
            quizzesCompleted={mockUserData.quizzesCompleted}
            hoursLearned={mockUserData.hoursLearned}
            locale={locale}
          />
        </div>
      </div>
    </main>
  );
} 