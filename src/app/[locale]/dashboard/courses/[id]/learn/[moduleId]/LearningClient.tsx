'use client';

import React, { useState, Fragment } from 'react';
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

export default function LearningClient({ 
  locale, 
  courseId, 
  moduleId, 
  dictionary, 
  moduleData 
}: { 
  locale: string; 
  courseId: string; 
  moduleId: string | number;
  dictionary: any; 
  moduleData: any; 
}) {
  // Find current lesson
  const currentLessonIndex = moduleData.lessons.findIndex((lesson: any) => lesson.id === moduleData.currentLessonId);
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
                            {currentLesson.content.questions.map((question: any, questionIndex: number) => (
                              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                <p className="font-medium text-gray-800 mb-3">{questionIndex + 1}. {question.question}</p>
                                
                                <div className="space-y-2">
                                  {question.options.map((option: any, optionIndex: number) => (
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
                            {currentLesson.content.questions.map((question: any, questionIndex: number) => (
                              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                <p className="font-medium text-gray-800 mb-3">{questionIndex + 1}. {question.question}</p>
                                
                                <div className="space-y-2">
                                  {question.options.map((option: any, optionIndex: number) => (
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
                    {moduleData.resources.map((resource: any) => (
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
                {moduleData.lessons.map((lesson: any, index: number) => (
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