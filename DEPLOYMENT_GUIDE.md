# 🚀 Hướng Dẫn Deploy Fotober R&D Intelligence Hub

## 📋 Chuẩn Bị

### ✅ Những Gì Đã Có
- ✅ Code đã push lên GitHub: https://github.com/Gen099/FotoberRnD
- ✅ Branch: `main`
- ✅ Database schema ready: `migrations/0001_initial_schema.sql`
- ✅ Environment variables sẵn sàng

### 🔑 API Keys Cần Thiết
```
OPENAI_API_KEY=gsk-eyJjb2dlbl9pZCI6IjQzMGZjZDM5LTgxNTEtNDY1NC04M2FhLTI5OTgxZGVhMTAwNCIsImtleV9pZCI6IjY1MjJjMTI2LWRiYTYtNDk1YS1iYTdkLTAyNTc5MTI3YjdhNCIsImN0aW1lIjoxNzY5NzU1Nzg4LCJjbGF1ZGVfYmlnX21vZGVsIjpudWxsLCJjbGF1ZGVfbWlkZGxlX21vZGVsIjpudWxsLCJjbGF1ZGVfc21hbGxfbW9kZWwiOm51bGx9fJusH9qYRzpBSHJPNYEpaknoWDjq4R3jNbESXJ6pkdA6

OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1
```

---

## 🎯 BƯỚC 1: Deploy Cloudflare Pages (5-10 phút)

### 1.1. Đăng nhập Cloudflare Dashboard
1. Truy cập: **https://dash.cloudflare.com/**
2. Đăng nhập với tài khoản Cloudflare của anh

### 1.2. Tạo Pages Project
1. Sidebar bên trái → Click **"Workers & Pages"**
2. Click nút **"Create application"**
3. Chọn tab **"Pages"**
4. Click **"Connect to Git"**

### 1.3. Connect GitHub Repository
1. Click **"Connect GitHub"** (nếu chưa connect)
2. Authorize Cloudflare truy cập GitHub
3. **Select a repository**:
   - Tìm và chọn: **`Gen099/FotoberRnD`**
   - Click **"Begin setup"**

### 1.4. Configure Build Settings
Điền các thông tin sau:

**Project name**:
```
fotober-rd-hub
```

**Production branch**:
```
main
```

**Build command**:
```bash
npm run build
```

**Build output directory**:
```
dist
```

**Root directory** (leave empty):
```
(để trống)
```

### 1.5. Environment Variables
Click **"Add environment variable"** và thêm 2 biến:

**Variable 1**:
- Name: `OPENAI_API_KEY`
- Value: `gsk-eyJjb2dlbl9pZCI6IjQzMGZjZDM5LTgxNTEtNDY1NC04M2FhLTI5OTgxZGVhMTAwNCIsImtleV9pZCI6IjY1MjJjMTI2LWRiYTYtNDk1YS1iYTdkLTAyNTc5MTI3YjdhNCIsImN0aW1lIjoxNzY5NzU1Nzg4LCJjbGF1ZGVfYmlnX21vZGVsIjpudWxsLCJjbGF1ZGVfbWlkZGxlX21vZGVsIjpudWxsLCJjbGF1ZGVfc21hbGxfbW9kZWwiOm51bGx9fJusH9qYRzpBSHJPNYEpaknoWDjq4R3jNbESXJ6pkdA6`

**Variable 2**:
- Name: `OPENAI_BASE_URL`
- Value: `https://www.genspark.ai/api/llm_proxy/v1`

### 1.6. Deploy
1. Click **"Save and Deploy"**
2. Chờ 3-5 phút Cloudflare build và deploy
3. **Theo dõi log** để đảm bảo build thành công

### ✅ Kết Quả Bước 1
Sau khi deploy xong, anh sẽ có:
- **Production URL**: `https://fotober-rd-hub.pages.dev`
- **Hoặc custom URL**: `https://[random-id].pages.dev`

**⚠️ Lưu ý**: Lúc này app đã live nhưng chưa có database, nên chức năng logging sẽ chưa hoạt động.

---

## 💾 BƯỚC 2: Tạo D1 Database (5 phút)

### 2.1. Truy cập D1 Dashboard
1. Trong Cloudflare Dashboard
2. Sidebar → Click **"Workers & Pages"**
3. Top tabs → Click **"D1 SQL Database"**

### 2.2. Create Database
1. Click **"Create database"**
2. **Database name**:
   ```
   fotober-rd-hub-db
   ```
3. **Location**: Chọn **"Automatic"** (Cloudflare tự chọn)
4. Click **"Create"**

### 2.3. Copy Database ID
1. Sau khi tạo xong, anh sẽ thấy **Database ID**
2. Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
3. **Copy ID này** - sẽ dùng ở bước tiếp theo

**Ví dụ**:
```
Database ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### ✅ Kết Quả Bước 2
- ✅ Database `fotober-rd-hub-db` đã được tạo
- ✅ Database ID đã copy

---

## 📝 BƯỚC 3: Chạy Database Migrations (5 phút)

### 3.1. Mở Console Tab
1. Trong D1 Dashboard
2. Click vào database `fotober-rd-hub-db` vừa tạo
3. Click tab **"Console"**

### 3.2. Copy Migration SQL
Anh mở file `migrations/0001_initial_schema.sql` trong repo hoặc copy từ đây:

**Nội dung SQL** (đã có sẵn trong repo):
```sql
-- Migration: 0001_initial_schema.sql
-- Description: Initial database schema for Fotober R&D Intelligence Hub
-- Created: 2026-01-30

-- ============================================
-- TABLE: ai_analysis_logs
-- Lưu lịch sử phân tích AI
-- ============================================
CREATE TABLE IF NOT EXISTS ai_analysis_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  analysis_type TEXT NOT NULL CHECK(analysis_type IN ('brief', 'error', 'prompt', 'general')),
  provider TEXT NOT NULL CHECK(provider IN ('gemini', 'glm', 'openai', 'claude')),
  model TEXT NOT NULL,
  input_text TEXT NOT NULL,
  output_text TEXT,
  effects_detected TEXT, -- JSON array
  errors_detected TEXT, -- JSON array
  suggestions TEXT, -- JSON array
  token_usage INTEGER DEFAULT 0,
  processing_time_ms INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK(status IN ('success', 'error', 'pending')) DEFAULT 'pending',
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT DEFAULT 'system'
);

-- ============================================
-- TABLE: documents
-- Quản lý tài liệu R&D
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('analysis', 'plan', 'technical', 'operation', 'design', 'other')),
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK(file_type IN ('pdf', 'docx', 'txt', 'xlsx', 'md')),
  file_size INTEGER DEFAULT 0, -- bytes
  content_text TEXT, -- Full text for search
  keywords TEXT, -- JSON array
  summary TEXT,
  author TEXT,
  version TEXT DEFAULT '1.0',
  status TEXT NOT NULL CHECK(status IN ('draft', 'review', 'approved', 'archived')) DEFAULT 'draft',
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: user_preferences
-- Lưu tùy chọn người dùng
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  preferred_ai_provider TEXT CHECK(preferred_ai_provider IN ('gemini', 'glm', 'openai', 'claude')) DEFAULT 'gemini',
  preferred_model TEXT,
  default_temperature REAL DEFAULT 0.7 CHECK(default_temperature >= 0 AND default_temperature <= 2),
  default_max_tokens INTEGER DEFAULT 2000,
  ui_theme TEXT CHECK(ui_theme IN ('light', 'dark', 'auto')) DEFAULT 'light',
  language TEXT DEFAULT 'vi',
  notifications_enabled INTEGER DEFAULT 1, -- Boolean: 0 or 1
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: prompt_library
-- Thư viện prompt templates
-- ============================================
CREATE TABLE IF NOT EXISTS prompt_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('brief', 'error', 'prompt', 'general', 'custom')),
  template_text TEXT NOT NULL,
  variables TEXT, -- JSON array of variable names
  description TEXT,
  usage_count INTEGER DEFAULT 0,
  success_rate REAL DEFAULT 0.0, -- 0.0 to 1.0
  avg_tokens INTEGER DEFAULT 0,
  created_by TEXT DEFAULT 'system',
  is_active INTEGER DEFAULT 1, -- Boolean
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: error_patterns
-- Theo dõi pattern lỗi AI
-- ============================================
CREATE TABLE IF NOT EXISTS error_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  error_type TEXT NOT NULL,
  effect_type TEXT, -- Day-to-Night, Lifestyle, etc.
  error_description TEXT NOT NULL,
  frequency INTEGER DEFAULT 1,
  severity TEXT CHECK(severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  solution TEXT,
  status TEXT CHECK(status IN ('open', 'investigating', 'resolved', 'wontfix')) DEFAULT 'open',
  first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- ai_analysis_logs indexes
CREATE INDEX IF NOT EXISTS idx_analysis_created_at ON ai_analysis_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_type ON ai_analysis_logs(analysis_type);
CREATE INDEX IF NOT EXISTS idx_analysis_provider ON ai_analysis_logs(provider);
CREATE INDEX IF NOT EXISTS idx_analysis_status ON ai_analysis_logs(status);

-- documents indexes
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_view_count ON documents(view_count DESC);

-- user_preferences indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- prompt_library indexes
CREATE INDEX IF NOT EXISTS idx_prompt_category ON prompt_library(category);
CREATE INDEX IF NOT EXISTS idx_prompt_usage ON prompt_library(usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_prompt_active ON prompt_library(is_active);

-- error_patterns indexes
CREATE INDEX IF NOT EXISTS idx_error_type ON error_patterns(error_type);
CREATE INDEX IF NOT EXISTS idx_error_severity ON error_patterns(severity);
CREATE INDEX IF NOT EXISTS idx_error_status ON error_patterns(status);
CREATE INDEX IF NOT EXISTS idx_error_last_seen ON error_patterns(last_seen DESC);

-- ============================================
-- TRIGGERS for Auto-update timestamps
-- ============================================

-- Update documents.updated_at
CREATE TRIGGER IF NOT EXISTS update_documents_timestamp 
AFTER UPDATE ON documents
BEGIN
  UPDATE documents SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Update user_preferences.updated_at
CREATE TRIGGER IF NOT EXISTS update_user_preferences_timestamp 
AFTER UPDATE ON user_preferences
BEGIN
  UPDATE user_preferences SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Update prompt_library.updated_at
CREATE TRIGGER IF NOT EXISTS update_prompt_library_timestamp 
AFTER UPDATE ON prompt_library
BEGIN
  UPDATE prompt_library SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- ============================================
-- SEED DATA: Initial Documents
-- ============================================
INSERT OR IGNORE INTO documents (id, title, category, file_path, file_type, summary, author, status) VALUES
(1, 'Báo cáo Phân tích Hiện trạng', 'analysis', '/data/analysis-report.md', 'md', 
 'Phân tích 23 job codes, 25+ AI Effects, error patterns từ feedback thực tế', 'Fotober R&D Team', 'approved'),

(2, 'Kế hoạch Công việc R&D AI Video Q1/2026', 'plan', '/data/work-plan.md', 'md', 
 'Roadmap 16 tuần, 5 giai đoạn từ Platform setup đến Production deployment', 'Fotober R&D Team', 'approved'),

(3, 'Tài liệu Kỹ thuật Video', 'technical', '/data/technical-doc.md', 'md', 
 'Tech stack: Kling AI, Veo 2/3.1, Runway Gen-3, Pika Labs, Luma, pricing models', 'Fotober R&D Team', 'approved'),

(4, 'Tài liệu Vận hành R&D AI VIDEO', 'operation', '/data/operation-doc.md', 'md', 
 'Quy trình vận hành, SLA, turnaround time 12-24h, quality control', 'Fotober R&D Team', 'approved'),

(5, 'Thiết kế Hệ thống Platform', 'design', '/data/platform-design.md', 'md', 
 'System architecture, database schema, AI integration, deployment strategy', 'Fotober R&D Team', 'approved');

-- ============================================
-- SEED DATA: Initial Prompt Library
-- ============================================
INSERT OR IGNORE INTO prompt_library (name, category, template_text, variables, description, created_by, usage_count) VALUES
('Brief Analysis', 'brief', 
 'Bạn là chuyên gia Video Production tại Fotober. Phân tích brief sau:\n\n{input}\n\nXuất kết quả JSON với structure:\n{\n  "analysis": "phân tích chi tiết",\n  "effects": [...],\n  "suggestions": [...]\n}',
 '["input"]',
 'Template phân tích brief khách hàng với AI Effects gợi ý',
 'system', 0),

('Error Analysis', 'error', 
 'Bạn là QC Lead tại Fotober. Phân tích lỗi từ feedback:\n\n{input}\n\nXuất JSON:\n{\n  "analysis": "...",\n  "errors": [{type, severity, solution}],\n  "suggestions": [...]\n}',
 '["input"]',
 'Template phân tích lỗi video với severity và solutions',
 'system', 0),

('Prompt Generation', 'prompt', 
 'Bạn là AI Prompt Engineer. Tạo prompt tối ưu cho:\n\n{input}\n\nXuất JSON với prompts chi tiết cho từng tool (Kling, Veo, Runway).',
 '["input"]',
 'Template tạo prompt cho AI video tools',
 'system', 0);

-- ============================================
-- SEED DATA: Sample Error Patterns
-- ============================================
INSERT OR IGNORE INTO error_patterns (error_type, effect_type, error_description, frequency, severity, solution) VALUES
('Misunderstanding Requirements', 'General', 'Hiểu sai yêu cầu khách hàng', 8, 'high', 
 'Brief template chuẩn hóa; checklist trước khi bắt đầu'),

('AI Output Quality', 'Object Animation', 'Chất lượng AI output kém, artifacts', 6, 'high', 
 'Multi-pass refinement; manual touch-up; reference images'),

('Deadline Delays', 'Creative/Fantasy', 'Trễ deadline do complexity cao', 5, 'medium', 
 'Time estimation model; buffer time; phân loại độ khó trước'),

('Physics/Logic Errors', 'Season/Weather', 'Lỗi vật lý/logic trong video', 4, 'high', 
 'Physics validation; QC checklist; real-world reference');

-- ============================================
-- Migration Complete
-- ============================================
-- Version: 0001
-- Tables created: 5
-- Indexes created: 16
-- Triggers created: 3
-- Seed records: 5 documents + 3 prompts + 4 error patterns
```

### 3.3. Execute SQL
1. **Paste toàn bộ SQL** vào Console
2. Click **"Execute"** hoặc nhấn `Ctrl + Enter`
3. Chờ ~2-3 giây để execute
4. Kiểm tra output: phải thấy **"Query successful"**

### 3.4. Verify Tables
Chạy lệnh kiểm tra trong Console:
```sql
-- Kiểm tra tables
SELECT name FROM sqlite_master WHERE type='table';

-- Kiểm tra documents đã seed
SELECT * FROM documents;

-- Kiểm tra prompt library
SELECT * FROM prompt_library;
```

### ✅ Kết Quả Bước 3
- ✅ 5 tables created
- ✅ 16 indexes created
- ✅ 3 triggers created
- ✅ 5 documents seeded
- ✅ 3 prompt templates seeded
- ✅ 4 error patterns seeded

---

## 🔗 BƯỚC 4: Bind D1 to Pages (3 phút)

### 4.1. Vào Pages Settings
1. Cloudflare Dashboard
2. **Workers & Pages**
3. Click vào project **`fotober-rd-hub`**
4. Click tab **"Settings"**

### 4.2. Add D1 Binding
1. Scroll xuống section **"Functions"**
2. Tìm phần **"D1 database bindings"**
3. Click **"Add binding"**

### 4.3. Configure Binding
**Variable name**:
```
DB
```

**D1 database**:
- Chọn: **`fotober-rd-hub-db`** (database vừa tạo)

### 4.4. Save and Redeploy
1. Click **"Save"**
2. Click **"Deployments"** tab
3. Click **"Retry deployment"** hoặc **"Create new deployment"**
4. Chờ 2-3 phút rebuild

### ✅ Kết Quả Bước 4
- ✅ D1 database đã được bind với Pages
- ✅ App có thể access database qua biến `DB`

---

## ✅ BƯỚC 5: Verify Production (2 phút)

### 5.1. Test Homepage
Truy cập:
```
https://fotober-rd-hub.pages.dev
```

**Kỳ vọng**:
- ✅ Homepage hiển thị đẹp
- ✅ Màu cam gradient cải tiến
- ✅ Stats: 5 tài liệu, 23 job codes, 25+ Effects

### 5.2. Test AI Tools
Truy cập:
```
https://fotober-rd-hub.pages.dev/ai-tools
```

**Test Case**:
1. Chọn **Gemini (Google AI)**
2. Chọn **Brief Analysis**
3. Nhập:
   ```
   Cần làm video cho căn biệt thự 5 giây, thêm hiệu ứng Day-to-Night, 
   có voiceover giọng nữ tiếng Việt, xuất 4K vertical.
   ```
4. Click **"Phân tích với AI"**

**Kỳ vọng**:
- ✅ Loading animation
- ✅ Kết quả hiển thị sau 3-5 giây
- ✅ Có analysis, effects, suggestions
- ✅ Effect cards hiển thị đẹp

### 5.3. Test Analytics
Truy cập:
```
https://fotober-rd-hub.pages.dev/analytics
```

**Kỳ vọng**:
- ✅ 4 biểu đồ Chart.js render
- ✅ Dữ liệu hiển thị chính xác
- ✅ Responsive trên mobile

### 5.4. Test API Endpoints
```bash
# Health check
curl https://fotober-rd-hub.pages.dev/api/health

# Documents
curl https://fotober-rd-hub.pages.dev/api/documents

# AI Analysis
curl -X POST https://fotober-rd-hub.pages.dev/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "type": "general",
    "input": "Fotober là gì?",
    "config": {"provider": "gemini"}
  }'
```

### ✅ Kết Quả Bước 5
- ✅ All pages load correctly
- ✅ AI Tools working
- ✅ Analytics charts rendering
- ✅ API endpoints responding

---

## 🎉 HOÀN THÀNH!

### 🌟 Những Gì Anh Có Bây Giờ

#### **Production URLs** 🌐
- **Homepage**: https://fotober-rd-hub.pages.dev
- **AI Tools**: https://fotober-rd-hub.pages.dev/ai-tools
- **Analytics**: https://fotober-rd-hub.pages.dev/analytics
- **Documents**: https://fotober-rd-hub.pages.dev/document/analysis-report

#### **GitHub Repository** 📦
- **URL**: https://github.com/Gen099/FotoberRnD
- **Branch**: main
- **Commits**: 10+

#### **Database** 💾
- **Name**: fotober-rd-hub-db
- **Tables**: 5 (ai_analysis_logs, documents, user_preferences, prompt_library, error_patterns)
- **Records**: 12 seed records

#### **Features** ⚡
- ✅ Multi-AI Integration (Gemini, GLM, OpenAI, Claude)
- ✅ 4 Analysis Types (Brief, Error, Prompt, General)
- ✅ Analytics Dashboard with Charts
- ✅ Document Management
- ✅ Database Logging
- ✅ Responsive UI

---

## 🛠️ Troubleshooting

### ❌ Build Failed
**Triệu chứng**: Deployment failed
**Giải pháp**:
1. Check build log trong Cloudflare
2. Verify `package.json` scripts
3. Ensure `dist/` directory structure

### ❌ AI không hoạt động
**Triệu chứng**: AI analysis trả về error
**Giải pháp**:
1. Check environment variables:
   - `OPENAI_API_KEY` đã set đúng?
   - `OPENAI_BASE_URL` đúng format?
2. Redeploy để apply env vars

### ❌ Database lỗi
**Triệu chứng**: "Database not found"
**Giải pháp**:
1. Verify D1 binding:
   - Variable name: `DB`
   - Database selected: `fotober-rd-hub-db`
2. Redeploy sau khi bind

### ❌ UI bị vỡ
**Triệu chứng**: Màu sắc, font không đúng
**Giải pháp**:
1. Hard refresh: `Ctrl + Shift + R`
2. Clear cache
3. Check CDN links trong `<head>`

---

## 📊 Metrics & Monitoring

### Performance Targets
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **AI Analysis Response**: < 5s
- **Database Query**: < 100ms

### Usage Tracking
Cloudflare Dashboard → Analytics:
- Page views
- Unique visitors
- AI analysis count
- Error rate

---

## 🚀 Next Steps (Tùy chọn)

### Phase 2A: Database Integration Complete ✅
- [ ] Tích hợp logging vào AI analysis
- [ ] User preferences storage
- [ ] Error pattern tracking

### Phase 2B: Upload/Download
- [ ] Upload PDF, DOCX, XLSX
- [ ] Store in Cloudflare R2
- [ ] Preview & download

### Phase 3: Advanced Features
- [ ] Semantic search
- [ ] Batch analysis
- [ ] Compare AI providers
- [ ] Export reports

### Phase 4: Optimization
- [ ] Caching strategy
- [ ] Rate limiting
- [ ] Cost tracking
- [ ] Usage analytics

---

**Chúc mừng anh đã deploy thành công! 🎊✨🚀**

---

**Lưu ý**: File này được tạo bởi AI Assistant và chứa thông tin chi tiết để deployment.
