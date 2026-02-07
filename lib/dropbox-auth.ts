/**
 * Dropbox OAuth 2.0 Authentication Manager
 * Handles token refresh and secure API calls
 */

interface DropboxTokens {
    access_token: string
    refresh_token: string
    expires_at: number // Unix timestamp
}

class DropboxAuthManager {
    private tokens: DropboxTokens | null = null
    private appKey: string
    private appSecret: string
    private refreshToken: string

    constructor() {
        this.appKey = process.env.DROPBOX_APP_KEY || ''
        this.appSecret = process.env.DROPBOX_APP_SECRET || ''
        this.refreshToken = process.env.DROPBOX_REFRESH_TOKEN || ''

        if (!this.appKey || !this.appSecret || !this.refreshToken) {
            console.warn('⚠️ Dropbox OAuth credentials not fully configured')
        }
    }

    /**
     * Get a valid access token, refreshing if necessary
     */
    async getAccessToken(): Promise<string> {
        // Check if we have a valid token
        if (this.tokens && this.tokens.expires_at > Date.now()) {
            return this.tokens.access_token
        }

        // Token expired or doesn't exist, refresh it
        console.log('🔄 Refreshing Dropbox access token...')
        await this.refreshAccessToken()

        if (!this.tokens) {
            throw new Error('Failed to obtain access token')
        }

        return this.tokens.access_token
    }

    /**
     * Refresh the access token using refresh token
     */
    private async refreshAccessToken(): Promise<void> {
        try {
            const response = await fetch('https://api.dropbox.com/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken,
                    client_id: this.appKey,
                    client_secret: this.appSecret,
                }),
            })

            if (!response.ok) {
                const error = await response.text()
                console.error('❌ Token refresh failed:', error)
                throw new Error(`Token refresh failed: ${response.status}`)
            }

            const data = await response.json()

            this.tokens = {
                access_token: data.access_token,
                refresh_token: this.refreshToken, // Refresh token stays the same
                expires_at: Date.now() + (data.expires_in * 1000) - 60000, // Expire 1 min early for safety
            }

            console.log('✅ Access token refreshed successfully')
        } catch (error) {
            console.error('❌ Error refreshing token:', error)
            throw error
        }
    }

    /**
     * Make an authenticated API call to Dropbox
     * Automatically handles token refresh on 401 errors
     */
    async apiCall(url: string, options: RequestInit = {}): Promise<Response> {
        const accessToken = await this.getAccessToken()

        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
        }

        let response = await fetch(url, {
            ...options,
            headers,
        })

        // If we get 401, token might have expired, try refreshing once
        if (response.status === 401) {
            console.log('🔄 Got 401, refreshing token and retrying...')
            
            // Force refresh
            this.tokens = null
            const newAccessToken = await this.getAccessToken()

            headers['Authorization'] = `Bearer ${newAccessToken}`

            response = await fetch(url, {
                ...options,
                headers,
            })
        }

        return response
    }

    /**
     * Check if authentication is properly configured
     */
    isConfigured(): boolean {
        return !!(this.appKey && this.appSecret && this.refreshToken)
    }

    /**
     * Get configuration status for debugging
     */
    getConfigStatus(): {
        hasAppKey: boolean
        hasAppSecret: boolean
        hasRefreshToken: boolean
        isFullyConfigured: boolean
    } {
        return {
            hasAppKey: !!this.appKey,
            hasAppSecret: !!this.appSecret,
            hasRefreshToken: !!this.refreshToken,
            isFullyConfigured: this.isConfigured(),
        }
    }
}

// Singleton instance
let authManager: DropboxAuthManager | null = null

export function getDropboxAuth(): DropboxAuthManager {
    if (!authManager) {
        authManager = new DropboxAuthManager()
    }
    return authManager
}

export default DropboxAuthManager
