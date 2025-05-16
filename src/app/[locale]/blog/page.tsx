import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CalendarIcon, 
  TagIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPosts from '@/components/BlogPosts';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { locales } from '@/i18n/settings';

// This function is required for static exports with dynamic routes
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

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
      fr: 'Comment rester motivé pendant votre parcours d\'apprentage',
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

// Get featured post
const featuredPost = blogPosts.find(post => post.featured);

// Date formatting function
const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(
    locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'ar-SA', 
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
};

// Convert to server component
export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  
  // Get current dictionary based on locale
  const t = blogDictionary[locale as keyof typeof blogDictionary] || blogDictionary.en;
  
  // Since we can't use useState in a server component, we'll just show all posts
  const displayedPosts = blogPosts;
  const selectedCategory = 'all';
  
  return (
    <main className="min-h-screen bg-neutral pb-16">
      <Header locale={locale} dictionary={dict} />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-3xl">{t.subtitle}</p>
        </div>
      </section>
      
      {/* Blog Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              {/* Featured Article */}
              {featuredPost && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{t.featured}</h2>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-80 w-full">
                      <Image 
                        src={featuredPost.image || '/images/blog/placeholder.jpg'} 
                        alt={featuredPost.title[locale as keyof typeof featuredPost.title] || ''} 
                        fill
                        style={{objectFit: "cover"}}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{formatDate(featuredPost.date, locale)}</span>
                        <span className="mx-2">•</span>
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{featuredPost.readTime} {t.minutes}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {featuredPost.title[locale as keyof typeof featuredPost.title] || featuredPost.title.en}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {featuredPost.excerpt[locale as keyof typeof featuredPost.excerpt] || featuredPost.excerpt.en}
                      </p>
                      <Link href={`/${locale}/blog/${featuredPost.id}`} className="inline-flex items-center text-primary font-medium">
                        {t.readMore} <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {/* All Posts */}
              <div>
                <h2 className="text-2xl font-bold mb-6">{t.recent}</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {displayedPosts.filter(post => post.id !== featuredPost?.id).map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image 
                          src={post.image || '/images/blog/placeholder.jpg'} 
                          alt={post.title[locale as keyof typeof post.title] || ''} 
                          fill
                          style={{objectFit: "cover"}}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.date, locale)}</span>
                          <span className="mx-2">•</span>
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{post.readTime} {t.minutes}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">
                          {post.title[locale as keyof typeof post.title] || post.title.en}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en}
                        </p>
                        <Link href={`/${locale}/blog/${post.id}`} className="inline-flex items-center text-primary font-medium">
                          {t.readMore} <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">{t.categories}</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <div className={`flex items-center justify-between p-2 rounded-md ${selectedCategory === category.id ? 'bg-primary-light text-primary' : 'hover:bg-gray-100'}`}>
                        <span>{category.name[locale as keyof typeof category.name] || category.name.en}</span>
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                          {category.count}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Popular Tags */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">{t.popularTags}</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <span key={tag.id} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {tag.name[locale as keyof typeof tag.name] || tag.name.en}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Subscription */}
              <div className="bg-primary text-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{t.subscribe}</h3>
                <p className="mb-4">{t.subscribeDescription}</p>
                <div className="mb-3">
                  <input 
                    type="email" 
                    placeholder={t.emailPlaceholder}
                    className="w-full p-3 rounded-md text-gray-800"
                  />
                </div>
                <button className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-4 rounded-md transition-colors">
                  {t.subscribeButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer locale={locale} dictionary={dict} />
    </main>
  );
} 