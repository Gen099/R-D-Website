# Vercel Deployment Issue - Troubleshooting Guide

## 🔴 Vấn đề hiện tại

Vercel đang build từ commit cũ `9349f40` thay vì commit mới nhất `ddf4689`, dẫn đến lỗi:
```
npm error notarget No matching version found for tailwindcss@^3.4.20
```

## ✅ Đã fix trong code

- Commit `5ca13d0`: Fix Tailwind CSS từ `^3.4.20` → `^3.4.1`
- Commit `ddf4689`: Trigger rebuild
- GitHub local đã có code đúng

## 🔧 Giải pháp

### Option 1: Manual Redeploy trên Vercel Dashboard (KHUYẾN NGHỊ)

1. **Vào Vercel Dashboard**:
   - Truy cập: https://vercel.com/dashboard
   - Login với account của bạn

2. **Chọn Project**:
   - Tìm project "fotober-rd-hub" hoặc tên tương tự
   - Click vào project

3. **Redeploy từ commit mới**:
   - Vào tab **Deployments**
   - Click nút **"Redeploy"** ở deployment mới nhất
   - HOẶC click **"Deploy"** → chọn branch `main` → chọn commit `ddf4689`

4. **Xóa cache (nếu cần)**:
   - Trong deployment settings, tìm option **"Clear Build Cache"**
   - Redeploy lại

### Option 2: Dùng Vercel CLI

```bash
# Cài Vercel CLI (nếu chưa có)
npm install -g vercel

# Login
vercel login

# Link project
cd f:\OneDrive\Fotober\FotoberRnD
vercel link

# Deploy với force
vercel --prod --force
```

### Option 3: Kiểm tra GitHub Integration

1. **Vào Vercel Dashboard** → Project → Settings → Git
2. Kiểm tra:
   - ✅ Repository đã connect đúng: `Gen099/FotoberRnD`
   - ✅ Branch: `main`
   - ✅ Auto-deploy enabled
3. Nếu có vấn đề:
   - Disconnect repository
   - Reconnect lại

### Option 4: Force Push (Cuối cùng)

Nếu tất cả đều không work, force push để trigger webhook:

```bash
git commit --amend --no-edit
git push origin main --force
```

⚠️ **Chỉ dùng nếu bạn là người duy nhất làm việc trên repo này**

## 🎯 Kiểm tra sau khi deploy

1. **Build logs** phải show:
   ```
   Cloning github.com/Gen099/FotoberRnD (Branch: main, Commit: ddf4689)
   ```
   hoặc `5ca13d0`

2. **npm install** phải thành công với Tailwind CSS `^3.4.1`

3. **Build** phải complete without errors

## 📋 Checklist

- [ ] Vào Vercel Dashboard
- [ ] Tìm project deployment
- [ ] Click "Redeploy" hoặc "Deploy" với commit mới
- [ ] Xem build logs để confirm commit đúng
- [ ] Đợi build hoàn tất
- [ ] Test URL deployment

## 🆘 Nếu vẫn lỗi

Hãy check:
1. Repository có phải là **private** không? (Vercel cần permission)
2. GitHub webhook có hoạt động không? (Settings → Webhooks)
3. Vercel có đủ quyền access repo không?

---

**Khuyến nghị**: Dùng **Option 1** (Manual Redeploy) vì đơn giản và hiệu quả nhất.
