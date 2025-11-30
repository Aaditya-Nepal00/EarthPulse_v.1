import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaInfoCircle, FaSatellite, FaLeaf, FaMountain, FaCity, FaThermometerHalf } from 'react-icons/fa'

interface MoreInfoModalProps {
    indicator: {
        id: string
        name: string
        description: string
        details: string
        color: string
    }
    onClose: () => void
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ indicator, onClose }) => {
    const getIndicatorIcon = (id: string) => {
        switch (id) {
            case 'ndvi': return FaLeaf
            case 'glacier': return FaMountain
            case 'urban': return FaCity
            case 'temperature': return FaThermometerHalf
            default: return FaInfoCircle
        }
    }

    const getDetailedInfo = (id: string) => {
        const info: Record<string, any> = {
            ndvi: {
                fullName: 'Normalized Difference Vegetation Index',
                methodology: 'NDVI is calculated using the difference between near-infrared (which vegetation strongly reflects) and red light (which vegetation absorbs). The formula is: NDVI = (NIR - Red) / (NIR + Red)',
                dataSource: 'MODIS (Moderate Resolution Imaging Spectroradiometer)',
                updateFrequency: '16-day composite',
                resolution: '250m - 1km',
                applications: [
                    'Agricultural monitoring and crop health assessment',
                    'Forest cover change detection',
                    'Drought monitoring and early warning',
                    'Ecosystem health evaluation'
                ],
                interpretation: {
                    high: 'Values > 0.6 indicate dense, healthy vegetation',
                    moderate: 'Values 0.2-0.6 indicate sparse or stressed vegetation',
                    low: 'Values < 0.2 indicate bare soil, rock, or water'
                }
            },
            glacier: {
                fullName: 'Glacier Mass Balance and Coverage',
                methodology: 'Glacier monitoring combines optical imagery (Landsat, Sentinel-2) with radar data (Sentinel-1) to track changes in glacier extent, volume, and movement patterns.',
                dataSource: 'Sentinel-1/2, Landsat 8/9',
                updateFrequency: '5-16 days',
                resolution: '10-30m',
                applications: [
                    'Water resource planning and management',
                    'Climate change impact assessment',
                    'Glacial lake outburst flood (GLOF) risk evaluation',
                    'Hydropower potential analysis'
                ],
                interpretation: {
                    retreating: 'Negative mass balance indicates glacier loss',
                    stable: 'Equilibrium between accumulation and ablation',
                    advancing: 'Positive mass balance (rare in current climate)'
                }
            },
            urban: {
                fullName: 'Urban Expansion and Built-up Area',
                methodology: 'Urban areas are detected using a combination of nighttime lights (VIIRS), land surface temperature, and spectral indices from optical imagery to identify built-up surfaces.',
                dataSource: 'Landsat 8/9, VIIRS Day/Night Band',
                updateFrequency: 'Annual',
                resolution: '30m (optical), 500m (nightlights)',
                applications: [
                    'Urban planning and infrastructure development',
                    'Population density estimation',
                    'Heat island effect monitoring',
                    'Environmental impact assessment'
                ],
                interpretation: {
                    rapid: 'Growth rate > 5% annually indicates rapid urbanization',
                    moderate: 'Growth rate 2-5% indicates steady development',
                    slow: 'Growth rate < 2% indicates mature urban areas'
                }
            },
            temperature: {
                fullName: 'Land Surface Temperature',
                methodology: 'LST is derived from thermal infrared bands using split-window algorithms that correct for atmospheric effects and surface emissivity variations.',
                dataSource: 'MODIS Terra/Aqua, Landsat 8/9 TIRS',
                updateFrequency: 'Daily (MODIS), 16-day (Landsat)',
                resolution: '1km (MODIS), 100m (Landsat)',
                applications: [
                    'Urban heat island analysis',
                    'Agricultural water stress monitoring',
                    'Climate change trend analysis',
                    'Energy balance studies'
                ],
                interpretation: {
                    high: 'Temperatures > 35°C indicate heat stress conditions',
                    moderate: 'Temperatures 20-35°C are typical for vegetated areas',
                    low: 'Temperatures < 20°C indicate water bodies or high elevation'
                }
            }
        }
        return info[id] || {}
    }

    const Icon = getIndicatorIcon(indicator.id)
    const detailedInfo = getDetailedInfo(indicator.id)

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="glass border border-white/20 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-${indicator.color}-600/20 border border-${indicator.color}-400/30`}>
                                <Icon className={`text-${indicator.color}-400 w-6 h-6`} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{indicator.name}</h2>
                                <p className="text-sm text-gray-400">{detailedInfo.fullName || indicator.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Close"
                        >
                            <FaTimes className="text-white w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <div className="space-y-6">
                            {/* Overview */}
                            <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <FaInfoCircle className="text-blue-400" />
                                    Overview
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{indicator.details}</p>
                            </div>

                            {/* Methodology */}
                            {detailedInfo.methodology && (
                                <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                                    <h3 className="text-lg font-semibold text-white mb-3">Methodology</h3>
                                    <p className="text-gray-300 leading-relaxed">{detailedInfo.methodology}</p>
                                </div>
                            )}

                            {/* Data Source Info */}
                            {detailedInfo.dataSource && (
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaSatellite className="text-purple-400" />
                                            <h4 className="text-sm font-semibold text-white">Data Source</h4>
                                        </div>
                                        <p className="text-gray-300 text-sm">{detailedInfo.dataSource}</p>
                                    </div>

                                    <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                                        <h4 className="text-sm font-semibold text-white mb-2">Update Frequency</h4>
                                        <p className="text-gray-300 text-sm">{detailedInfo.updateFrequency}</p>
                                    </div>

                                    <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                                        <h4 className="text-sm font-semibold text-white mb-2">Resolution</h4>
                                        <p className="text-gray-300 text-sm">{detailedInfo.resolution}</p>
                                    </div>
                                </div>
                            )}

                            {/* Applications */}
                            {detailedInfo.applications && (
                                <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                                    <h3 className="text-lg font-semibold text-white mb-3">Applications</h3>
                                    <ul className="space-y-2">
                                        {detailedInfo.applications.map((app: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                <span className="text-green-400 mt-1">✓</span>
                                                <span>{app}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Interpretation Guide */}
                            {detailedInfo.interpretation && (
                                <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                                    <h3 className="text-lg font-semibold text-white mb-3">Interpretation Guide</h3>
                                    <div className="space-y-3">
                                        {Object.entries(detailedInfo.interpretation).map(([key, value]: [string, any]) => (
                                            <div key={key} className="flex items-start gap-3">
                                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${key === 'high' || key === 'rapid' || key === 'retreating'
                                                        ? 'bg-red-500/20 text-red-400 border border-red-400/30'
                                                        : key === 'moderate' || key === 'stable'
                                                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                                                            : 'bg-green-500/20 text-green-400 border border-green-400/30'
                                                    }`}>
                                                    {key.toUpperCase()}
                                                </div>
                                                <p className="text-gray-300 text-sm flex-1">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer Note */}
                            <div className="text-center text-xs text-gray-500 pt-4 border-t border-white/5">
                                Data provided by NASA Earth Observation satellites • Updated regularly
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default MoreInfoModal
