import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaChartLine
} from 'react-icons/fa'
import { apiService } from '../services/api'

interface ComparisonToolProps {
  currentYear: number
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({ currentYear }) => {
  const [comparisonYear, setComparisonYear] = useState(2010)
  const [selectedRegion, setSelectedRegion] = useState('nepal_himalayas')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const regions = [
    { id: 'nepal_himalayas', name: 'Nepal Himalayas', description: 'Mountain region' },
    { id: 'kathmandu_valley', name: 'Kathmandu Valley', description: 'Urban area' },
    { id: 'annapurna_region', name: 'Annapurna Region', description: 'Conservation area' }
  ]

  useEffect(() => {
    fetchComparison()
  }, [comparisonYear, currentYear, selectedRegion])

  const fetchComparison = async () => {
    if (comparisonYear >= currentYear) {
      setResults(null)
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Try primary API first
      try {
        const data = await apiService.getTemporalComparison(
          'ndvi',
          selectedRegion,
          comparisonYear,
          currentYear,
          false
        )
        if (data && data.length > 0) {
          setResults(data[0])
          setLoading(false)
          return
        }
      } catch (primaryErr) {
        console.log('Primary API failed, using fallback')
      }

      // Fallback: compute simple comparison
      const baseline = await apiService.getNDVIData(comparisonYear, selectedRegion as any)
      const latest = await apiService.getNDVIData(currentYear, selectedRegion as any)
      
      const changeAmount = latest.average_ndvi - baseline.average_ndvi
      const changePct = baseline.average_ndvi !== 0 ? (changeAmount / baseline.average_ndvi) * 100 : 0
      
      const comparisonResults = {
        baseline_year: comparisonYear,
        comparison_year: currentYear,
        baseline_value: baseline.average_ndvi,
        comparison_value: latest.average_ndvi,
        change_amount: changeAmount,
        change_percentage: changePct,
        trend_summary: `Vegetation Index changed by ${changePct > 0 ? '+' : ''}${changePct.toFixed(2)}% over ${currentYear - comparisonYear} years`
      }
      
      console.log('Comparison Results:', comparisonResults)
      setResults(comparisonResults)
    } catch (err) {
      console.error('Comparison error:', err)
      setError(`Unable to fetch comparison data for ${selectedRegion}. Please try another region.`)
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-black/30 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-blue-500/20">
        <h2 className="text-lg font-bold text-white mb-1">
          Temporal Comparison
        </h2>
        <p className="text-sm text-blue-300">
          Compare environmental changes over time
        </p>
      </div>

      {/* Region Selector */}
      <div className="p-4 md:p-6 border-b border-blue-500/20">
        <h3 className="text-sm font-semibold text-white mb-3">Select Region</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${selectedRegion === region.id
                  ? 'border-blue-400/50 bg-blue-600/20'
                  : 'border-gray-600/30 hover:border-blue-400/30'
                }`}
            >
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className={selectedRegion === region.id ? 'text-blue-400' : 'text-gray-400'} />
                <div>
                  <div className="text-sm font-medium text-white">{region.name}</div>
                  <div className="text-xs text-gray-400">{region.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Year Comparison */}
      <div className="p-4 md:p-6 border-b border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Time Period</h3>
          <button
            onClick={() => setComparisonYear(Math.max(2000, comparisonYear - 5))}
            className="p-2 hover:bg-blue-600/20 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
            title="Swap Years"
          >
            <FaExchangeAlt />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
            <div className="text-xs font-medium text-green-400 mb-1">BASELINE</div>
            <div className="text-3xl font-bold text-white">{comparisonYear}</div>
          </div>

          <div className="text-center p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
            <div className="text-xs font-medium text-blue-400 mb-1">CURRENT</div>
            <div className="text-3xl font-bold text-white">{currentYear}</div>
          </div>
        </div>

        {/* Year Slider */}
        <div className="mt-4">
          <label className="text-xs text-blue-300 mb-2 block">Baseline Year: {comparisonYear}</label>
          <input
            type="range"
            min={2000}
            max={currentYear - 1}
            value={comparisonYear}
            onChange={(e) => setComparisonYear(parseInt(e.target.value))}
            className="slider w-full"
          />
        </div>
      </div>

      {/* Comparison Results */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-400" />
          <span>Change Analysis (NDVI)</span>
        </h3>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-blue-300">Fetching data for {selectedRegion}...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {!loading && results && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Main Comparison Card */}
            <div className="bg-black/20 border border-blue-500/20 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">Vegetation Index Comparison</h4>
                <div className={`text-2xl font-bold flex items-center gap-1 ${
                  results.change_amount >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {results.change_amount >= 0 ? '↗' : '↘'} {Math.abs(results.change_percentage?.toFixed(1))}%
                </div>
              </div>

              {/* Data Values */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3 border border-green-500/20">
                  <div className="text-xs text-green-400 mb-1">Baseline ({results.baseline_year})</div>
                  <div className="text-xl font-bold text-white">{results.baseline_value?.toFixed(3)}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 border border-blue-500/20">
                  <div className="text-xs text-blue-400 mb-1">Current ({results.comparison_year})</div>
                  <div className="text-xl font-bold text-white">{results.comparison_value?.toFixed(3)}</div>
                </div>
              </div>

              {/* Change Details */}
              <div className="bg-black/30 rounded-lg p-3 border border-yellow-500/20">
                <div className="text-xs text-yellow-400 mb-1">Absolute Change</div>
                <div className={`text-lg font-bold ${results.change_amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {results.change_amount >= 0 ? '+' : ''}{results.change_amount?.toFixed(4)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Change Magnitude</span>
                  <span>{Math.abs(results.change_percentage).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${results.change_amount >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.abs(results.change_percentage))}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Summary */}
              {results.trend_summary && (
                <div className="p-3 bg-blue-500/10 border border-blue-400/20 rounded text-sm text-blue-300">
                  📊 {results.trend_summary}
                </div>
              )}
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 border border-blue-500/20 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Time Span</div>
                <div className="text-lg font-bold text-white">{results.comparison_year - results.baseline_year} yrs</div>
              </div>
              <div className="bg-black/20 border border-blue-500/20 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Annual Change</div>
                <div className={`text-lg font-bold ${results.change_amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {(results.change_amount / (results.comparison_year - results.baseline_year))?.toFixed(4)}/yr
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && !error && !results && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-white font-medium mb-1">Ready to Compare</p>
            <p className="text-xs text-gray-400">Select baseline year {comparisonYear} to view analysis</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComparisonTool
