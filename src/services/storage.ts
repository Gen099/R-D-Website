// In-Memory Storage Service
// For sandbox/development - simulates D1 database
// In production, this would be replaced with actual D1 queries

export interface AnalysisLog {
  id: string;
  analysis_type: 'brief' | 'error' | 'prompt' | 'general';
  provider: string;
  model: string;
  input_text: string;
  output_text: string;
  effects_detected?: any[];
  errors_detected?: any[];
  suggestions?: string[];
  token_usage: number;
  processing_time_ms: number;
  status: 'success' | 'error';
  error_message?: string;
  created_at: string;
  created_by: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: string;
  file_path: string;
  file_type: string;
  file_size: number;
  summary?: string;
  embed_url?: string; // Google Drive, Canva, etc.
  embed_type?: 'gdrive' | 'canva' | 'dropbox' | 'local'; // Type of embed
  view_count: number;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template_text: string;
  description?: string;
  usage_count: number;
  success_rate: number;
  created_at: string;
}

export interface ErrorPattern {
  id: string;
  error_type: string;
  effect_type?: string;
  error_description: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  solution?: string;
  status: 'open' | 'investigating' | 'resolved';
  first_seen: string;
  last_seen: string;
}

// In-Memory Storage
class InMemoryStorage {
  private analysisLogs: AnalysisLog[] = [];
  private documents: DocumentRecord[] = [];
  private promptTemplates: PromptTemplate[] = [];
  private errorPatterns: ErrorPattern[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample documents
    this.documents = [
      {
        id: '1',
        title: 'Báo cáo Phân tích Hiện trạng R&D AI Video',
        category: 'analysis',
        file_path: '/data/analysis-report.md',
        file_type: 'md',
        file_size: 125000,
        summary: 'Phân tích 23 job codes, 25+ AI Effects, error patterns từ feedback thực tế. Bao gồm: phân bố lỗi, nguyên nhân, giải pháp.',
        embed_url: 'https://docs.google.com/document/d/1234567890/preview',
        embed_type: 'gdrive',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Kế hoạch Công việc R&D AI Video Q1/2026',
        category: 'plan',
        file_path: '/data/work-plan.md',
        file_type: 'md',
        file_size: 85000,
        summary: 'Roadmap 16 tuần, 5 giai đoạn từ Platform setup đến Production deployment. Timeline chi tiết, milestones, deliverables.',
        embed_url: 'https://docs.google.com/spreadsheets/d/abcdefgh/preview',
        embed_type: 'gdrive',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Tài liệu Kỹ thuật Video - Tools & Pricing',
        category: 'technical',
        file_path: '/data/technical-doc.md',
        file_type: 'md',
        file_size: 95000,
        summary: 'Tech stack: Kling AI, Veo 2/3.1, Runway Gen-3, Pika Labs, Luma. Pricing models, comparison matrix, best practices.',
        embed_url: 'https://www.canva.com/design/DABCDeFGHIJ/view',
        embed_type: 'canva',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Tài liệu Vận hành R&D AI VIDEO',
        category: 'operation',
        file_path: '/data/operation-doc.md',
        file_type: 'md',
        file_size: 78000,
        summary: 'Quy trình vận hành, SLA, turnaround time 12-24h, quality control. Workflow, checklists, escalation procedures.',
        embed_url: 'https://docs.google.com/presentation/d/xyz123/preview',
        embed_type: 'gdrive',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Thiết kế Hệ thống Platform',
        category: 'design',
        file_path: '/data/platform-design.md',
        file_type: 'md',
        file_size: 102000,
        summary: 'System architecture, database schema, AI integration, deployment strategy. Technical diagrams, API specs.',
        embed_url: 'https://www.canva.com/design/XYZ789ABC/view',
        embed_type: 'canva',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Video Demo - AI Effects Showcase',
        category: 'demo',
        file_path: '/data/demo-video.mp4',
        file_type: 'video',
        file_size: 15000000,
        summary: 'Demo video các AI Effects: Day-to-Night, Season Change, Lifestyle, Agent Composite. Before/After comparison.',
        embed_url: 'https://drive.google.com/file/d/1a2b3c4d5e6f/preview',
        embed_type: 'gdrive',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '7',
        title: 'Pricing Calculator - Interactive Tool',
        category: 'tool',
        file_path: '/data/pricing-calculator.html',
        file_type: 'html',
        file_size: 25000,
        summary: 'Interactive pricing calculator cho AI Video services. Tính toán dựa trên số lượng effects, duration, complexity.',
        embed_url: 'https://www.canva.com/design/CALCULATOR123/view',
        embed_type: 'canva',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '8',
        title: 'Competitor Analysis Matrix',
        category: 'analysis',
        file_path: '/data/competitor-analysis.xlsx',
        file_type: 'xlsx',
        file_size: 52000,
        summary: 'So sánh Fotober vs Esoft, BoxBrownie, Phixer, PhotoUp. Features, pricing, turnaround time, quality metrics.',
        embed_url: 'https://docs.google.com/spreadsheets/d/comp123/preview',
        embed_type: 'gdrive',
        view_count: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Initialize prompt templates
    this.promptTemplates = [
      {
        id: '1',
        name: 'Brief Analysis',
        category: 'brief',
        template_text: 'Bạn là chuyên gia Video Production tại Fotober...',
        description: 'Template phân tích brief khách hàng với AI Effects gợi ý',
        usage_count: 0,
        success_rate: 0.95,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Error Analysis',
        category: 'error',
        template_text: 'Bạn là QC Lead tại Fotober...',
        description: 'Template phân tích lỗi video với severity và solutions',
        usage_count: 0,
        success_rate: 0.92,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Prompt Generation',
        category: 'prompt',
        template_text: 'Bạn là AI Prompt Engineer...',
        description: 'Template tạo prompt cho AI video tools',
        usage_count: 0,
        success_rate: 0.88,
        created_at: new Date().toISOString()
      }
    ];

    // Initialize error patterns
    this.errorPatterns = [
      {
        id: '1',
        error_type: 'Misunderstanding Requirements',
        effect_type: 'General',
        error_description: 'Hiểu sai yêu cầu khách hàng',
        frequency: 8,
        severity: 'high',
        solution: 'Brief template chuẩn hóa; checklist trước khi bắt đầu',
        status: 'investigating',
        first_seen: new Date('2024-01-01').toISOString(),
        last_seen: new Date().toISOString()
      },
      {
        id: '2',
        error_type: 'AI Output Quality',
        effect_type: 'Object Animation',
        error_description: 'Chất lượng AI output kém, artifacts',
        frequency: 6,
        severity: 'high',
        solution: 'Multi-pass refinement; manual touch-up; reference images',
        status: 'investigating',
        first_seen: new Date('2024-01-05').toISOString(),
        last_seen: new Date().toISOString()
      },
      {
        id: '3',
        error_type: 'Deadline Delays',
        effect_type: 'Creative/Fantasy',
        error_description: 'Trễ deadline do complexity cao',
        frequency: 5,
        severity: 'medium',
        solution: 'Time estimation model; buffer time; phân loại độ khó trước',
        status: 'open',
        first_seen: new Date('2024-01-10').toISOString(),
        last_seen: new Date().toISOString()
      },
      {
        id: '4',
        error_type: 'Physics/Logic Errors',
        effect_type: 'Season/Weather',
        error_description: 'Lỗi vật lý/logic trong video',
        frequency: 4,
        severity: 'high',
        solution: 'Physics validation; QC checklist; real-world reference',
        status: 'open',
        first_seen: new Date('2024-01-12').toISOString(),
        last_seen: new Date().toISOString()
      }
    ];
  }

  // Analysis Logs Methods
  async saveAnalysisLog(log: Omit<AnalysisLog, 'id' | 'created_at'>): Promise<AnalysisLog> {
    const newLog: AnalysisLog = {
      ...log,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    this.analysisLogs.unshift(newLog); // Add to beginning
    
    // Keep only last 100 logs to prevent memory issues
    if (this.analysisLogs.length > 100) {
      this.analysisLogs = this.analysisLogs.slice(0, 100);
    }
    
    return newLog;
  }

  async getAnalysisLogs(limit: number = 50, offset: number = 0): Promise<AnalysisLog[]> {
    return this.analysisLogs.slice(offset, offset + limit);
  }

  async getAnalysisLogById(id: string): Promise<AnalysisLog | null> {
    return this.analysisLogs.find(log => log.id === id) || null;
  }

  async getAnalysisStatistics() {
    const total = this.analysisLogs.length;
    const byProvider = this.analysisLogs.reduce((acc, log) => {
      acc[log.provider] = (acc[log.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byType = this.analysisLogs.reduce((acc, log) => {
      acc[log.analysis_type] = (acc[log.analysis_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalTokens = this.analysisLogs.reduce((sum, log) => sum + log.token_usage, 0);
    const avgTokens = total > 0 ? Math.round(totalTokens / total) : 0;

    const successRate = total > 0 
      ? (this.analysisLogs.filter(log => log.status === 'success').length / total * 100).toFixed(1)
      : '0';

    return {
      total,
      byProvider,
      byType,
      totalTokens,
      avgTokens,
      successRate
    };
  }

  // Documents Methods
  async getDocuments(): Promise<DocumentRecord[]> {
    return this.documents;
  }

  async getDocumentById(id: string): Promise<DocumentRecord | null> {
    return this.documents.find(doc => doc.id === id) || null;
  }

  async incrementDocumentView(id: string): Promise<void> {
    const doc = this.documents.find(d => d.id === id);
    if (doc) {
      doc.view_count++;
      doc.updated_at = new Date().toISOString();
    }
  }

  async incrementDocumentDownload(id: string): Promise<void> {
    const doc = this.documents.find(d => d.id === id);
    if (doc) {
      doc.download_count++;
      doc.updated_at = new Date().toISOString();
    }
  }

  async addDocument(doc: Omit<DocumentRecord, 'id' | 'created_at' | 'updated_at' | 'view_count' | 'download_count'>): Promise<DocumentRecord> {
    const newDoc: DocumentRecord = {
      ...doc,
      id: Date.now().toString(),
      view_count: 0,
      download_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  async deleteDocument(id: string): Promise<boolean> {
    const index = this.documents.findIndex(d => d.id === id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      return true;
    }
    return false;
  }

  // Prompt Templates Methods
  async getPromptTemplates(): Promise<PromptTemplate[]> {
    return this.promptTemplates;
  }

  async getPromptTemplateById(id: string): Promise<PromptTemplate | null> {
    return this.promptTemplates.find(t => t.id === id) || null;
  }

  async incrementPromptUsage(id: string): Promise<void> {
    const template = this.promptTemplates.find(t => t.id === id);
    if (template) {
      template.usage_count++;
    }
  }

  // Error Patterns Methods
  async getErrorPatterns(): Promise<ErrorPattern[]> {
    return this.errorPatterns;
  }

  async getErrorPatternById(id: string): Promise<ErrorPattern | null> {
    return this.errorPatterns.find(e => e.id === id) || null;
  }

  async incrementErrorFrequency(id: string): Promise<void> {
    const error = this.errorPatterns.find(e => e.id === id);
    if (error) {
      error.frequency++;
      error.last_seen = new Date().toISOString();
    }
  }

  // Clear all data (for testing)
  clearAll(): void {
    this.analysisLogs = [];
    this.initializeData();
  }
}

// Singleton instance
export const storage = new InMemoryStorage();
