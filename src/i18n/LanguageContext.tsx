/**
 * Language Context for EarthPulse
 * Provides language state management across the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, Translations, getTranslation } from './translations'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
    children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // Get initial language from localStorage or default to English
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('earthpulse-language')
        return (saved === 'ne' || saved === 'en') ? saved : 'en'
    })

    const [t, setT] = useState<Translations>(getTranslation(language))

    // Update translations when language changes
    useEffect(() => {
        setT(getTranslation(language))
        localStorage.setItem('earthpulse-language', language)

        // Update HTML lang attribute for accessibility
        document.documentElement.lang = language === 'ne' ? 'ne' : 'en'
    }, [language])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
