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
    const feedbackFullPageView = document.createElement('div');
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
<div class="space-y-8 text-gray-800 pb-10">
    <!-- Header Summary -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl text-white shadow-lg">
        <h4 class="text-2xl font-bold mb-2 flex items-center">
            <i class="fas fa-chart-line mr-3"></i>Báo Cáo Tóm Tắt Phân Tích & Tối Ưu
        </h4>
        <p class="opacity-90">Phân tích 22-23 job sản xuất media từ tệp [Video]FeedbackAIupdated.xlsx</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div class="text-3xl font-bold">36.4%</div>
                <div class="text-sm opacity-80">Tần suất lỗi chính</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div class="text-3xl font-bold">42.9%</div>
                <div class="text-sm opacity-80">Lỗi giới hạn công nghệ</div>
            </div>
            <div class="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                <div class="text-3xl font-bold">31.0%</div>
                <div class="text-sm opacity-80">Lỗi do Prompt chưa tối ưu</div>
            </div>
        </div>
    </div>

    <!-- Error Frequency Infographic -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h5 class="font-bold text-lg mb-4 flex items-center text-red-600">
                <i class="fas fa-exclamation-triangle mr-2"></i>Tần Suất Lỗi Phổ Biến
            </h5>
            <div class="space-y-4">
                <div>
                    <div class="flex justify-between text-sm mb-1"><span>Chuyển động không tự nhiên</span><span class="font-bold">12.1%</span></div>
                    <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden"><div class="bg-red-500 h-full" style="width: 12.1%"></div></div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-1"><span>Chi tiết vật lý/logic sai</span><span class="font-bold">12.1%</span></div>
                    <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden"><div class="bg-red-500 h-full" style="width: 12.1%"></div></div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-1"><span>Nhân vật AI thiếu chân thực</span><span class="font-bold">12.1%</span></div>
                    <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden"><div class="bg-red-500 h-full" style="width: 12.1%"></div></div>
                </div>
            </div>
            <p class="mt-4 text-xs text-gray-500 italic">* Ba nhóm này chiếm tổng cộng 36.4% tần suất lỗi ghi nhận.</p>
        </div>

        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h5 class="font-bold text-lg mb-4 flex items-center text-blue-600">
                <i class="fas fa-search-nodes mr-2"></i>Nguyên Nhân Gốc Rễ
            </h5>
            <div class="flex items-center justify-center py-4">
                <div class="relative w-40 h-40">
                    <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#e5e7eb" stroke-width="3.8"></circle>
                        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3b82f6" stroke-width="3.8" stroke-dasharray="42.9 100"></circle>
                        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#10b981" stroke-width="3.8" stroke-dasharray="31 100" stroke-dashoffset="-42.9"></circle>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-2xl font-bold">75%</span>
                        <span class="text-[10px] uppercase text-gray-500">Có thể kiểm soát</span>
                    </div>
                </div>
                <div class="ml-8 space-y-2 text-xs">
                    <div class="flex items-center"><span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span><span>Giới hạn công nghệ (42.9%)</span></div>
                    <div class="flex items-center"><span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span><span>Prompt chưa tối ưu (31.0%)</span></div>
                    <div class="flex items-center"><span class="w-3 h-3 bg-gray-300 rounded-full mr-2"></span><span>Khác (26.1%)</span></div>
                </div>
            </div>
        </div>
    </div>

    <!-- P-S-C-A-M Framework -->
    <div class="bg-indigo-50 p-8 rounded-xl border border-indigo-100">
        <h5 class="font-bold text-xl mb-6 text-indigo-900 text-center">Khung Cấu Trúc P-S-C-A-M (Lộ Trình Cải Tiến)</h5>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div class="bg-white p-4 rounded-lg shadow-sm border-t-4 border-indigo-500">
                <div class="text-2xl font-black text-indigo-600 mb-2 text-center">P</div>
                <div class="font-bold text-xs mb-1 text-center">Premise</div>
                <p class="text-[10px] text-gray-600 text-center">Bối cảnh/Chủ thể: Xác định cái gì và ở đâu.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-t-4 border-purple-500">
                <div class="text-2xl font-black text-purple-600 mb-2 text-center">S</div>
                <div class="font-bold text-xs mb-1 text-center">Style & Mood</div>
                <p class="text-[10px] text-gray-600 text-center">Quyết định "cảm giác" của sản phẩm.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-t-4 border-blue-500">
                <div class="text-2xl font-black text-blue-600 mb-2 text-center">C</div>
                <div class="font-bold text-xs mb-1 text-center">Composition</div>
                <p class="text-[10px] text-gray-600 text-center">Kiểm soát góc nhìn và tính điện ảnh.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-t-4 border-green-500">
                <div class="text-2xl font-black text-green-600 mb-2 text-center">A</div>
                <div class="font-bold text-xs mb-1 text-center">Action</div>
                <p class="text-[10px] text-gray-600 text-center">Mô tả chi tiết các chuyển động.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-t-4 border-red-500">
                <div class="text-2xl font-black text-red-600 mb-2 text-center">M</div>
                <div class="font-bold text-xs mb-1 text-center">Modifiers</div>
                <p class="text-[10px] text-gray-600 text-center">Nâng cao chất lượng & đặt giới hạn.</p>
            </div>
        </div>
    </div>

    <!-- Common Errors Table -->
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <h5 class="font-bold text-lg mb-4 flex items-center text-gray-800">
            <i class="fas fa-list-check mr-2 text-orange-500"></i>5 Lỗi Prompt Phổ Biến & Giải Pháp
        </h5>
        <div class="overflow-x-auto">
            <table class="w-full text-sm border-collapse">
                <thead>
                    <tr class="bg-gray-50 text-gray-600 uppercase text-xs">
                        <th class="p-3 text-left border-b">Lỗi Phổ Biến</th>
                        <th class="p-3 text-left border-b">Biểu Hiện</th>
                        <th class="p-3 text-left border-b">Giải Pháp (P-S-C-A-M)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr>
                        <td class="p-3 font-bold text-indigo-700">1. Thiếu chi tiết Action</td>
                        <td class="p-3 text-gray-600">Chuyển động ngẫu nhiên, phi logic.</td>
                        <td class="p-3 text-xs"><strong>(A) Action:</strong> Mô tả hành động chi tiết, tuần tự.</td>
                    </tr>
                    <tr>
                        <td class="p-3 font-bold text-indigo-700">2. Thiếu Constraints Nhân vật</td>
                        <td class="p-3 text-gray-600">Người AI biến dạng, hành vi sai.</td>
                        <td class="p-3 text-xs"><strong>(M) Modifiers:</strong> Đặt ra "luật chơi" rõ ràng (anatomically correct).</td>
                    </tr>
                    <tr>
                        <td class="p-3 font-bold text-indigo-700">3. Thiếu chỉ định Camera</td>
                        <td class="p-3 text-gray-600">Máy quay rung lắc, không như ý.</td>
                        <td class="p-3 text-xs"><strong>(C) Composition:</strong> Kiểm soát chặt chẽ máy quay (locked camera).</td>
                    </tr>
                    <tr>
                        <td class="p-3 font-bold text-indigo-700">4. Thiếu Modifiers Chất lượng</td>
                        <td class="p-3 text-gray-600">Video vỡ, có logo, vết cắt.</td>
                        <td class="p-3 text-xs"><strong>(M) Modifiers:</strong> Kết thúc bằng từ khóa 4K, photorealistic.</td>
                    </tr>
                    <tr>
                        <td class="p-3 font-bold text-indigo-700">5. Premise quá phức tạp</td>
                        <td class="p-3 text-gray-600">AI không thực hiện được yêu cầu.</td>
                        <td class="p-3 text-xs"><strong>(P) Premise:</strong> Chia nhỏ yêu cầu thành các prompt riêng biệt.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`
        }
    };

    // ========== LIBRARY DATA ==========
    const libraryData = {
        '1': { title: 'Danh Sách Công Cụ AI', content: `<div class="space-y-4"><p>Nội dung công cụ AI từ tài liệu...</p></div>` },
        '2': { title: 'Virtual Staging', content: `<div class="space-y-4"><p>Nội dung Virtual Staging...</p></div>` },
        '3': { title: 'Day-to-Night', content: `<div class="space-y-4"><p>Nội dung Day-to-Night...</p></div>` },
        '4': { title: 'Real Estate Tour', content: `<div class="space-y-4"><p>Nội dung Real Estate Tour...</p></div>` },
        '5': { title: 'Product Showcase', content: `<div class="space-y-4"><p>Nội dung Product Showcase...</p></div>` },
        '6': { title: 'Kling O1 Video Editing', content: `<div class="space-y-4"><p>Nội dung Kling O1...</p></div>` }
    };

    let currentFeedbackId = null;
    let currentLibraryId = null;

    // ========== FEEDBACK EVENT LISTENERS ==========
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

    // Open Feedback Full Page
    const openFullPageBtn = document.getElementById('openFullPageBtn');
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (currentFeedbackId && feedbackData[currentFeedbackId]) {
                const data = feedbackData[currentFeedbackId];
                document.getElementById('feedbackFullPageTitle').textContent = data.title;
                document.getElementById('feedbackFullPageContent').innerHTML = data.content;
                feedbackModal.classList.add('hidden');
                feedbackFullPageView.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close Feedback Full Page
    const closeFeedbackFullPageBtn = document.getElementById('closeFeedbackFullPageBtn');
    if (closeFeedbackFullPageBtn) {
        closeFeedbackFullPageBtn.addEventListener('click', closeAllModals);
    }

    // ========== LIBRARY EVENT LISTENERS ==========
    document.querySelectorAll('.library-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-library-id');
            if (libraryData[id]) {
                currentLibraryId = id;
                document.getElementById('libraryModalTitle').textContent = libraryData[id].title;
                document.getElementById('libraryModalContent').innerHTML = libraryData[id].content;
                libraryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Open Library Full Page
    const openLibraryFullPageBtn = document.getElementById('openLibraryFullPageBtn');
    if (openLibraryFullPageBtn) {
        openLibraryFullPageBtn.addEventListener('click', function() {
            if (currentLibraryId && libraryData[currentLibraryId]) {
                const data = libraryData[currentLibraryId];
                document.getElementById('libraryFullPageTitle').textContent = data.title;
                document.getElementById('libraryFullPageContent').innerHTML = data.content;
                libraryModal.classList.add('hidden');
                libraryFullPageView.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    }

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
                if (err) {
                    err.textContent = 'Sai passcode!';
                    err.classList.remove('hidden');
                }
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
