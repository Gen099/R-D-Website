# Sanity CMS Setup Guide

## Bước 1: Khởi tạo Sanity Project

Chạy lệnh sau trong terminal:

```powershell
cd f:\OneDrive\Fotober\FotoberRnD
npx sanity init
```

## Bước 2: Trả lời các câu hỏi

### 1. Login to Sanity
- Chọn phương thức đăng nhập: **Google** / **GitHub** / **Email**
- Trình duyệt sẽ mở → Đăng nhập

### 2. Create new project
- **Select project to use:** Chọn `Create new project`
- **Your project name:** `FotoberRnD CMS` (hoặc tên khác tùy ý)

### 3. Use the default dataset configuration?
- Chọn: **Yes** (nhấn Enter)

### 4. Project output path
- **Output path:** `studio` (nhấn Enter)

### 5. Select project template
- Chọn: **Clean project with no predefined schemas**

### 6. Do you want to use TypeScript?
- Chọn: **Yes** (nhấn Enter)

### 7. Package manager
- Chọn: **npm** (nhấn Enter)

## Bước 3: Đợi cài đặt

Sanity sẽ:
- Tạo folder `studio/`
- Cài đặt dependencies
- Tạo config files

## Bước 4: Xác nhận hoàn thành

Sau khi xong, bạn sẽ thấy:
```
✔ Success! Now what?
```

Và folder structure:
```
f:\OneDrive\Fotober\FotoberRnD\
├── studio/
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   ├── package.json
│   └── schemas/
```

## Bước 5: Quay lại chat

Nhắn "Đã xong" để tôi tiếp tục:
- Tạo schemas cho Feedback, Effects, Prompts, Competition
- Migrate data từ JSON
- Integrate với Next.js
- Deploy Sanity Studio

---

## Nếu gặp lỗi:

### Lỗi: "Cannot find module"
```powershell
npm cache clean --force
npx sanity init
```

### Lỗi: "Permission denied"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npx sanity init
```

### Lỗi: "Project ID not found"
- Đừng dùng `--project` flag
- Chỉ chạy: `npx sanity init`
- Chọn "Create new project" khi được hỏi

---

**Sẵn sàng? Chạy lệnh và báo tôi khi xong!** 🚀
