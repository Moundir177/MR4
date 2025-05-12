'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';

// Courses page dictionary
const coursesDictionary = {
  en: {
    title: 'Courses',
    subtitle: 'Explore our wide range of courses',
    search: 'Search courses...',
    filter: 'Filter',
    sort: 'Sort',
    categories: 'Categories',
    levels: 'Levels',
    price: 'Price',
    duration: 'Duration',
    all: 'All',
    free: 'Free',
    paid: 'Paid',
    hours: 'hours',
    lessons: 'lessons',
    students: 'students',
    reviews: 'reviews',
    viewCourse: 'View Course',
    mostPopular: 'Most Popular',
    newest: 'Newest',
    highestRated: 'Highest Rated',
    beginners: 'Beginners',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    allLevels: 'All Levels',
    shortCourses: 'Short Courses',
    webDevelopment: 'Web Development',
    dataScience: 'Data Science',
    mobileDevelopment: 'Mobile Development',
    design: 'Design',
    programming: 'Programming',
    marketing: 'Marketing',
    noCoursesFound: 'No courses found matching your criteria',
    clearFilters: 'Clear Filters',
    instructedBy: 'Instructed by',
    lastUpdated: 'Last updated',
    applyFilters: 'Apply Filters',
    showingResults: 'Showing results',
    browseCategories: 'Browse by Category',
    featuredCourses: 'Featured Courses',
  },
  fr: {
    title: 'Cours',
    subtitle: 'Explorez notre large gamme de cours',
    search: 'Rechercher des cours...',
    filter: 'Filtrer',
    sort: 'Trier',
    categories: 'Catégories',
    levels: 'Niveaux',
    price: 'Prix',
    duration: 'Durée',
    all: 'Tous',
    free: 'Gratuit',
    paid: 'Payant',
    hours: 'heures',
    lessons: 'leçons',
    students: 'étudiants',
    reviews: 'avis',
    viewCourse: 'Voir le Cours',
    mostPopular: 'Plus Populaires',
    newest: 'Plus Récents',
    highestRated: 'Mieux Notés',
    beginners: 'Débutants',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    allLevels: 'Tous Niveaux',
    shortCourses: 'Cours Courts',
    webDevelopment: 'Développement Web',
    dataScience: 'Science des Données',
    mobileDevelopment: 'Développement Mobile',
    design: 'Design',
    programming: 'Programmation',
    marketing: 'Marketing',
    noCoursesFound: 'Aucun cours trouvé correspondant à vos critères',
    clearFilters: 'Effacer les Filtres',
    instructedBy: 'Enseigné par',
    lastUpdated: 'Dernière mise à jour',
    applyFilters: 'Appliquer les Filtres',
    showingResults: 'Affichage des résultats',
    browseCategories: 'Parcourir par Catégorie',
    featuredCourses: 'Cours en Vedette',
  },
  ar: {
    title: 'الدورات',
    subtitle: 'استكشف مجموعتنا الواسعة من الدورات',
    search: 'البحث عن دورات...',
    filter: 'تصفية',
    sort: 'ترتيب',
    categories: 'الفئات',
    levels: 'المستويات',
    price: 'السعر',
    duration: 'المدة',
    all: 'الكل',
    free: 'مجاني',
    paid: 'مدفوع',
    hours: 'ساعات',
    lessons: 'دروس',
    students: 'طلاب',
    reviews: 'تقييمات',
    viewCourse: 'عرض الدورة',
    mostPopular: 'الأكثر شعبية',
    newest: 'الأحدث',
    highestRated: 'الأعلى تقييماً',
    beginners: 'مبتدئين',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    allLevels: 'جميع المستويات',
    shortCourses: 'دورات قصيرة',
    webDevelopment: 'تطوير الويب',
    dataScience: 'علوم البيانات',
    mobileDevelopment: 'تطوير الجوال',
    design: 'تصميم',
    programming: 'برمجة',
    marketing: 'تسويق',
    noCoursesFound: 'لم يتم العثور على دورات تطابق معاييرك',
    clearFilters: 'مسح التصفية',
    instructedBy: 'يُدرسها',
    lastUpdated: 'آخر تحديث',
    applyFilters: 'تطبيق التصفية',
    showingResults: 'عرض النتائج',
    browseCategories: 'تصفح حسب الفئة',
    featuredCourses: 'الدورات المميزة',
  }
};

// Course categories
const categories = [
  { id: 'web-development', name: { en: 'Web Development', fr: 'Développement Web', ar: 'تطوير الويب' }, count: 18 },
  { id: 'data-science', name: { en: 'Data Science', fr: 'Science des Données', ar: 'علوم البيانات' }, count: 12 },
  { id: 'mobile-development', name: { en: 'Mobile Development', fr: 'Développement Mobile', ar: 'تطوير الجوال' }, count: 8 },
  { id: 'design', name: { en: 'Design', fr: 'Design', ar: 'تصميم' }, count: 10 },
  { id: 'programming', name: { en: 'Programming', fr: 'Programmation', ar: 'برمجة' }, count: 15 },
  { id: 'marketing', name: { en: 'Marketing', fr: 'Marketing', ar: 'تسويق' }, count: 6 },
];

// Mock course data
const coursesData = [
  {
    id: 'course1',
    title: {
      en: 'Web Development Fundamentals',
      fr: 'Fondamentaux du Développement Web',
      ar: 'أساسيات تطوير الويب'
    },
    description: {
      en: 'Learn the core concepts of HTML, CSS, and JavaScript to build modern websites.',
      fr: 'Apprenez les concepts fondamentaux de HTML, CSS et JavaScript pour créer des sites web modernes.',
      ar: 'تعلم المفاهيم الأساسية لـ HTML و CSS و JavaScript لبناء مواقع ويب حديثة.'
    },
    thumbnail: '/images/courses/web-dev.jpg',
    instructor: {
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg'
    },
    rating: 4.8,
    reviews: 342,
    students: 1245,
    level: 'beginner',
    duration: 12.5,
    lessons: 48,
    price: 49.99,
    category: 'web-development',
    featured: true,
    lastUpdated: '2023-10-15'
  },
  {
    id: 'course2',
    title: {
      en: 'Data Science Essentials',
      fr: 'Fondamentaux de la Science des Données',
      ar: 'أساسيات علوم البيانات'
    },
    description: {
      en: 'Explore the fundamentals of data analysis, visualization, and machine learning.',
      fr: 'Explorez les fondamentaux de l\'analyse de données, la visualisation et l\'apprentissage automatique.',
      ar: 'استكشف أساسيات تحليل البيانات والتصور والتعلم الآلي.'
    },
    thumbnail: '/images/courses/data-science.jpg',
    instructor: {
      name: 'Sarah Johnson',
      avatar: '/images/instructors/sarah.jpg'
    },
    rating: 4.7,
    reviews: 215,
    students: 980,
    level: 'intermediate',
    duration: 15,
    lessons: 52,
    price: 59.99,
    category: 'data-science',
    featured: true,
    lastUpdated: '2023-09-28'
  },
  {
    id: 'course3',
    title: {
      en: 'UI/UX Design Principles',
      fr: 'Principes de Design UI/UX',
      ar: 'مبادئ تصميم واجهة المستخدم'
    },
    description: {
      en: 'Learn the core principles of user interface and user experience design.',
      fr: 'Apprenez les principes fondamentaux de la conception d\'interface utilisateur et d\'expérience utilisateur.',
      ar: 'تعلم المبادئ الأساسية لتصميم واجهة المستخدم وتجربة المستخدم.'
    },
    thumbnail: '/images/courses/ui-ux.jpg',
    instructor: {
      name: 'Emma Garcia',
      avatar: '/images/instructors/emma.jpg'
    },
    rating: 4.9,
    reviews: 178,
    students: 856,
    level: 'beginner',
    duration: 10,
    lessons: 36,
    price: 39.99,
    category: 'design',
    featured: false,
    lastUpdated: '2023-09-10'
  },
  {
    id: 'course4',
    title: {
      en: 'Advanced React.js',
      fr: 'React.js Avancé',
      ar: 'React.js المتقدمة'
    },
    description: {
      en: 'Master React.js hooks, context API, and build complex applications with Redux.',
      fr: 'Maîtrisez les hooks React.js, l\'API Context, et construisez des applications complexes avec Redux.',
      ar: 'أتقن الـ hooks في React.js وواجهة برمجة التطبيقات Context وقم ببناء تطبيقات معقدة باستخدام Redux.'
    },
    thumbnail: '/images/courses/react.jpg',
    instructor: {
      name: 'Mohammed Ali',
      avatar: '/images/instructors/mohammed.jpg'
    },
    rating: 4.6,
    reviews: 132,
    students: 723,
    level: 'advanced',
    duration: 18,
    lessons: 64,
    price: 69.99,
    category: 'web-development',
    featured: false,
    lastUpdated: '2023-08-15'
  },
  {
    id: 'course5',
    title: {
      en: 'Mobile App Development with Flutter',
      fr: 'Développement d\'Applications Mobiles avec Flutter',
      ar: 'تطوير تطبيقات الجوال باستخدام Flutter'
    },
    description: {
      en: 'Build cross-platform mobile applications with Google\'s Flutter framework.',
      fr: 'Créez des applications mobiles multiplateformes avec le framework Flutter de Google.',
      ar: 'ابني تطبيقات جوال متعددة المنصات باستخدام إطار عمل Flutter من Google.'
    },
    thumbnail: '/images/courses/flutter.jpg',
    instructor: {
      name: 'Ahmed Hassan',
      avatar: '/images/instructors/ahmed.jpg'
    },
    rating: 4.8,
    reviews: 96,
    students: 512,
    level: 'intermediate',
    duration: 16,
    lessons: 58,
    price: 0,
    category: 'mobile-development',
    featured: true,
    lastUpdated: '2023-07-22'
  },
  {
    id: 'course6',
    title: {
      en: 'Digital Marketing Fundamentals',
      fr: 'Fondamentaux du Marketing Digital',
      ar: 'أساسيات التسويق الرقمي'
    },
    description: {
      en: 'Learn the essential strategies and tools for effective online marketing.',
      fr: 'Apprenez les stratégies et outils essentiels pour un marketing en ligne efficace.',
      ar: 'تعلم الاستراتيجيات والأدوات الأساسية للتسويق الفعال عبر الإنترنت.'
    },
    thumbnail: '/images/courses/marketing.jpg',
    instructor: {
      name: 'Emma Garcia',
      avatar: '/images/instructors/emma.jpg'
    },
    rating: 4.5,
    reviews: 87,
    students: 435,
    level: 'beginner',
    duration: 8,
    lessons: 32,
    price: 29.99,
    category: 'marketing',
    featured: false,
    lastUpdated: '2023-06-15'
  }
];

// Format date for specific locale
const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  
  if (locale === 'en') {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else if (locale === 'fr') {
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else if (locale === 'ar') {
    return date.toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else {
    return date.toLocaleDateString();
  }
};

export default function CoursesPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = coursesDictionary[locale as keyof typeof coursesDictionary] || coursesDictionary.en;
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  
  // Filter courses based on active filters and search
  const filteredCourses = coursesData.filter(course => {
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    // Filter by level
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    // Filter by price
    const matchesPrice = 
      selectedPrice === 'all' || 
      (selectedPrice === 'free' && course.price === 0) ||
      (selectedPrice === 'paid' && course.price > 0);
    
    // Filter by search
    const matchesSearch = searchQuery === '' || 
      course.title[locale as keyof typeof course.title]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.description[locale as keyof typeof course.description]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
  });
  
  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === 'popular') {
      // Sort by number of students
      return b.students - a.students;
    } else if (sortOption === 'newest') {
      // Sort by last updated date
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    } else {
      // Sort by rating
      return b.rating - a.rating;
    }
  });
  
  // Get featured courses
  const featuredCourses = coursesData.filter(course => course.featured);
  
  // Reset all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSortOption('popular');
  };
  
  // Get category name based on locale
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name[locale as keyof typeof category.name] : categoryId;
  };
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>
        
        {/* Featured Courses */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{dictionary.featuredCourses}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={course.thumbnail}
                    alt={course.title[locale as keyof typeof course.title] || ''}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                      {getCategoryName(course.category)}
                    </span>
                    <div className="ml-auto flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-800">{course.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {course.title[locale as keyof typeof course.title]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description[locale as keyof typeof course.description]}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600">{dictionary.instructedBy} <span className="font-medium text-gray-800">{course.instructor.name}</span></span>
                  </div>
                  <div className="flex text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{course.duration} {dictionary.hours}</span>
                    </div>
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-4 w-4 mr-1" />
                      <span>{course.lessons} {dictionary.lessons}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg text-gray-800">
                      {course.price === 0 ? dictionary.free : `$${course.price.toFixed(2)}`}
                    </div>
                    <Link
                      href={`/${locale}/courses/${course.id}`}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                    >
                      {dictionary.viewCourse}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{dictionary.filter}</h3>
              
              {/* Categories Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">{dictionary.categories}</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                      {dictionary.all}
                    </label>
                  </div>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                        {category.name[locale as keyof typeof category.name]}
                        <span className="text-gray-500 ml-1">({category.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Levels Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">{dictionary.levels}</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="level-all"
                      name="level"
                      checked={selectedLevel === 'all'}
                      onChange={() => setSelectedLevel('all')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="level-all" className="ml-2 text-sm text-gray-700">
                      {dictionary.all}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="level-beginner"
                      name="level"
                      checked={selectedLevel === 'beginner'}
                      onChange={() => setSelectedLevel('beginner')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="level-beginner" className="ml-2 text-sm text-gray-700">
                      {dictionary.beginners}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="level-intermediate"
                      name="level"
                      checked={selectedLevel === 'intermediate'}
                      onChange={() => setSelectedLevel('intermediate')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="level-intermediate" className="ml-2 text-sm text-gray-700">
                      {dictionary.intermediate}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="level-advanced"
                      name="level"
                      checked={selectedLevel === 'advanced'}
                      onChange={() => setSelectedLevel('advanced')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="level-advanced" className="ml-2 text-sm text-gray-700">
                      {dictionary.advanced}
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">{dictionary.price}</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-all"
                      name="price"
                      checked={selectedPrice === 'all'}
                      onChange={() => setSelectedPrice('all')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="price-all" className="ml-2 text-sm text-gray-700">
                      {dictionary.all}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-free"
                      name="price"
                      checked={selectedPrice === 'free'}
                      onChange={() => setSelectedPrice('free')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="price-free" className="ml-2 text-sm text-gray-700">
                      {dictionary.free}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-paid"
                      name="price"
                      checked={selectedPrice === 'paid'}
                      onChange={() => setSelectedPrice('paid')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="price-paid" className="ml-2 text-sm text-gray-700">
                      {dictionary.paid}
                    </label>
                  </div>
                </div>
              </div>
              
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                {dictionary.clearFilters}
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
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
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{dictionary.sort}:</span>
                  <div className="relative">
                    <select
                      className="appearance-none py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="popular">{dictionary.mostPopular}</option>
                      <option value="newest">{dictionary.newest}</option>
                      <option value="rated">{dictionary.highestRated}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results info */}
            <div className="mb-4 text-sm text-gray-500">
              {dictionary.showingResults}: {sortedCourses.length} {sortedCourses.length === 1 ? dictionary.title.toLowerCase() : dictionary.title.toLowerCase()}
            </div>
            
            {/* Courses Grid */}
            {sortedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={course.thumbnail}
                        alt={course.title[locale as keyof typeof course.title] || ''}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
                        {course.level === 'beginner' && dictionary.beginners}
                        {course.level === 'intermediate' && dictionary.intermediate}
                        {course.level === 'advanced' && dictionary.advanced}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                          {getCategoryName(course.category)}
                        </span>
                        <div className="ml-auto flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium text-gray-800">{course.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {course.title[locale as keyof typeof course.title]}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description[locale as keyof typeof course.description]}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-600">{dictionary.instructedBy} <span className="font-medium text-gray-800">{course.instructor.name}</span></span>
                      </div>
                      <div className="flex text-sm text-gray-500 mb-4">
                        <div className="flex items-center mr-4">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{course.duration} {dictionary.hours}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <AcademicCapIcon className="h-4 w-4 mr-1" />
                          <span>{course.lessons} {dictionary.lessons}</span>
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg text-gray-800">
                          {course.price === 0 ? dictionary.free : `$${course.price.toFixed(2)}`}
                        </div>
                        <Link
                          href={`/${locale}/courses/${course.id}`}
                          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                        >
                          {dictionary.viewCourse}
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
                <h3 className="text-lg font-medium text-gray-800 mb-2">{dictionary.noCoursesFound}</h3>
                <button 
                  onClick={clearFilters}
                  className="mt-2 text-primary hover:text-primary-dark font-medium"
                >
                  {dictionary.clearFilters}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 