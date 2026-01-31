// R&D AI Video Intelligence Platform - Complete Script with Full Page Support
document.addEventListener('DOMContentLoaded', function() {
    console.log("Complete Script initialized");

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
    const roadmapModal = document.getElementById('roadmapModal');
    
    // Full Page elements
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

    const libraryFullPageView = document.getElementById('libraryFullPageView');

    function closeAllModals() {
        [feedbackModal, libraryModal, roadmapModal, feedbackFullPageView, libraryFullPageView].forEach(m => {
            if (m) m.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';
    }

    // Close buttons
    document.querySelectorAll('[id$="CloseBtn"], [id^="close"]').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // ========== FEEDBACK DATA (INFOGRAPHICS) ==========
    const feedbackData = {
        '1': {
            title: 'Phân Tích 23 Job Feedback & Tối Ưu Quy Trình AI',
            content: `
<div class="space-y-12 text-gray-800 pb-10">
    <!-- Header Summary -->
    <div class="bg-gradient-to-r from-indigo-700 to-purple-800 p-10 rounded-2xl text-white shadow-xl">
        <h4 class="text-3xl font-bold mb-4 flex items-center">
            <i class="fas fa-chart-line mr-4"></i>PHÂN TÍCH LỖI AI VIDEO
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div class="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 text-center">
                <div class="text-4xl font-bold mb-1">22</div>
                <div class="text-xs uppercase tracking-widest opacity-70">Tổng số dự án</div>
            </div>
            <div class="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 text-center">
                <div class="text-4xl font-bold mb-1 text-red-300">82%</div>
                <div class="text-xs uppercase tracking-widest opacity-70">Có feedback lỗi</div>
            </div>
            <div class="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 text-center">
                <div class="text-4xl font-bold mb-1 text-yellow-300">27%</div>
                <div class="text-xs uppercase tracking-widest opacity-70">Trễ deadline</div>
            </div>
            <div class="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 text-center">
                <div class="text-4xl font-bold mb-1 text-blue-300">75%</div>
                <div class="text-xs uppercase tracking-widest opacity-70">Có thể kiểm soát</div>
            </div>
        </div>
    </div>

    <!-- Error Distribution -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h5 class="font-bold text-xl mb-8 flex items-center text-gray-800">
                <i class="fas fa-chart-bar mr-3 text-purple-600"></i>Phân Bố Loại Lỗi
            </h5>
            <div class="space-y-6">
                <div>
                    <div class="flex justify-between text-sm mb-2 font-medium"><span>Hiểu sai yêu cầu</span><span class="text-purple-600">35%</span></div>
                    <div class="w-full bg-gray-100 h-4 rounded-full overflow-hidden"><div class="bg-purple-600 h-full" style="width: 35%"></div></div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-2 font-medium"><span>Kỹ thuật AI</span><span class="text-indigo-600">27%</span></div>
                    <div class="w-full bg-gray-100 h-4 rounded-full overflow-hidden"><div class="bg-indigo-600 h-full" style="width: 27%"></div></div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-2 font-medium"><span>Tiến độ/Deadline</span><span class="text-blue-600">22%</span></div>
                    <div class="w-full bg-gray-100 h-4 rounded-full overflow-hidden"><div class="bg-blue-600 h-full" style="width: 22%"></div></div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-2 font-medium"><span>Thẩm mỹ/Chất lượng</span><span class="text-pink-600">16%</span></div>
                    <div class="w-full bg-gray-100 h-4 rounded-full overflow-hidden"><div class="bg-pink-600 h-full" style="width: 16%"></div></div>
                </div>
            </div>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h5 class="font-bold text-xl mb-6 flex items-center text-gray-800">
                <i class="fas fa-bullseye mr-3 text-red-600"></i>Mục Tiêu Cải Thiện (30 Ngày)
            </h5>
            <div class="overflow-hidden rounded-xl border border-gray-50">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        <tr><th class="p-4 text-left">Chỉ số</th><th class="p-4 text-center">Hiện tại</th><th class="p-4 text-center">Mục tiêu</th></tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="p-4 font-medium">Lỗi yêu cầu</td><td class="p-4 text-center text-red-500 font-bold">35%</td><td class="p-4 text-center text-green-600 font-bold">< 10%</td></tr>
                        <tr><td class="p-4 font-medium">Lỗi kỹ thuật</td><td class="p-4 text-center text-red-500 font-bold">27%</td><td class="p-4 text-center text-green-600 font-bold">< 15%</td></tr>
                        <tr><td class="p-4 font-medium">Trễ deadline</td><td class="p-4 text-center text-red-500 font-bold">27%</td><td class="p-4 text-center text-green-600 font-bold">< 10%</td></tr>
                        <tr><td class="p-4 font-medium">Tổng feedback lỗi</td><td class="p-4 text-center text-red-500 font-bold">82%</td><td class="p-4 text-center text-green-600 font-bold">< 30%</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Detailed Analysis Tables -->
    <div class="space-y-10">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 bg-red-50 border-b border-red-100 flex items-center">
                <span class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mr-4"><i class="fas fa-times-circle"></i></span>
                <h5 class="font-bold text-lg text-red-900 uppercase">Nhóm 1: Lỗi Hiểu Sai Yêu Cầu</h5>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                        <tr><th class="p-4 text-left">Mã Job</th><th class="p-4 text-left">Yêu cầu</th><th class="p-4 text-left">Vấn đề</th></tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="p-4 font-bold">TADEC31004</td><td class="p-4">Hiện trạng → mùa xuân</td><td class="p-4 text-red-600">Làm Tuyết → mùa xuân. Không đọc context.</td></tr>
                        <tr><td class="p-4 font-bold">HTJAN15008Rev</td><td class="p-4">"Preparing dinner" có người</td><td class="p-4 text-red-600">Chỉ có bàn + đồ ăn. Bỏ qua động từ hành động.</td></tr>
                        <tr><td class="p-4 font-bold">QUJAN25001</td><td class="p-4">2 AI: living + dining</td><td class="p-4 text-red-600">Chỉ làm 1, làm sai phòng. Thiếu checklist.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 bg-blue-50 border-b border-blue-100 flex items-center">
                <span class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4"><i class="fas fa-microchip"></i></span>
                <h5 class="font-bold text-lg text-blue-900 uppercase">Nhóm 2: Lỗi Kỹ Thuật AI</h5>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="p-4 font-bold w-32">NHJAN13010</td><td class="p-4">Đàn ông mặc bikini thay vì quần bơi</td><td class="p-4"><span class="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold">NGHIÊM TRỌNG</span></td></tr>
                        <tr><td class="p-4 font-bold">LIJAN07001</td><td class="p-4">Quân cờ nhảy đánh nhau, không theo luật</td><td class="p-4"><span class="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold">NGHIÊM TRỌNG</span></td></tr>
                        <tr><td class="p-4 font-bold">HTJAN07002rev2</td><td class="p-4">Mặt người biến dạng</td><td class="p-4"><span class="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold">NGHIÊM TRỌNG</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Implementation & Checklist -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="bg-indigo-900 p-8 rounded-2xl text-white shadow-lg">
            <h5 class="font-bold text-xl mb-6 flex items-center"><i class="fas fa-tasks mr-3"></i>CẢI TIẾN QUY TRÌNH</h5>
            <ul class="space-y-4 text-sm opacity-90">
                <li class="flex items-start gap-3"><i class="fas fa-check-square mt-1 text-green-400"></i><span>Double-check deliverables với brief</span></li>
                <li class="flex items-start gap-3"><i class="fas fa-check-square mt-1 text-green-400"></i><span>Tạo checklist QC trước gửi output</span></li>
                <li class="flex items-start gap-3"><i class="fas fa-check-square mt-1 text-green-400"></i><span>Xây dựng thư viện prompt chuẩn</span></li>
                <li class="flex items-start gap-3"><i class="fas fa-check-square mt-1 text-green-400"></i><span>Training prompt engineering cho team</span></li>
            </ul>
        </div>
        <div class="bg-white p-8 rounded-2xl border-4 border-indigo-100 shadow-sm">
            <h5 class="font-bold text-xl mb-6 flex items-center text-indigo-900"><i class="fas fa-clipboard-check mr-3"></i>CHECKLIST QC</h5>
            <div class="space-y-3">
                <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"><i class="far fa-square text-gray-400"></i><span class="text-sm font-medium">Đủ số lượng output?</span></div>
                <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"><i class="far fa-square text-gray-400"></i><span class="text-sm font-medium">Không có watermark/logo?</span></div>
                <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"><i class="far fa-square text-gray-400"></i><span class="text-sm font-medium">Mặt người không biến dạng?</span></div>
                <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"><i class="far fa-square text-gray-400"></i><span class="text-sm font-medium">Chuyển động tự nhiên?</span></div>
            </div>
        </div>
    </div>
</div>`
        }
    };

    const libraryData = {
        '1': { title: 'Danh Sách Công Cụ AI', content: `<div class="p-4 bg-blue-50 rounded-xl"><p class="font-bold mb-2">Công cụ tạo ảnh:</p><ul class="list-disc ml-5 text-sm"><li>Google Nano Banana Pro</li><li>Flux</li><li>Zimage</li></ul></div>` },
        '2': { title: 'Virtual Staging', content: `<div class="p-4 bg-orange-50 rounded-xl"><p class="font-bold mb-2">Prompt Mẫu:</p><code class="text-xs">Realistic interior staging, scandinavian style...</code></div>` },
        '3': { title: 'Day-to-Night', content: `<div class="p-4 bg-green-50 rounded-xl"><p class="font-bold mb-2">Veo 3.1 Prompt:</p><code class="text-xs">Cinematic day to night transition, sunset lighting...</code></div>` }
    };

    // ========== MODAL INTERACTION ==========
    function openFeedbackModal(id) {
        if (feedbackData[id]) {
            currentFeedbackId = id;
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            if (modalTitle && modalContent && feedbackModal) {
                modalTitle.textContent = feedbackData[id].title;
                modalContent.innerHTML = feedbackData[id].content;
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    document.querySelectorAll('.feedback-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-feedback-id');
            openFeedbackModal(id);
        });
    });

    // Full Page Button
    const openFullPageBtn = document.getElementById('openFullPageBtn');
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (currentFeedbackId && feedbackData[currentFeedbackId]) {
                const fpTitle = document.getElementById('feedbackFullPageTitle');
                const fpContent = document.getElementById('feedbackFullPageContent');
                if (fpTitle && fpContent && feedbackFullPageView) {
                    fpTitle.textContent = feedbackData[currentFeedbackId].title;
                    fpContent.innerHTML = feedbackData[currentFeedbackId].content;
                    feedbackModal.classList.add('hidden');
                    feedbackFullPageView.classList.remove('hidden');
                }
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

    // Library Click
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

    // Passcode & Excel (Existing logic)
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

    const toggleSaleEmbedBtn = document.getElementById('toggleSaleEmbedBtn');
    if (toggleSaleEmbedBtn) {
        toggleSaleEmbedBtn.addEventListener('click', function() {
            const container = document.getElementById('saleEmbedContainer');
            if (container) {
                container.classList.toggle('hidden');
                this.innerHTML = container.classList.contains('hidden') ? '<i class="fas fa-table mr-2"></i>Xem Excel' : '<i class="fas fa-table mr-2"></i>Ẩn Excel';
            }
        });
    }
});
