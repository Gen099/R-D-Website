// API Client for Fotober R&D Hub

export interface Document {
  id: string;
  title: string;
  category: string;
  file_path: string;
  file_type: string;
  file_size: number;
  summary: string;
  embed_url?: string;
  embed_type?: 'gdrive' | 'canva' | 'dropbox' | 'local';
  views: number;
  downloads: number;
  created_at: string;
  updated_at: string;
}

export interface AIAnalysisRequest {
  input: string;
  config: {
    model: string;
    temperature?: number;
    max_tokens?: number;
  };
}

export interface AIAnalysisResponse {
  success: boolean;
  data?: {
    output: string;
    model: string;
    usage?: any;
  };
  error?: string;
}

class APIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = '';
  }

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

  async addDocument(doc: Partial<Document>): Promise<Document | null> {
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

  async analyzeWithAI(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return await response.json();
  }

  async getAnalysisHistory(limit: number = 50) {
    const response = await fetch(`/api/analysis/history?limit=${limit}`);
    return await response.json();
  }

  async getAnalysisStatistics() {
    const response = await fetch('/api/analysis/statistics');
    return await response.json();
  }

  async getAIModels() {
    const response = await fetch('/api/ai/models');
    return await response.json();
  }
}

export const api = new APIClient();
