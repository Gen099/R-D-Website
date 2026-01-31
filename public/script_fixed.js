// R&D AI Video Intelligence Platform - Complete Fixed Script
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded successfully");
    
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

    // ========== PASSCODE HANDLER ==========
    console.log("Initializing Passcode Handler...");
    const passcodeInput = document.getElementById('passcodeInput');
    const submitPasscodeBtn = document.getElementById('submitPasscodeBtn');
    const passcodeError = document.getElementById('passcodeError');
    const reportsPasscodeLayer = document.getElementById('reportsPasscodeLayer');
    const reportContent = document.getElementById('reportContent');
    
    if (submitPasscodeBtn && passcodeInput && reportsPasscodeLayer && reportContent) {
        console.log("Passcode elements found, attaching event listeners...");
        
        submitPasscodeBtn.addEventListener('click', function() {
            const passcode = passcodeInput.value.trim();
            const correctPasscode = '2026';
            
            console.log("Passcode entered:", passcode);
            
            if (passcode === correctPasscode) {
                console.log("Passcode correct!");
                reportsPasscodeLayer.style.display = 'none';
                reportContent.style.display = 'block';
                if (passcodeError) passcodeError.classList.add('hidden');
                passcodeInput.value = '';
            } else {
                console.log("Passcode incorrect!");
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
    } else {
        console.warn("Passcode elements not found:", {
            passcodeInput: !!passcodeInput,
            submitPasscodeBtn: !!submitPasscodeBtn,
            reportsPasscodeLayer: !!reportsPasscodeLayer,
            reportContent: !!reportContent
        });
    }

    // ========== EXCEL EMBED TOGGLE ==========
    console.log("Initializing Excel Embed Toggle...");
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

    // ========== LIBRARY CARD HANDLERS ==========
    console.log("Initializing Library Card Handlers...");
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
            },
            '7': {
                title: 'Bảng So Sánh Công Cụ',
                content: `<div class="space-y-4"><p class="text-gray-700"><strong>Hướng dẫn chọn công cụ phù hợp:</strong></p><table class="w-full text-sm border-collapse"><tr class="bg-gray-100"><th class="border p-2 text-left">Tình Huống</th><th class="border p-2 text-left">Công Cụ</th><th class="border p-2 text-left">Lý Do</th></tr><tr><td class="border p-2">Cần ảnh chân thực 4K+</td><td class="border p-2">Google Nano Banana Pro</td><td class="border p-2">Độ phân giải cao nhất</td></tr><tr><td class="border p-2">Cần video chân thực, mượt</td><td class="border p-2">Veo 3.1</td><td class="border p-2">Chuyển động tự nhiên</td></tr><tr><td class="border p-2">Cần kiểm soát camera chính xác</td><td class="border p-2">Kling 2.6</td><td class="border p-2">Motion Control tuyệt vời</td></tr><tr><td class="border p-2">Cần hiệu ứng đặc biệt</td><td class="border p-2">Seedance 1.5 Pro</td><td class="border p-2">Chuyên biệt cho FX</td></tr><tr><td class="border p-2">Cần sửa lỗi video</td><td class="border p-2">Kling O1</td><td class="border p-2">Chỉnh sửa tự động</td></tr></table></div>`
            },
            '8': {
                title: 'Quy Trình Thực Hiện',
                content: `<div class="space-y-4"><h5 class="font-semibold text-gray-800">Bước 1: Nhận Feedback từ Sale</h5><p class="text-sm text-gray-700">Khách hàng muốn trang trí căn hộ 2 phòng ngủ theo phong cách hiện đại, có ánh sáng tự nhiên từ cửa sổ lớn.</p><h5 class="font-semibold text-gray-800 mt-3">Bước 2: Gửi cho ChatGPT/Claude/Gemini</h5><p class="text-sm text-gray-700">Sử dụng System Prompt kèm feedback từ Sale để viết Prompt tối ưu cho Google Nano Banana Pro.</p><h5 class="font-semibold text-gray-800 mt-3">Bước 3: Nhận Prompt Tối Ưu</h5><p class="text-sm text-gray-700">AI sẽ trả về prompt chi tiết, phù hợp với yêu cầu khách hàng.</p><h5 class="font-semibold text-gray-800 mt-3">Bước 4: Chạy trên Google Nano Banana Pro</h5><p class="text-sm text-gray-700">Copy Prompt vào công cụ, chỉnh sửa nếu cần, lưu kết quả.</p><h5 class="font-semibold text-gray-800 mt-3">Bước 5: Lưu vào Notion Hub</h5><p class="text-sm text-gray-700">Tạo trang mới trong Notion, lưu Prompt, ảnh kết quả, feedback từ khách hàng.</p></div>`
            },
            '9': {
                title: 'System Prompt',
                content: `<div class="space-y-4"><div class="bg-purple-50 p-4 rounded border-l-4 border-purple-600"><p class="text-sm text-gray-700"><strong>Bạn là chuyên gia R&D AI tại Fotober.</strong> Bạn có kiến thức sâu về:</p><ul class="text-sm text-gray-700 mt-2 space-y-1"><li>• Các công cụ AI: Google Nano Banana Pro, Veo 3.1, Kling 2.6, Seedance 1.5 Pro, v.v.</li><li>• Các dịch vụ: Virtual Staging, Day-to-Night, Real Estate Tour, Product Showcase</li><li>• Kỹ thuật Prompt Engineering</li></ul><p class="text-sm text-gray-700 mt-3"><strong>Nhiệm vụ của bạn:</strong></p><ol class="text-sm text-gray-700 mt-2 space-y-1"><li>1. Nhận feedback từ Sale hoặc yêu cầu từ khách hàng</li><li>2. Phân tích yêu cầu và xác định công cụ AI phù hợp nhất</li><li>3. Viết Prompt chi tiết, tối ưu cho từng công cụ</li><li>4. Giải thích lý do chọn công cụ đó</li><li>5. Cung cấp các lựa chọn thay thế nếu cần</li></ol></div></div>`
            },
            '10': {
                title: 'Ghi Chú Quan Trọng',
                content: `<div class="space-y-3"><ul class="space-y-2"><li class="flex items-start"><i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i><span class="text-sm text-gray-700"><strong>Luôn kiểm tra kết quả:</strong> Không phải lần đầu tiên nào cũng hoàn hảo</span></li><li class="flex items-start"><i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i><span class="text-sm text-gray-700"><strong>Điều chỉnh Prompt:</strong> Nếu kết quả không như mong muốn, hãy sửa Prompt</span></li><li class="flex items-start"><i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i><span class="text-sm text-gray-700"><strong>Lưu trữ:</strong> Lưu tất cả Prompt thành công vào Notion Hub để tái sử dụng</span></li><li class="flex items-start"><i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i><span class="text-sm text-gray-700"><strong>Thử nghiệm:</strong> Thử các công cụ khác nhau để tìm ra cái tốt nhất</span></li><li class="flex items-start"><i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i><span class="text-sm text-gray-700"><strong>Feedback:</strong> Ghi lại feedback từ khách hàng để cải thiện Prompt</span></li></ul></div>`
            }
        };

        console.log("Library data initialized with", Object.keys(libraryData).length, "items");

        libraryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                const libraryId = this.getAttribute('data-library-id');
                console.log("Library card clicked:", libraryId);
                if (e.target.closest('.expand-btn')) {
                    openLibraryFullPage(libraryId);
                    return;
                }
                openLibraryModal(libraryId);
            });
        });

        function openLibraryModal(libraryId) {
            console.log("Opening library modal for ID:", libraryId);
            if (libraryData[libraryId]) {
                currentLibraryId = libraryId;
                const data = libraryData[libraryId];
                if (libraryModalTitle) libraryModalTitle.textContent = data.title;
                if (libraryModalContent) libraryModalContent.innerHTML = data.content;
                if (libraryModal) libraryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                console.warn("Library data not found for ID:", libraryId);
            }
        }

        function openLibraryFullPage(libraryId) {
            console.log("Opening library full page for ID:", libraryId);
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
    } else {
        console.warn("Library grid not found");
    }

    console.log("All handlers initialized successfully");
});
