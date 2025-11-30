import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    FaLeaf,
    FaMountain,
    FaCity,
    FaThermometerHalf,
    FaChartLine,
    FaInfoCircle,
    FaDownload,
    FaSync
} from 'react-icons/fa'
import { apiService, NDVIData, GlacierData, UrbanData, TemperatureData } from '../services/api'
import ChartModal from './ChartModal'
import MoreInfoModal from './MoreInfoModal'

interface EnvironmentalDashboardProps {
    selectedIndicator: string
    onIndicatorChange: (indicator: string) => void
    currentYear: number
}

interface Indicator {
    id: string
    name: string
    icon: any
    color: string
    description: string
    unit: string
    value: number
    trend: string
    status: string
    details: string
    isLoading?: boolean
    error?: string
}

const EnvironmentalDashboard: React.FC<EnvironmentalDashboardProps> = ({
    selectedIndicator,
    onIndicatorChange,
    currentYear
}) => {
    const [expandedCard, setExpandedCard] = useState<string | null>(null)
    const [showChartModal, setShowChartModal] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [selectedModalIndicator, setSelectedModalIndicator] = useState<Indicator | null>(null)

    const [indicators, setIndicators] = useState<Indicator[]>([
        {
            id: 'ndvi',
            name: 'Vegetation Index',
            icon: FaLeaf,
            color: 'green',
            description: 'Normalized Difference Vegetation Index',
            unit: 'NDVI',
            value: 0,
            trend: '...',
            status: 'loading',
            details: 'Measures plant health and density using satellite imagery',
            isLoading: true
        },
        {
            id: 'glacier',
            name: 'Glacier Coverage',
            icon: FaMountain,
            color: 'blue',
            description: 'Monitored glacier regions',
            unit: 'km²',
            value: 0,
            trend: '...',
            status: 'loading',
            details: 'Satellite monitoring of glacier extent and retreat | Selected regions: Makalu Barun, Khumbu Himal, Annapurna Himal, Langtang',
            isLoading: true
        },
        {
            id: 'urban',
            name: 'Urban Expansion',
            icon: FaCity,
            color: 'orange',
            description: 'Built-up area growth',
            unit: 'km²',
            value: 0,
            trend: '...',
            status: 'loading',
            details: 'Nightlight data and land-use classification',
            isLoading: true
        },
        {
            id: 'temperature',
            name: 'Surface Temperature',
            icon: FaThermometerHalf,
            color: 'red',
            description: 'Land surface temperature',
            unit: '°C',
            value: 0,
            trend: '...',
            status: 'loading',
            details: 'NASA Earth science temperature datasets',
            isLoading: true
        }
    ])

    // Fetch environmental data on component mount and when year changes
    useEffect(() => {
        const fetchEnvironmentalData = async () => {
            const updatedIndicators = await Promise.all(
                indicators.map(async (indicator) => {
                    try {
                        indicator.isLoading = true
                        setIndicators([...indicators])

                        let data, value, trend, status

                        switch (indicator.id) {
                            case 'ndvi':
                                data = await apiService.getNDVIData(currentYear, 'nepal_himalayas') as NDVIData
                                value = data.average_ndvi
                                trend = `${data.trend === 'increasing' ? '+' : data.trend === 'decreasing' ? '-' : ''}${data.vegetation_coverage_percent.toFixed(1)}%`
                                status = data.trend
                                break
                            case 'glacier':
                                data = await apiService.getGlacierData(currentYear, 'nepal_himalayas') as GlacierData
                                value = data.glacier_area_km2
                                trend = `${data.trend === 'decreasing' ? '-' : data.trend === 'increasing' ? '+' : ''}${data.retreat_rate_m_per_year || 25} km/y`
                                status = data.trend
                                break
                            case 'urban':
                                data = await apiService.getUrbanData(currentYear, 'nepal_himalayas') as UrbanData
                                value = data.urban_area_km2
                                trend = `${data.trend === 'expanding' ? '+' : data.trend === 'contracting' ? '-' : ''}${data.built_up_percentage.toFixed(1)}%`
                                status = data.trend
                                break
                            case 'temperature':
                                data = await apiService.getTemperatureData(currentYear, 'nepal_himalayas') as TemperatureData
                                value = data.average_temperature_c
                                trend = `${data.trend === 'warming' ? '+' : data.trend === 'cooling' ? '-' : ''}${data.trend === 'warming' ? '1.8°C' : data.trend === 'cooling' ? '1.2°C' : 'stable'}`
                                status = data.trend
                                break
                        }

                        return {
                            ...indicator,
                            value: typeof value === 'number' ? value : parseInt(String(value)) || 0,
                            trend: trend || 'stable',
                            status: status || 'stable',
                            isLoading: false,
                            error: undefined
                        }
                    } catch (error) {
                        console.error(`Failed to fetch ${indicator.id} data:`, error)
                        return {
                            ...indicator,
                            isLoading: false,
                            error: `API Error: ${error instanceof Error ? error.message : 'Failed to fetch data'}`
                        }
                    }
                })
            )

            // Update all indicators with new data
            setIndicators(updatedIndicators)
        }

        fetchEnvironmentalData()
    }, [currentYear])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'increasing': case 'expanding': return 'text-green-400'
            case 'decreasing': case 'declining': case 'contracting': return 'text-red-400'
            case 'warming': return 'text-red-400'
            case 'cooling': case 'improving': return 'text-blue-400'
            case 'stable': return 'text-gray-400'
            case 'loading': return 'text-yellow-400'
            default: return 'text-gray-400'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'increasing': case 'expanding': case 'warming': return '↗'
            case 'decreasing': case 'declining': case 'contracting': case 'cooling': return '↘'
            case 'stable': case 'improving': return '→'
            case 'loading': return '⏳'
            default: return '→'
        }
    }

    const formatValue = (value: number, unit: string) => {
        if (unit === 'NDVI') return value.toFixed(3)
        if (unit === '°C') return value.toFixed(1)
        if (unit === 'km²') return value.toLocaleString()
        return value.toString()
    }

    const handleRefreshData = async () => {
        const refreshIndicators = indicators.map(indicator => ({
            ...indicator,
            isLoading: true,
            error: undefined
        }))
        setIndicators(refreshIndicators)

        // Trigger data refetch
        const event = new CustomEvent('refreshEnvironmentalData', { detail: { year: currentYear } })
        window.dispatchEvent(event)
    }

    const handleViewChart = (indicator: Indicator) => {
        setSelectedModalIndicator(indicator)
        setShowChartModal(true)
    }

    const handleMoreInfo = (indicator: Indicator) => {
        setSelectedModalIndicator(indicator)
        setShowInfoModal(true)
    }

    const handleExportData = (indicator: Indicator) => {
        const exportData = {
            indicator: indicator.name,
            id: indicator.id,
            year: currentYear,
            value: indicator.value,
            unit: indicator.unit,
            trend: indicator.trend,
            status: indicator.status,
            description: indicator.description,
            details: indicator.details,
            exportedAt: new Date().toISOString()
        }

        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${indicator.id}_${currentYear}_data.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-blue-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-nasa font-bold text-white mb-2">
                            Environmental Indicators
                        </h2>
                        <p className="text-sm text-blue-300">
                            Real-time data for {currentYear}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <motion.button
                            onClick={handleRefreshData}
                            className="p-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 rounded-lg text-blue-400 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Refresh Data"
                        >
                            <FaSync className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Indicators List */}
            <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3">
                {indicators.map((indicator, index) => {
                    const Icon = indicator.icon
                    const isSelected = selectedIndicator === indicator.id
                    const isExpanded = expandedCard === indicator.id

                    return (
                        <motion.div
                            key={indicator.id}
                            className={`relative bg-black/30 backdrop-blur-sm border rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 ${isSelected
                                ? 'border-blue-400/50 bg-blue-600/20'
                                : 'border-gray-600/30 hover:border-blue-400/30'
                                } ${indicator.isLoading ? 'opacity-75' : ''
                                }`}
                            onClick={() => {
                                onIndicatorChange(indicator.id)
                                setExpandedCard(isExpanded ? null : indicator.id)
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Error Banner */}
                            {indicator.error && (
                                <div className="absolute top-0 left-0 right-0 bg-red-500/20 border-b border-red-400/30 px-3 py-1 rounded-t-xl">
                                    <p className="text-xs text-red-300">⚠️ {indicator.error}</p>
                                </div>
                            )}

                            <div className={`flex items-center justify-between ${indicator.error ? 'mt-6' : ''}`}>
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg bg-${indicator.color}-600/20 border border-${indicator.color}-400/30`}>
                                        <Icon className={`text-${indicator.color}-400 w-5 h-5`} />
                                    </div>

                                    <div>
                                        <h3 className="text-white font-medium text-sm">
                                            {indicator.name}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {indicator.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-lg font-bold text-white">
                                        {indicator.isLoading ? '...' : formatValue(indicator.value, indicator.unit)}
                                        <span className="text-xs text-gray-400 ml-1">
                                            {indicator.unit}
                                        </span>
                                    </div>
                                    <div className={`text-xs font-medium ${getStatusColor(indicator.status)}`}>
                                        {getStatusIcon(indicator.status)} {indicator.isLoading ? 'Loading' : indicator.trend}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && !indicator.isLoading && (
                                <motion.div
                                    className="mt-4 pt-4 border-t border-gray-600/30"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="space-y-3">
                                        <p className="text-xs text-gray-300">
                                            {indicator.details}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <button
                                                className="flex items-center space-x-2 hover:bg-white/5 px-2 py-1 rounded transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleViewChart(indicator)
                                                }}
                                            >
                                                <FaChartLine className="text-blue-400 w-4 h-4" />
                                                <span className="text-xs text-blue-300">View Chart</span>
                                            </button>

                                            <button
                                                className="flex items-center space-x-2 hover:bg-white/5 px-2 py-1 rounded transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleExportData(indicator)
                                                }}
                                            >
                                                <FaDownload className="text-green-400 w-4 h-4" />
                                                <span className="text-xs text-green-300">Export</span>
                                            </button>

                                            <button
                                                className="flex items-center space-x-2 hover:bg-white/5 px-2 py-1 rounded transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleMoreInfo(indicator)
                                                }}
                                            >
                                                <FaInfoCircle className="text-purple-400 w-4 h-4" />
                                                <span className="text-xs text-purple-300">More Info</span>
                                            </button>
                                        </div>

                                        {/* Mini Chart Placeholder */}
                                        <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-2 flex items-end space-x-1 gap-1">
                                            {Array.from({ length: 12 }, (_, i) => {
                                                const heightPercent = Math.max(20 + Math.random() * 80, 20)
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`flex-1 rounded-t transition-all hover:opacity-100 opacity-75`}
                                                        style={{
                                                            height: `${heightPercent}%`,
                                                            backgroundColor: indicator.color === 'green' ? '#4ade80'
                                                                : indicator.color === 'blue' ? '#60a5fa'
                                                                : indicator.color === 'orange' ? '#fb923c'
                                                                : indicator.color === 'red' ? '#f87171'
                                                                : '#3b82f6',
                                                            opacity: 0.6
                                                        }}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Modals */}
            {showChartModal && selectedModalIndicator && (
                <ChartModal
                    indicator={{
                        id: selectedModalIndicator.id,
                        name: selectedModalIndicator.name,
                        color: selectedModalIndicator.color,
                        unit: selectedModalIndicator.unit
                    }}
                    onClose={() => {
                        setShowChartModal(false)
                        setSelectedModalIndicator(null)
                    }}
                />
            )}

            {showInfoModal && selectedModalIndicator && (
                <MoreInfoModal
                    indicator={selectedModalIndicator}
                    onClose={() => {
                        setShowInfoModal(false)
                        setSelectedModalIndicator(null)
                    }}
                />
            )}
        </div>
    )
}

export default EnvironmentalDashboard
