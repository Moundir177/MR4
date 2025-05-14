'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MagnifyingGlassIcon,
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';

// Instructors page dictionary
const instructorsDictionary = {
  en: {
    title: 'Our Instructors',
    subtitle: 'Learn from industry experts with real-world experience',
    search: 'Search instructors...',
    filter: 'Filter By',
    all: 'All Categories',
    rating: 'Rating',
    students: 'students',
    courses: 'courses',
    reviews: 'reviews',
    viewProfile: 'View Profile',
    back: 'Back',
    instructorSince: 'Instructor since',
    topInstructors: 'Top Instructors',
    noResults: 'No instructors found matching your search',
    webDevelopment: 'Web Development',
    dataScience: 'Data Science',
    mobileDevelopment: 'Mobile Development',
    design: 'Design',
    programming: 'Programming',
    marketing: 'Marketing',
  },
  fr: {
    title: 'Nos Instructeurs',
    subtitle: 'Apprenez avec des experts de l\'industrie ayant une expérience concrète',
    search: 'Rechercher des instructeurs...',
    filter: 'Filtrer Par',
    all: 'Toutes les Catégories',
    rating: 'Évaluation',
    students: 'étudiants',
    courses: 'cours',
    reviews: 'avis',
    viewProfile: 'Voir le Profil',
    back: 'Retour',
    instructorSince: 'Instructeur depuis',
    topInstructors: 'Meilleurs Instructeurs',
    noResults: 'Aucun instructeur trouvé correspondant à votre recherche',
    webDevelopment: 'Développement Web',
    dataScience: 'Science des Données',
    mobileDevelopment: 'Développement Mobile',
    design: 'Design',
    programming: 'Programmation',
    marketing: 'Marketing',
  },
  ar: {
    title: 'المدربون',
    subtitle: 'تعلم من خبراء الصناعة ذوي الخبرة العملية',
    search: 'البحث عن مدربين...',
    filter: 'تصفية حسب',
    all: 'جميع الفئات',
    rating: 'التقييم',
    students: 'طلاب',
    courses: 'دورات',
    reviews: 'تقييمات',
    viewProfile: 'عرض الملف الشخصي',
    back: 'رجوع',
    instructorSince: 'مدرب منذ',
    topInstructors: 'أفضل المدربين',
    noResults: 'لم يتم العثور على مدربين مطابقين لبحثك',
    webDevelopment: 'تطوير الويب',
    dataScience: 'علوم البيانات',
    mobileDevelopment: 'تطوير الجوال',
    design: 'تصميم',
    programming: 'برمجة',
    marketing: 'تسويق',
  }
};

// Instructor categories
const categories = [
  { id: 'all', name: { en: 'All Categories', fr: 'Toutes les Catégories', ar: 'جميع الفئات' } },
  { id: 'web-development', name: { en: 'Web Development', fr: 'Développement Web', ar: 'تطوير الويب' } },
  { id: 'data-science', name: { en: 'Data Science', fr: 'Science des Données', ar: 'علوم البيانات' } },
  { id: 'mobile-development', name: { en: 'Mobile Development', fr: 'Développement Mobile', ar: 'تطوير الجوال' } },
  { id: 'design', name: { en: 'Design', fr: 'Design', ar: 'تصميم' } },
  { id: 'programming', name: { en: 'Programming', fr: 'Programmation', ar: 'برمجة' } },
  { id: 'marketing', name: { en: 'Marketing', fr: 'Marketing', ar: 'تسويق' } },
];

// Mock instructor data
const instructorsData = [
  {
    id: 'instructor1',
    name: 'Ahmed Hassan',
    title: {
      en: 'Senior Web Developer & Instructor',
      fr: 'Développeur Web Senior & Instructeur',
      ar: 'مطور ويب كبير ومدرب'
    },
    avatar: '/images/instructors/ahmed.jpg',
    bio: {
      en: 'Experienced web developer with over 10 years of industry experience. Specializes in frontend development with React and modern JavaScript.',
      fr: 'Développeur web expérimenté avec plus de 10 ans d\'expérience dans l\'industrie. Spécialisé dans le développement frontend avec React et JavaScript moderne.',
      ar: 'مطور ويب ذو خبرة مع أكثر من 10 سنوات من الخبرة في الصناعة. متخصص في تطوير الواجهة الأمامية باستخدام React و JavaScript الحديثة.'
    },
    rating: 4.8,
    reviews: 1245,
    students: 50000,
    courses: 15,
    category: 'web-development',
    featured: true,
    joinedDate: '2018-05-15'
  },
  {
    id: 'instructor2',
    name: 'Sarah Johnson',
    title: {
      en: 'Data Scientist & Machine Learning Expert',
      fr: 'Data Scientist & Experte en Machine Learning',
      ar: 'عالمة بيانات وخبيرة في تعلم الآلة'
    },
    avatar: '/images/instructors/sarah.jpg',
    bio: {
      en: 'Data scientist with expertise in machine learning and AI. Former researcher at MIT and has worked with Fortune 500 companies on data-driven solutions.',
      fr: 'Data scientist avec une expertise en machine learning et IA. Ancienne chercheuse au MIT et a travaillé avec des entreprises du Fortune 500 sur des solutions basées sur les données.',
      ar: 'عالمة بيانات متخصصة في تعلم الآلة والذكاء الاصطناعي. باحثة سابقة في معهد ماساتشوستس للتكنولوجيا وعملت مع شركات فورتشن 500 على حلول قائمة على البيانات.'
    },
    rating: 4.9,
    reviews: 980,
    students: 42000,
    courses: 10,
    category: 'data-science',
    featured: true,
    joinedDate: '2019-02-10'
  },
  {
    id: 'instructor3',
    name: 'Mohammed Ali',
    title: {
      en: 'Mobile App Developer & UI/UX Designer',
      fr: 'Développeur d\'Applications Mobiles & Designer UI/UX',
      ar: 'مطور تطبيقات جوال ومصمم واجهة وتجربة المستخدم'
    },
    avatar: '/images/instructors/mohammed.jpg',
    bio: {
      en: 'Mobile app specialist with experience developing for iOS and Android. Passionate about creating beautiful, user-friendly experiences across platforms.',
      fr: 'Spécialiste des applications mobiles avec une expérience de développement pour iOS et Android. Passionné par la création d\'expériences belles et conviviales sur toutes les plateformes.',
      ar: 'متخصص في تطبيقات الجوال مع خبرة في التطوير لنظامي iOS و Android. شغوف بإنشاء تجارب جميلة وسهلة الاستخدام عبر المنصات المختلفة.'
    },
    rating: 4.7,
    reviews: 756,
    students: 35000,
    courses: 8,
    category: 'mobile-development',
    featured: false,
    joinedDate: '2020-03-22'
  },
  {
    id: 'instructor4',
    name: 'Emma Garcia',
    title: {
      en: 'UX Designer & Creative Director',
      fr: 'Designer UX & Directrice Créative',
      ar: 'مصممة تجربة المستخدم ومديرة إبداعية'
    },
    avatar: '/images/instructors/emma.jpg',
    bio: {
      en: 'Award-winning designer with a focus on user experience and interface design. Has worked with startups and established companies to create intuitive digital products.',
      fr: 'Designer primée spécialisée dans l\'expérience utilisateur et la conception d\'interfaces. A travaillé avec des startups et des entreprises établies pour créer des produits numériques intuitifs.',
      ar: 'مصممة حائزة على جوائز متخصصة في تجربة المستخدم وتصميم الواجهات. عملت مع الشركات الناشئة والشركات القائمة لإنشاء منتجات رقمية بديهية.'
    },
    rating: 4.9,
    reviews: 845,
    students: 38000,
    courses: 6,
    category: 'design',
    featured: true,
    joinedDate: '2019-08-15'
  },
  {
    id: 'instructor5',
    name: 'David Chen',
    title: {
      en: 'Software Engineer & Programming Coach',
      fr: 'Ingénieur Logiciel & Coach en Programmation',
      ar: 'مهندس برمجيات ومدرب برمجة'
    },
    avatar: '/images/instructors/david.jpg',
    bio: {
      en: 'Passionate about teaching programming fundamentals and software engineering principles. Former senior engineer at Google with expertise in algorithms and system design.',
      fr: 'Passionné par l\'enseignement des principes fondamentaux de la programmation et de l\'ingénierie logicielle. Ancien ingénieur senior chez Google avec une expertise en algorithmes et conception de systèmes.',
      ar: 'شغوف بتدريس أساسيات البرمجة ومبادئ هندسة البرمجيات. مهندس أول سابق في Google مع خبرة في الخوارزميات وتصميم النظم.'
    },
    rating: 4.8,
    reviews: 1120,
    students: 47000,
    courses: 12,
    category: 'programming',
    featured: false,
    joinedDate: '2018-11-05'
  },
  {
    id: 'instructor6',
    name: 'Lisa Williams',
    title: {
      en: 'Digital Marketing Strategist',
      fr: 'Stratégiste en Marketing Digital',
      ar: 'استراتيجية التسويق الرقمي'
    },
    avatar: '/images/instructors/lisa.jpg',
    bio: {
      en: 'Digital marketing expert specializing in social media, SEO, and content marketing. Has helped businesses of all sizes grow their online presence and increase conversions.',
      fr: 'Experte en marketing digital spécialisée dans les médias sociaux, le SEO et le marketing de contenu. A aidé des entreprises de toutes tailles à développer leur présence en ligne et à augmenter leurs conversions.',
      ar: 'خبيرة في التسويق الرقمي متخصصة في وسائل التواصل الاجتماعي وتحسين محركات البحث وتسويق المحتوى. ساعدت الشركات من جميع الأحجام على تنمية وجودها عبر الإنترنت وزيادة التحويلات.'
    },
    rating: 4.7,
    reviews: 685,
    students: 32000,
    courses: 9,
    category: 'marketing',
    featured: false,
    joinedDate: '2020-01-18'
  }
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
  const year = date.getFullYear();
  
  return `${month} ${year}`;
};

export default function InstructorsPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = instructorsDictionary[locale as keyof typeof instructorsDictionary] || instructorsDictionary.en;
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter instructors based on active filters and search
  const filteredInstructors = instructorsData.filter(instructor => {
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || instructor.category === selectedCategory;
    
    // Filter by search
    const matchesSearch = searchQuery === '' || 
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.title[locale as keyof typeof instructor.title]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      instructor.bio[locale as keyof typeof instructor.bio]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Get featured instructors
  const featuredInstructors = instructorsData.filter(instructor => instructor.featured);
  
  // Get category name based on locale
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name[locale as keyof typeof category.name] : categoryId;
  };
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>{dictionary.back}</span>
        </Link>
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>
        
        {/* Top Instructors Section */}
        {featuredInstructors.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{dictionary.topInstructors}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInstructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={instructor.avatar}
                          alt={instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{instructor.name}</h3>
                        <p className="text-sm text-gray-600">{instructor.title[locale as keyof typeof instructor.title]}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 font-medium text-gray-800">{instructor.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({instructor.reviews} {dictionary.reviews})</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{instructor.students.toLocaleString()} {dictionary.students}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpenIcon className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{instructor.courses} {dictionary.courses}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {instructor.bio[locale as keyof typeof instructor.bio]}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {dictionary.instructorSince} {formatDate(instructor.joinedDate, locale)}
                      </div>
                      <Link
                        href={`/${locale}/instructors/${instructor.id}`}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        {dictionary.viewProfile}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
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
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">{dictionary.filter}:</span>
              <select
                className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name[locale as keyof typeof category.name]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Instructors Grid */}
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={instructor.avatar}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{instructor.name}</h3>
                      <p className="text-sm text-gray-600">{instructor.title[locale as keyof typeof instructor.title]}</p>
                      <div className="mt-1">
                        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                          {getCategoryName(instructor.category)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 font-medium text-gray-800">{instructor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({instructor.reviews} {dictionary.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{instructor.students.toLocaleString()} {dictionary.students}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpenIcon className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{instructor.courses} {dictionary.courses}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {instructor.bio[locale as keyof typeof instructor.bio]}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {dictionary.instructorSince} {formatDate(instructor.joinedDate, locale)}
                    </div>
                    <Link
                      href={`/${locale}/instructors/${instructor.id}`}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {dictionary.viewProfile}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <AcademicCapIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">{dictionary.noResults}</h3>
          </div>
        )}
      </div>
    </main>
  );
} 