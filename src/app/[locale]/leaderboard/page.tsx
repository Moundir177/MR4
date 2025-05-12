'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  ChartBarIcon, 
  TrophyIcon, 
  UserGroupIcon, 
  FireIcon,
  AcademicCapIcon, 
  ClockIcon,
  ListBulletIcon,
  ChartPieIcon,
  Squares2X2Icon 
} from '@heroicons/react/24/solid';
import Leaderboard from '@/components/Leaderboard';

// Page dictionary
const pageDictionary = {
  en: {
    title: 'Leaderboard',
    subtitle: 'See how you rank against other learners on the platform.',
    back: 'Back to Dashboard',
    global: 'Global Rankings',
    categories: 'Categories',
    friends: 'Friends',
    categoryAll: 'All Categories',
    categoryWeb: 'Web Development',
    categoryMobile: 'Mobile Development',
    categoryData: 'Data Science',
    categoryDesign: 'Design',
    categoryBusiness: 'Business',
    statsTitle: 'Leaderboard Statistics',
    totalUsers: 'Total Users',
    activeLearners: 'Active Learners',
    topAchievers: 'Top Achievers',
    averageLevel: 'Average Level',
    viewAs: 'View As',
    listView: 'List View',
    gridView: 'Grid View',
    timeFrame: 'Time Frame',
    allTime: 'All Time',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
  },
  fr: {
    title: 'Classement',
    subtitle: 'Découvrez votre rang par rapport aux autres apprenants sur la plateforme.',
    back: 'Retour au Tableau de Bord',
    global: 'Classements Globaux',
    categories: 'Catégories',
    friends: 'Amis',
    categoryAll: 'Toutes les Catégories',
    categoryWeb: 'Développement Web',
    categoryMobile: 'Développement Mobile',
    categoryData: 'Science des Données',
    categoryDesign: 'Design',
    categoryBusiness: 'Business',
    statsTitle: 'Statistiques du Classement',
    totalUsers: 'Utilisateurs Totaux',
    activeLearners: 'Apprenants Actifs',
    topAchievers: 'Meilleurs Performants',
    averageLevel: 'Niveau Moyen',
    viewAs: 'Afficher Comme',
    listView: 'Vue Liste',
    gridView: 'Vue Grille',
    timeFrame: 'Période',
    allTime: 'Tout Temps',
    thisWeek: 'Cette Semaine',
    thisMonth: 'Ce Mois',
  },
  ar: {
    title: 'لوحة المتصدرين',
    subtitle: 'تعرف على ترتيبك مقارنة بالمتعلمين الآخرين على المنصة.',
    back: 'العودة إلى لوحة التحكم',
    global: 'التصنيفات العالمية',
    categories: 'الفئات',
    friends: 'الأصدقاء',
    categoryAll: 'جميع الفئات',
    categoryWeb: 'تطوير الويب',
    categoryMobile: 'تطوير الجوال',
    categoryData: 'علوم البيانات',
    categoryDesign: 'التصميم',
    categoryBusiness: 'الأعمال',
    statsTitle: 'إحصائيات لوحة المتصدرين',
    totalUsers: 'إجمالي المستخدمين',
    activeLearners: 'المتعلمون النشطون',
    topAchievers: 'أفضل المحققين',
    averageLevel: 'المستوى المتوسط',
    viewAs: 'عرض كـ',
    listView: 'عرض القائمة',
    gridView: 'عرض الشبكة',
    timeFrame: 'الإطار الزمني',
    allTime: 'كل الوقت',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
  }
};

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: 'user1',
    name: 'Ahmed Hassan',
    avatar: '/images/users/user1.jpg',
    xpPoints: 12540,
    level: 24,
    achievements: 32,
    streak: 45,
    coursesCompleted: 15,
    lastWeekRank: 3,
    currentRank: 1,
    isCurrentUser: false,
    isFriend: true
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    avatar: '/images/users/user2.jpg',
    xpPoints: 11250,
    level: 22,
    achievements: 28,
    streak: 30,
    coursesCompleted: 12,
    lastWeekRank: 1,
    currentRank: 2,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user3',
    name: 'Mohammed Ali',
    avatar: '/images/users/user3.jpg',
    xpPoints: 10800,
    level: 21,
    achievements: 25,
    streak: 60,
    coursesCompleted: 11,
    lastWeekRank: 2,
    currentRank: 3,
    isCurrentUser: true,
    isFriend: false
  },
  {
    id: 'user4',
    name: 'Sophia Lee',
    avatar: '/images/users/user4.jpg',
    xpPoints: 9750,
    level: 19,
    achievements: 22,
    streak: 15,
    coursesCompleted: 8,
    lastWeekRank: 5,
    currentRank: 4,
    isCurrentUser: false,
    isFriend: true
  },
  {
    id: 'user5',
    name: 'Carlos Rodriguez',
    avatar: '/images/users/user5.jpg',
    xpPoints: 9200,
    level: 18,
    achievements: 20,
    streak: 25,
    coursesCompleted: 9,
    lastWeekRank: 4,
    currentRank: 5,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user6',
    name: 'Emma Garcia',
    avatar: '/images/users/user6.jpg',
    xpPoints: 8500,
    level: 17,
    achievements: 18,
    streak: 12,
    coursesCompleted: 7,
    lastWeekRank: 6,
    currentRank: 6,
    isCurrentUser: false,
    isFriend: true
  },
  {
    id: 'user7',
    name: 'David Kim',
    avatar: '/images/users/user7.jpg',
    xpPoints: 8100,
    level: 16,
    achievements: 16,
    streak: 8,
    coursesCompleted: 6,
    lastWeekRank: 7,
    currentRank: 7,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user8',
    name: 'Aisha Patel',
    avatar: '/images/users/user8.jpg',
    xpPoints: 7800,
    level: 15,
    achievements: 15,
    streak: 20,
    coursesCompleted: 5,
    lastWeekRank: 9,
    currentRank: 8,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user9',
    name: 'James Wilson',
    avatar: '/images/users/user9.jpg',
    xpPoints: 7200,
    level: 14,
    achievements: 13,
    streak: 5,
    coursesCompleted: 4,
    lastWeekRank: 8,
    currentRank: 9,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user10',
    name: 'Nina Schmidt',
    avatar: '/images/users/user10.jpg',
    xpPoints: 6500,
    level: 13,
    achievements: 12,
    streak: 10,
    coursesCompleted: 4,
    lastWeekRank: 10,
    currentRank: 10,
    isCurrentUser: false,
    isFriend: true
  },
  {
    id: 'user11',
    name: 'Omar Farooq',
    avatar: '/images/users/user11.jpg',
    xpPoints: 6200,
    level: 12,
    achievements: 11,
    streak: 7,
    coursesCompleted: 3,
    lastWeekRank: 12,
    currentRank: 11,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user12',
    name: 'Fatima Zahra',
    avatar: '/images/users/user12.jpg',
    xpPoints: 5800,
    level: 11,
    achievements: 10,
    streak: 15,
    coursesCompleted: 3,
    lastWeekRank: 11,
    currentRank: 12,
    isCurrentUser: false,
    isFriend: true
  },
  {
    id: 'user13',
    name: 'John Smith',
    avatar: '/images/users/user13.jpg',
    xpPoints: 5500,
    level: 11,
    achievements: 9,
    streak: 3,
    coursesCompleted: 2,
    lastWeekRank: 13,
    currentRank: 13,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user14',
    name: 'Leila Amrani',
    avatar: '/images/users/user14.jpg',
    xpPoints: 5100,
    level: 10,
    achievements: 8,
    streak: 5,
    coursesCompleted: 2,
    lastWeekRank: 15,
    currentRank: 14,
    isCurrentUser: false,
    isFriend: false
  },
  {
    id: 'user15',
    name: 'Michael Chen',
    avatar: '/images/users/user15.jpg',
    xpPoints: 4800,
    level: 9,
    achievements: 7,
    streak: 2,
    coursesCompleted: 2,
    lastWeekRank: 14,
    currentRank: 15,
    isCurrentUser: false,
    isFriend: false
  }
];

// Mock stats data
const mockStatsData = {
  totalUsers: 15460,
  activeLearners: 8723,
  topAchievers: 1250,
  averageLevel: 14,
  topCourse: 'Web Development Fundamentals',
  mostActiveDay: 'Wednesday',
  averageCoursesCompleted: 6.2
};

type TimeFrame = 'all' | 'week' | 'month';
type ViewMode = 'list' | 'grid';
type Category = 'all' | 'web' | 'mobile' | 'data' | 'design' | 'business';

export default function LeaderboardPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = pageDictionary[locale as keyof typeof pageDictionary] || pageDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  // Current user ID - in a real app this would come from authentication
  const currentUserId = 'user3';
  
  // State for view options
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  return (
    <main className={`min-h-screen bg-neutral-50 pt-24 pb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/${locale}/dashboard`}
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
        
        {/* Stats Cards */}
        <div className="max-w-6xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <UserGroupIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{dictionary.totalUsers}</p>
                <h3 className="text-2xl font-bold text-gray-800">{mockStatsData.totalUsers.toLocaleString()}</h3>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
              <div className="h-2 bg-primary rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 mr-4">
                <FireIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{dictionary.activeLearners}</p>
                <h3 className="text-2xl font-bold text-gray-800">{mockStatsData.activeLearners.toLocaleString()}</h3>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(mockStatsData.activeLearners / mockStatsData.totalUsers) * 100}%` }}></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-50 mr-4">
                <TrophyIcon className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{dictionary.topAchievers}</p>
                <h3 className="text-2xl font-bold text-gray-800">{mockStatsData.topAchievers.toLocaleString()}</h3>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
              <div className="h-2 bg-amber-500 rounded-full" style={{ width: `${(mockStatsData.topAchievers / mockStatsData.totalUsers) * 100}%` }}></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 mr-4">
                <AcademicCapIcon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{dictionary.averageLevel}</p>
                <h3 className="text-2xl font-bold text-gray-800">{mockStatsData.averageLevel}</h3>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(mockStatsData.averageLevel / 30) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* View and Time Filters */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-wrap justify-between gap-4">
          <div className="bg-white rounded-xl shadow-sm p-3 flex gap-2">
            <div className="text-sm text-gray-500 flex items-center mr-2">{dictionary.viewAs}:</div>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md flex items-center ${
                viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ListBulletIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{dictionary.listView}</span>
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md flex items-center ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Squares2X2Icon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{dictionary.gridView}</span>
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-3 flex gap-2">
            <div className="text-sm text-gray-500 flex items-center mr-2">{dictionary.timeFrame}:</div>
            <button 
              onClick={() => setTimeFrame('all')}
              className={`p-2 rounded-md flex items-center ${
                timeFrame === 'all' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClockIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{dictionary.allTime}</span>
            </button>
            <button 
              onClick={() => setTimeFrame('week')}
              className={`p-2 rounded-md flex items-center ${
                timeFrame === 'week' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClockIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{dictionary.thisWeek}</span>
            </button>
            <button 
              onClick={() => setTimeFrame('month')}
              className={`p-2 rounded-md flex items-center ${
                timeFrame === 'month' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClockIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{dictionary.thisMonth}</span>
            </button>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } font-medium`}
            >
              {dictionary.categoryAll}
            </button>
            <button 
              onClick={() => setSelectedCategory('web')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'web' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } font-medium`}
            >
              {dictionary.categoryWeb}
            </button>
            <button 
              onClick={() => setSelectedCategory('mobile')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'mobile' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } font-medium`}
            >
              {dictionary.categoryMobile}
            </button>
            <button 
              onClick={() => setSelectedCategory('data')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'data' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } font-medium`}
            >
              {dictionary.categoryData}
            </button>
            <button 
              onClick={() => setSelectedCategory('design')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'design' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } font-medium`}
            >
              {dictionary.categoryDesign}
            </button>
            <button 
              onClick={() => setSelectedCategory('business')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'business' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } font-medium`}
            >
              {dictionary.categoryBusiness}
            </button>
          </div>
        </div>
        
        {/* Leaderboard Component */}
        <div className="max-w-6xl mx-auto">
          {viewMode === 'list' ? (
            <Leaderboard 
              users={mockLeaderboardData}
              currentUserId={currentUserId}
              locale={locale}
              initialTimeFilter={timeFrame}
              initialUserFilter="everyone"
              showFilters={true}
              limit={10}
              itemsPerPage={10}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLeaderboardData.slice(0, 12).map((user) => (
                <div key={user.id} className={`bg-white rounded-xl shadow-sm overflow-hidden ${user.isCurrentUser ? 'ring-2 ring-primary' : ''}`}>
                  <div className="p-6 text-center">
                    <div className="relative inline-block">
                      <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-100 mx-auto">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-2xl text-gray-400">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`absolute -bottom-2 -right-2 h-8 w-8 rounded-full flex items-center justify-center ${
                        user.currentRank <= 3 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        #{user.currentRank}
                      </div>
                    </div>
                    
                    <h3 className="mt-4 font-bold text-gray-800">{user.name}</h3>
                    <div className="flex items-center justify-center mt-1">
                      <div className="text-yellow-500 flex items-center">
                        <span className="font-medium">{user.xpPoints.toLocaleString()}</span>
                        <span className="text-xs ml-1">XP</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Level</div>
                        <div className="font-medium text-gray-800">{user.level}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Streak</div>
                        <div className="font-medium text-gray-800">{user.streak}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Courses</div>
                        <div className="font-medium text-gray-800">{user.coursesCompleted}</div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/${locale}/profile/${user.id}`}
                      className="mt-4 inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Data Insights Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{dictionary.statsTitle}</h2>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="w-full h-64 rounded-xl bg-gray-50 flex items-center justify-center">
                  <ChartPieIcon className="h-24 w-24 text-gray-300" />
                  {/* In a real app, you would render an actual chart here */}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Leaderboard Insights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-xs">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Most Active Day</h4>
                      <p className="text-gray-600">{mockStatsData.mostActiveDay}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Top Course</h4>
                      <p className="text-gray-600">{mockStatsData.topCourse}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <span className="text-amber-600 text-xs">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Average Courses Completed</h4>
                      <p className="text-gray-600">{mockStatsData.averageCoursesCompleted}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 