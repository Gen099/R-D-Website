import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { analyzeWithAI, type AIAnalysisRequest, type AIAnalysisResponse } from './services/ai'

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

// Home - main dashboard
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fotober R&D Intelligence Hub</title>
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
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
        }
        
        .section-title {
            background: linear-gradient(135deg, #FF6B35, #FFA07A);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
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
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
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
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Tổng tài liệu</p>
                        <p class="text-3xl font-bold text-orange-600">5</p>
                    </div>
                    <i class="fas fa-file-alt text-4xl text-orange-300"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Job Codes phân tích</p>
                        <p class="text-3xl font-bold text-orange-600">23</p>
                    </div>
                    <i class="fas fa-tasks text-4xl text-orange-300"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Loại AI Effects</p>
                        <p class="text-3xl font-bold text-orange-600">25+</p>
                    </div>
                    <i class="fas fa-magic text-4xl text-orange-300"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">AI Models</p>
                        <p class="text-3xl font-bold text-orange-600">4</p>
                    </div>
                    <i class="fas fa-brain text-4xl text-orange-300"></i>
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
    <footer class="mt-16 py-8 bg-gradient-to-r from-orange-600 to-orange-400 text-white">
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
  const documents = [
    {
      id: 1,
      title: 'Báo cáo Phân tích Hiện trạng',
      description: 'Phân tích toàn diện về AI Video trong lĩnh vực bất động sản',
      category: 'Báo cáo',
      date: '29/01/2026',
      path: '/document/analysis-report'
    },
    {
      id: 2,
      title: 'Kế hoạch Công việc R&D AI Video',
      description: 'Lộ trình chi tiết cho R&D Specialist Q1/2026',
      category: 'Kế hoạch',
      date: '29/01/2026',
      path: '/document/work-plan'
    },
    {
      id: 3,
      title: 'Tài liệu Kỹ thuật Video',
      description: 'Danh mục hiệu ứng, motion, add-on và quy trình sản xuất',
      category: 'Kỹ thuật',
      date: '29/01/2026',
      path: '/document/technical-doc'
    },
    {
      id: 4,
      title: 'Tài liệu Vận hành R&D',
      description: 'Quy trình giao tiếp, đánh giá và chuyển giao kỹ thuật',
      category: 'Vận hành',
      date: '29/01/2026',
      path: '/document/operation-doc'
    },
    {
      id: 5,
      title: 'Thiết kế Hệ thống Platform',
      description: 'Kiến trúc R&D AI Video Intelligence Platform',
      category: 'Thiết kế',
      date: '29/01/2026',
      path: '/document/platform-design'
    }
  ]
  
  return c.json({ success: true, documents })
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
    <div class="container mx-auto px-6 py-8">
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
    <div class="container mx-auto px-6 py-8">
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
    <div class="container mx-auto px-6 py-8">
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

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
