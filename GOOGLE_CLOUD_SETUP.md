# Google Cloud Setup Guide

## Bước 1: Tạo Google Cloud Project

1. Vào [Google Cloud Console](https://console.cloud.google.com)
2. Click **"Select a project"** → **"New Project"**
3. Tên project: `Fotober Calendar`
4. Click **Create**

## Bước 2: Enable Google Calendar API

1. Trong project vừa tạo, vào menu **"APIs & Services"** → **"Library"**
2. Tìm **"Google Calendar API"**
3. Click vào → Click **"Enable"**

## Bước 3: Tạo OAuth 2.0 Credentials

1. Vào **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Nếu chưa có OAuth consent screen:
   - Click **"Configure Consent Screen"**
   - Chọn **"External"** → **"Create"**
   - App name: `Fotober Calendar`
   - User support email: `sonbkdn95@gmail.com`
   - Developer contact: `sonbkdn95@gmail.com`
   - Click **"Save and Continue"** → **"Save and Continue"** (skip Scopes)
   - **Add test users:** `sonbkdn95@gmail.com`
   - Click **"Save and Continue"** → **"Back to Dashboard"**

4. Quay lại **"Credentials"** → **"Create Credentials"** → **"OAuth client ID"**
5. Application type: **"Web application"**
6. Name: `Fotober Calendar Web`
7. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://r-d-website-kappa.vercel.app
   ```
8. **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   https://r-d-website-kappa.vercel.app/api/auth/callback/google
   ```
9. Click **"Create"**
10. **COPY** Client ID và Client Secret

## Bước 4: Tạo file .env.local

Tạo file `.env.local` trong thư mục project với nội dung:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

**Để tạo NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Hoặc dùng: https://generate-secret.vercel.app/32

## Bước 5: Gửi credentials cho tôi

Sau khi có:
- ✅ Client ID
- ✅ Client Secret  
- ✅ NextAuth Secret

Gửi cho tôi để tôi update vào code!

---

## ⚠️ Lưu ý quan trọng

- **KHÔNG** commit file `.env.local` lên Git
- Khi deploy Vercel, cần add environment variables vào Vercel dashboard
- App đang ở chế độ "Testing" → Chỉ test users mới login được
