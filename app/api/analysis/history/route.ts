import { NextResponse } from 'next/server';
import { storage } from '@/lib/services/storage';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');

        const history = await storage.getAnalysisLogs(limit);
        return NextResponse.json({ success: true, data: history });
    } catch (error) {
        console.error('Error fetching analysis history:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
