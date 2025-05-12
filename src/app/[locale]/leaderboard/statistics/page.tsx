'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  ChartBarIcon, 
  ChartPieIcon, 
  UserGroupIcon, 
  FireIcon,
  CalendarIcon
} from '@heroicons/react/24/solid';

// Dictionary for translations
const statisticsDictionary = {
  en: {
    title: 'Leaderboard Statistics',
    subtitle: 'Detailed analytics and insights from the learning community',
    back: 'Back to Leaderboard',
    overview: 'Overview',
    topPerformers: 'Top Performers',
    timeDistribution: 'Time Distribution',
    learningPatterns: 'Learning Patterns',
    achievementRates: 'Achievement Rates',
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    completionRate: 'Course Completion Rate',
    averageStreak: 'Average Streak',
    mostActive: 'Most Active Day',
    mostPopular: 'Most Popular Course',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    byTime: 'Learning Activity by Time',
    byCategory: 'Achievements by Category',
    byLevel: 'Users by Level',
    categoryWeb: 'Web Development',
    categoryMobile: 'Mobile Development',
    categoryData: 'Data Science',
    categoryDesign: 'Design',
    categoryBusiness: 'Business',
    lastUpdate: 'Last updated',
    downloadReport: 'Download Full Report',
  },
  fr: {
    title: 'Statistiques du Classement',
    subtitle: 'Analyses détaillées et aperçus de la communauté d\'apprentissage',
    back: 'Retour au Classement',
    overview: 'Aperçu',
    topPerformers: 'Meilleurs Performants',
    timeDistribution: 'Distribution Temporelle',
    learningPatterns: 'Modèles d\'Apprentissage',
    achievementRates: 'Taux de Réussite',
    totalUsers: 'Utilisateurs Totaux',
    activeUsers: 'Utilisateurs Actifs',
    completionRate: 'Taux de Complétion des Cours',
    averageStreak: 'Série Moyenne',
    mostActive: 'Jour le Plus Actif',
    mostPopular: 'Cours le Plus Populaire',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    byTime: 'Activité d\'Apprentissage par Temps',
    byCategory: 'Réalisations par Catégorie',
    byLevel: 'Utilisateurs par Niveau',
    categoryWeb: 'Développement Web',
    categoryMobile: 'Développement Mobile',
    categoryData: 'Science des Données',
    categoryDesign: 'Design',
    categoryBusiness: 'Business',
    lastUpdate: 'Dernière mise à jour',
    downloadReport: 'Télécharger le Rapport Complet',
  },
  ar: {
    title: 'إحصائيات لوحة المتصدرين',
    subtitle: 'تحليلات ورؤى مفصلة من مجتمع التعلم',
    back: 'العودة إلى لوحة المتصدرين',
    overview: 'نظرة عامة',
    topPerformers: 'أفضل المؤديين',
    timeDistribution: 'التوزيع الزمني',
    learningPatterns: 'أنماط التعلم',
    achievementRates: 'معدلات الإنجاز',
    totalUsers: 'إجمالي المستخدمين',
    activeUsers: 'المستخدمون النشطون',
    completionRate: 'معدل إكمال الدورة',
    averageStreak: 'متوسط ​​التتابع',
    mostActive: 'اليوم الأكثر نشاطًا',
    mostPopular: 'الدورة الأكثر شعبية',
    month: 'شهر',
    week: 'أسبوع',
    day: 'يوم',
    byTime: 'نشاط التعلم حسب الوقت',
    byCategory: 'الإنجازات حسب الفئة',
    byLevel: 'المستخدمون حسب المستوى',
    categoryWeb: 'تطوير الويب',
    categoryMobile: 'تطوير الجوال',
    categoryData: 'علوم البيانات',
    categoryDesign: 'التصميم',
    categoryBusiness: 'الأعمال',
    lastUpdate: 'آخر تحديث',
    downloadReport: 'تنزيل التقرير الكامل',
  }
};

// Mock data for statistics
const mockStatisticsData = {
  totalUsers: 15460,
  activeUsers: 8723,
  completionRate: 68,
  averageStreak: 12.4,
  mostActiveDay: 'Wednesday',
  mostPopularCourse: 'Web Development Fundamentals',
  categoryDistribution: [
    { name: 'Web Development', value: 42 },
    { name: 'Mobile Development', value: 23 },
    { name: 'Data Science', value: 18 },
    { name: 'Design', value: 12 },
    { name: 'Business', value: 5 }
  ],
  levelDistribution: [
    { level: '1-5', count: 5432 },
    { level: '6-10', count: 4128 },
    { level: '11-15', count: 2965 },
    { level: '16-20', count: 1642 },
    { level: '21+', count: 1293 }
  ],
  timeDistribution: [
    { time: 'Morning', count: 3251 },
    { time: 'Afternoon', count: 5842 },
    { time: 'Evening', count: 4732 },
    { time: 'Night', count: 1635 }
  ],
  lastUpdated: new Date().toISOString()
};

export default function StatisticsPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = statisticsDictionary[locale as keyof typeof statisticsDictionary] || statisticsDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Progress bar component
  const ProgressBar = ({ value, color }: { value: number, color: string }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
  
  // Chart placeholder component
  const ChartPlaceholder = ({ icon, height }: { icon: React.ReactNode, height: string }) => (
    <div className={`w-full ${height} bg-gray-50 rounded-xl flex flex-col items-center justify-center px-4`}>
      <div className="text-gray-300 mb-2">
        {icon}
      </div>
      <div className="text-gray-400 text-sm text-center">
        Chart visualization will be displayed here
      </div>
    </div>
  );
  
  return (
    <main className={`min-h-screen bg-neutral-50 pt-24 pb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/${locale}/leaderboard`}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>{dictionary.back}</span>
        </Link>
        
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600">{dictionary.subtitle}</p>
        </div>
        
        {/* Overview Statistics */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{dictionary.overview}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 mr-3">
                  <UserGroupIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{dictionary.totalUsers}</h3>
                  <p className="text-2xl font-bold text-gray-800">{mockStatisticsData.totalUsers.toLocaleString()}</p>
                </div>
              </div>
              <ProgressBar value={100} color="bg-primary" />
            </div>
            
            {/* Active Users */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-50 mr-3">
                  <FireIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{dictionary.activeUsers}</h3>
                  <p className="text-2xl font-bold text-gray-800">{mockStatisticsData.activeUsers.toLocaleString()}</p>
                </div>
              </div>
              <ProgressBar value={(mockStatisticsData.activeUsers / mockStatisticsData.totalUsers) * 100} color="bg-blue-500" />
            </div>
            
            {/* Course Completion Rate */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-green-50 mr-3">
                  <ChartBarIcon className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{dictionary.completionRate}</h3>
                  <p className="text-2xl font-bold text-gray-800">{mockStatisticsData.completionRate}%</p>
                </div>
              </div>
              <ProgressBar value={mockStatisticsData.completionRate} color="bg-green-500" />
            </div>
            
            {/* Average Streak */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-amber-50 mr-3">
                  <FireIcon className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{dictionary.averageStreak}</h3>
                  <p className="text-2xl font-bold text-gray-800">{mockStatisticsData.averageStreak} {dictionary.day}s</p>
                </div>
              </div>
              <ProgressBar value={(mockStatisticsData.averageStreak / 30) * 100} color="bg-amber-500" />
            </div>
            
            {/* Most Active Day */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-50 mr-3">
                  <CalendarIcon className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{dictionary.mostActive}</h3>
                  <p className="text-2xl font-bold text-gray-800">{mockStatisticsData.mostActiveDay}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>Mon</span>
                <span>Tue</span>
                <span className="text-purple-600 font-bold">Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
            
            {/* Most Popular Course */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-rose-50 mr-3">
                  <ChartBarIcon className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{dictionary.mostPopular}</h3>
                  <p className="text-xl font-bold text-gray-800 truncate">{mockStatisticsData.mostPopularCourse}</p>
                </div>
              </div>
              <ProgressBar value={85} color="bg-rose-500" />
            </div>
          </div>
        </div>
        
        {/* Data Visualization */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{dictionary.byCategory}</h3>
            <ChartPlaceholder 
              icon={<ChartPieIcon className="h-16 w-16" />} 
              height="h-64" 
            />
            
            <div className="mt-6 space-y-3">
              {mockStatisticsData.categoryDistribution.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">
                      {dictionary[`category${category.name.split(' ')[0]}` as keyof typeof dictionary] || category.name}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{category.value}%</span>
                  </div>
                  <ProgressBar 
                    value={category.value} 
                    color={
                      index === 0 ? "bg-blue-500" : 
                      index === 1 ? "bg-green-500" : 
                      index === 2 ? "bg-purple-500" : 
                      index === 3 ? "bg-amber-500" : 
                      "bg-rose-500"
                    } 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Level Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{dictionary.byLevel}</h3>
            <ChartPlaceholder 
              icon={<ChartBarIcon className="h-16 w-16" />} 
              height="h-64" 
            />
            
            <div className="mt-6 space-y-3">
              {mockStatisticsData.levelDistribution.map((level, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Level {level.level}</span>
                    <span className="text-sm font-medium text-gray-800">{level.count.toLocaleString()}</span>
                  </div>
                  <ProgressBar 
                    value={(level.count / mockStatisticsData.totalUsers) * 100} 
                    color={
                      index === 0 ? "bg-gray-400" : 
                      index === 1 ? "bg-blue-400" : 
                      index === 2 ? "bg-blue-500" : 
                      index === 3 ? "bg-blue-600" : 
                      "bg-blue-700"
                    } 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Time Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{dictionary.byTime}</h3>
            <ChartPlaceholder 
              icon={<ChartBarIcon className="h-16 w-16" />} 
              height="h-64" 
            />
            
            <div className="mt-6 space-y-3">
              {mockStatisticsData.timeDistribution.map((time, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{time.time}</span>
                    <span className="text-sm font-medium text-gray-800">{time.count.toLocaleString()}</span>
                  </div>
                  <ProgressBar 
                    value={(time.count / mockStatisticsData.activeUsers) * 100} 
                    color={
                      index === 0 ? "bg-yellow-400" : 
                      index === 1 ? "bg-orange-400" : 
                      index === 2 ? "bg-red-400" : 
                      "bg-indigo-500"
                    } 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Performers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{dictionary.topPerformers}</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === 1 ? "bg-yellow-100 text-yellow-600" :
                    index === 2 ? "bg-gray-100 text-gray-600" :
                    index === 3 ? "bg-amber-100 text-amber-600" :
                    "bg-gray-50 text-gray-500"
                  }`}>
                    <span className="font-bold">{index}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {index === 1 ? "Ahmed Hassan" :
                         index === 2 ? "Sarah Johnson" :
                         index === 3 ? "Mohammed Ali" :
                         index === 4 ? "Sophia Lee" :
                         "Carlos Rodriguez"}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {13000 - (index * 750)} XP
                      </span>
                    </div>
                    <ProgressBar 
                      value={100 - (index * 8)} 
                      color={
                        index === 1 ? "bg-yellow-500" : 
                        index === 2 ? "bg-gray-500" : 
                        index === 3 ? "bg-amber-500" : 
                        "bg-blue-500"
                      } 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer info and export button */}
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-500">
            {dictionary.lastUpdate}: {formatDate(mockStatisticsData.lastUpdated)}
          </div>
          
          <button className="px-4 py-2 bg-primary text-white rounded-md font-medium flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2 rotate-180" />
            {dictionary.downloadReport}
          </button>
        </div>
      </div>
    </main>
  );
} 