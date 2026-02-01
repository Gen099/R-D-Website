import { NextResponse } from 'next/server';
import { storage } from '@/lib/services/storage';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const doc = await storage.getDocumentById(id);

        if (!doc) {
            return NextResponse.json(
                { success: false, error: 'Document not found' },
                { status: 404 }
            );
        }

        await storage.incrementDocumentView(id);
        return NextResponse.json({ success: true, data: doc });
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch document' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const success = await storage.deleteDocument(id);

        if (!success) {
            return NextResponse.json(
                { success: false, error: 'Document not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete document' },
            { status: 500 }
        );
    }
}
