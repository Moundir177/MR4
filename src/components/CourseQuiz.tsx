'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon as CheckIconSolid,
  XMarkIcon,
} from '@heroicons/react/24/solid';

// Quiz dictionary
const quizDictionary = {
  en: {
    timeRemaining: 'Time Remaining',
    minutes: 'min',
    seconds: 'sec',
    question: 'Question',
    of: 'of',
    previousQuestion: 'Previous',
    nextQuestion: 'Next',
    submitQuiz: 'Submit Quiz',
    correctAnswer: 'Correct',
    incorrectAnswer: 'Incorrect',
    yourAnswer: 'Your Answer',
    correctAnswerLabel: 'Correct Answer',
    explanation: 'Explanation',
    quizResults: 'Quiz Results',
    yourScore: 'Your Score',
    passingScore: 'Passing Score',
    passed: 'Passed',
    failed: 'Failed',
    reviewAnswers: 'Review Answers',
    retakeQuiz: 'Retake Quiz',
    continueCourse: 'Continue to Next Lesson',
    timeUp: 'Time\'s Up!',
    quizCompleted: 'Quiz Completed',
    selectAnswer: 'Select an answer to continue',
    trueOption: 'True',
    falseOption: 'False',
    congratulations: 'Congratulations!',
    quizFailed: 'You did not pass the quiz.',
    passingScoreLabel: 'Passing score:',
    yourProgress: 'Your progress',
    tryAgain: 'Try Again',
    continue: 'Continue',
  },
  fr: {
    timeRemaining: 'Temps Restant',
    minutes: 'min',
    seconds: 'sec',
    question: 'Question',
    of: 'sur',
    previousQuestion: 'Précédent',
    nextQuestion: 'Suivant',
    submitQuiz: 'Soumettre le Quiz',
    correctAnswer: 'Correct',
    incorrectAnswer: 'Incorrect',
    yourAnswer: 'Votre Réponse',
    correctAnswerLabel: 'Réponse Correcte',
    explanation: 'Explication',
    quizResults: 'Résultats du Quiz',
    yourScore: 'Votre Score',
    passingScore: 'Score de Réussite',
    passed: 'Réussi',
    failed: 'Échoué',
    reviewAnswers: 'Revoir les Réponses',
    retakeQuiz: 'Refaire le Quiz',
    continueCourse: 'Continuer vers la Leçon Suivante',
    timeUp: 'Temps Écoulé !',
    quizCompleted: 'Quiz Terminé',
    selectAnswer: 'Sélectionnez une réponse pour continuer',
    trueOption: 'Vrai',
    falseOption: 'Faux',
    congratulations: 'Félicitations!',
    quizFailed: 'Vous n\'avez pas réussi le quiz.',
    passingScoreLabel: 'Score de réussite:',
    yourProgress: 'Votre progression',
    tryAgain: 'Réessayer',
    continue: 'Continuer',
  },
  ar: {
    timeRemaining: 'الوقت المتبقي',
    minutes: 'دقيقة',
    seconds: 'ثانية',
    question: 'سؤال',
    of: 'من',
    previousQuestion: 'السابق',
    nextQuestion: 'التالي',
    submitQuiz: 'إرسال الاختبار',
    correctAnswer: 'صحيح',
    incorrectAnswer: 'غير صحيح',
    yourAnswer: 'إجابتك',
    correctAnswerLabel: 'الإجابة الصحيحة',
    explanation: 'الشرح',
    quizResults: 'نتائج الاختبار',
    yourScore: 'نتيجتك',
    passingScore: 'نتيجة النجاح',
    passed: 'ناجح',
    failed: 'راسب',
    reviewAnswers: 'مراجعة الإجابات',
    retakeQuiz: 'إعادة الاختبار',
    continueCourse: 'الاستمرار إلى الدرس التالي',
    timeUp: 'انتهى الوقت!',
    quizCompleted: 'تم الانتهاء من الاختبار',
    selectAnswer: 'اختر إجابة للمتابعة',
    trueOption: 'صحيح',
    falseOption: 'خطأ',
    congratulations: 'تهانينا!',
    quizFailed: 'لم تنجح في الاختبار.',
    passingScoreLabel: 'درجة النجاح:',
    yourProgress: 'تقدمك',
    tryAgain: 'حاول مرة أخرى',
    continue: 'متابعة',
  }
};

// Quiz question types
export type QuizQuestionType = 'multiple-choice' | 'true-false' | 'multiple-select';

export interface QuizOption {
  id: string;
  text: string;
  image?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
  image?: string;
}

export interface QuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes, optional
  passingScore: number; // percentage, e.g. 70
  locale: string;
  onComplete: (score: number, passed: boolean) => void;
  onContinue: () => void;
}

interface UserAnswer {
  questionId: string;
  selectedOptionId: string | null;
}

export default function CourseQuiz({
  title,
  description,
  questions,
  timeLimit,
  passingScore,
  locale = 'en',
  onComplete,
  onContinue
}: QuizProps) {
  // Use the appropriate dictionary based on locale
  const dictionary = quizDictionary[locale as keyof typeof quizDictionary] || quizDictionary.en;
  
  // State for quiz progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    questions.map(q => ({ questionId: q.id, selectedOptionId: null }))
  );
  
  // State for quiz status
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  
  // State for timer
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(timeLimit ? timeLimit * 60 : 0);
  const [timerActive, setTimerActive] = useState(!!timeLimit);
  
  // Calculate score
  const calculateScore = () => {
    const correctAnswers = userAnswers.filter(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return question?.correctOptionId === answer.selectedOptionId;
    }).length;
    
    return Math.round((correctAnswers / questions.length) * 100);
  };
  
  // Check if quiz is passed
  const isPassed = () => {
    return calculateScore() >= passingScore;
  };
  
  // Handle answer selection
  const handleSelectAnswer = (optionId: string) => {
    if (quizSubmitted) return;
    
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex].selectedOptionId = optionId;
    setUserAnswers(updatedAnswers);
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Submit quiz
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    setTimerActive(false);
    setShowResults(true);
    
    const score = calculateScore();
    const passed = isPassed();
    
    onComplete(score, passed);
  };
  
  // Review answers
  const handleReviewAnswers = () => {
    setReviewMode(true);
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };
  
  // Retake quiz
  const handleRetakeQuiz = () => {
    setUserAnswers(questions.map(q => ({ questionId: q.id, selectedOptionId: null })));
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setShowResults(false);
    setReviewMode(false);
    setTimeRemainingSeconds(timeLimit ? timeLimit * 60 : 0);
    setTimerActive(!!timeLimit);
  };
  
  // Check if all questions are answered
  const allQuestionsAnswered = userAnswers.every(answer => answer.selectedOptionId !== null);
  
  // Timer logic
  useEffect(() => {
    if (!timerActive || !timeLimit) return;
    
    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timerActive, timeLimit]);
  
  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return {
      minutes,
      seconds: remainingSeconds
    };
  };
  
  const timeFormatted = formatTimeRemaining(timeRemainingSeconds);
  
  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const isCorrect = reviewMode && currentAnswer.selectedOptionId === currentQuestion.correctOptionId;
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Quiz Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      
      {/* Quiz Timer */}
      {timeLimit && (
        <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">{dictionary.timeRemaining}</span>
          </div>
          <div className="text-sm font-bold">
            <span className="text-gray-800">{timeFormatted.minutes}</span>
            <span className="text-gray-500 mx-1">{dictionary.minutes}</span>
            <span className="text-gray-800">{timeFormatted.seconds}</span>
            <span className="text-gray-500 ml-1">{dictionary.seconds}</span>
          </div>
        </div>
      )}
      
      {/* Quiz Results */}
      {showResults ? (
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              {isPassed() ? (
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-red-500" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{dictionary.quizCompleted}</h3>
            <p className="text-gray-600 mb-2">{dictionary.quizResults}</p>
            <div className="flex justify-center items-center space-x-2">
              <span className="text-lg font-bold text-gray-800">{dictionary.yourScore}:</span>
              <span className="text-2xl font-bold text-primary">{calculateScore()}%</span>
            </div>
            <div className="flex justify-center items-center mt-2">
              <span className="text-sm text-gray-600">{dictionary.passingScoreLabel}: {passingScore}%</span>
              <span className="ml-3 px-2 py-0.5 text-xs font-medium rounded-full bg-opacity-10 inline-flex items-center" 
                style={{ 
                  backgroundColor: isPassed() ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: isPassed() ? 'rgb(22, 163, 74)' : 'rgb(220, 38, 38)'
                }}
              >
                {isPassed() ? (
                  <React.Fragment>
                    <CheckIconSolid className="h-3 w-3 mr-1" />
                    {dictionary.passed}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                    {dictionary.failed}
                  </React.Fragment>
                )}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReviewAnswers}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              {dictionary.reviewAnswers}
            </button>
            <button
              onClick={handleRetakeQuiz}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4 inline mr-1" />
              {dictionary.retakeQuiz}
            </button>
            <button
              onClick={onContinue}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
            >
              {dictionary.continueCourse}
            </button>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {/* Question */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">
                {dictionary.question} {currentQuestionIndex + 1} {dictionary.of} {questions.length}
              </div>
              {reviewMode && (
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isCorrect ? dictionary.correctAnswer : dictionary.incorrectAnswer}
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4">{currentQuestion.question}</h3>
            
            {/* Question Image */}
            {currentQuestion.image && (
              <div className="mb-6 relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={currentQuestion.image}
                  alt={currentQuestion.question}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Question Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.type === 'true-false' ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`p-4 border rounded-lg flex items-center justify-center transition-colors ${
                      currentAnswer.selectedOptionId === currentQuestion.options[0].id
                        ? reviewMode
                          ? currentQuestion.options[0].id === currentQuestion.correctOptionId
                            ? 'bg-green-100 border-green-200 text-green-800'
                            : 'bg-red-100 border-red-200 text-red-800'
                          : 'bg-primary/10 border-primary/30 text-primary'
                        : reviewMode && currentQuestion.options[0].id === currentQuestion.correctOptionId
                          ? 'bg-green-50 border-green-200'
                          : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectAnswer(currentQuestion.options[0].id)}
                    disabled={reviewMode || quizSubmitted}
                  >
                    {dictionary.trueOption}
                  </button>
                  <button
                    className={`p-4 border rounded-lg flex items-center justify-center transition-colors ${
                      currentAnswer.selectedOptionId === currentQuestion.options[1].id
                        ? reviewMode
                          ? currentQuestion.options[1].id === currentQuestion.correctOptionId
                            ? 'bg-green-100 border-green-200 text-green-800'
                            : 'bg-red-100 border-red-200 text-red-800'
                          : 'bg-primary/10 border-primary/30 text-primary'
                        : reviewMode && currentQuestion.options[1].id === currentQuestion.correctOptionId
                          ? 'bg-green-50 border-green-200'
                          : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectAnswer(currentQuestion.options[1].id)}
                    disabled={reviewMode || quizSubmitted}
                  >
                    {dictionary.falseOption}
                  </button>
                </div>
              ) : (
                currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    className={`p-4 border rounded-lg w-full text-left flex items-center transition-colors ${
                      currentAnswer.selectedOptionId === option.id
                        ? reviewMode
                          ? option.id === currentQuestion.correctOptionId
                            ? 'bg-green-100 border-green-200 text-green-800'
                            : 'bg-red-100 border-red-200 text-red-800'
                          : 'bg-primary/10 border-primary/30 text-primary'
                        : reviewMode && option.id === currentQuestion.correctOptionId
                          ? 'bg-green-50 border-green-200'
                          : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={reviewMode || quizSubmitted}
                  >
                    {option.image && (
                      <div className="w-12 h-12 relative mr-3 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={option.image}
                          alt={option.text}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{option.text}</span>
                    {reviewMode && option.id === currentQuestion.correctOptionId && (
                      <CheckIconSolid className="h-5 w-5 text-green-500 ml-auto" />
                    )}
                  </button>
                ))
              )}
            </div>
            
            {/* Explanation (in review mode) */}
            {reviewMode && currentQuestion.explanation && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
                <h4 className="font-medium mb-1">{dictionary.explanation}:</h4>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center text-gray-700 font-medium ${
                currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-900'
              }`}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              {dictionary.previousQuestion}
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={goToNextQuestion}
                disabled={!currentAnswer.selectedOptionId && !reviewMode}
                className={`flex items-center text-primary font-medium ${
                  !currentAnswer.selectedOptionId && !reviewMode ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary-dark'
                }`}
              >
                {dictionary.nextQuestion}
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </button>
            ) : (
              !reviewMode && (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allQuestionsAnswered}
                  className={`px-4 py-2 bg-primary text-white font-medium rounded-lg transition-colors ${
                    !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                  }`}
                >
                  {dictionary.submitQuiz}
                </button>
              )
            )}
            {reviewMode && currentQuestionIndex === questions.length - 1 && (
              <button
                onClick={() => {
                  setReviewMode(false);
                  setShowResults(true);
                }}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
              >
                {dictionary.quizResults}
              </button>
            )}
          </div>
          
          {/* Guidance Text */}
          {!currentAnswer.selectedOptionId && !reviewMode && (
            <div className="px-6 py-3 bg-yellow-50 text-yellow-800 text-sm text-center">
              {dictionary.selectAnswer}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
} 