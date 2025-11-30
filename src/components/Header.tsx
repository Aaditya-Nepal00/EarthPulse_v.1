import React from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaBook, FaDownload, FaChartLine } from 'react-icons/fa'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'

interface HeaderProps {
  onToggleComparison: () => void
  onToggleStory: () => void
  onToggleDownload: () => void
  onToggleMobileMenu: () => void
  isMobileMenuOpen: boolean
}

const Header: React.FC<HeaderProps> = ({
  onToggleComparison,
  onToggleStory,
  onToggleDownload,
  onToggleMobileMenu,
  isMobileMenuOpen
}) => {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="h-full max-w-screen-2xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4 md:gap-6">

        {/* Left Section: Logo & Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div
            className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-xl md:text-2xl">🌍</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          </motion.div>

          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {t.appName}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 leading-none hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Section: Navigation & Actions */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Comparison Button - Hide on small mobile */}
          <button
            onClick={onToggleComparison}
            className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <FaChartLine className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{t.comparison}</span>
          </button>

          {/* Stories Button - Hide on small mobile */}
          <button
            onClick={onToggleStory}
            className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <FaBook className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{t.stories}</span>
          </button>

          {/* Download Button - Show icon only on mobile */}
          <button
            onClick={onToggleDownload}
            className="flex items-center gap-2 px-3 md:px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <FaDownload className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{t.download}</span>
          </button>

          {/* LIVE Indicator */}
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium text-sm">LIVE</span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 md:gap-2 bg-slate-800/50 rounded-lg p-1">
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button - Visible only on small screens (< sm) */}
          <button
            onClick={onToggleMobileMenu}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (for < sm) */}
      {isMobileMenuOpen && (
        <motion.div
          className="sm:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-4 shadow-2xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onToggleComparison()
                onToggleMobileMenu()
              }}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <FaChartLine />
              <span>{t.comparison}</span>
            </button>

            <button
              onClick={() => {
                onToggleStory()
                onToggleMobileMenu()
              }}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <FaBook />
              <span>{t.stories}</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
