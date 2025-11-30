/**
 * GLOF Warning Layer
 * Displays pulsing warning markers for high-risk glacial lakes
 */

import React, { useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { glofLakes, getRiskLevelColor, getRiskLevelLabel } from '../data/glofLakes'
import { useLanguage } from '../i18n/LanguageContext'

const GLOFWarningLayer: React.FC = () => {
    const { language, t } = useLanguage()
    const [selectedLake, setSelectedLake] = useState<string | null>(null)

    const createGLOFIcon = (riskLevel: 'critical' | 'high' | 'medium') => {
        const color = getRiskLevelColor(riskLevel)
        const markerClass = `glof-marker glof-marker-${riskLevel}`

        return divIcon({
            className: 'glof-marker-container',
            html: `
        <div class="${markerClass}" style="position: relative;">
          <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 0 10px ${color});">
            <!-- Outer pulsing ring -->
            <circle cx="20" cy="20" r="18" fill="none" stroke="${color}" stroke-width="2" opacity="0.3">
              <animate attributeName="r" from="18" to="22" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            
            <!-- Main circle -->
            <circle cx="20" cy="20" r="14" fill="${color}" opacity="0.9" />
            
            <!-- Inner white circle -->
            <circle cx="20" cy="20" r="10" fill="white" opacity="0.3" />
            
            <!-- Warning icon -->
            <path d="M20 12 L20 22 M20 25 L20 27" stroke="white" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </div>
      `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        })
    }

    return (
        <>
            {glofLakes.map((lake) => (
                <Marker
                    key={lake.id}
                    position={[lake.coordinates[1], lake.coordinates[0]]}
                    icon={createGLOFIcon(lake.riskLevel)}
                    eventHandlers={{
                        click: () => setSelectedLake(lake.id)
                    }}
                >
                    <Popup
                        className="glof-popup"
                        closeButton={false}
                    >
                        <div className="p-4 min-w-[280px] max-w-[320px]">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-1">
                                        {lake.name[language]}
                                    </h3>
                                    <div
                                        className="inline-block px-2 py-1 rounded-full text-xs font-bold"
                                        style={{
                                            backgroundColor: `${getRiskLevelColor(lake.riskLevel)}20`,
                                            color: getRiskLevelColor(lake.riskLevel),
                                            border: `1px solid ${getRiskLevelColor(lake.riskLevel)}50`
                                        }}
                                    >
                                        ⚠️ {getRiskLevelLabel(lake.riskLevel, language)} {language === 'en' ? 'Risk' : 'जोखिम'}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLake(null)}
                                    className="ml-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                                >
                                    <span className="text-white text-sm">✕</span>
                                </button>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-300 mb-4 leading-relaxed" lang={language}>
                                {lake.description[language]}
                            </p>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-xs text-gray-400 mb-1">{t.lakeArea}</div>
                                    <div className="text-lg font-bold text-cyan-400">{lake.lakeArea} {t.units.km2}</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-2">
                                    <div className="text-xs text-gray-400 mb-1">{t.expansionRate}</div>
                                    <div className="text-lg font-bold text-orange-400">
                                        {lake.expansionRate} {t.units.km2}{t.units.perYear}
                                    </div>
                                </div>
                            </div>

                            {/* Population at Risk */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">👥</span>
                                    <div>
                                        <div className="text-xs text-gray-400">
                                            {language === 'en' ? 'Population at Risk' : 'जोखिममा जनसंख्या'}
                                        </div>
                                        <div className="text-lg font-bold text-red-400">
                                            {lake.downstreamPopulation.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Last Assessment */}
                            <div className="text-xs text-gray-500 text-center">
                                {language === 'en' ? 'Last Assessment:' : 'अन्तिम मूल्याङ्कन:'} {lake.lastAssessment}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default GLOFWarningLayer
