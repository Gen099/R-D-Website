import { sql } from '@vercel/postgres';
import type { Document, AnalysisLog, PromptTemplate, ErrorPattern } from '../db';

export class StorageService {
  // Documents Methods
  async getDocuments(): Promise<Document[]> {
    const result = await sql<Document>`
      SELECT * FROM documents 
      ORDER BY created_at DESC
    `;
    return result.rows;
  }

  async getDocumentById(id: string): Promise<Document | null> {
    const result = await sql<Document>`
      SELECT * FROM documents 
      WHERE id = ${parseInt(id)}
    `;
    return result.rows[0] || null;
  }

  async incrementDocumentView(id: string): Promise<void> {
    await sql`
      UPDATE documents 
      SET view_count = view_count + 1, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
    `;
  }

  async incrementDocumentDownload(id: string): Promise<void> {
    await sql`
      UPDATE documents 
      SET download_count = download_count + 1, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
    `;
  }

  async addDocument(doc: {
    title: string;
    category: string;
    file_path: string;
    file_type: string;
    file_size: number;
    summary?: string;
    embed_url?: string;
    embed_type?: string;
  }): Promise<Document> {
    const result = await sql<Document>`
      INSERT INTO documents (
        title, category, file_path, file_type, file_size, 
        summary, embed_url, embed_type
      )
      VALUES (
        ${doc.title}, ${doc.category}, ${doc.file_path}, 
        ${doc.file_type}, ${doc.file_size}, ${doc.summary || null}, 
        ${doc.embed_url || null}, ${doc.embed_type || null}
      )
      RETURNING *
    `;
    return result.rows[0];
  }

  async deleteDocument(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM documents 
      WHERE id = ${parseInt(id)}
    `;
    return (result.rowCount ?? 0) > 0;
  }

  // Analysis Logs Methods
  async saveAnalysisLog(log: {
    analysis_type: string;
    provider: string;
    model: string;
    input_text: string;
    output_text: string;
    effects_detected?: any[];
    errors_detected?: any[];
    suggestions?: string[];
    token_usage: number;
    processing_time_ms: number;
    status: string;
    error_message?: string;
    created_by: string;
  }): Promise<AnalysisLog> {
    const result = await sql<AnalysisLog>`
      INSERT INTO analysis_logs (
        analysis_type, provider, model, input_text, output_text,
        effects_detected, errors_detected, suggestions, token_usage,
        processing_time_ms, status, error_message, created_by
      )
      VALUES (
        ${log.analysis_type}, ${log.provider}, ${log.model}, 
        ${log.input_text}, ${log.output_text},
        ${JSON.stringify(log.effects_detected || [])}, 
        ${JSON.stringify(log.errors_detected || [])},
        ${log.suggestions || []}, ${log.token_usage},
        ${log.processing_time_ms}, ${log.status}, 
        ${log.error_message || null}, ${log.created_by}
      )
      RETURNING *
    `;
    return result.rows[0];
  }

  async getAnalysisLogs(limit: number = 50, offset: number = 0): Promise<AnalysisLog[]> {
    const result = await sql<AnalysisLog>`
      SELECT * FROM analysis_logs 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    return result.rows;
  }

  async getAnalysisStatistics() {
    const totalResult = await sql`SELECT COUNT(*) as total FROM analysis_logs`;
    const total = parseInt(totalResult.rows[0].total);

    const byProviderResult = await sql`
      SELECT provider, COUNT(*) as count 
      FROM analysis_logs 
      GROUP BY provider
    `;

    const byTypeResult = await sql`
      SELECT analysis_type, COUNT(*) as count 
      FROM analysis_logs 
      GROUP BY analysis_type
    `;

    const tokensResult = await sql`
      SELECT 
        SUM(token_usage) as total_tokens,
        AVG(token_usage) as avg_tokens
      FROM analysis_logs
    `;

    const successResult = await sql`
      SELECT COUNT(*) as success_count 
      FROM analysis_logs 
      WHERE status = 'success'
    `;

    const byProvider: Record<string, number> = {};
    byProviderResult.rows.forEach((row: any) => {
      byProvider[row.provider] = parseInt(row.count);
    });

    const byType: Record<string, number> = {};
    byTypeResult.rows.forEach((row: any) => {
      byType[row.analysis_type] = parseInt(row.count);
    });

    const totalTokens = parseInt(tokensResult.rows[0]?.total_tokens || '0');
    const avgTokens = Math.round(parseFloat(tokensResult.rows[0]?.avg_tokens || '0'));
    const successCount = parseInt(successResult.rows[0].success_count);
    const successRate = total > 0 ? ((successCount / total) * 100).toFixed(1) : '0';

    return {
      total,
      byProvider,
      byType,
      totalTokens,
      avgTokens,
      successRate
    };
  }

  // Prompt Templates Methods
  async getPromptTemplates(): Promise<PromptTemplate[]> {
    const result = await sql<PromptTemplate>`
      SELECT * FROM prompt_templates 
      ORDER BY usage_count DESC
    `;
    return result.rows;
  }

  async incrementPromptUsage(id: string): Promise<void> {
    await sql`
      UPDATE prompt_templates 
      SET usage_count = usage_count + 1 
      WHERE id = ${parseInt(id)}
    `;
  }

  // Error Patterns Methods
  async getErrorPatterns(): Promise<ErrorPattern[]> {
    const result = await sql<ErrorPattern>`
      SELECT * FROM error_patterns 
      ORDER BY frequency DESC, severity DESC
    `;
    return result.rows;
  }

  async incrementErrorFrequency(id: string): Promise<void> {
    await sql`
      UPDATE error_patterns 
      SET frequency = frequency + 1, 
          last_seen = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
    `;
  }
}

// Singleton instance
export const storage = new StorageService();
