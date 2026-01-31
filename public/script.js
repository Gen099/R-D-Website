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

    // ========== LOAD DASHBOARD USING IFRAME ==========
    function loadDashboardInIframe(targetElement) {
        const iframe = document.createElement('iframe');
        iframe.src = '/dashboard.html';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '6px';
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
        
        targetElement.innerHTML = '';
        targetElement.appendChild(iframe);
        console.log("Dashboard iframe loaded");
    }

    // ========== FEEDBACK CARD CLICK HANDLER ==========
    const feedbackCards = document.querySelectorAll('[data-feedback-id]');
    feedbackCards.forEach(card => {
        card.addEventListener('click', function() {
            if (feedbackModal && modalContent) {
                feedbackModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                loadDashboardInIframe(modalContent);
            }
        });
    });

    // ========== FULL PAGE HANDLER ==========
    if (openFullPageBtn) {
        openFullPageBtn.addEventListener('click', function() {
            if (fullPageView && fullPageContent) {
                fullPageView.classList.remove('hidden');
                loadDashboardInIframe(fullPageContent);
            }
        });
    }

    console.log("All scripts loaded successfully");
});
