import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    direction: 'ltr' | 'rtl';
    t: typeof translations.fr;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'melrose_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        return (saved === 'ar' || saved === 'fr') ? saved : 'fr';
    });

    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const t = translations[language];

    useEffect(() => {
        localStorage.setItem(LANG_STORAGE_KEY, language);
        document.documentElement.dir = direction;
        document.documentElement.lang = language;
    }, [language, direction]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const toggleLanguage = () => {
        setLanguageState(prev => prev === 'fr' ? 'ar' : 'fr');
    };

    return (
        <LanguageContext.Provider value={{
            language,
            direction,
            t,
            setLanguage,
            toggleLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
