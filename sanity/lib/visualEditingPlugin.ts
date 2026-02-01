import { definePlugin } from 'sanity'
import { presentationTool } from 'sanity/presentation'

export const visualEditingPlugin = definePlugin({
    name: 'visual-editing',
    plugins: [
        presentationTool({
            previewUrl: {
                origin: process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                    : 'http://localhost:3000',
                draftMode: {
                    enable: '/api/draft',
                },
            },
        }),
    ],
})
