import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import MapContainer from './components/MapContainer'
import TimeSlider from './components/TimeSlider'
import EnvironmentalDashboard from './components/EnvironmentalDashboard'
import ComparisonTool from './components/ComparisonTool'
import StorytellingModal from './components/StorytellingModal'
import DownloadPanel from './components/DownloadPanel'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [currentYear, setCurrentYear] = useState(2020)
  const [selectedIndicator, setSelectedIndicator] = useState('ndvi')
  const [isLoading, setIsLoading] = useState(true)
  const [activePanel, setActivePanel] = useState<'dashboard' | 'comparison' | null>(null)
  const [showStorytelling, setShowStorytelling] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-900/30"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="stars"></div>
          <div className="stars-2"></div>
          <div className="stars-3"></div>
        </div>

        {/* Earth glow effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <Header
        onToggleComparison={() => setActivePanel(activePanel === 'comparison' ? null : 'comparison')}
        onToggleStory={() => setShowStorytelling(true)}
        onToggleDownload={() => setShowDownload(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Layout */}
      <div className="h-screen pt-16 md:pt-20 flex overflow-hidden relative z-10">
        {/* Left Panel - Dashboard */}
        <AnimatePresence>
          {(activePanel === 'dashboard' || !activePanel) && (
            <motion.div
              className="w-full md:w-96 h-full bg-black/20 backdrop-blur-xl border-b md:border-b-0 md:border-r border-blue-500/20 shadow-2xl"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <EnvironmentalDashboard
                selectedIndicator={selectedIndicator}
                onIndicatorChange={setSelectedIndicator}
                currentYear={currentYear}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!activePanel && (
          <motion.button
            onClick={() => setActivePanel('dashboard')}
            className="fixed left-4 top-24 z-30 p-3 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 rounded-lg backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">Data Panel</span>
            </div>
          </motion.button>
        )}

        {/* Center - Map */}
        <div className="flex-1 h-full relative">
          <motion.div
            className="h-full rounded-2xl overflow-hidden shadow-2xl border border-blue-400/20 bg-gradient-to-br from-blue-900 to-gray-900"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MapContainer
              currentYear={currentYear}
              selectedIndicator={selectedIndicator}
            />
          </motion.div>
        </div>

        {/* Right Panel - Comparison Tool */}
        <AnimatePresence>
          {activePanel === 'comparison' && (
            <motion.div
              className="w-full md:w-96 bg-black/20 backdrop-blur-xl border-t md:border-t-0 md:border-l border-blue-500/20 shadow-2xl"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ComparisonTool currentYear={currentYear} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Time Slider */}
        <motion.div
          className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TimeSlider
            currentYear={currentYear}
            onYearChange={setCurrentYear}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showStorytelling && (
          <StorytellingModal
            onClose={() => setShowStorytelling(false)}
            currentYear={currentYear}
            selectedIndicator={selectedIndicator}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDownload && (
          <DownloadPanel
            onClose={() => setShowDownload(false)}
            currentYear={currentYear}
            selectedIndicator={selectedIndicator}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App