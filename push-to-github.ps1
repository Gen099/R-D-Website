# GitHub Push Script
# Chạy script này sau khi đã tạo repository trên GitHub

Write-Host "=== Fotober R&D - GitHub Push Script ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra git
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Hướng dẫn:" -ForegroundColor Yellow
Write-Host "1. Truy cập: https://github.com/new"
Write-Host "2. Tạo repository mới với tên: FotoberRnD"
Write-Host "3. Chọn Public hoặc Private"
Write-Host "4. KHÔNG tick 'Add README', 'Add .gitignore', 'Choose license'"
Write-Host "5. Click 'Create repository'"
Write-Host ""

# Hỏi username
$username = Read-Host "Nhập GitHub username của bạn"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username không được để trống!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Đang push code lên GitHub..." -ForegroundColor Cyan
Write-Host ""

# Kiểm tra remote
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "⚠️  Remote 'origin' đã tồn tại. Removing..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote
$repoUrl = "https://github.com/$username/FotoberRnD.git"
Write-Host "📡 Adding remote: $repoUrl" -ForegroundColor Cyan
git remote add origin $repoUrl

# Rename branch to main
Write-Host "🔄 Renaming branch to 'main'..." -ForegroundColor Cyan
git branch -M main

# Push
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "✅ SUCCESS! Code đã được push lên GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Repository URL:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$username/FotoberRnD" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Deploy lên Vercel (Optional):" -ForegroundColor Cyan
    Write-Host "   1. Truy cập: https://vercel.com/new" -ForegroundColor White
    Write-Host "   2. Import repository: FotoberRnD" -ForegroundColor White
    Write-Host "   3. Click 'Deploy'" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Có thể do:" -ForegroundColor Yellow
    Write-Host "- Repository chưa được tạo trên GitHub"
    Write-Host "- Username sai"
    Write-Host "- Chưa đăng nhập GitHub (cần Personal Access Token)"
    Write-Host ""
    Write-Host "💡 Giải pháp:" -ForegroundColor Cyan
    Write-Host "1. Kiểm tra repository đã tạo chưa: https://github.com/$username/FotoberRnD"
    Write-Host "2. Nếu cần authentication, tạo Personal Access Token:"
    Write-Host "   https://github.com/settings/tokens"
    Write-Host "3. Khi push, dùng token thay vì password"
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
