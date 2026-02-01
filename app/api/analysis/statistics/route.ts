import { NextResponse } from 'next/server';
import { storage } from '@/lib/services/storage';

export async function GET() {
    try {
        const stats = await storage.getAnalysisStatistics();
        return NextResponse.json({ success: true, data: stats });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get statistics' },
            { status: 500 }
        );
    }
}
