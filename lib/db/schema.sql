-- Fotober R&D Intelligence Hub - PostgreSQL Schema
-- For Vercel Postgres

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_path TEXT NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER DEFAULT 0,
  summary TEXT,
  embed_url TEXT,
  embed_type VARCHAR(50),
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analysis logs table
CREATE TABLE IF NOT EXISTS analysis_logs (
  id SERIAL PRIMARY KEY,
  analysis_type VARCHAR(50) NOT NULL,
  provider VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  input_text TEXT NOT NULL,
  output_text TEXT NOT NULL,
  effects_detected JSONB,
  errors_detected JSONB,
  suggestions TEXT[],
  token_usage INTEGER DEFAULT 0,
  processing_time_ms INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) DEFAULT 'system'
);

-- Prompt templates table
CREATE TABLE IF NOT EXISTS prompt_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  template_text TEXT NOT NULL,
  description TEXT,
  usage_count INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Error patterns table
CREATE TABLE IF NOT EXISTS error_patterns (
  id SERIAL PRIMARY KEY,
  error_type VARCHAR(200) NOT NULL,
  effect_type VARCHAR(100),
  error_description TEXT NOT NULL,
  frequency INTEGER DEFAULT 0,
  severity VARCHAR(50) NOT NULL,
  solution TEXT,
  status VARCHAR(50) DEFAULT 'open',
  first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_type ON analysis_logs(analysis_type);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_created_at ON analysis_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_patterns_severity ON error_patterns(severity);
CREATE INDEX IF NOT EXISTS idx_error_patterns_status ON error_patterns(status);
