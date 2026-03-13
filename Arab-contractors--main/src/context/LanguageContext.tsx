import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav_home": "Home",
    "nav_about": "About",
    "nav_projects": "Projects",
    "nav_sectors": "Sectors",
    "nav_gallery": "Gallery",
    "nav_news": "News",
    "nav_contact": "Contact",
    "hero_subtitle": "SINCE 1955 — BUILDING THE FUTURE",
    "hero_title": "Engineering Tomorrow's Infrastructure Today",
    "hero_desc": "One of the largest international construction companies, delivering excellence across the Middle East and Africa.",
    "btn_explore": "Our Projects",
    "btn_story": "Contact Us",
    "footer_rights": "Arab Contractors. All rights reserved.",
    "footer_privacy": "Privacy Policy",
    "footer_terms": "Terms of Service",
    "footer_quick_links": "Quick Links",
    "footer_contact": "Contact",
    "footer_follow": "Follow Us",
    "footer_address": "34 Adly Street - Cairo, Egypt",
    "footer_desc": "One of the largest and oldest construction companies in the Middle East and Africa, with roots extending back more than half a century.",
    "menu": "MENU"
  },
  ar: {
    "nav_home": "الرئيسية",
    "nav_about": "من نحن",
    "nav_projects": "المشاريع",
    "nav_sectors": "القطاعات",
    "nav_gallery": "المعرض",
    "nav_news": "الأخبار",
    "nav_contact": "اتصل بنا",
    "hero_subtitle": "منذ عام 1955 — نبني المستقبل",
    "hero_title": "هندسة البنية التحتية للغد، اليوم",
    "hero_desc": "واحدة من أكبر شركات المقاولات الدولية، تقدم التميز في جميع أنحاء الشرق الأوسط وأفريقيا.",
    "btn_explore": "مشاريعنا",
    "btn_story": "اتصل بنا",
    "footer_rights": "المقاولون العرب. جميع الحقوق محفوظة.",
    "footer_privacy": "سياسة الخصوصية",
    "footer_terms": "شروط الخدمة",
    "footer_quick_links": "روابط سريعة",
    "footer_contact": "اتصل بنا",
    "footer_follow": "تابعنا",
    "footer_address": "34 شارع عدلي - القاهرة، مصر",
    "footer_desc": "واحدة من أكبر وأقدم شركات المقاولات في الشرق الأوسط وأفريقيا، بجذور تمتد لأكثر من نصف قرن.",
    "menu": "القائمة"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
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
