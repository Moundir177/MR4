import React from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ClockIcon,
  UserGroupIcon, 
  AcademicCapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import type { Locale } from '@/i18n/settings';

interface ProgramsPageProps {
  params: {
    locale: Locale;
  };
}

// Sample program data - would typically come from an API or CMS
const programs = [
  {
    id: 'software-engineering',
    title: 'Software Engineering Bootcamp',
    description: 'An intensive program to transform you into a job-ready software engineer in just 12 weeks. Learn full-stack development with modern technologies.',
    fullDescription: 'Our flagship Software Engineering Bootcamp is designed to take you from beginner to professional in just 12 weeks. Through a combination of hands-on projects, collaborative work, and industry mentorship, you\'ll gain the practical skills needed to succeed in today\'s tech industry. Our curriculum is regularly updated to reflect the latest technologies and best practices, ensuring you graduate with relevant and in-demand skills.',
    duration: '12 weeks',
    format: 'Full-time, In-person',
    startDates: ['2023-09-01', '2023-11-15', '2024-01-10'],
    price: '$5,999',
    image: '/images/programs/software-engineering.jpg',
    features: [
      'Full-stack JavaScript development',
      'Real-world team projects',
      'Industry mentorship',
      'Career services and job placement assistance',
      'Post-graduation support',
      'Portfolio development'
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science Professional Program',
    description: 'Master the fundamentals of data science, machine learning, and AI in this comprehensive program designed for aspiring data scientists.',
    fullDescription: 'Our Data Science Professional Program equips you with the skills and knowledge needed to excel in this rapidly growing field. From statistical analysis and data visualization to machine learning algorithms and predictive modeling, you\'ll develop a comprehensive understanding of data science principles and applications. Through practical projects using real-world datasets, you\'ll build a professional portfolio while gaining hands-on experience with industry-standard tools.',
    duration: '16 weeks',
    format: 'Part-time, Online & In-person',
    startDates: ['2023-08-15', '2023-10-20', '2024-01-20'],
    price: '$6,499',
    image: '/images/programs/data-science.jpg',
    features: [
      'Python for data analysis',
      'Machine learning fundamentals',
      'Big data technologies',
      'Practical projects with real datasets',
      'Industry expert sessions',
      'Career transition support'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Professional Certificate',
    description: 'Develop the strategic and technical skills needed to create and manage successful digital marketing campaigns across platforms.',
    fullDescription: 'The Digital Marketing Professional Certificate program provides a comprehensive understanding of all aspects of digital marketing. From SEO and content marketing to social media strategy and paid advertising, you\'ll learn how to leverage digital channels to reach and engage your target audience. Throughout the program, you\'ll create real campaigns, analyze their performance, and optimize based on data insights, giving you practical experience to apply in your career.',
    duration: '8 weeks',
    format: 'Part-time, Online',
    startDates: ['2023-09-05', '2023-11-10', '2024-02-01'],
    price: '$2,999',
    image: '/images/programs/digital-marketing.jpg',
    features: [
      'SEO & SEM strategies',
      'Social media marketing',
      'Content marketing',
      'Email marketing',
      'Analytics and data-driven decisions',
      'Campaign management'
    ]
  },
  {
    id: 'ux-design',
    title: 'UX Design Immersive',
    description: 'Transform your career with our comprehensive UX design program covering research, wireframing, prototyping, and user testing.',
    fullDescription: 'Our UX Design Immersive program takes you through the entire UX design process, from user research and ideation to prototyping and testing. You\'ll learn how to identify user needs, create intuitive interfaces, and validate your designs through user feedback. By working on projects that simulate real-world scenarios, you\'ll develop a professional portfolio that showcases your design thinking and problem-solving abilities to potential employers.',
    duration: '10 weeks',
    format: 'Full-time, In-person',
    startDates: ['2023-09-15', '2023-12-01', '2024-02-15'],
    price: '$4,999',
    image: '/images/programs/ux-design.jpg',
    features: [
      'User research methods',
      'Information architecture',
      'Wireframing and prototyping',
      'Usability testing',
      'UI design fundamentals',
      'Design systems'
    ]
  }
];

export default async function ProgramsPage({ params: { locale } }: ProgramsPageProps) {
  const dict = await getDictionary(locale);
  
  // Fallback for programs dictionary - using type assertion to avoid type errors
  const programsDict = (dict as any)?.programs ?? {
    title: 'Our Professional Programs',
    subtitle: 'Comprehensive education pathways designed to transform your career',
    explore: 'Explore Program',
    duration: 'Duration',
    format: 'Format',
    startDates: 'Upcoming Start Dates',
    price: 'Program Fee',
    features: 'Program Features',
    allPrograms: 'View All Programs',
    registerInterest: 'Register Interest',
    applyNow: 'Apply Now'
  };
  
  // Format date based on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-neutral-50 pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] mix-blend-overlay opacity-10"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-dark rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-secondary/30 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{programsDict.title}</h1>
            <p className="text-xl text-white/80 mb-8">{programsDict.subtitle}</p>
          </div>
        </div>
      </div>
      
      {/* Programs List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {programs.map((program, index) => (
            <div 
              key={program.id}
              className={`flex flex-col lg:flex-row gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Program Image */}
              <div className="lg:w-5/12">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="inline-block bg-primary text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                      {program.duration}
                    </div>
                    <h3 className="text-white text-xl font-bold">{program.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Program Content */}
              <div className="lg:w-7/12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{program.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.fullDescription}</p>
                
                {/* Program Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <ClockIcon className="w-5 h-5 text-primary" />
                      <h4 className="ml-2 text-sm font-semibold text-gray-600">{programsDict.duration}</h4>
                    </div>
                    <p className="text-gray-800 font-medium">{program.duration}</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <UserGroupIcon className="w-5 h-5 text-primary" />
                      <h4 className="ml-2 text-sm font-semibold text-gray-600">{programsDict.format}</h4>
                    </div>
                    <p className="text-gray-800 font-medium">{program.format}</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <h4 className="ml-2 text-sm font-semibold text-gray-600">{programsDict.startDates}</h4>
                    </div>
                    <p className="text-gray-800 font-medium">{formatDate(program.startDates[0])}</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <AcademicCapIcon className="w-5 h-5 text-primary" />
                      <h4 className="ml-2 text-sm font-semibold text-gray-600">{programsDict.price}</h4>
                    </div>
                    <p className="text-gray-800 font-medium">{program.price}</p>
                  </div>
                </div>
                
                {/* Program Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{programsDict.features}</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="ml-2 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/${locale}/programs/${program.id}`}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    {programsDict.explore}
                  </Link>
                  <Link 
                    href={`/${locale}/contact?program=${program.id}`}
                    className="px-6 py-3 bg-white border border-primary hover:bg-gray-50 text-primary font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    {programsDict.registerInterest}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 