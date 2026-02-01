import { sql } from '@vercel/postgres';

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

export interface AnalysisLog {
    id: number;
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
    created_at: Date;
    created_by: string;
}

export interface PromptTemplate {
    id: number;
    name: string;
    category: string;
    template_text: string;
    description?: string;
    usage_count: number;
    success_rate: number;
    created_at: Date;
}

export interface ErrorPattern {
    id: number;
    error_type: string;
    effect_type?: string;
    error_description: string;
    frequency: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    solution?: string;
    status: 'open' | 'investigating' | 'resolved';
    first_seen: Date;
    last_seen: Date;
}

// Database connection helper
export async function query<T = any>(queryText: string, params?: any[]): Promise<T[]> {
    try {
        const result = await sql.query(queryText, params);
        return result.rows as T[];
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Initialize database with sample data
export async function initializeDatabase() {
    try {
        // Check if documents table has data
        const result = await sql`SELECT COUNT(*) as count FROM documents`;
        const count = parseInt(result.rows[0].count);

        if (count === 0) {
            // Insert sample documents
            await sql`
        INSERT INTO documents (title, category, file_path, file_type, file_size, summary, embed_url, embed_type)
        VALUES 
          ('Báo cáo Phân tích Hiện trạng R&D AI Video', 'analysis', '/data/analysis-report.md', 'md', 125000, 
           'Phân tích 23 job codes, 25+ AI Effects, error patterns từ feedback thực tế. Bao gồm: phân bố lỗi, nguyên nhân, giải pháp.', 
           'https://docs.google.com/document/d/1234567890/preview', 'gdrive'),
          ('Kế hoạch Công việc R&D AI Video Q1/2026', 'plan', '/data/work-plan.md', 'md', 85000,
           'Roadmap 16 tuần, 5 giai đoạn từ Platform setup đến Production deployment. Timeline chi tiết, milestones, deliverables.',
           'https://docs.google.com/spreadsheets/d/abcdefgh/preview', 'gdrive'),
          ('Tài liệu Kỹ thuật Video - Tools & Pricing', 'technical', '/data/technical-doc.md', 'md', 95000,
           'Tech stack: Kling AI, Veo 2/3.1, Runway Gen-3, Pika Labs, Luma. Pricing models, comparison matrix, best practices.',
           'https://www.canva.com/design/DABCDeFGHIJ/view', 'canva'),
          ('Tài liệu Vận hành R&D AI VIDEO', 'operation', '/data/operation-doc.md', 'md', 78000,
           'Quy trình vận hành, SLA, turnaround time 12-24h, quality control. Workflow, checklists, escalation procedures.',
           'https://docs.google.com/presentation/d/xyz123/preview', 'gdrive'),
          ('Thiết kế Hệ thống Platform', 'design', '/data/platform-design.md', 'md', 102000,
           'System architecture, database schema, AI integration, deployment strategy. Technical diagrams, API specs.',
           'https://www.canva.com/design/XYZ789ABC/view', 'canva'),
          ('Video Demo - AI Effects Showcase', 'demo', '/data/demo-video.mp4', 'video', 15000000,
           'Demo video các AI Effects: Day-to-Night, Season Change, Lifestyle, Agent Composite. Before/After comparison.',
           'https://drive.google.com/file/d/1a2b3c4d5e6f/preview', 'gdrive'),
          ('Pricing Calculator - Interactive Tool', 'tool', '/data/pricing-calculator.html', 'html', 25000,
           'Interactive pricing calculator cho AI Video services. Tính toán dựa trên số lượng effects, duration, complexity.',
           'https://www.canva.com/design/CALCULATOR123/view', 'canva'),
          ('Competitor Analysis Matrix', 'analysis', '/data/competitor-analysis.xlsx', 'xlsx', 52000,
           'So sánh Fotober vs Esoft, BoxBrownie, Phixer, PhotoUp. Features, pricing, turnaround time, quality metrics.',
           'https://docs.google.com/spreadsheets/d/comp123/preview', 'gdrive')
      `;

            console.log('Database initialized with sample data');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
