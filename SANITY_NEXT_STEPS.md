# Sanity CMS - Next Steps Guide

## ✅ Đã hoàn thành:

1. ✅ Sanity Studio đã được setup
2. ✅ 5 Schemas đã được tạo:
   - `feedbackType` - Feedback Analysis
   - `effectType` - Effects Catalog
   - `promptType` - Prompt Library
   - `competitorType` - Competition Analysis
   - `resourceType` - Resources
3. ✅ Sanity Client đã được cấu hình
4. ✅ Migration script đã sẵn sàng

---

## 🚀 Bước tiếp theo:

### 1. Tạo Write Token (Bắt buộc cho migration)

**Truy cập:** https://www.sanity.io/manage

1. Chọn project: **FotoberRnD CMS**
2. Click **API** tab
3. Scroll xuống **Tokens**
4. Click **Add API token**
5. **Token name:** `Migration Token`
6. **Permissions:** **Editor**
7. Click **Add token**
8. **Copy token** (chỉ hiện 1 lần!)

### 2. Thêm Token vào .env.local

Mở file `f:\OneDrive\Fotober\FotoberRnD\.env.local` và thêm:

```env
SANITY_WRITE_TOKEN="your-token-here"
```

### 3. Chạy Migration Script

```powershell
cd f:\OneDrive\Fotober\FotoberRnD
npm install tsx --save-dev
npx tsx scripts/migrate-to-sanity.ts
```

Script sẽ:
- Import tất cả data từ `/data/*.json`
- Tạo documents trong Sanity
- Hiển thị progress

### 4. Verify Data trong Sanity Studio

```powershell
cd f:\OneDrive\Fotober\FotoberRnD
npm run dev
```

Truy cập: **http://localhost:3000/studio**

Bạn sẽ thấy:
- 📊 Feedback
- ✨ Effect (nhiều items)
- 📝 Prompt
- 🎯 Competitor
- 📚 Resource

---

## 📝 Sau khi migrate xong:

### Bước 1: Update Next.js Pages

Tôi sẽ update các pages để fetch data từ Sanity thay vì JSON files:

- `app/feedback/page.tsx` → Fetch từ Sanity
- `app/effects/page.tsx` → Fetch từ Sanity
- `app/competition/page.tsx` → Fetch từ Sanity
- Etc.

### Bước 2: Deploy Sanity Studio

```powershell
cd f:\OneDrive\Fotober\FotoberRnD
npx sanity deploy
```

Chọn hostname (ví dụ: `fotober-rnd`)

Studio sẽ live tại: `https://fotober-rnd.sanity.studio`

### Bước 3: Edit Content

Truy cập: `https://fotober-rnd.sanity.studio`

- Click vào bất kỳ document nào
- Edit text, upload images
- Click **Publish**
- Vercel tự động rebuild (nếu setup webhook)

---

## 🎨 Workflow sau khi hoàn thành:

```
1. Vào Sanity Studio (https://fotober-rnd.sanity.studio)
2. Click Edit document
3. Sửa content, upload media
4. Click Publish
5. Vercel auto-rebuild (2-3 phút)
6. Website cập nhật!
```

---

## 📊 Current Status:

- ✅ Sanity Project: Created
- ✅ Schemas: 5/5 defined
- ✅ Client: Configured
- ⏳ Data Migration: Ready (waiting for token)
- ⏳ Next.js Integration: Pending
- ⏳ Studio Deployment: Pending

---

**Sẵn sàng chạy migration? Làm theo steps 1-3 ở trên!** 🚀
