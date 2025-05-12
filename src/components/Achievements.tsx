'use client';

import React from 'react';
import Image from 'next/image';
import { 
  TrophyIcon, 
  StarIcon, 
  FireIcon, 
  AcademicCapIcon,
  ClockIcon,
  BookOpenIcon,
  CheckBadgeIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

// Achievements dictionary
const achievementsDictionary = {
  en: {
    title: 'Your Achievements',
    progress: 'Progress',
    level: 'Level',
    points: 'XP Points',
    badges: 'Badges',
    achievements: 'Achievements',
    badgesEarned: 'Badges Earned',
    badgesToEarn: 'Badges to Earn',
    streakDays: 'Day Streak',
    coursesCompleted: 'Courses Completed',
    quizzesCompleted: 'Quizzes Completed',
    hoursLearned: 'Hours Learned',
    firstCourse: 'First Course',
    firstCourseDesc: 'Complete your first course',
    perfectQuiz: 'Perfect Quiz',
    perfectQuizDesc: 'Score 100% on a quiz',
    weekStreak: '7 Day Streak',
    weekStreakDesc: 'Learn for 7 consecutive days',
    monthStreak: '30 Day Streak',
    monthStreakDesc: 'Learn for 30 consecutive days',
    explorer: 'Explorer',
    explorerDesc: 'Enroll in 5 different course categories',
    nightOwl: 'Night Owl',
    nightOwlDesc: 'Study after 10 PM for 5 days',
    earlyBird: 'Early Bird',
    earlyBirdDesc: 'Study before 8 AM for 5 days',
    socialLearner: 'Social Learner',
    socialLearnerDesc: 'Participate in 10 discussion threads',
    helpfulPeer: 'Helpful Peer',
    helpfulPeerDesc: 'Get 5 "helpful" votes on your comments',
    masteryPath: 'Mastery Path',
    viewAll: 'View All',
    unlocked: 'Unlocked',
    locked: 'Locked',
    keepGoing: 'Keep going to unlock more achievements!',
    shareBadge: 'Share Badge',
    currentProgress: 'Current Progress',
    nextMilestone: 'Next Milestone',
    to: 'to',
  },
  fr: {
    title: 'Vos Réalisations',
    progress: 'Progrès',
    level: 'Niveau',
    points: 'Points XP',
    badges: 'Badges',
    achievements: 'Réalisations',
    badgesEarned: 'Badges Obtenus',
    badgesToEarn: 'Badges à Obtenir',
    streakDays: 'Jours Consécutifs',
    coursesCompleted: 'Cours Terminés',
    quizzesCompleted: 'Quiz Terminés',
    hoursLearned: 'Heures Apprises',
    firstCourse: 'Premier Cours',
    firstCourseDesc: 'Compléter votre premier cours',
    perfectQuiz: 'Quiz Parfait',
    perfectQuizDesc: 'Obtenir 100% à un quiz',
    weekStreak: '7 Jours Consécutifs',
    weekStreakDesc: 'Apprendre pendant 7 jours consécutifs',
    monthStreak: '30 Jours Consécutifs',
    monthStreakDesc: 'Apprendre pendant 30 jours consécutifs',
    explorer: 'Explorateur',
    explorerDesc: 'S\'inscrire à 5 catégories de cours différentes',
    nightOwl: 'Oiseau de Nuit',
    nightOwlDesc: 'Étudier après 22h pendant 5 jours',
    earlyBird: 'Lève-Tôt',
    earlyBirdDesc: 'Étudier avant 8h pendant 5 jours',
    socialLearner: 'Apprenant Social',
    socialLearnerDesc: 'Participer à 10 discussions',
    helpfulPeer: 'Pair Utile',
    helpfulPeerDesc: 'Obtenir 5 votes "utile" sur vos commentaires',
    masteryPath: 'Chemin de Maîtrise',
    viewAll: 'Voir Tout',
    unlocked: 'Débloqué',
    locked: 'Verrouillé',
    keepGoing: 'Continuez pour débloquer plus de réalisations!',
    shareBadge: 'Partager le Badge',
    currentProgress: 'Progrès Actuel',
    nextMilestone: 'Prochain Jalon',
    to: 'à',
  },
  ar: {
    title: 'إنجازاتك',
    progress: 'التقدم',
    level: 'المستوى',
    points: 'نقاط الخبرة',
    badges: 'الشارات',
    achievements: 'الإنجازات',
    badgesEarned: 'الشارات المكتسبة',
    badgesToEarn: 'شارات للكسب',
    streakDays: 'أيام متتالية',
    coursesCompleted: 'الدورات المكتملة',
    quizzesCompleted: 'الاختبارات المكتملة',
    hoursLearned: 'ساعات التعلم',
    firstCourse: 'الدورة الأولى',
    firstCourseDesc: 'أكمل دورتك الأولى',
    perfectQuiz: 'اختبار مثالي',
    perfectQuizDesc: 'احصل على 100٪ في اختبار',
    weekStreak: '7 أيام متتالية',
    weekStreakDesc: 'تعلم لمدة 7 أيام متتالية',
    monthStreak: '30 يوم متتالي',
    monthStreakDesc: 'تعلم لمدة 30 يومًا متتاليًا',
    explorer: 'مستكشف',
    explorerDesc: 'سجل في 5 فئات دورة مختلفة',
    nightOwl: 'بومة الليل',
    nightOwlDesc: 'ادرس بعد الساعة 10 مساءً لمدة 5 أيام',
    earlyBird: 'الطائر المبكر',
    earlyBirdDesc: 'ادرس قبل الساعة 8 صباحًا لمدة 5 أيام',
    socialLearner: 'متعلم اجتماعي',
    socialLearnerDesc: 'شارك في 10 مناقشات',
    helpfulPeer: 'زميل مفيد',
    helpfulPeerDesc: 'احصل على 5 أصوات "مفيدة" على تعليقاتك',
    masteryPath: 'مسار الإتقان',
    viewAll: 'عرض الكل',
    unlocked: 'مفتوح',
    locked: 'مقفل',
    keepGoing: 'استمر لفتح المزيد من الإنجازات!',
    shareBadge: 'مشاركة الشارة',
    currentProgress: 'التقدم الحالي',
    nextMilestone: 'المعلم التالي',
    to: 'إلى',
  }
};

// Badge types
type BadgeStatus = 'locked' | 'unlocked';

interface Badge {
  id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  icon: React.ReactNode;
  status: BadgeStatus;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: string;
  category: 'course' | 'quiz' | 'streak' | 'social';
  image?: string;
}

interface AchievementsProps {
  badges: Badge[];
  level: number;
  xpPoints: number;
  nextLevelPoints: number;
  streakDays: number;
  coursesCompleted: number;
  quizzesCompleted: number;
  hoursLearned: number;
  locale: string;
}

export default function Achievements({
  badges,
  level,
  xpPoints,
  nextLevelPoints,
  streakDays,
  coursesCompleted,
  quizzesCompleted,
  hoursLearned,
  locale = 'en'
}: AchievementsProps) {
  // Use the appropriate dictionary based on locale
  const dictionary = achievementsDictionary[locale as keyof typeof achievementsDictionary] || achievementsDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  // Filter badges by status
  const unlockedBadges = badges.filter(badge => badge.status === 'unlocked');
  const lockedBadges = badges.filter(badge => badge.status === 'locked');
  
  // Calculate level progress percentage
  const levelProgressPercentage = (xpPoints / nextLevelPoints) * 100;
  
  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
      {/* User Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{dictionary.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Level Card */}
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
              <TrophyIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-gray-800">{level}</div>
            <p className="text-xs text-gray-500">{dictionary.level}</p>
          </div>
          
          {/* XP Points Card */}
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
              <StarIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-gray-800">{xpPoints}</div>
            <p className="text-xs text-gray-500">{dictionary.points}</p>
          </div>
          
          {/* Streak Card */}
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
              <FireIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-gray-800">{streakDays}</div>
            <p className="text-xs text-gray-500">{dictionary.streakDays}</p>
          </div>
          
          {/* Badges Card */}
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center mx-auto mb-2">
              <CheckBadgeIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-gray-800">{unlockedBadges.length}</div>
            <p className="text-xs text-gray-500">{dictionary.badges}</p>
          </div>
        </div>
        
        {/* Level Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">{dictionary.currentProgress}</span>
            <span className="text-gray-600">{xpPoints} / {nextLevelPoints} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary rounded-full h-2.5"
              style={{ width: `${levelProgressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{dictionary.level} {level}</span>
            <span>{dictionary.level} {level + 1}</span>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <AcademicCapIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{coursesCompleted}</div>
              <p className="text-xs text-gray-500">{dictionary.coursesCompleted}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <BookOpenIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{quizzesCompleted}</div>
              <p className="text-xs text-gray-500">{dictionary.quizzesCompleted}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-2 mr-3">
              <ClockIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{hoursLearned}</div>
              <p className="text-xs text-gray-500">{dictionary.hoursLearned}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Unlocked Badges */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{dictionary.badgesEarned}</h2>
          {unlockedBadges.length > 6 && (
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              {dictionary.viewAll}
            </button>
          )}
        </div>
        
        {unlockedBadges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {unlockedBadges.slice(0, 6).map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="relative mx-auto mb-2 rounded-full bg-primary/5 w-16 h-16 flex items-center justify-center">
                  {badge.image ? (
                    <Image
                      src={badge.image}
                      alt={badge.title[locale as keyof typeof badge.title] || ''}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="text-primary">{badge.icon}</div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <CheckBadgeIcon className="h-3 w-3 text-white" />
                  </div>
                </div>
                <h3 className="font-medium text-sm text-gray-800">{badge.title[locale as keyof typeof badge.title]}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.unlockedAt}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto mb-3 rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center">
              <CheckBadgeIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">{dictionary.keepGoing}</p>
          </div>
        )}
      </div>
      
      {/* Badges to Earn */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{dictionary.badgesToEarn}</h2>
          {lockedBadges.length > 4 && (
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              {dictionary.viewAll}
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {lockedBadges.slice(0, 4).map((badge) => (
            <div key={badge.id} className="border border-gray-100 rounded-lg p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-center">
                <div className="relative mr-4 rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center">
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {badge.title[locale as keyof typeof badge.title]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {badge.description[locale as keyof typeof badge.description]}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                  {dictionary.locked}
                </div>
              </div>
              
              {/* Progress Bar (if applicable) */}
              {badge.progress !== undefined && badge.maxProgress !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{badge.progress} / {badge.maxProgress}</span>
                    <span>{Math.round((badge.progress / badge.maxProgress) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary rounded-full h-1.5"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 