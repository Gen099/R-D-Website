-- Migration: 0001_initial_schema.sql
-- Created: 2026-01-30
-- Description: Initial database schema for Fotober R&D Intelligence Hub

-- ============================================
-- AI Analysis Logs Table
-- ============================================
CREATE TABLE IF NOT EXISTS ai_analysis_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  analysis_type TEXT NOT NULL CHECK(analysis_type IN ('brief', 'error', 'prompt', 'general')),
  provider TEXT NOT NULL CHECK(provider IN ('gemini', 'glm', 'openai', 'claude')),
  model TEXT NOT NULL,
  input_text TEXT NOT NULL,
  output_json TEXT,
  tokens_used INTEGER DEFAULT 0,
  tokens_prompt INTEGER DEFAULT 0,
  tokens_completion INTEGER DEFAULT 0,
  success BOOLEAN DEFAULT 1,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Documents Table
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK(category IN ('Báo cáo', 'Kế hoạch', 'Kỹ thuật', 'Vận hành', 'Thiết kế')),
  file_url TEXT,
  file_type TEXT CHECK(file_type IN ('PDF', 'DOCX', 'TXT', 'MD', 'XLSX')),
  file_size INTEGER,
  metadata TEXT, -- JSON string for additional metadata
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- User Preferences Table
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Prompt Library Table
-- ============================================
CREATE TABLE IF NOT EXISTS prompt_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT CHECK(category IN ('brief', 'error', 'prompt', 'general')),
  effect_type TEXT, -- Day-to-Night, Lifestyle, etc.
  prompt_master TEXT NOT NULL,
  negative_prompt TEXT,
  parameters TEXT, -- JSON string
  tool_recommended TEXT, -- Kling, Veo, Runway, etc.
  success_rate REAL DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Error Patterns Table
-- ============================================
CREATE TABLE IF NOT EXISTS error_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_code TEXT,
  error_group TEXT CHECK(error_group IN ('A', 'B', 'C', 'D')),
  effect_type TEXT,
  description TEXT NOT NULL,
  root_cause TEXT,
  solution TEXT,
  prevention TEXT,
  severity TEXT CHECK(severity IN ('low', 'medium', 'high')),
  occurrence_count INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes for Performance
-- ============================================

-- AI Analysis Logs indexes
CREATE INDEX IF NOT EXISTS idx_logs_type ON ai_analysis_logs(analysis_type);
CREATE INDEX IF NOT EXISTS idx_logs_provider ON ai_analysis_logs(provider);
CREATE INDEX IF NOT EXISTS idx_logs_created ON ai_analysis_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_logs_session ON ai_analysis_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_logs_success ON ai_analysis_logs(success);

-- Documents indexes
CREATE INDEX IF NOT EXISTS idx_docs_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_docs_created ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_docs_type ON documents(file_type);

-- Prompt Library indexes
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompt_library(category);
CREATE INDEX IF NOT EXISTS idx_prompts_effect ON prompt_library(effect_type);
CREATE INDEX IF NOT EXISTS idx_prompts_rate ON prompt_library(success_rate DESC);
CREATE INDEX IF NOT EXISTS idx_prompts_usage ON prompt_library(usage_count DESC);

-- Error Patterns indexes
CREATE INDEX IF NOT EXISTS idx_errors_group ON error_patterns(error_group);
CREATE INDEX IF NOT EXISTS idx_errors_effect ON error_patterns(effect_type);
CREATE INDEX IF NOT EXISTS idx_errors_severity ON error_patterns(severity);
CREATE INDEX IF NOT EXISTS idx_errors_count ON error_patterns(occurrence_count DESC);

-- ============================================
-- Triggers for updated_at
-- ============================================

-- Documents trigger
CREATE TRIGGER IF NOT EXISTS update_documents_timestamp 
AFTER UPDATE ON documents
BEGIN
  UPDATE documents SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- User Preferences trigger
CREATE TRIGGER IF NOT EXISTS update_preferences_timestamp 
AFTER UPDATE ON user_preferences
BEGIN
  UPDATE user_preferences SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Prompt Library trigger
CREATE TRIGGER IF NOT EXISTS update_prompts_timestamp 
AFTER UPDATE ON prompt_library
BEGIN
  UPDATE prompt_library SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Error Patterns trigger
CREATE TRIGGER IF NOT EXISTS update_errors_timestamp 
AFTER UPDATE ON error_patterns
BEGIN
  UPDATE error_patterns SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- ============================================
-- Initial Data
-- ============================================

-- Insert default preferences
INSERT OR IGNORE INTO user_preferences (key, value, description) VALUES
  ('default_ai_provider', 'gemini', 'Default AI provider for analysis'),
  ('default_ai_model', 'gpt-5', 'Default AI model'),
  ('default_temperature', '0.7', 'Default temperature for AI generation'),
  ('max_tokens', '2000', 'Maximum tokens for AI responses');

-- Insert initial documents metadata
INSERT OR IGNORE INTO documents (title, description, category, file_type) VALUES
  ('Báo cáo Phân tích Hiện trạng', 'Phân tích toàn diện về AI Video - 23 job codes', 'Báo cáo', 'TXT'),
  ('Kế hoạch Công việc R&D', 'Lộ trình Q1/2026 cho R&D Specialist', 'Kế hoạch', 'TXT'),
  ('Tài liệu Kỹ thuật Video', 'Danh mục hiệu ứng và quy trình sản xuất', 'Kỹ thuật', 'TXT'),
  ('Tài liệu Vận hành R&D', 'Quy trình giao tiếp và chuyển giao', 'Vận hành', 'TXT'),
  ('Thiết kế Hệ thống Platform', 'Kiến trúc R&D AI Video Intelligence Platform', 'Thiết kế', 'TXT');
