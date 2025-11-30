/**
 * Skeleton Loader Component
 * Premium loading animations with cosmic theme
 */

import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
    variant?: 'card' | 'image' | 'text' | 'chart' | 'map'
    width?: string
    height?: string
    className?: string
    count?: number
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    variant = 'card',
    width,
    height,
    className = '',
    count = 1
}) => {
    const getSkeletonStyle = () => {
        switch (variant) {
            case 'card':
                return 'h-32 rounded-2xl'
            case 'image':
                return 'h-64 rounded-xl'
            case 'text':
                return 'h-4 rounded'
            case 'chart':
                return 'h-48 rounded-xl'
            case 'map':
                return 'h-full rounded-2xl'
            default:
                return 'h-32 rounded-2xl'
        }
    }

    const skeletonClass = `skeleton ${getSkeletonStyle()} ${className}`

    const style = {
        width: width || '100%',
        height: height || undefined,
    }

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    className={skeletonClass}
                    style={style}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                />
            ))}
        </>
    )
}

export default SkeletonLoader
