import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTimes, FaDownload, FaFileAlt, FaFileCsv, FaFileExcel } from 'react-icons/fa'

interface DownloadPanelProps {
  onClose: () => void
  currentYear: number
  selectedIndicator: string
}

const DownloadPanel: React.FC<DownloadPanelProps> = ({ onClose, currentYear, selectedIndicator }) => {
  const [selectedFormat, setSelectedFormat] = useState('json')
  const [isDownloading, setIsDownloading] = useState(false)

  const formats = [
    { id: 'json', name: 'JSON', icon: <FaFileAlt />, description: 'Machine-readable format' },
    { id: 'csv', name: 'CSV', icon: <FaFileCsv />, description: 'Spreadsheet compatible' },
    { id: 'excel', name: 'Excel', icon: <FaFileExcel />, description: 'Microsoft Excel format' }
  ]

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const response = await fetch(
        `${apiBaseUrl}/api/v1/reports/export/${selectedIndicator}?year=${currentYear}&format=${selectedFormat}&region=nepal_himalayas`
      )

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `earthpulse_${selectedIndicator}_${currentYear}.${selectedFormat}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass border border-white/20 rounded-2xl shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Export Data</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-300 mb-2">
              Export <span className="font-semibold text-white">{selectedIndicator.toUpperCase()}</span> data for <span className="font-semibold text-white">{currentYear}</span>
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <label className="text-sm font-semibold text-white block mb-2">
              Select Format
            </label>
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${selectedFormat === format.id
                  ? 'border-blue-400/50 bg-blue-600/20'
                  : 'border-white/10 hover:border-white/20 bg-black/20'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${selectedFormat === format.id ? 'text-blue-400' : 'text-gray-400'}`}>
                    {format.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{format.name}</div>
                    <div className="text-xs text-gray-400">{format.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-cosmic w-full flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <FaDownload />
                <span>Download {selectedFormat.toUpperCase()}</span>
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Data sourced from NASA Earth Observation satellites
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DownloadPanel

