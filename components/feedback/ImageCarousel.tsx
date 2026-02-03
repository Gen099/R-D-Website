'use client'

import { useState, useEffect } from 'react'
import styles from './ImageCarousel.module.css'
import { getDropboxDirectUrl } from '@/lib/utils/mediaUtils'

interface ImageCarouselProps {
    images: string[]
    alt?: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [imageError, setImageError] = useState<Set<number>>(new Set())

    if (!images || images.length === 0) return null

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const goTo = (index: number) => {
        setCurrentIndex(index)
    }

    const handleImageError = (index: number) => {
        setImageError(prev => new Set(prev).add(index))
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Single image - no carousel needed
    if (images.length === 1) {
        return (
            <div className={styles.singleImage}>
                <img
                    src={getDropboxDirectUrl(images[0])}
                    alt={alt || 'Preview'}
                    loading="lazy"
                    onError={() => handleImageError(0)}
                />
                {imageError.has(0) && (
                    <div className={styles.errorOverlay}>
                        ❌ Không thể load image
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={styles.carousel}>
            {/* Main Image */}
            <div className={styles.imageContainer}>
                {!imageError.has(currentIndex) ? (
                    <img
                        src={getDropboxDirectUrl(images[currentIndex])}
                        alt={`${alt || 'Image'} - ${currentIndex + 1}`}
                        loading="lazy"
                        onError={() => handleImageError(currentIndex)}
                    />
                ) : (
                    <div className={styles.errorState}>
                        ❌ Không thể load image
                    </div>
                )}

                {/* Navigation Arrows */}
                <button
                    className={styles.prevBtn}
                    onClick={prev}
                    aria-label="Previous image"
                >
                    ‹
                </button>
                <button
                    className={styles.nextBtn}
                    onClick={next}
                    aria-label="Next image"
                >
                    ›
                </button>
            </div>

            {/* Counter */}
            <div className={styles.counter}>
                {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Indicators */}
            <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`${styles.thumbnail} ${idx === currentIndex ? styles.active : ''}`}
                        onClick={() => goTo(idx)}
                        title={`Image ${idx + 1}`}
                    >
                        {!imageError.has(idx) ? (
                            <img
                                src={getDropboxDirectUrl(img)}
                                alt={`Thumbnail ${idx + 1}`}
                                loading="lazy"
                                onError={() => handleImageError(idx)}
                            />
                        ) : (
                            <div className={styles.thumbError}>❌</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
