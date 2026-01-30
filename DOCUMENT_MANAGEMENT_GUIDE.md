# 📚 Document Management System với Google Drive & Canva Embed

## 🎯 Tổng Quan

Hệ thống quản lý tài liệu hoàn chỉnh với khả năng **embed từ Google Drive, Canva, Dropbox** và tích hợp **Add Document Form** để thêm tài liệu mới.

---

## ✨ Features Đã Hoàn Thành

### 1. **Document Manager UI** (`/documents`)
- ✅ **Add Document Form** (expandable)
  - Input fields: Title, Category, Embed URL, Summary
  - Auto-detect embed type từ URL
  - Form validation & error handling
  - Submit with loading state
  
- ✅ **Document Library Grid**
  - 8 sample documents với real embed URLs
  - Category filter (analysis, plan, technical, operation, design, demo, tool)
  - Statistics dashboard (total, views, downloads, size)
  - Embed type badges (Google Drive, Canva, Dropbox)
  - Click to view document

### 2. **Document Viewer Page** (`/doc/:id`)
- ✅ **Embed Viewer Mode**
  - iframe embed for Google Drive/Canva/Dropbox
  - Full-screen iframe (700px min height)
  - Auto-load embed URL
  - Fallback message if no embed URL

- ✅ **External View Mode**
  - Toggle button to switch modes
  - Open document in new tab
  - Notice screen with "Back to Embed" button

- ✅ **Document Header**
  - Title, category, summary
  - View count, download count, file size
  - Embed type icon (Google Drive/Canva/Dropbox)
  - Back to library button

### 3. **API Endpoints**
```typescript
GET    /api/documents              // Lấy danh sách tài liệu
GET    /api/documents/:id          // Lấy tài liệu theo ID (+ increment view)
POST   /api/documents              // Thêm tài liệu mới
DELETE /api/documents/:id          // Xóa tài liệu
POST   /api/documents/:id/download // Increment download count
```

### 4. **Storage Service** (`src/services/storage.ts`)
```typescript
// New methods
addDocument(doc): Promise<DocumentRecord>      // Thêm tài liệu mới
deleteDocument(id): Promise<boolean>           // Xóa tài liệu
getDocumentById(id): Promise<DocumentRecord>   // Lấy tài liệu theo ID
incrementDocumentView(id): Promise<void>       // Tăng view count
incrementDocumentDownload(id): Promise<void>   // Tăng download count

// Document interface
interface DocumentRecord {
  id: string;
  title: string;
  category: string;
  file_path: string;
  file_type: string;
  file_size: number;
  summary?: string;
  embed_url?: string;                          // NEW: Google Drive/Canva URL
  embed_type?: 'gdrive' | 'canva' | 'dropbox' | 'local'; // NEW
  view_count: number;
  download_count: number;
  created_at: string;
  updated_at: string;
}
```

---

## 🚀 Cách Sử Dụng

### **A. Xem Tài Liệu Có Sẵn**

1. **Truy cập:** `http://localhost:3000/documents`
2. **Xem danh sách:** 8 tài liệu mẫu với embed URLs
3. **Click vào card:** Mở document viewer
4. **Chuyển đổi mode:**
   - "Xem bên ngoài" → mở tab mới
   - "Xem Embed" → iframe viewer

### **B. Thêm Tài Liệu Mới**

1. **Click "Thêm Tài liệu"** button (màu xanh lá)
2. **Điền form:**
   - **Tiêu đề:** VD: "Báo cáo Q1/2026"
   - **Danh mục:** Chọn từ dropdown
   - **Embed URL:** Paste Google Drive/Canva link
   - **Mô tả:** (Optional) Tóm tắt nội dung
3. **Click "Lưu Tài liệu"**
4. **Xem kết quả:** Document mới hiển thị ở đầu danh sách

### **C. Auto-Detect Embed Type**

System tự động nhận diện embed type từ URL:
```javascript
// Google Drive
https://drive.google.com/file/d/FILE_ID/preview  → gdrive
https://docs.google.com/document/d/DOC_ID/preview → gdrive

// Canva
https://www.canva.com/design/DESIGN_ID/view → canva

// Dropbox
https://www.dropbox.com/s/FILE_ID → dropbox

// Other
Any other URL → local
```

---

## 📦 Sample Documents (8 tài liệu)

1. **Báo cáo Phân tích Hiện trạng R&D AI Video**
   - Category: `analysis`
   - Embed: Google Docs
   - Summary: Phân tích 23 job codes, 25+ AI Effects

2. **Kế hoạch Công việc R&D AI Video Q1/2026**
   - Category: `plan`
   - Embed: Google Sheets
   - Summary: Roadmap 16 tuần, 5 giai đoạn

3. **Tài liệu Kỹ thuật Video - Tools & Pricing**
   - Category: `technical`
   - Embed: Canva
   - Summary: Tech stack, pricing comparison

4. **Tài liệu Vận hành R&D AI VIDEO**
   - Category: `operation`
   - Embed: Google Slides
   - Summary: Quy trình vận hành, SLA, QC

5. **Thiết kế Hệ thống Platform**
   - Category: `design`
   - Embed: Canva
   - Summary: System architecture, DB schema

6. **Video Demo - AI Effects Showcase**
   - Category: `demo`
   - Embed: Google Drive Video
   - Summary: Demo các AI Effects

7. **Pricing Calculator - Interactive Tool**
   - Category: `tool`
   - Embed: Canva
   - Summary: Interactive pricing calculator

8. **Competitor Analysis Matrix**
   - Category: `analysis`
   - Embed: Google Sheets
   - Summary: So sánh Fotober vs competitors

---

## 🔧 Technical Details

### **Frontend Technologies**
- **Tailwind CSS** - Styling framework
- **FontAwesome** - Icons
- **Fetch API** - AJAX requests
- **iframe** - Embed rendering

### **Backend (Hono)**
- **Route: `/documents`** - Document library page
- **Route: `/doc/:id`** - Document viewer page
- **API Routes:** 5 endpoints (GET, POST, DELETE)
- **Storage:** In-memory storage (sandbox mode)

### **Embed Support**
- **Google Drive:** Docs, Sheets, Slides, PDFs
  - Format: `https://drive.google.com/file/d/FILE_ID/preview`
- **Canva:** Presentations, Designs
  - Format: `https://www.canva.com/design/DESIGN_ID/view`
- **Dropbox:** Files, Folders
  - Format: `https://www.dropbox.com/s/FILE_ID`

---

## 🎨 UI Screenshots (Mô tả)

### **Document Library** (`/documents`)
```
┌─────────────────────────────────────────────────────────┐
│  📁 Thư viện Tài liệu        [+ Thêm Tài liệu] [Làm mới]│
│  Quản lý và truy cập tài liệu R&D từ Google Drive...    │
│                                                          │
│  [Add Document Form - Expandable]                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 📄 Thêm Tài liệu Mới                     [X]      │  │
│  │ Tiêu đề: [________________]  Danh mục: [____]    │  │
│  │ Embed URL: [_____________________________________]│  │
│  │ Mô tả: [_________________________________________]│  │
│  │ [Lưu Tài liệu] [Hủy]                              │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  📊 Stats: Total: 8 | Views: 0 | Downloads: 0 | 3.2 MB │
│                                                          │
│  Filter: [All] [Analysis] [Plan] [Technical] ...        │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ 📊 Doc 1 │  │ 📋 Doc 2 │  │ ⚙️ Doc 3 │              │
│  │ Title    │  │ Title    │  │ Title    │              │
│  │ Summary  │  │ Summary  │  │ Summary  │              │
│  │ [gdrive] │  │ [canva]  │  │ [local]  │              │
│  │ 👁️ 0  💾 0│  │ 👁️ 0  💾 0│  │ 👁️ 0  💾 0│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### **Document Viewer** (`/doc/:id`)
```
┌─────────────────────────────────────────────────────────┐
│  ← Quay lại Thư viện    [Xem bên ngoài] [🏠 Trang chủ]  │
│                                                          │
│  📄 Báo cáo Phân tích Hiện trạng R&D AI Video           │
│  🏷️ analysis                                            │
│  Phân tích toàn diện về AI Video...                     │
│  👁️ 1 lượt xem | 💾 0 lượt tải | 💿 125 KB              │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 👁️ Xem Tài liệu               [Mở Tab Mới]        │  │
│  │                                                    │  │
│  │ ┌──────────────────────────────────────────────┐ │  │
│  │ │                                              │ │  │
│  │ │          [IFRAME EMBED]                      │ │  │
│  │ │     Google Drive / Canva Content             │ │  │
│  │ │                                              │ │  │
│  │ │                                              │ │  │
│  │ │                                              │ │  │
│  │ └──────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 Testing Checklist

- ✅ **Document List** loads with 8 documents
- ✅ **Add Form** expands/collapses correctly
- ✅ **Form Submission** creates new document
- ✅ **Auto-detect** gdrive/canva/dropbox from URL
- ✅ **Category Filter** works correctly
- ✅ **Statistics** update in real-time
- ✅ **Document Viewer** renders iframe embed
- ✅ **External Mode** opens new tab
- ✅ **View Count** increments on page load
- ✅ **API Endpoints** return correct JSON

---

## 🔮 Next Steps (Optional)

1. **Upload Support**: Tích hợp Cloudflare R2 để upload files
2. **Search**: Thêm search bar để tìm tài liệu
3. **Tags**: Thêm tags system để phân loại chi tiết hơn
4. **Permissions**: Thêm user roles (viewer, editor, admin)
5. **Version Control**: Track document revisions
6. **Comments**: Cho phép comment trên tài liệu
7. **Analytics**: Track detailed analytics (time spent, etc.)

---

## 📦 Deployment

**Sandbox URL:** https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/documents

**GitHub:** https://github.com/Gen099/FotoberRnD

**Latest Commit:**
```
5816798 feat: Document Management with Google Drive & Canva Embed
32c7d8c docs: Add simple guide summary for quick access
```

---

## 🎉 Summary

✅ **Hoàn thành 100%** Document Management System với:
- ✅ Google Drive embed support
- ✅ Canva embed support
- ✅ Add Document Form với auto-detect
- ✅ Document Viewer với dual mode
- ✅ 5 API endpoints hoạt động
- ✅ 8 sample documents với real URLs
- ✅ Full responsive UI
- ✅ Error handling & validation

**Status:** ✅ Production Ready (Sandbox Mode)

**Created:** 2026-01-30  
**Version:** 1.0.0
