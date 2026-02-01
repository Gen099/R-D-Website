// Simple Client-Side Router for SPA-like experience
class Router {
  constructor() {
    this.routes = {};
    this.currentPath = window.location.pathname;
    
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.hasAttribute('target')) {
        e.preventDefault();
        const path = link.getAttribute('href');
        this.navigate(path);
      }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.loadPage(window.location.pathname);
    });
  }
  
  navigate(path) {
    if (path === this.currentPath) return;
    
    console.log('🔄 Navigating to:', path);
    window.history.pushState({}, '', path);
    this.currentPath = path;
    this.loadPage(path);
  }
  
  async loadPage(path) {
    try {
      const response = await fetch(path, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      
      if (!response.ok) {
        console.error('Failed to load page:', path);
        return;
      }
      
      const html = await response.text();
      
      // Parse HTML and extract content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Update main content (everything inside body except nav and footer)
      const newContent = doc.querySelector('.main-content');
      const currentContent = document.querySelector('.main-content');
      
      if (newContent && currentContent) {
        currentContent.innerHTML = newContent.innerHTML;
        
        // Update active nav state
        this.updateActiveNav(path);
        
        // Scroll to top
        window.scrollTo(0, 0);
      } else {
        // Fallback: full page reload
        window.location.href = path;
      }
    } catch (error) {
      console.error('Router error:', error);
      window.location.href = path;
    }
  }
  
  updateActiveNav(path) {
    // Remove all active classes
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('bg-white', 'text-orange-600', 'font-semibold', 'shadow-lg');
      link.classList.add('bg-white', 'bg-opacity-20');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`nav a[href="${path}"]`) ||
                       document.querySelector(`nav a[href^="${path.split('/')[1]}"]`);
    
    if (activeLink) {
      activeLink.classList.remove('bg-opacity-20');
      activeLink.classList.add('bg-white', 'text-orange-600', 'font-semibold', 'shadow-lg');
    }
  }
}

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Router initialized');
    new Router();
  });
} else {
  console.log('✅ Router initialized');
  new Router();
}
