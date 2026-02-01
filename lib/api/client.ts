// API Client for Fotober R&D Hub - Next.js

export interface Document {
    id: number;
    title: string;
    category: string;
    file_path: string;
    file_type: string;
    file_size: number;
    summary?: string;
    embed_url?: string;
    embed_type?: 'gdrive' | 'canva' | 'dropbox' | 'local';
    view_count: number;
    download_count: number;
    created_at: Date;
    updated_at: Date;
}

class APIClient {
    async getDocuments(): Promise<Document[]> {
        const response = await fetch('/api/documents');
        const data = await response.json();
        return data.success ? data.data : [];
    }

    async getDocumentById(id: string): Promise<Document | null> {
        const response = await fetch(`/api/documents/${id}`);
        const data = await response.json();
        return data.success ? data.data : null;
    }

    async addDocument(doc: {
        title: string;
        category: string;
        embed_url: string;
        summary?: string;
    }): Promise<Document | null> {
        const response = await fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doc),
        });
        const data = await response.json();
        return data.success ? data.data : null;
    }

    async deleteDocument(id: string): Promise<boolean> {
        const response = await fetch(`/api/documents/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data.success;
    }

    async trackDownload(id: string): Promise<boolean> {
        const response = await fetch(`/api/documents/${id}/download`, {
            method: 'POST',
        });
        const data = await response.json();
        return data.success;
    }

    async getAnalysisHistory(limit: number = 50) {
        const response = await fetch(`/api/analysis/history?limit=${limit}`);
        return await response.json();
    }

    async getAnalysisStatistics() {
        const response = await fetch('/api/analysis/statistics');
        return await response.json();
    }
}

export const api = new APIClient();
