# 🎬 Fotober R&D Intelligence Hub

> **Nền tảng Tri thức & Phân tích Toàn diện cho R&D AI Video**

---

## 📋 Tổng quan dự án

**Fotober R&D Intelligence Hub** là một nền tảng web hiện đại được xây dựng để quản lý, lưu trữ và phân tích toàn bộ tri thức liên quan đến R&D AI Video tại Fotober Media Company.

### ✨ Tính năng chính

#### 📚 Knowledge Base - Kho Tri thức
- **5 Tài liệu chính:**
  1. 📊 Báo cáo Phân tích Hiện trạng (23 job codes)
  2. 📅 Kế hoạch Công việc R&D Q1/2026
  3. ⚙️ Tài liệu Kỹ thuật Video (25+ AI Effects)
  4. 🔄 Tài liệu Vận hành R&D
  5. 🏗️ Thiết kế Hệ thống Platform

#### 🤖 AI Analysis Tools ⚡ LIVE!
- **Multi-AI Integration:**
  - ✅ **Google Gemini** (Mặc định - hoạt động)
  - ✅ **Zhipu GLM** (Sẵn sàng)
  - ✅ **OpenAI GPT-5** (Sẵn sàng)
  - ✅ **Anthropic Claude** (Sẵn sàng)
- **4 Loại Phân tích:**
  - 📋 **Brief Analysis** - Phân tích yêu cầu khách hàng chi tiết
  - 🔍 **Error Analysis** - Root cause analysis & solutions
  - 🎨 **Prompt Generation** - Tạo prompt tối ưu cho AI tools
  - 💬 **General Q&A** - Trả lời câu hỏi về Fotober & R&D
- **Features:**
  - Real-time AI analysis với loading states
  - Structured responses (effects, risks, solutions, suggestions)
  - Token usage tracking
  - Provider switching (chọn AI model khác nhau)
  - Error handling & user feedback

#### 📊 Analytics Dashboard
- Thống kê tổng quan (23 job codes, 25+ effects)
- Biểu đồ phân tích lỗi theo nhóm
- Ma trận rủi ro theo loại effect
- Tracking metrics theo thời gian

#### 📥📤 Document Management
- Upload tài liệu (PDF, DOCX, TXT)
- Download tài liệu gốc
- Embed Canva presentations
- Link external resources

---

## 🎨 Thiết kế & UX

### Màu sắc chủ đạo
```css
Gradient Orange: #FF6B35 → #FFA07A → #FFE5D9
Background: #FFF5F0 → #FFE5D9 → #FFD4C4
```

### Đặc điểm giao diện
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modern gradient với tone cam ấm
- ✅ Card-based layout với hover effects
- ✅ Icons từ FontAwesome 6
- ✅ Typography: Inter font family

---

## 🛠️ Tech Stack

### Backend
- **Hono** ^4.11.7 - Lightweight web framework
- **Cloudflare Pages** - Edge deployment platform
- **TypeScript** - Type safety
- **OpenAI SDK** - AI integration layer
- **Multi-AI Support** - Gemini, GLM, OpenAI, Claude

### Frontend
- **Tailwind CSS** - Utility-first CSS (CDN)
- **Vanilla JavaScript** - No framework overhead
- **FontAwesome 6** - Icon library

### Deployment
- **Vercel** (Primary) - Frontend hosting
- **Cloudflare Pages** (Alternative) - Edge deployment
- **GitHub** - Version control & collaboration

---

## 🚀 Cài đặt & Chạy

### Prerequisites
```bash
- Node.js >= 18
- npm >= 9
```

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/fotober-rd-hub.git
cd fotober-rd-hub

# Install dependencies
npm install

# Development
npm run dev
# Mở: http://localhost:5173

# Build
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Deploy to Cloudflare Pages
```bash
# Build first
npm run build

# Deploy
npm run deploy

# Or manually
npx wrangler pages deploy dist --project-name fotober-rd-hub
```

---

## 🔌 API Documentation

### AI Analysis Endpoints

#### POST `/api/ai/analyze`
Main AI analysis endpoint với multi-model support.

**Request:**
```json
{
  "type": "brief" | "error" | "prompt" | "general",
  "input": "Nội dung cần phân tích",
  "config": {
    "provider": "gemini" | "glm" | "openai" | "claude",
    "model": "gpt-5",
    "temperature": 0.7,
    "maxTokens": 2000
  }
}
```

**Response:**
```json
{
  "success": true,
  "provider": "gemini",
  "model": "gpt-5",
  "result": {
    "analysis": "Phân tích chi tiết...",
    "effects": [...],
    "suggestions": [...],
    "risks": [...]
  },
  "tokens": {
    "prompt": 150,
    "completion": 350,
    "total": 500
  },
  "timestamp": "2026-01-30T07:00:00.000Z"
}
```

#### Specialized Endpoints
- `POST /api/ai/brief` - Brief analysis only
- `POST /api/ai/error` - Error analysis only
- `POST /api/ai/prompt` - Prompt generation only
- `GET /api/ai/models` - Get available models

#### Other Endpoints
- `GET /api/documents` - List all documents
- `GET /api/health` - Health check

---

## 📂 Cấu trúc dự án

```
fotober-rd-hub/
├── public/
│   └── static/           # Static assets
│       ├── app.js        # Analytics frontend logic
│       ├── ai-tools.js   # AI Tools frontend logic
│       └── style.css     # Custom styles
├── src/
│   ├── index.tsx         # Main Hono app with AI routes
│   ├── services/
│   │   └── ai.ts         # AI Service Layer (Multi-Model)
│   └── renderer.tsx      # JSX renderer
├── dist/                 # Build output
├── .dev.vars             # Local environment variables (gitignored)
├── ecosystem.config.cjs  # PM2 configuration
├── package.json          # Dependencies & scripts
├── wrangler.jsonc        # Cloudflare Pages config
├── vite.config.ts        # Vite build config
├── tsconfig.json         # TypeScript config
└── README.md             # This file
```

---

## 📊 Dữ liệu Tổng hợp

### Thống kê chính (từ 5 tài liệu)

| Metric | Giá trị |
|--------|---------|
| **Tổng tài liệu** | 5 documents |
| **Job codes phân tích** | 23 jobs |
| **Loại AI Effects** | 25+ types |
| **AI Models hỗ trợ** | 4 models |
| **Thời gian xây dựng** | Q1/2026 |

### Phân bố vấn đề (23 job codes)

| Nhóm lỗi | Tỷ lệ | Số jobs |
|----------|-------|---------|
| Hiểu sai yêu cầu | 35% | 8/23 |
| Chất lượng AI output | 26% | 6/23 |
| Trễ deadline | 22% | 5/23 |
| Logic/Physics sai | 17% | 4/23 |

### Tỷ lệ lỗi theo loại Effect

| Loại Effect | Tỷ lệ lỗi | Risk Level |
|-------------|-----------|------------|
| Object Animation | 100% | ⚠️ Rất cao |
| Creative/Fantasy | 100% | ⚠️ Rất cao |
| Agent Composite | 100% | ⚠️ Rất cao |
| Lifestyle/Người | 71% | ⚠️ Cao |
| Season/Weather | 67% | ⚠️ Cao |
| Day-to-Night | 33% | ✅ Trung bình |
| Furniture Staging | 33% | ✅ Trung bình |

---

## 🔮 Roadmap phát triển

### ✅ Phase 1: MVP (Hoàn thành ✨)
- [x] Khởi tạo project với Hono + Cloudflare
- [x] Thiết kế UI/UX với gradient cam
- [x] Trang chủ với dashboard tổng quan
- [x] Navigation system
- [x] Document viewer (basic)
- [x] Analytics Dashboard với Chart.js
- [x] **🎉 AI Integration LIVE - Multi-Model support**

### 🚧 Phase 2: Core Features (Đang phát triển)
- [x] **AI API integration** (Gemini, GLM, OpenAI, Claude) ✅
- [x] **AI Analysis Tools** với 4 loại phân tích ✅
- [x] **Environment variables** (.dev.vars) ✅
- [x] **Token tracking** & usage metrics ✅
- [ ] D1 Database integration
- [ ] Real document viewer với Markdown rendering
- [ ] Upload/Download functionality

### 🔜 Phase 3: Advanced Features
- [ ] Prompt Library management
- [ ] Error Pattern tracking
- [ ] Brief Analysis automation
- [ ] Trends monitoring
- [ ] Real-time collaboration

---

## 🤝 Đóng góp

Dự án này được xây dựng cho Fotober Media Company. Mọi đóng góp cải tiến đều được chào đón!

### Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📝 License

© 2026 Fotober Media Company Limited. All rights reserved.

---

## 📞 Contact & Support

- **Company:** Fotober Media Company Limited
- **Location:** Hà Nội, Việt Nam
- **Email:** info@fotober.com
- **WhatsApp:** +84 942 110 297
- **Website:** https://fotober.com

---

## 🙏 Acknowledgments

- **Hono Framework** - Lightweight web framework
- **Cloudflare** - Edge platform
- **Tailwind CSS** - Utility-first CSS
- **FontAwesome** - Icon library
- **Vercel** - Deployment platform

---

**Built with ❤️ for R&D Excellence**
