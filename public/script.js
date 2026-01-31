// R&D AI Video Intelligence Platform - Raw Content Integration
document.addEventListener('DOMContentLoaded', function() {
    console.log("Raw Content Script initialized");

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
                    <h2 id="feedbackFullPageTitle" class="text-2xl font-bold text-gray-800"></h2>
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

    // ========== RAW CONTENT DATA ==========
    const rawContent = `# PHÂN TÍCH LỖI AI VIDEO

---

## 📊 TỔNG QUAN THỐNG KÊ

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TỔNG SỐ DỰ ÁN: 22                        │
├─────────────────────────────────────────────────────────────┤
│  ❌ Có feedback lỗi:     18 (82%)                           │
│  ✅ Không ghi nhận lỗi:   4 (18%)                           │
│  🔄 Từ chối xử lý:        6 (27%)                           │
│  ⏰ Trễ deadline:         6 (27%)                           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 📈 PHÂN BỐ LOẠI LỖI

\`\`\`
Lỗi hiểu sai yêu cầu     ████████████████████  35%
Lỗi kỹ thuật AI          ███████████████       27%
Lỗi tiến độ/deadline     ████████████          22%
Lỗi thẩm mỹ/chất lượng   █████████             16%
\`\`\`

---

## 🔴 NHÓM 1: LỖI HIỂU SAI YÊU CẦU

| Mã Job | Yêu cầu | Thực tế làm | Vấn đề |
|--------|---------|-------------|--------|
| TADEC31004 | Hiện trạng → mùa xuân | Tuyết → mùa xuân | Không đọc context "we don't get snow" |
| HTJAN15008Rev | "Preparing dinner" có người | Chỉ có bàn + đồ ăn | Bỏ qua động từ hành động |
| DUJAN04005 | Nước chảy từ vòi phun | Nước xuất hiện ngẫu nhiên | Không quan sát cấu trúc fountain |
| QUJAN25001 | 2 AI: living + dining | Chỉ làm 1, làm sai phòng | Thiếu checklist deliverables |
| QUJAN19003 | AI dựng nhà + timelapse | Không làm phần dựng nhà | Bỏ sót yêu cầu chính |
| LIDEC10001 | Ông già Noel đẩy xe vào ống khói | Xe rơi xuống đất | Sai luồng hành động |

**→ NGUYÊN NHÂN GỐC:**
- Không đọc kỹ brief
- Thiếu xác nhận lại với sale/khách
- Không có checklist số lượng output

---

## 🟠 NHÓM 2: LỖI KỸ THUẬT AI

| Mã Job | Lỗi cụ thể | Mức độ |
|--------|------------|--------|
| TLNOV14022rev4 | Tuần lộc tách đàn, đứng sai vị trí | Trung bình |
| NHJAN13010 | Đàn ông mặc bikini thay vì quần bơi | Nghiêm trọng |
| LIJAN07001 | Quân cờ nhảy đánh nhau, không theo luật | Nghiêm trọng |
| HTJAN07002rev2 | Mặt người biến dạng | Nghiêm trọng |
| CHDEC11004 | Agent đóng băng, clip vỡ | Nghiêm trọng |
| CHJAN24002 | Viền trắng quanh agent bay | Trung bình |

**→ NGUYÊN NHÂN GỐC:**
- Prompt thiếu constraint cụ thể
- Không có negative prompt
- Giới hạn công cụ AI chưa được mapping

---

## 🟡 NHÓM 3: LỖI THẨM MỸ & CHẤT LƯỢNG

| Mã Job | Vấn đề | Feedback |
|--------|--------|----------|
| THJAN20030Rev | Trời xanh tĩnh, zoom đơn giản | "Như ảnh tĩnh rồi zoom vào" |
| QUJAN16003 | Output trông không tự nhiên | "Trông hơi vô duyên" |
| MNJAN2001 | Người fake, cử chỉ gợi cảm | "Look like fixing to go to bedroom" |
| MNJAN2001 | Logo Gemini xuất hiện | Lỗi cơ bản không xóa watermark |
| CAJAN21001rev7 | Thiếu narrative control | Khách không hài lòng, từ chối thanh toán |

**→ NGUYÊN NHÂN GỐC:**
- Thiếu QC trước gửi khách
- Không xóa watermark
- Không review thẩm mỹ tổng thể

---

## 🟣 NHÓM 4: LỖI TIẾN ĐỘ

\`\`\`
┌────────────────┬──────────┬─────────────┬───────────┐
│ Mã Job         │ Hẹn      │ Thực tế     │ Trễ       │
├────────────────┼──────────┼─────────────┼───────────┤
│ HTJAN22005     │ Trong DL │ 2h sáng     │ ~9 tiếng  │
│ QUJAN19003Rev2 │ 5h chiều │ 10h đêm     │ ~5 tiếng  │
│ QUJAN21008     │ 2 tiếng  │ Trễ nhiều   │ ~5 tiếng  │
│ HTJAN07002rev2 │ Theo DL  │ Trễ         │ ~4 tiếng  │
│ HTJAN26003     │ Theo DL  │ Trễ         │ ~3 tiếng  │
└────────────────┴──────────┴─────────────┴───────────┘
\`\`\`

**→ NGUYÊN NHÂN GỐC:**
- Ước lượng thời gian sai
- Không báo sớm khi gặp khó khăn
- Workload không cân đối

---

## 🛠️ CẢI TIẾN

☐ Double-check số lượng deliverables với brief
☐ Tạo checklist QC trước gửi output
☐ Xây dựng thư viện prompt chuẩn
☐ Mapping công cụ phù hợp từng loại effect
☐ Template xác nhận yêu cầu với sale
☐ Training prompt engineering cho team
☐ Hệ thống feedback loop học từ lỗi
☐ Tài liệu giải thích giới hạn AI 
☐ KPI tracking chất lượng từng người

---

## 📝 TEMPLATE PROMPT CHUẨN

\`\`\`
═══════════════════════════════════════════════════
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

═══════════════════════════════════════════════════
\`\`\`

---

## ✅ CHECKLIST QC TRƯỚC GỬI KHÁCH

\`\`\`
┌─────────────────────────────────────────────────┐
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
│ └─────────────────────────────────────────────────┘
\`\`\`

---

## 📊 BẢNG MAPPING CÔNG CỤ - LOẠI EFFECT

\`\`\`
┌─────────────────────┬─────────────┬───────────────────┐
│ Loại Effect         │ Công cụ     │ Lưu ý             │
├─────────────────────┼─────────────┼───────────────────┤
│ Chuyển mùa          │ Envato      │ Cần 2 ảnh đầu-cuối│
│ Thêm người          │ Higgsfield  │ Prompt chi tiết   │
│ Nội thất xuất hiện  │ Higgsfield  │ General effect    │
│ Day-to-night        │ Envato      │ Timelapse setting │
│ Nước/Lửa/Khói       │ Envato      │ Physics-based     │
│ Tạo ảnh staging     │ Gemini      │ Xóa watermark!    │
└─────────────────────┴─────────────┴───────────────────┘
\`\`\`

---

## 🎯 MỤC TIÊU CẢI THIỆN

\`\`\`
Hiện tại                      Mục tiêu (30 ngày)
────────────────────────────────────────────────
Lỗi yêu cầu:  35%     →      < 10%
Lỗi kỹ thuật: 27%     →      < 15%
Trễ deadline: 27%     →      < 10%
Lỗi thẩm mỹ:  16%     →      < 5%
────────────────────────────────────────────────
Tổng feedback lỗi: 82% →     < 30%
\`\`\`

---

## 👥 PHÂN CÔNG THEO DÕI

| Người làm | Số job có lỗi | Loại lỗi chính |
|-----------|---------------|----------------|
| Trang | 4 | Kỹ thuật AI, hiểu sai yêu cầu |
| Hoài | 2 | Hiểu sai yêu cầu |
| Mai Anh | 2 | Kỹ thuật, tiến độ |
| Chưa ghi nhận | 14 | Đa dạng |`;

    const feedbackData = {
        '1': {
            title: 'Phân Tích 23 Job Feedback & Tối Ưu Quy Trình AI',
            content: `<div class="bg-white p-6 rounded-lg font-mono text-sm whitespace-pre-wrap border shadow-inner overflow-x-auto">${rawContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`
        }
    };

    const libraryData = {
        '1': { title: 'Danh Sách Công Cụ AI', content: `<div class="p-4 bg-blue-50 rounded-xl"><p class="font-bold mb-2">Công cụ tạo ảnh:</p><ul class="list-disc ml-5 text-sm"><li>Google Nano Banana Pro</li><li>Flux</li><li>Zimage</li></ul></div>` },
        '2': { title: 'Virtual Staging', content: `<div class="p-4 bg-orange-50 rounded-xl"><p class="font-bold mb-2">Prompt Mẫu:</p><code class="text-xs">Realistic interior staging, scandinavian style...</code></div>` },
        '3': { title: 'Day-to-Night', content: `<div class="p-4 bg-green-50 rounded-xl"><p class="font-bold mb-2">Veo 3.1 Prompt:</p><code class="text-xs">Cinematic day to night transition, sunset lighting...</code></div>` }
    };

    let currentFeedbackId = null;

    document.querySelectorAll('.feedback-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-feedback-id');
            if (feedbackData[id]) {
                currentFeedbackId = id;
                document.getElementById('modalTitle').textContent = feedbackData[id].title;
                document.getElementById('modalContent').innerHTML = feedbackData[id].content;
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const openFullPageBtn = document.getElementById('openFullPageBtn');
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (currentFeedbackId && feedbackData[currentFeedbackId]) {
                document.getElementById('feedbackFullPageTitle').textContent = feedbackData[currentFeedbackId].title;
                document.getElementById('feedbackFullPageContent').innerHTML = feedbackData[currentFeedbackId].content;
                feedbackModal.classList.add('hidden');
                feedbackFullPageView.classList.remove('hidden');
            }
        });
    }

    const closeFeedbackFullPageBtn = document.getElementById('closeFeedbackFullPageBtn');
    if (closeFeedbackFullPageBtn) {
        closeFeedbackFullPageBtn.addEventListener('click', function() {
            feedbackFullPageView.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    document.querySelectorAll('.library-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-library-id');
            if (libraryData[id] && libraryModal) {
                document.getElementById('libraryModalTitle').textContent = libraryData[id].title;
                document.getElementById('libraryModalContent').innerHTML = libraryData[id].content;
                libraryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const submitPasscodeBtn = document.getElementById('submitPasscodeBtn');
    if (submitPasscodeBtn) {
        submitPasscodeBtn.addEventListener('click', function() {
            const input = document.getElementById('passcodeInput');
            if (input.value === '2026') {
                document.getElementById('reportsPasscodeLayer').style.display = 'none';
                document.getElementById('reportContent').style.display = 'block';
            } else {
                const err = document.getElementById('passcodeError');
                if (err) { err.textContent = 'Sai passcode!'; err.classList.remove('hidden'); }
            }
        });
    }
});
