# 🎨 Hướng dẫn sử dụng Sanity Studio

## ✅ Đã hoàn thành:

1. ✅ Sanity Studio đã được setup tại `/studio`
2. ✅ 5 Schemas đã được tạo
3. ✅ Feedback page đã được update để fetch từ Sanity
4. ✅ Có fallback về JSON nếu chưa có data trong Sanity

---

## 🚀 Cách sử dụng:

### Bước 1: Chạy dev server

```powershell
cd f:\OneDrive\Fotober\FotoberRnD
npm run dev
```

### Bước 2: Truy cập Sanity Studio

Mở trình duyệt và vào:
```
http://localhost:3000/studio
```

Bạn sẽ thấy Sanity Studio interface!

### Bước 3: Tạo document đầu tiên (Test với Feedback)

1. Trong Studio, click **Feedback** ở sidebar
2. Click **Create** button (dấu + hoặc "Create new Feedback")
3. Điền thông tin:

**Title:** `Feedback Analysis - February 2026`

**Overview:**
- Total Jobs: `150`
- Error Groups: `4`
- Feedback Rate: `12.5`

**Error Groups:** Click "Add item"
- Group: `1`
- Count: `45`
- Percentage: `30`
- Color: `#FF6B6B`

(Thêm các groups khác tương tự)

**Error Rate By Effect:** Click "Add item"
- Effect: `Day to Night`
- Error Rate: `8.5`
- Status: `success`

(Thêm các effects khác)

**Root Causes:** Click "Add item"
- Category: `Prompt Quality`
- Issues: Click "Add item" → Gõ issue → Enter

**Action Items:** Click "Add item"
- Priority: `high`
- Action: `Improve prompt templates for Day-to-Night conversion`

4. Click **Publish** button (góc dưới bên phải)

### Bước 4: Xem kết quả

1. Mở tab mới, vào: `http://localhost:3000/feedback`
2. Bạn sẽ thấy badge: **📊 Data from Sanity CMS**
3. Data hiển thị là data bạn vừa tạo trong Studio!

---

## ✏️ Sửa content:

### Trong Studio:

1. Vào `/studio`
2. Click vào document muốn sửa
3. Edit bất kỳ field nào
4. Click **Publish**
5. Refresh page `/feedback` → Thấy changes!

---

## 📊 Tạo data cho các modules khác:

### Effects:

1. Studio → Click **Effect**
2. Create new
3. Điền:
   - Name: `Day to Night Conversion`
   - Category: `motion` (Motion Graphics)
   - Description: `Transform daytime photos to nighttime`
   - Price: `50,000 VND/photo`
   - Complexity: `medium`
   - Sample Link: `https://example.com/sample`
4. Publish

### Prompts:

1. Studio → Click **Prompt**
2. Create new
3. Điền:
   - Name: `Day to Night - Basic`
   - Category: `day-night`
   - Template: `Transform this daytime photo into a beautiful nighttime scene...`
   - Variables: Add items: `time_of_day`, `lighting_style`
   - Success Rate: `85`
4. Publish

### Competitors:

1. Studio → Click **Competitor**
2. Create new
3. Điền:
   - Name: `Pexels AI`
   - Region: `global`
   - Website: `https://pexels.com`
   - Pricing: `Free - $20/month`
   - Strengths: Add items
   - Features: Toggle checkboxes
4. Publish

### Resources:

1. Studio → Click **Resource**
2. Create new
3. Điền:
   - Title: `Runway ML`
   - Category: `ai-video`
   - Description: `AI video generation platform`
   - URL: `https://runwayml.com`
   - Tier: `primary`
   - Tags: Add items: `video`, `ai`, `generation`
4. Publish

---

## 🌐 Deploy Studio lên Production:

Sau khi test OK locally:

```powershell
npx sanity deploy
```

Chọn hostname (ví dụ: `fotober-rnd`)

Studio sẽ live tại: `https://fotober-rnd.sanity.studio`

Bạn có thể edit content từ bất kỳ đâu!

---

## 🔄 Workflow hoàn chỉnh:

```
1. Vào https://fotober-rnd.sanity.studio (hoặc localhost:3000/studio)
2. Login (nếu chưa)
3. Click vào document muốn sửa
4. Edit content:
   - Sửa text
   - Upload ảnh (drag-drop)
   - Thay đổi numbers
   - Add/remove items
5. Click Publish
6. Đợi 1-2 phút (ISR revalidation)
7. Website tự động cập nhật!
```

---

## 📝 Notes:

### Revalidation:

- Feedback page có `revalidate = 60` (60 giây)
- Sau khi publish, đợi tối đa 60s để thấy changes
- Hoặc force refresh: Ctrl+Shift+R

### Fallback:

- Nếu chưa có data trong Sanity → Tự động dùng JSON
- Badge sẽ hiển thị: **📄 Data from JSON (fallback)**

### Media Upload:

- Trong Studio, các field có thể upload media
- Drag-drop ảnh vào
- Sanity tự động host trên CDN
- URL tự động generate

---

## 🎯 Next Steps:

1. ✅ Test tạo Feedback document
2. ⏳ Update các pages khác (Effects, Prompts, Competition, Resources)
3. ⏳ Deploy Studio lên production
4. ⏳ Setup webhook để Vercel auto-rebuild khi publish

---

**Sẵn sàng test? Chạy `npm run dev` và vào `/studio`!** 🚀
