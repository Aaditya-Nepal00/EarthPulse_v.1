/**
 * Storytelling Modal - Complete Redesign
 * Cinematic full-bleed dark modal with real Nepal stories
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { stories } from '../data/stories'
import ImageComparisonSlider from './ImageComparisonSlider'
import StoryComparisonChart from './StoryComparisonChart'

interface StorytellingModalProps {
  onClose: () => void
  currentYear: number
  selectedIndicator: string
}

const StorytellingModal: React.FC<StorytellingModalProps> = ({ onClose, currentYear, selectedIndicator }) => {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const currentStory = stories[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isPlaying) {
      interval = setInterval(nextSlide, 8000) // 8 seconds per story
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSlide])

  // Swipe gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full h-full max-w-7xl mx-auto flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {t.environmentalStories}
            </h2>
            <div className="live-data-badge">
              <div className="live-data-indicator"></div>
              <span>NASA DATA</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass border border-white/20 flex items-center justify-center hover:border-cyan-400/50 transition-all"
            aria-label="Close"
          >
            <FaTimes className="text-xl text-cyan-400" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              {/* Story Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 text-sm font-semibold">
                    {currentStory.location.name}
                  </span>
                  <a
                    href={currentStory.nasaLinks.after}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 border border-blue-400/30 text-blue-400 text-sm font-semibold hover:bg-blue-400/30 transition-all"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    <span>View in NASA Worldview</span>
                  </a>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {currentStory.title[language]}
                </h3>
                <p className="text-lg text-cyan-400 font-medium">
                  {currentStory.subtitle[language]}
                </p>
              </div>

              {/* Image Comparison */}
              <div className="mb-8">
                <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="block w-full h-full">
                    <ImageComparisonSlider
                      beforeImage={currentStory.images.before.url}
                      afterImage={currentStory.images.after.url}
                      beforeLabel={`${currentStory.images.before.year}`}
                      afterLabel={`${currentStory.images.after.year}`}
                    />
                  </div>
                </div>
              </div>

              {/* Story Description */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed" lang={language}>
                  {currentStory.description[language]}
                </p>
              </div>

              {/* Metrics */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  {language === 'en' ? 'Key Metrics' : 'मुख्य मेट्रिक्स'}
                </h4>
                <StoryComparisonChart metrics={currentStory.metrics} />
              </div>

              {/* Data Sources */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <p className="text-xs text-gray-400">
                  <strong className="text-cyan-400">Data Sources:</strong> NASA MODIS, Landsat, Sentinel |
                  ICIMOD Glacier Inventory | Nepal Forest Department
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="p-4 md:p-6 border-t border-white/10 bg-black/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <motion.button
                  onClick={prevSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full glass border border-white/20 flex items-center justify-center hover:border-cyan-400/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous story"
                >
                  <FaChevronLeft className="text-cyan-400" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full glass border border-white/20 flex items-center justify-center hover:border-cyan-400/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next story"
                >
                  <FaChevronRight className="text-cyan-400" />
                </motion.button>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index)
                    }}
                    className={`h-2 rounded-full transition-all ${index === currentSlide
                      ? 'bg-cyan-400 w-8'
                      : 'bg-gray-600 w-2 hover:bg-gray-500'
                      }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>

              {/* Play/Pause */}
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 hover:border-cyan-400/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <FaPause className="text-cyan-400" /> : <FaPlay className="text-cyan-400" />}
                <span className="hidden md:inline text-sm text-cyan-400 font-semibold">
                  {isPlaying ? (language === 'en' ? 'Pause' : 'रोक्नुहोस्') : (language === 'en' ? 'Auto-play' : 'स्वत: चलाउनुहोस्')}
                </span>
              </motion.button>
            </div>

            <p className="text-xs text-center text-gray-500">
              {language === 'en' ? 'Story' : 'कथा'} {currentSlide + 1} {language === 'en' ? 'of' : 'को'} {stories.length} •
              {language === 'en' ? 'Use arrow keys or swipe to navigate' : 'नेभिगेट गर्न एरो कुञ्जी वा स्वाइप प्रयोग गर्नुहोस्'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StorytellingModal
