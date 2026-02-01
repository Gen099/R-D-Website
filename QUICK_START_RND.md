# R&D Specialist Website - Quick Start

## 🚀 Chạy website

### Bước 1: Mở PowerShell as Administrator

```powershell
# Set execution policy
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Navigate to project
cd f:\OneDrive\Fotober\FotoberRnD

# Install dependencies (chỉ lần đầu)
npm install

# Run dev server
npm run dev
```

### Bước 2: Mở browser

Truy cập: `http://localhost:3000`

---

## ✅ Đã hoàn thành

### Pages
- ✅ Dashboard (Homepage)
- ✅ Phân tích Feedback
- ✅ Danh mục Hiệu ứng

### Data Files
- ✅ `data/feedback.json` - 23 jobs, 4 error groups
- ✅ `data/effects.json` - Motion graphics, special effects, transitions
- ✅ `data/prompts.json` - 5 prompt templates
- ✅ `data/competition.json` - Competitors, SWOT analysis

### Features
- ✅ Sidebar navigation với 9 modules
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Design system với CSS variables
- ✅ Data visualization (tables, cards, progress bars)

---

## ⏳ Cần hoàn thành

### 5 Pages còn lại:
1. Bài toán AI Agent
2. Phân tích Cạnh tranh
3. Mô tả Công việc
4. Quy trình Vận hành
5. AI Platform Design
6. Tài nguyên

### Features:
- Content editing
- Search/Filter
- Export/Import
- Charts (Recharts)

---

## 📁 Cấu trúc quan trọng

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Dashboard
├── globals.css         # Design system
├── feedback/           # ✅ Feedback module
├── effects/            # ✅ Effects module
└── [other-modules]/    # ⏳ Pending

data/
├── feedback.json       # ✅ Complete
├── effects.json        # ✅ Complete
├── prompts.json        # ✅ Complete
└── competition.json    # ✅ Complete

components/
└── layout/
    └── Navigation.tsx  # ✅ Sidebar nav
```

---

## 🎨 Design System

### Colors
- Primary: Blue (`hsl(220, 90%, 56%)`)
- Error A: Red (`#EF4444`)
- Error B: Orange (`#F59E0B`)
- Error C: Blue (`#3B82F6`)
- Error D: Purple (`#8B5CF6`)

### Typography
- Font: Inter
- Sizes: xs → 4xl
- Weights: 400, 500, 600, 700

---

*Xem `walkthrough.md` để biết chi tiết đầy đủ*
