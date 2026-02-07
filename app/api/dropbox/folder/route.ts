import { NextRequest, NextResponse } from 'next/server'
import { getDropboxAuth } from '@/lib/dropbox-auth'

interface DropboxFile {
    name: string
    path: string
    type: 'image' | 'video'
    url: string
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const sharedLink = searchParams.get('url')

    if (!sharedLink) {
        return NextResponse.json(
            { error: 'Missing url parameter' },
            { status: 400 }
        )
    }

    const auth = getDropboxAuth()

    if (!auth.isConfigured()) {
        const status = auth.getConfigStatus()
        console.error('❌ Dropbox OAuth not fully configured:', status)
        return NextResponse.json(
            {
                error: 'Dropbox OAuth not configured',
                details: 'Please complete OAuth setup',
                help: 'Visit /admin/dropbox-setup to connect your Dropbox account',
                configStatus: status
            },
            { status: 500 }
        )
    }

    console.log('📁 Fetching folder:', sharedLink)

    try {
        // Step 1: Get shared link metadata
        console.log('📡 Calling Dropbox API: get_shared_link_metadata')
        const metadataResponse = await auth.apiCall(
            'https://api.dropboxapi.com/2/sharing/get_shared_link_metadata',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: sharedLink }),
            }
        )

        const metadataText = await metadataResponse.text()
        console.log('📥 Metadata response:', metadataResponse.status, metadataText.substring(0, 200))

        if (!metadataResponse.ok) {
            let errorMessage = 'Failed to get folder metadata'
            try {
                const error = JSON.parse(metadataText)
                errorMessage = error.error_summary || errorMessage
                console.error('❌ Dropbox API error:', error)
            } catch {
                errorMessage = metadataText
            }
            return NextResponse.json(
                {
                    error: errorMessage,
                    status: metadataResponse.status,
                    help: 'Check if: 1) Token is valid, 2) Folder link is correct, 3) Permissions are enabled'
                },
                { status: metadataResponse.status }
            )
        }

        const metadata = JSON.parse(metadataText)

        // Step 2: List folder contents
        const listResponse = await auth.apiCall(
            'https://api.dropboxapi.com/2/files/list_folder',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path: metadata.path_lower || '',
                    limit: 100,
                }),
            }
        )

        if (!listResponse.ok) {
            const error = await listResponse.json()
            return NextResponse.json(
                { error: error.error_summary || 'Failed to list folder contents' },
                { status: listResponse.status }
            )
        }

        const listData = await listResponse.json()

        // Step 3: Filter only images and videos
        const mediaFiles = listData.entries
            .filter((entry: any) => entry['.tag'] === 'file')
            .filter((file: any) => {
                const ext = file.name.toLowerCase().split('.').pop()
                return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'mp4', 'mov', 'webm', 'avi'].includes(ext || '')
            })
            .map((file: any) => ({
                name: file.name,
                path: file.path_display,
                type: file.name.match(/\.(mp4|mov|webm|avi)$/i) ? 'video' : 'image',
            }))

        // Step 4: Get temporary download links for each file
        const filesWithLinks: DropboxFile[] = await Promise.all(
            mediaFiles.map(async (file: any) => {
                try {
                    const linkResponse = await auth.apiCall(
                        'https://api.dropboxapi.com/2/files/get_temporary_link',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ path: file.path }),
                        }
                    )

                    if (!linkResponse.ok) {
                        console.error(`Failed to get link for ${file.name}`)
                        return null
                    }

                    const linkData = await linkResponse.json()

                    return {
                        ...file,
                        url: linkData.link,
                    }
                } catch (error) {
                    console.error(`Error getting link for ${file.name}:`, error)
                    return null
                }
            })
        )

        // Filter out failed requests
        const validFiles = filesWithLinks.filter((f): f is DropboxFile => f !== null)

        return NextResponse.json({
            files: validFiles,
            total: validFiles.length,
            folder: metadata.name || 'Dropbox Folder',
        })
    } catch (error: any) {
        console.error('Dropbox API error:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
