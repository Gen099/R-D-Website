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

    // ========== LIBRARY CARD HANDLERS ==========
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

        // Library data - Thư Viện Prompt AI Fotober
        const libraryData = {
            '1': {
                title: 'Danh Sách Công Cụ AI',
                content: `<div class="space-y-6"><div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600"><h4 class="font-bold text-blue-900 mb-4 text-lg flex items-center"><i class="fas fa-tools mr-2"></i>Tạo Ảnh (Image Generation)</h4><div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-blue-100"><th class="p-2 text-left">Công Cụ</th><th class="p-2 text-left">Thế Mạnh</th><th class="p-2 text-left">Tốc Độ</th><th class="p-2 text-left">Giá</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-semibold">Google Nano Banana Pro</td><td class="p-2">Độ phân giải 4K+, chi tiết vật liệu</td><td class="p-2">Nhanh</td><td class="p-2">Rẻ</td></tr><tr class="border-b"><td class="p-2 font-semibold">Zimage</td><td class="p-2">Tối ưu cho bất động sản</td><td class="p-2">Trung bình</td><td class="p-2">Trung bình</td></tr><tr class="border-b"><td class="p-2 font-semibold">Flux</td><td class="p-2">Sáng tạo, nghệ thuật</td><td class="p-2">Nhanh</td><td class="p-2">Rẻ</td></tr><tr><td class="p-2 font-semibold">Seedream</td><td class="p-2">Chuyên biệt cho nội thất</td><td class="p-2">Chậm</td><td class="p-2">Đắt</td></tr></tbody></table></div></div><div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600"><h4 class="font-bold text-orange-900 mb-4 text-lg flex items-center"><i class="fas fa-video mr-2"></i>Tạo Video (Video Generation)</h4><div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-orange-100"><th class="p-2 text-left">Công Cụ</th><th class="p-2 text-left">Thế Mạnh</th><th class="p-2 text-left">Độ Dài</th><th class="p-2 text-left">Giá</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-semibold">Veo 3.1</td><td class="p-2">Chân thực, chuyển động mượt</td><td class="p-2">1-2 phút</td><td class="p-2">Rẻ</td></tr><tr class="border-b"><td class="p-2 font-semibold">Seedance 1.5 Pro</td><td class="p-2">Hiệu ứng đặc biệt</td><td class="p-2">30-60s</td><td class="p-2">Trung bình</td></tr><tr><td class="p-2 font-semibold">Kling 2.6</td><td class="p-2">Motion Control tuyệt vời</td><td class="p-2">1-2 phút</td><td class="p-2">Trung bình</td></tr></tbody></table></div></div></div>`
            },
            '2': {
                title: 'Virtual Staging',
                content: `<div class="space-y-6"><div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600"><h4 class="font-bold text-orange-900 mb-3 text-lg">Prompt Tối Ưu cho Google Nano Banana Pro</h4><div class="bg-white p-4 rounded mb-4 border-l-4 border-orange-400 font-mono text-xs leading-relaxed"><p>Ultra-realistic interior design of an empty living room, adding [STYLE] style furniture:</p><p>- Main furniture: [FURNITURE_LIST]</p><p>- Flooring: [FLOOR_MATERIAL] with [LIGHTING_TYPE] lighting</p><p>- Wall color: [WALL_COLOR]</p><p>- Accessories: [DECORATIVE_ITEMS]</p><p>- Lighting: Soft daylight from large windows, warm accent lighting</p><p>- Camera angle: [ANGLE_DESCRIPTION]</p><p>- Resolution: 8K, architectural photography, photorealistic</p><p>- Mood: [MOOD_DESCRIPTION]</p></div><h5 class="font-semibold text-orange-900 mb-2">Ví dụ cụ thể:</h5><div class="bg-white p-4 rounded border-l-4 border-orange-400 font-mono text-xs leading-relaxed"><p>Ultra-realistic interior design of an empty living room, adding Scandinavian style furniture:</p><p>- Main furniture: Light oak wood sofa, minimalist coffee table, floor lamp</p><p>- Flooring: Light oak wood with soft warm lighting</p><p>- Wall color: Soft white with one accent wall in sage green</p><p>- Accessories: Potted plants, white throw pillows, geometric wall art</p><p>- Lighting: Soft daylight from large windows, warm accent lighting</p><p>- Camera angle: Wide-angle from living room entrance</p><p>- Resolution: 8K, architectural photography, photorealistic</p><p>- Mood: Cozy, modern, minimalist</p></div></div></div>`
            },
            '3': {
                title: 'Day-to-Night',
                content: `<div class="space-y-6"><div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-600"><h4 class="font-bold text-green-900 mb-3 text-lg">Prompt Tối Ưu cho Veo 3.1</h4><div class="bg-white p-4 rounded mb-4 border-l-4 border-green-400 font-mono text-xs leading-relaxed"><p>Cinematic transition video of [LOCATION]:</p><p>- Start: [MORNING_DESCRIPTION] with bright sunlight</p><p>- Middle: [AFTERNOON_DESCRIPTION] with golden hour lighting</p><p>- End: [NIGHT_DESCRIPTION] with interior lights turning on</p><p>- Camera movement: [CAMERA_MOVEMENT]</p><p>- Duration: 30 seconds</p><p>- Resolution: 4K, cinematic, realistic</p><p>- Lighting: Natural transition from daylight to artificial lighting</p><p>- Focus: [FOCUS_AREA]</p></div><h5 class="font-semibold text-green-900 mb-2">Ví dụ cụ thể:</h5><div class="bg-white p-4 rounded border-l-4 border-green-400 font-mono text-xs leading-relaxed"><p>Cinematic transition video of a luxury villa exterior:</p><p>- Start: Bright sunny afternoon with clear blue sky</p><p>- Middle: Golden hour with warm orange sunlight hitting the facade</p><p>- End: Night time with interior lights illuminating the windows</p><p>- Camera movement: Slow dolly shot moving around the building</p><p>- Duration: 30 seconds</p><p>- Resolution: 4K, cinematic, realistic</p></div><div class="bg-yellow-50 p-3 rounded mt-3 text-sm text-yellow-900"><strong>💡 Tip:</strong> Dùng Kling 2.6 khi cần kiểm soát camera chính xác, Veo 3.1 khi cần chân thực tự nhiên</div></div></div>`
            },
            '4': {
                title: 'Real Estate Tour',
                content: `<div class="space-y-6"><div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600"><h4 class="font-bold text-purple-900 mb-3 text-lg">Prompt cho Kling 2.6 (Motion Control)</h4><div class="bg-white p-4 rounded mb-4 border-l-4 border-purple-400 font-mono text-xs leading-relaxed"><p>Smooth gimbal walkthrough of [PROPERTY_TYPE]:</p><p>- Start position: [START_LOCATION]</p><p>- Path: [MOVEMENT_DESCRIPTION]</p><p>- End position: [END_LOCATION]</p><p>- Motion control: [SPEED] speed, [DIRECTION] movement</p><p>- Highlights: [KEY_FEATURES]</p><p>- Lighting: [LIGHTING_CONDITIONS]</p><p>- Duration: 45 seconds</p><p>- Resolution: 4K, smooth motion</p></div><h5 class="font-semibold text-purple-900 mb-2">Ví dụ cụ thể:</h5><div class="bg-white p-4 rounded border-l-4 border-purple-400 font-mono text-xs leading-relaxed"><p>Smooth gimbal walkthrough of a modern apartment:</p><p>- Start position: Main entrance</p><p>- Path: Move forward into living room, pan left to show kitchen</p><p>- End position: Master bedroom with city view</p><p>- Motion control: 0.6 speed, smooth forward and lateral movements</p><p>- Highlights: Floor-to-ceiling windows, marble countertops</p><p>- Lighting: Natural daylight from windows, warm accent lighting</p><p>- Duration: 45 seconds</p></div></div></div>`
            },
            '5': {
                title: 'Product Showcase',
                content: `<div class="space-y-6"><div class="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-600"><h4 class="font-bold text-pink-900 mb-3 text-lg">Prompt cho Seedance 1.5 Pro</h4><div class="bg-white p-4 rounded mb-4 border-l-4 border-pink-400 font-mono text-xs leading-relaxed"><p>Professional product showcase video of [PRODUCT]:</p><p>- Product: [PRODUCT_DESCRIPTION]</p><p>- Background: [BACKGROUND_STYLE]</p><p>- Camera movement: [CAMERA_MOVEMENT]</p><p>- Lighting: [LIGHTING_SETUP]</p><p>- Effects: [SPECIAL_EFFECTS]</p><p>- Duration: 30-45 seconds</p><p>- Style: Professional, modern, cinematic</p></div><h5 class="font-semibold text-pink-900 mb-2">Ví dụ cụ thể:</h5><div class="bg-white p-4 rounded border-l-4 border-pink-400 font-mono text-xs leading-relaxed"><p>Professional product showcase video of a luxury furniture set:</p><p>- Product: Modern minimalist sofa with geometric design</p><p>- Background: Clean white studio with subtle shadow</p><p>- Camera movement: 360-degree rotation with zoom-in on details</p><p>- Lighting: Professional studio lighting with highlights on materials</p><p>- Effects: Subtle particle effects, smooth transitions</p><p>- Duration: 45 seconds</p><p>- Style: Professional, modern, cinematic</p></div></div></div>`
            },
            '6': {
                title: 'Kling O1 Video Editing',
                content: `<div class="space-y-6"><div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-600"><h4 class="font-bold text-red-900 mb-4 text-lg">Khi nào dùng Kling O1?</h4><ul class="space-y-2 mb-4"><li class="flex items-start"><span class="text-red-600 font-bold mr-3">1.</span><span><strong>Sửa lỗi vật lý:</strong> Vật thể biến mất, xuất hiện lỗi</span></li><li class="flex items-start"><span class="text-red-600 font-bold mr-3">2.</span><span><strong>Thêm chi tiết:</strong> Thêm ánh sáng, bóng đổ, phản xạ</span></li><li class="flex items-start"><span class="text-red-600 font-bold mr-3">3.</span><span><strong>Tối ưu chuyển động:</strong> Làm mượt các chuyển động không tự nhiên</span></li><li class="flex items-start"><span class="text-red-600 font-bold mr-3">4.</span><span><strong>Xóa/Thêm đối tượng:</strong> Loại bỏ hoặc thêm vật thể vào video</span></li></ul><h5 class="font-semibold text-red-900 mb-2">Prompt Template:</h5><div class="bg-white p-4 rounded border-l-4 border-red-400 font-mono text-xs leading-relaxed"><p>Edit this video to:</p><p>1. [PROBLEM_TO_FIX]</p><p>2. [ENHANCEMENT_NEEDED]</p><p>3. [STYLE_ADJUSTMENT]</p><p>Focus on: [FOCUS_AREA]</p><p>Maintain: [WHAT_TO_KEEP]</p></div></div></div>`
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
                <div class="text-2xl font-bold text-green-600">88%</div>
                <div class="text-xs text-gray-600">Motion Control</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-purple-600">60s</div>
                <div class="text-xs text-gray-600">Max Length</div>
            </div>
            <div class="bg-white p-3 rounded text-center shadow-sm">
                <div class="text-2xl font-bold text-green-600">$1.5</div>
                <div class="text-xs text-gray-600">Per 30s</div>
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
