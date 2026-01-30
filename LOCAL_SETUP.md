# 🏠 Local Setup - Chạy Trên Máy Cá Nhân

## 📋 Yêu Cầu
- Node.js >= 18
- npm >= 9
- Git

## 🚀 Setup Nhanh (5 phút)

### 1. Clone Repository
```bash
git clone https://github.com/Gen099/FotoberRnD.git
cd FotoberRnD
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Tạo File Environment Variables
```bash
# Tạo file .dev.vars
cat > .dev.vars << 'EOF'
OPENAI_API_KEY=gsk-eyJjb2dlbl9pZCI6IjQzMGZjZDM5LTgxNTEtNDY1NC04M2FhLTI5OTgxZGVhMTAwNCIsImtleV9pZCI6IjY1MjJjMTI2LWRiYTYtNDk1YS1iYTdkLTAyNTc5MTI3YjdhNCIsImN0aW1lIjoxNzY5NzU1Nzg4LCJjbGF1ZGVfYmlnX21vZGVsIjpudWxsLCJjbGF1ZGVfbWlkZGxlX21vZGVsIjpudWxsLCJjbGF1ZGVfc21hbGxfbW9kZWwiOm51bGx9fJusH9qYRzpBSHJPNYEpaknoWDjq4R3jNbESXJ6pkdA6
OPENAI_BASE_URL=https://www.genspark.ai/api/llm_proxy/v1
EOF
```

### 4. Build Project
```bash
npm run build
```

### 5. Start Development Server
```bash
npm run dev
```

**Hoặc dùng wrangler dev:**
```bash
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 6. Truy Cập
```
🌐 http://localhost:3000
```

## ✅ Kiểm Tra

### Homepage
```
http://localhost:3000
```

### AI Tools
```
http://localhost:3000/ai-tools
```

### Analytics
```
http://localhost:3000/analytics
```

### API Health
```
curl http://localhost:3000/api/health
```

### Test AI
```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "type": "general",
    "input": "Fotober là gì?",
    "config": {"provider": "gemini"}
  }'
```

## 🛠️ Các Lệnh Hữu Ích

```bash
# Build project
npm run build

# Development với Vite
npm run dev

# Development với Wrangler
npx wrangler pages dev dist

# Preview production build
npm run preview

# Clean và rebuild
rm -rf dist node_modules
npm install
npm run build
```

## 📱 Truy Cập Từ Thiết Bị Khác Trong Cùng Mạng

Nếu muốn test trên điện thoại/tablet trong cùng WiFi:

1. **Tìm IP máy tính:**
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` hoặc `ip addr`
   - Ví dụ: `192.168.1.100`

2. **Start với bind 0.0.0.0:**
   ```bash
   npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
   ```

3. **Truy cập từ thiết bị khác:**
   ```
   http://192.168.1.100:3000
   ```

## 🆘 Troubleshooting

### Port 3000 đã được dùng
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Build lỗi
```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### AI không hoạt động
- Kiểm tra file `.dev.vars` đã tạo chưa
- Verify API key còn valid
- Check console browser để xem lỗi

### Dependencies lỗi
```bash
# Clear cache và reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

## 📝 Notes

- **Database**: Không có DB thật, data chỉ in-memory
- **Environment**: Development mode
- **Hot Reload**: Vite hỗ trợ hot reload tự động
- **Performance**: Local sẽ nhanh hơn sandbox

## 🎯 Làm Gì Tiếp?

Sau khi chạy local thành công:
1. ✅ Test tất cả features
2. ✅ Customize theo nhu cầu
3. ✅ Thêm data thật vào code
4. ✅ Share với team (dùng ngrok hoặc tunnel)

---

**Thời gian setup**: ~5 phút  
**Yêu cầu internet**: Chỉ cho npm install và AI API calls  
**Dễ dàng**: ⭐⭐⭐⭐⭐
