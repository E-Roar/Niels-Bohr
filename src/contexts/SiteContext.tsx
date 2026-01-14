import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';
import { Language } from '@/lib/translations';
import gallery1 from '@/assets/gallery-1-desktop.webp';
import gallery2 from '@/assets/gallery-2-desktop.webp';
import gallery3 from '@/assets/gallery-3-desktop.webp';
import gallery4 from '@/assets/gallery-4-desktop.webp';
import gallery5 from '@/assets/gallery-5-desktop.webp';
import gallery6 from '@/assets/gallery-6-desktop.webp';
import logo from '@/assets/logo.png';
import chatbotAvatar from '@/assets/chatbot-avatar-desktop.webp';

// Types for all site content
export interface SiteInfo {
    name: string;
    tagline: string;
    logo: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    country: string;
}

export interface HeroContent {
    title: string;
    highlight: string;
    subtitle: string;
    bannerText: string;
    stats: { value: string; label: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
    color: string;
}

export interface AboutContent {
    title: string;
    highlight: string;
    subtitle: string;
    features: Feature[];
    missionTitle: string;
    missionText: string;
}

export interface Program {
    icon: string;
    title: string;
    age: string;
    description: string;
    features: string[];
    color: string;
}

export interface ProgramsContent {
    title: string;
    highlight: string;
    subtitle: string;
    programs: Program[];
    ctaText: string;
}

export interface GalleryImage {
    id: string;
    src: string;
    title: string;
    description: string;
}

export interface GalleryContent {
    title: string;
    highlight: string;
    subtitle: string;
    images: GalleryImage[];
}

export interface ContactContent {
    title: string;
    highlight: string;
    subtitle: string;
    formTitle: string;
    whatsappCta: string;
    features: string[];
}

export interface ChatbotSettings {
    name: string;
    avatar: string;
    greeting: string;
    systemPrompt: string;
    ragFiles: string[];
    fallbackResponse: string;
}

export interface SiteData {
    siteInfo: SiteInfo;
    hero: HeroContent;
    about: AboutContent;
    programs: ProgramsContent;
    gallery: GalleryContent;
    contact: ContactContent;
    chatbot: ChatbotSettings;
}

export interface SiteContent {
    fr: SiteData;
    ar: SiteData;
}

// Default FR content
const frData: SiteData = {
    siteInfo: {
        name: 'Groupe Scolaire Niels Bohr',
        tagline: 'Du préscolaire au lycée, nous cultivons l\'excellence académique.',
        logo: logo,
        email: 'GroupeScolaireNielsBohr@gmail.com',
        phone: '0673-384053',
        whatsapp: '212753117012',
        address: 'ALALLYA, El Jadida, Morocco',
        city: 'El Jadida',
        country: 'Maroc',
    },
    hero: {
        title: 'Bienvenue au',
        highlight: 'Groupe Scolaire Niels Bohr',
        subtitle: "Du préscolaire au lycée, nous cultivons l'excellence académique.",
        bannerText: 'Inscriptions ouvertes 2025-2026',
        stats: [
            { value: '15+', label: "Ans d'expérience" },
            { value: '100%', label: 'Réussite' },
            { value: 'Excellence', label: 'Pédagogique' },
        ],
        ctaPrimary: 'Inscrivez votre enfant',
        ctaSecondary: "Découvrir l'établissement",
    },
    about: {
        title: 'Pourquoi choisir',
        highlight: 'Niels Bohr',
        subtitle: "Notre établissement est reconnu pour son excellence et sa rigueur, offrant un parcours complet du préscolaire au lycée.",
        features: [
            { icon: 'BookOpen', title: 'Pédagogie Rigoureuse', description: "Un enseignement structuré pour une réussite garantie.", color: 'blue' },
            { icon: 'Users', title: 'Équipe Dédiée', description: 'Des enseignants engagés pour la réussite de chaque élève.', color: 'purple' },
            { icon: 'Star', title: 'Excellence', description: 'Une culture de l\'excellence académique et personnelle.', color: 'yellow' },
            { icon: 'Award', title: 'Suivi Personnalisé', description: 'Accompagnement individuel du préscolaire au lycée.', color: 'green' },
            { icon: 'Palette', title: 'Épanouissement', description: 'Activités culturelles et artistiques.', color: 'red' },
            { icon: 'Globe', title: 'Ouverture', description: 'Formation aux langues et cultures internationales.', color: 'orange' },
        ],
        missionTitle: 'Notre Devise',
        missionText: "Cultiver l'excellence académique.",
    },
    programs: {
        title: 'Nos',
        highlight: 'Cycles',
        subtitle: "Du préscolaire au lycée, un parcours d'excellence.",
        programs: [
            { icon: 'Baby', title: 'Préscolaire', age: '3 - 5 ans', description: "L'éveil et la socialisation.", features: ['Éveil sensoriel', 'Motricité', 'Langage', 'Autonomie'], color: 'yellow' },
            { icon: 'BookOpen', title: 'Primaire', age: '6 - 11 ans', description: 'Les fondements du savoir.', features: ['Lecture et écriture', 'Mathématiques', 'Découverte du monde', 'Langues'], color: 'blue' },
            { icon: 'Calculator', title: 'Collège', age: '12 - 15 ans', description: 'Consolidation et approfondissement.', features: ['Sciences', 'Lettres', 'Langues vivantes', 'Méthodologie'], color: 'purple' },
            { icon: 'GraduationCap', title: 'Lycée', age: '16 - 18 ans', description: 'Vers la réussite et les études supérieures.', features: ['Spécialités', 'Orientation', 'Préparation Bac', 'Excellence'], color: 'green' },
        ],
        ctaText: "Demander plus d'informations",
    },
    gallery: {
        title: 'Notre',
        highlight: 'Campus',
        subtitle: "Découvrez nos infrastructures modernes à El Jadida.",
        images: [
            { id: '1', src: gallery1, title: 'Salles de classe', description: 'Espaces lumineux et équipés' },
            { id: '2', src: gallery2, title: 'Espaces de vie', description: 'Convivialité et sécurité' },
            { id: '3', src: gallery3, title: 'Bibliothèque', description: 'Culture et recherche' },
            { id: '4', src: gallery4, title: 'Laboratoires', description: 'Sciences et technologie' },
            { id: '5', src: gallery5, title: 'Activités', description: 'Sport et arts' },
            { id: '6', src: gallery6, title: 'Extérieurs', description: 'Cadre agréable à ALALLYA' },
        ],
    },
    contact: {
        title: '',
        highlight: 'Contactez-nous',
        subtitle: 'Une question ? Une inscription ? Nous sommes à votre écoute.',
        formTitle: "Demande d'admission",
        whatsappCta: 'Écrivez-nous sur WhatsApp',
        features: ['Réponse rapide', "Rencontre avec la direction", 'Visite du campus'],
    },
    chatbot: {
        name: 'Assistant Niels Bohr',
        avatar: chatbotAvatar,
        greeting: "Bonjour ! 👋 Je suis l'assistant virtuel du Groupe Scolaire Niels Bohr.\n\nJe peux vous renseigner sur nos cycles, du préscolaire au lycée, et sur les inscriptions.\n\nComment puis-je vous aider ?",
        systemPrompt: "Tu es l'assistant du Groupe Scolaire Niels Bohr, un établissement privé d'excellence du préscolaire au lycée à ALALLYA, El Jadida.",
        ragFiles: [],
        fallbackResponse: "Je ne suis pas sûr de la réponse. N'hésitez pas à nous appeler au 0673-384053 ou à nous envoyer un email. 📞",
    },
};

// Default AR content
const arData: SiteData = {
    siteInfo: {
        name: 'مجموعة مدارس نيلز بور',
        tagline: 'من التعليم الأولي إلى الثانوي، نزرع التميز الأكاديمي.',
        logo: logo,
        email: 'GroupeScolaireNielsBohr@gmail.com',
        phone: '0673-384053',
        whatsapp: '212753117012',
        address: 'ALALLYA, الجديدة، المغرب',
        city: 'الجديدة',
        country: 'المغرب',
    },
    hero: {
        title: 'مرحباً بكم في',
        highlight: 'مجموعة مدارس نيلز بور',
        subtitle: "من التعليم الأولي إلى الثانوي، نزرع التميز الأكاديمي.",
        bannerText: 'التسجيل مفتوح 2025-2026',
        stats: [
            { value: '+15', label: "سنة خبرة" },
            { value: '100%', label: "نسبة النجاح" },
            { value: 'تميز', label: "بيداغوجي" },
        ],
        ctaPrimary: 'سجل طفلك',
        ctaSecondary: "اكتشف المؤسسة",
    },
    about: {
        title: 'لماذا تختار',
        highlight: 'نيلز بور',
        subtitle: "مؤسستنا معروفة بتميزها وتوفر مساراً دراسياً كاملاً من التعليم الأولي إلى الثانوي.",
        features: [
            { icon: 'BookOpen', title: 'بيداغوجية صارمة', description: "تعليم منظم لضمان النجاح.", color: 'blue' },
            { icon: 'Users', title: 'فريق متفان', description: 'أساتذة ملتزمون بنجاح كل تلميذ.', color: 'purple' },
            { icon: 'Star', title: 'التميز', description: 'ثقافة التميز الدراسي والشخصي.', color: 'yellow' },
            { icon: 'Award', title: 'متابعة شخصية', description: 'مرافقة فردية طيلة المسار الدراسي.', color: 'green' },
            { icon: 'Palette', title: 'تفتح', description: 'أنشطة ثقافية وفنية.', color: 'red' },
            { icon: 'Globe', title: 'انفتاح', description: 'تعليم اللغات والثقافات الدولية.', color: 'orange' },
        ],
        missionTitle: 'شعارنا',
        missionText: "نزرع التميز الأكاديمي.",
    },
    programs: {
        title: 'اكتشف',
        highlight: 'أسلاكنا',
        subtitle: "من التعليم الأولي إلى الثانوي، مسار من التميز.",
        programs: [
            { icon: 'Baby', title: 'التعليم الأولي', age: '3 - 5 سنوات', description: "الإيقاظ والتنشئة الاجتماعية.", features: ['إيقاظ الحواس', 'حركة', 'لغة', 'استقلالية'], color: 'yellow' },
            { icon: 'BookOpen', title: 'التعليم الابتدائي', age: '6 - 11 سنة', description: 'أسس المعرفة.', features: ['القراءة والكتابة', 'الرياضيات', 'اكتشاف العالم', 'اللغات'], color: 'blue' },
            { icon: 'Calculator', title: 'التعليم الإعدادي', age: '12 - 15 سنة', description: 'الترسيخ والتعميق.', features: ['العلوم', 'الآداب', 'اللغات الحية', 'المنهجية'], color: 'purple' },
            { icon: 'GraduationCap', title: 'التعليم الثانوي', age: '16 - 18 سنة', description: 'نحو النجاح والدراسات العليا.', features: ['التخصصات', 'التوجيه', 'تحضير البكالوريا', 'التميز'], color: 'green' },
        ],
        ctaText: "طلب المزيد من المعلومات",
    },
    gallery: {
        title: 'جولة في',
        highlight: 'المؤسسة',
        subtitle: "اكتشف فضاءاتنا الحديثة في الجديدة.",
        images: [...frData.gallery.images],
    },
    contact: {
        title: '',
        highlight: 'تواصل معنا',
        subtitle: 'لديك سؤال؟ تسجيل؟ نحن في الاستماع.',
        formTitle: "طلب تسجيل",
        whatsappCta: 'تواصل معنا عبر واتساب',
        features: ['رد سريع', "لقاء مع الإدارة", 'زيارة المؤسسة'],
    },
    chatbot: {
        name: 'مساعد نيلز بور',
        avatar: chatbotAvatar,
        greeting: "مرحباً! 👋 أنا المساعد الذكي لمجموعة مدارس نيلز بور.\n\nيمكنني مساعدتك بمعلومات حول أسلاكنا، من التعليم الأولي للثانوي، وعن التسجيل.\n\nكيف يمكنني مساعدتك؟",
        systemPrompt: "أنت مساعد مجموعة مدارس نيلز بور، مؤسسة خاصة متميزة من التعليم الأولي إلى الثانوي في الجديدة.",
        ragFiles: [],
        fallbackResponse: "عذراً، لم أتمكن من الإجابة. يمكنك الاتصال بنا على 0673-384053 أو مراسلتنا. 📞",
    },
};

const defaultContent: SiteContent = {
    fr: frData,
    ar: arData,
};

interface SiteContextType {
    content: SiteData;
    fullContent: SiteContent;
    updateSiteInfo: (info: Partial<SiteInfo>, lang?: Language) => void;
    updateHero: (hero: Partial<HeroContent>, lang?: Language) => void;
    updateAbout: (about: Partial<AboutContent>, lang?: Language) => void;
    updatePrograms: (programs: Partial<ProgramsContent>, lang?: Language) => void;
    updateGallery: (gallery: Partial<GalleryContent>, lang?: Language) => void;
    updateContact: (contact: Partial<ContactContent>, lang?: Language) => void;
    updateChatbot: (chatbot: Partial<ChatbotSettings>, lang?: Language) => void;
    resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEY = 'melrose_site_content_v2';

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { language } = useLanguage();

    const [fullContent, setFullContent] = useState<SiteContent>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migration check or fallback
                if (parsed.fr && parsed.ar) return { ...defaultContent, ...parsed };
            } catch {
                return defaultContent;
            }
        }
        return defaultContent;
    });

    // Current language content convenience accessor
    const content = fullContent[language];

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullContent));
    }, [fullContent]);

    const updateSection = <K extends keyof SiteData>(
        section: K,
        data: Partial<SiteData[K]>,
        lang: Language = language
    ) => {
        setFullContent(prev => ({
            ...prev,
            [lang]: {
                ...prev[lang],
                [section]: { ...prev[lang][section], ...data }
            }
        }));
    };

    const updateSiteInfo = (info: Partial<SiteInfo>, lang?: Language) => updateSection('siteInfo', info, lang);
    const updateHero = (hero: Partial<HeroContent>, lang?: Language) => updateSection('hero', hero, lang);
    const updateAbout = (about: Partial<AboutContent>, lang?: Language) => updateSection('about', about, lang);
    const updatePrograms = (programs: Partial<ProgramsContent>, lang?: Language) => updateSection('programs', programs, lang);
    const updateGallery = (gallery: Partial<GalleryContent>, lang?: Language) => updateSection('gallery', gallery, lang);
    const updateContact = (contact: Partial<ContactContent>, lang?: Language) => updateSection('contact', contact, lang);
    const updateChatbot = (chatbot: Partial<ChatbotSettings>, lang?: Language) => updateSection('chatbot', chatbot, lang);

    const resetToDefaults = () => {
        setFullContent(defaultContent);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <SiteContext.Provider value={{
            content,
            fullContent,
            updateSiteInfo,
            updateHero,
            updateAbout,
            updatePrograms,
            updateGallery,
            updateContact,
            updateChatbot,
            resetToDefaults,
        }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteContent = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSiteContent must be used within a SiteProvider');
    }
    return context;
};

export { defaultContent };
