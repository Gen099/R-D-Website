# Tạo Repository Mới và Deploy lên Vercel

## Bước 1: Tạo Repository mới trên GitHub

1. **Vào GitHub**: https://github.com/new
2. **Điền thông tin**:
   - Repository name: `FotoberRnD-v2` (hoặc tên khác)
   - Description: `Fotober R&D Specialist Platform - Next.js 15`
   - Visibility: **Private** (hoặc Public tùy bạn)
   - ❌ KHÔNG tick "Add a README file"
   - ❌ KHÔNG tick "Add .gitignore"
   - ❌ KHÔNG tick "Choose a license"
3. Click **"Create repository"**

## Bước 2: Xóa remote cũ và thêm remote mới

Mở Command Prompt và chạy:

```bash
cd f:\OneDrive\Fotober\FotoberRnD

# Xóa remote cũ
git remote remove origin

# Thêm remote mới (THAY YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/FotoberRnD-v2.git

# Kiểm tra remote
git remote -v
```

## Bước 3: Push code lên repo mới

```bash
# Push toàn bộ code lên branch main
git push -u origin main

# Nếu gặp lỗi, dùng force push (CHỈ dùng cho repo mới)
git push -u origin main --force
```

## Bước 4: Deploy lên Vercel từ repo mới

### Option A: Vercel Dashboard (Khuyến nghị)

1. **Vào Vercel Dashboard**: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Tìm repo mới: `YOUR_USERNAME/FotoberRnD-v2`
   - Click **"Import"**
4. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build` (mặc định)
   - Output Directory: `.next` (mặc định)
5. **Environment Variables** (nếu cần):
   - Thêm các biến môi trường từ `.env.local`
6. Click **"Deploy"**

### Option B: Vercel CLI

```bash
# Unlink project cũ
vercel unlink

# Link project mới
vercel link

# Deploy production
vercel --prod
```

## Bước 5: Kiểm tra Deployment

1. Đợi Vercel build (2-3 phút)
2. Build logs phải show:
   - ✅ `Cloning... Commit: [commit hash mới nhất]`
   - ✅ `npm install` thành công
   - ✅ `Compiled successfully`
   - ✅ `Build completed`
3. Truy cập URL deployment để test

## 🎯 Lợi ích của repo mới

- ✅ **Git history sạch sẽ** - Không còn commits cũ rối
- ✅ **Vercel sync đúng** - Không còn vấn đề clone commit cũ
- ✅ **Fresh start** - Không còn cache/config cũ
- ✅ **Dễ quản lý** - Repo mới, deployment mới

## 📋 Checklist

- [ ] Tạo repo mới trên GitHub
- [ ] Copy URL repo mới
- [ ] Xóa remote cũ: `git remote remove origin`
- [ ] Thêm remote mới: `git remote add origin [URL]`
- [ ] Push code: `git push -u origin main`
- [ ] Import vào Vercel
- [ ] Deploy thành công
- [ ] Test web

## 🆘 Nếu gặp lỗi

### Lỗi: "failed to push some refs"
```bash
git pull origin main --rebase
git push -u origin main
```

### Lỗi: "remote origin already exists"
```bash
git remote remove origin
git remote add origin [URL mới]
```

### Lỗi: Authentication failed
- Dùng **Personal Access Token** thay vì password
- Hoặc dùng **GitHub Desktop** để push

---

**Sau khi hoàn tất, bạn sẽ có**:
- ✅ Repo GitHub mới sạch sẽ
- ✅ Vercel deployment mới
- ✅ URL production mới
- ✅ Không còn vấn đề sync commits
