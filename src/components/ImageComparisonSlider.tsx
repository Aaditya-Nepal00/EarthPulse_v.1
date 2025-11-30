/**
 * Image Comparison Slider
 * Beautiful before/after slider with smooth dragging
 */

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ImageComparisonSliderProps {
    beforeImage: string
    afterImage: string
    beforeLabel: string
    afterLabel: string
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel,
    afterLabel
}) => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percentage = (x / rect.width) * 100
        setSliderPosition(Math.min(Math.max(percentage, 0), 100))
    }

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        handleMove(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return
        handleMove(e.touches[0].clientX)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleMouseUp)
        }
    }, [isDragging])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full select-none overflow-hidden rounded-xl"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full border border-cyan-400/50">
                    <span className="text-xs font-semibold text-cyan-400">{afterLabel}</span>
                </div>
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full border border-orange-400/50">
                    <span className="text-xs font-semibold text-orange-400">{beforeLabel}</span>
                </div>
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                {/* Slider Handle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-cyan-400 shadow-lg cursor-ew-resize flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex gap-1">
                        <div className="w-0.5 h-4 bg-cyan-400"></div>
                        <div className="w-0.5 h-4 bg-cyan-400"></div>
                    </div>
                </motion.div>
            </div>

            {/* Instruction Overlay (shows briefly on first load) */}
            {sliderPosition === 50 && (
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full border border-white/30"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <span className="text-xs text-white">← Drag to compare →</span>
                </motion.div>
            )}
        </div>
    )
}

export default ImageComparisonSlider
