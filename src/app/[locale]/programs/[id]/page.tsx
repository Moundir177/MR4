import React from 'react';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';
import { programDetails } from '@/data/programDetails';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define program page params
export async function generateStaticParams() {
  return Object.keys(programDetails).map((id) => ({ id }));
}

// This is used to trigger not-found.tsx
export const dynamicParams = true;

export default async function ProgramDetailPage({
  params: { locale, id },
}: {
  params: { locale: Locale; id: string };
}) {
  const dict = await getDictionary(locale);
  const program = programDetails[id];

  // If program doesn't exist, use Next.js notFound() function
  if (!program) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-neutral">
      <Header locale={locale} dictionary={dict} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {/* Get the title from programs.ts */}
            {locale === 'ar' ? 'برنامج ' : ''}
            {program.id === 'web-development' 
              ? locale === 'fr' 
                ? 'Développement Web' 
                : locale === 'ar' 
                  ? 'تطوير الويب' 
                  : 'Web Development'
              : program.id === 'digital-marketing'
                ? locale === 'fr' 
                  ? 'Marketing Digital' 
                  : locale === 'ar' 
                    ? 'التسويق الرقمي' 
                    : 'Digital Marketing'
                : program.id === 'data-science'
                  ? locale === 'fr' 
                    ? 'Science des Données' 
                    : locale === 'ar' 
                      ? 'علوم البيانات' 
                      : 'Data Science & Analytics'
                  : locale === 'fr' 
                    ? 'Design Graphique' 
                    : locale === 'ar' 
                      ? 'التصميم الجرافيكي' 
                      : 'Graphic Design'
            }
          </h1>
          <p className="text-xl mb-8 max-w-3xl">
            {locale === 'fr' 
              ? 'Formez-vous aux compétences recherchées par les employeurs pour exceller dans ce domaine en demande.'
              : locale === 'ar'
                ? 'اكتسب المهارات التي يبحث عنها أصحاب العمل للتفوق في هذا المجال المطلوب.'
                : 'Gain the skills employers are looking for to excel in this in-demand field.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/contact`} className="btn btn-accent btn-lg">
              {locale === 'fr' ? 'S\'inscrire maintenant' : locale === 'ar' ? 'سجل الآن' : 'Enroll Now'}
            </Link>
            <a href="#curriculum" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              {locale === 'fr' ? 'Voir le programme' : locale === 'ar' ? 'عرض المنهج' : 'View Curriculum'}
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {locale === 'fr' ? 'Durée' : locale === 'ar' ? 'المدة' : 'Duration'}
              </h3>
              <p className="text-xl">
                {program.curriculum[locale].modules.reduce((acc, module) => {
                  const weekCount = parseInt(module.duration.split(' ')[0]);
                  return acc + weekCount;
                }, 0)} {locale === 'fr' ? 'semaines' : locale === 'ar' ? 'أسابيع' : 'weeks'}
              </p>
            </div>
            <div className="bg-neutral-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {locale === 'fr' ? 'Prix' : locale === 'ar' ? 'السعر' : 'Price'}
              </h3>
              <p className="text-xl">{program.price[locale]}</p>
            </div>
            <div className="bg-neutral-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {locale === 'fr' ? 'Prochain départ' : locale === 'ar' ? 'تاريخ البدء القادم' : 'Next Start Date'}
              </h3>
              <p className="text-xl">{program.startDates[locale][0]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 px-4 bg-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {program.curriculum[locale].title}
          </h2>
          <div className="space-y-6">
            {program.curriculum[locale].modules.map((module, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-primary">{module.title}</h3>
                    <p className="text-gray-600 mt-2">{module.description}</p>
                  </div>
                  <div className="md:text-right">
                    <span className="bg-primary-light text-primary px-4 py-2 rounded-full inline-block">
                      {module.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {program.goals[locale].title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {program.goals[locale].list.map((goal, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-1 mr-4 bg-primary text-white p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="py-16 px-4 bg-primary-light">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {program.careers[locale].title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {program.careers[locale].list.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-lg font-medium">{career}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {locale === 'fr' ? 'Nos Instructeurs' : locale === 'ar' ? 'المدربون' : 'Our Instructors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {program.instructors.map((instructor, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-32 h-32 relative rounded-full overflow-hidden">
                  <Image 
                    src={instructor.avatar} 
                    alt={instructor.name} 
                    fill 
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-center sm:text-left">{instructor.name}</h3>
                  <p className="text-primary mb-3 text-center sm:text-left">{instructor.title[locale]}</p>
                  <p className="text-gray-600">{instructor.bio[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {locale === 'fr' ? 'Témoignages des Étudiants' : locale === 'ar' ? 'آراء الطلاب' : 'Student Testimonials'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {program.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      fill 
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-primary">{testimonial.role[locale]}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content[locale]}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {locale === 'fr' ? 'Prérequis' : locale === 'ar' ? 'المتطلبات الأساسية' : 'Prerequisites'}
          </h2>
          <div className="flex justify-center">
            <ul className="space-y-3 max-w-2xl">
              {program.prerequisites[locale].map((prerequisite, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg">{prerequisite}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {locale === 'fr' ? 'Questions Fréquemment Posées' : locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {program.faq[locale].map((item, index) => (
              <div key={index} className="collapse collapse-plus bg-white">
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} /> 
                <div className="collapse-title text-xl font-medium">
                  {item.question}
                </div>
                <div className="collapse-content"> 
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            {locale === 'fr' ? 'Prêt à Commencer Votre Parcours ?' : locale === 'ar' ? 'هل أنت مستعد لبدء رحلتك؟' : 'Ready to Start Your Journey?'}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {locale === 'fr' 
              ? 'Inscrivez-vous dès aujourd\'hui et faites le premier pas vers votre nouvelle carrière.'
              : locale === 'ar'
                ? 'سجل اليوم واتخذ الخطوة الأولى نحو مهنتك الجديدة.'
                : 'Enroll today and take the first step toward your new career.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`} className="btn btn-accent btn-lg">
              {locale === 'fr' ? 'S\'inscrire maintenant' : locale === 'ar' ? 'سجل الآن' : 'Enroll Now'}
            </Link>
            <Link href={`/${locale}/contact`} className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              {locale === 'fr' ? 'Contactez-nous' : locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      <Footer dictionary={dict} currentLocale={locale} />
      <div className="fixed bottom-4 right-4 z-50">
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </main>
  );
} 