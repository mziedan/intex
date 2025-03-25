
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define our supported languages
export type Language = 'en' | 'ar';

// Define translation interface
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations
const translations: Translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'login': 'Login',
    'register': 'Register',
    'search': 'Search...',
    
    // Hero Section
    'hero.discover': 'Discover Our Courses',
    'hero.contact': 'Contact Us',
    
    // About Section
    'about.certified': 'Certified Trainers',
    'about.trainers': 'Industry experts with proven track records',
    'about.focused': 'Focused Learning',
    'about.practical': 'Practical skills that apply to your work',
    'about.flexible': 'Flexible Schedule',
    'about.multiple': 'Multiple dates and locations to choose from',
    'about.small': 'Small Groups',
    'about.personalized': 'Personalized attention for better results',
    'about.contact': 'Contact Us',
    
    // Partners Section
    'partners.title': 'Our Partners & Certifications',
    'partners.trusted': 'Trusted by leading organizations worldwide',
    
    // Categories Section
    'categories.title': 'Training Categories',
    'categories.description': 'Explore our diverse range of professional training programs',
    'categories.view': 'View All',
    
    // Courses Section
    'courses.title': 'Featured Courses',
    'courses.explore': 'Explore all our professional training courses designed to enhance your skills and advance your career.',
    'courses.view': 'View All Courses',
    
    // Statistics Section
    'stats.years': 'Years Experience',
    'stats.courses': 'Courses Delivered',
    'stats.students': 'Students Trained',
    'stats.countries': 'Countries Served',
    
    // CTA Section
    'cta.ready': 'Ready to enhance your skills?',
    'cta.join': 'Join thousands of professionals who have transformed their careers with our courses.',
    'cta.find': 'Find a Course',
    'cta.contact': 'Contact Us',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
  },
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'login': 'تسجيل الدخول',
    'register': 'التسجيل',
    'search': 'البحث...',
    
    // Hero Section
    'hero.discover': 'اكتشف دوراتنا',
    'hero.contact': 'اتصل بنا',
    
    // About Section
    'about.certified': 'مدربون معتمدون',
    'about.trainers': 'خبراء في المجال مع سجل حافل بالإنجازات',
    'about.focused': 'تعلم مركّز',
    'about.practical': 'مهارات عملية تنطبق على عملك',
    'about.flexible': 'جدول مرن',
    'about.multiple': 'مواعيد ومواقع متعددة للاختيار من بينها',
    'about.small': 'مجموعات صغيرة',
    'about.personalized': 'اهتمام شخصي لنتائج أفضل',
    'about.contact': 'اتصل بنا',
    
    // Partners Section
    'partners.title': 'شركاؤنا والشهادات',
    'partners.trusted': 'موثوق به من قبل المؤسسات الرائدة في جميع أنحاء العالم',
    
    // Categories Section
    'categories.title': 'فئات التدريب',
    'categories.description': 'استكشف مجموعتنا المتنوعة من برامج التدريب المهني',
    'categories.view': 'عرض الكل',
    
    // Courses Section
    'courses.title': 'الدورات المميزة',
    'courses.explore': 'استكشف جميع دوراتنا التدريبية المهنية المصممة لتعزيز مهاراتك وتطوير حياتك المهنية.',
    'courses.view': 'عرض جميع الدورات',
    
    // Statistics Section
    'stats.years': 'سنوات الخبرة',
    'stats.courses': 'الدورات المقدمة',
    'stats.students': 'الطلاب المدربين',
    'stats.countries': 'البلدان المخدومة',
    
    // CTA Section
    'cta.ready': 'هل أنت مستعد لتعزيز مهاراتك؟',
    'cta.join': 'انضم إلى آلاف المهنيين الذين حولوا حياتهم المهنية من خلال دوراتنا.',
    'cta.find': 'ابحث عن دورة',
    'cta.contact': 'اتصل بنا',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or use 'en' as default
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });
  
  const [dir, setDir] = useState<string>('ltr');
  
  // Update document direction when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set direction based on language
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    setDir(direction);
    document.documentElement.dir = direction;
    
    // Optional: Add a class to body for language-specific styling
    document.body.className = `lang-${language}`;
  }, [language]);
  
  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      console.warn(`Translation not available for language: ${language}`);
      return key;
    }
    
    if (!translations[language][key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translations[language][key];
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
