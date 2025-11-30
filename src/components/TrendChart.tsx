import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface DataPoint {
    year: number
    value: number
    trend?: string
    x?: number
    y?: number
}

interface TrendChartProps {
    data: DataPoint[]
    color: string
    unit: string
    height?: number
}

const TrendChart: React.FC<TrendChartProps> = ({ data, color, unit, height = 200 }) => {
    const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)

    // Calculate dimensions and scales
    const { points } = useMemo(() => {
        if (!data.length) return { points: [] }

        const values = data.map(d => d.value)
        const minVal = Math.min(...values) * 0.9
        const maxVal = Math.max(...values) * 1.1

        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100
            const y = 100 - ((d.value - minVal) / (maxVal - minVal)) * 100
            return { x, y, ...d }
        })

        return { points }
    }, [data])

    // Generate path
    const pathD = useMemo(() => {
        if (!points.length) return ''
        return points.reduce((acc, point, i) => {
            return i === 0
                ? `M ${point.x} ${point.y}`
                : `${acc} L ${point.x} ${point.y}`
        }, '')
    }, [points])

    // Generate area path
    const areaD = useMemo(() => {
        if (!points.length) return ''
        return `${pathD} L 100 100 L 0 100 Z`
    }, [pathD, points.length])

    const getColorHex = (colorName: string) => {
        const colors: Record<string, string> = {
            green: '#4ade80',
            blue: '#60a5fa',
            red: '#f87171',
            orange: '#fb923c',
            purple: '#c084fc',
            yellow: '#facc15'
        }
        return colors[colorName] || '#60a5fa'
    }

    const hexColor = getColorHex(color)

    return (
        <div className="relative w-full" style={{ height }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="overflow-visible"
            >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="100"
                        y2={y}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                        strokeDasharray="2"
                    />
                ))}

                {/* Area fill */}
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={hexColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={hexColor} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={areaD}
                    fill={`url(#gradient-${color})`}
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Line */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={hexColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Data points */}
                {points.map((point, i) => (
                    <g key={i}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="0"
                            fill={hexColor}
                            className="cursor-pointer transition-all duration-300 hover:r-4"
                            onMouseEnter={() => setHoveredPoint(point)}
                            onMouseLeave={() => setHoveredPoint(null)}
                        >
                            <animate attributeName="r" from="0" to="1.5" dur="0.5s" begin={`${1.5 + i * 0.05}s`} fill="freeze" />
                        </circle>
                        {/* Invisible larger target for hover */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredPoint(point)}
                            onMouseLeave={() => setHoveredPoint(null)}
                        />
                    </g>
                ))}
            </svg>

            {/* Tooltip */}
            {hoveredPoint && hoveredPoint.x !== undefined && hoveredPoint.y !== undefined && (
                <div
                    className="absolute pointer-events-none z-10 bg-slate-900/90 border border-white/20 rounded px-2 py-1 text-xs text-white transform -translate-x-1/2 -translate-y-full"
                    style={{
                        left: `${hoveredPoint.x}%`,
                        top: `${hoveredPoint.y}%`,
                        marginTop: '-10px'
                    }}
                >
                    <div className="font-bold">{hoveredPoint.year}</div>
                    <div>{hoveredPoint.value.toFixed(2)} {unit}</div>
                </div>
            )}

            {/* Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-400 mt-2 transform translate-y-full">
                <span>{data[0]?.year}</span>
                <span>{data[Math.floor(data.length / 2)]?.year}</span>
                <span>{data[data.length - 1]?.year}</span>
            </div>
        </div>
    )
}

export default TrendChart
