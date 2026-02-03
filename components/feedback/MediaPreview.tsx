'use client'

import { useState } from 'react'
import styles from './MediaPreview.module.css'
import { getDropboxDirectUrl, getInstagramEmbedUrl } from '@/lib/utils/mediaUtils'

interface MediaPreviewProps {
    url: string
    type: 'image' | 'video' | 'instagram' | 'folder' | 'unknown'
    alt?: string
    className?: string
}

export default function MediaPreview({ url, type, alt, className }: MediaPreviewProps) {
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const [loading, setLoading] = useState(true)

    if (!url) return null

    if (type === 'folder') {
        return (
            <div className={`${styles.folderPreview} ${className || ''}`}>
                <div className={styles.folderIcon}>📁</div>
                <p>Dropbox folder với nhiều files</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.folderLink}>
                    Mở folder trong Dropbox
                </a>
            </div>
        )
    }

    if (type === 'image') {
        if (imageError) {
            return (
                <div className={`${styles.errorState} ${className || ''}`}>
                    <span>❌ Không thể load image</span>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Mở trong Dropbox
                    </a>
                </div>
            )
        }

        return (
            <div className={`${styles.imagePreview} ${className || ''}`}>
                {loading && <div className={styles.loading}>Loading...</div>}
                <img
                    src={getDropboxDirectUrl(url)}
                    alt={alt || 'Preview image'}
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setImageError(true)
                        setLoading(false)
                    }}
                    style={{ display: loading ? 'none' : 'block' }}
                />
            </div>
        )
    }

    if (type === 'video') {
        if (videoError) {
            return (
                <div className={`${styles.errorState} ${className || ''}`}>
                    <span>❌ Không thể load video</span>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Xem trong Dropbox
                    </a>
                </div>
            )
        }

        return (
            <div className={`${styles.videoPreview} ${className || ''}`}>
                <video
                    controls
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    className={styles.video}
                >
                    <source src={getDropboxDirectUrl(url)} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }

    if (type === 'instagram') {
        return (
            <div className={`${styles.instagramPreview} ${className || ''}`}>
                <iframe
                    src={getInstagramEmbedUrl(url)}
                    className={styles.instagramIframe}
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency
                    allow="encrypted-media"
                    title="Instagram post"
                />
            </div>
        )
    }

    // Fallback for unknown types - show link only
    return (
        <div className={`${styles.folderPreview} ${className || ''}`}>
            <p>Preview không khả dụng</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.folderLink}>
                Xem file
            </a>
        </div>
    )
}
