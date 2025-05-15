'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ClockIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  StarIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  ShoppingCartIcon,
  HeartIcon,
  ChevronDownIcon
} from '@heroicons/react/24/solid';

interface CourseDetailClientProps {
  course: any;
  locale: string;
  dictionary: any;
  levelText: string;
  formattedDate: string;
}

export default function CourseDetailClient({ 
  course, 
  locale, 
  dictionary,
  levelText,
  formattedDate 
}: CourseDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);

  const enrollNow = () => {
    console.log('Enrolling in course:', course.id);
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const toggleCart = () => {
    setInCart(!inCart);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Course Header */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title[locale]}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description[locale]}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-gray-500 ml-1">({course.reviews} {dictionary.reviewsCount})</span>
              </div>
              <div className="flex items-center mr-4">
                <UserGroupIcon className="h-5 w-5 text-gray-500 mr-1" />
                <span>{course.students} {dictionary.students}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-1" />
                <span>{course.duration} {dictionary.hours}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <Image 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                width={40} 
                height={40} 
                className="rounded-full mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">{dictionary.instructor}: <span className="font-medium">{course.instructor.name}</span></span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">{dictionary.lastUpdated}: {formattedDate}</span>
              <span className="mr-4">{dictionary.difficultyLevel}: {levelText}</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="relative mb-4 rounded-lg overflow-hidden">
              <Image 
                src={course.thumbnail} 
                alt={course.title[locale]} 
                width={500} 
                height={300} 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition">
                  <PlayCircleIcon className="h-10 w-10 text-primary" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {dictionary.preview}
              </div>
            </div>
            
            <div className="mb-4">
              {course.price > 0 ? (
                <div className="text-2xl font-bold">${course.price}</div>
              ) : (
                <div className="text-2xl font-bold text-green-600">{dictionary.free}</div>
              )}
            </div>
            
            <button 
              onClick={enrollNow}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold mb-3 hover:bg-primary-dark transition"
            >
              {dictionary.enrollNow}
            </button>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={toggleCart}
                className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-500 transition"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                {inCart ? 'Remove from Cart' : dictionary.addToCart}
              </button>
              <button 
                onClick={toggleWishlist}
                className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-500 transition"
              >
                {inWishlist ? (
                  <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 mr-2" />
                )}
                {dictionary.addToWishlist}
              </button>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <h3 className="font-medium mb-3">{dictionary.courseIncludes}:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{course.duration} {dictionary.hours}</span>
                </li>
                <li className="flex items-center">
                  <AcademicCapIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{course.lessons} {dictionary.lessons}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{dictionary.certificate}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{dictionary.lifetime}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{dictionary.resources}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {dictionary.overview}
          </button>
          <button 
            onClick={() => setActiveTab('curriculum')}
            className={`pb-3 px-4 font-medium ${activeTab === 'curriculum' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {dictionary.curriculum}
          </button>
          <button 
            onClick={() => setActiveTab('instructor')}
            className={`pb-3 px-4 font-medium ${activeTab === 'instructor' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {dictionary.instructor}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-4 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {dictionary.reviews}
          </button>
        </div>
        
        {/* Tab Content */}
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">{dictionary.whatYouWillLearn}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{outcome[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">{dictionary.courseDescription}</h2>
              <div className="prose dark:prose-invert max-w-none">
                {course.fullDescription[locale].split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">{dictionary.requirements}</h2>
              <ul className="list-disc list-inside space-y-2">
                {course.requirements.map((req: any, index: number) => (
                  <li key={index}>{req[locale]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div>
            <h2 className="text-xl font-bold mb-4">{dictionary.curriculum}</h2>
            <div className="space-y-4">
              {course.curriculum.map((section: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{section.title[locale]}</h3>
                      <div className="text-sm text-gray-500">
                        {section.lessons} {dictionary.lessons} • {section.duration} {dictionary.hours}
                      </div>
                    </div>
                    <button className="text-primary">
                      <ChevronDownIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Instructor Tab */}
        {activeTab === 'instructor' && (
          <div>
            <h2 className="text-xl font-bold mb-6">{dictionary.instructor}</h2>
            <div className="flex items-start">
              <Image 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                width={100} 
                height={100} 
                className="rounded-full mr-6"
              />
              <div>
                <h3 className="text-xl font-medium mb-2">{course.instructor.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.instructor.bio[locale]}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="mr-6">
                <div className="text-5xl font-bold">{course.rating}</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">{course.reviews} {dictionary.reviewsCount}</div>
              </div>
              <div className="flex-1">
                <div className="text-center text-gray-500">
                  Reviews distribution chart would go here
                </div>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500">This is a demo. In a real application, student reviews would be displayed here.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Related Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{dictionary.relatedCourses}</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">This is a demo. In a real application, related courses would be displayed here.</p>
        </div>
      </div>
    </div>
  );
} 