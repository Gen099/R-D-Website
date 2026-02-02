# 🔧 Hướng dẫn sửa lỗi 404 khi đăng nhập Google

## ⚠️ Vấn đề
Khi click "Đăng nhập Google", bị redirect về `/api/auth/error` và gặp lỗi 404.

## ✅ Giải pháp

### Bước 1: Cập nhật Google Cloud OAuth Redirect URIs

1. Vào https://console.cloud.google.com/apis/credentials
2. Click vào OAuth 2.0 Client ID (tên: **Fotober Calendar Web** hoặc tương tự)
3. Trong phần **Authorized redirect URIs**, đảm bảo có **CẢ HAI** URLs sau:

```
http://localhost:3000/api/auth/callback/google
https://r-d-website-kappa.vercel.app/api/auth/callback/google
```

4. Click **Save**

### Bước 2: Kiểm tra Environment Variables trên Vercel

Vào https://vercel.com/dashboard → Project → Settings → Environment Variables

Đảm bảo có **4 biến** này:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GOOGLE_CLIENT_ID` | `41210054620-jtd1mc7jm5o7tv9fiuoeerfkep8srvvc.apps.googleusercontent.com` | Production ✅ |
| `GOOGLE_CLIENT_SECRET` | `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` | Production ✅ |
| `NEXTAUTH_SECRET` | `e683158d3e0c60e1fc93a053b38775f6` | Production ✅ |
| `NEXTAUTH_URL` | `https://r-d-website-kappa.vercel.app` | Production ✅ |

⚠️ **QUAN TRỌNG:** Sau khi thêm/sửa env vars, phải **Redeploy**!

### Bước 3: Redeploy Vercel

**Cách 1: Từ Dashboard**
1. Vào Deployments tab
2. Click **...** (3 chấm) ở deployment mới nhất
3. Click **Redeploy**

**Cách 2: Push code mới** (tôi đã sửa code rồi)
```bash
git pull
git push
```

---

## 🧪 Test sau khi deploy

1. Vào https://r-d-website-kappa.vercel.app/calendar
2. Click "🔐 Đăng nhập Google"
3. Chọn tài khoản Google
4. Cho phép quyền truy cập Calendar
5. Sẽ redirect về `/calendar` và hiển thị tên bạn

---

## 🐛 Nếu vẫn lỗi

Kiểm tra:
1. **Google Cloud Console** → OAuth consent screen → Test users
   - Đảm bảo `sonbkdn95@gmail.com` nằm trong danh sách test users
2. **Vercel Deployment Logs**
   - Xem có lỗi gì trong build logs không
3. **Browser Console** (F12)
   - Xem có error message gì không

---

## 📝 Những gì đã sửa

1. ✅ Thêm `pages` config vào NextAuth để xử lý error
2. ✅ Redirect error về `/calendar` thay vì `/api/auth/error`
3. ✅ Tạo debug endpoint `/api/debug` để kiểm tra env vars

Code đã được push lên GitHub, Vercel sẽ auto-deploy.
