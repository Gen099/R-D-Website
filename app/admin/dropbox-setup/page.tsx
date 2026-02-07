'use client'

import { useState } from 'react'

export default function DropboxSetupPage() {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle')
    const [refreshToken, setRefreshToken] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const initiateOAuth = () => {
        const appKey = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY

        if (!appKey) {
            setStatus('error')
            setErrorMessage('DROPBOX_APP_KEY not configured. Please add it to your environment variables.')
            return
        }

        const redirectUri = `${window.location.origin}/api/auth/dropbox/callback`
        const authUrl = `https://www.dropbox.com/oauth2/authorize?` +
            `client_id=${appKey}&` +
            `response_type=code&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `token_access_type=offline` // Request refresh token

        setStatus('connecting')
        window.location.href = authUrl
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        🔐 Dropbox OAuth Setup
                    </h1>

                    <div className="space-y-6">
                        {/* Current Status */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">
                                Current Status
                            </h2>
                            <p className="text-blue-700">
                                {status === 'idle' && '⏸️ Not connected'}
                                {status === 'connecting' && '🔄 Redirecting to Dropbox...'}
                                {status === 'success' && '✅ Connected successfully!'}
                                {status === 'error' && '❌ Connection failed'}
                            </p>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                📋 Setup Instructions
                            </h2>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                <li>Click "Connect Dropbox" below</li>
                                <li>Log in to Dropbox and authorize the app</li>
                                <li>Copy the refresh token from the callback page</li>
                                <li>Add it to your <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code> file</li>
                                <li>Restart your development server</li>
                            </ol>
                        </div>

                        {/* Prerequisites */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-yellow-900 mb-3">
                                ⚠️ Prerequisites
                            </h2>
                            <p className="text-yellow-800 mb-2">
                                Before connecting, ensure you have:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-yellow-700">
                                <li>Created a Dropbox app at <a href="https://www.dropbox.com/developers/apps" target="_blank" rel="noopener noreferrer" className="underline">developers.dropbox.com</a></li>
                                <li>Set <code className="bg-yellow-100 px-1 rounded">DROPBOX_APP_KEY</code> in environment variables</li>
                                <li>Set <code className="bg-yellow-100 px-1 rounded">DROPBOX_APP_SECRET</code> in environment variables</li>
                                <li>Added redirect URI in Dropbox app settings: <code className="bg-yellow-100 px-1 rounded text-xs">{typeof window !== 'undefined' ? `${window.location.origin}/api/auth/dropbox/callback` : '/api/auth/dropbox/callback'}</code></li>
                            </ul>
                        </div>

                        {/* Error Message */}
                        {status === 'error' && errorMessage && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-red-900 mb-2">
                                    Error
                                </h3>
                                <p className="text-red-700">{errorMessage}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {refreshToken && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">
                                    ✅ Refresh Token
                                </h3>
                                <div className="bg-white border border-green-300 rounded p-3 mb-3">
                                    <code className="text-xs break-all text-gray-800">
                                        {refreshToken}
                                    </code>
                                </div>
                                <p className="text-green-700 text-sm">
                                    Add this to your .env.local file as:
                                </p>
                                <code className="block bg-green-100 p-2 rounded mt-2 text-sm">
                                    DROPBOX_REFRESH_TOKEN={refreshToken}
                                </code>
                            </div>
                        )}

                        {/* Connect Button */}
                        <button
                            onClick={initiateOAuth}
                            disabled={status === 'connecting'}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {status === 'connecting' ? (
                                <>
                                    <span className="animate-spin">🔄</span>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <span>📦</span>
                                    Connect Dropbox
                                </>
                            )}
                        </button>

                        {/* Documentation Link */}
                        <div className="text-center text-sm text-gray-600">
                            Need help? Check the{' '}
                            <a href="/DROPBOX_API_SETUP.md" className="text-blue-600 hover:underline">
                                setup documentation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
