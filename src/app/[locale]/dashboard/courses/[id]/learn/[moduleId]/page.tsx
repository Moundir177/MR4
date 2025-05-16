import React from 'react';
import type { Locale } from '@/i18n/settings';
import { locales } from '@/i18n/settings';
import LearningClient from './LearningClient';

// This function is required for static exports with dynamic routes
export function generateStaticParams() {
  // For simplicity, we'll just define a few course and module IDs
  // In a real app, you would get this from your CMS or database
  const courseIds = ['web-development-101', 'course1', 'course2'];
  const moduleIds = ['1', '2', '3', '4', '5', '6'];
  
  // Generate all combinations of locales, course IDs, and module IDs
  return locales.flatMap(locale => 
    courseIds.flatMap(courseId => 
      moduleIds.map(moduleId => ({
        locale,
        id: courseId,
        moduleId
      }))
    )
  );
}

// Learning module dictionary
const learningDictionary = {
  en: {
    backToCourse: 'Back to Course',
    module: 'Module',
    lesson: 'Lesson',
    videoTranscript: 'Transcript',
    resources: 'Resources',
    notes: 'Notes',
    contents: 'Contents',
    previousLesson: 'Previous',
    nextLesson: 'Next',
    complete: 'Complete Module',
    completed: 'Completed',
    inProgress: 'In Progress',
    locked: 'Locked',
    minutes: 'min',
    quiz: 'Quiz',
    quizInstructions: 'Choose the best answer for each question below. Submit when you are ready.',
    quizResults: 'Quiz Results',
    correctAnswers: 'correct answers',
    outOf: 'out of',
    submitQuiz: 'Submit Quiz',
    downloadResource: 'Download',
    addNote: 'Add your notes here...',
    saveNote: 'Save Notes',
    moduleProgress: 'Module Progress',
    lessonProgress: 'Lesson Progress'
  },
  fr: {
    backToCourse: 'Retour au Cours',
    module: 'Module',
    lesson: 'Leçon',
    videoTranscript: 'Transcription',
    resources: 'Ressources',
    notes: 'Notes',
    contents: 'Contenu',
    previousLesson: 'Précédent',
    nextLesson: 'Suivant',
    complete: 'Terminer le Module',
    completed: 'Terminé',
    inProgress: 'En Cours',
    locked: 'Verrouillé',
    minutes: 'min',
    quiz: 'Quiz',
    quizInstructions: 'Choisissez la meilleure réponse pour chaque question ci-dessous. Soumettez quand vous êtes prêt.',
    quizResults: 'Résultats du Quiz',
    correctAnswers: 'réponses correctes',
    outOf: 'sur',
    submitQuiz: 'Soumettre le Quiz',
    downloadResource: 'Télécharger',
    addNote: 'Ajoutez vos notes ici...',
    saveNote: 'Enregistrer les Notes',
    moduleProgress: 'Progression du Module',
    lessonProgress: 'Progression de la Leçon'
  },
  ar: {
    backToCourse: 'العودة إلى الدورة',
    module: 'الوحدة',
    lesson: 'الدرس',
    videoTranscript: 'النص المكتوب',
    resources: 'الموارد',
    notes: 'الملاحظات',
    contents: 'المحتويات',
    previousLesson: 'السابق',
    nextLesson: 'التالي',
    complete: 'إكمال الوحدة',
    completed: 'مكتمل',
    inProgress: 'قيد التقدم',
    locked: 'مغلق',
    minutes: 'دقيقة',
    quiz: 'اختبار',
    quizInstructions: 'اختر أفضل إجابة لكل سؤال أدناه. قم بالتسليم عندما تكون جاهزًا.',
    quizResults: 'نتائج الاختبار',
    correctAnswers: 'إجابات صحيحة',
    outOf: 'من',
    submitQuiz: 'تسليم الاختبار',
    downloadResource: 'تحميل',
    addNote: 'أضف ملاحظاتك هنا...',
    saveNote: 'حفظ الملاحظات',
    moduleProgress: 'تقدم الوحدة',
    lessonProgress: 'تقدم الدرس'
  }
};

// Sample module data - would come from API
const moduleData = {
  id: 1,
  title: 'Introduction to Web Development',
  progress: 75,
  currentLessonId: 103,
  lessons: [
    {
      id: 101,
      title: 'What is Web Development?',
      type: 'reading',
      duration: 10,
      status: 'completed',
      content: {
        text: `
          <h2>What is Web Development?</h2>
          <p>Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.</p>
          
          <p>Web development can be split into many areas and a typical and basic web development hierarchy might include:</p>
          
          <ul>
            <li><strong>Client-side coding</strong>: HTML, CSS, JavaScript</li>
            <li><strong>Server-side coding</strong>: PHP, Python, Ruby, Java, Node.js</li>
            <li><strong>Database technology</strong>: MySQL, PostgreSQL, MongoDB</li>
            <li><strong>Server management</strong>: Apache, Nginx</li>
            <li><strong>Content management systems</strong>: WordPress, Drupal, Joomla</li>
          </ul>
          
          <p>A more comprehensive breakdown of web development might include disciplines like:</p>
          
          <h3>Front-end Development</h3>
          <p>Front-end development refers to the client-side development, where the focus is on what users see. It involves coding and creating elements and features of a website that will then be seen by the user. It's about making sure the visual aspects of a website are functional.</p>
          
          <h3>Back-end Development</h3>
          <p>Back-end development refers to the server-side development, focusing on the databases, scripting, and the architecture of websites. It's the code that connects the website to the database and ensures that data flows properly to the website and user actions are performed correctly.</p>
          
          <h3>Full-stack Development</h3>
          <p>Full-stack development encompasses both front-end and back-end development. A full-stack developer is someone who understands and can work across the entire stack of technology, from client to server to database.</p>
        `
      }
    },
    {
      id: 102,
      title: 'The Role of HTML, CSS, and JavaScript',
      type: 'video',
      duration: 15,
      status: 'completed',
      content: {
        videoUrl: '/videos/html-css-js.mp4',
        transcript: `Welcome to this lesson on the role of HTML, CSS, and JavaScript in web development.

HTML, CSS, and JavaScript are the three core technologies of the World Wide Web. Let's break down the role of each.

HTML, or HyperText Markup Language, is the standard markup language for documents designed to be displayed in a web browser. It defines the structure of web content. HTML consists of a series of elements that tell the browser how to display the content. HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.

CSS, or Cascading Style Sheets, is a style sheet language used for describing the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media. CSS is designed to enable the separation of presentation and content, improving content accessibility, providing more flexibility and control in the specification of presentation characteristics, and reducing complexity in the structural content.

JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it. JavaScript is what makes web pages dynamic and interactive. It allows developers to add functionality to websites, from detecting screen sizes to powering fully-featured applications.

Together, these three technologies form the foundation of front-end web development. Understanding how they work together is crucial for any aspiring web developer.`
      }
    },
    {
      id: 103,
      title: 'Setting Up Your Development Environment',
      type: 'reading',
      duration: 10,
      status: 'inProgress',
      content: {
        text: `
          <h2>Setting Up Your Development Environment</h2>
          <p>Before you can start building websites, you need to set up your development environment. Here are the essential tools you'll need:</p>
          
          <h3>1. Text Editor or IDE</h3>
          <p>A good text editor is essential for writing code. Some popular options include:</p>
          <ul>
            <li><strong>Visual Studio Code</strong>: A free, open-source editor from Microsoft with great features and extensions.</li>
            <li><strong>Sublime Text</strong>: A sophisticated text editor for code, markup, and prose.</li>
            <li><strong>Atom</strong>: A hackable text editor for the 21st Century.</li>
            <li><strong>WebStorm</strong>: A powerful IDE specifically designed for JavaScript development.</li>
          </ul>
          
          <h3>2. Web Browsers</h3>
          <p>You'll need browsers to test your websites. It's a good practice to test in multiple browsers as they may render elements differently. Key browsers include:</p>
          <ul>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
          </ul>
          <p>Most browsers come with developer tools that allow you to inspect and debug your code. Chrome DevTools and Firefox Developer Tools are particularly powerful.</p>
          
          <h3>3. Version Control</h3>
          <p><strong>Git</strong> is the industry standard for version control. It allows you to track changes to your codebase and collaborate with others. <strong>GitHub</strong>, <strong>GitLab</strong>, or <strong>Bitbucket</strong> are platforms that host Git repositories and provide additional collaboration features.</p>
          
          <h3>4. Local Development Server</h3>
          <p>For testing dynamic websites locally, you'll need a local development server. Options include:</p>
          <ul>
            <li><strong>XAMPP</strong>: A free and open-source cross-platform web server solution stack package.</li>
            <li><strong>MAMP</strong>: A free, local server environment that can be installed on Mac or Windows.</li>
            <li><strong>Node.js with Express</strong>: A JavaScript runtime environment that can be used to create a local server.</li>
          </ul>
          
          <h3>5. Package Managers</h3>
          <p>Package managers help you install and manage dependencies for your projects:</p>
          <ul>
            <li><strong>npm</strong> (Node Package Manager): Comes with Node.js and is used primarily for JavaScript.</li>
            <li><strong>Yarn</strong>: An alternative to npm with some additional features.</li>
          </ul>
          
          <h3>6. Command Line Interface (CLI)</h3>
          <p>Familiarity with command line basics is important for tasks like running scripts, using Git, and installing packages:</p>
          <ul>
            <li><strong>Terminal</strong> on Mac and Linux</li>
            <li><strong>Command Prompt</strong> or <strong>PowerShell</strong> on Windows</li>
            <li><strong>Git Bash</strong> is also a good option for Windows users as it provides a Unix-like interface</li>
          </ul>
        `
      }
    },
    {
      id: 104,
      title: 'Module Quiz',
      type: 'quiz',
      duration: 10,
      status: 'notStarted',
      content: {
        questions: [
          {
            id: 'q1',
            question: 'Which of the following is NOT a primary web development technology?',
            options: [
              'HTML',
              'PHP',
              'CSS',
              'JavaScript'
            ],
            correctAnswer: 1
          },
          {
            id: 'q2',
            question: 'What is the main purpose of HTML in web development?',
            options: [
              'To style web pages',
              'To create dynamic functionality',
              'To structure content',
              'To communicate with the server'
            ],
            correctAnswer: 2
          },
          {
            id: 'q3',
            question: 'Which type of development focuses on what users see?',
            options: [
              'Back-end development',
              'Front-end development',
              'Database development',
              'Server development'
            ],
            correctAnswer: 1
          },
          {
            id: 'q4',
            question: 'Which tool is essential for version control in web development?',
            options: [
              'Visual Studio Code',
              'Chrome DevTools',
              'Git',
              'npm'
            ],
            correctAnswer: 2
          },
          {
            id: 'q5',
            question: 'What is the primary purpose of CSS in web development?',
            options: [
              'To structure web content',
              'To style and layout web pages',
              'To add interactivity to websites',
              'To communicate with the server'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  ],
  resources: [
    {
      id: 'r1',
      title: 'Web Development Cheat Sheet',
      url: '/resources/web-dev-cheatsheet.pdf'
    },
    {
      id: 'r2',
      title: 'HTML5 Documentation',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
    },
    {
      id: 'r3',
      title: 'CSS Reference',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference'
    },
    {
      id: 'r4',
      title: 'JavaScript Basics Guide',
      url: '/resources/js-basics.pdf'
    }
  ]
};

export default function ModulePage({ 
  params, 
  searchParams = {}
}: { 
  params: { locale: string, id: string, moduleId: string },
  searchParams?: { lesson?: string }
}) {
  const locale = params.locale || 'en';
  const courseId = params.id;
  const moduleId = params.moduleId;
  
  const lessonId = searchParams?.lesson ? parseInt(searchParams.lesson) : undefined;
  
  const updatedModuleData = {
    ...moduleData,
    currentLessonId: lessonId || moduleData.currentLessonId
  };
  
  const dictionary = learningDictionary[locale as keyof typeof learningDictionary] || learningDictionary.en;
  
  return (
    <LearningClient 
      locale={locale}
      courseId={courseId}
      moduleId={moduleId}
      dictionary={dictionary}
      moduleData={updatedModuleData}
    />
  );
} 