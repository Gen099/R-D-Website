/**
 * Media utilities for handling Dropbox and Instagram URLs
 */

/**
 * Convert Dropbox share URL to direct download/preview URL
 * Changes ?dl=0 to ?raw=1 for inline preview
 */
export function getDropboxDirectUrl(shareUrl: string): string {
    if (!shareUrl) return ''

    // Replace dl=0 with raw=1 for direct access
    return shareUrl
        .replace('?dl=0', '?raw=1')
        .replace('&dl=0', '&raw=1')
        .replace('?dl=1', '?raw=1')
        .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
}

/**
 * Check if URL points to an image file
 */
export function isImageUrl(url: string): boolean {
    if (!url) return false
    return /\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i.test(url)
}

/**
 * Check if URL points to a video file
 */
export function isVideoUrl(url: string): boolean {
    if (!url) return false
    return /\.(mp4|mov|avi|webm|mkv)(\?|$)/i.test(url)
}

/**
 * Check if URL is a Dropbox folder (contains multiple files)
 */
export function isDropboxFolder(url: string): boolean {
    return url.includes('/scl/fo/')
}

/**
 * Check if URL is a Google Drive folder
 */
export function isGoogleDriveFolder(url: string): boolean {
    return url.includes('drive.google.com/drive/folders')
}

/**
 * Check if URL is a Google Drive file
 */
export function isGoogleDriveUrl(url: string): boolean {
    return url.includes('drive.google.com')
}

/**
 * Get Instagram embed URL from post/reel URL
 * Converts: instagram.com/reel/ABC123/ -> instagram.com/p/ABC123/embed/
 */
export function getInstagramEmbedUrl(postUrl: string): string {
    if (!postUrl) return ''

    // Extract post/reel ID
    const reelMatch = postUrl.match(/\/reel\/([A-Za-z0-9_-]+)/)
    const postMatch = postUrl.match(/\/p\/([A-Za-z0-9_-]+)/)

    const id = reelMatch?.[1] || postMatch?.[1]

    if (id) {
        return `https://www.instagram.com/p/${id}/embed/captioned`
    }

    return postUrl
}

/**
 * Check if URL is an Instagram post/reel
 */
export function isInstagramUrl(url: string): boolean {
    return url.includes('instagram.com')
}

/**
 * Get media type from URL
 */
export function getMediaType(url: string): 'image' | 'video' | 'instagram' | 'folder' | 'unknown' {
    if (isInstagramUrl(url)) return 'instagram'
    if (isDropboxFolder(url) || isGoogleDriveFolder(url)) return 'folder'
    if (isImageUrl(url)) return 'image'
    if (isVideoUrl(url)) return 'video'
    return 'unknown'
}
