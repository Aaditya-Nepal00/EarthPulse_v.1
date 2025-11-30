import React from 'react'
import { motion } from 'framer-motion'

const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen space-bg flex items-center justify-center relative overflow-hidden">
      {/* Nebula Background */}
      <div className="absolute inset-0 nebula-bg opacity-40"></div>

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 p-8 relative z-10">
        {/* Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-blue via-cosmic-purple to-cosmic-pink flex items-center justify-center shadow-glow-lg animate-glow">
            <span className="text-5xl">🌍</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-blue to-cosmic-purple opacity-50 blur-xl animate-pulse"></div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-cosmic mb-3">
            EarthPulse
          </h1>
          <p className="text-nebula-blue text-lg md:text-xl font-semibold">
            NASA Earth Observation Platform
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="cosmic-loader"></div>
          <p className="text-space-300 text-sm font-medium">Initializing satellite data...</p>
        </motion.div>

        {/* NASA Attribution */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-xs text-space-400 mb-2">
            🛰️ Powered by NASA Earth Observation Data
          </p>
          <p className="text-xs text-space-500">
            Real-time satellite imagery and environmental monitoring
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen
