# GitHub Setup Instructions

## ✅ Đã hoàn thành:
- ✅ Git repository đã được khởi tạo
- ✅ Code đã được commit với message: "Initial commit: Complete R&D Specialist website with 9 modules"
- ✅ README.md đã được tạo
- ✅ .gitignore đã được tạo

## 🚀 Bước tiếp theo - Tạo GitHub Repository:

### Option 1: Tạo repo qua GitHub Web (Khuyến nghị)

1. **Mở trình duyệt và truy cập:**
   ```
   https://github.com/new
   ```

2. **Điền thông tin repo:**
   - Repository name: `FotoberRnD`
   - Description: `R&D Specialist Website for Fotober AI Video - 9 modules`
   - Visibility: **Public** hoặc **Private** (tùy chọn)
   - ❌ **KHÔNG** chọn "Add a README file"
   - ❌ **KHÔNG** chọn "Add .gitignore"
   - ❌ **KHÔNG** chọn "Choose a license"

3. **Click "Create repository"**

4. **Sau khi tạo xong, chạy lệnh sau trong PowerShell:**

```powershell
# Navigate to project
cd f:\OneDrive\Fotober\FotoberRnD

# Add remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/FotoberRnD.git

# Push code lên GitHub
git branch -M main
git push -u origin main
```

### Option 2: Sử dụng GitHub Desktop

1. **Download GitHub Desktop:**
   ```
   https://desktop.github.com/
   ```

2. **Mở GitHub Desktop và:**
   - File → Add Local Repository
   - Chọn folder: `f:\OneDrive\Fotober\FotoberRnD`
   - Click "Publish repository"
   - Đặt tên: `FotoberRnD`
   - Chọn Public/Private
   - Click "Publish Repository"

### Option 3: Cài GitHub CLI (gh)

```powershell
# Cài đặt GitHub CLI qua winget
winget install --id GitHub.cli

# Sau khi cài xong, restart PowerShell và chạy:
gh auth login

# Tạo repo và push
cd f:\OneDrive\Fotober\FotoberRnD
gh repo create FotoberRnD --public --source=. --description "R&D Specialist Website for Fotober AI Video" --push
```

## 📋 Sau khi push thành công:

Repository sẽ có URL:
```
https://github.com/YOUR_USERNAME/FotoberRnD
```

## 🔗 Deploy lên Vercel (Optional):

1. Truy cập: https://vercel.com/new
2. Import GitHub repository: `FotoberRnD`
3. Framework Preset: **Next.js**
4. Click "Deploy"
5. Đợi 2-3 phút → Website live!

## 📝 Files đã commit:

- ✅ 9 modules (Dashboard + 8 pages)
- ✅ 18 component files (TSX + CSS)
- ✅ 4 data files (JSON)
- ✅ Navigation component
- ✅ Design system (globals.css)
- ✅ README.md
- ✅ .gitignore
- ✅ Next.js config files

**Tổng cộng:** ~50+ files

---

**Lưu ý:** Nếu gặp lỗi khi push, có thể do:
1. Chưa đăng nhập GitHub
2. Remote URL sai
3. Branch name khác (main vs master)

Chạy lệnh này để kiểm tra:
```powershell
git remote -v
git branch
```
