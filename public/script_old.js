// R&D AI Video Intelligence Platform - Fixed Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVIGATION & UI ==========
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const dynamicFooter = document.getElementById('dynamicFooter');

    // Create overlay backdrop for mobile
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-30 hidden transition-opacity duration-300';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);

    // Sidebar Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (window.innerWidth < 768) {
                overlay.classList.toggle('hidden');
            }
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.add('hidden');
        });
    }

    // Function to update footer visibility
    function updateFooterVisibility(tabId) {
        if (!dynamicFooter) return;
        const hiddenTabs = ['overview'];
        if (hiddenTabs.includes(tabId)) {
            dynamicFooter.style.display = 'none';
        } else {
            dynamicFooter.style.display = 'block';
        }
    }

    // Main Show Section Function
    window.showSection = function(targetId) {
        console.log("Showing section:", targetId);
        let found = false;
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active-tab');
                section.style.display = 'block';
                found = true;
            } else {
                section.classList.remove('active-tab');
                section.style.display = 'none';
            }
        });

        if (!found && sections.length > 0) {
            sections[0].classList.add('active-tab');
            sections[0].style.display = 'block';
            targetId = sections[0].id;
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === '#' + targetId || href === targetId) {
                item.classList.add('active');
            }
        });

        updateFooterVisibility(targetId);
        if (window.location.hash !== '#' + targetId) {
            history.pushState(null, null, '#' + targetId);
        }
    };

    // Nav Item Click Handlers
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

    // Initial Load
    const initialHash = window.location.hash ? window.location.hash.substring(1) : (sections[0] ? sections[0].id : 'overview');
    window.showSection(initialHash);

    // ========== FEEDBACK CARD HANDLERS ==========
    const feedbackGrid = document.getElementById('feedbackGrid');
    if (feedbackGrid) {
        const feedbackCards = document.querySelectorAll('.feedback-card');
        const feedbackModal = document.getElementById('feedbackModal');
        const feedbackModalTitle = document.getElementById('modalTitle');
        const feedbackModalContent = document.getElementById('modalContent');
        const closeFeedbackModalBtn = document.getElementById('closeModalBtn');
        const openFeedbackFullPageBtn = document.getElementById('openFullPageBtn');
        
        const feedbackFullPageView = document.getElementById('fullPageView');
        const feedbackFullPageTitle = document.getElementById('fullPageTitle');
        const feedbackFullPageContent = document.getElementById('fullPageContent');
        const closeFeedbackFullPageBtn = document.getElementById('closeFullPageBtn');

        let currentFeedbackId = null;

        // Feedback data - Phân Tích 23 Job Feedback
        const feedbackData = {
            '1': {
                title: 'Phân Tích 23 Job Feedback',
                content: `
<div class="space-y-6">
    <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
        <h4 class="font-bold text-blue-900 mb-3 text-xl flex items-center">
            <i class="fas fa-info-circle mr-2"></i>Tổng Quan
        </h4>
        <p class="text-gray-700 mb-3">
            <strong>Phân Tích 23 Job Feedback</strong> là báo cáo chuyên sâu về lỗi và hiệu quả vận hành của hệ thống AI Video.
            Báo cáo xác định các điểm nghẽn hệ thống, nguyên nhân gốc rễ và lộ trình cải thiện chất lượng dịch vụ.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-red-600">23</div>
                <div class="text-xs text-gray-600">Job Codes</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-orange-600">35%</div>
                <div class="text-xs text-gray-600">Hiểu sai yêu cầu</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-yellow-600">100%</div>
                <div class="text-xs text-gray-600">Object Animation</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-purple-600">4</div>
                <div class="text-xs text-gray-600">Nhóm lỗi</div>
            </div>
        </div>
    </div>

    <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
        <h4 class="font-bold text-red-900 mb-3 text-xl flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>4 Nhóm Lỗi Chính
        </h4>
        <div class="space-y-3">
            <div class="flex items-start bg-white p-3 rounded">
                <div class="bg-red-100 text-red-700 font-bold px-3 py-1 rounded mr-3 min-w-fit">35%</div>
                <div>
                    <p class="font-semibold text-gray-800">Hiểu sai yêu cầu (8 jobs)</p>
                    <p class="text-sm text-gray-600">Không nắm vững brief, bỏ sót yêu cầu, không hiểu context địa phương</p>
                </div>
            </div>
            <div class="flex items-start bg-white p-3 rounded">
                <div class="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded mr-3 min-w-fit">26%</div>
                <div>
                    <p class="font-semibold text-gray-800">Chất lượng AI kém (6 jobs)</p>
                    <p class="text-sm text-gray-600">Mặt biến dạng, người fake, lộ logo công cụ, viền cắt trắng</p>
                </div>
            </div>
            <div class="flex items-start bg-white p-3 rounded">
                <div class="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded mr-3 min-w-fit">22%</div>
                <div>
                    <p class="font-semibold text-gray-800">Trễ deadline (5 jobs)</p>
                    <p class="text-sm text-gray-600">Trễ từ 3-9 tiếng do quá tải hoặc phối hợp kém</p>
                </div>
            </div>
            <div class="flex items-start bg-white p-3 rounded">
                <div class="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded mr-3 min-w-fit">17%</div>
                <div>
                    <p class="font-semibold text-gray-800">Lỗi Logic & Vật lý (4 jobs)</p>
                    <p class="text-sm text-gray-600">Chuyển động phi lý, hành vi không tự nhiên</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
        <h4 class="font-bold text-purple-900 mb-3 text-xl flex items-center">
            <i class="fas fa-chart-bar mr-2"></i>Tỷ Lệ Lỗi Theo Loại Hiệu Ứng
        </h4>
        <div class="space-y-2">
            <div class="flex items-center justify-between p-2 bg-white rounded">
                <span class="text-sm font-medium">Object Animation</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-red-600 h-2 rounded-full" style="width: 100%"></div>
                    </div>
                    <span class="text-sm font-bold text-red-600">100%</span>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 bg-white rounded">
                <span class="text-sm font-medium">Creative/Fantasy</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-red-600 h-2 rounded-full" style="width: 100%"></div>
                    </div>
                    <span class="text-sm font-bold text-red-600">100%</span>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 bg-white rounded">
                <span class="text-sm font-medium">Agent Composite</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-red-600 h-2 rounded-full" style="width: 100%"></div>
                    </div>
                    <span class="text-sm font-bold text-red-600">100%</span>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 bg-white rounded">
                <span class="text-sm font-medium">Người/Lifestyle</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-orange-500 h-2 rounded-full" style="width: 71%"></div>
                    </div>
                    <span class="text-sm font-bold text-orange-600">71%</span>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 bg-white rounded">
                <span class="text-sm font-medium">Season/Weather</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-orange-500 h-2 rounded-full" style="width: 67%"></div>
                    </div>
                    <span class="text-sm font-bold text-orange-600">67%</span>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
        <h4 class="font-bold text-green-900 mb-3 text-xl flex items-center">
            <i class="fas fa-lightbulb mr-2"></i>Giải Pháp Đề Xuất
        </h4>
        <ul class="space-y-2">
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                <span class="text-gray-700"><strong>Xây dựng QC Checklist:</strong> Thiết lập bộ tiêu chuẩn kiểm tra cho từng loại Effect</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                <span class="text-gray-700"><strong>Chuẩn hóa Prompt:</strong> Tạo thư viện mẫu cho các yêu cầu phổ biến</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                <span class="text-gray-700"><strong>Nâng cấp quy trình Brief:</strong> Bắt buộc clarify các điểm chưa rõ</span>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                <span class="text-gray-700"><strong>Đào tạo Context:</strong> Cập nhật kiến thức về văn hóa và bối cảnh địa phương</span>
            </li>
        </ul>
    </div>
</div>`
            }
        };

        feedbackCards.forEach(card => {
            card.addEventListener('click', function(e) {
                const feedbackId = this.getAttribute('data-feedback-id');
                if (e.target.closest('.expand-btn')) {
                    openFeedbackFullPage(feedbackId);
                    return;
                }
                openFeedbackModal(feedbackId);
            });
        });

        function openFeedbackModal(feedbackId) {
            if (feedbackData[feedbackId]) {
                currentFeedbackId = feedbackId;
                const data = feedbackData[feedbackId];
                if (feedbackModalTitle) feedbackModalTitle.textContent = data.title;
                if (feedbackModalContent) feedbackModalContent.innerHTML = data.content;
                if (feedbackModal) feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }

        function openFeedbackFullPage(feedbackId) {
            if (feedbackData[feedbackId]) {
                const data = feedbackData[feedbackId];
                if (feedbackFullPageTitle) feedbackFullPageTitle.textContent = data.title;
                if (feedbackFullPageContent) feedbackFullPageContent.innerHTML = data.content;
                if (feedbackFullPageView) feedbackFullPageView.classList.remove('hidden');
                if (feedbackModal) feedbackModal.classList.add('hidden');
                document.body.style.overflow = 'hidden';
            }
        }

        if (closeFeedbackModalBtn) {
            closeFeedbackModalBtn.addEventListener('click', () => {
                feedbackModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }

        if (openFeedbackFullPageBtn) {
            openFeedbackFullPageBtn.addEventListener('click', () => {
                if (currentFeedbackId) openFeedbackFullPage(currentFeedbackId);
            });
        }

        if (closeFeedbackFullPageBtn) {
            closeFeedbackFullPageBtn.addEventListener('click', () => {
                feedbackFullPageView.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // ========== ROADMAP HANDLERS ==========
    const roadmapGrid = document.getElementById('roadmapGrid');
    if (roadmapGrid) {
        const roadmapCards = document.querySelectorAll('.roadmap-card');
        const roadmapModal = document.getElementById('roadmapModal');
        const roadmapModalTitle = document.getElementById('roadmapModalTitle');
        const roadmapModalSubtitle = document.getElementById('roadmapModalSubtitle');
        const roadmapModalContent = document.getElementById('roadmapModalContent');
        const closeRoadmapModalBtn = document.getElementById('closeRoadmapModalBtn');
        const openRoadmapFullPageBtn = document.getElementById('openRoadmapFullPageBtn');
        
        const roadmapFullPageView = document.getElementById('roadmapFullPageView');
        const roadmapFullPageTitle = document.getElementById('roadmapFullPageTitle');
        const roadmapFullPageSubtitle = document.getElementById('roadmapFullPageSubtitle');
        const roadmapFullPageContent = document.getElementById('roadmapFullPageContent');
        const closeRoadmapFullPageBtn = document.getElementById('closeRoadmapFullPageBtn');

        let currentToolId = null;

        roadmapCards.forEach(card => {
            card.addEventListener('click', function(e) {
                const toolId = this.getAttribute('data-tool-id');
                if (e.target.closest('.expand-btn')) {
                    openFullPage(toolId);
                    return;
                }
                openModal(toolId);
            });
        });

        function openModal(toolId) {
            if (typeof roadmapData !== 'undefined' && roadmapData[toolId]) {
                currentToolId = toolId;
                const data = roadmapData[toolId];
                if (roadmapModalTitle) roadmapModalTitle.textContent = data.title;
                if (roadmapModalSubtitle) roadmapModalSubtitle.textContent = data.subtitle;
                if (roadmapModalContent) roadmapModalContent.innerHTML = data.content;
                if (roadmapModal) roadmapModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }

        function openFullPage(toolId) {
            if (typeof roadmapData !== 'undefined' && roadmapData[toolId]) {
                const data = roadmapData[toolId];
                if (roadmapFullPageTitle) roadmapFullPageTitle.textContent = data.title;
                if (roadmapFullPageSubtitle) roadmapFullPageSubtitle.textContent = data.subtitle;
                if (roadmapFullPageContent) roadmapFullPageContent.innerHTML = data.content;
                if (roadmapFullPageView) roadmapFullPageView.classList.remove('hidden');
                if (roadmapModal) roadmapModal.classList.add('hidden');
                document.body.style.overflow = 'hidden';
            }
        }

        if (closeRoadmapModalBtn) {
            closeRoadmapModalBtn.addEventListener('click', () => {
                roadmapModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }

        if (openRoadmapFullPageBtn) {
            openRoadmapFullPageBtn.addEventListener('click', () => {
                if (currentToolId) openFullPage(currentToolId);
            });
        }

        if (closeRoadmapFullPageBtn) {
            closeRoadmapFullPageBtn.addEventListener('click', () => {
                roadmapFullPageView.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (roadmapFullPageView && !roadmapFullPageView.classList.contains('hidden')) {
                    roadmapFullPageView.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                } else if (roadmapModal && !roadmapModal.classList.contains('hidden')) {
                    roadmapModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }
});

// Roadmap Data
const roadmapData = {
    '1': {
        title: 'Google Nano Banana Pro',
        subtitle: 'Image Generation • 4K+ Quality • Virtual Staging',
        content: `
<div class="space-y-6">
    <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
        <h4 class="font-bold text-blue-900 mb-3 text-xl flex items-center">
            <i class="fas fa-info-circle mr-2"></i>Tổng Quan
        </h4>
        <p class="text-gray-700 mb-3">
            <strong>Google Nano Banana Pro</strong> là công cụ tạo ảnh AI hàng đầu với chất lượng 4K+, 
            chuyên về Virtual Staging và Interior Design. Độ chi tiết vật liệu và ánh sáng tuyệt vời.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-blue-600">4K+</div>
                <div class="text-xs text-gray-600">Resolution</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-green-600">95%</div>
                <div class="text-xs text-gray-600">Accuracy</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-purple-600">30s</div>
                <div class="text-xs text-gray-600">Avg Time</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-orange-600">$0.5</div>
                <div class="text-xs text-gray-600">Per Image</div>
            </div>
        </div>
    </div>
</div>`
    },
    '2': {
        title: 'Veo 3.1',
        subtitle: 'Video Generation • Cinematic • Day-to-Night',
        content: `
<div class="space-y-6">
    <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
        <h4 class="font-bold text-orange-900 mb-3 text-xl flex items-center">
            <i class="fas fa-info-circle mr-2"></i>Tổng Quan
        </h4>
        <p class="text-gray-700 mb-3">
            <strong>Veo 3.1</strong> là công cụ tạo video AI chân thực nhất hiện nay, chuyên về 
            Day-to-Night transitions và cinematic shots.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-orange-600">4K</div>
                <div class="text-xs text-gray-600">Resolution</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-green-600">90%</div>
                <div class="text-xs text-gray-600">Realism</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-purple-600">30s</div>
                <div class="text-xs text-gray-600">Max Length</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-orange-600">$2</div>
                <div class="text-xs text-gray-600">Per 30s</div>
            </div>
        </div>
    </div>
</div>`
    },
    '3': {
        title: 'Kling 2.6',
        subtitle: 'Motion Control • Real Estate Tour',
        content: `
<div class="space-y-6">
    <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
        <h4 class="font-bold text-green-900 mb-3 text-xl flex items-center">
            <i class="fas fa-info-circle mr-2"></i>Tổng Quan
        </h4>
        <p class="text-gray-700 mb-3">
            <strong>Kling 2.6</strong> nổi bật với Motion Control tuyệt vời, cho phép kiểm soát 
            chính xác camera movements và object motions.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-green-600">4K</div>
                <div class="text-xs text-gray-600">Resolution</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-green-600">95%</div>
                <div class="text-xs text-gray-600">Motion Acc</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-purple-600">45s</div>
                <div class="text-xs text-gray-600">Max Length</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-green-600">$1.5</div>
                <div class="text-xs text-gray-600">Per 45s</div>
            </div>
        </div>
    </div>
</div>`
    },
    '4': {
        title: 'Seedance 1.5 Pro',
        subtitle: 'Special Effects • Product Showcase',
        content: `
<div class="space-y-6">
    <div class="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-600">
        <h4 class="font-bold text-pink-900 mb-3 text-xl flex items-center">
            <i class="fas fa-info-circle mr-2"></i>Tổng Quan
        </h4>
        <p class="text-gray-700 mb-3">
            <strong>Seedance 1.5 Pro</strong> chuyên về hiệu ứng đặc biệt và creative effects. 
            Lý tưởng cho Product Showcase với particle effects.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-pink-600">4K</div>
                <div class="text-xs text-gray-600">Resolution</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-pink-600">85%</div>
                <div class="text-xs text-gray-600">Creative</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-purple-600">30s</div>
                <div class="text-xs text-gray-600">Max Length</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-pink-600">$1.8</div>
                <div class="text-xs text-gray-600">Per 30s</div>
            </div>
        </div>
    </div>
</div>`
    }
};


// ========== LIBRARY CARD HANDLERS ==========
document.addEventListener('DOMContentLoaded', function() {
    const libraryGrid = document.getElementById('libraryGrid');
    if (libraryGrid) {
        const libraryCards = document.querySelectorAll('.library-card');
        const libraryModal = document.getElementById('libraryModal');
        const libraryModalTitle = document.getElementById('libraryModalTitle');
        const libraryModalContent = document.getElementById('libraryModalContent');
        const closeLibraryModalBtn = document.getElementById('closeLibraryModalBtn');
        const openLibraryFullPageBtn = document.getElementById('openLibraryFullPageBtn');
        
        const libraryFullPageView = document.getElementById('libraryFullPageView');
        const libraryFullPageTitle = document.getElementById('libraryFullPageTitle');
        const libraryFullPageContent = document.getElementById('libraryFullPageContent');
        const closeLibraryFullPageBtn = document.getElementById('closeLibraryFullPageBtn');

        let currentLibraryId = null;

        // Library data
        const libraryData = {
            '1': {
                title: 'Danh Sách Công Cụ AI',
                content: `
<div class="space-y-4">
    <p class="text-gray-700">So sánh chi tiết các công cụ AI tạo ảnh, video và chỉnh sửa được sử dụng tại Fotober.</p>
    <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
        <h4 class="font-bold text-blue-900 mb-2">Công cụ chính:</h4>
        <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Google Nano Banana Pro - Image Generation</li>
            <li>Veo 3.1 - Video Generation</li>
            <li>Kling 2.6 - Motion Control</li>
            <li>Seedance 1.5 Pro - Special Effects</li>
        </ul>
    </div>
</div>`
            },
            '2': {
                title: 'Virtual Staging',
                content: `
<div class="space-y-4">
    <p class="text-gray-700">Hướng dẫn tối ưu prompt cho Virtual Staging bằng Google Nano Banana Pro.</p>
    <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
        <h4 class="font-bold text-orange-900 mb-2">Prompt tối ưu:</h4>
        <p class="text-sm text-gray-700">Tạo nội thất ảo với chi tiết cao, ánh sáng tự nhiên, phù hợp với phong cách bất động sản.</p>
    </div>
</div>`
            },
            '3': {
                title: 'Day-to-Night',
                content: `
<div class="space-y-4">
    <p class="text-gray-700">Chuyển đổi ánh sáng từ ban ngày sang ban đêm với Veo 3.1 và Kling 2.6.</p>
    <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
        <h4 class="font-bold text-green-900 mb-2">Kỹ thuật:</h4>
        <p class="text-sm text-gray-700">Giữ nguyên background, thay đổi ánh sáng, bầu trời và bóng đổ một cách tự nhiên.</p>
    </div>
</div>`
            },
            '4': {
                title: 'Real Estate Tour',
                content: `
<div class="space-y-4">
    <p class="text-gray-700">Tạo video tour bất động sản với Motion Control của Kling 2.6.</p>
    <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
        <h4 class="font-bold text-purple-900 mb-2">Tính năng:</h4>
        <p class="text-sm text-gray-700">Camera movement mịn, transition tự nhiên giữa các phòng, tốc độ phù hợp.</p>
    </div>
</div>`
            },
            '5': {
                title: 'Product Showcase',
                content: `
<div class="space-y-4">
    <p class="text-gray-700">Hiệu ứng đặc biệt cho sản phẩm với Seedance 1.5 Pro.</p>
    <div class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
        <h4 class="font-bold text-pink-900 mb-2">Hiệu ứng:</h4>
        <p class="text-sm text-gray-700">Particle effects, lighting, rotation, zoom động để làm nổi bật sản phẩm.</p>
    </div>
</div>`
            },
            '6': {
                title: 'Kling O1 Video Editing',
                content: `
<div class="space-y-4">
    <p class="text-gray-700">Chỉnh sửa video nâng cao với Kling O1.</p>
    <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
        <h4 class="font-bold text-red-900 mb-2">Tính năng:</h4>
        <p class="text-sm text-gray-700">Sửa lỗi vật lý, thêm chi tiết, cải thiện chất lượng video tự động.</p>
    </div>
</div>`
            }
        };

        libraryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                const libraryId = this.getAttribute('data-library-id');
                if (e.target.closest('.expand-btn')) {
                    openLibraryFullPage(libraryId);
                    return;
                }
                openLibraryModal(libraryId);
            });
        });

        function openLibraryModal(libraryId) {
            if (libraryData[libraryId]) {
                currentLibraryId = libraryId;
                const data = libraryData[libraryId];
                if (libraryModalTitle) libraryModalTitle.textContent = data.title;
                if (libraryModalContent) libraryModalContent.innerHTML = data.content;
                if (libraryModal) libraryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }

        function openLibraryFullPage(libraryId) {
            if (libraryData[libraryId]) {
                const data = libraryData[libraryId];
                if (libraryFullPageTitle) libraryFullPageTitle.textContent = data.title;
                if (libraryFullPageContent) libraryFullPageContent.innerHTML = data.content;
                if (libraryFullPageView) libraryFullPageView.classList.remove('hidden');
                if (libraryModal) libraryModal.classList.add('hidden');
                document.body.style.overflow = 'hidden';
            }
        }

        if (closeLibraryModalBtn) {
            closeLibraryModalBtn.addEventListener('click', () => {
                libraryModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }

        if (openLibraryFullPageBtn) {
            openLibraryFullPageBtn.addEventListener('click', () => {
                if (currentLibraryId) openLibraryFullPage(currentLibraryId);
            });
        }

        if (closeLibraryFullPageBtn) {
            closeLibraryFullPageBtn.addEventListener('click', () => {
                libraryFullPageView.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // ========== PASSCODE HANDLER ==========
    const passcodeInput = document.getElementById('passcodeInput');
    const submitPasscodeBtn = document.getElementById('submitPasscodeBtn');
    const passcodeError = document.getElementById('passcodeError');
    const reportContent = document.getElementById('reportContent');
    
    if (submitPasscodeBtn && passcodeInput) {
        submitPasscodeBtn.addEventListener('click', function() {
            const passcode = passcodeInput.value.trim();
            const correctPasscode = '2026';
            
            if (passcode === correctPasscode) {
                if (passcodeError) passcodeError.classList.add('hidden');
                if (reportContent) reportContent.classList.remove('hidden');
                passcodeInput.value = '';
            } else {
                if (passcodeError) {
                    passcodeError.textContent = 'Passcode không chính xác. Vui lòng thử lại.';
                    passcodeError.classList.remove('hidden');
                }
            }
        });
        
        passcodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitPasscodeBtn.click();
            }
        });
    }
});


// ========== EXCEL EMBED TOGGLE ==========
const toggleSaleEmbedBtn = document.getElementById('toggleSaleEmbedBtn');
const saleEmbedContainer = document.getElementById('saleEmbedContainer');

if (toggleSaleEmbedBtn && saleEmbedContainer) {
    toggleSaleEmbedBtn.addEventListener('click', function() {
        saleEmbedContainer.classList.toggle('hidden');
        if (saleEmbedContainer.classList.contains('hidden')) {
            toggleSaleEmbedBtn.innerHTML = '<i class="fas fa-table mr-2"></i>Xem Excel Trực Tiếp';
        } else {
            toggleSaleEmbedBtn.innerHTML = '<i class="fas fa-table mr-2"></i>Ẩn Excel';
        }
    });
}
