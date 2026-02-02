# 🔧 Khắc phục Environment Variables không load trên Vercel

## ⚠️ Vấn đề hiện tại

API `/api/debug` trả về:
```json
{
  "hasClientId": false,
  "hasClientSecret": false, 
  "hasNextAuthSecret": false
}
```

→ **Environment variables CHƯA được Vercel load!**

---

## ✅ Giải pháp: Thêm env vars ĐÚNG CÁCH

### Bước 1: Xóa env vars cũ (nếu có)

1. Vào https://vercel.com/dashboard
2. Chọn project → **Settings** → **Environment Variables**
3. Nếu thấy các biến `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` → Click **...** → **Remove**

### Bước 2: Thêm lại từ đầu

**QUAN TRỌNG:** Khi thêm, phải chọn đúng Environment!

#### Biến 1: GOOGLE_CLIENT_ID
- Click **Add New**
- **Name:** `GOOGLE_CLIENT_ID` (copy chính xác)
- **Value:** `41210054620-jtd1mc7jm5o7tv9fiuoeerfkep8srvvc.apps.googleusercontent.com`
- **Environments:** 
  - ✅ **Production** (BẮT BUỘC!)
  - ⬜ Preview (không cần)
  - ⬜ Development (không cần)
- Click **Save**

#### Biến 2: GOOGLE_CLIENT_SECRET
- **Name:** `GOOGLE_CLIENT_SECRET`
- **Value:** `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`
- **Environments:** ✅ Production only
- Click **Save**

#### Biến 3: NEXTAUTH_SECRET
- **Name:** `NEXTAUTH_SECRET`
- **Value:** `e683158d3e0c60e1fc93a053b38775f6`
- **Environments:** ✅ Production only
- Click **Save**

#### Biến 4: NEXTAUTH_URL
- **Name:** `NEXTAUTH_URL`
- **Value:** `https://r-d-website-kappa.vercel.app`
- **Environments:** ✅ Production only
- Click **Save**

### Bước 3: Kiểm tra đã thêm đúng chưa

Sau khi thêm, bạn phải thấy **4 dòng** trong danh sách Environment Variables:

```
GOOGLE_CLIENT_ID          41210054620-jtd1mc7jm5o7tv9f...  Production
GOOGLE_CLIENT_SECRET      GOCSPX-4gvEsfrT78Kdg9GVTEQs...  Production  
NEXTAUTH_SECRET           e683158d3e0c60e1fc93a053b38...  Production
NEXTAUTH_URL              https://r-d-website-kappa.v...  Production
```

### Bước 4: REDEPLOY (BẮT BUỘC!)

**Cách 1: Từ Vercel Dashboard**
1. Click tab **Deployments**
2. Click **...** ở deployment đầu tiên
3. Click **Redeploy**
4. **QUAN TRỌNG:** Bỏ tick "Use existing Build Cache"
5. Click **Redeploy**

**Cách 2: Trigger từ Git**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Bước 5: Đợi và kiểm tra

1. Đợi deployment xong (~2-3 phút)
2. Vào `https://r-d-website-kappa.vercel.app/api/debug`
3. Phải thấy:
```json
{
  "hasClientId": true,
  "hasClientSecret": true,
  "hasNextAuthSecret": true,
  "nextAuthUrl": "https://r-d-website-kappa.vercel.app"
}
```

---

## 🐛 Nếu vẫn không được

### Kiểm tra 1: Tên biến có đúng không?

Vercel **phân biệt chữ hoa/thường**! Phải viết chính xác:
- ✅ `GOOGLE_CLIENT_ID`
- ❌ `Google_Client_Id`
- ❌ `google_client_id`

### Kiểm tra 2: Có chọn Production không?

Khi thêm env var, phải tick vào **Production**. Nếu chỉ tick Preview/Development thì production build sẽ không có env vars!

### Kiểm tra 3: Đã redeploy chưa?

Env vars chỉ có hiệu lực với **deployment MỚI**. Deployment cũ vẫn dùng env vars cũ.

### Kiểm tra 4: Build có lỗi không?

1. Vào **Deployments** → Click vào deployment mới nhất
2. Xem **Status** có phải "Ready" không?
3. Click **View Function Logs** → Xem có lỗi gì không?

---

## 📸 Cần hỗ trợ thêm?

Chụp screenshot các trang sau và gửi cho tôi:

1. **Environment Variables page** (Settings → Environment Variables)
2. **Latest Deployment page** (Deployments → Click vào deployment đầu tiên)
3. **Function Logs** (nếu có lỗi)

Tôi sẽ xem và chỉ ra vấn đề cụ thể!
