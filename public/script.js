// R&D AI Video Intelligence Platform
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script initialized");

    // ========== NAVIGATION ==========
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    window.showSection = function(targetId) {
        sections.forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === '#' + targetId);
        });
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            window.showSection(this.getAttribute('href').replace('#', ''));
        });
    });

    window.showSection('overview');

    // ========== MODAL SYSTEM ==========
    const feedbackModal = document.getElementById('feedbackModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openFullPageBtn = document.getElementById('openFullPageBtn');
    const fullPageView = document.getElementById('fullPageView');
    const fullPageContent = document.getElementById('fullPageContent');
    const closeFullPageBtn = document.getElementById('closeFullPageBtn');

    function closeModal() {
        if (feedbackModal) feedbackModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function closeFullPage() {
        if (fullPageView) fullPageView.classList.add('hidden');
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeFullPageBtn) closeFullPageBtn.addEventListener('click', closeFullPage);

    // ========== EXCEL BUTTON HANDLER ==========
    const toggleSaleEmbedBtn = document.getElementById('toggleSaleEmbedBtn');
    const saleEmbedContainer = document.getElementById('saleEmbedContainer');
    if (toggleSaleEmbedBtn && saleEmbedContainer) {
        toggleSaleEmbedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            saleEmbedContainer.classList.toggle('hidden');
            console.log("Excel toggled:", !saleEmbedContainer.classList.contains('hidden'));
        });
    }

    // ========== DASHBOARD CONTENT (FULL HTML) ==========
    const dashboardHTML = `<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fafafa; color: #1a1a1a; line-height: 1.4; }
.tab-container { background: white; border-bottom: 1px solid #e0e0e0; position: sticky; top: 0; z-index: 100; }
.tab-nav { max-width: 1200px; margin: 0 auto; display: flex; gap: 2px; padding: 8px 20px 0; }
.tab-button { padding: 10px 20px; background: #f5f5f5; border: 1px solid #e0e0e0; border-bottom: none; border-radius: 8px 8px 0 0; cursor: pointer; font-size: 0.85em; font-weight: 500; color: #666; transition: all 0.2s; }
.tab-button:hover { background: #eee; color: #333; }
.tab-button.active { background: white; color: #1a1a1a; border-bottom: 2px solid white; font-weight: 600; }
.tab-content { display: none; padding: 20px; }
.tab-content.active { display: block; }
.container { max-width: 1200px; margin: 0 auto; }
.header { margin-bottom: 30px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
.header h1 { font-size: 1.5em; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
.header p { font-size: 0.85em; color: #666; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 30px; }
.stat-card { background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 6px; }
.stat-label { font-size: 0.75em; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
.stat-number { font-size: 1.8em; font-weight: 600; line-height: 1; margin-bottom: 4px; }
.stat-percentage { font-size: 0.85em; color: #888; }
.error-table { background: white; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; margin-bottom: 20px; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
th { background: #f5f5f5; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.5px; color: #666; border-bottom: 1px solid #e0e0e0; }
td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; }
tbody tr:hover { background: #fafafa; }
.severity-high { color: #d32f2f; font-weight: 600; }
.severity-medium { color: #f57c00; font-weight: 600; }
.goal-comparison { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
.goal-card { background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 6px; }
.goal-title { font-size: 0.85em; font-weight: 600; margin-bottom: 12px; }
.goal-bars { display: flex; flex-direction: column; gap: 8px; }
.goal-bar { display: flex; align-items: center; gap: 8px; }
.bar-label { width: 60px; font-size: 0.75em; color: #666; }
.bar-fill { flex: 1; height: 20px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.bar-progress { height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.7em; }
.checklist { background: white; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; margin-bottom: 20px; }
.checklist-item { padding: 8px 0; font-size: 0.85em; border-bottom: 1px solid #f0f0f0; }
.checklist-item:last-child { border-bottom: none; }
.guide-section { background: white; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; margin-bottom: 20px; }
.guide-section h2 { font-size: 1.2em; font-weight: 600; margin-bottom: 12px; color: #1a1a1a; }
.code-block { background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 0.75em; line-height: 1.5; margin: 10px 0; overflow-x: auto; white-space: pre-wrap; }
.tool-table { width: 100%; margin: 15px 0; }
.tool-table th { background: #f5f5f5; padding: 8px; font-size: 0.75em; }
.tool-table td { padding: 8px; font-size: 0.8em; }
.chart-container { background: white; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; margin-bottom: 20px; }
.chart-title { font-size: 1em; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
.footer { text-align: center; padding: 20px; font-size: 0.75em; color: #999; border-top: 1px solid #e0e0e0; margin-top: 30px; }
</style>

<div class="tab-container">
    <div class="tab-nav">
        <button class="tab-button active" onclick="switchDashboardTab(0)">Phân Tích Lỗi</button>
        <button class="tab-button" onclick="switchDashboardTab(1)">Hướng Dẫn Prompt</button>
    </div>
</div>

<div class="tab-content active">
    <div class="container">
        <div class="header">
            <h1>Phân Tích Lỗi AI Video</h1>
            <p>Dashboard tổng hợp chất lượng dự án</p>
        </div>

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
                        <td>Không đọc context</td>
                    </tr>
                    <tr>
                        <td><strong>HTJAN15008Rev</strong></td>
                        <td>Preparing dinner có người</td>
                        <td>Chỉ có bàn + đồ ăn</td>
                        <td>Bỏ qua động từ hành động</td>
                    </tr>
                    <tr>
                        <td><strong>DUJAN04005</strong></td>
                        <td>Nước chảy từ vòi phun</td>
                        <td>Nước xuất hiện ngẫu nhiên</td>
                        <td>Không quan sát cấu trúc</td>
                    </tr>
                    <tr>
                        <td><strong>QUJAN25001</strong></td>
                        <td>2 AI: living + dining</td>
                        <td>Chỉ làm 1, làm sai phòng</td>
                        <td>Thiếu checklist</td>
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
                        <td>Đàn ông mặc bikini</td>
                        <td class="severity-high">Nghiêm trọng</td>
                    </tr>
                    <tr>
                        <td><strong>LIJAN07001</strong></td>
                        <td>Quân cờ nhảy đánh nhau</td>
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
                        <td>Tuần lộc tách đàn</td>
                        <td class="severity-medium">Trung bình</td>
                    </tr>
                    <tr>
                        <td><strong>CHJAN24002</strong></td>
                        <td>Viền trắng quanh agent</td>
                        <td class="severity-medium">Trung bình</td>
                    </tr>
                </tbody>
            </table>
        </div>

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
                <div class="goal-card">
                    <div class="goal-title">Lỗi thẩm mỹ</div>
                    <div class="goal-bars">
                        <div class="goal-bar">
                            <span class="bar-label">Hiện tại</span>
                            <div class="bar-fill">
                                <div class="bar-progress" style="width: 16%; background: #f57c00;">16%</div>
                            </div>
                        </div>
                        <div class="goal-bar">
                            <span class="bar-label">Mục tiêu</span>
                            <div class="bar-fill">
                                <div class="bar-progress" style="width: 5%; background: #388e3c;">5%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="checklist">
            <h2 class="chart-title">Checklist QC trước gửi khách</h2>
            <div class="checklist-item">☐ Đủ số lượng output theo yêu cầu?</div>
            <div class="checklist-item">☐ Đúng nội dung yêu cầu?</div>
            <div class="checklist-item">☐ Không có watermark/logo công cụ?</div>
            <div class="checklist-item">☐ Mặt người không bị biến dạng?</div>
            <div class="checklist-item">☐ Chuyển động tự nhiên, không giật?</div>
            <div class="checklist-item">☐ Không có viền trắng/artifacts?</div>
            <div class="checklist-item">☐ Độ phân giải đúng yêu cầu?</div>
            <div class="checklist-item">☐ Xem lại toàn bộ video từ đầu đến cuối?</div>
        </div>
    </div>
</div>

<div class="tab-content">
    <div class="container">
        <div class="header">
            <h1>Hướng Dẫn Prompt Chuẩn</h1>
            <p>Template và best practices cho AI Video Generation</p>
        </div>

        <div class="guide-section">
            <h2>Master Prompt Template</h2>
            <div class="code-block">[SCENE DESCRIPTION]
Bối cảnh, thời gian, ánh sáng

[SUBJECTS]
Người/vật, đặc điểm cụ thể, vị trí

[ACTIONS/MOTION]
Hành động CHI TIẾT, timing, sequence

[CONSTRAINTS]
Giới hạn vật lý, logic, phải tuân thủ

[CAMERA]
Góc quay, movement, stability

[NEGATIVE PROMPT]
Những gì KHÔNG ĐƯỢC xuất hiện</div>
        </div>

        <div class="guide-section">
            <h2>Chọn công cụ theo loại lỗi</h2>
            <table class="tool-table">
                <thead>
                    <tr>
                        <th>Loại lỗi</th>
                        <th>Công cụ chính</th>
                        <th>Công cụ hỗ trợ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Chuyển động nhóm sai</td>
                        <td>Kling 2.6 Pro</td>
                        <td>KlingO1 Edit</td>
                    </tr>
                    <tr>
                        <td>Mặt người biến dạng</td>
                        <td>Kling 2.6 Pro</td>
                        <td>KlingO1 Edit</td>
                    </tr>
                    <tr>
                        <td>Trang phục sai</td>
                        <td>Kling 2.6 Pro</td>
                        <td>Veo 3.1</td>
                    </tr>
                    <tr>
                        <td>Logic vật lý sai</td>
                        <td>Veo 3.1</td>
                        <td>KlingO1 Edit</td>
                    </tr>
                    <tr>
                        <td>Nước/lửa/khói</td>
                        <td>Veo 3.1</td>
                        <td>Nano Banana Pro</td>
                    </tr>
                    <tr>
                        <td>Object movement</td>
                        <td>Nano Banana Pro</td>
                        <td>KlingO1 Edit</td>
                    </tr>
                    <tr>
                        <td>Chuyển cảnh/transition</td>
                        <td>Nano Banana Pro</td>
                        <td>Veo 3.1</td>
                    </tr>
                    <tr>
                        <td>Thêm người realistic</td>
                        <td>Kling 2.6 Pro</td>
                        <td>Veo 3.1</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="checklist">
            <h2 class="chart-title">Checklist trước khi generate</h2>
            <div class="checklist-item">☐ Đọc brief 2 lần, highlight từ khóa hành động</div>
            <div class="checklist-item">☐ Xác định context địa lý/thời tiết</div>
            <div class="checklist-item">☐ Liệt kê TẤT CẢ deliverables cần làm</div>
            <div class="checklist-item">☐ Chọn công cụ phù hợp loại effect</div>
            <div class="checklist-item">☐ Viết prompt theo template chuẩn</div>
            <div class="checklist-item">☐ Thêm negative prompt đầy đủ</div>
            <div class="checklist-item">☐ Mô tả hành động ĐỘNG TỪ cụ thể</div>
            <div class="checklist-item">☐ Chỉ định giới hạn vật lý/logic</div>
        </div>

        <div class="checklist">
            <h2 class="chart-title">Checklist sau khi generate</h2>
            <div class="checklist-item">☐ Xem video từ đầu đến cuối (không skip)</div>
            <div class="checklist-item">☐ Kiểm tra mặt người từng segment</div>
            <div class="checklist-item">☐ Kiểm tra logic chuyển động</div>
            <div class="checklist-item">☐ Xác nhận không có watermark/logo</div>
            <div class="checklist-item">☐ Đếm lại số lượng output</div>
            <div class="checklist-item">☐ So sánh với brief gốc lần cuối</div>
            <div class="checklist-item">☐ Test playback trên device khác</div>
        </div>

        <div class="footer">
            <p>Template version 1.0 • Cập nhật: 31/01/2026</p>
        </div>
    </div>
</div>`;

    // ========== FEEDBACK CARD CLICK HANDLER ==========
    const feedbackCards = document.querySelectorAll('[data-feedback-id]');
    feedbackCards.forEach(card => {
        card.addEventListener('click', function() {
            if (feedbackModal && modalContent) {
                modalContent.innerHTML = dashboardHTML;
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ========== FULL PAGE HANDLER ==========
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (fullPageView && fullPageContent) {
                fullPageContent.innerHTML = dashboardHTML;
                fullPageView.classList.remove('hidden');
            }
        });
    }

    // ========== DASHBOARD TAB SWITCHING ==========
    window.switchDashboardTab = function(index) {
        const buttons = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-content');
        buttons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        contents.forEach((content, i) => {
            content.classList.toggle('active', i === index);
        });
    };

    console.log("All scripts loaded successfully");
});
