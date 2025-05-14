'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  ChatBubbleLeftIcon,
  PlusIcon,
  ArrowLeftIcon,
  ClockIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  FlagIcon,
  HandThumbUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UserCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';

// Discussions page dictionary
const discussionsDictionary = {
  en: {
    title: 'Discussion Forum',
    subtitle: 'Connect with fellow students and instructors',
    search: 'Search discussions...',
    allDiscussions: 'All Discussions',
    myDiscussions: 'My Discussions',
    unanswered: 'Unanswered',
    popular: 'Popular',
    recent: 'Recent',
    startDiscussion: 'New Discussion',
    topics: 'Topics',
    allTopics: 'All Topics',
    replies: 'Replies',
    views: 'Views',
    posted: 'Posted',
    pinned: 'Pinned',
    solved: 'Solved',
    by: 'by',
    instructor: 'Instructor',
    lastReply: 'Last reply',
    followingDiscussion: 'Following',
    noDiscussions: 'No discussions found matching your criteria',
    browseAll: 'Browse all discussions',
    filterBy: 'Filter by',
    sortBy: 'Sort by',
    back: 'Back',
    trending: 'Trending Topics',
    justNow: 'just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    webDevelopment: 'Web Development',
    dataScience: 'Data Science',
    uiDesign: 'UI/UX Design',
    mobileDevelopment: 'Mobile Development',
    programming: 'Programming',
    career: 'Career Advice',
  },
  fr: {
    title: 'Forum de Discussion',
    subtitle: 'Connectez-vous avec d\'autres étudiants et instructeurs',
    search: 'Rechercher dans les discussions...',
    allDiscussions: 'Toutes les Discussions',
    myDiscussions: 'Mes Discussions',
    unanswered: 'Sans Réponse',
    popular: 'Populaire',
    recent: 'Récent',
    startDiscussion: 'Nouvelle Discussion',
    topics: 'Sujets',
    allTopics: 'Tous les Sujets',
    replies: 'Réponses',
    views: 'Vues',
    posted: 'Publié',
    pinned: 'Épinglé',
    solved: 'Résolu',
    by: 'par',
    instructor: 'Instructeur',
    lastReply: 'Dernière réponse',
    followingDiscussion: 'Suivi',
    noDiscussions: 'Aucune discussion trouvée correspondant à vos critères',
    browseAll: 'Parcourir toutes les discussions',
    filterBy: 'Filtrer par',
    sortBy: 'Trier par',
    back: 'Retour',
    trending: 'Sujets Tendance',
    justNow: 'à l\'instant',
    minutesAgo: 'minutes',
    hoursAgo: 'heures',
    daysAgo: 'jours',
    webDevelopment: 'Développement Web',
    dataScience: 'Science des Données',
    uiDesign: 'Design UI/UX',
    mobileDevelopment: 'Développement Mobile',
    programming: 'Programmation',
    career: 'Conseils de Carrière',
  },
  ar: {
    title: 'منتدى النقاش',
    subtitle: 'تواصل مع زملائك الطلاب والمدربين',
    search: 'البحث في المناقشات...',
    allDiscussions: 'جميع المناقشات',
    myDiscussions: 'مناقشاتي',
    unanswered: 'بدون إجابة',
    popular: 'شائع',
    recent: 'حديث',
    startDiscussion: 'مناقشة جديدة',
    topics: 'المواضيع',
    allTopics: 'جميع المواضيع',
    replies: 'ردود',
    views: 'مشاهدات',
    posted: 'نُشر',
    pinned: 'مثبت',
    solved: 'تم الحل',
    by: 'بواسطة',
    instructor: 'مدرب',
    lastReply: 'آخر رد',
    followingDiscussion: 'متابع',
    noDiscussions: 'لم يتم العثور على مناقشات تطابق معاييرك',
    browseAll: 'تصفح جميع المناقشات',
    filterBy: 'تصفية حسب',
    sortBy: 'ترتيب حسب',
    back: 'رجوع',
    trending: 'المواضيع الرائجة',
    justNow: 'الآن',
    minutesAgo: 'دقائق',
    hoursAgo: 'ساعات',
    daysAgo: 'أيام',
    webDevelopment: 'تطوير الويب',
    dataScience: 'علوم البيانات',
    uiDesign: 'تصميم واجهة المستخدم',
    mobileDevelopment: 'تطوير الموبايل',
    programming: 'البرمجة',
    career: 'نصائح مهنية',
  }
};

// Forum topics
const topics = [
  { id: 'all', name: { en: 'All Topics', fr: 'Tous les Sujets', ar: 'جميع المواضيع' } },
  { id: 'web-development', name: { en: 'Web Development', fr: 'Développement Web', ar: 'تطوير الويب' } },
  { id: 'data-science', name: { en: 'Data Science', fr: 'Science des Données', ar: 'علوم البيانات' } },
  { id: 'ui-design', name: { en: 'UI/UX Design', fr: 'Design UI/UX', ar: 'تصميم واجهة المستخدم' } },
  { id: 'mobile-development', name: { en: 'Mobile Development', fr: 'Développement Mobile', ar: 'تطوير الموبايل' } },
  { id: 'programming', name: { en: 'Programming', fr: 'Programmation', ar: 'البرمجة' } },
  { id: 'career', name: { en: 'Career Advice', fr: 'Conseils de Carrière', ar: 'نصائح مهنية' } },
];

// Filter types
type FilterType = 'all' | 'my-discussions' | 'unanswered';

// Sort types
type SortType = 'recent' | 'popular';

// Mock discussion data
const discussionData = [
  {
    id: 'discussion1',
    title: {
      en: 'How to center a div in CSS?',
      fr: 'Comment centrer une div en CSS?',
      ar: 'كيف يمكن توسيط div في CSS؟'
    },
    content: {
      en: 'I\'ve been trying to center a div horizontally and vertically but can\'t seem to get it right. I\'ve tried margin: auto but it only centers horizontally.',
      fr: 'J\'essaie de centrer une div horizontalement et verticalement mais je n\'arrive pas à le faire correctement. J\'ai essayé margin: auto mais cela ne centre que horizontalement.',
      ar: 'لقد كنت أحاول توسيط div أفقيًا وعموديًا ولكن لا يمكنني الحصول عليه بشكل صحيح. لقد جربت margin: auto لكنها توسط أفقيًا فقط.'
    },
    author: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/images/instructors/sarah.jpg',
      isInstructor: false
    },
    topic: 'web-development',
    courseId: 'course1',
    courseName: 'Web Development Fundamentals',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    replies: 3,
    views: 42,
    isPinned: true,
    isSolved: true,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    lastReplyAuthor: {
      id: 'user3',
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg',
      isInstructor: true
    }
  },
  {
    id: 'discussion2',
    title: {
      en: 'Handling React useEffect dependencies',
      fr: 'Gestion des dépendances de React useEffect',
      ar: 'التعامل مع تبعيات React useEffect'
    },
    content: {
      en: 'I\'m having an issue with my useEffect hook. It keeps running in an infinite loop even though I\'ve specified dependencies.',
      fr: 'J\'ai un problème avec mon hook useEffect. Il continue de s\'exécuter dans une boucle infinie même si j\'ai spécifié des dépendances.',
      ar: 'أواجه مشكلة مع hook useEffect. يستمر في التشغيل في حلقة لا نهائية على الرغم من أنني حددت التبعيات.'
    },
    author: {
      id: 'user2',
      name: 'Michael Brown',
      avatar: null,
      isInstructor: false
    },
    topic: 'web-development',
    courseId: 'course2',
    courseName: 'Advanced React.js',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    replies: 5,
    views: 87,
    isPinned: false,
    isSolved: false,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    lastReplyAuthor: {
      id: 'user4',
      name: 'Emma Garcia',
      avatar: '/images/instructors/emma.jpg',
      isInstructor: false
    }
  },
  {
    id: 'discussion3',
    title: {
      en: 'Best practices for data visualization with Python',
      fr: 'Meilleures pratiques pour la visualisation de données avec Python',
      ar: 'أفضل الممارسات لتصور البيانات باستخدام Python'
    },
    content: {
      en: 'I\'m working on a data science project and need advice on the best libraries and approaches for creating informative visualizations.',
      fr: 'Je travaille sur un projet de science des données et j\'ai besoin de conseils sur les meilleures bibliothèques et approches pour créer des visualisations informatives.',
      ar: 'أعمل على مشروع علوم البيانات وأحتاج إلى نصائح حول أفضل المكتبات والأساليب لإنشاء تصورات غنية بالمعلومات.'
    },
    author: {
      id: 'user4',
      name: 'Emma Garcia',
      avatar: '/images/instructors/emma.jpg',
      isInstructor: false
    },
    topic: 'data-science',
    courseId: 'course3',
    courseName: 'Data Science Essentials',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    replies: 8,
    views: 156,
    isPinned: false,
    isSolved: true,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    lastReplyAuthor: {
      id: 'user5',
      name: 'Mohammed Ali',
      avatar: '/images/instructors/mohammed.jpg',
      isInstructor: true
    }
  },
  {
    id: 'discussion4',
    title: {
      en: 'Tips for creating a responsive design system',
      fr: 'Conseils pour créer un système de design responsive',
      ar: 'نصائح لإنشاء نظام تصميم متجاوب'
    },
    content: {
      en: 'I\'m designing a UI system that needs to work across multiple devices. What approaches have you found most effective for maintaining consistency?',
      fr: 'Je conçois un système d\'interface utilisateur qui doit fonctionner sur plusieurs appareils. Quelles approches avez-vous trouvées les plus efficaces pour maintenir la cohérence?',
      ar: 'أقوم بتصميم نظام واجهة مستخدم يحتاج إلى العمل عبر أجهزة متعددة. ما هي الأساليب التي وجدتها أكثر فعالية للحفاظ على الاتساق؟'
    },
    author: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/images/instructors/sarah.jpg',
      isInstructor: false
    },
    topic: 'ui-design',
    courseId: 'course4',
    courseName: 'UI/UX Design Principles',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    replies: 12,
    views: 230,
    isPinned: false,
    isSolved: false,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    lastReplyAuthor: {
      id: 'user2',
      name: 'Michael Brown',
      avatar: null,
      isInstructor: false
    }
  },
  {
    id: 'discussion5',
    title: {
      en: 'Flutter vs React Native - which one to learn in 2023?',
      fr: 'Flutter vs React Native - lequel apprendre en 2023?',
      ar: 'Flutter مقابل React Native - أيهما يجب تعلمه في 2023؟'
    },
    content: {
      en: 'I\'m interested in mobile app development and trying to decide which framework to focus on. What are the pros and cons of each in the current job market?',
      fr: 'Je m\'intéresse au développement d\'applications mobiles et j\'essaie de décider sur quel framework me concentrer. Quels sont les avantages et les inconvénients de chacun sur le marché du travail actuel?',
      ar: 'أنا مهتم بتطوير تطبيقات الهاتف المحمول وأحاول تحديد الإطار الذي يجب التركيز عليه. ما هي مزايا وعيوب كل منهما في سوق العمل الحالي؟'
    },
    author: {
      id: 'user6',
      name: 'Alex Chen',
      avatar: null,
      isInstructor: false
    },
    topic: 'mobile-development',
    courseId: 'course5',
    courseName: 'Mobile App Development with Flutter',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    replies: 15,
    views: 342,
    isPinned: false,
    isSolved: false,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    lastReplyAuthor: {
      id: 'user3',
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg',
      isInstructor: true
    }
  },
  {
    id: 'discussion6',
    title: {
      en: 'Transitioning from developer to technical manager - advice needed',
      fr: 'Transition de développeur à manager technique - conseils nécessaires',
      ar: 'الانتقال من مطور إلى مدير تقني - نصائح مطلوبة'
    },
    content: {
      en: 'I\'ve been offered a promotion to lead a development team. What skills should I focus on developing to be successful in this new role?',
      fr: 'On m\'a proposé une promotion pour diriger une équipe de développement. Sur quelles compétences devrais-je me concentrer pour réussir dans ce nouveau rôle?',
      ar: 'لقد تم عرض ترقية لي لقيادة فريق تطوير. ما هي المهارات التي يجب أن أركز على تطويرها لأكون ناجحًا في هذا الدور الجديد؟'
    },
    author: {
      id: 'user2',
      name: 'Michael Brown',
      avatar: null,
      isInstructor: false
    },
    topic: 'career',
    courseId: null,
    courseName: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    replies: 10,
    views: 205,
    isPinned: false,
    isSolved: true,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    lastReplyAuthor: {
      id: 'user5',
      name: 'Mohammed Ali',
      avatar: '/images/instructors/mohammed.jpg',
      isInstructor: true
    }
  }
];

export default function DiscussionsPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = discussionsDictionary[locale as keyof typeof discussionsDictionary] || discussionsDictionary.en;
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for filter and sort
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeSort, setActiveSort] = useState<SortType>('recent');
  
  // State for topic filter
  const [activeTopic, setActiveTopic] = useState('all');
  
  // Filter discussions based on active filters and search
  const filteredDiscussions = discussionData.filter(discussion => {
    // Filter by topic
    const matchesTopic = activeTopic === 'all' || discussion.topic === activeTopic;
    
    // Filter by type
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'my-discussions' && discussion.author.id === 'user1') || // Assuming current user is user1
      (activeFilter === 'unanswered' && discussion.replies === 0);
    
    // Filter by search
    const matchesSearch = searchQuery === '' || 
      discussion.title[locale as keyof typeof discussion.title]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      discussion.content[locale as keyof typeof discussion.content]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    
    return matchesTopic && matchesFilter && matchesSearch;
  });
  
  // Sort discussions
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    // Always put pinned discussions first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then sort by selected criteria
    if (activeSort === 'recent') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      // Sort by views for popularity
      return b.views - a.views;
    }
  });
  
  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 86400; // days
    if (interval > 1) {
      return Math.floor(interval) + ' ' + dictionary.daysAgo;
    }
    
    interval = seconds / 3600; // hours
    if (interval > 1) {
      return Math.floor(interval) + ' ' + dictionary.hoursAgo;
    }
    
    interval = seconds / 60; // minutes
    if (interval > 1) {
      return Math.floor(interval) + ' ' + dictionary.minutesAgo;
    }
    
    return dictionary.justNow;
  };
  
  // Get topic name based on locale
  const getTopicName = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? topic.name[locale as keyof typeof topic.name] : topicId;
  };
  
  // Get trending topics
  const trendingTopics = [
    { id: 'web-development', count: 28 },
    { id: 'data-science', count: 15 },
    { id: 'ui-design', count: 12 },
    { id: 'programming', count: 10 },
    { id: 'mobile-development', count: 8 },
  ];
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/${locale}/dashboard`}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>{dictionary.back}</span>
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{dictionary.title}</h1>
          <p className="text-gray-600">{dictionary.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={dictionary.search}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      className="appearance-none py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                      value={activeFilter}
                      onChange={(e) => setActiveFilter(e.target.value as FilterType)}
                    >
                      <option value="all">{dictionary.allDiscussions}</option>
                      <option value="my-discussions">{dictionary.myDiscussions}</option>
                      <option value="unanswered">{dictionary.unanswered}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select
                      className="appearance-none py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                      value={activeSort}
                      onChange={(e) => setActiveSort(e.target.value as SortType)}
                    >
                      <option value="recent">{dictionary.recent}</option>
                      <option value="popular">{dictionary.popular}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <Link 
                    href={`/${locale}/discussions/new`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">{dictionary.startDiscussion}</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Discussions List */}
            {sortedDiscussions.length > 0 ? (
              <div className="space-y-4">
                {sortedDiscussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Link href={`/${locale}/discussions/topics/${discussion.topic}`}>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                              {getTopicName(discussion.topic)}
                            </span>
                          </Link>
                          {discussion.isPinned && (
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                              {dictionary.pinned}
                            </span>
                          )}
                          {discussion.isSolved && (
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                              <CheckBadgeIcon className="h-3 w-3 mr-1" />
                              {dictionary.solved}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {formatTimeAgo(discussion.createdAt)}
                        </div>
                      </div>
                      
                      <Link href={`/${locale}/discussions/${discussion.id}`} className="block group">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                          {discussion.title[locale as keyof typeof discussion.title]}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center mb-4">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                          {discussion.author.avatar ? (
                            <Image
                              src={discussion.author.avatar}
                              alt={discussion.author.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                              <UserCircleIcon className="h-6 w-6 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">{dictionary.by} </span>
                          <span className="text-sm font-medium text-gray-800">{discussion.author.name}</span>
                          {discussion.author.isInstructor && (
                            <span className="ml-1 text-xs font-medium text-primary">
                              ({dictionary.instructor})
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {discussion.courseId && (
                        <Link 
                          href={`/${locale}/courses/${discussion.courseId}`}
                          className="flex items-center mb-4 text-sm text-gray-600 hover:text-primary"
                        >
                          <BookOpenIcon className="h-4 w-4 mr-2" />
                          <span>{discussion.courseName}</span>
                        </Link>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                            <span>{discussion.replies} {dictionary.replies}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{discussion.views} {dictionary.views}</span>
                          </div>
                        </div>
                        
                        {discussion.lastReplyAt && (
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">{dictionary.lastReply}:</span>
                            <div className="relative h-5 w-5 rounded-full overflow-hidden mr-1">
                              {discussion.lastReplyAuthor.avatar ? (
                                <Image
                                  src={discussion.lastReplyAuthor.avatar}
                                  alt={discussion.lastReplyAuthor.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                                  <UserCircleIcon className="h-4 w-4 text-gray-500" />
                                </div>
                              )}
                            </div>
                            <span className="text-gray-700">{formatTimeAgo(discussion.lastReplyAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <ChatBubbleLeftIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{dictionary.noDiscussions}</h3>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                    setActiveTopic('all');
                  }}
                  className="mt-2 text-primary hover:text-primary-dark font-medium"
                >
                  {dictionary.browseAll}
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topics List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
                {dictionary.topics}
              </h3>
              <div className="p-4">
                <div className="space-y-2">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTopic === topic.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={() => setActiveTopic(topic.id)}
                    >
                      <span>{topic.name[locale as keyof typeof topic.name]}</span>
                      {topic.id !== 'all' && (
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
                {dictionary.trending}
              </h3>
              <div className="p-4">
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <button
                      key={topic.id}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setActiveTopic(topic.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <ChatBubbleLeftIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-gray-700">{dictionary[topic.id as keyof typeof dictionary]}</span>
                      </div>
                      <span className="text-xs font-medium bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                        {topic.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Start Discussion Button (Mobile) */}
            <div className="lg:hidden">
              <Link 
                href={`/${locale}/discussions/new`}
                className="flex items-center justify-center w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                <span>{dictionary.startDiscussion}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 