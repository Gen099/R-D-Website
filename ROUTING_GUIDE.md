# Hướng dẫn Hệ thống Routing Động - FotoberRnD

## Tổng quan

Hệ thống đã được cập nhật với **client-side routing** sử dụng History API để tạo trải nghiệm SPA (Single Page Application) mà không cần reload trang khi chuyển giữa các tab.

## Cấu trúc Routes

### Các Routes chính

| Route | Mô tả | Component |
|-------|-------|-----------|
| `/` | Trang chủ - Dashboard | Home page với stats và modules |
| `/documents` | Thư viện tài liệu | Danh sách và quản lý tài liệu |
| `/document/:id` | Xem tài liệu cụ thể | Document viewer |
| `/doc/:id` | Xem tài liệu (alias) | Document viewer với data |
| `/ai-tools` | Công cụ AI | AI Analysis Tools |
| `/analytics` | Phân tích dữ liệu | Analytics Dashboard |
| `/history` | Lịch sử phân tích | Analysis History |

### API Routes

Tất cả API routes đều có prefix `/api/`:

- `GET /api/documents` - Lấy danh sách tài liệu
- `GET /api/documents/:id` - Lấy tài liệu theo ID
- `POST /api/documents` - Thêm tài liệu mới
- `DELETE /api/documents/:id` - Xóa tài liệu
- `POST /api/ai/analyze` - Phân tích AI
- `GET /api/ai/models` - Danh sách AI models
- `GET /api/analysis/history` - Lịch sử phân tích
- `GET /api/health` - Health check

## Cơ chế hoạt động

### 1. Client-Side Router (`/public/static/router.js`)

Router tự động:
- **Intercept link clicks**: Chặn tất cả click vào links nội bộ
- **Update URL**: Sử dụng `history.pushState()` để thay đổi URL mà không reload
- **Load content**: Fetch nội dung mới qua AJAX
- **Update DOM**: Thay thế nội dung trong `.main-content`
- **Update navigation**: Highlight tab đang active

### 2. Server-Side Rendering

Server (Hono) vẫn render HTML đầy đủ cho mỗi route:
- **SEO friendly**: Mỗi route có HTML riêng
- **Direct access**: Có thể truy cập trực tiếp bất kỳ URL nào
- **Progressive enhancement**: Hoạt động ngay cả khi JavaScript bị tắt

### 3. Navigation Active State

Navigation tự động highlight tab đang active:
- Active: `bg-white text-orange-600 font-semibold shadow-lg`
- Inactive: `bg-white bg-opacity-20`

## Cách thêm Route mới

### Bước 1: Thêm route vào server (`src/index.tsx`)

```typescript
app.get('/new-page', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Page - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/global-styles.css" rel="stylesheet">
    <script src="/static/router.js" defer></script>
</head>
<body class="min-h-screen">
    <!-- Navigation (copy từ page khác) -->
    <nav class="gradient-orange text-white shadow-lg">
        ...
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <!-- Nội dung trang mới -->
        <h1>New Page</h1>
    </div>

    <!-- Footer (copy từ page khác) -->
    <footer class="mt-16 py-8 footer-gradient text-white">
        ...
    </footer>
</body>
</html>
  `)
})
```

### Bước 2: Thêm link vào navigation

Thêm link vào tất cả các navigation bars:

```html
<a href="/new-page" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
    <i class="fas fa-star mr-2"></i>New Page
</a>
```

### Bước 3: Test

1. Build: `npm run build`
2. Dev: `npm run dev`
3. Test navigation giữa các trang
4. Kiểm tra URL thay đổi mà không reload
5. Kiểm tra active state của navigation

## Lưu ý quan trọng

### 1. Cấu trúc HTML bắt buộc

Mỗi page PHẢI có:
- `<script src="/static/router.js" defer></script>` trong `<head>`
- `class="main-content"` cho container chính
- Navigation giống nhau trên tất cả pages
- Footer giống nhau trên tất cả pages

### 2. Links nội bộ

- Sử dụng `href="/path"` (relative path)
- KHÔNG sử dụng `onclick="window.location=..."`
- Router sẽ tự động intercept và xử lý

### 3. External links

Để link mở trong tab mới:
```html
<a href="https://external.com" target="_blank">External Link</a>
```

### 4. Dynamic routes

Với routes có parameters (như `/document/:id`):
- Server phải xử lý parameter
- Router sẽ tự động fetch và update content

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to Cloudflare
```bash
npm run deploy
```

## Troubleshooting

### Router không hoạt động

1. Kiểm tra `router.js` đã được load:
   ```html
   <script src="/static/router.js" defer></script>
   ```

2. Kiểm tra class `main-content` tồn tại:
   ```html
   <div class="container mx-auto px-6 py-8 main-content">
   ```

3. Kiểm tra console errors trong browser

### Active state không update

1. Kiểm tra href của link khớp với route
2. Kiểm tra navigation có cùng cấu trúc trên tất cả pages

### Page reload thay vì SPA navigation

1. Kiểm tra link không có `target="_blank"`
2. Kiểm tra không có `onclick` handlers
3. Kiểm tra router.js đã load xong trước khi click

## Best Practices

1. **Consistency**: Giữ navigation và footer giống nhau trên tất cả pages
2. **Progressive Enhancement**: Đảm bảo site hoạt động ngay cả khi JS bị tắt
3. **SEO**: Mỗi route có title và meta tags riêng
4. **Performance**: Sử dụng client-side routing để giảm load time
5. **UX**: Smooth transitions giữa các pages

## Future Enhancements

1. **Loading states**: Thêm loading indicator khi fetch content
2. **Transitions**: Thêm CSS transitions khi chuyển page
3. **Caching**: Cache content đã load để tăng tốc
4. **Prefetching**: Prefetch content khi hover vào links
5. **Error handling**: Xử lý lỗi network tốt hơn
