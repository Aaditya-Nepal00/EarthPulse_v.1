/**
 * Story Comparison Chart
 * Beautiful animated charts showing metric changes
 */

import React from 'react'
import { motion } from 'framer-motion'

interface Metric {
    label: string
    before: string
    after: string
    change: string
    trend: 'positive' | 'negative' | 'neutral'
}

interface StoryComparisonChartProps {
    metrics: Metric[]
}

const StoryComparisonChart: React.FC<StoryComparisonChartProps> = ({ metrics }) => {
    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'positive':
                return 'text-green-400 border-green-400/30 bg-green-400/10'
            case 'negative':
                return 'text-red-400 border-red-400/30 bg-red-400/10'
            default:
                return 'text-blue-400 border-blue-400/30 bg-blue-400/10'
        }
    }

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'positive':
                return '↗'
            case 'negative':
                return '↘'
            default:
                return '→'
        }
    }

    return (
        <div className="space-y-4">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    className="comparison-chart"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-cyan-400">{metric.label}</h4>
                        <div className={`px-2 py-1 rounded-full border text-xs font-bold ${getTrendColor(metric.trend)}`}>
                            {getTrendIcon(metric.trend)} {metric.change}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Before */}
                        <div className="space-y-1">
                            <div className="text-xs text-gray-400">Before</div>
                            <div className="text-lg font-bold text-orange-400">{metric.before}</div>
                        </div>

                        {/* After */}
                        <div className="space-y-1">
                            <div className="text-xs text-gray-400">After</div>
                            <div className="text-lg font-bold text-cyan-400">{metric.after}</div>
                        </div>
                    </div>

                    {/* Visual Bar */}
                    <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full comparison-bar"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default StoryComparisonChart
