import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  CheckCircleIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  StarIcon
} from '@heroicons/react/24/solid';
import { locales } from '@/i18n/settings';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';

// This function is required for static exports with dynamic routes
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// Dashboard page dictionary
const dashboardDictionary = {
  en: {
    title: 'Dashboard',
    welcome: 'Welcome back',
    myCourses: 'My Courses',
    inProgress: 'In Progress',
    completed: 'Completed',
    certificates: 'Certificates',
    progress: 'Progress',
    continue: 'Continue',
    viewAll: 'View All',
    upcomingEvents: 'Upcoming Events',
    today: 'Today',
    tomorrow: 'Tomorrow',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    stats: 'Your Statistics',
    coursesCompleted: 'Courses Completed',
    hoursLearned: 'Hours Learned',
    certificatesEarned: 'Certificates Earned',
    points: 'XP Points',
    achievements: 'Achievements',
    recentActivity: 'Recent Activity',
    noActivity: 'No recent activity',
    viewCourse: 'View Course',
    continueWhere: 'Continue where you left off',
    recommended: 'Recommended for you',
    trending: 'Trending courses',
    quiz: 'Quiz',
    lesson: 'Lesson',
    lessons: 'Lessons',
    assignment: 'Assignment',
    liveSessions: 'Live Sessions',
    forum: 'Course Forum',
    instructor: 'Instructor',
    discussionReplies: 'New discussion replies',
    view: 'View',
    courseCertificates: 'Your Course Certificates',
    downloadCertificate: 'Download Certificate',
    shareCertificate: 'Share Certificate',
    completeProfile: 'Complete Your Profile',
    profileProgress: 'Profile Completion',
    profilePrompt: 'Complete your profile to improve your learning experience',
    complete: 'Complete',
  },
  fr: {
    title: 'Tableau de Bord',
    welcome: 'Bon retour',
    myCourses: 'Mes Cours',
    inProgress: 'En Cours',
    completed: 'Terminés',
    certificates: 'Certificats',
    progress: 'Progrès',
    continue: 'Continuer',
    viewAll: 'Voir Tout',
    upcomingEvents: 'Événements à Venir',
    today: 'Aujourd\'hui',
    tomorrow: 'Demain',
    notifications: 'Notifications',
    noNotifications: 'Aucune nouvelle notification',
    stats: 'Vos Statistiques',
    coursesCompleted: 'Cours Terminés',
    hoursLearned: 'Heures Apprises',
    certificatesEarned: 'Certificats Obtenus',
    points: 'Points XP',
    achievements: 'Réalisations',
    recentActivity: 'Activité Récente',
    noActivity: 'Aucune activité récente',
    viewCourse: 'Voir le Cours',
    continueWhere: 'Continuez là où vous vous êtes arrêté',
    recommended: 'Recommandé pour vous',
    trending: 'Cours tendance',
    quiz: 'Quiz',
    lesson: 'Leçon',
    lessons: 'Leçons',
    assignment: 'Devoir',
    liveSessions: 'Sessions En Direct',
    forum: 'Forum du Cours',
    instructor: 'Instructeur',
    discussionReplies: 'Nouvelles réponses aux discussions',
    view: 'Voir',
    courseCertificates: 'Vos Certificats de Cours',
    downloadCertificate: 'Télécharger le Certificat',
    shareCertificate: 'Partager le Certificat',
    completeProfile: 'Complétez Votre Profil',
    profileProgress: 'Complétion du Profil',
    profilePrompt: 'Complétez votre profil pour améliorer votre expérience d\'apprentissage',
    complete: 'Compléter',
  },
  ar: {
    title: 'لوحة التحكم',
    welcome: 'مرحبًا بعودتك',
    myCourses: 'دوراتي',
    inProgress: 'قيد التقدم',
    completed: 'مكتملة',
    certificates: 'الشهادات',
    progress: 'التقدم',
    continue: 'متابعة',
    viewAll: 'عرض الكل',
    upcomingEvents: 'الأحداث القادمة',
    today: 'اليوم',
    tomorrow: 'غدًا',
    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة',
    stats: 'إحصائياتك',
    coursesCompleted: 'الدورات المكتملة',
    hoursLearned: 'ساعات التعلم',
    certificatesEarned: 'الشهادات المكتسبة',
    points: 'نقاط الخبرة',
    achievements: 'الإنجازات',
    recentActivity: 'النشاط الأخير',
    noActivity: 'لا يوجد نشاط حديث',
    viewCourse: 'عرض الدورة',
    continueWhere: 'متابعة من حيث توقفت',
    recommended: 'موصى به لك',
    trending: 'الدورات الرائجة',
    quiz: 'اختبار',
    lesson: 'درس',
    lessons: 'دروس',
    assignment: 'واجب',
    liveSessions: 'جلسات مباشرة',
    forum: 'منتدى الدورة',
    instructor: 'المدرب',
    discussionReplies: 'ردود جديدة على المناقشات',
    view: 'عرض',
    courseCertificates: 'شهادات الدورات الخاصة بك',
    downloadCertificate: 'تنزيل الشهادة',
    shareCertificate: 'مشاركة الشهادة',
    completeProfile: 'أكمل ملفك الشخصي',
    profileProgress: 'اكتمال الملف الشخصي',
    profilePrompt: 'أكمل ملفك الشخصي لتحسين تجربة التعلم الخاصة بك',
    complete: 'إكمال',
  }
};

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: 'course1',
    title: {
      en: 'Web Development Fundamentals',
      fr: 'Fondamentaux du Développement Web',
      ar: 'أساسيات تطوير الويب'
    },
    progress: 65,
    thumbnail: '/images/courses/web-dev.jpg',
    lastLesson: {
      en: 'CSS Flexbox Layout',
      fr: 'Mise en page Flexbox CSS',
      ar: 'تخطيط فلكس بوكس CSS'
    },
    instructor: 'Ahmed Hassan',
    totalLessons: 48,
    completedLessons: 24
  },
  {
    id: 'course2',
    title: {
      en: 'Data Science Essentials',
      fr: 'Fondamentaux de la Science des Données',
      ar: 'أساسيات علوم البيانات'
    },
    progress: 30,
    thumbnail: '/images/courses/data-science.jpg',
    lastLesson: {
      en: 'Introduction to Pandas',
      fr: 'Introduction à Pandas',
      ar: 'مقدمة إلى باندا'
    },
    instructor: 'Sarah Johnson',
    totalLessons: 36,
    completedLessons: 12
  },
  {
    id: 'course3',
    title: {
      en: 'Mobile App Development with Flutter',
      fr: 'Développement d\'Applications Mobiles avec Flutter',
      ar: 'تطوير تطبيقات الجوال باستخدام Flutter'
    },
    progress: 15,
    thumbnail: '/images/courses/flutter.jpg',
    lastLesson: {
      en: 'Setting Up Your Development Environment',
      fr: 'Configuration de Votre Environnement de Développement',
      ar: 'إعداد بيئة التطوير الخاصة بك'
    },
    instructor: 'Mohammed Ali',
    totalLessons: 42,
    completedLessons: 7
  }
];

// Mock upcoming events
const upcomingEvents = [
  {
    id: 'event1',
    title: {
      en: 'Live Q&A Session: Web Development',
      fr: 'Session de Questions-Réponses en Direct: Développement Web',
      ar: 'جلسة أسئلة وأجوبة مباشرة: تطوير الويب'
    },
    date: '2023-11-15T18:00:00',
    type: 'liveSession',
    course: {
      en: 'Web Development Fundamentals',
      fr: 'Fondamentaux du Développement Web',
      ar: 'أساسيات تطوير الويب'
    },
    instructor: 'Ahmed Hassan'
  },
  {
    id: 'event2',
    title: {
      en: 'Assignment Deadline: Data Visualization Project',
      fr: 'Date Limite de Devoir: Projet de Visualisation de Données',
      ar: 'الموعد النهائي للواجب: مشروع تصور البيانات'
    },
    date: '2023-11-16T23:59:00',
    type: 'assignment',
    course: {
      en: 'Data Science Essentials',
      fr: 'Fondamentaux de la Science des Données',
      ar: 'أساسيات علوم البيانات'
    }
  },
  {
    id: 'event3',
    title: {
      en: 'Group Discussion: Mobile UI Best Practices',
      fr: 'Discussion de Groupe: Meilleures Pratiques UI Mobile',
      ar: 'مناقشة جماعية: أفضل ممارسات واجهة المستخدم للجوال'
    },
    date: '2023-11-17T16:30:00',
    type: 'forum',
    course: {
      en: 'Mobile App Development with Flutter',
      fr: 'Développement d\'Applications Mobiles avec Flutter',
      ar: 'تطوير تطبيقات الجوال باستخدام Flutter'
    }
  }
];

// Mock notifications
const notifications = [
  {
    id: 'notif1',
    title: {
      en: 'New reply to your discussion post',
      fr: 'Nouvelle réponse à votre publication de discussion',
      ar: 'رد جديد على منشور المناقشة الخاص بك'
    },
    time: '2 hours ago',
    read: false,
    course: {
      en: 'Web Development Fundamentals',
      fr: 'Fondamentaux du Développement Web',
      ar: 'أساسيات تطوير الويب'
    }
  },
  {
    id: 'notif2',
    title: {
      en: 'Your assignment has been graded',
      fr: 'Votre devoir a été noté',
      ar: 'تم تقييم واجبك'
    },
    time: '1 day ago',
    read: false,
    course: {
      en: 'Data Science Essentials',
      fr: 'Fondamentaux de la Science des Données',
      ar: 'أساسيات علوم البيانات'
    }
  },
  {
    id: 'notif3',
    title: {
      en: 'New course recommendation for you',
      fr: 'Nouvelle recommandation de cours pour vous',
      ar: 'توصية دورة جديدة لك'
    },
    time: '2 days ago',
    read: true
  }
];

// Mock user statistics
const userStats = {
  coursesCompleted: 3,
  hoursLearned: 45,
  certificatesEarned: 2,
  points: 1250
};

// Mock completed courses with certificates
const completedCourses = [
  {
    id: 'completed1',
    title: {
      en: 'JavaScript Fundamentals',
      fr: 'Fondamentaux de JavaScript',
      ar: 'أساسيات جافا سكريبت'
    },
    completionDate: '2023-09-15',
    thumbnail: '/images/courses/javascript.jpg',
    hasCertificate: true,
    instructor: 'Ahmed Hassan'
  },
  {
    id: 'completed2',
    title: {
      en: 'UI/UX Design Principles',
      fr: 'Principes de Design UI/UX',
      ar: 'مبادئ تصميم واجهة المستخدم/تجربة المستخدم'
    },
    completionDate: '2023-08-22',
    thumbnail: '/images/courses/ui-ux.jpg',
    hasCertificate: true,
    instructor: 'Emma Garcia'
  }
];

// Mock achievements data
const recentAchievements = [
  {
    id: 'achievement1',
    title: {
      en: 'Perfect Quiz',
      fr: 'Quiz Parfait',
      ar: 'اختبار مثالي'
    },
    icon: '/images/badges/perfect-quiz.png',
    unlockedAt: '2023-10-28'
  },
  {
    id: 'achievement2',
    title: {
      en: '7 Day Streak',
      fr: '7 Jours Consécutifs',
      ar: '7 أيام متتالية'
    },
    icon: '/images/badges/week-streak.png',
    unlockedAt: '2023-10-21'
  },
  {
    id: 'achievement3',
    title: {
      en: 'Social Learner',
      fr: 'Apprenant Social',
      ar: 'متعلم اجتماعي'
    },
    icon: '/images/badges/social-learner.png',
    unlockedAt: '2023-10-15'
  }
];

// Date formatting function for events
const formatEventDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const isToday = date.getDate() === now.getDate() && 
                 date.getMonth() === now.getMonth() && 
                 date.getFullYear() === now.getFullYear();
  
  const isTomorrow = date.getDate() === tomorrow.getDate() && 
                    date.getMonth() === tomorrow.getMonth() && 
                    date.getFullYear() === tomorrow.getFullYear();
  
  // Format time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const formattedTime = locale === 'en' 
    ? `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`
    : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  if (isToday) {
    return {
      date: locale === 'en' ? 'Today' : locale === 'fr' ? 'Aujourd\'hui' : 'اليوم',
      time: formattedTime
    };
  }
  
  if (isTomorrow) {
    return {
      date: locale === 'en' ? 'Tomorrow' : locale === 'fr' ? 'Demain' : 'غدًا',
      time: formattedTime
    };
  }
  
  // Format date
  const day = date.getDate();
  const month = locale === 'en' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]
    : locale === 'fr'
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'][date.getMonth()]
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'][date.getMonth()];
  
  return {
    date: locale === 'ar' ? `${day} ${month}` : `${month} ${day}`,
    time: formattedTime
  };
};

// Server component
export default async function DashboardPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  
  // Get dashboard dictionary
  const t = dashboardDictionary[locale as keyof typeof dashboardDictionary] || dashboardDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    avatar: '/images/users/default-avatar.jpg',
    profileCompletion: 75
  };
  
  return (
    <main className={`min-h-screen bg-neutral-50 pt-24 pb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-sm p-6 mb-8 text-white">
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white mr-4">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t.welcome}, {user.name}!</h1>
              <p className="text-white/80">
                {enrolledCourses.length} {enrolledCourses.length === 1 ? t.myCourses.toLowerCase() : t.myCourses.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{t.achievements}</h2>
                <Link href={`/${locale}/achievements`} className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
                  {t.viewAll}
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex flex-col items-center">
                    <div className="relative h-16 w-16 mb-1">
                      <Image
                        src={achievement.icon}
                        alt={achievement.title[locale as keyof typeof achievement.title] || ''}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-xs text-gray-600 text-center max-w-[80px]">
                      {achievement.title[locale as keyof typeof achievement.title]}
                    </p>
                  </div>
                ))}
                
                <Link
                  href={`/${locale}/achievements`}
                  className="flex flex-col items-center justify-center h-16 w-16 border-2 border-dashed border-gray-300 rounded-full text-gray-400 hover:text-primary hover:border-primary transition-colors"
                >
                  <PlusIcon className="h-6 w-6" />
                </Link>
              </div>
              
              <div className="flex items-center bg-primary/5 rounded-lg p-3 gap-3">
                <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">Level 8</span>
                    <span className="text-xs text-gray-500">4,250 / 5,000 XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary rounded-full h-1.5"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* In Progress Courses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{t.inProgress}</h2>
                <Link href={`/${locale}/my-learning`} className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
                  {t.viewAll}
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                      <div className="relative h-24 w-40 sm:h-20 sm:w-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <Image
                          src={course.thumbnail}
                          alt={course.title[locale as keyof typeof course.title] || ''}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {course.title[locale as keyof typeof course.title]}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {t.instructor}: {course.instructor}
                        </p>
                        <div className="mb-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{course.progress}% {t.completed.toLowerCase()}</span>
                            <span>{course.completedLessons}/{course.totalLessons} {t.lessons}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center">
                          <p className="text-sm text-gray-600 mb-2 sm:mb-0 sm:mr-4 truncate max-w-xs">
                            {t.continueWhere}: {course.lastLesson[locale as keyof typeof course.lastLesson]}
                          </p>
                          <Link
                            href={`/${locale}/courses/${course.id}`}
                            className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                          >
                            {t.continue}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.upcomingEvents}</h2>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="rounded-full bg-primary/10 p-2 mr-4">
                      {event.type === 'liveSession' && (
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      )}
                      {event.type === 'assignment' && (
                        <CheckCircleIcon className="h-5 w-5 text-primary" />
                      )}
                      {event.type === 'forum' && (
                        <ChatBubbleLeftIcon className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {event.title[locale as keyof typeof event.title]}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {event.course ? `${event.course[locale as keyof typeof event.course]} ${event.instructor ? `• ${event.instructor}` : ''}` : ''}
                      </p>
                      <div className="flex items-center mt-1 text-sm">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-primary-dark font-medium">
                          {formatEventDate(event.date, locale).date} {formatEventDate(event.date, locale).time}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="text-primary hover:text-primary-dark text-sm font-medium whitespace-nowrap"
                    >
                      {t.view}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certificates */}
            {completedCourses.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t.courseCertificates}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {completedCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden mr-3">
                          <Image
                            src={course.thumbnail}
                            alt={course.title[locale as keyof typeof course.title] || ''}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {course.title[locale as keyof typeof course.title]}
                          </h3>
                          <p className="text-xs text-gray-500">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <button className="text-primary hover:text-primary-dark font-medium">
                          {t.downloadCertificate}
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          {t.shareCertificate}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.stats}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
                    <AcademicCapIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xl font-bold text-gray-800">{userStats.coursesCompleted}</div>
                  <p className="text-xs text-gray-500">{t.coursesCompleted}</p>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
                    <ClockIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xl font-bold text-gray-800">{userStats.hoursLearned}</div>
                  <p className="text-xs text-gray-500">{t.hoursLearned}</p>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
                    <CheckCircleIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xl font-bold text-gray-800">{userStats.certificatesEarned}</div>
                  <p className="text-xs text-gray-500">{t.certificatesEarned}</p>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
                    <ChartBarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xl font-bold text-gray-800">{userStats.points}</div>
                  <p className="text-xs text-gray-500">{t.points}</p>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{t.notifications}</h2>
                <div className="rounded-full bg-primary/10 h-6 w-6 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={`flex items-start pb-3 ${!notification.read ? 'border-l-2 border-primary pl-3 -ml-3' : 'border-l-2 border-transparent pl-3 -ml-3'}`}>
                      <div className="mr-3">
                        <BellIcon className={`h-5 w-5 ${!notification.read ? 'text-primary' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`${!notification.read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                          {notification.title[locale as keyof typeof notification.title]}
                        </p>
                        {notification.course && (
                          <p className="text-xs text-gray-500">
                            {notification.course[locale as keyof typeof notification.course]}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">{t.noNotifications}</p>
                )}
              </div>
            </div>
            
            {/* Profile Completion */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.completeProfile}</h2>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.profileProgress}</span>
                  <span>{user.profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${user.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {t.profilePrompt}
              </p>
              
              <Link
                href={`/${locale}/profile`}
                className="block w-full text-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
              >
                {t.complete}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 