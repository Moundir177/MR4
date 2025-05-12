'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  TrophyIcon, 
  StarIcon, 
  FireIcon, 
  UserCircleIcon,
  AcademicCapIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

// Leaderboard dictionary
const leaderboardDictionary = {
  en: {
    title: 'Leaderboard',
    globalRanking: 'Global Ranking',
    friendsRanking: 'Friends Ranking',
    rank: 'Rank',
    user: 'User',
    xpPoints: 'XP Points',
    level: 'Level',
    achievements: 'Achievements',
    weeklyGain: 'Weekly Change',
    streak: 'Streak',
    days: 'days',
    coursesCompleted: 'Courses',
    filter: 'Filter by',
    filterAll: 'All Time',
    filterWeek: 'This Week',
    filterMonth: 'This Month',
    topLearners: 'Top Learners',
    you: 'You',
    viewProfile: 'View Profile',
    showMore: 'Show More',
    loading: 'Loading...',
    noResults: 'No results found',
    category: 'Category',
    categoryAll: 'All Categories',
    rankedHigher: 'up from last week',
    rankedLower: 'down from last week',
    rankedSame: 'same as last week',
    friendsOnly: 'Friends Only',
    everyoneFilter: 'Everyone',
  },
  fr: {
    title: 'Classement',
    globalRanking: 'Classement Global',
    friendsRanking: 'Classement des Amis',
    rank: 'Rang',
    user: 'Utilisateur',
    xpPoints: 'Points XP',
    level: 'Niveau',
    achievements: 'Réalisations',
    weeklyGain: 'Évolution Hebdo',
    streak: 'Série',
    days: 'jours',
    coursesCompleted: 'Cours',
    filter: 'Filtrer par',
    filterAll: 'Tout Temps',
    filterWeek: 'Cette Semaine',
    filterMonth: 'Ce Mois',
    topLearners: 'Meilleurs Apprenants',
    you: 'Vous',
    viewProfile: 'Voir le Profil',
    showMore: 'Voir Plus',
    loading: 'Chargement...',
    noResults: 'Aucun résultat trouvé',
    category: 'Catégorie',
    categoryAll: 'Toutes les Catégories',
    rankedHigher: 'en hausse depuis la semaine dernière',
    rankedLower: 'en baisse depuis la semaine dernière',
    rankedSame: 'même rang que la semaine dernière',
    friendsOnly: 'Amis Seulement',
    everyoneFilter: 'Tout le Monde',
  },
  ar: {
    title: 'لوحة المتصدرين',
    globalRanking: 'التصنيف العالمي',
    friendsRanking: 'تصنيف الأصدقاء',
    rank: 'المرتبة',
    user: 'المستخدم',
    xpPoints: 'نقاط الخبرة',
    level: 'المستوى',
    achievements: 'الإنجازات',
    weeklyGain: 'التغيير الأسبوعي',
    streak: 'التتابع',
    days: 'أيام',
    coursesCompleted: 'الدورات',
    filter: 'تصفية حسب',
    filterAll: 'كل الوقت',
    filterWeek: 'هذا الأسبوع',
    filterMonth: 'هذا الشهر',
    topLearners: 'أفضل المتعلمين',
    you: 'أنت',
    viewProfile: 'عرض الملف الشخصي',
    showMore: 'عرض المزيد',
    loading: 'جاري التحميل...',
    noResults: 'لم يتم العثور على نتائج',
    category: 'الفئة',
    categoryAll: 'جميع الفئات',
    rankedHigher: 'ارتفاع من الأسبوع الماضي',
    rankedLower: 'انخفاض من الأسبوع الماضي',
    rankedSame: 'نفس المرتبة كالأسبوع الماضي',
    friendsOnly: 'الأصدقاء فقط',
    everyoneFilter: 'الجميع',
  }
};

// Types
type TimeFilter = 'all' | 'week' | 'month';
type UserFilter = 'everyone' | 'friends';

interface RankingUser {
  id: string;
  name: string;
  avatar?: string;
  xpPoints: number;
  level: number;
  achievements: number;
  streak: number;
  coursesCompleted: number;
  lastWeekRank: number;
  currentRank: number;
  isCurrentUser: boolean;
  isFriend: boolean;
}

interface LeaderboardProps {
  users: RankingUser[];
  currentUserId: string;
  locale: string;
  initialTimeFilter?: TimeFilter;
  initialUserFilter?: UserFilter;
  showFilters?: boolean;
  limit?: number;
  itemsPerPage?: number;
  allowExport?: boolean;
  showAnimations?: boolean;
}

export default function Leaderboard({
  users,
  currentUserId,
  locale = 'en',
  initialTimeFilter = 'all',
  initialUserFilter = 'everyone',
  showFilters = true,
  limit = 10,
  itemsPerPage = 10,
  allowExport = true,
  showAnimations = true
}: LeaderboardProps) {
  // Dictionary based on locale
  const dictionary = leaderboardDictionary[locale as keyof typeof leaderboardDictionary] || leaderboardDictionary.en;
  
  // Check if UI should be RTL for Arabic
  const isRTL = locale === 'ar';
  
  // State for filters
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(initialTimeFilter);
  const [userFilter, setUserFilter] = useState<UserFilter>(initialUserFilter);
  const [showMoreLimit, setShowMoreLimit] = useState<number>(limit);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);
  const [usePagination, setUsePagination] = useState<boolean>(true);
  
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<{user: RankingUser, badge: {icon: string, label: string, color: string}} | null>(null);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  // Reference for achievement badge elements - Fix for linter error
  const achievementRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    exit: { opacity: 0, y: -20 }
  };
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [timeFilter, userFilter, searchQuery]);
  
  // Filter users based on selected filters and search
  const filteredUsers = users
    .filter(user => userFilter === 'everyone' || user.isFriend || user.isCurrentUser)
    .filter(user => {
      if (!searchQuery) return true;
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => b.xpPoints - a.xpPoints);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = usePagination 
    ? filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredUsers.slice(0, showMoreLimit);
  
  // Find current user's data
  const currentUser = users.find(user => user.id === currentUserId);
  
  // Achievement badges
  const getAchievementBadge = (achievements: number) => {
    if (achievements >= 30) return { icon: '🏆', color: 'bg-yellow-100 text-yellow-800', label: 'Master' };
    if (achievements >= 20) return { icon: '🥇', color: 'bg-blue-100 text-blue-800', label: 'Expert' };
    if (achievements >= 10) return { icon: '🥈', color: 'bg-green-100 text-green-800', label: 'Advanced' };
    return { icon: '🥉', color: 'bg-gray-100 text-gray-800', label: 'Beginner' };
  };
  
  // Export function
  const exportLeaderboard = () => {
    const dataToExport = filteredUsers.map((user, index) => ({
      rank: user.currentRank,
      name: user.name,
      xpPoints: user.xpPoints,
      level: user.level,
      streak: user.streak,
      coursesCompleted: user.coursesCompleted,
      achievements: user.achievements,
      isCurrentUser: user.isCurrentUser,
      isFriend: user.isFriend
    }));
    
    let exportData;
    let fileName;
    let dataType;
    
    if (exportFormat === 'csv') {
      // Generate CSV
      const header = Object.keys(dataToExport[0]).join(',');
      const csv = dataToExport.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' ? `"${value}"` : value
        ).join(',')
      );
      exportData = [header, ...csv].join('\n');
      fileName = `miracademy-leaderboard-${timeFilter}-${new Date().toISOString().split('T')[0]}.csv`;
      dataType = 'text/csv';
    } else {
      // Generate JSON
      exportData = JSON.stringify(dataToExport, null, 2);
      fileName = `miracademy-leaderboard-${timeFilter}-${new Date().toISOString().split('T')[0]}.json`;
      dataType = 'application/json';
    }
    
    // Create downloadable link
    const blob = new Blob([exportData], { type: dataType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  // Function to show achievement modal
  const showAchievement = (user: RankingUser) => {
    if (!showAnimations) return;
    
    const badge = getAchievementBadge(user.achievements);
    setSelectedAchievement({ user, badge });
    setShowAchievementModal(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowAchievementModal(false);
    }, 3000);
  };
  
  // Function to render rank change indicator
  const renderRankChange = (user: RankingUser) => {
    const rankDiff = user.lastWeekRank - user.currentRank;
    
    if (rankDiff > 0) {
      return (
        <div className="flex items-center text-green-500">
          <ArrowUpIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">{rankDiff} {dictionary.rankedHigher}</span>
        </div>
      );
    } else if (rankDiff < 0) {
      return (
        <div className="flex items-center text-red-500">
          <ArrowDownIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">{Math.abs(rankDiff)} {dictionary.rankedLower}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500">
          <MinusIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">{dictionary.rankedSame}</span>
        </div>
      );
    }
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{dictionary.title}</h2>
          
          {allowExport && (
            <div className="relative">
              <button 
                onClick={() => setShowExportOptions(!showExportOptions)} 
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center text-sm font-medium"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Export
              </button>
              
              {showExportOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="p-2">
                    <div className="mb-2">
                      <label className="block text-sm text-gray-700 mb-1">Format</label>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setExportFormat('csv')}
                          className={`px-3 py-1 text-xs rounded-md ${
                            exportFormat === 'csv' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          CSV
                        </button>
                        <button 
                          onClick={() => setExportFormat('json')}
                          className={`px-3 py-1 text-xs rounded-md ${
                            exportFormat === 'json' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          JSON
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        exportLeaderboard();
                        setShowExportOptions(false);
                      }}
                      className="w-full py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder={`${dictionary.user}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setUserFilter('everyone')}
                className={`px-3 py-1 text-sm rounded-full ${
                  userFilter === 'everyone' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dictionary.everyoneFilter}
              </button>
              <button
                onClick={() => setUserFilter('friends')}
                className={`px-3 py-1 text-sm rounded-full ${
                  userFilter === 'friends' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dictionary.friendsOnly}
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  timeFilter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dictionary.filterAll}
              </button>
              <button
                onClick={() => setTimeFilter('week')}
                className={`px-3 py-1 text-sm rounded-full ${
                  timeFilter === 'week' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dictionary.filterWeek}
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`px-3 py-1 text-sm rounded-full ${
                  timeFilter === 'month' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dictionary.filterMonth}
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setUsePagination(true)}
                className={`px-3 py-1 text-sm rounded-full ${
                  usePagination 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pages
              </button>
              <button
                onClick={() => setUsePagination(false)}
                className={`px-3 py-1 text-sm rounded-full ${
                  !usePagination 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Show More
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Table Header */}
      <div className="px-6 py-3 bg-gray-50 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
        <div className="col-span-1 text-center">{dictionary.rank}</div>
        <div className="col-span-4">{dictionary.user}</div>
        <div className="col-span-2 text-center">{dictionary.xpPoints}</div>
        <div className="col-span-1 text-center">{dictionary.level}</div>
        <div className="col-span-2 text-center hidden md:block">{dictionary.coursesCompleted}</div>
        <div className="col-span-2 text-center hidden md:block">{dictionary.streak}</div>
      </div>
      
      {/* Leaderboard Users */}
      <div className="divide-y divide-gray-100">
        {paginatedUsers.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-500">
            {dictionary.noResults}
          </div>
        ) : (
          <AnimatePresence>
            {paginatedUsers.map((user, index) => (
              <motion.div 
                key={user.id} 
                custom={index}
                variants={itemVariants}
                initial={showAnimations ? "hidden" : "visible"}
                animate="visible"
                exit="exit"
                layoutId={user.id}
                className={`px-6 py-4 grid grid-cols-12 gap-4 items-center ${
                  user.isCurrentUser ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredUser(user.id)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                {/* Rank */}
                <div className="col-span-1 text-center">
                  {user.currentRank <= 3 ? (
                    <motion.div 
                      className={`
                        inline-flex h-8 w-8 rounded-full items-center justify-center
                        ${user.currentRank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                          user.currentRank === 2 ? 'bg-gray-100 text-gray-600' : 
                          'bg-amber-100 text-amber-600'}
                      `}
                      initial={showAnimations ? { scale: 0.5 } : { scale: 1 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="font-bold">{user.currentRank}</span>
                    </motion.div>
                  ) : (
                    <span className="text-gray-700 font-medium">{user.currentRank}</span>
                  )}
                </div>
                
                {/* User Info */}
                <div className="col-span-4 relative">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-3">
                      {user.avatar ? (
                        <Image 
                          src={user.avatar} 
                          alt={user.name} 
                          width={40} 
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <UserCircleIcon className="h-10 w-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800">{user.name}</span>
                        {user.isCurrentUser && (
                          <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            {dictionary.you}
                          </span>
                        )}
                        
                        {/* Achievement Badge - Fixed ref assignment */}
                        <div 
                          ref={(el) => { achievementRefs.current[user.id] = el; }}
                          className={`ml-2 px-2 py-0.5 ${getAchievementBadge(user.achievements).color} text-xs rounded-full flex items-center cursor-pointer`}
                          onClick={() => showAchievement(user)}
                        >
                          <span className="mr-1">{getAchievementBadge(user.achievements).icon}</span>
                          <span>{getAchievementBadge(user.achievements).label}</span>
                          {showAnimations && (
                            <motion.span 
                              className="ml-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                              <CheckBadgeIcon className="h-3 w-3" />
                            </motion.span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {renderRankChange(user)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Tooltip */}
                  {hoveredUser === user.id && (
                    <div className="absolute z-10 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 left-0 top-full">
                      <div className="flex items-start mb-3">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 mr-3">
                          {user.avatar ? (
                            <Image 
                              src={user.avatar} 
                              alt={user.name} 
                              width={64} 
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <UserCircleIcon className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{user.name}</h3>
                          <div className="text-sm text-gray-500">Rank #{user.currentRank}</div>
                          <div className="text-sm text-gray-500">Level {user.level}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="text-xs text-gray-500">XP Points</div>
                          <div className="font-medium">{user.xpPoints.toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="text-xs text-gray-500">{dictionary.streak}</div>
                          <div className="font-medium">{user.streak} {dictionary.days}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="text-xs text-gray-500">{dictionary.coursesCompleted}</div>
                          <div className="font-medium">{user.coursesCompleted}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="text-xs text-gray-500">{dictionary.achievements}</div>
                          <div className="font-medium">{user.achievements}</div>
                        </div>
                      </div>
                      <Link 
                        href={`/${locale}/profile/${user.id}`}
                        className="w-full block text-center py-2 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
                      >
                        {dictionary.viewProfile}
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* XP Points */}
                <div className="col-span-2 text-center font-medium text-gray-800">
                  {user.xpPoints.toLocaleString()}
                  <div className="flex items-center justify-center">
                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs text-gray-500">XP</span>
                  </div>
                  {/* XP Progress Bar */}
                  <motion.div 
                    className="w-full bg-gray-200 rounded-full h-1.5 mt-1"
                    initial={showAnimations ? { width: 0 } : { width: "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: `${(user.xpPoints % 1000) / 10}%` }}
                      initial={showAnimations ? { width: 0 } : { width: `${(user.xpPoints % 1000) / 10}%` }}
                      animate={{ width: `${(user.xpPoints % 1000) / 10}%` }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    ></motion.div>
                  </motion.div>
                </div>
                
                {/* Level */}
                <div className="col-span-1 text-center">
                  <motion.div 
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10"
                    initial={showAnimations ? { y: 10, opacity: 0 } : { y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                  >
                    <span className="font-bold text-primary">{user.level}</span>
                  </motion.div>
                </div>
                
                {/* Courses Completed */}
                <div className="col-span-2 text-center hidden md:block">
                  <div className="flex items-center justify-center">
                    <AcademicCapIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium text-gray-800">{user.coursesCompleted}</span>
                  </div>
                </div>
                
                {/* Streak */}
                <div className="col-span-2 text-center hidden md:block">
                  <div className="flex items-center justify-center">
                    <FireIcon className="h-4 w-4 text-orange-500 mr-1" />
                    <motion.span 
                      className="font-medium text-gray-800"
                      initial={showAnimations && user.streak > 10 ? { scale: 1 } : { scale: 1 }}
                      animate={showAnimations && user.streak > 10 ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ repeat: showAnimations && user.streak > 10 ? Infinity : 0, repeatType: "reverse", duration: 1.5 }}
                    >
                      {user.streak} {dictionary.days}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      {/* Pagination Controls */}
      {usePagination && filteredUsers.length > 0 && (
        <div className="p-4 flex justify-center items-center border-t border-gray-100">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          
          <div className="px-4 text-sm">
            {currentPage} / {totalPages}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      
      {/* Show More Button (if not using pagination) */}
      {!usePagination && filteredUsers.length > showMoreLimit && (
        <div className="p-4 text-center border-t border-gray-100">
          <button
            onClick={() => setShowMoreLimit(showMoreLimit + 10)}
            className="px-4 py-2 text-primary hover:text-primary-dark font-medium"
          >
            {dictionary.showMore}
          </button>
        </div>
      )}
      
      {/* Current User Summary (if not in view) */}
      {currentUser && !paginatedUsers.some(user => user.id === currentUserId) && (
        <div className="p-4 border-t border-gray-200 bg-primary/5">
          <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
            {/* Rank */}
            <div className="col-span-1 text-center">
              <span className="text-gray-700 font-medium">{currentUser.currentRank}</span>
            </div>
            
            {/* User Info */}
            <div className="col-span-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-3">
                  {currentUser.avatar ? (
                    <Image 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      width={40} 
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">{currentUser.name}</span>
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {dictionary.you}
                    </span>
                    
                    {/* Achievement Badge */}
                    <span className={`ml-2 px-2 py-0.5 ${getAchievementBadge(currentUser.achievements).color} text-xs rounded-full flex items-center`}>
                      <span className="mr-1">{getAchievementBadge(currentUser.achievements).icon}</span>
                      <span>{getAchievementBadge(currentUser.achievements).label}</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {renderRankChange(currentUser)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* XP Points */}
            <div className="col-span-2 text-center font-medium text-gray-800">
              {currentUser.xpPoints.toLocaleString()}
              <div className="flex items-center justify-center">
                <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                <span className="text-xs text-gray-500">XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${(currentUser.xpPoints % 1000) / 10}%` }}
                ></div>
              </div>
            </div>
            
            {/* Level */}
            <div className="col-span-1 text-center">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                <span className="font-bold text-primary">{currentUser.level}</span>
              </div>
            </div>
            
            {/* Courses Completed */}
            <div className="col-span-2 text-center hidden md:block">
              <div className="flex items-center justify-center">
                <AcademicCapIcon className="h-4 w-4 text-green-500 mr-1" />
                <span className="font-medium text-gray-800">{currentUser.coursesCompleted}</span>
              </div>
            </div>
            
            {/* Streak */}
            <div className="col-span-2 text-center hidden md:block">
              <div className="flex items-center justify-center">
                <FireIcon className="h-4 w-4 text-orange-500 mr-1" />
                <span className="font-medium text-gray-800">{currentUser.streak} {dictionary.days}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Statistics */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-center">
        <Link 
          href={`/${locale}/leaderboard/statistics`}
          className="inline-flex items-center text-primary hover:text-primary-dark"
        >
          <ChartBarIcon className="h-4 w-4 mr-1" />
          <span className="font-medium">View Detailed Statistics</span>
        </Link>
      </div>
      
      {/* Achievement Modal */}
      <AnimatePresence>
        {showAchievementModal && selectedAchievement && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAchievementModal(false)}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 text-center shadow-xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <motion.div 
                className="h-20 w-20 mx-auto mb-4 flex items-center justify-center text-4xl"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 1 }}
              >
                {selectedAchievement.badge.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">{selectedAchievement.badge.label} Achievement</h3>
              <p className="text-gray-600 mb-4">
                {selectedAchievement.user.name} has achieved {selectedAchievement.user.achievements} learning milestones!
              </p>
              
              <motion.div 
                className="w-full bg-gray-200 h-2 rounded-full mb-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div 
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedAchievement.user.achievements / 40) * 100}%` }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                ></motion.div>
              </motion.div>
              
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                onClick={() => setShowAchievementModal(false)}
              >
                Awesome!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 