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
