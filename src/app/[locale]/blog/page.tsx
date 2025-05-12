'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CalendarIcon, 
  TagIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  BookmarkIcon,
} from '@heroicons/react/24/solid';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPosts from '@/components/BlogPosts';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Blog page dictionary
const blogDictionary = {
  en: {
    title: 'Blog',
    subtitle: 'Latest Articles and Updates',
    featured: 'Featured Article',
    recent: 'Recent Articles',
    categories: 'Categories',
    readMore: 'Read More',
    viewAll: 'View All',
    search: 'Search articles...',
    searchButton: 'Search',
    popularTags: 'Popular Tags',
    by: 'By',
    minutes: 'min read',
    subscribe: 'Subscribe to Newsletter',
    subscribeDescription: 'Get the latest articles and updates delivered to your inbox.',
    emailPlaceholder: 'Your email address',
    subscribeButton: 'Subscribe',
    allCategories: 'All Categories',
    learningSeries: 'Learning Series',
    resourceHub: 'Resource Hub',
    teachingTips: 'Teaching Tips',
    studentSuccess: 'Student Success',
    industryInsights: 'Industry Insights',
    educationTrends: 'Education Trends',
    viewArticle: 'View Article',
  },
  fr: {
    title: 'Blog',
    subtitle: 'Articles et Mises à Jour Récents',
    featured: 'Article à la Une',
    recent: 'Articles Récents',
    categories: 'Catégories',
    readMore: 'Lire Plus',
    viewAll: 'Voir Tous',
    search: 'Rechercher des articles...',
    searchButton: 'Rechercher',
    popularTags: 'Tags Populaires',
    by: 'Par',
    minutes: 'min de lecture',
    subscribe: 'S\'abonner à la Newsletter',
    subscribeDescription: 'Recevez les derniers articles et mises à jour dans votre boîte de réception.',
    emailPlaceholder: 'Votre adresse email',
    subscribeButton: 'S\'abonner',
    allCategories: 'Toutes les Catégories',
    learningSeries: 'Séries d\'Apprentissage',
    resourceHub: 'Centre de Ressources',
    teachingTips: 'Conseils d\'Enseignement',
    studentSuccess: 'Réussite des Étudiants',
    industryInsights: 'Aperçus de l\'Industrie',
    educationTrends: 'Tendances Éducatives',
    viewArticle: 'Voir l\'Article',
  },
  ar: {
    title: 'المدونة',
    subtitle: 'أحدث المقالات والتحديثات',
    featured: 'مقال مميز',
    recent: 'المقالات الأخيرة',
    categories: 'الفئات',
    readMore: 'قراءة المزيد',
    viewAll: 'عرض الكل',
    search: 'البحث في المقالات...',
    searchButton: 'بحث',
    popularTags: 'الوسوم الشائعة',
    by: 'بواسطة',
    minutes: 'دقيقة قراءة',
    subscribe: 'اشترك في النشرة الإخبارية',
    subscribeDescription: 'احصل على أحدث المقالات والتحديثات مباشرة إلى بريدك الإلكتروني.',
    emailPlaceholder: 'عنوان بريدك الإلكتروني',
    subscribeButton: 'اشترك',
    allCategories: 'جميع الفئات',
    learningSeries: 'سلسلة التعلم',
    resourceHub: 'مركز الموارد',
    teachingTips: 'نصائح التدريس',
    studentSuccess: 'نجاح الطلاب',
    industryInsights: 'رؤى الصناعة',
    educationTrends: 'اتجاهات التعليم',
    viewArticle: 'عرض المقال',
  }
};

// Mock blog categories
const categories = [
  { id: 'all', name: { en: 'All Categories', fr: 'Toutes les Catégories', ar: 'جميع الفئات' }, count: 24 },
  { id: 'learning-series', name: { en: 'Learning Series', fr: 'Séries d\'Apprentissage', ar: 'سلسلة التعلم' }, count: 8 },
  { id: 'resource-hub', name: { en: 'Resource Hub', fr: 'Centre de Ressources', ar: 'مركز الموارد' }, count: 5 },
  { id: 'teaching-tips', name: { en: 'Teaching Tips', fr: 'Conseils d\'Enseignement', ar: 'نصائح التدريس' }, count: 4 },
  { id: 'student-success', name: { en: 'Student Success', fr: 'Réussite des Étudiants', ar: 'نجاح الطلاب' }, count: 3 },
  { id: 'industry-insights', name: { en: 'Industry Insights', fr: 'Aperçus de l\'Industrie', ar: 'رؤى الصناعة' }, count: 2 },
  { id: 'education-trends', name: { en: 'Education Trends', fr: 'Tendances Éducatives', ar: 'اتجاهات التعليم' }, count: 2 },
];

// Mock popular tags
const popularTags = [
  { id: 'web-development', name: { en: 'Web Development', fr: 'Développement Web', ar: 'تطوير الويب' } },
  { id: 'data-science', name: { en: 'Data Science', fr: 'Science des Données', ar: 'علوم البيانات' } },
  { id: 'ui-design', name: { en: 'UI Design', fr: 'Design UI', ar: 'تصميم واجهة المستخدم' } },
  { id: 'programming', name: { en: 'Programming', fr: 'Programmation', ar: 'البرمجة' } },
  { id: 'career', name: { en: 'Career', fr: 'Carrière', ar: 'المسار المهني' } },
  { id: 'learning', name: { en: 'Learning', fr: 'Apprentissage', ar: 'التعلم' } },
];

// Mock blog posts
const blogPosts = [
  {
    id: 'article1',
    title: {
      en: 'How to Become a Full-Stack Developer in 2023',
      fr: 'Comment devenir un développeur Full-Stack en 2023',
      ar: 'كيف تصبح مطور Full-Stack في 2023'
    },
    excerpt: {
      en: 'A complete guide to becoming a full-stack developer in 2023, covering essential skills, tools, and resources.',
      fr: 'Un guide complet pour devenir développeur full-stack en 2023, couvrant les compétences essentielles, les outils et les ressources.',
      ar: 'دليل شامل لتصبح مطور full-stack في 2023، يغطي المهارات الأساسية والأدوات والموارد.'
    },
    content: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      ar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.'
    },
    image: '/images/blog/full-stack.jpg',
    author: {
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg'
    },
    date: '2023-10-15',
    readTime: 12,
    category: 'learning-series',
    tags: ['web-development', 'programming', 'career'],
    featured: true
  },
  {
    id: 'article2',
    title: {
      en: '10 Essential Tools for Data Scientists',
      fr: '10 outils essentiels pour les data scientists',
      ar: '10 أدوات أساسية لعلماء البيانات'
    },
    excerpt: {
      en: 'Discover the most important tools and technologies that every data scientist should master in their career.',
      fr: 'Découvrez les outils et technologies les plus importants que chaque data scientist devrait maîtriser dans sa carrière.',
      ar: 'اكتشف أهم الأدوات والتقنيات التي يجب على كل عالم بيانات إتقانها في حياته المهنية.'
    },
    content: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      ar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.'
    },
    image: '/images/blog/data-science.jpg',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/instructors/sarah.jpg'
    },
    date: '2023-09-28',
    readTime: 8,
    category: 'resource-hub',
    tags: ['data-science', 'programming']
  },
  {
    id: 'article3',
    title: {
      en: 'The Future of UI/UX Design',
      fr: 'L\'avenir du design UI/UX',
      ar: 'مستقبل تصميم UI/UX'
    },
    excerpt: {
      en: 'Explore upcoming trends and technologies that will shape the future of user interface and experience design.',
      fr: 'Explorez les tendances et technologies à venir qui façonneront l\'avenir de la conception d\'interface utilisateur et d\'expérience.',
      ar: 'استكشف الاتجاهات والتقنيات القادمة التي ستشكل مستقبل تصميم واجهة المستخدم والتجربة.'
    },
    content: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      ar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.'
    },
    image: '/images/blog/ui-ux.jpg',
    author: {
      name: 'Emma Garcia',
      avatar: '/images/instructors/emma.jpg'
    },
    date: '2023-09-15',
    readTime: 6,
    category: 'industry-insights',
    tags: ['ui-design', 'career']
  },
  {
    id: 'article4',
    title: {
      en: 'Effective Teaching Methods for Online Education',
      fr: 'Méthodes d\'enseignement efficaces pour l\'éducation en ligne',
      ar: 'طرق تدريس فعالة للتعليم عبر الإنترنت'
    },
    excerpt: {
      en: 'Learn about proven teaching strategies that work best in virtual learning environments.',
      fr: 'Découvrez des stratégies d\'enseignement éprouvées qui fonctionnent le mieux dans les environnements d\'apprentissage virtuels.',
      ar: 'تعرف على استراتيجيات التدريس المثبتة التي تعمل بشكل أفضل في بيئات التعلم الافتراضية.'
    },
    content: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      ar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.'
    },
    image: '/images/blog/teaching.jpg',
    author: {
      name: 'Mohamed Ali',
      avatar: '/images/instructors/mohammed.jpg'
    },
    date: '2023-08-22',
    readTime: 10,
    category: 'teaching-tips',
    tags: ['learning', 'education-trends']
  },
  {
    id: 'article5',
    title: {
      en: 'How to Stay Motivated During Your Learning Journey',
      fr: 'Comment rester motivé pendant votre parcours d\'apprentissage',
      ar: 'كيفية البقاء متحمسًا خلال رحلة التعلم الخاصة بك'
    },
    excerpt: {
      en: 'Practical advice and strategies to maintain motivation and consistency while learning new skills.',
      fr: 'Conseils pratiques et stratégies pour maintenir la motivation et la cohérence lors de l\'apprentissage de nouvelles compétences.',
      ar: 'نصائح واستراتيجيات عملية للحفاظ على الحافز والاتساق أثناء تعلم مهارات جديدة.'
    },
    content: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      ar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.'
    },
    image: '/images/blog/motivation.jpg',
    author: {
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg'
    },
    date: '2023-08-10',
    readTime: 7,
    category: 'student-success',
    tags: ['learning', 'career']
  },
  {
    id: 'article6',
    title: {
      en: 'The Rise of Microlearning: Why Bite-sized Content Works',
      fr: 'L\'essor du micro-apprentissage : pourquoi le contenu en petites bouchées fonctionne',
      ar: 'صعود التعلم المصغر: لماذا تعمل المحتويات الصغيرة'
    },
    excerpt: {
      en: 'Discover why short, targeted learning content is becoming increasingly popular and effective in modern education.',
      fr: 'Découvrez pourquoi le contenu d\'apprentissage court et ciblé devient de plus en plus populaire et efficace dans l\'éducation moderne.',
      ar: 'اكتشف لماذا أصبح محتوى التعلم القصير والمستهدف شائعًا وفعالًا بشكل متزايد في التعليم الحديث.'
    },
    content: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
      ar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.'
    },
    image: '/images/blog/microlearning.jpg',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/instructors/sarah.jpg'
    },
    date: '2023-07-25',
    readTime: 5,
    category: 'education-trends',
    tags: ['learning', 'education-trends']
  },
];

// Format date for specific locale
const formatDate = (dateString: string, locale: string) => {
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

export default function BlogPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  
  const dictionary = blogDictionary[locale as keyof typeof blogDictionary] || blogDictionary.en;
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for active category
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title[locale as keyof typeof post.title]
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      post.excerpt[locale as keyof typeof post.excerpt]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Get featured article
  const featuredArticle = blogPosts.find(post => post.featured);
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>
        
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{dictionary.featured}</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto md:aspect-auto">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title[locale as keyof typeof featuredArticle.title] || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                      {(categories.find(cat => cat.id === featuredArticle.category)?.name as any)?.[locale] || featuredArticle.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                    {featuredArticle.title[locale as keyof typeof featuredArticle.title]}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredArticle.excerpt[locale as keyof typeof featuredArticle.excerpt]}
                  </p>
                  <div className="flex items-center mb-6 mt-auto">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {dictionary.by} {featuredArticle.author.name}
                      </p>
                      <div className="text-xs text-gray-500 flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>{formatDate(featuredArticle.date, locale)}</span>
                        <span className="mx-2">•</span>
                        <span>{featuredArticle.readTime} {dictionary.minutes}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/blog/${featuredArticle.id}`}
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    {dictionary.viewArticle}
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={dictionary.search}
                  className="w-full px-4 py-3 pl-10 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary font-medium">
                  {dictionary.searchButton}
                </button>
              </div>
            </div>
            
            {/* Recent Articles Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{dictionary.recent}</h2>
              
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="md:flex">
                        <div className="relative md:w-1/3 h-48 md:h-auto">
                          <Image
                            src={post.image}
                            alt={post.title[locale as keyof typeof post.title] || ''}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded">
                              {(categories.find(cat => cat.id === post.category)?.name as any)?.[locale] || post.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {post.title[locale as keyof typeof post.title]}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {post.excerpt[locale as keyof typeof post.excerpt]}
                          </p>
                          <div className="flex justify-between items-end">
                            <div className="flex items-center">
                              <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                                <Image
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
                                <div className="text-xs text-gray-500">
                                  {formatDate(post.date, locale)} • {post.readTime} {dictionary.minutes}
                                </div>
                              </div>
                            </div>
                            <Link
                              href={`/${locale}/blog/${post.id}`}
                              className="text-primary hover:text-primary-dark text-sm font-medium"
                            >
                              {dictionary.readMore}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-500">No articles found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{dictionary.categories}</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`flex items-center justify-between w-full py-2 px-3 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span>{category.name[locale as keyof typeof category.name]}</span>
                      <span className="text-xs font-medium bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{dictionary.popularTags}</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag.id}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
                  >
                    {tag.name[locale as keyof typeof tag.name]}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="bg-primary rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-bold mb-2">{dictionary.subscribe}</h3>
              <p className="text-sm opacity-90 mb-4">{dictionary.subscribeDescription}</p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder={dictionary.emailPlaceholder}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full py-2 px-4 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors">
                  {dictionary.subscribeButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 