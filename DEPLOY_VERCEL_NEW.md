# Deploy Vercel từ Repo Mới - HƯỚNG DẪN NHANH

## ✅ Đã hoàn thành

- ✅ Tạo repo mới: `Gen099/FotoberRnD-v2`
- ✅ Push code lên GitHub thành công
- ✅ Tất cả commits đã được chuyển

## 🚀 Bước tiếp theo: Deploy lên Vercel

### Option 1: Vercel Dashboard (KHUYẾN NGHỊ - 3 phút)

1. **Vào Vercel Dashboard**: https://vercel.com/dashboard

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - Hoặc: https://vercel.com/new

3. **Chọn Repository**:
   - Tìm: `Gen099/FotoberRnD-v2`
   - Click **"Import"**

4. **Configure Project**:
   - **Project Name**: `fotober-rd-v2` (hoặc tên khác)
   - **Framework Preset**: Next.js (auto-detect)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (mặc định)
   - **Output Directory**: `.next` (mặc định)
   - **Install Command**: `npm install` (mặc định)

5. **Environment Variables** (NẾU CẦN):
   ```
   # Nếu có database hoặc API keys
   POSTGRES_URL=...
   POSTGRES_PRISMA_URL=...
   POSTGRES_URL_NON_POOLING=...
   ```
   *Bỏ qua nếu chưa setup database*

6. **Deploy**:
   - Click **"Deploy"**
   - Đợi 2-3 phút

### Option 2: Vercel CLI (Nhanh hơn)

```bash
# Unlink project cũ
vercel unlink

# Deploy từ repo mới
vercel --prod

# Làm theo hướng dẫn:
# - Link to existing project? No
# - Project name: fotober-rd-v2
# - Directory: ./
```

## 📊 Kiểm tra Build Logs

Build logs phải show:
- ✅ `Cloning github.com/Gen099/FotoberRnD-v2 (Branch: main, Commit: 939a42e)`
- ✅ `Installing dependencies... added 380 packages`
- ✅ `Compiled successfully`
- ✅ `Linting and checking validity of types`
- ✅ `Build completed`

## 🎯 Sau khi Deploy thành công

1. **Copy Production URL**: `https://fotober-rd-v2.vercel.app` (hoặc tương tự)
2. **Test các pages**:
   - `/` - Dashboard
   - `/feedback` - Feedback Analysis
   - `/effects` - Effects Catalog
   - `/ai-problems` - AI Problems
   - `/competition` - Competition
   - `/job-description` - Job Description
   - `/operations` - Operations
   - `/platform` - Platform Design

3. **Kiểm tra**:
   - ✅ Navigation hoạt động
   - ✅ Styling đúng
   - ✅ Data hiển thị
   - ✅ Responsive mobile

## 🔧 Nếu gặp lỗi build

### Lỗi: Module not found
- Check file paths trong import statements
- Đảm bảo tất cả CSS modules đã commit

### Lỗi: TypeScript errors
- Chạy local: `npm run build`
- Fix errors rồi commit + push

### Lỗi: Environment variables
- Thêm biến môi trường trong Vercel Dashboard
- Settings → Environment Variables

## 📝 Workflow từ giờ trở đi

```bash
# 1. Sửa code local
# 2. Commit
git add .
git commit -m "feat: your changes"

# 3. Push lên GitHub
git push origin main

# 4. Vercel tự động deploy (webhook)
# 5. Kiểm tra deployment logs
# 6. Test production URL
```

## ✅ Checklist

- [ ] Vào Vercel Dashboard
- [ ] Import `Gen099/FotoberRnD-v2`
- [ ] Configure project settings
- [ ] Click Deploy
- [ ] Đợi build hoàn tất
- [ ] Copy production URL
- [ ] Test tất cả pages
- [ ] Bookmark URL

---

**Repo mới**: https://github.com/Gen099/FotoberRnD-v2  
**Vercel Dashboard**: https://vercel.com/dashboard  
**Status**: ✅ Ready to deploy
