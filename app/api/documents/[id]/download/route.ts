import { NextResponse } from 'next/server';
import { storage } from '@/lib/services/storage';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await storage.incrementDocumentDownload(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking download:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
