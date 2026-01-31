// R&D AI Video Intelligence Platform - Final Unified Script
document.addEventListener('DOMContentLoaded', function() {
    console.log("Unified Script initialized");

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

    // ========== MODAL SYSTEM ==========
    const feedbackModal = document.getElementById('feedbackModal');
    const libraryModal = document.getElementById('libraryModal');
    const roadmapModal = document.getElementById('roadmapModal');

    function closeAllModals() {
        [feedbackModal, libraryModal, roadmapModal].forEach(m => m && m.classList.add('hidden'));
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('[id$="CloseBtn"], [id^="close"]').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // ========== FEEDBACK DATA & HANDLER ==========
    const feedbackData = {
        '1': {
            title: 'Phân Tích 23 Job Feedback - Báo Cáo Hiện Trạng',
            content: `
<div class="space-y-6 text-gray-800">
    <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
        <h4 class="font-bold text-blue-900 mb-3 text-xl flex items-center"><i class="fas fa-chart-pie mr-2"></i>Tổng Quan Feedback</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded shadow-sm text-center">
                <div class="text-3xl font-bold text-blue-600">23</div>
                <div class="text-sm text-gray-600">Tổng số Jobs</div>
            </div>
            <div class="bg-white p-4 rounded shadow-sm text-center">
                <div class="text-3xl font-bold text-red-600">35%</div>
                <div class="text-sm text-gray-600">Hiểu sai yêu cầu</div>
            </div>
            <div class="bg-white p-4 rounded shadow-sm text-center">
                <div class="text-3xl font-bold text-orange-600">26%</div>
                <div class="text-sm text-gray-600">Chất lượng AI kém</div>
            </div>
            <div class="bg-white p-4 rounded shadow-sm text-center">
                <div class="text-3xl font-bold text-purple-600">22%</div>
                <div class="text-sm text-gray-600">Trễ Deadline</div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-600">
            <h4 class="font-bold text-red-900 mb-3 flex items-center"><i class="fas fa-exclamation-circle mr-2"></i>Vấn Đề Kỹ Thuật AI</h4>
            <ul class="space-y-2 text-sm">
                <li>• <strong>Biến dạng mặt:</strong> Ghi nhận tại job HTJAN07002rev2.</li>
                <li>• <strong>Hành vi không tự nhiên:</strong> Người trông fake (MNJAN2001).</li>
                <li>• <strong>Lỗi render:</strong> Viền cắt trắng, agent đóng băng (CHJAN24002).</li>
                <li>• <strong>Lỗi Tool:</strong> Lộ logo Gemini trong sản phẩm (MNJAN2001).</li>
            </ul>
        </div>
        <div class="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-600">
            <h4 class="font-bold text-yellow-900 mb-3 flex items-center"><i class="fas fa-brain mr-2"></i>Vấn Đề Nhận Thức (Brief)</h4>
            <ul class="space-y-2 text-sm">
                <li>• <strong>Context địa phương:</strong> Làm tuyết ở nơi không có tuyết.</li>
                <li>• <strong>Sai logic:</strong> Quân cờ di chuyển không đúng luật.</li>
                <li>• <strong>Bỏ sót yêu cầu:</strong> Order 2 AI chỉ làm 1 (QUJAN25001).</li>
                <li>• <strong>Hiểu sai động từ:</strong> "Preparing dinner" nhưng thiếu người.</li>
            </ul>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
        <h4 class="font-bold text-green-900 mb-3 text-lg flex items-center"><i class="fas fa-check-double mr-2"></i>Tỷ Lệ Lỗi Theo Hiệu Ứng</h4>
        <div class="overflow-x-auto">
            <table class="w-full text-sm bg-white rounded">
                <tr class="bg-green-100"><th class="p-2 text-left">Hiệu ứng</th><th class="p-2 text-center">Tỷ lệ lỗi</th><th class="p-2 text-left">Ghi chú</th></tr>
                <tr><td class="p-2 border-b">Object Animation</td><td class="p-2 border-b text-center font-bold text-red-600">100%</td><td class="p-2 border-b">Quân cờ, xe, nước chảy</td></tr>
                <tr><td class="p-2 border-b">Agent Composite</td><td class="p-2 border-b text-center font-bold text-red-600">100%</td><td class="p-2 border-b">Ghép người vào cảnh</td></tr>
                <tr><td class="p-2 border-b">Người / Lifestyle</td><td class="p-2 border-b text-center font-bold text-orange-600">71%</td><td class="p-2 border-b">Hành động của người</td></tr>
                <tr><td class="p-2 border-b">Day-to-Night</td><td class="p-2 border-b text-center font-bold text-green-600">33%</td><td class="p-2 border-b">Ổn định nhất</td></tr>
            </table>
        </div>
    </div>
</div>`
        }
    };

    document.querySelectorAll('.feedback-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-feedback-id');
            if (feedbackData[id]) {
                document.getElementById('modalTitle').textContent = feedbackData[id].title;
                document.getElementById('modalContent').innerHTML = feedbackData[id].content;
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ========== LIBRARY DATA & HANDLER ==========
    const libraryData = {
        '1': { title: 'Danh Sách Công Cụ AI', content: `<div class="p-4 bg-blue-50 rounded">Nội dung công cụ AI từ tài liệu...</div>` },
        '2': { title: 'Virtual Staging', content: `<div class="p-4 bg-orange-50 rounded">Nội dung Virtual Staging...</div>` },
        '3': { title: 'Day-to-Night', content: `<div class="p-4 bg-green-50 rounded">Nội dung Day-to-Night...</div>` },
        '4': { title: 'Real Estate Tour', content: `<div class="p-4 bg-purple-50 rounded">Nội dung Real Estate Tour...</div>` },
        '5': { title: 'Product Showcase', content: `<div class="p-4 bg-pink-50 rounded">Nội dung Product Showcase...</div>` },
        '6': { title: 'Kling O1 Video Editing', content: `<div class="p-4 bg-red-50 rounded">Nội dung Kling O1...</div>` }
    };

    document.querySelectorAll('.library-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-library-id');
            if (libraryData[id]) {
                document.getElementById('libraryModalTitle').textContent = libraryData[id].title;
                document.getElementById('libraryModalContent').innerHTML = libraryData[id].content;
                libraryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ========== PASSCODE HANDLER ==========
    const submitBtn = document.getElementById('submitPasscodeBtn');
    const input = document.getElementById('passcodeInput');
    if (submitBtn && input) {
        submitBtn.addEventListener('click', function() {
            if (input.value === '2026') {
                document.getElementById('reportsPasscodeLayer').style.display = 'none';
                document.getElementById('reportContent').style.display = 'block';
            } else {
                const err = document.getElementById('passcodeError');
                err.textContent = 'Sai passcode!';
                err.classList.remove('hidden');
            }
        });
    }

    // ========== EXCEL TOGGLE ==========
    const excelBtn = document.getElementById('toggleSaleEmbedBtn');
    if (excelBtn) {
        excelBtn.addEventListener('click', function() {
            const container = document.getElementById('saleEmbedContainer');
            container.classList.toggle('hidden');
            this.innerHTML = container.classList.contains('hidden') ? 
                '<i class="fas fa-table mr-2"></i>Xem Excel Trực Tiếp' : 
                '<i class="fas fa-table mr-2"></i>Ẩn Excel';
        });
    }
});
