import { Locale } from '@/i18n/settings';

export interface Program {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  duration: Record<Locale, string>;
  level: Record<Locale, string>;
  color: string;
  image: string;
}

export const programs: Program[] = [
  {
    id: 'web-development',
    title: {
      fr: 'Développement Web',
      ar: 'تطوير الويب',
      en: 'Web Development',
    },
    description: {
      fr: 'Apprenez le développement web moderne avec React, Node.js et plus.',
      ar: 'تعلم تطوير الويب الحديث باستخدام React و Node.js والمزيد.',
      en: 'Learn modern web development with React, Node.js and more.',
    },
    duration: {
      fr: '6 mois',
      ar: '6 أشهر',
      en: '6 months',
    },
    level: {
      fr: 'Débutant à Avancé',
      ar: 'من المبتدئ إلى المتقدم',
      en: 'Beginner to Advanced',
    },
    color: 'bg-primary-light',
    image: '/images/programs/web-dev.jpg',
  },
  {
    id: 'digital-marketing',
    title: {
      fr: 'Marketing Digital',
      ar: 'التسويق الرقمي',
      en: 'Digital Marketing',
    },
    description: {
      fr: 'Maîtrisez les stratégies et techniques de marketing digital.',
      ar: 'إتقان استراتيجيات وتقنيات التسويق الرقمي.',
      en: 'Master digital marketing strategies and techniques.',
    },
    duration: {
      fr: '3 mois',
      ar: '3 أشهر',
      en: '3 months',
    },
    level: {
      fr: 'Tous niveaux',
      ar: 'جميع المستويات',
      en: 'All Levels',
    },
    color: 'bg-secondary-light',
    image: '/images/programs/marketing.jpg',
  },
  {
    id: 'data-science',
    title: {
      fr: 'Science des Données',
      ar: 'علوم البيانات',
      en: 'Data Science & Analytics',
    },
    description: {
      fr: 'Apprenez à analyser les données et à construire des modèles ML.',
      ar: 'تعلم تحليل البيانات وبناء نماذج التعلم الآلي.',
      en: 'Learn to analyze data and build ML models.',
    },
    duration: {
      fr: '8 mois',
      ar: '8 أشهر',
      en: '8 months',
    },
    level: {
      fr: 'Intermédiaire',
      ar: 'متوسط',
      en: 'Intermediate',
    },
    color: 'bg-accent-dark',
    image: '/images/programs/data-science.jpg',
  },
  {
    id: 'graphic-design',
    title: {
      fr: 'Design Graphique',
      ar: 'التصميم الجرافيكي',
      en: 'Graphic Design',
    },
    description: {
      fr: 'Maîtrisez les outils et techniques de design graphique.',
      ar: 'إتقان أدوات وتقنيات التصميم الجرافيكي.',
      en: 'Master graphic design tools and techniques.',
    },
    duration: {
      fr: '4 mois',
      ar: '4 أشهر',
      en: '4 months',
    },
    level: {
      fr: 'Débutant à Intermédiaire',
      ar: 'من المبتدئ إلى المتوسط',
      en: 'Beginner to Intermediate',
    },
    color: 'bg-primary-dark',
    image: '/images/programs/design.jpg',
  },
]; 