'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  GlobeAltIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ClockIcon,
  StarIcon,
  BriefcaseIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

// About page dictionary
const aboutDictionary = {
  en: {
    title: 'About Us',
    subtitle: 'Empowering futures through quality education',
    ourMission: 'Our Mission',
    missionDescription: 'To provide accessible, high-quality education that empowers individuals to achieve their full potential and make a positive impact in their communities.',
    ourVision: 'Our Vision',
    visionDescription: 'A world where everyone has the opportunity to learn, grow, and succeed regardless of their background or circumstances.',
    ourStory: 'Our Story',
    storyParagraph1: 'Founded in 2020, MirAcademy started with a simple idea: make quality education accessible to everyone. What began as a small collection of online courses has grown into a comprehensive learning platform serving thousands of students worldwide.',
    storyParagraph2: 'Our team of dedicated educators and technologists work tirelessly to create engaging learning experiences that help our students achieve their goals and transform their lives.',
    whyChooseUs: 'Why Choose Us',
    features: {
      expertInstructors: {
        title: 'Expert Instructors',
        description: 'Learn from industry professionals with real-world experience'
      },
      flexibleLearning: {
        title: 'Flexible Learning',
        description: 'Study at your own pace, anywhere and anytime'
      },
      practicalSkills: {
        title: 'Practical Skills',
        description: 'Gain hands-on experience through projects and case studies'
      },
      certification: {
        title: 'Certification',
        description: 'Earn recognized certificates to showcase your achievements'
      }
    },
    ourTeam: 'Our Team',
    teamMembers: {
      member1: {
        name: 'Ahmed Rahman',
        role: 'Founder & CEO',
        bio: 'Former educator with 15+ years of experience in technology and education.'
      },
      member2: {
        name: 'Sarah Johnson',
        role: 'Chief Learning Officer',
        bio: 'Passionate about creating effective learning experiences that engage and inspire.'
      },
      member3: {
        name: 'Mohammed Ali',
        role: 'Head of Technology',
        bio: 'Tech enthusiast focused on building accessible and user-friendly educational platforms.'
      },
      member4: {
        name: 'Lisa Chen',
        role: 'Content Director',
        bio: 'Curriculum expert with a background in instructional design and educational psychology.'
      }
    },
    ourValues: 'Our Values',
    values: {
      accessibility: {
        title: 'Accessibility',
        description: 'Education should be available to everyone regardless of location or financial situation.'
      },
      quality: {
        title: 'Quality',
        description: 'We maintain high standards in all our courses and learning materials.'
      },
      innovation: {
        title: 'Innovation',
        description: 'We constantly explore new ways to improve the learning experience.'
      },
      community: {
        title: 'Community',
        description: 'We foster a supportive environment where learners can connect and collaborate.'
      }
    },
    impactNumbers: {
      studentsTitle: 'Students',
      coursesTitle: 'Courses',
      instructorsTitle: 'Instructors',
      countriesTitle: 'Countries'
    },
    partners: 'Our Partners',
    joinOurJourney: 'Join Our Journey',
    startLearning: 'Start Learning',
    contactUs: 'Contact Us'
  },
  fr: {
    title: 'À Propos de Nous',
    subtitle: 'Construire des avenirs meilleurs grâce à une éducation de qualité',
    ourMission: 'Notre Mission',
    missionDescription: 'Fournir une éducation accessible et de haute qualité qui permet aux individus d\'atteindre leur plein potentiel et d\'avoir un impact positif dans leurs communautés.',
    ourVision: 'Notre Vision',
    visionDescription: 'Un monde où chacun a la possibilité d\'apprendre, de grandir et de réussir, quels que soient ses antécédents ou sa situation.',
    ourStory: 'Notre Histoire',
    storyParagraph1: 'Fondée en 2020, MirAcademy a débuté avec une idée simple : rendre l\'éducation de qualité accessible à tous. Ce qui a commencé comme une petite collection de cours en ligne est devenu une plateforme d\'apprentissage complète servant des milliers d\'étudiants dans le monde entier.',
    storyParagraph2: 'Notre équipe d\'éducateurs et de technologues dévoués travaille sans relâche pour créer des expériences d\'apprentissage engageantes qui aident nos étudiants à atteindre leurs objectifs et à transformer leur vie.',
    whyChooseUs: 'Pourquoi Nous Choisir',
    features: {
      expertInstructors: {
        title: 'Instructeurs Experts',
        description: 'Apprenez des professionnels de l\'industrie avec une expérience réelle'
      },
      flexibleLearning: {
        title: 'Apprentissage Flexible',
        description: 'Étudiez à votre propre rythme, n\'importe où et n\'importe quand'
      },
      practicalSkills: {
        title: 'Compétences Pratiques',
        description: 'Acquérir une expérience pratique grâce à des projets et des études de cas'
      },
      certification: {
        title: 'Certification',
        description: 'Obtenez des certificats reconnus pour mettre en valeur vos réalisations'
      }
    },
    ourTeam: 'Notre Équipe',
    teamMembers: {
      member1: {
        name: 'Ahmed Rahman',
        role: 'Fondateur et PDG',
        bio: 'Ancien éducateur avec plus de 15 ans d\'expérience en technologie et en éducation.'
      },
      member2: {
        name: 'Sarah Johnson',
        role: 'Directrice de l\'Apprentissage',
        bio: 'Passionnée par la création d\'expériences d\'apprentissage efficaces qui engagent et inspirent.'
      },
      member3: {
        name: 'Mohammed Ali',
        role: 'Chef de la Technologie',
        bio: 'Passionné de technologie, axé sur la création de plateformes éducatives accessibles et conviviales.'
      },
      member4: {
        name: 'Lisa Chen',
        role: 'Directrice de Contenu',
        bio: 'Experte en programmes d\'études avec une formation en conception pédagogique et en psychologie éducative.'
      }
    },
    ourValues: 'Nos Valeurs',
    values: {
      accessibility: {
        title: 'Accessibilité',
        description: 'L\'éducation devrait être accessible à tous, indépendamment de l\'emplacement ou de la situation financière.'
      },
      quality: {
        title: 'Qualité',
        description: 'Nous maintenons des normes élevées dans tous nos cours et matériels d\'apprentissage.'
      },
      innovation: {
        title: 'Innovation',
        description: 'Nous explorons constamment de nouvelles façons d\'améliorer l\'expérience d\'apprentissage.'
      },
      community: {
        title: 'Communauté',
        description: 'Nous favorisons un environnement favorable où les apprenants peuvent se connecter et collaborer.'
      }
    },
    impactNumbers: {
      studentsTitle: 'Étudiants',
      coursesTitle: 'Cours',
      instructorsTitle: 'Instructeurs',
      countriesTitle: 'Pays'
    },
    partners: 'Nos Partenaires',
    joinOurJourney: 'Rejoignez Notre Aventure',
    startLearning: 'Commencer à Apprendre',
    contactUs: 'Contactez-Nous'
  },
  ar: {
    title: 'معلومات عنا',
    subtitle: 'تمكين المستقبل من خلال التعليم الجيد',
    ourMission: 'مهمتنا',
    missionDescription: 'توفير تعليم عالي الجودة وسهل الوصول يمكن الأفراد من تحقيق إمكاناتهم الكاملة وإحداث تأثير إيجابي في مجتمعاتهم.',
    ourVision: 'رؤيتنا',
    visionDescription: 'عالم يتمتع فيه الجميع بفرصة التعلم والنمو والنجاح بغض النظر عن خلفيتهم أو ظروفهم.',
    ourStory: 'قصتنا',
    storyParagraph1: 'تأسست MirAcademy في عام 2020، بفكرة بسيطة: جعل التعليم عالي الجودة متاحًا للجميع. ما بدأ كمجموعة صغيرة من الدورات عبر الإنترنت نما ليصبح منصة تعليمية شاملة تخدم آلاف الطلاب في جميع أنحاء العالم.',
    storyParagraph2: 'يعمل فريقنا من المعلمين والتقنيين المتفانين بلا كلل لإنشاء تجارب تعليمية جذابة تساعد طلابنا على تحقيق أهدافهم وتحويل حياتهم.',
    whyChooseUs: 'لماذا تختارنا',
    features: {
      expertInstructors: {
        title: 'مدربون خبراء',
        description: 'تعلم من المحترفين في الصناعة ذوي الخبرة الواقعية'
      },
      flexibleLearning: {
        title: 'تعلم مرن',
        description: 'الدراسة بالوتيرة الخاصة بك، في أي مكان وفي أي وقت'
      },
      practicalSkills: {
        title: 'مهارات عملية',
        description: 'اكتساب خبرة عملية من خلال المشاريع ودراسات الحالة'
      },
      certification: {
        title: 'شهادات',
        description: 'احصل على شهادات معترف بها لإظهار إنجازاتك'
      }
    },
    ourTeam: 'فريقنا',
    teamMembers: {
      member1: {
        name: 'أحمد رحمن',
        role: 'المؤسس والرئيس التنفيذي',
        bio: 'معلم سابق مع أكثر من 15 عامًا من الخبرة في التكنولوجيا والتعليم.'
      },
      member2: {
        name: 'سارة جونسون',
        role: 'مديرة التعلم',
        bio: 'متحمسة لإنشاء تجارب تعليمية فعالة تشرك وتلهم.'
      },
      member3: {
        name: 'محمد علي',
        role: 'رئيس التكنولوجيا',
        bio: 'متحمس للتكنولوجيا يركز على بناء منصات تعليمية سهلة الوصول وسهلة الاستخدام.'
      },
      member4: {
        name: 'ليزا تشن',
        role: 'مديرة المحتوى',
        bio: 'خبيرة في المناهج الدراسية مع خلفية في التصميم التعليمي وعلم النفس التربوي.'
      }
    },
    ourValues: 'قيمنا',
    values: {
      accessibility: {
        title: 'سهولة الوصول',
        description: 'يجب أن يكون التعليم متاحًا للجميع بغض النظر عن الموقع أو الوضع المالي.'
      },
      quality: {
        title: 'الجودة',
        description: 'نحافظ على معايير عالية في جميع دوراتنا ومواد التعلم.'
      },
      innovation: {
        title: 'الابتكار',
        description: 'نستكشف باستمرار طرقًا جديدة لتحسين تجربة التعلم.'
      },
      community: {
        title: 'المجتمع',
        description: 'نحن نعزز بيئة داعمة حيث يمكن للمتعلمين التواصل والتعاون.'
      }
    },
    impactNumbers: {
      studentsTitle: 'طلاب',
      coursesTitle: 'دورات',
      instructorsTitle: 'مدربون',
      countriesTitle: 'دول'
    },
    partners: 'شركاؤنا',
    joinOurJourney: 'انضم إلى رحلتنا',
    startLearning: 'ابدأ التعلم',
    contactUs: 'اتصل بنا'
  }
};

// Mock data
const impactData = {
  students: 25000,
  courses: 150,
  instructors: 75,
  countries: 120
};

const partnerLogos = [
  '/images/partners/partner1.png',
  '/images/partners/partner2.png',
  '/images/partners/partner3.png',
  '/images/partners/partner4.png',
  '/images/partners/partner5.png',
  '/images/partners/partner6.png',
];

export default function AboutPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = aboutDictionary[locale as keyof typeof aboutDictionary] || aboutDictionary.en;
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{dictionary.title}</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">{dictionary.subtitle}</p>
        </div>
      </div>
      
      {/* Mission and Vision */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-neutral-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <RocketLaunchIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{dictionary.ourMission}</h2>
              <p className="text-gray-600 leading-relaxed">{dictionary.missionDescription}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <GlobeAltIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{dictionary.ourVision}</h2>
              <p className="text-gray-600 leading-relaxed">{dictionary.visionDescription}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{dictionary.ourStory}</h2>
            <div className="text-gray-600 space-y-4">
              <p>{dictionary.storyParagraph1}</p>
              <p>{dictionary.storyParagraph2}</p>
            </div>
          </div>
          
          {/* Impact Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{impactData.students.toLocaleString()}+</div>
              <div className="text-gray-600">{dictionary.impactNumbers.studentsTitle}</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{impactData.courses}+</div>
              <div className="text-gray-600">{dictionary.impactNumbers.coursesTitle}</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{impactData.instructors}+</div>
              <div className="text-gray-600">{dictionary.impactNumbers.instructorsTitle}</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{impactData.countries}+</div>
              <div className="text-gray-600">{dictionary.impactNumbers.countriesTitle}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{dictionary.whyChooseUs}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{dictionary.features.expertInstructors.title}</h3>
              <p className="text-gray-600 text-sm">{dictionary.features.expertInstructors.description}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{dictionary.features.flexibleLearning.title}</h3>
              <p className="text-gray-600 text-sm">{dictionary.features.flexibleLearning.description}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{dictionary.features.practicalSkills.title}</h3>
              <p className="text-gray-600 text-sm">{dictionary.features.practicalSkills.description}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{dictionary.features.certification.title}</h3>
              <p className="text-gray-600 text-sm">{dictionary.features.certification.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{dictionary.ourValues}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <BuildingLibraryIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{dictionary.values.accessibility.title}</h3>
                  <p className="text-gray-600">{dictionary.values.accessibility.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <StarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{dictionary.values.quality.title}</h3>
                  <p className="text-gray-600">{dictionary.values.quality.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <LightBulbIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{dictionary.values.innovation.title}</h3>
                  <p className="text-gray-600">{dictionary.values.innovation.description}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{dictionary.values.community.title}</h3>
                  <p className="text-gray-600">{dictionary.values.community.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{dictionary.ourTeam}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                  AR
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{dictionary.teamMembers.member1.name}</h3>
              <p className="text-primary text-sm mb-3">{dictionary.teamMembers.member1.role}</p>
              <p className="text-gray-600 text-sm">{dictionary.teamMembers.member1.bio}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                  SJ
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{dictionary.teamMembers.member2.name}</h3>
              <p className="text-primary text-sm mb-3">{dictionary.teamMembers.member2.role}</p>
              <p className="text-gray-600 text-sm">{dictionary.teamMembers.member2.bio}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                  MA
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{dictionary.teamMembers.member3.name}</h3>
              <p className="text-primary text-sm mb-3">{dictionary.teamMembers.member3.role}</p>
              <p className="text-gray-600 text-sm">{dictionary.teamMembers.member3.bio}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                  LC
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{dictionary.teamMembers.member4.name}</h3>
              <p className="text-primary text-sm mb-3">{dictionary.teamMembers.member4.role}</p>
              <p className="text-gray-600 text-sm">{dictionary.teamMembers.member4.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Partners */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{dictionary.partners}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
                <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                  Partner {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{dictionary.joinOurJourney}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/courses`}
              className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              {dictionary.startLearning}
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              {dictionary.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 