// R&D AI Video Intelligence Platform - Full Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVIGATION & UI ==========
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Create overlay backdrop for mobile
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-30 hidden transition-opacity duration-300';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (window.innerWidth < 768) {
                overlay.classList.toggle('hidden');
            }
        });
        
        // Close sidebar when clicking overlay
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.add('hidden');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 768) {
                if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && !overlay.contains(event.target)) {
                    sidebar.classList.remove('active');
                    overlay.classList.add('hidden');
                }
            }
        });
    }
    
    // Tab-based navigation and active state
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active-tab');
        });
        
        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-tab');
        }
        
        // Update active navigation item
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${targetId}`) {
                item.classList.add('active');
            }
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${targetId}`);
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Close mobile menu after click
            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
                document.getElementById('sidebarOverlay').classList.add('hidden');
            }
        });
    });
    
    // Initial load: check URL hash or default to the first section
    const initialHash = window.location.hash ? window.location.hash.substring(1) : sections[0].id.replace(' content-section ', '');
    showSection(initialHash);
    
    // Control dynamic footer visibility
    function updateFooterVisibility(tabId) {
        const dynamicFooter = document.getElementById('dynamicFooter');
        const hiddenTabs = ['overview', 'company', 'services'];
        
        if (hiddenTabs.includes(tabId)) {
            dynamicFooter.style.display = 'none';
        } else {
            dynamicFooter.style.display = 'block';
        }
    }
    
    // Update footer when showing a section
    const originalShowSection = showSection;
    showSection = function(targetId) {
        originalShowSection(targetId);
        updateFooterVisibility(targetId);
    };
    
    // Initial footer visibility
    updateFooterVisibility(initialHash);
    
    // ========== PASSCODE PROTECTION FOR REPORTS ==========
    const reportsPasscodeBtn = document.getElementById('reportsPasscodeBtn');
    const reportsPasscodeInput = document.getElementById('reportsPasscodeInput');
    const reportsPasscodeLayer = document.getElementById('reportsPasscodeLayer');
    const reportsContent = document.getElementById('reportsContent');
    
    // Default passcode (hardcoded for security - session-only)
    const DEFAULT_PASSCODE = 'fotober2026';
    
    // Get correct passcode (from hardcoded default)
    function getCorrectPasscode() {
        return DEFAULT_PASSCODE;
    }
    
    // Check if user is already authenticated for reports
    function isReportsAuthenticated() {
        return sessionStorage.getItem('reportsAuthenticated') === 'true';
    }
    
    // Set authentication status
    function setReportsAuthenticated(value) {
        if (value) {
            sessionStorage.setItem('reportsAuthenticated', 'true');
        } else {
            sessionStorage.removeItem('reportsAuthenticated');
        }
    }
    
    // Show/hide reports content based on authentication
    function updateReportsVisibility() {
        if (isReportsAuthenticated()) {
            reportsPasscodeLayer.style.display = 'none';
            reportsContent.style.display = 'block';
        } else {
            reportsPasscodeLayer.style.display = 'block';
            reportsContent.style.display = 'none';
        }
    }
    
    // Handle passcode verification
    if (reportsPasscodeBtn) {
        reportsPasscodeBtn.addEventListener('click', function() {
            const inputPasscode = reportsPasscodeInput.value.trim();
            const correctPasscode = getCorrectPasscode();
            
            if (inputPasscode === correctPasscode) {
                setReportsAuthenticated(true);
                updateReportsVisibility();
                reportsPasscodeInput.value = '';
            } else {
                alert('Passcode không chín xác. Vui lòng thử lại.');
                reportsPasscodeInput.value = '';
                reportsPasscodeInput.focus();
            }
        });
        
        // Allow Enter key to submit
        reportsPasscodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                reportsPasscodeBtn.click();
            }
        });
    }
    
    // Initial reports visibility check
    updateReportsVisibility();
    
    // Remove scroll-based active navigation (no longer needed)
    // window.addEventListener('scroll', updateActiveNav);
    // updateActiveNav(); // Initial call
    
    // ========== CHARTS ==========
    
    // Chart 1: Error Classification
    const errorCtx = document.getElementById('errorChart');
    if (errorCtx) {
        new Chart(errorCtx, {
            type: 'bar',
            data: {
                labels: ['Hiểu sai yêu cầu', 'Chất lượng AI kém', 'Trễ deadline', 'Vật lý/Logic không hợp lý'],
                datasets: [{
                    label: 'Số lượng cases',
                    data: [8, 6, 5, 4],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                        'rgba(234, 179, 8, 0.8)',
                        'rgba(59, 130, 246, 0.8)'
                    ],
                    borderColor: [
                        'rgb(239, 68, 68)',
                        'rgb(249, 115, 22)',
                        'rgb(234, 179, 8)',
                        'rgb(59, 130, 246)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Phân bố lỗi theo nhóm (Tổng 23 jobs)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = 23;
                                const value = context.parsed.y;
                                const percentage = ((value / total) * 100).toFixed(0);
                                return `${value} cases (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Số lượng cases'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Chart 2: Effect Error Rate
    const effectErrorCtx = document.getElementById('effectErrorChart');
    if (effectErrorCtx) {
        new Chart(effectErrorCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Người/Lifestyle (71%)',
                    'Season/Weather (67%)',
                    'Object Animation (100%)',
                    'Day-to-Night (33%)',
                    'Furniture Staging (33%)',
                    'Creative/Fantasy (100%)',
                    'Agent Composite (100%)'
                ],
                datasets: [{
                    data: [71, 67, 100, 33, 33, 100, 100],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                        'rgba(234, 179, 8, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 10
                            },
                            padding: 10,
                            boxWidth: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Tỷ lệ lỗi theo loại hiệu ứng AI',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '% lỗi';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Chart 3: Timeline Chart (Gantt-style)
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
        new Chart(timelineCtx, {
            type: 'bar',
            data: {
                labels: ['Tuần 1-2', 'Tuần 3-4', 'Tuần 5-6', 'Tuần 7-8', 'Tuần 9-10', 'Tuần 11-12'],
                datasets: [
                    {
                        label: 'Thiết lập Nền tảng',
                        data: [100, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(168, 85, 247, 0.8)',
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 2
                    },
                    {
                        label: 'Bài toán 1: Thay Agent',
                        data: [0, 50, 50, 0, 0, 0],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 2
                    },
                    {
                        label: 'Bài toán 2: Image-to-Video',
                        data: [0, 50, 50, 0, 0, 0],
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgb(34, 197, 94)',
                        borderWidth: 2
                    },
                    {
                        label: 'Tối ưu & Scale',
                        data: [0, 0, 0, 100, 100, 100],
                        backgroundColor: 'rgba(249, 115, 22, 0.8)',
                        borderColor: 'rgb(249, 115, 22)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Lộ trình R&D Q1/2026 - Phân bổ công việc theo tuần',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.parsed.x > 0) {
                                    return context.dataset.label + ': Đang thực hiện';
                                }
                                return null;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Mức độ hoàn thành'
                        }
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
    }
    
    // ========== ANIMATIONS ==========
    
    // Animate stats on scroll
    const statsCards = document.querySelectorAll('.stat-card');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statsCards.forEach(card => {
        statsObserver.observe(card);
    });
    
    // Animate module cards
    const moduleCards = document.querySelectorAll('.module-card');
    const moduleObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
                moduleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    moduleCards.forEach(card => {
        moduleObserver.observe(card);
    });
    
    // Animate flowchart boxes
    const flowchartBoxes = document.querySelectorAll('.flowchart-box');
    const flowchartObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 100);
                }, index * 200);
                flowchartObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    flowchartBoxes.forEach(box => {
        flowchartObserver.observe(box);
    });
    
    // Animate phase cards
    const phaseCards = document.querySelectorAll('.phase-card');
    const phaseObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 100);
                }, index * 150);
                phaseObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    phaseCards.forEach(card => {
        phaseObserver.observe(card);
    });
    
    // ========== UTILITY BUTTONS ==========
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 opacity-0 pointer-events-none z-50';
    backToTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
    backToTopBtn.title = 'Lên đầu trang';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Print button
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i>';
    printBtn.className = 'fixed bottom-24 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50';
    printBtn.title = 'In báo cáo';
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Share button
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.className = 'fixed bottom-40 right-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50';
    shareBtn.title = 'Chia sẻ';
    document.body.appendChild(shareBtn);
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'R&D AI Video Intelligence Platform - Fotober',
                text: 'Hệ thống phân tích và nghiên cứu AI Video',
                url: window.location.href
            }).catch(err => console.log('Share error:', err));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Đã sao chép link vào clipboard!');
            });
        }
    });
    
    // ========== INTERACTIVE FEATURES ==========
    
    // Hover effects on section cards
    const sectionCards = document.querySelectorAll('.section-card');
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Badge hover effects
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Progress indicator on scroll
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // ========== TAB FUNCTIONALITY (if needed) ==========
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // ========== SEARCH FUNCTIONALITY ==========
    
    // Add search box (optional)
    const searchBox = document.createElement('div');
    searchBox.className = 'fixed top-20 right-8 bg-white rounded-lg shadow-lg p-4 opacity-0 pointer-events-none transition-all duration-300 z-40';
    searchBox.style.width = '300px';
    searchBox.innerHTML = `
        <input type="text" id="searchInput" placeholder="Tìm kiếm..." 
               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
        <div id="searchResults" class="mt-2 max-h-60 overflow-y-auto"></div>
    `;
    document.body.appendChild(searchBox);
    
    // Search toggle button
    const searchToggle = document.createElement('button');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
    searchToggle.className = 'fixed top-24 right-8 bg-indigo-600 text-white w-10 h-10 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 hidden md:flex items-center justify-center';
    searchToggle.title = 'Tìm kiếm';
    document.body.appendChild(searchToggle);
    
    searchToggle.addEventListener('click', function() {
        if (searchBox.style.opacity === '0') {
            searchBox.style.opacity = '1';
            searchBox.style.pointerEvents = 'auto';
            document.getElementById('searchInput').focus();
        } else {
            searchBox.style.opacity = '0';
            searchBox.style.pointerEvents = 'none';
        }
    });
    
    // Simple search implementation
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchResults.innerHTML = '';
            
            if (query.length < 2) return;
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    const result = document.createElement('div');
                    result.className = 'p-2 hover:bg-gray-100 cursor-pointer rounded text-sm';
                    result.textContent = section.querySelector('h2, h3')?.textContent || 'Kết quả';
                    result.addEventListener('click', function() {
                        section.scrollIntoView({ behavior: 'smooth' });
                        searchBox.style.opacity = '0';
                        searchBox.style.pointerEvents = 'none';
                    });
                    searchResults.appendChild(result);
                }
            });
            
            if (searchResults.children.length === 0) {
                searchResults.innerHTML = '<p class="text-sm text-gray-500 p-2">Không tìm thấy kết quả</p>';
            }
        });
    }
    
    // ========== ACCESSIBILITY ==========
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchToggle.click();
        }
        
        // ESC: Close search
        if (e.key === 'Escape') {
            searchBox.style.opacity = '0';
            searchBox.style.pointerEvents = 'none';
        }
    });
    
    // Chart toggle and sort controls
    const toggleChartBtn = document.getElementById('toggleChartBtn');
    const sortFeedbackBtn = document.getElementById('sortFeedbackBtn');
    const chartContainer = document.getElementById('chartContainer');
    const lastUpdateDate = document.getElementById('lastUpdateDate');
    let isChartExpanded = false;
    
    if (toggleChartBtn) {
        toggleChartBtn.addEventListener('click', function() {
            isChartExpanded = !isChartExpanded;
            if (isChartExpanded) {
                chartContainer.style.height = '600px';
                toggleChartBtn.innerHTML = '<i class="fas fa-compress mr-1"></i>Thu gon';
            } else {
                chartContainer.style.height = 'auto';
                toggleChartBtn.innerHTML = '<i class="fas fa-expand mr-1"></i>Mo rong';
            }
        });
    }
    
    if (sortFeedbackBtn) {
        let sortOrder = 'desc';
        sortFeedbackBtn.addEventListener('click', function() {
            sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            if (sortOrder === 'desc') {
                sortFeedbackBtn.innerHTML = '<i class="fas fa-sort-amount-down mr-1"></i>Moi nhat';
            } else {
                sortFeedbackBtn.innerHTML = '<i class="fas fa-sort-amount-up mr-1"></i>Cu nhat';
            }
        });
    }
    
    if (lastUpdateDate) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        lastUpdateDate.textContent = day + '/' + month + '/' + year;
    }
    
    console.log('🚀 R&D AI Video Intelligence Platform loaded successfully!');
});

    // Accordion logic for feedback section
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            const isOpen = !content.classList.contains('hidden');
            
            if (isOpen) {
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
                icon.style.transition = 'transform 0.3s ease';
            } else {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(90deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    });
// Enhanced Feedback Grid with Full Page and Whiteboard
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Sale Embed
    const toggleSaleEmbedBtn = document.getElementById('toggleSaleEmbedBtn');
    const saleEmbedContainer = document.getElementById('saleEmbedContainer');
    
    if (toggleSaleEmbedBtn && saleEmbedContainer) {
        toggleSaleEmbedBtn.addEventListener('click', function() {
            if (saleEmbedContainer.classList.contains('hidden')) {
                saleEmbedContainer.classList.remove('hidden');
                toggleSaleEmbedBtn.innerHTML = '<i class="fas fa-eye-slash mr-2"></i>Ẩn Excel';
            } else {
                saleEmbedContainer.classList.add('hidden');
                toggleSaleEmbedBtn.innerHTML = '<i class="fas fa-table mr-2"></i>Xem Excel Trực Tiếp';
            }
        });
    }

    // Elements
    const feedbackCards = document.querySelectorAll('.feedback-card');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const openFullPageBtn = document.getElementById('openFullPageBtn');
    const openWhiteboardBtn = document.getElementById('openWhiteboardBtn');
    
    const fullPageView = document.getElementById('fullPageView');
    const fullPageTitle = document.getElementById('fullPageTitle');
    const fullPageContent = document.getElementById('fullPageContent');
    const closeFullPageBtn = document.getElementById('closeFullPageBtn');
    const fullPageWhiteboardBtn = document.getElementById('fullPageWhiteboardBtn');
    
    const whiteboardModal = document.getElementById('whiteboardModal');
    const closeWhiteboardBtn = document.getElementById('closeWhiteboardBtn');
    const saveWhiteboardBtn = document.getElementById('saveWhiteboardBtn');
    const clearWhiteboardBtn = document.getElementById('clearWhiteboardBtn');

    // Current feedback ID
    let currentFeedbackId = null;

    // Feedback data
    const feedbackData = {
        '1': {
            title: 'Phân Tích 23 Job Feedback',
            date: '30/01/2026',
            content: `
                <div class="space-y-6">
                    <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                        <h4 class="font-bold text-blue-900 mb-3 text-xl">📊 Tổng Quan</h4>
                        <p class="text-gray-700 leading-relaxed">Phân tích toàn bộ 23 jobs feedback từ khách hàng và sale team, xác định các pattern lỗi chính và đề xuất giải pháp cải thiện quy trình làm việc.</p>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg border shadow-sm">
                        <h4 class="font-bold text-gray-800 mb-4 text-lg">📈 Phân Loại Lỗi</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                                <span class="font-semibold text-gray-800">Hiểu sai yêu cầu</span>
                                <span class="text-red-600 font-bold text-lg">35% (8 cases)</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                <span class="font-semibold text-gray-800">Chất lượng AI kém</span>
                                <span class="text-orange-600 font-bold text-lg">26% (6 cases)</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                <span class="font-semibold text-gray-800">Trễ deadline</span>
                                <span class="text-yellow-600 font-bold text-lg">22% (5 cases)</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                <span class="font-semibold text-gray-800">Logic không hợp lý</span>
                                <span class="text-blue-600 font-bold text-lg">17% (4 cases)</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                        <h4 class="font-bold text-green-900 mb-4 text-lg">✅ Đề Xuất Giải Pháp</h4>
                        <div class="space-y-3">
                            <div class="flex items-start bg-white p-3 rounded-lg">
                                <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                                <span class="text-gray-700">Cải thiện quy trình briefing với Sale, đảm bảo thông tin đầy đủ và rõ ràng</span>
                            </div>
                            <div class="flex items-start bg-white p-3 rounded-lg">
                                <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                                <span class="text-gray-700">Tăng cường training về công cụ AI mới (Google Nano Banana Pro, Veo 3.1, Kling 2.6)</span>
                            </div>
                            <div class="flex items-start bg-white p-3 rounded-lg">
                                <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                                <span class="text-gray-700">Thiết lập timeline rõ ràng hơn với buffer 20% cho mỗi task</span>
                            </div>
                            <div class="flex items-start bg-white p-3 rounded-lg">
                                <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                                <span class="text-gray-700">Review kỹ output trước khi gửi khách, có checklist quality control</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg border shadow-sm">
                        <h4 class="font-bold text-gray-800 mb-4 text-lg">📊 Dữ Liệu Chi Tiết</h4>
                        <iframe src="https://docs.google.com/spreadsheets/d/1ulrICF3uoc0p8fsJFYqMMNZ-yraZF-z6w303uYaCmmo/edit?usp=sharing&rm=minimal&widget=true&headers=false" 
                                class="w-full border rounded-lg" 
                                style="height: 500px;"
                                frameborder="0">
                        </iframe>
                    </div>

                    <div class="flex gap-3">
                        <a href="https://www.notion.so/2f8da80a59b381f38419ed695b275ca8" target="_blank" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                            <i class="fas fa-external-link-alt mr-2"></i>Xem Chi Tiết Trên Notion
                        </a>
                        <a href="https://docs.google.com/spreadsheets/d/1ulrICF3uoc0p8fsJFYqMMNZ-yraZF-z6w303uYaCmmo/edit?usp=sharing" target="_blank" class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                            <i class="fas fa-table mr-2"></i>Mở Google Sheets
                        </a>
                    </div>
                </div>
            `
        }
    };

    // Open modal when clicking on feedback card
    feedbackCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if click is on expand button
            if (e.target.closest('.expand-btn')) {
                const feedbackId = this.getAttribute('data-feedback-id');
                openFullPage(feedbackId);
                return;
            }

            const feedbackId = this.getAttribute('data-feedback-id');
            const hasContent = this.getAttribute('data-has-content') === 'true';
            
            if (hasContent && feedbackData[feedbackId]) {
                currentFeedbackId = feedbackId;
                const data = feedbackData[feedbackId];
                modalTitle.textContent = data.title;
                modalContent.innerHTML = data.content;
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            feedbackModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (feedbackModal) {
        feedbackModal.addEventListener('click', function(e) {
            if (e.target === feedbackModal) {
                feedbackModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Open Full Page
    function openFullPage(feedbackId) {
        if (feedbackData[feedbackId]) {
            currentFeedbackId = feedbackId;
            const data = feedbackData[feedbackId];
            fullPageTitle.textContent = data.title;
            fullPageContent.innerHTML = data.content;
            fullPageView.classList.remove('hidden');
            feedbackModal.classList.add('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Open Full Page from modal
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (currentFeedbackId) {
                openFullPage(currentFeedbackId);
            }
        });
    }

    // Close Full Page
    if (closeFullPageBtn) {
        closeFullPageBtn.addEventListener('click', function() {
            fullPageView.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Open Whiteboard from modal
    if (openWhiteboardBtn) {
        openWhiteboardBtn.addEventListener('click', function() {
            whiteboardModal.classList.remove('hidden');
        });
    }

    // Open Whiteboard from full page
    if (fullPageWhiteboardBtn) {
        fullPageWhiteboardBtn.addEventListener('click', function() {
            whiteboardModal.classList.remove('hidden');
        });
    }

    // Close Whiteboard
    if (closeWhiteboardBtn) {
        closeWhiteboardBtn.addEventListener('click', function() {
            whiteboardModal.classList.add('hidden');
        });
    }

    // Save Whiteboard
    if (saveWhiteboardBtn) {
        saveWhiteboardBtn.addEventListener('click', function() {
            alert('Tính năng lưu whiteboard đang được phát triển. Bạn có thể sử dụng Export trong Excalidraw để lưu file.');
        });
    }

    // Clear Whiteboard
    if (clearWhiteboardBtn) {
        clearWhiteboardBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn xóa toàn bộ nội dung whiteboard?')) {
                // Reload iframe to clear
                const whiteboardFrame = document.getElementById('whiteboardFrame');
                whiteboardFrame.src = whiteboardFrame.src;
            }
        });
    }

    // Close whiteboard when clicking outside
    if (whiteboardModal) {
        whiteboardModal.addEventListener('click', function(e) {
            if (e.target === whiteboardModal) {
                whiteboardModal.classList.add('hidden');
            }
        });
    }

    // Sort by date
    const sortByDateBtn = document.getElementById('sortByDateBtn');
    const feedbackGrid = document.getElementById('feedbackGrid');
    
    if (sortByDateBtn && feedbackGrid) {
        let sortAscending = false;
        sortByDateBtn.addEventListener('click', function() {
            const cards = Array.from(feedbackGrid.children);
            cards.sort((a, b) => {
                const dateA = a.getAttribute('data-date') ? new Date(a.getAttribute('data-date')) : new Date(0);
                const dateB = b.getAttribute('data-date') ? new Date(b.getAttribute('data-date')) : new Date(0);
                return sortAscending ? dateA - dateB : dateB - dateA;
            });
            
            feedbackGrid.innerHTML = '';
            cards.forEach(card => feedbackGrid.appendChild(card));
            
            sortAscending = !sortAscending;
            sortByDateBtn.innerHTML = sortAscending 
                ? '<i class="fas fa-calendar-alt mr-1"></i>Cũ nhất trước'
                : '<i class="fas fa-calendar-alt mr-1"></i>Mới nhất trước';
        });
    }

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!whiteboardModal.classList.contains('hidden')) {
                whiteboardModal.classList.add('hidden');
            } else if (!fullPageView.classList.contains('hidden')) {
                fullPageView.classList.add('hidden');
                document.body.style.overflow = 'auto';
            } else if (!feedbackModal.classList.contains('hidden')) {
                feedbackModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });
});
