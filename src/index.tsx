import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { analyzeWithAI, type AIAnalysisRequest, type AIAnalysisResponse } from './services/ai'
import { storage } from './services/storage'

// Define Cloudflare Bindings type for D1 database and env vars
type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
  OPENAI_BASE_URL: string;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// API ROUTES
// ============================================

// Home - redirect to documents
app.get('/', (c) => {
  return c.redirect('/documents')
})

// Old home page (removed)
app.get('/old-home-removed', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fotober R&D Intelligence Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/global-styles.css" rel="stylesheet">
    <script src="/static/router.js" defer></script>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-video text-3xl"></i>
                    <div>
                        <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                        <p class="text-sm opacity-90">AI Video Knowledge Base & Analytics Platform</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <a href="/documents" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-book mr-2"></i>Tài liệu
                    </a>
                    <a href="/analytics" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-chart-line mr-2"></i>Phân tích
                    </a>
                    <a href="/ai-tools" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-robot mr-2"></i>AI Tools
                    </a>
                    <a href="/history" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-history mr-2"></i>Lịch sử
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <!-- Hero Section -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8 card-hover">
            <div class="text-center">
                <h2 class="text-4xl font-bold section-title mb-4">
                    Chào mừng đến với Nền tảng Tri thức R&D AI Video
                </h2>
                <p class="text-gray-600 text-lg">
                    Hệ thống quản lý, phân tích và tối ưu hóa quy trình sản xuất AI Video cho Fotober
                </p>
            </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="stat-label">Tổng tài liệu</p>
                        <p class="stat-value">5</p>
                    </div>
                    <i class="fas fa-file-alt text-4xl" style="color: #FB923C;"></i>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="stat-label">Job Codes phân tích</p>
                        <p class="stat-value">23</p>
                    </div>
                    <i class="fas fa-tasks text-4xl" style="color: #F97316;"></i>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="stat-label">Loại AI Effects</p>
                        <p class="stat-value">25+</p>
                    </div>
                    <i class="fas fa-magic text-4xl" style="color: #EA580C;"></i>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="stat-label">AI Models</p>
                        <p class="stat-value">4</p>
                    </div>
                    <i class="fas fa-brain text-4xl" style="color: #C2410C;"></i>
                </div>
            </div>
        </div>

        <!-- Main Modules -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Báo cáo phân tích -->
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer" onclick="window.location='/document/analysis-report'">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                        <i class="fas fa-chart-bar text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Báo cáo Phân tích Hiện trạng</h3>
                </div>
                <p class="text-gray-600 mb-4">Phân tích toàn diện về AI Video trong lĩnh vực bất động sản - 23 job codes phản hồi</p>
                <div class="flex items-center text-orange-600 font-semibold">
                    <span>Xem chi tiết</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>

            <!-- Kế hoạch công việc -->
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer" onclick="window.location='/document/work-plan'">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                        <i class="fas fa-calendar-alt text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Kế hoạch Công việc R&D</h3>
                </div>
                <p class="text-gray-600 mb-4">Lộ trình chi tiết cho vị trí R&D Specialist - AI Video & Prompt Engineering Q1/2026</p>
                <div class="flex items-center text-orange-600 font-semibold">
                    <span>Xem chi tiết</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>

            <!-- Tài liệu kỹ thuật -->
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer" onclick="window.location='/document/technical-doc'">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                        <i class="fas fa-cogs text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Tài liệu Kỹ thuật Video</h3>
                </div>
                <p class="text-gray-600 mb-4">Danh mục đầy đủ hiệu ứng, motion, add-on và quy trình sản xuất video</p>
                <div class="flex items-center text-orange-600 font-semibold">
                    <span>Xem chi tiết</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>

            <!-- Tài liệu vận hành -->
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer" onclick="window.location='/document/operation-doc'">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                        <i class="fas fa-tasks text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Tài liệu Vận hành R&D</h3>
                </div>
                <p class="text-gray-600 mb-4">Quy trình giao tiếp, đánh giá và chuyển giao kỹ thuật chi tiết</p>
                <div class="flex items-center text-orange-600 font-semibold">
                    <span>Xem chi tiết</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>

            <!-- Platform design -->
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer" onclick="window.location='/document/platform-design'">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                        <i class="fas fa-laptop-code text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Thiết kế Hệ thống Platform</h3>
                </div>
                <p class="text-gray-600 mb-4">Kiến trúc và thiết kế R&D AI Video Intelligence Platform</p>
                <div class="flex items-center text-orange-600 font-semibold">
                    <span>Xem chi tiết</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>

            <!-- AI Analysis Tool -->
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer" onclick="window.location='/ai-tools'">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                        <i class="fas fa-robot text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">AI Analysis Tools</h3>
                </div>
                <p class="text-gray-600 mb-4">Công cụ phân tích thông minh với Gemini, GLM, OpenAI, Claude</p>
                <div class="flex items-center text-orange-600 font-semibold">
                    <span>Sử dụng ngay</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="mt-16 py-8 footer-gradient text-white">
        <div class="container mx-auto px-6 text-center">
            <p class="text-lg font-semibold mb-2">Fotober R&D Intelligence Hub</p>
            <p class="text-sm opacity-90">© 2026 Fotober Media Company Limited. All rights reserved.</p>
            <p class="text-xs opacity-75 mt-2">Built with ❤️ using Hono + Cloudflare + AI</p>
        </div>
    </footer>
</body>
</html>
  `)
})

// API endpoint to get all documents
app.get('/api/documents', async (c) => {
  const documents = await storage.getDocuments();
  return c.json({ success: true, data: documents });
})

// API endpoint to get document by ID
app.get('/api/documents/:id', async (c) => {
  const id = c.req.param('id');
  const doc = await storage.getDocumentById(id);
  
  if (!doc) {
    return c.json({ success: false, error: 'Document not found' }, 404);
  }
  
  // Increment view count
  await storage.incrementDocumentView(id);
  
  return c.json({ success: true, data: doc });
})

// API endpoint to add new document
app.post('/api/documents', async (c) => {
  try {
    const body = await c.req.json();
    const { title, category, summary, embed_url } = body;
    
    // Validate required fields
    if (!title || !category || !embed_url) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: title, category, embed_url' 
      }, 400);
    }
    
    // Auto-detect embed type from URL
    let embed_type: 'gdrive' | 'canva' | 'dropbox' | 'local' = 'local';
    if (embed_url.includes('drive.google.com') || embed_url.includes('docs.google.com')) {
      embed_type = 'gdrive';
    } else if (embed_url.includes('canva.com')) {
      embed_type = 'canva';
    } else if (embed_url.includes('dropbox.com')) {
      embed_type = 'dropbox';
    }
    
    // Create document
    const newDoc = await storage.addDocument({
      title,
      category,
      file_path: embed_url,
      file_type: 'embed',
      file_size: 0,
      summary: summary || '',
      embed_url,
      embed_type
    });
    
    return c.json({ success: true, data: newDoc });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
})

// API endpoint to delete document
app.delete('/api/documents/:id', async (c) => {
  const id = c.req.param('id');
  const success = await storage.deleteDocument(id);
  
  if (!success) {
    return c.json({ success: false, error: 'Document not found' }, 404);
  }
  
  return c.json({ success: true });
})

// Document viewer page
app.get('/document/:id', (c) => {
  const docId = c.req.param('id')
  
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xem Tài liệu - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FFF5F0 0%, #FFE5D9 50%, #FFD4C4 100%);
        }
        
        .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #FFA07A 50%, #FFE5D9 100%);
        }
        
        .content-viewer {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(255, 107, 53, 0.15);
        }
        
        .markdown-body {
            line-height: 1.8;
        }
        
        .markdown-body h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #FF6B35;
        }
        
        .markdown-body h2 {
            font-size: 2rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #FFA07A;
        }
        
        .markdown-body h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #FF8C61;
        }
        
        .markdown-body p {
            margin-bottom: 1rem;
            color: #374151;
        }
        
        .markdown-body pre {
            background: #F3F4F6;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1rem 0;
        }
        
        .markdown-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        
        .markdown-body th,
        .markdown-body td {
            border: 1px solid #E5E7EB;
            padding: 0.75rem;
            text-align: left;
        }
        
        .markdown-body th {
            background: #FFF5F0;
            font-weight: 600;
            color: #FF6B35;
        }
    </style>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="flex items-center space-x-4 hover:opacity-80 transition">
                        <i class="fas fa-video text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                            <p class="text-sm opacity-90">Xem Tài liệu</p>
                        </div>
                    </a>
                </div>
                <a href="/" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                    <i class="fas fa-home mr-2"></i>Trang chủ
                </a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <div class="content-viewer">
            <div class="markdown-body">
                <div class="text-center py-8">
                    <i class="fas fa-file-alt text-6xl text-orange-400 mb-4"></i>
                    <h1>Đang tải tài liệu...</h1>
                    <p class="text-gray-600">Tài liệu ID: ${docId}</p>
                    <p class="text-sm text-gray-500 mt-4">
                        Tính năng xem tài liệu sẽ được hoàn thiện trong phiên bản tiếp theo.<br>
                        Hiện tại bạn có thể tải các file gốc từ hệ thống.
                    </p>
                    <div class="mt-8 space-x-4">
                        <a href="/" class="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                            <i class="fas fa-arrow-left mr-2"></i>Quay lại trang chủ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `)
})

// AI Tools page
app.get('/ai-tools', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Tools - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FFF5F0 0%, #FFE5D9 50%, #FFD4C4 100%);
        }
        
        .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #FFA07A 50%, #FFE5D9 100%);
        }
    </style>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="flex items-center space-x-4 hover:opacity-80 transition">
                        <i class="fas fa-video text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                            <p class="text-sm opacity-90">AI Analysis Tools</p>
                        </div>
                    </a>
                </div>
                <a href="/" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                    <i class="fas fa-home mr-2"></i>Trang chủ
                </a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="text-center mb-8">
                <i class="fas fa-robot text-6xl text-orange-500 mb-4"></i>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">AI Analysis Tools</h2>
                <p class="text-gray-600">Phân tích thông minh với nhiều AI models</p>
            </div>

            <!-- Analysis Type Selection -->
            <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">Loại phân tích:</label>
                <select id="analysisType" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                    <option value="general">Chung - Trả lời câu hỏi hoặc tư vấn</option>
                    <option value="brief">Brief Analysis - Phân tích yêu cầu khách hàng</option>
                    <option value="error">Error Analysis - Phân tích lỗi & feedback</option>
                    <option value="prompt">Prompt Generation - Tạo prompt tối ưu</option>
                </select>
            </div>

            <!-- AI Model Selection -->
            <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">Chọn AI Model:</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div data-provider="gemini" class="provider-card p-4 border-2 border-orange-500 rounded-lg bg-orange-50 cursor-pointer hover:shadow-lg transition">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-semibold text-orange-700">Gemini</span>
                            <i class="fas fa-check-circle text-orange-600"></i>
                            <i class="fas fa-circle text-gray-400 hidden"></i>
                        </div>
                        <p class="text-xs text-gray-600">Google AI - Mặc định</p>
                    </div>
                    
                    <div data-provider="glm" class="provider-card p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition hover:border-orange-300">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-semibold text-gray-700">GLM</span>
                            <i class="fas fa-check-circle text-orange-600 hidden"></i>
                            <i class="fas fa-circle text-gray-400"></i>
                        </div>
                        <p class="text-xs text-gray-600">Zhipu AI</p>
                    </div>
                    
                    <div data-provider="openai" class="provider-card p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition hover:border-orange-300">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-semibold text-gray-700">OpenAI</span>
                            <i class="fas fa-check-circle text-orange-600 hidden"></i>
                            <i class="fas fa-circle text-gray-400"></i>
                        </div>
                        <p class="text-xs text-gray-600">GPT-5</p>
                    </div>
                    
                    <div data-provider="claude" class="provider-card p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition hover:border-orange-300">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-semibold text-gray-700">Claude</span>
                            <i class="fas fa-check-circle text-orange-600 hidden"></i>
                            <i class="fas fa-circle text-gray-400"></i>
                        </div>
                        <p class="text-xs text-gray-600">Anthropic</p>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">Nhập nội dung cần phân tích:</label>
                <textarea id="inputContent" class="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none" placeholder="Paste nội dung tài liệu, brief, hoặc câu hỏi của bạn vào đây...

Ví dụ:
📋 Brief Analysis:
'Please add AI lifestyle effect with family at the pool area...'

🔍 Error Analysis:
'TADEC31004: The reindeer moved away from the sleigh instead of following it...'

🎨 Prompt Generation:
'Tạo prompt cho hiệu ứng Day-to-Night chuyển từ ban ngày sang hoàng hôn'

❓ General Question:
'Tỷ lệ lỗi của Object Animation effect là bao nhiêu? Làm sao để giảm thiểu?'"></textarea>
            </div>

            <!-- Loading Indicator -->
            <div id="loadingIndicator" class="hidden mb-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-center">
                <i class="fas fa-spinner fa-spin text-blue-600 text-2xl mr-3"></i>
                <span class="text-blue-800 font-semibold">AI đang phân tích... Vui lòng đợi trong giây lát.</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-4 mb-8">
                <button id="analyzeBtn" class="flex-1 px-6 py-3 gradient-orange text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="fas fa-brain mr-2"></i>Phân tích với AI
                </button>
                <button id="clearBtn" class="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition">
                    <i class="fas fa-eraser mr-2"></i>Xóa
                </button>
            </div>

            <!-- Results Area -->
            <div id="resultsContainer" class="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div class="flex items-center mb-4">
                    <i class="fas fa-lightbulb text-yellow-500 text-2xl mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-800">Kết quả phân tích</h3>
                </div>
                <p class="text-gray-600 italic">
                    Kết quả phân tích sẽ hiển thị ở đây sau khi bạn nhấn nút "Phân tích với AI".
                </p>
            </div>
        </div>
    </div>

    <script src="/static/ai-tools.js"></script>
</body>
</html>
  `)
})

// Analytics page
app.get('/analytics', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Dashboard - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FFF5F0 0%, #FFE5D9 50%, #FFD4C4 100%);
        }
        
        .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #FFA07A 50%, #FFE5D9 100%);
        }
    </style>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="flex items-center space-x-4 hover:opacity-80 transition">
                        <i class="fas fa-video text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                            <p class="text-sm opacity-90">Analytics Dashboard</p>
                        </div>
                    </a>
                </div>
                <a href="/" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                    <i class="fas fa-home mr-2"></i>Trang chủ
                </a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <!-- Page Header -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 class="text-3xl font-bold text-orange-600 mb-2">
                <i class="fas fa-chart-line mr-3"></i>Analytics Dashboard
            </h2>
            <p class="text-gray-600">Phân tích chi tiết từ 23 job codes feedback</p>
        </div>

        <!-- Charts Row 1 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Error Distribution Pie Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Phân bố Lỗi theo Nhóm</h3>
                <canvas id="errorDistChart"></canvas>
            </div>

            <!-- Effect Type Error Rate Bar Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Tỷ lệ Lỗi theo Loại Effect</h3>
                <canvas id="effectErrorChart"></canvas>
            </div>
        </div>

        <!-- Charts Row 2 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Timeline Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Thời gian xử lý Trung bình</h3>
                <canvas id="timeEstimateChart"></canvas>
            </div>

            <!-- Success Rate Comparison -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Khả năng AI theo Loại Effect</h3>
                <canvas id="aiCapabilityChart"></canvas>
            </div>
        </div>

        <!-- Data Tables -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Chi tiết Thống kê</h3>
            
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-orange-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-orange-700 font-semibold">Loại Effect</th>
                            <th class="px-4 py-3 text-center text-orange-700 font-semibold">Tổng Cases</th>
                            <th class="px-4 py-3 text-center text-orange-700 font-semibold">Cases Lỗi</th>
                            <th class="px-4 py-3 text-center text-orange-700 font-semibold">Tỷ lệ Lỗi</th>
                            <th class="px-4 py-3 text-center text-orange-700 font-semibold">Risk Level</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Object Animation</td>
                            <td class="px-4 py-3 text-center">3</td>
                            <td class="px-4 py-3 text-center">3</td>
                            <td class="px-4 py-3 text-center font-bold text-red-600">100%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Rất Cao
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Creative/Fantasy</td>
                            <td class="px-4 py-3 text-center">2</td>
                            <td class="px-4 py-3 text-center">2</td>
                            <td class="px-4 py-3 text-center font-bold text-red-600">100%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Rất Cao
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Agent Composite</td>
                            <td class="px-4 py-3 text-center">2</td>
                            <td class="px-4 py-3 text-center">2</td>
                            <td class="px-4 py-3 text-center font-bold text-red-600">100%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Rất Cao
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Lifestyle/Người</td>
                            <td class="px-4 py-3 text-center">7</td>
                            <td class="px-4 py-3 text-center">5</td>
                            <td class="px-4 py-3 text-center font-bold text-orange-600">71%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                                    Cao
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Season/Weather</td>
                            <td class="px-4 py-3 text-center">3</td>
                            <td class="px-4 py-3 text-center">2</td>
                            <td class="px-4 py-3 text-center font-bold text-orange-600">67%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                                    Cao
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Day-to-Night</td>
                            <td class="px-4 py-3 text-center">3</td>
                            <td class="px-4 py-3 text-center">1</td>
                            <td class="px-4 py-3 text-center font-bold text-yellow-600">33%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                    Trung bình
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-orange-50 transition">
                            <td class="px-4 py-3">Furniture Staging</td>
                            <td class="px-4 py-3 text-center">3</td>
                            <td class="px-4 py-3 text-center">1</td>
                            <td class="px-4 py-3 text-center font-bold text-yellow-600">33%</td>
                            <td class="px-4 py-3 text-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                    Trung bình
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Error Distribution Pie Chart
        const ctx1 = document.getElementById('errorDistChart').getContext('2d');
        new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Hiểu sai yêu cầu', 'Chất lượng AI output', 'Trễ deadline', 'Logic/Physics sai'],
                datasets: [{
                    data: [35, 26, 22, 17],
                    backgroundColor: [
                        'rgba(255, 107, 53, 0.8)',
                        'rgba(255, 160, 122, 0.8)',
                        'rgba(255, 140, 97, 0.8)',
                        'rgba(255, 192, 159, 0.8)'
                    ],
                    borderColor: '#fff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });

        // Effect Error Rate Bar Chart
        const ctx2 = document.getElementById('effectErrorChart').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Object Anim', 'Creative', 'Agent Comp', 'Lifestyle', 'Season', 'Day-Night', 'Furniture'],
                datasets: [{
                    label: 'Tỷ lệ Lỗi (%)',
                    data: [100, 100, 100, 71, 67, 33, 33],
                    backgroundColor: [
                        'rgba(220, 38, 38, 0.7)',
                        'rgba(220, 38, 38, 0.7)',
                        'rgba(220, 38, 38, 0.7)',
                        'rgba(255, 107, 53, 0.7)',
                        'rgba(255, 107, 53, 0.7)',
                        'rgba(234, 179, 8, 0.7)',
                        'rgba(234, 179, 8, 0.7)'
                    ],
                    borderColor: [
                        'rgb(220, 38, 38)',
                        'rgb(220, 38, 38)',
                        'rgb(220, 38, 38)',
                        'rgb(255, 107, 53)',
                        'rgb(255, 107, 53)',
                        'rgb(234, 179, 8)',
                        'rgb(234, 179, 8)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Time Estimate Chart
        const ctx3 = document.getElementById('timeEstimateChart').getContext('2d');
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Day-Night', 'Sky Replace', 'Furniture', 'Season', 'Lifestyle Simple', 'Agent Comp', 'Lifestyle Complex', 'Creative'],
                datasets: [{
                    label: 'Thời gian (giờ)',
                    data: [1.25, 1.25, 1.75, 2.25, 2.5, 3.5, 4.5, 5],
                    backgroundColor: 'rgba(255, 107, 53, 0.6)',
                    borderColor: 'rgb(255, 107, 53)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + 'h';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // AI Capability Radar Chart
        const ctx4 = document.getElementById('aiCapabilityChart').getContext('2d');
        new Chart(ctx4, {
            type: 'radar',
            data: {
                labels: ['Day-Night', 'Furniture', 'Sky Replace', 'Season', 'Lifestyle Simple', 'Lifestyle Complex', 'Agent Comp', 'Creative', 'Object Anim'],
                datasets: [{
                    label: 'Khả năng AI',
                    data: [8, 8, 7, 6, 5, 3, 2, 1, 0],
                    fill: true,
                    backgroundColor: 'rgba(255, 107, 53, 0.2)',
                    borderColor: 'rgb(255, 107, 53)',
                    pointBackgroundColor: 'rgb(255, 107, 53)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 107, 53)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
  `)
})

// Analysis History page
app.get('/history', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lịch sử Phân tích - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/global-styles.css" rel="stylesheet">
    <script src="/static/router.js" defer></script>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="flex items-center space-x-4 hover:opacity-80 transition">
                        <i class="fas fa-video text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                            <p class="text-sm opacity-90">Lịch sử Phân tích AI</p>
                        </div>
                    </a>
                </div>
                <div class="flex space-x-2">
                    <a href="/ai-tools" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-robot mr-2"></i>AI Tools
                    </a>
                    <a href="/" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-home mr-2"></i>Trang chủ
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <!-- Page Header -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-history text-orange-500 mr-3"></i>
                        Lịch sử Phân tích AI
                    </h2>
                    <p class="text-gray-600">Theo dõi và xem lại các phân tích đã thực hiện</p>
                </div>
                <button onclick="loadHistory()" class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-lg">
                    <i class="fas fa-sync-alt mr-2"></i>Làm mới
                </button>
            </div>

            <!-- Statistics Cards -->
            <div id="stats" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Tổng phân tích</p>
                            <p id="stat-total" class="text-3xl font-bold text-blue-600">0</p>
                        </div>
                        <i class="fas fa-chart-line text-4xl text-blue-400"></i>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Thành công</p>
                            <p id="stat-success" class="text-3xl font-bold text-green-600">0%</p>
                        </div>
                        <i class="fas fa-check-circle text-4xl text-green-400"></i>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Tokens TB</p>
                            <p id="stat-tokens" class="text-3xl font-bold text-purple-600">0</p>
                        </div>
                        <i class="fas fa-coins text-4xl text-purple-400"></i>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Provider phổ biến</p>
                            <p id="stat-provider" class="text-2xl font-bold text-orange-600">-</p>
                        </div>
                        <i class="fas fa-robot text-4xl text-orange-400"></i>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="flex gap-4 mb-6">
                <select id="filter-type" onchange="loadHistory()" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">Tất cả loại</option>
                    <option value="brief">Brief Analysis</option>
                    <option value="error">Error Analysis</option>
                    <option value="prompt">Prompt Generation</option>
                    <option value="general">General Q&A</option>
                </select>
                <select id="filter-provider" onchange="loadHistory()" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">Tất cả provider</option>
                    <option value="gemini">Gemini</option>
                    <option value="glm">GLM</option>
                    <option value="openai">OpenAI</option>
                    <option value="claude">Claude</option>
                </select>
            </div>

            <!-- History List -->
            <div id="history-container" class="space-y-4">
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
                    <p>Đang tải...</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        let allHistory = [];

        // Load history on page load
        window.addEventListener('DOMContentLoaded', () => {
            loadStats();
            loadHistory();
        });

        async function loadStats() {
            try {
                const response = await fetch('/api/analysis/statistics');
                const data = await response.json();
                
                if (data.success) {
                    const stats = data.data;
                    document.getElementById('stat-total').textContent = stats.total;
                    document.getElementById('stat-success').textContent = stats.successRate + '%';
                    document.getElementById('stat-tokens').textContent = stats.avgTokens.toLocaleString();
                    
                    const topProvider = Object.keys(stats.byProvider).sort((a, b) => 
                        stats.byProvider[b] - stats.byProvider[a]
                    )[0];
                    document.getElementById('stat-provider').textContent = topProvider ? topProvider.toUpperCase() : '-';
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        async function loadHistory() {
            const container = document.getElementById('history-container');
            container.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-spinner fa-spin text-4xl mb-4"></i><p>Đang tải...</p></div>';

            try {
                const response = await fetch('/api/analysis/history?limit=50');
                const data = await response.json();
                
                if (!data.success || data.data.length === 0) {
                    container.innerHTML = '<div class="text-center py-12 text-gray-500"><i class="fas fa-inbox text-6xl mb-4 text-gray-300"></i><p class="text-lg">Chưa có lịch sử phân tích</p><p class="text-sm mt-2">Hãy thử AI Tools để tạo phân tích đầu tiên!</p></div>';
                    return;
                }

                allHistory = data.data;
                renderHistory(allHistory);
            } catch (error) {
                console.error('Error loading history:', error);
                container.innerHTML = '<div class="text-center py-8 text-red-500"><i class="fas fa-exclamation-triangle text-4xl mb-4"></i><p>Lỗi tải dữ liệu</p></div>';
            }
        }

        function renderHistory(history) {
            const container = document.getElementById('history-container');
            const filterType = document.getElementById('filter-type').value;
            const filterProvider = document.getElementById('filter-provider').value;

            let filtered = history;
            if (filterType) {
                filtered = filtered.filter(h => h.analysis_type === filterType);
            }
            if (filterProvider) {
                filtered = filtered.filter(h => h.provider === filterProvider);
            }

            if (filtered.length === 0) {
                container.innerHTML = '<div class="text-center py-12 text-gray-500"><i class="fas fa-filter text-6xl mb-4 text-gray-300"></i><p class="text-lg">Không tìm thấy kết quả</p></div>';
                return;
            }

            container.innerHTML = filtered.map(item => {
                const typeColors = {
                    brief: 'bg-blue-100 text-blue-700',
                    error: 'bg-red-100 text-red-700',
                    prompt: 'bg-purple-100 text-purple-700',
                    general: 'bg-green-100 text-green-700'
                };
                const providerIcons = {
                    gemini: 'fa-google',
                    glm: 'fa-brain',
                    openai: 'fa-robot',
                    claude: 'fa-user-tie'
                };
                
                return \`
                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 \${item.status === 'success' ? 'border-green-500' : 'border-red-500'}">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="px-3 py-1 rounded-full text-xs font-semibold \${typeColors[item.analysis_type] || 'bg-gray-100 text-gray-700'}">
                                        \${getTypeLabel(item.analysis_type)}
                                    </span>
                                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                        <i class="fas \${providerIcons[item.provider] || 'fa-robot'} mr-1"></i>
                                        \${item.provider.toUpperCase()}
                                    </span>
                                    <span class="text-xs text-gray-500">
                                        <i class="fas fa-clock mr-1"></i>
                                        \${formatTime(item.created_at)}
                                    </span>
                                </div>
                                <p class="text-gray-800 font-medium mb-2">\${item.input_text}</p>
                                <div class="flex items-center gap-4 text-sm text-gray-600">
                                    <span><i class="fas fa-stopwatch mr-1"></i>\${item.processing_time_ms}ms</span>
                                    <span><i class="fas fa-coins mr-1"></i>\${item.token_usage} tokens</span>
                                    <span class="\${item.status === 'success' ? 'text-green-600' : 'text-red-600'}">
                                        <i class="fas fa-\${item.status === 'success' ? 'check-circle' : 'times-circle'} mr-1"></i>
                                        \${item.status === 'success' ? 'Thành công' : 'Lỗi'}
                                    </span>
                                </div>
                            </div>
                            <button onclick="viewDetail('\${item.id}')" class="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition">
                                <i class="fas fa-eye mr-2"></i>Chi tiết
                            </button>
                        </div>
                    </div>
                \`;
            }).join('');
        }

        function getTypeLabel(type) {
            const labels = {
                brief: 'Brief Analysis',
                error: 'Error Analysis',
                prompt: 'Prompt Generation',
                general: 'General Q&A'
            };
            return labels[type] || type;
        }

        function formatTime(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();
            const diff = now - date;
            
            if (diff < 60000) return 'Vừa xong';
            if (diff < 3600000) return Math.floor(diff / 60000) + ' phút trước';
            if (diff < 86400000) return Math.floor(diff / 3600000) + ' giờ trước';
            return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
        }

        function viewDetail(id) {
            window.location.href = \`/analysis/\${id}\`;
        }
    </script>
</body>
</html>
  `)
})

// Documents Library page
app.get('/documents', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thư viện Tài liệu - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/global-styles.css" rel="stylesheet">
    <script src="/static/router.js" defer></script>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/" class="flex items-center space-x-4 hover:opacity-80 transition">
                        <i class="fas fa-video text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                            <p class="text-sm opacity-90">Thư viện Tài liệu</p>
                        </div>
                    </a>
                </div>
                <div class="flex space-x-2">
                    <a href="/ai-tools" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-robot mr-2"></i>AI Tools
                    </a>
                    <a href="/" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-home mr-2"></i>Trang chủ
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <!-- Page Header -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-folder-open text-orange-500 mr-3"></i>
                        Thư viện Tài liệu
                    </h2>
                    <p class="text-gray-600">Quản lý và truy cập tài liệu R&D từ Google Drive, Canva, Dropbox</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="showAddForm()" class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg">
                        <i class="fas fa-plus mr-2"></i>Thêm Tài liệu
                    </button>
                    <button onclick="loadDocuments()" class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-lg">
                        <i class="fas fa-sync-alt mr-2"></i>Làm mới
                    </button>
                </div>
            </div>

            <!-- Add Document Form (Hidden by default) -->
            <div id="addForm" class="hidden bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-file-plus text-blue-600 mr-2"></i>
                        Thêm Tài liệu Mới
                    </h3>
                    <button onclick="hideAddForm()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <form id="docForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-heading mr-2 text-blue-500"></i>Tiêu đề *
                        </label>
                        <input type="text" id="doc-title" required 
                               class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                               placeholder="VD: Báo cáo Phân tích AI Video Q1/2026">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-tag mr-2 text-green-500"></i>Danh mục *
                        </label>
                        <select id="doc-category" required 
                                class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
                            <option value="">Chọn danh mục</option>
                            <option value="analysis">📊 Phân tích</option>
                            <option value="plan">📋 Kế hoạch</option>
                            <option value="technical">⚙️ Kỹ thuật</option>
                            <option value="operation">🔧 Vận hành</option>
                            <option value="design">🎨 Thiết kế</option>
                            <option value="demo">🎬 Demo</option>
                            <option value="tool">🛠️ Tool</option>
                        </select>
                    </div>
                    
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-link mr-2 text-purple-500"></i>Embed URL (Google Drive / Canva) *
                        </label>
                        <input type="url" id="doc-url" required 
                               class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                               placeholder="https://drive.google.com/file/d/... hoặc https://www.canva.com/design/...">
                        <p class="text-xs text-gray-500 mt-1">
                            💡 Hỗ trợ: Google Docs/Drive, Canva, Dropbox. File cần được share public.
                        </p>
                    </div>
                    
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-align-left mr-2 text-orange-500"></i>Mô tả
                        </label>
                        <textarea id="doc-summary" rows="3" 
                                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                  placeholder="Mô tả ngắn gọn nội dung tài liệu..."></textarea>
                    </div>
                    
                    <div class="md:col-span-2 flex gap-3">
                        <button type="submit" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition shadow-lg font-semibold">
                            <i class="fas fa-save mr-2"></i>Lưu Tài liệu
                        </button>
                        <button type="button" onclick="hideAddForm()" class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                            <i class="fas fa-ban mr-2"></i>Hủy
                        </button>
                    </div>
                </form>
            </div>

            <!-- Statistics -->
            <div id="stats" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Tổng tài liệu</p>
                            <p id="stat-total" class="text-3xl font-bold text-blue-600">0</p>
                        </div>
                        <i class="fas fa-file-alt text-4xl text-blue-400"></i>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Lượt xem</p>
                            <p id="stat-views" class="text-3xl font-bold text-green-600">0</p>
                        </div>
                        <i class="fas fa-eye text-4xl text-green-400"></i>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Lượt tải</p>
                            <p id="stat-downloads" class="text-3xl font-bold text-purple-600">0</p>
                        </div>
                        <i class="fas fa-download text-4xl text-purple-400"></i>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Dung lượng</p>
                            <p id="stat-size" class="text-2xl font-bold text-orange-600">0 MB</p>
                        </div>
                        <i class="fas fa-database text-4xl text-orange-400"></i>
                    </div>
                </div>
            </div>

            <!-- Category Filter -->
            <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onclick="filterCategory('')" class="filter-btn active px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition whitespace-nowrap">
                    <i class="fas fa-th mr-2"></i>Tất cả
                </button>
                <button onclick="filterCategory('analysis')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-chart-bar mr-2"></i>Phân tích
                </button>
                <button onclick="filterCategory('plan')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-calendar-alt mr-2"></i>Kế hoạch
                </button>
                <button onclick="filterCategory('technical')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-cogs mr-2"></i>Kỹ thuật
                </button>
                <button onclick="filterCategory('operation')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-tasks mr-2"></i>Vận hành
                </button>
                <button onclick="filterCategory('design')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-paint-brush mr-2"></i>Thiết kế
                </button>
                <button onclick="filterCategory('demo')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-video mr-2"></i>Demo
                </button>
                <button onclick="filterCategory('tool')" class="filter-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                    <i class="fas fa-toolbox mr-2"></i>Công cụ
                </button>
            </div>

            <!-- Documents Grid -->
            <div id="documents-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="text-center py-8 text-gray-500 col-span-full">
                    <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
                    <p>Đang tải...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Document Viewer Modal -->
    <div id="viewer-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b">
                <div class="flex-1">
                    <h3 id="modal-title" class="text-2xl font-bold text-gray-800"></h3>
                    <p id="modal-category" class="text-sm text-gray-600 mt-1"></p>
                </div>
                <button onclick="closeViewer()" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Modal Body -->
            <div class="flex-1 overflow-auto p-6">
                <div id="embed-container" class="w-full h-full min-h-[600px]">
                    <!-- Embed content will be loaded here -->
                </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-6 border-t bg-gray-50 flex items-center justify-between">
                <div id="modal-meta" class="text-sm text-gray-600"></div>
                <div class="flex gap-2">
                    <button onclick="incrementDownload()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-download mr-2"></i>Tải xuống
                    </button>
                    <button onclick="closeViewer()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let allDocuments = [];
        let currentDocument = null;

        // Load documents on page load
        window.addEventListener('DOMContentLoaded', () => {
            loadDocuments();
        });

        async function loadDocuments() {
            const container = document.getElementById('documents-container');
            container.innerHTML = '<div class="text-center py-8 text-gray-500 col-span-full"><i class="fas fa-spinner fa-spin text-4xl mb-4"></i><p>Đang tải...</p></div>';

            try {
                const response = await fetch('/api/documents');
                const data = await response.json();
                
                if (!data.success || data.data.length === 0) {
                    container.innerHTML = '<div class="text-center py-12 text-gray-500 col-span-full"><i class="fas fa-inbox text-6xl mb-4 text-gray-300"></i><p class="text-lg">Chưa có tài liệu</p></div>';
                    return;
                }

                allDocuments = data.data;
                updateStats(allDocuments);
                renderDocuments(allDocuments);
            } catch (error) {
                console.error('Error loading documents:', error);
                container.innerHTML = '<div class="text-center py-8 text-red-500 col-span-full"><i class="fas fa-exclamation-triangle text-4xl mb-4"></i><p>Lỗi tải dữ liệu</p></div>';
            }
        }

        function updateStats(documents) {
            const total = documents.length;
            const views = documents.reduce((sum, doc) => sum + doc.view_count, 0);
            const downloads = documents.reduce((sum, doc) => sum + doc.download_count, 0);
            const size = documents.reduce((sum, doc) => sum + doc.file_size, 0) / 1024 / 1024;

            document.getElementById('stat-total').textContent = total;
            document.getElementById('stat-views').textContent = views;
            document.getElementById('stat-downloads').textContent = downloads;
            document.getElementById('stat-size').textContent = size.toFixed(1) + ' MB';
        }

        function renderDocuments(documents) {
            const container = document.getElementById('documents-container');

            if (documents.length === 0) {
                container.innerHTML = '<div class="text-center py-12 text-gray-500 col-span-full"><i class="fas fa-filter text-6xl mb-4 text-gray-300"></i><p class="text-lg">Không tìm thấy tài liệu</p></div>';
                return;
            }

            const categoryIcons = {
                analysis: 'fa-chart-bar',
                plan: 'fa-calendar-alt',
                technical: 'fa-cogs',
                operation: 'fa-tasks',
                design: 'fa-paint-brush',
                demo: 'fa-video',
                tool: 'fa-toolbox'
            };

            const embedBadges = {
                gdrive: '<span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"><i class="fab fa-google-drive mr-1"></i>Google Drive</span>',
                canva: '<span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"><i class="fas fa-palette mr-1"></i>Canva</span>',
                dropbox: '<span class="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full"><i class="fab fa-dropbox mr-1"></i>Dropbox</span>',
                local: '<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"><i class="fas fa-file mr-1"></i>Local</span>'
            };

            container.innerHTML = documents.map(doc => {
                const icon = categoryIcons[doc.category] || 'fa-file';
                const badge = embedBadges[doc.embed_type] || '';
                
                return \`
                    <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200 hover:border-orange-300 cursor-pointer" onclick="viewDocument('\${doc.id}')">
                        <div class="flex items-start justify-between mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-xl">
                                <i class="fas \${icon}"></i>
                            </div>
                            \${badge}
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">\${doc.title}</h3>
                        <p class="text-sm text-gray-600 mb-4 line-clamp-3">\${doc.summary || 'Không có mô tả'}</p>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span><i class="fas fa-eye mr-1"></i>\${doc.view_count} lượt xem</span>
                            <span><i class="fas fa-download mr-1"></i>\${doc.download_count} lượt tải</span>
                        </div>
                    </div>
                \`;
            }).join('');
        }

        function filterCategory(category) {
            // Update button styles
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-orange-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            event.target.classList.add('active', 'bg-orange-500', 'text-white');
            event.target.classList.remove('bg-gray-200', 'text-gray-700');

            // Filter documents
            const filtered = category ? allDocuments.filter(doc => doc.category === category) : allDocuments;
            renderDocuments(filtered);
        }

        async function viewDocument(id) {
            currentDocument = allDocuments.find(doc => doc.id === id);
            if (!currentDocument) return;

            // Update modal
            document.getElementById('modal-title').textContent = currentDocument.title;
            document.getElementById('modal-category').textContent = getCategoryLabel(currentDocument.category);
            document.getElementById('modal-meta').innerHTML = \`
                <span class="mr-4"><i class="fas fa-eye mr-1"></i>\${currentDocument.view_count} lượt xem</span>
                <span><i class="fas fa-hdd mr-1"></i>\${(currentDocument.file_size / 1024).toFixed(0)} KB</span>
            \`;

            // Load embed
            const embedContainer = document.getElementById('embed-container');
            if (currentDocument.embed_url) {
                embedContainer.innerHTML = \`
                    <iframe 
                        src="\${currentDocument.embed_url}" 
                        class="w-full h-full min-h-[600px] border-0 rounded-lg"
                        allowfullscreen
                        loading="lazy"
                    ></iframe>
                \`;
            } else {
                embedContainer.innerHTML = \`
                    <div class="flex items-center justify-center h-full text-gray-500">
                        <div class="text-center">
                            <i class="fas fa-file-alt text-6xl mb-4"></i>
                            <p class="text-lg">Tài liệu chưa có embed URL</p>
                            <p class="text-sm mt-2">Vui lòng thêm Google Drive hoặc Canva link</p>
                        </div>
                    </div>
                \`;
            }

            // Increment view count
            await fetch(\`/api/documents/\${id}\`);

            // Show modal
            document.getElementById('viewer-modal').classList.remove('hidden');
            document.getElementById('viewer-modal').classList.add('flex');
        }

        function closeViewer() {
            document.getElementById('viewer-modal').classList.add('hidden');
            document.getElementById('viewer-modal').classList.remove('flex');
            loadDocuments(); // Reload to get updated view counts
        }

        async function incrementDownload() {
            if (!currentDocument) return;
            
            // In real app, this would trigger actual download
            alert('Download sẽ được thực hiện sau khi tích hợp Cloudflare R2');
            
            // Increment download count in storage
            await fetch(\`/api/documents/\${currentDocument.id}/download\`, { method: 'POST' });
        }

        function getCategoryLabel(category) {
            const labels = {
                analysis: 'Phân tích',
                plan: 'Kế hoạch',
                technical: 'Kỹ thuật',
                operation: 'Vận hành',
                design: 'Thiết kế',
                demo: 'Demo',
                tool: 'Công cụ'
            };
            return labels[category] || category;
        }

        // Form handlers
        function showAddForm() {
            document.getElementById('addForm').classList.remove('hidden');
            document.getElementById('doc-title').focus();
        }

        function hideAddForm() {
            document.getElementById('addForm').classList.add('hidden');
            document.getElementById('docForm').reset();
        }

        // Handle form submission
        document.getElementById('docForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang lưu...';

            try {
                const formData = {
                    title: document.getElementById('doc-title').value.trim(),
                    category: document.getElementById('doc-category').value,
                    embed_url: document.getElementById('doc-url').value.trim(),
                    summary: document.getElementById('doc-summary').value.trim()
                };

                const response = await fetch('/api/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    // Success notification
                    alert('✅ Tài liệu đã được thêm thành công!');
                    hideAddForm();
                    loadDocuments(); // Reload list
                } else {
                    alert('❌ Lỗi: ' + (result.error || 'Không thể thêm tài liệu'));
                }
            } catch (error) {
                console.error('Error adding document:', error);
                alert('❌ Lỗi kết nối. Vui lòng thử lại.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    </script>
</body>
</html>
  `)
})

// Document Embed Viewer page (new route with dual mode)
app.get('/doc/:id', async (c) => {
  const id = c.req.param('id');
  const doc = await storage.getDocumentById(id);
  
  if (!doc) {
    return c.html(`<h1>Document not found</h1>`, 404);
  }
  
  // Increment view count
  await storage.incrementDocumentView(id);
  
  const embedTypeIcons = {
    gdrive: '<i class="fab fa-google-drive text-blue-500"></i>',
    canva: '<i class="fas fa-palette text-purple-500"></i>',
    dropbox: '<i class="fab fa-dropbox text-cyan-500"></i>',
    local: '<i class="fas fa-file text-gray-500"></i>'
  };
  
  const icon = embedTypeIcons[doc.embed_type || 'local'];
  
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${doc.title} - Fotober R&D Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/global-styles.css" rel="stylesheet">
    <script src="/static/router.js" defer></script>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="gradient-orange text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <a href="/documents" class="flex items-center space-x-4 hover:opacity-80 transition">
                    <i class="fas fa-arrow-left text-2xl"></i>
                    <div>
                        <h1 class="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                        <p class="text-sm opacity-90">Quay lại Thư viện</p>
                    </div>
                </a>
                <div class="flex space-x-2">
                    <button onclick="toggleViewMode()" id="viewModeBtn" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-expand mr-2"></i>Xem bên ngoài
                    </button>
                    <a href="/" class="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition">
                        <i class="fas fa-home mr-2"></i>Trang chủ
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 main-content">
        <!-- Document Header -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                        ${icon}
                        <span class="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">
                            ${doc.category}
                        </span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">${doc.title}</h1>
                    <p class="text-gray-600 mb-4">${doc.summary || 'Không có mô tả'}</p>
                    <div class="flex items-center gap-6 text-sm text-gray-500">
                        <span><i class="fas fa-eye mr-2"></i>${doc.view_count} lượt xem</span>
                        <span><i class="fas fa-download mr-2"></i>${doc.download_count} lượt tải</span>
                        <span><i class="fas fa-hdd mr-2"></i>${(doc.file_size / 1024).toFixed(1)} KB</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Embed Viewer -->
        <div id="embedViewer" class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-eye mr-2 text-orange-500"></i>Xem Tài liệu
                </h2>
                <div class="flex gap-2">
                    <button onclick="openExternal()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-external-link-alt mr-2"></i>Mở Tab Mới
                    </button>
                </div>
            </div>
            
            <div id="embedContainer" class="w-full min-h-[600px] bg-gray-50 rounded-xl overflow-hidden">
                ${doc.embed_url ? `
                    <iframe 
                        src="${doc.embed_url}" 
                        class="w-full h-full min-h-[700px] border-0"
                        allowfullscreen
                        loading="lazy"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    ></iframe>
                ` : `
                    <div class="flex items-center justify-center h-full min-h-[400px] text-gray-500">
                        <div class="text-center">
                            <i class="fas fa-file-alt text-6xl mb-4"></i>
                            <p class="text-lg font-semibold">Tài liệu chưa có Embed URL</p>
                            <p class="text-sm mt-2">Vui lòng thêm Google Drive hoặc Canva link</p>
                        </div>
                    </div>
                `}
            </div>
        </div>

        <!-- External View Notice -->
        <div id="externalNotice" class="hidden bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 text-center">
            <i class="fas fa-external-link-alt text-6xl text-blue-500 mb-4"></i>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Đang mở tài liệu ở tab mới</h2>
            <p class="text-gray-600 mb-6">Vui lòng kiểm tra tab mới hoặc cho phép popup trên trình duyệt</p>
            <button onclick="toggleViewMode()" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition shadow-lg">
                <i class="fas fa-arrow-left mr-2"></i>Quay lại Xem Embed
            </button>
        </div>
    </div>

    <script>
        const docUrl = '${doc.embed_url || ''}';
        let isExternalMode = false;

        function toggleViewMode() {
            isExternalMode = !isExternalMode;
            const embedViewer = document.getElementById('embedViewer');
            const externalNotice = document.getElementById('externalNotice');
            const viewModeBtn = document.getElementById('viewModeBtn');

            if (isExternalMode) {
                embedViewer.classList.add('hidden');
                externalNotice.classList.remove('hidden');
                viewModeBtn.innerHTML = '<i class="fas fa-compress mr-2"></i>Xem Embed';
                if (docUrl) {
                    window.open(docUrl, '_blank');
                }
            } else {
                embedViewer.classList.remove('hidden');
                externalNotice.classList.add('hidden');
                viewModeBtn.innerHTML = '<i class="fas fa-expand mr-2"></i>Xem bên ngoài';
            }
        }

        function openExternal() {
            if (docUrl) {
                window.open(docUrl, '_blank');
            } else {
                alert('Tài liệu chưa có Embed URL');
            }
        }
    </script>
</body>
</html>
  `)
})

// Document download endpoint
app.post('/api/documents/:id/download', async (c) => {
  try {
    const id = c.req.param('id');
    await storage.incrementDocumentDownload(id);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// ============================================
// AI ANALYSIS API ROUTES
// ============================================

/**
 * POST /api/ai/analyze - Main AI analysis endpoint
 * Request body: {
 *   type: 'brief' | 'error' | 'prompt' | 'general',
 *   input: string,
 *   context?: object,
 *   config?: { provider: 'gemini' | 'glm' | 'openai' | 'claude', model?: string, temperature?: number }
 * }
 */
app.post('/api/ai/analyze', async (c) => {
  try {
    const request: AIAnalysisRequest = await c.req.json()

    // Validate request
    if (!request.input || !request.input.trim()) {
      return c.json({
        success: false,
        error: 'Input không được để trống',
      }, 400)
    }

    // Default to general analysis if type not specified
    if (!request.type) {
      request.type = 'general'
    }

    // Pass env bindings to AI service
    request.env = c.env

    // Call AI service
    const result = await analyzeWithAI(request)

    return c.json(result)
  } catch (error: any) {
    console.error('AI Analysis Error:', error)
    return c.json({
      success: false,
      error: error.message || 'Lỗi khi phân tích',
    }, 500)
  }
})

/**
 * POST /api/ai/brief - Specialized brief analysis
 */
app.post('/api/ai/brief', async (c) => {
  try {
    const { input, config } = await c.req.json()

    const result = await analyzeWithAI({
      type: 'brief',
      input,
      config,
      env: c.env,
    })

    return c.json(result)
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500)
  }
})

/**
 * POST /api/ai/error - Specialized error analysis
 */
app.post('/api/ai/error', async (c) => {
  try {
    const { input, config } = await c.req.json()

    const result = await analyzeWithAI({
      type: 'error',
      input,
      config,
      env: c.env,
    })

    return c.json(result)
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500)
  }
})

/**
 * POST /api/ai/prompt - Specialized prompt generation
 */
app.post('/api/ai/prompt', async (c) => {
  try {
    const { input, config } = await c.req.json()

    const result = await analyzeWithAI({
      type: 'prompt',
      input,
      config,
      env: c.env,
    })

    return c.json(result)
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500)
  }
})

/**
 * GET /api/ai/models - Get available AI models
 */
app.get('/api/ai/models', (c) => {
  return c.json({
    success: true,
    providers: {
      gemini: {
        name: 'Gemini',
        description: 'Google AI - Mặc định, miễn phí, mạnh mẽ',
        models: ['gpt-5', 'gpt-5.1', 'gpt-5.2', 'gpt-5-mini', 'gpt-5-nano'],
        default: 'gpt-5',
      },
      glm: {
        name: 'GLM',
        description: 'Zhipu AI - AI Trung Quốc',
        models: ['gpt-5', 'gpt-5.1', 'gpt-5.2'],
        default: 'gpt-5',
      },
      openai: {
        name: 'OpenAI',
        description: 'GPT-4 Turbo - Mạnh nhất',
        models: ['gpt-5', 'gpt-5.1', 'gpt-5.2'],
        default: 'gpt-5',
      },
      claude: {
        name: 'Claude',
        description: 'Anthropic - Tốt nhất cho phân tích',
        models: ['gpt-5', 'gpt-5.1'],
        default: 'gpt-5',
      },
    },
  })
})

// ============================================
// ANALYSIS HISTORY & STATISTICS API
// ============================================

// Get analysis history
app.get('/api/analysis/history', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    
    const logs = await storage.getAnalysisLogs(limit, offset);
    
    return c.json({
      success: true,
      data: logs,
      total: logs.length,
      limit,
      offset
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// Get analysis statistics
app.get('/api/analysis/statistics', async (c) => {
  try {
    const stats = await storage.getAnalysisStatistics();
    return c.json({ success: true, data: stats });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// Get single analysis by ID
app.get('/api/analysis/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const log = await storage.getAnalysisLogById(id);
    
    if (!log) {
      return c.json({ success: false, error: 'Analysis not found' }, 404);
    }
    
    return c.json({ success: true, data: log });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// ============================================
// DOCUMENTS API
// ============================================

// Get all documents
app.get('/api/documents', async (c) => {
  try {
    const docs = await storage.getDocuments();
    return c.json({ success: true, data: docs });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// Get single document
app.get('/api/documents/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const doc = await storage.getDocumentById(id);
    
    if (!doc) {
      return c.json({ success: false, error: 'Document not found' }, 404);
    }
    
    // Increment view count
    await storage.incrementDocumentView(id);
    
    return c.json({ success: true, data: doc });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// ============================================
// PROMPT TEMPLATES API
// ============================================

// Get all prompt templates
app.get('/api/prompts', async (c) => {
  try {
    const templates = await storage.getPromptTemplates();
    return c.json({ success: true, data: templates });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// ============================================
// ERROR PATTERNS API
// ============================================

// Get all error patterns
app.get('/api/errors', async (c) => {
  try {
    const errors = await storage.getErrorPatterns();
    return c.json({ success: true, data: errors });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
})

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
