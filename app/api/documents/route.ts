import { NextResponse } from 'next/server';
import { storage } from '@/lib/services/storage';

export async function GET() {
    try {
        const documents = await storage.getDocuments();
        return NextResponse.json({ success: true, data: documents });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, summary, embed_url } = body;

        if (!title || !category || !embed_url) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: title, category, embed_url' },
                { status: 400 }
            );
        }

        let embed_type: 'gdrive' | 'canva' | 'dropbox' | 'local' = 'local';
        if (embed_url.includes('drive.google.com') || embed_url.includes('docs.google.com')) {
            embed_type = 'gdrive';
        } else if (embed_url.includes('canva.com')) {
            embed_type = 'canva';
        } else if (embed_url.includes('dropbox.com')) {
            embed_type = 'dropbox';
        }

        const newDoc = await storage.addDocument({
            title,
            category,
            file_path: embed_url,
            file_type: 'embed',
            file_size: 0,
            summary: summary || '',
            embed_url,
            embed_type,
        });

        return NextResponse.json({ success: true, data: newDoc });
    } catch (error) {
        console.error('Error creating document:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
