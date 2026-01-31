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

    // ========== LOAD DASHBOARD CONTENT FROM EXTERNAL FILE ==========
    function loadDashboardContent(targetElement) {
        fetch('/dashboard.html')
            .then(response => response.text())
            .then(html => {
                // Extract body content from the fetched HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.body.innerHTML;
                targetElement.innerHTML = bodyContent;
                
                // Re-initialize dashboard tabs after content is loaded
                initializeDashboardTabs();
                console.log("Dashboard content loaded successfully");
            })
            .catch(error => {
                console.error("Error loading dashboard:", error);
                targetElement.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng tải lại trang.</p>';
            });
    }

    // ========== FEEDBACK CARD CLICK HANDLER ==========
    const feedbackCards = document.querySelectorAll('[data-feedback-id]');
    feedbackCards.forEach(card => {
        card.addEventListener('click', function() {
            if (feedbackModal && modalContent) {
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                loadDashboardContent(modalContent);
            }
        });
    });

    // ========== FULL PAGE HANDLER ==========
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (fullPageView && fullPageContent) {
                fullPageView.classList.remove('hidden');
                loadDashboardContent(fullPageContent);
            }
        });
    }

    // ========== INITIALIZE DASHBOARD TABS ==========
    function initializeDashboardTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (tabButtons.length > 0) {
            tabButtons[0].classList.add('active');
        }
        if (tabContents.length > 0) {
            tabContents[0].classList.add('active');
        }
    }

    // ========== GLOBAL FUNCTION FOR TAB SWITCHING ==========
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
