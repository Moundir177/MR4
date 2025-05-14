'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';

// Contact page dictionary
const contactDictionary = {
  en: {
    title: 'Contact Us',
    subtitle: 'Have a question or need assistance? We\'re here to help!',
    contactInfo: 'Contact Information',
    contactFormTitle: 'Send us a Message',
    formFields: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number (Optional)',
      subject: 'Subject',
      message: 'Your Message',
      submit: 'Send Message'
    },
    contactDetails: {
      address: {
        title: 'Our Address',
        content: '123 Education Street, City Center, Country'
      },
      email: {
        title: 'Email Us',
        content: 'info@miracademy.com',
        support: 'support@miracademy.com'
      },
      phone: {
        title: 'Call Us',
        content: '+1 (555) 123-4567',
        support: '+1 (555) 765-4321'
      },
      hours: {
        title: 'Working Hours',
        content: 'Monday - Friday: 9AM - 6PM',
        weekend: 'Saturday: 10AM - 4PM'
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'How do I enroll in a course?',
          answer: 'To enroll in a course, browse our course catalog, select the course you\'re interested in, and click the "Enroll Now" button. You\'ll be guided through the registration and payment process.'
        },
        {
          question: 'Can I access courses on mobile devices?',
          answer: 'Yes, our platform is fully responsive and works on all devices including smartphones and tablets. You can learn anytime, anywhere.'
        },
        {
          question: 'Do you offer certificates upon completion?',
          answer: 'Yes, upon successful completion of a course, you\'ll receive a digital certificate that you can download, print, or share on your social media profiles.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards, PayPal, and bank transfers. Some courses also offer installment payment options.'
        },
        {
          question: 'How do I request a refund?',
          answer: 'If you\'re not satisfied with a course, you can request a refund within 30 days of purchase through your account dashboard or by contacting our support team.'
        }
      ]
    },
    messageSent: 'Message Sent!',
    messageSuccess: 'Thank you for your message. We\'ll get back to you as soon as possible.',
    formError: 'Please fill out all required fields correctly.'
  },
  fr: {
    title: 'Contactez-Nous',
    subtitle: 'Vous avez une question ou besoin d\'aide? Nous sommes là pour vous aider!',
    contactInfo: 'Informations de Contact',
    contactFormTitle: 'Envoyez-nous un Message',
    formFields: {
      name: 'Nom Complet',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone (Optionnel)',
      subject: 'Sujet',
      message: 'Votre Message',
      submit: 'Envoyer le Message'
    },
    contactDetails: {
      address: {
        title: 'Notre Adresse',
        content: '123 Rue de l\'Éducation, Centre-ville, Pays'
      },
      email: {
        title: 'Envoyez-nous un Email',
        content: 'info@miracademy.com',
        support: 'support@miracademy.com'
      },
      phone: {
        title: 'Appelez-nous',
        content: '+1 (555) 123-4567',
        support: '+1 (555) 765-4321'
      },
      hours: {
        title: 'Heures d\'Ouverture',
        content: 'Lundi - Vendredi: 9h - 18h',
        weekend: 'Samedi: 10h - 16h'
      }
    },
    faq: {
      title: 'Questions Fréquemment Posées',
      questions: [
        {
          question: 'Comment puis-je m\'inscrire à un cours?',
          answer: 'Pour vous inscrire à un cours, parcourez notre catalogue de cours, sélectionnez le cours qui vous intéresse et cliquez sur le bouton "S\'inscrire maintenant". Vous serez guidé tout au long du processus d\'inscription et de paiement.'
        },
        {
          question: 'Puis-je accéder aux cours sur les appareils mobiles?',
          answer: 'Oui, notre plateforme est entièrement responsive et fonctionne sur tous les appareils, y compris les smartphones et les tablettes. Vous pouvez apprendre n\'importe quand, n\'importe où.'
        },
        {
          question: 'Offrez-vous des certificats à la fin?',
          answer: 'Oui, après avoir terminé avec succès un cours, vous recevrez un certificat numérique que vous pourrez télécharger, imprimer ou partager sur vos profils de médias sociaux.'
        },
        {
          question: 'Quels modes de paiement acceptez-vous?',
          answer: 'Nous acceptons les principales cartes de crédit, PayPal et les virements bancaires. Certains cours offrent également des options de paiement échelonné.'
        },
        {
          question: 'Comment puis-je demander un remboursement?',
          answer: 'Si vous n\'êtes pas satisfait d\'un cours, vous pouvez demander un remboursement dans les 30 jours suivant l\'achat via votre tableau de bord de compte ou en contactant notre équipe d\'assistance.'
        }
      ]
    },
    messageSent: 'Message Envoyé!',
    messageSuccess: 'Merci pour votre message. Nous vous répondrons dès que possible.',
    formError: 'Veuillez remplir correctement tous les champs obligatoires.'
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'هل لديك سؤال أو تحتاج إلى مساعدة؟ نحن هنا للمساعدة!',
    contactInfo: 'معلومات الاتصال',
    contactFormTitle: 'أرسل لنا رسالة',
    formFields: {
      name: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف (اختياري)',
      subject: 'الموضوع',
      message: 'رسالتك',
      submit: 'إرسال الرسالة'
    },
    contactDetails: {
      address: {
        title: 'عنواننا',
        content: '123 شارع التعليم، وسط المدينة، البلد'
      },
      email: {
        title: 'أرسل لنا بريدًا إلكترونيًا',
        content: 'info@miracademy.com',
        support: 'support@miracademy.com'
      },
      phone: {
        title: 'اتصل بنا',
        content: '+1 (555) 123-4567',
        support: '+1 (555) 765-4321'
      },
      hours: {
        title: 'ساعات العمل',
        content: 'الاثنين - الجمعة: 9 صباحًا - 6 مساءً',
        weekend: 'السبت: 10 صباحًا - 4 مساءً'
      }
    },
    faq: {
      title: 'الأسئلة الشائعة',
      questions: [
        {
          question: 'كيف يمكنني التسجيل في دورة؟',
          answer: 'للتسجيل في دورة، تصفح كتالوج الدورات التدريبية لدينا، وحدد الدورة التي تهتم بها، وانقر على زر "التسجيل الآن". سيتم إرشادك خلال عملية التسجيل والدفع.'
        },
        {
          question: 'هل يمكنني الوصول إلى الدورات على الأجهزة المحمولة؟',
          answer: 'نعم، منصتنا متوافقة تمامًا وتعمل على جميع الأجهزة بما في ذلك الهواتف الذكية والأجهزة اللوحية. يمكنك التعلم في أي وقت وفي أي مكان.'
        },
        {
          question: 'هل تقدمون شهادات عند الانتهاء؟',
          answer: 'نعم، عند الانتهاء بنجاح من دورة، ستحصل على شهادة رقمية يمكنك تنزيلها أو طباعتها أو مشاركتها على ملفات التواصل الاجتماعي الخاصة بك.'
        },
        {
          question: 'ما هي طرق الدفع التي تقبلونها؟',
          answer: 'نحن نقبل بطاقات الائتمان الرئيسية، PayPal، والتحويلات المصرفية. تقدم بعض الدورات أيضًا خيارات الدفع بالتقسيط.'
        },
        {
          question: 'كيف يمكنني طلب استرداد المبلغ المدفوع؟',
          answer: 'إذا لم تكن راضيًا عن دورة، يمكنك طلب استرداد المبلغ المدفوع في غضون 30 يومًا من الشراء من خلال لوحة تحكم حسابك أو عن طريق الاتصال بفريق الدعم لدينا.'
        }
      ]
    },
    messageSent: 'تم إرسال الرسالة!',
    messageSuccess: 'شكرًا لرسالتك. سنعود إليك في أقرب وقت ممكن.',
    formError: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.'
  }
};

export default function ContactPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = contactDictionary[locale as keyof typeof contactDictionary] || contactDictionary.en;
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: ''
  });
  
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        error: dictionary.formError
      });
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        error: ''
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  // Toggle FAQ questions
  const toggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{dictionary.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{dictionary.contactInfo}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{dictionary.contactDetails.address.title}</h3>
                  <p className="text-gray-600">{dictionary.contactDetails.address.content}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{dictionary.contactDetails.email.title}</h3>
                  <p className="text-gray-600">{dictionary.contactDetails.email.content}</p>
                  <p className="text-gray-600">{dictionary.contactDetails.email.support}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{dictionary.contactDetails.phone.title}</h3>
                  <p className="text-gray-600">{dictionary.contactDetails.phone.content}</p>
                  <p className="text-gray-600">{dictionary.contactDetails.phone.support}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{dictionary.contactDetails.hours.title}</h3>
                  <p className="text-gray-600">{dictionary.contactDetails.hours.content}</p>
                  <p className="text-gray-600">{dictionary.contactDetails.hours.weekend}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{dictionary.contactFormTitle}</h2>
            
            {formStatus.submitted && formStatus.success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{dictionary.messageSent}</h3>
                <p className="text-gray-600">{dictionary.messageSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {dictionary.formFields.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {dictionary.formFields.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {dictionary.formFields.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {dictionary.formFields.subject} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {dictionary.formFields.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                {formStatus.error && (
                  <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
                    {formStatus.error}
                  </div>
                )}
                
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                  >
                    {dictionary.formFields.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{dictionary.faq.title}</h2>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {dictionary.faq.questions.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 transition-transform ${
                      activeQuestion === index ? 'transform rotate-180' : ''
                    }`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-gray-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={activeQuestion === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {activeQuestion === index && (
                  <div className="p-6 pt-0 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-4 overflow-hidden">
          <div className="relative w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="flex items-center justify-center">
              <MapPinIcon className="h-12 w-12 text-gray-400" />
              <span className="text-lg text-gray-500 ml-2">Google Maps would be embedded here</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 