// Navigation and Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 768) {
                if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
    
    // Smooth scroll and active navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Close mobile menu after click
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // Update active navigation on scroll
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
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
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 100);
                }, index * 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Add hover effect to section cards
    const sectionCards = document.querySelectorAll('.section-card');
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 opacity-0 pointer-events-none z-50';
    backToTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
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
    
    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i>';
    printBtn.className = 'fixed bottom-24 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50';
    printBtn.title = 'In báo cáo';
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
});
