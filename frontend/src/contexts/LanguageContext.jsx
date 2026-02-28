import { createContext, useState, useContext, useEffect } from 'react';
import en from '../locales/en.json';
import bn from '../locales/bn.json';

const translations = { en, bn };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default to English

    useEffect(() => {
        // Check if there's a saved language preference in localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && translations[savedLanguage]) {
            setLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
            localStorage.setItem('language', lang);
        }
    };

    const toggleLanguage = () => {
        changeLanguage(language === 'en' ? 'bn' : 'en');
    };

    // Function to retrieve translations based on keys (e.g., 'home.hero.title')
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to English if translation is missing in Bengali, or return the key itself
                let fallbackValue = translations['en'];
                for (const backupK of keys) {
                    if (fallbackValue && fallbackValue[backupK] !== undefined) {
                        fallbackValue = fallbackValue[backupK]
                    } else {
                        return key; // Returns 'home.hero.title' if literally nothing exists
                    }
                }
                return fallbackValue;
            }
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
