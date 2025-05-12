import { Locale } from '@/i18n/settings';
import { programs } from './programs';

export interface ProgramDetail {
  id: string;
  curriculum: Record<Locale, {
    title: string;
    modules: Array<{
      title: string;
      description: string;
      duration: string;
    }>;
  }>;
  goals: Record<Locale, {
    title: string;
    list: string[];
  }>;
  careers: Record<Locale, {
    title: string;
    list: string[];
  }>;
  instructors: Array<{
    name: string;
    title: Record<Locale, string>;
    bio: Record<Locale, string>;
    avatar: string;
  }>;
  testimonials: Array<{
    name: string;
    role: Record<Locale, string>;
    content: Record<Locale, string>;
    avatar: string;
  }>;
  faq: Record<Locale, Array<{
    question: string;
    answer: string;
  }>>;
  prerequisites: Record<Locale, string[]>;
  price: Record<Locale, string>;
  startDates: Record<Locale, string[]>;
}

export const programDetails: Record<string, ProgramDetail> = {
  'web-development': {
    id: 'web-development',
    curriculum: {
      en: {
        title: 'Curriculum',
        modules: [
          {
            title: 'Web Fundamentals',
            description: 'HTML, CSS, JavaScript basics, responsive design principles',
            duration: '4 weeks'
          },
          {
            title: 'Frontend Development',
            description: 'React.js, state management, component-based architecture',
            duration: '6 weeks'
          },
          {
            title: 'Backend Development',
            description: 'Node.js, Express, RESTful APIs, authentication',
            duration: '6 weeks'
          },
          {
            title: 'Database & Deployment',
            description: 'MongoDB, SQL basics, cloud deployment, performance optimization',
            duration: '4 weeks'
          },
          {
            title: 'Capstone Project',
            description: 'Build a full-stack web application from scratch',
            duration: '4 weeks'
          }
        ]
      },
      fr: {
        title: 'Programme',
        modules: [
          {
            title: 'Fondamentaux du Web',
            description: 'HTML, CSS, bases de JavaScript, principes de design responsive',
            duration: '4 semaines'
          },
          {
            title: 'Développement Frontend',
            description: 'React.js, gestion d\'état, architecture basée sur les composants',
            duration: '6 semaines'
          },
          {
            title: 'Développement Backend',
            description: 'Node.js, Express, APIs RESTful, authentification',
            duration: '6 semaines'
          },
          {
            title: 'Base de données & Déploiement',
            description: 'MongoDB, bases de SQL, déploiement cloud, optimisation des performances',
            duration: '4 semaines'
          },
          {
            title: 'Projet Final',
            description: 'Construire une application web full-stack de A à Z',
            duration: '4 semaines'
          }
        ]
      },
      ar: {
        title: 'المنهج الدراسي',
        modules: [
          {
            title: 'أساسيات الويب',
            description: 'HTML، CSS، أساسيات JavaScript، مبادئ التصميم المتجاوب',
            duration: '4 أسابيع'
          },
          {
            title: 'تطوير الواجهة الأمامية',
            description: 'React.js، إدارة الحالة، هندسة البرمجيات القائمة على المكونات',
            duration: '6 أسابيع'
          },
          {
            title: 'تطوير الخلفية',
            description: 'Node.js، Express، واجهات برمجة التطبيقات RESTful، المصادقة',
            duration: '6 أسابيع'
          },
          {
            title: 'قواعد البيانات والنشر',
            description: 'MongoDB، أساسيات SQL، نشر سحابي، تحسين الأداء',
            duration: '4 أسابيع'
          },
          {
            title: 'مشروع التخرج',
            description: 'بناء تطبيق ويب متكامل من الصفر',
            duration: '4 أسابيع'
          }
        ]
      }
    },
    goals: {
      en: {
        title: 'What You Will Learn',
        list: [
          'Build responsive and interactive web applications',
          'Master modern JavaScript frameworks',
          'Develop RESTful APIs and backend services',
          'Work with databases and data storage solutions',
          'Deploy applications to production environments',
          'Implement authentication and security best practices'
        ]
      },
      fr: {
        title: 'Ce Que Vous Apprendrez',
        list: [
          'Créer des applications web responsives et interactives',
          'Maîtriser les frameworks JavaScript modernes',
          'Développer des APIs RESTful et des services backend',
          'Travailler avec des bases de données et des solutions de stockage',
          'Déployer des applications en environnement de production',
          'Implémenter l\'authentification et les meilleures pratiques de sécurité'
        ]
      },
      ar: {
        title: 'ما ستتعلمه',
        list: [
          'بناء تطبيقات ويب متجاوبة وتفاعلية',
          'إتقان أطر عمل JavaScript الحديثة',
          'تطوير واجهات برمجة التطبيقات RESTful وخدمات الخلفية',
          'العمل مع قواعد البيانات وحلول تخزين البيانات',
          'نشر التطبيقات في بيئات الإنتاج',
          'تنفيذ المصادقة وأفضل ممارسات الأمان'
        ]
      }
    },
    careers: {
      en: {
        title: 'Career Opportunities',
        list: [
          'Front-End Developer',
          'Back-End Developer',
          'Full-Stack Developer',
          'Web Application Developer',
          'UI Developer',
          'JavaScript Developer'
        ]
      },
      fr: {
        title: 'Opportunités de Carrière',
        list: [
          'Développeur Front-End',
          'Développeur Back-End',
          'Développeur Full-Stack',
          'Développeur d\'Applications Web',
          'Développeur UI',
          'Développeur JavaScript'
        ]
      },
      ar: {
        title: 'فرص المهنية',
        list: [
          'مطور الواجهة الأمامية',
          'مطور الخلفية',
          'مطور متكامل',
          'مطور تطبيقات الويب',
          'مطور واجهة المستخدم',
          'مطور JavaScript'
        ]
      }
    },
    instructors: [
      {
        name: 'Karim Benali',
        title: {
          en: 'Senior Full-Stack Developer',
          fr: 'Développeur Full-Stack Senior',
          ar: 'مطور متكامل رئيسي'
        },
        bio: {
          en: '10+ years of experience in web development. Former Google engineer.',
          fr: 'Plus de 10 ans d\'expérience en développement web. Ancien ingénieur chez Google.',
          ar: 'أكثر من 10 سنوات من الخبرة في تطوير الويب. مهندس سابق في Google.'
        },
        avatar: '/images/team/instructor-1.jpg'
      },
      {
        name: 'Nadia Hamdi',
        title: {
          en: 'Frontend Specialist',
          fr: 'Spécialiste Frontend',
          ar: 'متخصصة في الواجهة الأمامية'
        },
        bio: {
          en: 'UI/UX expert with extensive React experience. Led teams at major startups.',
          fr: 'Experte UI/UX avec une vaste expérience React. A dirigé des équipes dans des startups majeures.',
          ar: 'خبيرة في واجهة المستخدم وتجربة المستخدم مع خبرة واسعة في React. قادت فرقًا في شركات ناشئة كبرى.'
        },
        avatar: '/images/team/instructor-2.jpg'
      }
    ],
    testimonials: [
      {
        name: 'Ahmed Kader',
        role: {
          en: 'Web Developer at TechAlgeria',
          fr: 'Développeur Web chez TechAlgeria',
          ar: 'مطور ويب في TechAlgeria'
        },
        content: {
          en: 'This program transformed my career. I went from basic HTML knowledge to building complex applications within months.',
          fr: 'Ce programme a transformé ma carrière. Je suis passé de connaissances basiques en HTML à la construction d\'applications complexes en quelques mois.',
          ar: 'لقد غير هذا البرنامج مساري المهني. انتقلت من معرفة أساسية بـ HTML إلى بناء تطبيقات معقدة في غضون أشهر.'
        },
        avatar: '/images/testimonials/testimonial-1.jpg'
      },
      {
        name: 'Leila Benhaddou',
        role: {
          en: 'Freelance Developer',
          fr: 'Développeuse Freelance',
          ar: 'مطورة مستقلة'
        },
        content: {
          en: 'The hands-on approach and industry-relevant curriculum helped me land clients immediately after graduation.',
          fr: 'L\'approche pratique et le programme pertinent pour l\'industrie m\'ont aidé à obtenir des clients immédiatement après l\'obtention de mon diplôme.',
          ar: 'ساعدني النهج العملي والمناهج الدراسية ذات الصلة بالصناعة في الحصول على عملاء فور التخرج.'
        },
        avatar: '/images/testimonials/testimonial-2.jpg'
      }
    ],
    faq: {
      en: [
        {
          question: 'Do I need prior programming experience?',
          answer: 'No, our program is designed to accommodate beginners, although having basic computer literacy is beneficial.'
        },
        {
          question: 'What resources are provided?',
          answer: 'Students receive access to our learning platform, course materials, coding environments, project repositories, and mentorship from industry professionals.'
        },
        {
          question: 'Is there a job placement program?',
          answer: 'Yes, we offer career services including resume building, interview preparation, and connections with our hiring partners.'
        }
      ],
      fr: [
        {
          question: 'Ai-je besoin d\'une expérience préalable en programmation ?',
          answer: 'Non, notre programme est conçu pour accueillir les débutants, bien qu\'une connaissance de base en informatique soit bénéfique.'
        },
        {
          question: 'Quelles ressources sont fournies ?',
          answer: 'Les étudiants ont accès à notre plateforme d\'apprentissage, aux supports de cours, aux environnements de codage, aux référentiels de projets et au mentorat de professionnels de l\'industrie.'
        },
        {
          question: 'Y a-t-il un programme de placement professionnel ?',
          answer: 'Oui, nous offrons des services de carrière, y compris la création de CV, la préparation aux entretiens et des connexions avec nos partenaires de recrutement.'
        }
      ],
      ar: [
        {
          question: 'هل أحتاج إلى خبرة سابقة في البرمجة؟',
          answer: 'لا، تم تصميم برنامجنا لاستيعاب المبتدئين، على الرغم من أن وجود معرفة أساسية بالكمبيوتر يعد مفيدًا.'
        },
        {
          question: 'ما هي الموارد المتاحة؟',
          answer: 'يحصل الطلاب على إمكانية الوصول إلى منصة التعلم لدينا، ومواد الدورة، وبيئات البرمجة، ومستودعات المشاريع، والإرشاد من المهنيين في المجال.'
        },
        {
          question: 'هل هناك برنامج للتوظيف؟',
          answer: 'نعم، نقدم خدمات مهنية تشمل إنشاء السيرة الذاتية، والتحضير للمقابلات، والاتصالات مع شركائنا في التوظيف.'
        }
      ]
    },
    prerequisites: {
      en: ['Basic computer skills', 'Ability to commit 20-25 hours per week', 'Reliable internet connection', 'Dedication to complete assignments and projects'],
      fr: ['Compétences informatiques de base', 'Capacité à consacrer 20-25 heures par semaine', 'Connexion Internet fiable', 'Dévouement pour compléter les devoirs et les projets'],
      ar: ['مهارات الكمبيوتر الأساسية', 'القدرة على الالتزام بـ 20-25 ساعة أسبوعيًا', 'اتصال إنترنت موثوق', 'التفاني لإكمال الواجبات والمشاريع']
    },
    price: {
      en: '120,000 DZD',
      fr: '120 000 DZD',
      ar: '120,000 دج'
    },
    startDates: {
      en: ['March 15, 2024', 'June 20, 2024', 'September 10, 2024'],
      fr: ['15 mars 2024', '20 juin 2024', '10 septembre 2024'],
      ar: ['15 مارس 2024', '20 يونيو 2024', '10 سبتمبر 2024']
    }
  },
  'digital-marketing': {
    id: 'digital-marketing',
    curriculum: {
      en: {
        title: 'Curriculum',
        modules: [
          {
            title: 'Digital Marketing Fundamentals',
            description: 'Marketing principles, digital landscape, consumer behavior',
            duration: '2 weeks'
          },
          {
            title: 'Content Marketing & SEO',
            description: 'Content strategy, SEO techniques, keyword research',
            duration: '3 weeks'
          },
          {
            title: 'Social Media Marketing',
            description: 'Platform strategies, community management, paid advertising',
            duration: '3 weeks'
          },
          {
            title: 'Email Marketing & Automation',
            description: 'Campaign design, automation workflows, analytics',
            duration: '2 weeks'
          },
          {
            title: 'Analytics & Optimization',
            description: 'Data analysis, A/B testing, conversion optimization',
            duration: '2 weeks'
          }
        ]
      },
      fr: {
        title: 'Programme',
        modules: [
          {
            title: 'Fondamentaux du Marketing Digital',
            description: 'Principes de marketing, paysage numérique, comportement du consommateur',
            duration: '2 semaines'
          },
          {
            title: 'Marketing de Contenu & SEO',
            description: 'Stratégie de contenu, techniques SEO, recherche de mots-clés',
            duration: '3 semaines'
          },
          {
            title: 'Marketing des Médias Sociaux',
            description: 'Stratégies de plateforme, gestion de communauté, publicité payante',
            duration: '3 semaines'
          },
          {
            title: 'Email Marketing & Automatisation',
            description: 'Conception de campagne, flux de travail d\'automatisation, analytique',
            duration: '2 semaines'
          },
          {
            title: 'Analytique & Optimisation',
            description: 'Analyse de données, tests A/B, optimisation de conversion',
            duration: '2 semaines'
          }
        ]
      },
      ar: {
        title: 'المنهج الدراسي',
        modules: [
          {
            title: 'أساسيات التسويق الرقمي',
            description: 'مبادئ التسويق، المشهد الرقمي، سلوك المستهلك',
            duration: 'أسبوعان'
          },
          {
            title: 'تسويق المحتوى وتحسين محركات البحث',
            description: 'استراتيجية المحتوى، تقنيات تحسين محركات البحث، بحث الكلمات الرئيسية',
            duration: '3 أسابيع'
          },
          {
            title: 'تسويق وسائل التواصل الاجتماعي',
            description: 'استراتيجيات المنصات، إدارة المجتمع، الإعلانات المدفوعة',
            duration: '3 أسابيع'
          },
          {
            title: 'التسويق عبر البريد الإلكتروني والأتمتة',
            description: 'تصميم الحملات، سير عمل الأتمتة، التحليلات',
            duration: 'أسبوعان'
          },
          {
            title: 'التحليلات والتحسين',
            description: 'تحليل البيانات، اختبار A/B، تحسين التحويل',
            duration: 'أسبوعان'
          }
        ]
      }
    },
    goals: {
      en: {
        title: 'What You Will Learn',
        list: [
          'Develop comprehensive digital marketing strategies',
          'Create and optimize content for search engines',
          'Manage effective social media campaigns',
          'Design and implement email marketing funnels',
          'Analyze marketing data to drive business decisions',
          'Optimize campaigns using analytics'
        ]
      },
      fr: {
        title: 'Ce Que Vous Apprendrez',
        list: [
          'Développer des stratégies complètes de marketing digital',
          'Créer et optimiser du contenu pour les moteurs de recherche',
          'Gérer des campagnes efficaces sur les médias sociaux',
          'Concevoir et mettre en œuvre des entonnoirs d\'email marketing',
          'Analyser les données marketing pour guider les décisions commerciales',
          'Optimiser les campagnes à l\'aide de l\'analyse'
        ]
      },
      ar: {
        title: 'ما ستتعلمه',
        list: [
          'تطوير استراتيجيات شاملة للتسويق الرقمي',
          'إنشاء وتحسين المحتوى لمحركات البحث',
          'إدارة حملات فعالة على وسائل التواصل الاجتماعي',
          'تصميم وتنفيذ مسارات التسويق عبر البريد الإلكتروني',
          'تحليل بيانات التسويق لتوجيه القرارات التجارية',
          'تحسين الحملات باستخدام التحليلات'
        ]
      }
    },
    careers: {
      en: {
        title: 'Career Opportunities',
        list: [
          'Digital Marketing Specialist',
          'Social Media Manager',
          'SEO Specialist',
          'Content Strategist',
          'Marketing Analytics Manager',
          'Email Marketing Specialist'
        ]
      },
      fr: {
        title: 'Opportunités de Carrière',
        list: [
          'Spécialiste en Marketing Digital',
          'Gestionnaire de Médias Sociaux',
          'Spécialiste SEO',
          'Stratège de Contenu',
          'Gestionnaire d\'Analytique Marketing',
          'Spécialiste en Email Marketing'
        ]
      },
      ar: {
        title: 'فرص المهنية',
        list: [
          'متخصص في التسويق الرقمي',
          'مدير وسائل التواصل الاجتماعي',
          'متخصص في تحسين محركات البحث',
          'استراتيجي محتوى',
          'مدير تحليلات التسويق',
          'متخصص في التسويق عبر البريد الإلكتروني'
        ]
      }
    },
    instructors: [
      {
        name: 'Sarah Mecheri',
        title: {
          en: 'Digital Marketing Director',
          fr: 'Directrice de Marketing Digital',
          ar: 'مديرة التسويق الرقمي'
        },
        bio: {
          en: 'Former marketing lead at major e-commerce companies with 8+ years of experience.',
          fr: 'Ancienne responsable marketing dans de grandes entreprises e-commerce avec plus de 8 ans d\'expérience.',
          ar: 'مسؤولة تسويق سابقة في شركات التجارة الإلكترونية الكبرى مع أكثر من 8 سنوات من الخبرة.'
        },
        avatar: '/images/team/instructor-3.jpg'
      },
      {
        name: 'Youssef Ammari',
        title: {
          en: 'SEO & Content Marketing Expert',
          fr: 'Expert en SEO & Marketing de Contenu',
          ar: 'خبير في تحسين محركات البحث وتسويق المحتوى'
        },
        bio: {
          en: 'Certified Google marketing expert with experience working with international brands.',
          fr: 'Expert marketing certifié Google avec une expérience de travail avec des marques internationales.',
          ar: 'خبير تسويق معتمد من Google مع خبرة في العمل مع العلامات التجارية العالمية.'
        },
        avatar: '/images/team/instructor-4.jpg'
      }
    ],
    testimonials: [
      {
        name: 'Amina Berkane',
        role: {
          en: 'Marketing Manager at AlgeriaRetail',
          fr: 'Responsable Marketing chez AlgeriaRetail',
          ar: 'مديرة التسويق في AlgeriaRetail'
        },
        content: {
          en: 'The skills I gained from this program allowed me to completely revamp our company\'s digital strategy with impressive results.',
          fr: 'Les compétences que j\'ai acquises grâce à ce programme m\'ont permis de revoir complètement la stratégie numérique de notre entreprise avec des résultats impressionnants.',
          ar: 'سمحت لي المهارات التي اكتسبتها من هذا البرنامج بإعادة صياغة استراتيجية شركتنا الرقمية بالكامل مع نتائج مثيرة للإعجاب.'
        },
        avatar: '/images/testimonials/testimonial-3.jpg'
      }
    ],
    faq: {
      en: [
        {
          question: 'Is this program suitable for complete beginners?',
          answer: 'Yes, we welcome beginners and provide a solid foundation before advancing to more complex topics.'
        },
        {
          question: 'Will I get real-world experience?',
          answer: 'Absolutely. Our program includes hands-on projects with real businesses and case studies from actual campaigns.'
        },
        {
          question: 'Do you cover paid advertising platforms like Google Ads?',
          answer: 'Yes, we cover major advertising platforms including Google Ads, Facebook Ads, Instagram Ads, and LinkedIn Ads.'
        }
      ],
      fr: [
        {
          question: 'Ce programme convient-il aux débutants complets ?',
          answer: 'Oui, nous accueillons les débutants et fournissons une base solide avant de passer à des sujets plus complexes.'
        },
        {
          question: 'Vais-je acquérir une expérience pratique ?',
          answer: 'Absolument. Notre programme comprend des projets pratiques avec de vraies entreprises et des études de cas de campagnes réelles.'
        },
        {
          question: 'Couvrez-vous des plateformes publicitaires payantes comme Google Ads ?',
          answer: 'Oui, nous couvrons les principales plateformes publicitaires, notamment Google Ads, Facebook Ads, Instagram Ads et LinkedIn Ads.'
        }
      ],
      ar: [
        {
          question: 'هل هذا البرنامج مناسب للمبتدئين تمامًا؟',
          answer: 'نعم، نرحب بالمبتدئين ونوفر أساسًا متينًا قبل الانتقال إلى مواضيع أكثر تعقيدًا.'
        },
        {
          question: 'هل سأحصل على خبرة عملية؟',
          answer: 'بالتأكيد. يتضمن برنامجنا مشاريع عملية مع شركات حقيقية ودراسات حالة من حملات فعلية.'
        },
        {
          question: 'هل تغطون منصات الإعلانات المدفوعة مثل Google Ads؟',
          answer: 'نعم، نغطي منصات الإعلانات الرئيسية بما في ذلك Google Ads وFacebook Ads وInstagram Ads وLinkedIn Ads.'
        }
      ]
    },
    prerequisites: {
      en: ['Basic computer literacy', 'Interest in marketing and communications', 'Access to a computer and internet'],
      fr: ['Connaissances informatiques de base', 'Intérêt pour le marketing et les communications', 'Accès à un ordinateur et à internet'],
      ar: ['معرفة أساسية بالكمبيوتر', 'اهتمام بالتسويق والاتصالات', 'إمكانية الوصول إلى جهاز كمبيوتر وإنترنت']
    },
    price: {
      en: '90,000 DZD',
      fr: '90 000 DZD',
      ar: '90,000 دج'
    },
    startDates: {
      en: ['April 5, 2024', 'July 10, 2024', 'October 15, 2024'],
      fr: ['5 avril 2024', '10 juillet 2024', '15 octobre 2024'],
      ar: ['5 أبريل 2024', '10 يوليو 2024', '15 أكتوبر 2024']
    }
  },
  'data-science': {
    id: 'data-science',
    curriculum: {
      en: {
        title: 'Curriculum',
        modules: [
          {
            title: 'Programming Fundamentals',
            description: 'Python basics, data structures, algorithms, and version control',
            duration: '4 weeks'
          },
          {
            title: 'Data Analysis & Visualization',
            description: 'Pandas, NumPy, data cleaning, exploratory analysis, Matplotlib, Seaborn',
            duration: '5 weeks'
          },
          {
            title: 'Statistical Analysis',
            description: 'Probability, hypothesis testing, regression analysis, experimental design',
            duration: '4 weeks'
          },
          {
            title: 'Machine Learning',
            description: 'Supervised and unsupervised learning, model evaluation, feature engineering',
            duration: '6 weeks'
          },
          {
            title: 'Advanced ML & Deep Learning',
            description: 'Neural networks, computer vision, natural language processing, TensorFlow',
            duration: '5 weeks'
          },
          {
            title: 'Capstone Project',
            description: 'End-to-end data science project addressing real-world problems',
            duration: '4 weeks'
          }
        ]
      },
      fr: {
        title: 'Programme',
        modules: [
          {
            title: 'Fondamentaux de Programmation',
            description: 'Bases de Python, structures de données, algorithmes et contrôle de version',
            duration: '4 semaines'
          },
          {
            title: 'Analyse et Visualisation des Données',
            description: 'Pandas, NumPy, nettoyage de données, analyse exploratoire, Matplotlib, Seaborn',
            duration: '5 semaines'
          },
          {
            title: 'Analyse Statistique',
            description: 'Probabilité, test d\'hypothèse, analyse de régression, conception expérimentale',
            duration: '4 semaines'
          },
          {
            title: 'Machine Learning',
            description: 'Apprentissage supervisé et non supervisé, évaluation de modèles, ingénierie des caractéristiques',
            duration: '6 semaines'
          },
          {
            title: 'ML Avancé & Deep Learning',
            description: 'Réseaux de neurones, vision par ordinateur, traitement du langage naturel, TensorFlow',
            duration: '5 semaines'
          },
          {
            title: 'Projet Final',
            description: 'Projet de science des données de bout en bout abordant des problèmes réels',
            duration: '4 semaines'
          }
        ]
      },
      ar: {
        title: 'المنهج الدراسي',
        modules: [
          {
            title: 'أساسيات البرمجة',
            description: 'أساسيات Python، هياكل البيانات، الخوارزميات، والتحكم في الإصدار',
            duration: '4 أسابيع'
          },
          {
            title: 'تحليل وتصور البيانات',
            description: 'Pandas، NumPy، تنظيف البيانات، التحليل الاستكشافي، Matplotlib، Seaborn',
            duration: '5 أسابيع'
          },
          {
            title: 'التحليل الإحصائي',
            description: 'الاحتمالات، اختبار الفرضيات، تحليل الانحدار، التصميم التجريبي',
            duration: '4 أسابيع'
          },
          {
            title: 'تعلم الآلة',
            description: 'التعلم الخاضع للإشراف وغير الخاضع للإشراف، تقييم النموذج، هندسة الميزات',
            duration: '6 أسابيع'
          },
          {
            title: 'تعلم الآلة المتقدم والتعلم العميق',
            description: 'الشبكات العصبية، رؤية الكمبيوتر، معالجة اللغة الطبيعية، TensorFlow',
            duration: '5 أسابيع'
          },
          {
            title: 'مشروع التخرج',
            description: 'مشروع علوم البيانات الشامل الذي يعالج مشكلات العالم الحقيقي',
            duration: '4 أسابيع'
          }
        ]
      }
    },
    goals: {
      en: {
        title: 'What You Will Learn',
        list: [
          'Apply Python for data manipulation and analysis',
          'Build predictive models using machine learning',
          'Visualize and communicate data insights effectively',
          'Design and conduct statistical analyses',
          'Develop deep learning solutions for complex problems',
          'Deploy machine learning models to production'
        ]
      },
      fr: {
        title: 'Ce Que Vous Apprendrez',
        list: [
          'Appliquer Python pour la manipulation et l\'analyse de données',
          'Construire des modèles prédictifs utilisant le machine learning',
          'Visualiser et communiquer efficacement les insights des données',
          'Concevoir et mener des analyses statistiques',
          'Développer des solutions de deep learning pour des problèmes complexes',
          'Déployer des modèles de machine learning en production'
        ]
      },
      ar: {
        title: 'ما ستتعلمه',
        list: [
          'تطبيق Python لمعالجة وتحليل البيانات',
          'بناء نماذج تنبؤية باستخدام تعلم الآلة',
          'تصور وتوصيل رؤى البيانات بشكل فعال',
          'تصميم وإجراء التحليلات الإحصائية',
          'تطوير حلول التعلم العميق للمشكلات المعقدة',
          'نشر نماذج تعلم الآلة للإنتاج'
        ]
      }
    },
    careers: {
      en: {
        title: 'Career Opportunities',
        list: [
          'Data Scientist',
          'Machine Learning Engineer',
          'Data Analyst',
          'Business Intelligence Analyst',
          'AI Researcher',
          'Data Engineer'
        ]
      },
      fr: {
        title: 'Opportunités de Carrière',
        list: [
          'Data Scientist',
          'Ingénieur en Machine Learning',
          'Analyste de Données',
          'Analyste en Business Intelligence',
          'Chercheur en IA',
          'Ingénieur de Données'
        ]
      },
      ar: {
        title: 'فرص المهنية',
        list: [
          'عالم بيانات',
          'مهندس تعلم الآلة',
          'محلل بيانات',
          'محلل ذكاء الأعمال',
          'باحث في الذكاء الاصطناعي',
          'مهندس بيانات'
        ]
      }
    },
    instructors: [
      {
        name: 'Dr. Soraya Belkaid',
        title: {
          en: 'Data Science Lead',
          fr: 'Responsable Data Science',
          ar: 'مديرة علوم البيانات'
        },
        bio: {
          en: 'PhD in Computer Science with specialization in AI. Former researcher at Microsoft Research.',
          fr: 'Doctorat en informatique avec spécialisation en IA. Ancienne chercheuse chez Microsoft Research.',
          ar: 'دكتوراه في علوم الكمبيوتر مع تخصص في الذكاء الاصطناعي. باحثة سابقة في Microsoft Research.'
        },
        avatar: '/images/team/instructor-5.jpg'
      },
      {
        name: 'Omar Tazi',
        title: {
          en: 'Machine Learning Expert',
          fr: 'Expert en Machine Learning',
          ar: 'خبير في تعلم الآلة'
        },
        bio: {
          en: 'Over 10 years of experience in applying ML to business problems. Technical lead at major tech companies.',
          fr: 'Plus de 10 ans d\'expérience dans l\'application du ML aux problèmes d\'entreprise. Leader technique dans de grandes entreprises technologiques.',
          ar: 'أكثر من 10 سنوات من الخبرة في تطبيق تعلم الآلة على مشكلات الأعمال. قائد تقني في شركات تكنولوجية كبرى.'
        },
        avatar: '/images/team/instructor-6.jpg'
      }
    ],
    testimonials: [
      {
        name: 'Malik Berrada',
        role: {
          en: 'Data Scientist at Sonatrach',
          fr: 'Data Scientist chez Sonatrach',
          ar: 'عالم بيانات في Sonatrach'
        },
        content: {
          en: 'The hands-on approach and real-world projects in this program gave me practical skills that I immediately applied in my job.',
          fr: 'L\'approche pratique et les projets réels de ce programme m\'ont donné des compétences pratiques que j\'ai immédiatement appliquées dans mon travail.',
          ar: 'منحني النهج العملي والمشاريع الواقعية في هذا البرنامج مهارات عملية طبقتها على الفور في وظيفتي.'
        },
        avatar: '/images/testimonials/testimonial-5.jpg'
      },
      {
        name: 'Nadia Laroussi',
        role: {
          en: 'ML Engineer at Algerian AI Startup',
          fr: 'Ingénieure ML dans une Startup IA Algérienne',
          ar: 'مهندسة تعلم الآلة في شركة ناشئة جزائرية للذكاء الاصطناعي'
        },
        content: {
          en: 'This program helped me transition from a traditional software role to specialized ML engineering. The curriculum was comprehensive and up-to-date.',
          fr: 'Ce programme m\'a aidé à passer d\'un rôle de logiciel traditionnel à l\'ingénierie ML spécialisée. Le curriculum était complet et à jour.',
          ar: 'ساعدني هذا البرنامج على الانتقال من دور البرمجيات التقليدية إلى هندسة متخصصة في تعلم الآلة. كان المنهج شاملاً وحديثًا.'
        },
        avatar: '/images/testimonials/testimonial-6.jpg'
      }
    ],
    faq: {
      en: [
        {
          question: 'Do I need a strong math background for this program?',
          answer: 'A basic understanding of mathematics (algebra, statistics) is helpful, but we provide refresher modules and additional resources for those who need to strengthen their math skills.'
        },
        {
          question: 'What kind of computer do I need?',
          answer: 'You\'ll need a computer with at least 8GB RAM and a modern processor. Most of the heavy computation will be done on cloud platforms that we provide access to.'
        },
        {
          question: 'Will I build a portfolio during the program?',
          answer: 'Yes, you\'ll complete multiple projects throughout the program that can be showcased in your portfolio, culminating in a comprehensive capstone project.'
        }
      ],
      fr: [
        {
          question: 'Ai-je besoin de solides connaissances en mathématiques pour ce programme ?',
          answer: 'Une compréhension de base des mathématiques (algèbre, statistiques) est utile, mais nous fournissons des modules de révision et des ressources supplémentaires pour ceux qui ont besoin de renforcer leurs compétences en mathématiques.'
        },
        {
          question: 'Quel type d\'ordinateur me faut-il ?',
          answer: 'Vous aurez besoin d\'un ordinateur avec au moins 8 Go de RAM et un processeur moderne. La plupart des calculs lourds seront effectués sur des plateformes cloud auxquelles nous fournissons un accès.'
        },
        {
          question: 'Vais-je constituer un portfolio pendant le programme ?',
          answer: 'Oui, vous réaliserez plusieurs projets tout au long du programme qui pourront être présentés dans votre portfolio, aboutissant à un projet final complet.'
        }
      ],
      ar: [
        {
          question: 'هل أحتاج إلى خلفية قوية في الرياضيات لهذا البرنامج؟',
          answer: 'الفهم الأساسي للرياضيات (الجبر، الإحصاء) مفيد، لكننا نقدم وحدات تنشيطية وموارد إضافية لمن يحتاجون إلى تقوية مهاراتهم الرياضية.'
        },
        {
          question: 'ما نوع الكمبيوتر الذي أحتاجه؟',
          answer: 'ستحتاج إلى كمبيوتر بذاكرة وصول عشوائي لا تقل عن 8 جيجابايت ومعالج حديث. ستتم معظم الحسابات الثقيلة على منصات سحابية نوفر الوصول إليها.'
        },
        {
          question: 'هل سأبني محفظة أعمال خلال البرنامج؟',
          answer: 'نعم، ستكمل مشاريع متعددة طوال البرنامج يمكن عرضها في محفظة أعمالك، والتي ستتوج بمشروع تخرج شامل.'
        }
      ]
    },
    prerequisites: {
      en: ['Basic programming knowledge', 'High school level mathematics', 'Analytical thinking skills', 'Dedication to learn (25-30 hours per week)'],
      fr: ['Connaissances de base en programmation', 'Mathématiques de niveau lycée', 'Compétences de pensée analytique', 'Dévouement à apprendre (25-30 heures par semaine)'],
      ar: ['معرفة أساسية بالبرمجة', 'رياضيات مستوى المدرسة الثانوية', 'مهارات التفكير التحليلي', 'التفاني في التعلم (25-30 ساعة أسبوعيًا)']
    },
    price: {
      en: '150,000 DZD',
      fr: '150 000 DZD',
      ar: '150,000 دج'
    },
    startDates: {
      en: ['April 20, 2024', 'August 15, 2024', 'November 5, 2024'],
      fr: ['20 avril 2024', '15 août 2024', '5 novembre 2024'],
      ar: ['20 أبريل 2024', '15 أغسطس 2024', '5 نوفمبر 2024']
    }
  },
  'graphic-design': {
    id: 'graphic-design',
    curriculum: {
      en: {
        title: 'Curriculum',
        modules: [
          {
            title: 'Design Fundamentals',
            description: 'Color theory, typography, composition, design principles',
            duration: '3 weeks'
          },
          {
            title: 'Digital Tools Mastery',
            description: 'Adobe Photoshop, Illustrator, InDesign essentials',
            duration: '4 weeks'
          },
          {
            title: 'Brand Identity Design',
            description: 'Logo design, brand guidelines, visual identity systems',
            duration: '3 weeks'
          },
          {
            title: 'UI/UX Design Basics',
            description: 'Interface design, user experience principles, wireframing',
            duration: '3 weeks'
          },
          {
            title: 'Motion Graphics & Visual Effects',
            description: 'Animation principles, After Effects, motion design',
            duration: '3 weeks'
          },
          {
            title: 'Portfolio Project',
            description: 'Comprehensive design project showcasing all skills',
            duration: '2 weeks'
          }
        ]
      },
      fr: {
        title: 'Programme',
        modules: [
          {
            title: 'Fondamentaux du Design',
            description: 'Théorie des couleurs, typographie, composition, principes de design',
            duration: '3 semaines'
          },
          {
            title: 'Maîtrise des Outils Numériques',
            description: 'Essentiels d\'Adobe Photoshop, Illustrator, InDesign',
            duration: '4 semaines'
          },
          {
            title: 'Design d\'Identité de Marque',
            description: 'Conception de logo, directives de marque, systèmes d\'identité visuelle',
            duration: '3 semaines'
          },
          {
            title: 'Bases du Design UI/UX',
            description: 'Design d\'interface, principes d\'expérience utilisateur, wireframing',
            duration: '3 semaines'
          },
          {
            title: 'Motion Graphics & Effets Visuels',
            description: 'Principes d\'animation, After Effects, motion design',
            duration: '3 semaines'
          },
          {
            title: 'Projet de Portfolio',
            description: 'Projet de design complet mettant en valeur toutes les compétences',
            duration: '2 semaines'
          }
        ]
      },
      ar: {
        title: 'المنهج الدراسي',
        modules: [
          {
            title: 'أساسيات التصميم',
            description: 'نظرية الألوان، الطباعة، التكوين، مبادئ التصميم',
            duration: '3 أسابيع'
          },
          {
            title: 'إتقان الأدوات الرقمية',
            description: 'أساسيات Adobe Photoshop وIllustrator وInDesign',
            duration: '4 أسابيع'
          },
          {
            title: 'تصميم هوية العلامة التجارية',
            description: 'تصميم الشعار، إرشادات العلامة التجارية، أنظمة الهوية البصرية',
            duration: '3 أسابيع'
          },
          {
            title: 'أساسيات تصميم واجهة المستخدم/تجربة المستخدم',
            description: 'تصميم الواجهة، مبادئ تجربة المستخدم، التخطيط السلكي',
            duration: '3 أسابيع'
          },
          {
            title: 'الرسوم المتحركة والمؤثرات البصرية',
            description: 'مبادئ الحركة، After Effects، تصميم الحركة',
            duration: '3 أسابيع'
          },
          {
            title: 'مشروع المحفظة',
            description: 'مشروع تصميم شامل يعرض جميع المهارات',
            duration: 'أسبوعان'
          }
        ]
      }
    },
    goals: {
      en: {
        title: 'What You Will Learn',
        list: [
          'Create compelling visual designs across different media',
          'Master essential design software and digital tools',
          'Develop effective branding and identity systems',
          'Apply design thinking to solve visual communication problems',
          'Create motion graphics and basic animations',
          'Build a professional design portfolio'
        ]
      },
      fr: {
        title: 'Ce Que Vous Apprendrez',
        list: [
          'Créer des designs visuels convaincants à travers différents médias',
          'Maîtriser les logiciels de design essentiels et les outils numériques',
          'Développer des systèmes de marque et d\'identité efficaces',
          'Appliquer la pensée design pour résoudre des problèmes de communication visuelle',
          'Créer des motion graphics et des animations de base',
          'Construire un portfolio de design professionnel'
        ]
      },
      ar: {
        title: 'ما ستتعلمه',
        list: [
          'إنشاء تصميمات بصرية مقنعة عبر وسائط مختلفة',
          'إتقان برامج التصميم الأساسية والأدوات الرقمية',
          'تطوير أنظمة فعالة للعلامات التجارية والهوية',
          'تطبيق التفكير التصميمي لحل مشكلات التواصل البصري',
          'إنشاء رسوم متحركة وحركات أساسية',
          'بناء محفظة تصميم احترافية'
        ]
      }
    },
    careers: {
      en: {
        title: 'Career Opportunities',
        list: [
          'Graphic Designer',
          'Brand Identity Designer',
          'UI Designer',
          'Digital Artist',
          'Motion Graphics Designer',
          'Marketing Designer'
        ]
      },
      fr: {
        title: 'Opportunités de Carrière',
        list: [
          'Designer Graphique',
          'Designer d\'Identité de Marque',
          'Designer UI',
          'Artiste Numérique',
          'Designer Motion Graphics',
          'Designer Marketing'
        ]
      },
      ar: {
        title: 'فرص المهنية',
        list: [
          'مصمم جرافيك',
          'مصمم هوية العلامة التجارية',
          'مصمم واجهة المستخدم',
          'فنان رقمي',
          'مصمم رسوم متحركة',
          'مصمم تسويق'
        ]
      }
    },
    instructors: [
      {
        name: 'Salima Mansouri',
        title: {
          en: 'Creative Director',
          fr: 'Directrice Créative',
          ar: 'مديرة إبداعية'
        },
        bio: {
          en: 'Award-winning designer with 12+ years of experience in branding and visual identity design.',
          fr: 'Designer primée avec plus de 12 ans d\'expérience en branding et design d\'identité visuelle.',
          ar: 'مصممة حائزة على جوائز مع أكثر من 12 عامًا من الخبرة في تصميم العلامات التجارية والهوية البصرية.'
        },
        avatar: '/images/team/instructor-7.jpg'
      },
      {
        name: 'Karim Ouazene',
        title: {
          en: 'UI/UX Designer',
          fr: 'Designer UI/UX',
          ar: 'مصمم واجهة وتجربة المستخدم'
        },
        bio: {
          en: 'Digital product designer specializing in interface design. Previously worked with leading tech companies across MENA.',
          fr: 'Designer de produits numériques spécialisé dans la conception d\'interfaces. A travaillé avec des entreprises tech de premier plan dans la région MENA.',
          ar: 'مصمم منتجات رقمية متخصص في تصميم الواجهة. عمل سابقًا مع شركات تكنولوجية رائدة في منطقة الشرق الأوسط وشمال إفريقيا.'
        },
        avatar: '/images/team/instructor-8.jpg'
      }
    ],
    testimonials: [
      {
        name: 'Yasmine Aït',
        role: {
          en: 'Brand Designer at Local Agency',
          fr: 'Designer de Marque chez une Agence Locale',
          ar: 'مصممة علامات تجارية في وكالة محلية'
        },
        content: {
          en: 'This program helped me transition from a self-taught designer to a professional with confidence in my skills and process.',
          fr: 'Ce programme m\'a aidé à passer d\'un designer autodidacte à un professionnel ayant confiance en mes compétences et mon processus.',
          ar: 'ساعدني هذا البرنامج على الانتقال من مصممة عصامية إلى محترفة واثقة من مهاراتي وعمليتي.'
        },
        avatar: '/images/testimonials/testimonial-7.jpg'
      },
      {
        name: 'Amine Djaballah',
        role: {
          en: 'Freelance Designer',
          fr: 'Designer Freelance',
          ar: 'مصمم مستقل'
        },
        content: {
          en: 'The program gave me both technical skills and business knowledge that allowed me to start my freelance career with real clients right away.',
          fr: 'Le programme m\'a donné à la fois des compétences techniques et des connaissances commerciales qui m\'ont permis de démarrer ma carrière de freelance avec de vrais clients immédiatement.',
          ar: 'منحني البرنامج المهارات التقنية والمعرفة التجارية التي سمحت لي ببدء حياتي المهنية المستقلة مع عملاء حقيقيين على الفور.'
        },
        avatar: '/images/testimonials/testimonial-8.jpg'
      }
    ],
    faq: {
      en: [
        {
          question: 'Do I need artistic skills to succeed in this program?',
          answer: 'While having some artistic inclination is helpful, we focus on teaching design principles and techniques that can be learned regardless of your starting point. Many successful designers started with minimal artistic background.'
        },
        {
          question: 'Do I need to purchase Adobe software?',
          answer: 'We provide access to Adobe Creative Cloud during the course. After completion, you can choose to subscribe or explore alternative design tools that we also cover.'
        },
        {
          question: 'Will I need a powerful computer?',
          answer: 'A reasonably modern computer with at least 8GB RAM is recommended for running design software smoothly. We provide specifications and guidance to all enrolled students.'
        }
      ],
      fr: [
        {
          question: 'Ai-je besoin de compétences artistiques pour réussir dans ce programme ?',
          answer: 'Bien qu\'avoir une certaine inclination artistique soit utile, nous nous concentrons sur l\'enseignement des principes et techniques de design qui peuvent être appris quel que soit votre point de départ. De nombreux designers à succès ont commencé avec un bagage artistique minimal.'
        },
        {
          question: 'Dois-je acheter des logiciels Adobe ?',
          answer: 'Nous fournissons un accès à Adobe Creative Cloud pendant le cours. Après la fin, vous pouvez choisir de vous abonner ou d\'explorer des outils de design alternatifs que nous couvrons également.'
        },
        {
          question: 'Aurai-je besoin d\'un ordinateur puissant ?',
          answer: 'Un ordinateur raisonnablement moderne avec au moins 8 Go de RAM est recommandé pour faire fonctionner les logiciels de design sans problème. Nous fournissons des spécifications et des conseils à tous les étudiants inscrits.'
        }
      ],
      ar: [
        {
          question: 'هل أحتاج إلى مهارات فنية للنجاح في هذا البرنامج؟',
          answer: 'على الرغم من أن وجود ميل فني معين أمر مفيد، إلا أننا نركز على تعليم مبادئ وتقنيات التصميم التي يمكن تعلمها بغض النظر عن نقطة البداية. بدأ العديد من المصممين الناجحين بخلفية فنية بسيطة.'
        },
        {
          question: 'هل أحتاج إلى شراء برامج Adobe؟',
          answer: 'نوفر الوصول إلى Adobe Creative Cloud خلال الدورة. بعد الانتهاء، يمكنك اختيار الاشتراك أو استكشاف أدوات تصميم بديلة نغطيها أيضًا.'
        },
        {
          question: 'هل سأحتاج إلى كمبيوتر قوي؟',
          answer: 'يوصى باستخدام كمبيوتر حديث نسبيًا مع ذاكرة لا تقل عن 8 جيجابايت لتشغيل برامج التصميم بسلاسة. نقدم مواصفات وإرشادات لجميع الطلاب المسجلين.'
        }
      ]
    },
    prerequisites: {
      en: ['Basic computer skills', 'Eye for detail', 'Interest in visual arts and design', 'Willingness to learn software tools'],
      fr: ['Compétences informatiques de base', 'Souci du détail', 'Intérêt pour les arts visuels et le design', 'Volonté d\'apprendre des outils logiciels'],
      ar: ['مهارات الكمبيوتر الأساسية', 'الاهتمام بالتفاصيل', 'الاهتمام بالفنون البصرية والتصميم', 'الاستعداد لتعلم أدوات البرامج']
    },
    price: {
      en: '110,000 DZD',
      fr: '110 000 DZD',
      ar: '110,000 دج'
    },
    startDates: {
      en: ['March 25, 2024', 'July 5, 2024', 'October 10, 2024'],
      fr: ['25 mars 2024', '5 juillet 2024', '10 octobre 2024'],
      ar: ['25 مارس 2024', '5 يوليو 2024', '10 أكتوبر 2024']
    }
  }
}; 