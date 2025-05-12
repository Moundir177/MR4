'use client';

import React from 'react';
import { FireIcon, CalendarIcon } from '@heroicons/react/24/solid';

// Dictionary for the component
const streakTrackerDictionary = {
  en: {
    currentStreak: 'Current Streak',
    days: 'Days',
    longestStreak: 'Longest Streak',
    lastActivity: 'Last Activity',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
    keepStreak: 'Keep your streak going!',
    streakLost: 'You lost your streak',
    studyToday: 'Study today to maintain your streak',
    weeklyActivity: 'Weekly Activity',
    perfectWeek: 'Perfect Week!',
    almostThere: 'Almost there!',
    startOfJourney: 'Start of your journey',
    mon: 'M',
    tue: 'T',
    wed: 'W',
    thu: 'T',
    fri: 'F',
    sat: 'S',
    sun: 'S',
  },
  fr: {
    currentStreak: 'Série Actuelle',
    days: 'Jours',
    longestStreak: 'Série la Plus Longue',
    lastActivity: 'Dernière Activité',
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    daysAgo: 'jours',
    keepStreak: 'Maintenez votre série!',
    streakLost: 'Vous avez perdu votre série',
    studyToday: 'Étudiez aujourd\'hui pour maintenir votre série',
    weeklyActivity: 'Activité Hebdomadaire',
    perfectWeek: 'Semaine parfaite!',
    almostThere: 'Presque là!',
    startOfJourney: 'Début de votre parcours',
    mon: 'L',
    tue: 'M',
    wed: 'M',
    thu: 'J',
    fri: 'V',
    sat: 'S',
    sun: 'D',
  },
  ar: {
    currentStreak: 'التتابع الحالي',
    days: 'أيام',
    longestStreak: 'أطول تتابع',
    lastActivity: 'آخر نشاط',
    today: 'اليوم',
    yesterday: 'أمس',
    daysAgo: 'أيام مضت',
    keepStreak: 'حافظ على استمرار تتابعك!',
    streakLost: 'لقد فقدت تتابعك',
    studyToday: 'ادرس اليوم للحفاظ على تتابعك',
    weeklyActivity: 'النشاط الأسبوعي',
    perfectWeek: 'أسبوع مثالي!',
    almostThere: 'أوشكت على الوصول!',
    startOfJourney: 'بداية رحلتك',
    mon: 'إث',
    tue: 'ث',
    wed: 'أر',
    thu: 'خ',
    fri: 'ج',
    sat: 'س',
    sun: 'أح',
  }
};

// Activity level types
type ActivityLevel = 'none' | 'low' | 'medium' | 'high' | 'max';

interface DayActivity {
  date: string; // ISO date string
  activityLevel: ActivityLevel;
  minutesLearned?: number;
}

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // ISO date string
  activityHistory: DayActivity[];
  locale: string;
}

export default function StreakTracker({
  currentStreak,
  longestStreak,
  lastActivityDate,
  activityHistory,
  locale = 'en'
}: StreakTrackerProps) {
  // Get appropriate dictionary
  const dictionary = streakTrackerDictionary[locale as keyof typeof streakTrackerDictionary] || streakTrackerDictionary.en;
  
  // Check if the UI direction should be RTL (for Arabic)
  const isRTL = locale === 'ar';
  
  // Calculate days since last activity
  const daysSinceLastActivity = () => {
    const now = new Date();
    const lastActivity = new Date(lastActivityDate);
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return dictionary.today;
    if (diffDays === 1) return dictionary.yesterday;
    return `${diffDays} ${dictionary.daysAgo}`;
  };
  
  // Format activity data for the heatmap
  const getLastNDays = (n: number) => {
    const result: DayActivity[] = [];
    const today = new Date();
    
    // Create a map of existing activities by date string
    const activityMap = new Map();
    activityHistory.forEach(activity => {
      const dateStr = new Date(activity.date).toISOString().split('T')[0];
      activityMap.set(dateStr, activity);
    });
    
    // Generate the last n days
    for (let i = n - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (activityMap.has(dateStr)) {
        result.push(activityMap.get(dateStr));
      } else {
        result.push({
          date: dateStr,
          activityLevel: 'none'
        });
      }
    }
    
    return result;
  };
  
  const last28Days = getLastNDays(28);
  
  // Get days of the current week
  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
    const result: DayActivity[] = [];
    
    // Adjust for different first day of week
    const firstDayOfWeek = locale === 'en' ? 0 : 1; // Sunday for EN, Monday for others
    const daysToGoBack = (currentDay - firstDayOfWeek + 7) % 7;
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      const dayDiff = daysToGoBack - (6 - i);
      date.setDate(today.getDate() - dayDiff);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find if we have activity for this date
      const activity = activityHistory.find(
        a => new Date(a.date).toISOString().split('T')[0] === dateStr
      ) || {
        date: dateStr,
        activityLevel: 'none'
      };
      
      result.push(activity);
    }
    
    return result;
  };
  
  const currentWeek = getCurrentWeek();
  
  // Get CSS class for activity level
  const getActivityClass = (level: ActivityLevel) => {
    switch (level) {
      case 'none':
        return 'bg-gray-100';
      case 'low':
        return 'bg-green-100';
      case 'medium':
        return 'bg-green-300';
      case 'high':
        return 'bg-green-500';
      case 'max':
        return 'bg-green-700';
      default:
        return 'bg-gray-100';
    }
  };
  
  // Generate a message based on the current week's activity
  const getWeeklyMessage = () => {
    const activeDaysCount = currentWeek.filter(day => day.activityLevel !== 'none').length;
    
    if (activeDaysCount === 7) return dictionary.perfectWeek;
    if (activeDaysCount >= 5) return dictionary.almostThere;
    if (activeDaysCount === 0) return dictionary.startOfJourney;
    return `${activeDaysCount}/7 ${dictionary.days}`;
  };
  
  // Get day label for the week view
  const getDayLabel = (index: number) => {
    if (locale === 'en') {
      // For English, week starts with Sunday
      const labels = [dictionary.sun, dictionary.mon, dictionary.tue, dictionary.wed, dictionary.thu, dictionary.fri, dictionary.sat];
      return labels[index];
    } else {
      // For other languages, week starts with Monday
      const labels = [dictionary.mon, dictionary.tue, dictionary.wed, dictionary.thu, dictionary.fri, dictionary.sat, dictionary.sun];
      return labels[index];
    }
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header with streak info */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <FireIcon className="h-5 w-5 text-orange-500 mr-1" />
              <span className="text-xl font-bold text-gray-800">{currentStreak}</span>
            </div>
            <p className="text-xs text-gray-500">{dictionary.currentStreak} {dictionary.days}</p>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{longestStreak}</div>
            <p className="text-xs text-gray-500">{dictionary.longestStreak}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-sm font-medium text-gray-800">{daysSinceLastActivity()}</span>
            </div>
            <p className="text-xs text-gray-500">{dictionary.lastActivity}</p>
          </div>
        </div>
      </div>
      
      {/* Current Week Activity */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-3">{dictionary.weeklyActivity}</h3>
        
        <div className="flex justify-between items-center mb-4">
          {currentWeek.map((day, index) => (
            <div key={day.date} className="flex flex-col items-center">
              <div className={`h-8 w-8 rounded-md ${getActivityClass(day.activityLevel)} mb-1`}></div>
              <span className="text-xs text-gray-500">{getDayLabel(index)}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm font-medium text-gray-700">
          {getWeeklyMessage()}
        </div>
      </div>
      
      {/* Activity Heatmap */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-1">
          {last28Days.map((day, index) => (
            <div 
              key={day.date} 
              className={`h-5 w-5 rounded-sm ${getActivityClass(day.activityLevel)}`}
              title={`${new Date(day.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'ar-SA')}: ${day.minutesLearned || 0} min`}
            ></div>
          ))}
        </div>
        
        <div className="flex justify-end mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1">{dictionary.studyToday}</span>
            <div className="flex items-center">
              {['none', 'low', 'medium', 'high', 'max'].map((level) => (
                <div 
                  key={level} 
                  className={`h-3 w-3 ml-1 rounded-sm ${getActivityClass(level as ActivityLevel)}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 