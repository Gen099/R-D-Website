# 🎨 Sanity Visual Editing - Setup Guide

## ✅ Đã hoàn thành:

1. ✅ Installed `@sanity/visual-editing` và `@sanity/preview-url-secret`
2. ✅ Added `presentationTool` to Sanity config
3. ✅ Created API routes: `/api/draft` và `/api/disable-draft`
4. ✅ Configured preview URLs

---

## 🔑 Bước 1: Tạo Read Token

### 1.1. Truy cập Sanity Manage:
```
https://www.sanity.io/manage
```

### 1.2. Chọn project: **FotoberRnD CMS**

### 1.3. Vào tab **API**

### 1.4. Scroll xuống **Tokens** → Click **Add API token**

### 1.5. Điền thông tin:
- **Token name:** `Preview Read Token`
- **Permissions:** **Viewer** (chỉ cần read, không cần write)

### 1.6. Click **Add token**

### 1.7. Copy token (chỉ hiện 1 lần!)

---

## 📝 Bước 2: Thêm Token vào .env.local

Mở file: `f:\OneDrive\Fotober\FotoberRnD\.env.local`

Thay `your-read-token-here` bằng token vừa copy:

```env
SANITY_API_READ_TOKEN="skAbCdEf1234567890..."
```

Save file.

---

## 🚀 Bước 3: Restart Dev Server

```powershell
# Stop server (Ctrl+C)
npm run dev
```

---

## 🎨 Bước 4: Sử dụng Visual Editing

### 4.1. Vào Sanity Studio:
```
http://localhost:3000/studio
```

### 4.2. Nhìn sidebar, bạn sẽ thấy 3 tabs:
- 📝 **Content** (Structure tool - như cũ)
- 👁️ **Presentation** (Visual Editing - MỚI!)
- 🔍 **Vision** (GROQ query)

### 4.3. Click vào tab **Presentation** (icon mắt)

### 4.4. Bạn sẽ thấy:
```
┌─────────────────────────────────────────────────┐
│  Sanity Studio                                  │
├──────────────────┬──────────────────────────────┤
│                  │                              │
│  Document Editor │  Live Preview                │
│                  │                              │
│  [Edit fields]   │  [Your website preview]      │
│                  │                              │
│  Title: ...      │  ┌────────────────────┐      │
│  Overview: ...   │  │ Feedback Page      │      │
│                  │  │ [Live content]     │      │
│  [Save]          │  └────────────────────┘      │
│  [Publish]       │                              │
│                  │                              │
└──────────────────┴──────────────────────────────┘
```

### 4.5. Workflow:
1. **Chọn document** muốn edit (ví dụ: Feedback)
2. **Edit fields** bên trái
3. **Xem preview real-time** bên phải
4. **Click Save** → Preview cập nhật ngay lập tức
5. **Hài lòng?** → Click **Publish**

---

## 🎯 Features của Visual Editing:

### ✨ Live Preview
- Edit content → Thấy changes ngay lập tức
- Không cần refresh page
- Không cần publish

### 🔄 Draft Mode
- Content chưa publish vẫn preview được
- Chỉ bạn thấy (draft mode)
- Public users vẫn thấy version published

### 📱 Responsive Preview
- Preview trên desktop, tablet, mobile
- Toolbar ở trên có responsive controls

### 🔗 Navigate Between Pages
- Click links trong preview
- Preview page khác
- Edit document tương ứng

---

## 📋 Troubleshooting:

### Preview không hiển thị?

**Check 1:** Token đã thêm vào `.env.local` chưa?
```bash
# Xem file
cat .env.local | grep SANITY_API_READ_TOKEN
```

**Check 2:** Dev server đã restart chưa?
```bash
# Stop (Ctrl+C) và chạy lại
npm run dev
```

**Check 3:** Token có quyền Viewer không?
- Vào Sanity Manage → API → Tokens
- Check permissions

### Preview bị lỗi 401?

Token sai hoặc hết hạn:
1. Tạo token mới
2. Update `.env.local`
3. Restart server

### Preview không update real-time?

Browser cache:
1. Hard refresh: `Ctrl+Shift+R`
2. Clear cache
3. Restart browser

---

## 🎨 Next Steps:

1. ✅ Tạo Read Token
2. ✅ Thêm vào `.env.local`
3. ✅ Restart server
4. ✅ Test Visual Editing
5. ⏳ Update các pages khác (Effects, Prompts, etc.)

---

## 🚀 Production Deployment:

Khi deploy lên Vercel:

1. **Vercel Dashboard** → Project → Settings → Environment Variables
2. Add: `SANITY_API_READ_TOKEN` = `your-token`
3. Redeploy

Visual Editing sẽ work trên production!

---

**Sẵn sàng test?** Làm theo 4 bước trên! 🎨
