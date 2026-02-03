'use client'

import { useState, useEffect } from 'react'
import styles from './MediaPreview.module.css'
import { getDropboxDirectUrl, getInstagramEmbedUrl, getDropboxWebViewUrl } from '@/lib/utils/mediaUtils'
import ImageCarousel from './ImageCarousel'

interface MediaPreviewProps {
    url: string
    type: 'image' | 'video' | 'instagram' | 'folder' | 'unknown'
    images?: string[]  // Array of image URLs for folders/galleries
    alt?: string
    className?: string
}

export default function MediaPreview({ url, type, images, alt, className }: MediaPreviewProps) {
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [folderImages, setFolderImages] = useState<string[]>([])
    const [fetchingFolder, setFetchingFolder] = useState(false)
    const [folderError, setFolderError] = useState<string | null>(null)

    if (!url) return null

    // Auto-fetch folder contents if it's a folder and no manual images provided
    useEffect(() => {
        if (type === 'folder' && !images) {
            fetchFolderContents()
        }
    }, [url, type, images])

    const fetchFolderContents = async () => {
        // Check cache first
        const cached = getCachedFolderContents(url)
        if (cached) {
            console.log('📦 Using cached folder contents:', url)
            setFolderImages(cached)
            return
        }

        console.log('🔄 Fetching folder contents:', url)
        setFetchingFolder(true)
        setFolderError(null)

        try {
            const apiUrl = `/api/dropbox/folder?url=${encodeURIComponent(url)}`
            console.log('📡 API call:', apiUrl)

            const response = await fetch(apiUrl)
            const data = await response.json()

            console.log('📥 API response:', { status: response.status, data })

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch folder contents')
            }

            if (data.files && data.files.length > 0) {
                const imageUrls = data.files
                    .filter((f: any) => f.type === 'image')
                    .map((f: any) => f.url)

                console.log(`✅ Found ${imageUrls.length} images in folder`)
                setFolderImages(imageUrls)
                cacheFolderContents(url, imageUrls)
            } else {
                console.warn('⚠️ No images found in folder')
                setFolderError('No images found in folder')
            }
        } catch (error: any) {
            console.error('❌ Failed to fetch folder contents:', error)
            setFolderError(error.message)
        } finally {
            setFetchingFolder(false)
        }
    }

    const getCachedFolderContents = (folderUrl: string): string[] | null => {
        if (typeof window === 'undefined') return null

        try {
            const cached = localStorage.getItem(`folder_${folderUrl}`)
            if (!cached) return null

            const data = JSON.parse(cached)
            // Cache valid for 1 hour
            if (Date.now() - data.timestamp < 3600000) {
                return data.files
            }
        } catch (error) {
            console.error('Cache read error:', error)
        }
        return null
    }

    const cacheFolderContents = (folderUrl: string, files: string[]) => {
        if (typeof window === 'undefined') return

        try {
            localStorage.setItem(
                `folder_${folderUrl}`,
                JSON.stringify({
                    files,
                    timestamp: Date.now(),
                })
            )
        } catch (error) {
            console.error('Cache write error:', error)
        }
    }

    // Render manual images array as carousel
    if (images && images.length > 0) {
        return <ImageCarousel images={images} alt={alt} />
    }

    // Render auto-fetched folder images as carousel
    if (folderImages.length > 0) {
        return <ImageCarousel images={folderImages} alt={alt} />
    }

    // Show loading state while fetching folder
    if (type === 'folder' && fetchingFolder) {
        return (
            <div className={`${styles.folderPreview} ${className || ''}`}>
                <div className={styles.loading}>⏳ Loading folder contents...</div>
            </div>
        )
    }

    // Show error if folder fetch failed
    if (type === 'folder' && folderError) {
        return (
            <div className={`${styles.folderPreview} ${className || ''}`}>
                <div className={styles.folderIcon}>📁</div>
                <p style={{ color: '#c00' }}>❌ {folderError}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.folderLink}>
                    Open folder in Dropbox
                </a>
            </div>
        )
    }

    if (type === 'image') {
        if (imageError) {
            return (
                <div className={`${styles.errorState} ${className || ''}`}>
                    <span>❌ Không thể load image</span>
                    <a href={getDropboxWebViewUrl(url)} target="_blank" rel="noopener noreferrer">
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
