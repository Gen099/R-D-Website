import { NextRequest, NextResponse } from 'next/server'

/**
 * OAuth 2.0 Callback Handler
 * Exchanges authorization code for access + refresh tokens
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
        return NextResponse.json(
            {
                error: 'OAuth authorization failed',
                details: error,
                description: searchParams.get('error_description'),
            },
            { status: 400 }
        )
    }

    if (!code) {
        return NextResponse.json(
            { error: 'Missing authorization code' },
            { status: 400 }
        )
    }

    const appKey = process.env.DROPBOX_APP_KEY
    const appSecret = process.env.DROPBOX_APP_SECRET
    const redirectUri = process.env.DROPBOX_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/dropbox/callback`

    if (!appKey || !appSecret) {
        return NextResponse.json(
            {
                error: 'Dropbox OAuth not configured',
                details: 'Missing DROPBOX_APP_KEY or DROPBOX_APP_SECRET',
            },
            { status: 500 }
        )
    }

    try {
        // Exchange authorization code for tokens
        console.log('🔄 Exchanging authorization code for tokens...')

        const response = await fetch('https://api.dropbox.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                grant_type: 'authorization_code',
                client_id: appKey,
                client_secret: appSecret,
                redirect_uri: redirectUri,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ Token exchange failed:', errorText)
            return NextResponse.json(
                {
                    error: 'Failed to exchange authorization code',
                    details: errorText,
                },
                { status: response.status }
            )
        }

        const data = await response.json()

        console.log('✅ Successfully obtained tokens')

        // Return tokens in a user-friendly format
        return NextResponse.json({
            success: true,
            message: 'Dropbox connected successfully!',
            tokens: {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_in: data.expires_in,
            },
            instructions: {
                step1: 'Copy the refresh_token value below',
                step2: 'Add it to your .env.local file as DROPBOX_REFRESH_TOKEN=...',
                step3: 'Restart your development server',
                step4: 'For Vercel: Add DROPBOX_REFRESH_TOKEN to environment variables and redeploy',
            },
            refresh_token_display: data.refresh_token,
        })
    } catch (error: any) {
        console.error('❌ OAuth callback error:', error)
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error.message,
            },
            { status: 500 }
        )
    }
}
