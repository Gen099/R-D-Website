// R&D AI Video Intelligence Platform - Dashboard Integration
document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard Script initialized");

    // ========== NAVIGATION & UI ==========
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const dynamicFooter = document.getElementById('dynamicFooter');

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-30 hidden transition-opacity duration-300';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (window.innerWidth < 768) overlay.classList.toggle('hidden');
        });
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.add('hidden');
        });
    }

    window.showSection = function(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active-tab');
                section.style.display = 'block';
            } else {
                section.classList.remove('active-tab');
                section.style.display = 'none';
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + targetId) item.classList.add('active');
        });
        if (dynamicFooter) dynamicFooter.style.display = (targetId === 'overview') ? 'none' : 'block';
        if (window.location.hash !== '#' + targetId) history.pushState(null, null, '#' + targetId);
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            window.showSection(targetId);
            if (window.innerWidth < 768 && sidebar) {
                sidebar.classList.remove('active');
                overlay.classList.add('hidden');
            }
        });
    });

    const initialHash = window.location.hash ? window.location.hash.substring(1) : 'overview';
    window.showSection(initialHash);

    // ========== MODAL & FULL PAGE SYSTEM ==========
    const feedbackModal = document.getElementById('feedbackModal');
    const libraryModal = document.getElementById('libraryModal');
    
    let feedbackFullPageView = document.getElementById('feedbackFullPageView');
    if (!feedbackFullPageView) {
        feedbackFullPageView = document.createElement('div');
        feedbackFullPageView.id = 'feedbackFullPageView';
        feedbackFullPageView.className = 'hidden fixed inset-0 bg-white z-[60] overflow-y-auto';
        feedbackFullPageView.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <div class="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center justify-between">
                    <h2 id="feedbackFullPageTitle" class="text-2xl font-bold text-gray-800">Phân Tích 23 Job Feedback & Tối Ưu Quy Trình AI</h2>
                    <button id="closeFeedbackFullPageBtn" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
                        <i class="fas fa-times mr-1"></i>Đóng
                    </button>
                </div>
                <div id="feedbackFullPageContent" class="p-8"></div>
            </div>
        `;
        document.body.appendChild(feedbackFullPageView);
    }

    function closeAllModals() {
        [feedbackModal, libraryModal, feedbackFullPageView].forEach(m => {
            if (m) m.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('[id$="CloseBtn"], [id^="close"]').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // ========== DASHBOARD HTML CONTENT ==========
    const dashboardHTML = `<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #fafafa;
            color: #1a1a1a;
            line-height: 1.4;
        }

        .tab-container {
            background: white;
            border-bottom: 1px solid #e0e0e0;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .tab-nav {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            gap: 2px;
            padding: 8px 20px 0;
        }

        .tab-button {
            padding: 10px 20px;
            background: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-bottom: none;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            font-size: 0.85em;
            font-weight: 500;
            color: #666;
            transition: all 0.2s;
        }

        .tab-button:hover {
            background: #eee;
            color: #333;
        }

        .tab-button.active {
            background: white;
            color: #1a1a1a;
            border-bottom: 2px solid white;
            font-weight: 600;
        }

        .tab-content {
            display: none;
            padding: 20px;
        }

        .tab-content.active {
            display: block;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }

        .header h1 {
            font-size: 1.5em;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 4px;
        }

        .header p {
            font-size: 0.85em;
            color: #666;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            border: 1px solid #e0e0e0;
            padding: 16px;
            border-radius: 6px;
        }

        .stat-label {
            font-size: 0.75em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }

        .stat-number {
            font-size: 1.8em;
            font-weight: 600;
            line-height: 1;
            margin-bottom: 4px;
        }

        .stat-percentage {
            font-size: 0.85em;
            color: #888;
        }

        .chart-container {
            background: white;
            border: 1px solid #e0e0e0;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .chart-title {
            font-size: 1em;
            font-weight: 600;
            margin-bottom: 16px;
            color: #1a1a1a;
        }

        .error-table {
            background: white;
            border: 1px solid #e0e0e0;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85em;
        }

        th {
            background: #f5f5f5;
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 0.8em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #666;
            border-bottom: 1px solid #e0e0e0;
        }

        td {
            padding: 10px 12px;
            border-bottom: 1px solid #f0f0f0;
        }

        tbody tr:hover {
            background: #fafafa;
        }

        td:first-child {
            font-weight: 500;
            color: #333;
        }

        .severity-high {
            color: #d32f2f;
            font-weight: 600;
        }

        .severity-medium {
            color: #f57c00;
            font-weight: 600;
        }

        .goal-comparison {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .goal-card {
            background: white;
            border: 1px solid #e0e0e0;
            padding: 16px;
            border-radius: 6px;
        }

        .goal-title {
            font-size: 0.85em;
            font-weight: 600;
            margin-bottom: 12px;
        }

        .goal-bars {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .goal-bar {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .bar-label {
            width: 60px;
            font-size: 0.75em;
            color: #666;
        }

        .bar-fill {
            flex: 1;
            height: 20px;
            background: #f0f0f0;
            border-radius: 4px;
            overflow: hidden;
        }

        .bar-progress {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.7em;
        }

        .guide-section {
            background: white;
            border: 1px solid #e0e0e0;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .guide-section h2 {
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 12px;
            color: #1a1a1a;
        }

        .code-block {
            background: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 12px;
            font-family: 'Courier New', monospace;
            font-size: 0.8em;
            line-height: 1.5;
            margin: 10px 0;
            overflow-x: auto;
            white-space: pre-wrap;
        }

        .tool-table {
            width: 100%;
            margin: 15px 0;
        }

        .tool-table th {
            background: #f5f5f5;
            padding: 8px;
            font-size: 0.75em;
        }

        .tool-table td {
            padding: 8px;
            font-size: 0.8em;
        }

        ul {
            margin: 10px 0 10px 20px;
            font-size: 0.85em;
            line-height: 1.6;
        }

        @media (max-width: 768px) {
            .goal-comparison {
                grid-template-columns: 1fr;
            }
        }
    </style>

    <!-- Tab Navigation -->
    <div class="tab-container">
        <div class="tab-nav">
            <button class="tab-button active" onclick="switchTab(0)">Phân Tích Lỗi</button>
            <button class="tab-button" onclick="switchTab(1)">Hướng Dẫn Prompt</button>
        </div>
    </div>

    <!-- Tab 1: Error Analysis Dashboard -->
    <div class="tab-content active">
        <div class="container">
            <div class="header">
                <h1>Phân Tích Lỗi AI Video</h1>
                <p>Dashboard tổng hợp chất lượng dự án</p>
            </div>

            <!-- Stats Overview -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Tổng dự án</div>
                    <div class="stat-number" style="color: #333;">22</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Có lỗi</div>
                    <div class="stat-number" style="color: #d32f2f;">18</div>
                    <div class="stat-percentage">82%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Không lỗi</div>
                    <div class="stat-number" style="color: #388e3c;">4</div>
                    <div class="stat-percentage">18%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Trễ deadline</div>
                    <div class="stat-number" style="color: #f57c00;">6</div>
                    <div class="stat-percentage">27%</div>
                </div>
            </div>

            <!-- Error Details Table -->
            <div class="error-table">
                <h2 class="chart-title">Lỗi hiểu sai yêu cầu - Top cases</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Mã Job</th>
                            <th>Yêu cầu</th>
                            <th>Thực tế làm</th>
                            <th>Vấn đề</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>TADEC31004</strong></td>
                            <td>Hiện trạng → mùa xuân</td>
                            <td>Tuyết → mùa xuân</td>
                            <td>Không đọc context "we don't get snow"</td>
                        </tr>
                        <tr>
                            <td><strong>HTJAN15008Rev</strong></td>
                            <td>"Preparing dinner" có người</td>
                            <td>Chỉ có bàn + đồ ăn</td>
                            <td>Bỏ qua động từ hành động</td>
                        </tr>
                        <tr>
                            <td><strong>DUJAN04005</strong></td>
                            <td>Nước chảy từ vòi phun</td>
                            <td>Nước xuất hiện ngẫu nhiên</td>
                            <td>Không quan sát cấu trúc fountain</td>
                        </tr>
                        <tr>
                            <td><strong>QUJAN25001</strong></td>
                            <td>2 AI: living + dining</td>
                            <td>Chỉ làm 1, làm sai phòng</td>
                            <td>Thiếu checklist deliverables</td>
                        </tr>
                        <tr>
                            <td><strong>QUJAN19003</strong></td>
                            <td>AI dựng nhà + timelapse</td>
                            <td>Không làm phần dựng nhà</td>
                            <td>Bỏ sót yêu cầu chính</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Technical Errors -->
            <div class="error-table">
                <h2 class="chart-title">Lỗi kỹ thuật AI</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Mã Job</th>
                            <th>Lỗi cụ thể</th>
                            <th>Mức độ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>NHJAN13010</strong></td>
                            <td>Đàn ông mặc bikini thay vì quần bơi</td>
                            <td class="severity-high">Nghiêm trọng</td>
                        </tr>
                        <tr>
                            <td><strong>LIJAN07001</strong></td>
                            <td>Quân cờ nhảy đánh nhau, không theo luật</td>
                            <td class="severity-high">Nghiêm trọng</td>
                        </tr>
                        <tr>
                            <td><strong>HTJAN07002rev2</strong></td>
                            <td>Mặt người biến dạng</td>
                            <td class="severity-high">Nghiêm trọng</td>
                        </tr>
                        <tr>
                            <td><strong>CHDEC11004</strong></td>
                            <td>Agent đóng băng, clip vỡ</td>
                            <td class="severity-high">Nghiêm trọng</td>
                        </tr>
                        <tr>
                            <td><strong>TLNOV14022rev4</strong></td>
                            <td>Tuần lộc tách đàn, đứng sai vị trí</td>
                            <td class="severity-medium">Trung bình</td>
                        </tr>
                        <tr>
                            <td><strong>CHJAN24002</strong></td>
                            <td>Viền trắng quanh agent bay</td>
                            <td class="severity-medium">Trung bình</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Goals Comparison -->
            <div class="chart-container">
                <h2 class="chart-title">Mục tiêu cải thiện (30 ngày)</h2>
                <div class="goal-comparison">
                    <div class="goal-card">
                        <div class="goal-title">Lỗi hiểu sai yêu cầu</div>
                        <div class="goal-bars">
                            <div class="goal-bar">
                                <span class="bar-label">Hiện tại</span>
                                <div class="bar-fill">
                                    <div class="bar-progress" style="width: 35%; background: #d32f2f;">35%</div>
                                </div>
                            </div>
                            <div class="goal-bar">
                                <span class="bar-label">Mục tiêu</span>
                                <div class="bar-fill">
                                    <div class="bar-progress" style="width: 10%; background: #388e3c;">10%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="goal-card">
                        <div class="goal-title">Lỗi kỹ thuật AI</div>
                        <div class="goal-bars">
                            <div class="goal-bar">
                                <span class="bar-label">Hiện tại</span>
                                <div class="bar-fill">
                                    <div class="bar-progress" style="width: 27%; background: #d32f2f;">27%</div>
                                </div>
                            </div>
                            <div class="goal-bar">
                                <span class="bar-label">Mục tiêu</span>
                                <div class="bar-fill">
                                    <div class="bar-progress" style="width: 15%; background: #388e3c;">15%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="goal-card">
                        <div class="goal-title">Trễ deadline</div>
                        <div class="goal-bars">
                            <div class="goal-bar">
                                <span class="bar-label">Hiện tại</span>
                                <div class="bar-fill">
                                    <div class="bar-progress" style="width: 27%; background: #d32f2f;">27%</div>
                                </div>
                            </div>
                            <div class="goal-bar">
                                <span class="bar-label">Mục tiêu</span>
                                <div class="bar-fill">
                                    <div class="bar-progress" style="width: 10%; background: #388e3c;">10%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tab 2: Prompt Guide -->
    <div class="tab-content">
        <div class="container">
            <div class="header">
                <h1>Hướng Dẫn Prompt Chuẩn</h1>
                <p>Template và best practices cho AI Video Generation</p>
            </div>

            <div class="guide-section">
                <h2>📝 Template Prompt Chuẩn</h2>
                <div class="code-block">═══════════════════════════════════════════════════
                  PROMPT TEMPLATE
═══════════════════════════════════════════════════

[MÔ TẢ CẢNH]
→ Chi tiết cảnh muốn tạo...

[BẮT BUỘC CÓ]
→ Yếu tố phải xuất hiện
→ Chuyển động cụ thể
→ Số lượng người/vật

[KHÔNG ĐƯỢC CÓ]
→ Không thêm đối tượng lạ
→ Không thay đổi cấu trúc gốc
→ Không watermark/logo

[CAMERA]
→ Cố định / Di chuyển
→ Góc quay cụ thể
→ Không rung, không chớp

[PHONG CÁCH]
→ Realistic / Cinematic
→ Ánh sáng ấm / lạnh
→ Tone màu mong muốn

═══════════════════════════════════════════════════</div>
            </div>

            <div class="guide-section">
                <h2>✅ Checklist QC Trước Gửi Khách</h2>
                <div class="code-block">┌─────────────────────────────────────────────────┐
│              QUALITY CONTROL                    │
├─────────────────────────────────────────────────┤
│ ☐ Đủ số lượng output theo yêu cầu?             │
│ ☐ Đúng nội dung yêu cầu?                       │
│ ☐ Không có watermark/logo công cụ?             │
│ ☐ Mặt người không bị biến dạng?                │
│ ☐ Chuyển động tự nhiên, không giật?            │
│ ☐ Không có viền trắng/artifacts?               │
│ ☐ Độ phân giải đúng yêu cầu?                   │
│ ☐ Xem lại toàn bộ video từ đầu đến cuối?       │
│ └─────────────────────────────────────────────────┘</div>
            </div>

            <div class="guide-section">
                <h2>📊 Bảng Mapping Công Cụ - Loại Effect</h2>
                <table class="tool-table">
                    <thead>
                        <tr>
                            <th>Loại Effect</th>
                            <th>Công cụ</th>
                            <th>Lưu ý</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Chuyển mùa</td>
                            <td>Envato</td>
                            <td>Cần 2 ảnh đầu-cuối</td>
                        </tr>
                        <tr>
                            <td>Thêm người</td>
                            <td>Higgsfield</td>
                            <td>Prompt chi tiết</td>
                        </tr>
                        <tr>
                            <td>Nội thất xuất hiện</td>
                            <td>Higgsfield</td>
                            <td>General effect</td>
                        </tr>
                        <tr>
                            <td>Day-to-night</td>
                            <td>Envato</td>
                            <td>Timelapse setting</td>
                        </tr>
                        <tr>
                            <td>Nước/Lửa/Khói</td>
                            <td>Envato</td>
                            <td>Physics-based</td>
                        </tr>
                        <tr>
                            <td>Tạo ảnh staging</td>
                            <td>Gemini</td>
                            <td>Xóa watermark!</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="guide-section">
                <h2>🛠️ Cải Tiến Quy Trình</h2>
                <ul>
                    <li>☐ Double-check số lượng deliverables với brief</li>
                    <li>☐ Tạo checklist QC trước gửi output</li>
                    <li>☐ Xây dựng thư viện prompt chuẩn</li>
                    <li>☐ Mapping công cụ phù hợp từng loại effect</li>
                    <li>☐ Template xác nhận yêu cầu với sale</li>
                    <li>☐ Training prompt engineering cho team</li>
                    <li>☐ Hệ thống feedback loop học từ lỗi</li>
                    <li>☐ Tài liệu giải thích giới hạn AI</li>
                    <li>☐ KPI tracking chất lượng từng người</li>
                </ul>
            </div>
        </div>
    </div>`;

    // ========== FEEDBACK CARD HANDLER ==========
    const feedbackCards = document.querySelectorAll('[data-feedback-id]');
    feedbackCards.forEach(card => {
        card.addEventListener('click', function() {
            if (feedbackModal) {
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                const modalContent = feedbackModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.innerHTML = `
                        <div class="mb-4 flex justify-between items-center">
                            <h2 class="text-2xl font-bold text-gray-800">Phân Tích 23 Job Feedback & Tối Ưu Quy Trình AI</h2>
                            <button onclick="document.getElementById('feedbackModal').classList.add('hidden'); document.body.style.overflow = 'auto';" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div class="overflow-y-auto max-h-[70vh]">
                            ${dashboardHTML}
                        </div>
                        <div class="mt-4 flex gap-2">
                            <button onclick="document.getElementById('feedbackFullPageView').classList.remove('hidden');" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                <i class="fas fa-expand mr-1"></i>Mở Full Page
                            </button>
                            <button onclick="document.getElementById('feedbackModal').classList.add('hidden'); document.body.style.overflow = 'auto';" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
                                Đóng
                            </button>
                        </div>
                    `;
                }
            }
        });
    });

    // ========== FULL PAGE VIEW HANDLER ==========
    const openFullPageBtn = document.getElementById('openFeedbackFullPageBtn');
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            feedbackFullPageView.classList.remove('hidden');
            const fullPageContent = document.getElementById('feedbackFullPageContent');
            if (fullPageContent) {
                fullPageContent.innerHTML = dashboardHTML;
            }
        });
    }

    // ========== CLOSE FULL PAGE HANDLER ==========
    const closeFullPageBtn = document.getElementById('closeFeedbackFullPageBtn');
    if (closeFullPageBtn) {
        closeFullPageBtn.addEventListener('click', function() {
            feedbackFullPageView.classList.add('hidden');
        });
    }

    // ========== TAB SWITCHING FUNCTION ==========
    window.switchTab = function(index) {
        const buttons = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-content');
        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
                contents[i].classList.add('active');
            } else {
                btn.classList.remove('active');
                contents[i].classList.remove('active');
            }
        });
    };

    // ========== EXCEL BUTTON HANDLER ==========
    const toggleSaleEmbedBtn = document.getElementById('toggleSaleEmbedBtn');
    if (toggleSaleEmbedBtn) {
        toggleSaleEmbedBtn.addEventListener('click', function() {
            const saleEmbed = document.getElementById('saleEmbed');
            if (saleEmbed) {
                saleEmbed.classList.toggle('hidden');
            }
        });
    }

    console.log("Dashboard Script fully loaded");
});
