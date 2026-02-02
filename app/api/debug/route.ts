import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'NextAuth API is working',
        env: {
            hasClientId: !!process.env.GOOGLE_CLIENT_ID,
            hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
            hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
            nextAuthUrl: process.env.NEXTAUTH_URL,
        }
    })
}
