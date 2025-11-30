/**
 * Language Toggle Component
 * Switches between English and Nepali (नेपाली)
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ne' : 'en')
    }

    return (
        <motion.button
            onClick={toggleLanguage}
            className="language-toggle"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Language"
        >
            <span className={`text-sm font-semibold ${language === 'en' ? 'text-cyan-400' : 'text-gray-400'}`}>
                EN
            </span>
            <div className="relative w-10 h-5 bg-slate-700 rounded-full">
                <motion.div
                    className="absolute top-0.5 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
                    animate={{ left: language === 'en' ? '2px' : '22px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </div>
            <span className={`text-sm font-semibold nepali-text ${language === 'ne' ? 'text-cyan-400' : 'text-gray-400'}`}>
                नेपाली
            </span>
        </motion.button>
    )
}

export default LanguageToggle
