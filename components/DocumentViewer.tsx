'use client'

import { useState, useEffect } from 'react'
import styles from './DocumentViewer.module.css'

interface DocumentViewerProps {
    url: string
    type: 'image' | 'video' | 'pdf' | 'docx' | 'excel' | 'notion' | 'auto'
    title?: string
    onClose: () => void
}

export default function DocumentViewer({ url, type, title, onClose }: DocumentViewerProps) {
    const [viewerType, setViewerType] = useState(type)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (type === 'auto') {
            // Auto-detect file type from URL
            const detectedType = detectFileType(url)
            setViewerType(detectedType)
        }
    }, [url, type])

    const detectFileType = (url: string): typeof viewerType => {
        const lower = url.toLowerCase()
        if (lower.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) return 'image'
        if (lower.match(/\.(mp4|webm|mov|avi)$/)) return 'video'
        if (lower.match(/\.pdf$/)) return 'pdf'
        if (lower.match(/\.(docx?|odt)$/)) return 'docx'
        if (lower.match(/\.(xlsx?|xls|csv)$/)) return 'excel'
        if (lower.includes('notion.so')) return 'notion'
        // Detect cloud storage links
        if (lower.includes('drive.google.com')) return 'auto'
        if (lower.includes('dropbox.com')) return 'auto'
        if (lower.includes('onedrive.live.com')) return 'auto'
        return 'pdf' // default
    }

    const convertCloudUrl = (url: string): string => {
        // Google Drive: Convert sharing link to direct link
        if (url.includes('drive.google.com')) {
            const fileIdMatch =
                url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^&]+)/) || url.match(/\/d\/([^\/]+)/)
            if (fileIdMatch) {
                const fileId = fileIdMatch[1]
                return `https://drive.google.com/uc?export=view&id=${fileId}`
            }
        }

        // Dropbox: Convert to direct link
        if (url.includes('dropbox.com')) {
            if (url.includes('dl=0')) {
                return url.replace('dl=0', 'dl=1')
            }
            if (url.includes('www.dropbox.com')) {
                return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
            }
        }

        // OneDrive: Convert to embed URL
        if (url.includes('onedrive.live.com') || url.includes('1drv.ms')) {
            return url.replace('/view.aspx', '/embed').replace('?', '?embed=')
        }

        return url
    }

    const getViewerUrl = () => {
        const convertedUrl = convertCloudUrl(url)

        switch (viewerType) {
            case 'pdf':
            case 'docx':
                return `https://docs.google.com/viewer?url=${encodeURIComponent(convertedUrl)}&embedded=true`
            case 'excel':
                if (convertedUrl.includes('docs.google.com/spreadsheets')) {
                    return convertedUrl.replace('/edit', '/preview')
                }
                return `https://docs.google.com/viewer?url=${encodeURIComponent(convertedUrl)}&embedded=true`
            case 'image':
            case 'video':
                return convertedUrl
            default:
                return convertedUrl
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const renderViewer = () => {
        const viewerUrl = getViewerUrl()

        if (viewerType === 'image') {
            return (
                <img
                    src={viewerUrl}
                    alt={title || 'Document'}
                    className={styles.image}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setLoading(false)
                        setError(true)
                    }}
                />
            )
        }

        if (viewerType === 'video') {
            return (
                <video
                    src={viewerUrl}
                    controls
                    className={styles.video}
                    onLoadedData={() => setLoading(false)}
                    onError={() => {
                        setLoading(false)
                        setError(true)
                    }}
                >
                    Your browser does not support video playback.
                </video>
            )
        }

        // PDF, DOCX, Excel, Notion - use iframe
        return (
            <iframe
                src={viewerUrl}
                className={styles.iframe}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setLoading(false)
                    setError(true)
                }}
                title={title || 'Document Viewer'}
            />
        )
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.title}>
                        {title || 'Document Viewer'}
                        <span className={styles.type}>{viewerType.toUpperCase()}</span>
                    </div>
                    <div className={styles.actions}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                            title="Open in new tab"
                        >
                            ↗️ Open
                        </a>
                        <a href={url} download className={styles.actionButton} title="Download">
                            ⬇️ Download
                        </a>
                        <button onClick={onClose} className={styles.closeButton} title="Close (Esc)">
                            ✕
                        </button>
                    </div>
                </div>

                {/* Viewer Content */}
                <div className={styles.content}>
                    {loading && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Loading document...</p>
                        </div>
                    )}

                    {error && (
                        <div className={styles.error}>
                            <div className={styles.errorIcon}>⚠️</div>
                            <h3>Failed to load document</h3>
                            <p>The document could not be displayed.</p>
                            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.errorLink}>
                                Open in new tab instead →
                            </a>
                        </div>
                    )}

                    {!error && renderViewer()}
                </div>
            </div>
        </div>
    )
}
