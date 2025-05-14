'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PlayIcon,
  ListBulletIcon,
  CheckIcon,
  ClockIcon
} from '@heroicons/react/24/solid';

// Learning page dictionary
const learningDictionary = {
  en: {
    backToCourse: 'Back to Course',
    moduleProgress: 'Module Progress',
    lessonProgress: 'Lesson Progress',
    nextLesson: 'Next Lesson',
    previousLesson: 'Previous Lesson',
    complete: 'Mark as Complete',
    completed: 'Completed',
    module: 'Module',
    lesson: 'Lesson',
    contents: 'Contents',
    videoTranscript: 'Video Transcript',
    resources: 'Additional Resources',
    notes: 'My Notes',
    addNote: 'Add a note...',
    saveNote: 'Save',
    quiz: 'Quiz',
    quizInstructions: 'Select the correct answer for each question.',
    submitQuiz: 'Submit Quiz',
    quizResults: 'Results',
    correctAnswers: 'Correct Answers',
    outOf: 'out of',
    downloadResource: 'Download',
    minutes: 'minutes'
  },
  fr: {
    backToCourse: 'Retour au Cours',
    moduleProgress: 'Progression du Module',
    lessonProgress: 'Progression de la Leçon',
    nextLesson: 'Leçon Suivante',
    previousLesson: 'Leçon Précédente',
    complete: 'Marquer comme Terminé',
    completed: 'Terminé',
    module: 'Module',
    lesson: 'Leçon',
    contents: 'Contenu',
    videoTranscript: 'Transcription Vidéo',
    resources: 'Ressources Supplémentaires',
    notes: 'Mes Notes',
    addNote: 'Ajouter une note...',
    saveNote: 'Enregistrer',
    quiz: 'Quiz',
    quizInstructions: 'Sélectionnez la bonne réponse pour chaque question.',
    submitQuiz: 'Soumettre le Quiz',
    quizResults: 'Résultats',
    correctAnswers: 'Réponses Correctes',
    outOf: 'sur',
    downloadResource: 'Télécharger',
    minutes: 'minutes'
  },
  ar: {
    backToCourse: 'العودة إلى الدورة',
    moduleProgress: 'تقدم الوحدة',
    lessonProgress: 'تقدم الدرس',
    nextLesson: 'الدرس التالي',
    previousLesson: 'الدرس السابق',
    complete: 'وضع علامة مكتمل',
    completed: 'مكتمل',
    module: 'وحدة',
    lesson: 'درس',
    contents: 'المحتويات',
    videoTranscript: 'نص الفيديو',
    resources: 'موارد إضافية',
    notes: 'ملاحظاتي',
    addNote: 'إضافة ملاحظة...',
    saveNote: 'حفظ',
    quiz: 'اختبار',
    quizInstructions: 'اختر الإجابة الصحيحة لكل سؤال.',
    submitQuiz: 'إرسال الاختبار',
    quizResults: 'النتائج',
    correctAnswers: 'الإجابات الصحيحة',
    outOf: 'من',
    downloadResource: 'تحميل',
    minutes: 'دقائق'
  }
};

// Example module content (would come from API)
const moduleData = {
  id: 6,
  title: 'Responsive Web Design',
  progress: 60,
  currentLessonId: 604,
  lessons: [
    {
      id: 601,
      title: 'Introduction to Responsive Design',
      type: 'reading',
      duration: 15,
      status: 'completed',
      content: {
        text: `
          <h2>Introduction to Responsive Web Design</h2>
          
          <p>Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It has become increasingly important with the growth of mobile device usage to browse the web.</p>
          
          <p>Content, design and performance are necessary across all devices to ensure usability and satisfaction. A site designed with responsive design adapts the layout to the viewing environment by using fluid, proportion-based grids, flexible images, and CSS3 media queries.</p>
          
          <h3>Key Principles of Responsive Design</h3>
          
          <ul>
            <li><strong>Fluid Grids:</strong> Using relative units like percentages instead of fixed units like pixels for layout elements.</li>
            <li><strong>Flexible Images:</strong> Images that resize within their containing elements.</li>
            <li><strong>Media Queries:</strong> CSS techniques that allow you to apply different styles based on device characteristics.</li>
          </ul>
          
          <p>In this module, we'll explore each of these principles in depth and learn how to implement them in your web projects.</p>
        `
      }
    },
    {
      id: 602,
      title: 'Media Queries',
      type: 'video',
      duration: 20,
      status: 'completed',
      content: {
        videoUrl: 'https://example.com/videos/media-queries.mp4',
        transcript: `
          Hello and welcome to this lesson on CSS Media Queries. 

          Media queries are a key component of responsive design. They allow you to apply different CSS styles based on the characteristics of the device, such as its width, height, or orientation.

          The basic syntax of a media query looks like this:
          
          @media screen and (max-width: 768px) {
            /* CSS rules for screens up to 768px wide */
          }
          
          This tells the browser: "Apply these styles only when the screen width is 768 pixels or less."
          
          You can also combine conditions:
          
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            /* CSS rules for screens between 768px and 1024px */
          }
          
          Let's look at some common breakpoints used in responsive design:
          
          - Mobile: 320px - 480px
          - Tablets: 481px - 768px
          - Laptops: 769px - 1024px
          - Desktops: 1025px and above
          
          Now, let's create a simple example where we change the layout based on the screen size...
        `
      }
    },
    {
      id: 603,
      title: 'Flexible Layouts',
      type: 'video',
      duration: 20,
      status: 'completed',
      content: {
        videoUrl: 'https://example.com/videos/flexible-layouts.mp4',
        transcript: `
          Welcome back! In this lesson, we'll explore flexible layouts, which are an essential aspect of responsive web design.

          Flexible layouts use relative units instead of fixed units. For instance, we use percentages instead of pixels for widths, allowing elements to resize proportionally as the viewport changes.

          Let's start with a basic example:

          .container {
            width: 80%; /* 80% of the parent element's width */
            max-width: 1200px; /* Prevent it from getting too wide */
            margin: 0 auto; /* Center the container */
          }

          .column {
            width: 33.33%; /* Each column takes up a third of the container */
            float: left;
            padding: 0 15px;
            box-sizing: border-box;
          }

          For smaller screens, we might want to change this layout using media queries:

          @media (max-width: 768px) {
            .column {
              width: 50%; /* Now each column takes half the width */
            }
          }

          @media (max-width: 480px) {
            .column {
              width: 100%; /* Full width on mobile */
            }
          }

          Another important technique is using the 'em' or 'rem' units for typography...
        `
      }
    },
    {
      id: 604,
      title: 'CSS Grid and Flexbox',
      type: 'reading',
      duration: 20,
      status: 'inProgress',
      content: {
        text: `
          <h2>CSS Grid and Flexbox for Responsive Layouts</h2>
          
          <p>Modern CSS layout techniques like Grid and Flexbox have revolutionized how we create responsive designs. These tools are specifically designed to create flexible layouts and make responsive design much easier.</p>
          
          <h3>Flexbox</h3>
          
          <p>Flexbox (Flexible Box Layout) is a one-dimensional layout method designed for laying out items in rows or columns. It excels at:</p>
          
          <ul>
            <li>Aligning items within a container</li>
            <li>Distributing space among items</li>
            <li>Reordering items without changing the HTML</li>
          </ul>
          
          <p>Basic Flexbox example:</p>
          
          <pre>
          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          
          .item {
            flex: 1 1 300px; /* flex-grow, flex-shrink, flex-basis */
            margin: 10px;
          }
          </pre>
          
          <h3>CSS Grid</h3>
          
          <p>CSS Grid is a two-dimensional layout system designed for complex layouts. It allows you to define rows and columns and place items precisely within the grid.</p>
          
          <p>Basic Grid example:</p>
          
          <pre>
          .container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }
          </pre>
          
          <p>This creates a responsive grid where:</p>
          
          <ul>
            <li><code>repeat(auto-fit, ...)</code> creates as many columns as can fit</li>
            <li><code>minmax(300px, 1fr)</code> ensures each column is at least 300px and grows equally</li>
            <li><code>gap: 20px</code> adds spacing between grid items</li>
          </ul>
          
          <h3>Combining Flexbox and Grid</h3>
          
          <p>For the most responsive layouts, you can combine both techniques:</p>
          
          <ul>
            <li>Use Grid for the overall page layout</li>
            <li>Use Flexbox for aligning content within grid items</li>
          </ul>
          
          <p>In the next part, we'll walk through building a complete responsive component using these techniques.</p>
        `
      }
    },
    {
      id: 605,
      title: 'Module Quiz',
      type: 'quiz',
      duration: 10,
      status: 'notStarted',
      content: {
        questions: [
          {
            id: 1,
            question: 'Which of the following is NOT a key principle of responsive web design?',
            options: [
              'Fluid grids',
              'Static dimensions',
              'Flexible images',
              'Media queries'
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'What CSS property declares a flex container?',
            options: [
              'display: block;',
              'display: flex;',
              'position: flex;',
              'flex: container;'
            ],
            correctAnswer: 1
          },
          {
            id: 3,
            question: 'Which unit is most appropriate for responsive typography?',
            options: [
              'px',
              'pt',
              'rem',
              'cm'
            ],
            correctAnswer: 2
          },
          {
            id: 4,
            question: 'What does the following CSS do: @media (max-width: 768px) { ... }',
            options: [
              'Applies styles only on screens exactly 768px wide',
              'Applies styles on screens 768px wide and wider',
              'Applies styles on screens 768px wide and narrower',
              'Applies styles only on screens narrower than 768px'
            ],
            correctAnswer: 2
          },
          {
            id: 5,
            question: 'Which CSS layout method is best suited for complex two-dimensional layouts?',
            options: [
              'Flexbox',
              'Floats',
              'CSS Grid',
              'Positioning'
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ],
  resources: [
    {
      id: 1,
      title: 'CSS Grid Cheat Sheet',
      type: 'pdf',
      url: '/resources/css-grid-cheatsheet.pdf'
    },
    {
      id: 2,
      title: 'Flexbox Guide',
      type: 'pdf',
      url: '/resources/flexbox-guide.pdf'
    },
    {
      id: 3,
      title: 'Responsive Design Examples',
      type: 'link',
      url: 'https://example.com/responsive-examples'
    }
  ]
};

export default function LearningPage() {
  // Get locale and moduleId from pathname since useParams() doesn't work in client components
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const locale = pathParts[1] || 'en';
  const courseId = pathParts[4];
  const moduleId = Number(pathParts[6]);
  
  const dictionary = learningDictionary[locale as keyof typeof learningDictionary] || learningDictionary.en;
  
  // Find current lesson
  const currentLessonIndex = moduleData.lessons.findIndex(lesson => lesson.id === moduleData.currentLessonId);
  const currentLesson = moduleData.lessons[currentLessonIndex];
  
  // Find next and previous lessons
  const previousLesson = currentLessonIndex > 0 ? moduleData.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < moduleData.lessons.length - 1 ? moduleData.lessons[currentLessonIndex + 1] : null;
  
  // State for selected tab
  const [activeTab, setActiveTab] = useState('content');
  
  // State for notes
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');
  
  // State for quizzes
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  // Handle quiz answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (currentLesson.type === 'quiz' && currentLesson.content && currentLesson.content.questions) {
      let score = 0;
      quizAnswers.forEach((answer, index) => {
        if (index < (currentLesson.content!.questions as any[]).length && 
            answer === (currentLesson.content!.questions as any[])[index].correctAnswer) {
          score++;
        }
      });
      setQuizScore(score);
      setQuizSubmitted(true);
    }
  };
  
  // Handle saving notes
  const handleSaveNotes = () => {
    setSavedNotes(notes);
  };
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Navigation */}
        <div className="mb-6">
          <Link 
            href={`/${locale}/dashboard/courses/${courseId}`}
            className="inline-flex items-center text-primary hover:text-primary-dark"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            {dictionary.backToCourse}
          </Link>
        </div>
        
        {/* Module and Lesson Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {dictionary.module} {moduleData.id}: {moduleData.title}
          </h1>
          <h2 className="text-xl text-gray-700 mb-4">
            {dictionary.lesson} {currentLessonIndex + 1}: {currentLesson.title}
          </h2>
          
          <div className="flex items-center text-sm text-gray-600">
            {currentLesson.type === 'video' ? (
              <PlayIcon className="w-4 h-4 mr-1" />
            ) : currentLesson.type === 'reading' ? (
              <DocumentTextIcon className="w-4 h-4 mr-1" />
            ) : (
              <DocumentTextIcon className="w-4 h-4 mr-1" />
            )}
            <span className="capitalize mr-3">{currentLesson.type}</span>
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>{currentLesson.duration} {dictionary.minutes}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Content Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'content' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.contents}
              </button>
              
              {currentLesson.type === 'video' && (
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                    activeTab === 'transcript' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {dictionary.videoTranscript}
                </button>
              )}
              
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'resources' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.resources}
              </button>
              
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 whitespace-nowrap font-medium text-sm border-b-2 ${
                  activeTab === 'notes' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {dictionary.notes}
              </button>
            </div>
            
            {/* Lesson Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {activeTab === 'content' && (
                <div>
                  {currentLesson.type === 'reading' && currentLesson.content && currentLesson.content.text && (
                    <div 
                      className="prose prose-primary max-w-none"
                      dangerouslySetInnerHTML={{ __html: currentLesson.content.text }}
                    />
                  )}
                  
                  {currentLesson.type === 'reading' && currentLesson.content && !currentLesson.content.text && (
                    <div className="text-gray-600">No content available</div>
                  )}
                  
                  {currentLesson.type === 'video' && (
                    <div>
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <PlayIcon className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-gray-600">Video player would be implemented here with the actual video from: {currentLesson.content.videoUrl}</p>
                    </div>
                  )}
                  
                  {currentLesson.type === 'quiz' && currentLesson.content && currentLesson.content.questions && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-4">{dictionary.quiz}: {currentLesson.title}</h2>
                      <p className="text-gray-600 mb-6">{dictionary.quizInstructions}</p>
                      
                      {quizSubmitted ? (
                        <div>
                          <div className="bg-primary-light/20 rounded-lg p-4 text-center mb-6">
                            <h3 className="text-xl font-bold text-primary mb-2">{dictionary.quizResults}</h3>
                            <p className="text-lg">
                              <span className="font-bold">{quizScore}</span> {dictionary.correctAnswers} {dictionary.outOf} {currentLesson.content.questions.length}
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            {currentLesson.content.questions.map((question, questionIndex) => (
                              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                <p className="font-medium text-gray-800 mb-3">{questionIndex + 1}. {question.question}</p>
                                
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div 
                                      key={optionIndex}
                                      className={`p-3 rounded-lg flex items-start ${
                                        question.correctAnswer === optionIndex
                                          ? 'bg-green-100 border border-green-200'
                                          : quizAnswers[questionIndex] === optionIndex && quizAnswers[questionIndex] !== question.correctAnswer
                                            ? 'bg-red-100 border border-red-200'
                                            : 'bg-gray-50'
                                      }`}
                                    >
                                      <div className="mr-3 mt-0.5">
                                        {question.correctAnswer === optionIndex ? (
                                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                        ) : quizAnswers[questionIndex] === optionIndex ? (
                                          <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center">
                                            <span className="block w-2 h-2 bg-red-400 rounded-full"></span>
                                          </div>
                                        ) : (
                                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                        )}
                                      </div>
                                      <span className={question.correctAnswer === optionIndex ? 'text-green-800' : ''}>
                                        {option}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="space-y-6">
                            {currentLesson.content.questions.map((question, questionIndex) => (
                              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                <p className="font-medium text-gray-800 mb-3">{questionIndex + 1}. {question.question}</p>
                                
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div 
                                      key={optionIndex}
                                      className={`p-3 rounded-lg flex items-start cursor-pointer ${
                                        quizAnswers[questionIndex] === optionIndex
                                          ? 'bg-primary-light/20 border border-primary/20'
                                          : 'bg-gray-50 hover:bg-gray-100'
                                      }`}
                                      onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                                    >
                                      <div className="mr-3 mt-0.5">
                                        {quizAnswers[questionIndex] === optionIndex ? (
                                          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                                            <span className="block w-2 h-2 bg-primary rounded-full"></span>
                                          </div>
                                        ) : (
                                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                        )}
                                      </div>
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 text-center">
                            <button
                              onClick={handleQuizSubmit}
                              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                              disabled={quizAnswers.length !== currentLesson.content.questions.length}
                            >
                              {dictionary.submitQuiz}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'transcript' && currentLesson.type === 'video' && (
                <div className="prose prose-primary max-w-none whitespace-pre-line">
                  {currentLesson.content.transcript}
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{dictionary.resources}</h2>
                  
                  <div className="space-y-3">
                    {moduleData.resources.map(resource => (
                      <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div className="flex items-center">
                          <DocumentTextIcon className="w-5 h-5 text-primary mr-3" />
                          <span>{resource.title}</span>
                        </div>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                          {dictionary.downloadResource}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'notes' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{dictionary.notes}</h2>
                  
                  <div className="mb-4">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={6}
                      placeholder={dictionary.addNote}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                      onClick={handleSaveNotes}
                    >
                      {dictionary.saveNote}
                    </button>
                  </div>
                  
                  {savedNotes && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg whitespace-pre-line">
                      {savedNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {previousLesson ? (
                <Link
                  href={`/${locale}/dashboard/courses/${courseId}/learn/${moduleId}?lesson=${previousLesson.id}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  {dictionary.previousLesson}
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextLesson ? (
                <Link
                  href={`/${locale}/dashboard/courses/${courseId}/learn/${moduleId}?lesson=${nextLesson.id}`}
                  className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.nextLesson}
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </Link>
              ) : (
                <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  {dictionary.complete}
                </button>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{dictionary.moduleProgress}</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{dictionary.lessonProgress}</span>
                  <span className="font-medium">{moduleData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary rounded-full h-2.5"
                    style={{ width: `${moduleData.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Module Lessons List */}
              <div className="divide-y divide-gray-100">
                {moduleData.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/${locale}/dashboard/courses/${courseId}/learn/${moduleId}?lesson=${lesson.id}`}
                    className={`block py-3 flex items-start ${
                      lesson.id === currentLesson.id
                        ? 'bg-primary-light/10'
                        : ''
                    }`}
                  >
                    <div className="w-6 flex-shrink-0 mt-0.5">
                      {lesson.status === 'completed' ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      ) : lesson.status === 'inProgress' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
                          <span className="block w-2 h-2 bg-blue-400 rounded-full"></span>
                        </div>
                      ) : lesson.status === 'notStarted' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-gray-100"></div>
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <p className={`text-sm ${
                        lesson.id === currentLesson.id
                          ? 'font-semibold text-primary'
                          : lesson.status === 'locked'
                            ? 'text-gray-400'
                            : 'text-gray-800'
                      }`}>
                        {index + 1}. {lesson.title}
                      </p>
                      
                      <div className="flex items-center text-xs mt-1">
                        {lesson.type === 'video' ? (
                          <PlayIcon className="w-3 h-3 mr-1 text-gray-400" />
                        ) : lesson.type === 'reading' ? (
                          <DocumentTextIcon className="w-3 h-3 mr-1 text-gray-400" />
                        ) : (
                          <DocumentTextIcon className="w-3 h-3 mr-1 text-gray-400" />
                        )}
                        <span className={`capitalize ${
                          lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {lesson.type}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <ClockIcon className="w-3 h-3 mr-1 text-gray-400" />
                        <span className={lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-500'}>
                          {lesson.duration} {dictionary.minutes}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 