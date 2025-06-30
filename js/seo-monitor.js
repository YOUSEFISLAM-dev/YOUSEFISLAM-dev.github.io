// SEO Monitor - Track site performance
class SEOMonitor {
    constructor() {
        this.pageLoadTime = 0;
        this.seoIssues = [];
        this.init();
    }
    
    init() {
        // Measure page load time
        this.measurePageLoadTime();
        
        // Check for common SEO issues
        this.checkMetaTags();
        this.checkHeadings();
        this.checkImages();
        this.checkLinks();
        
        // Log results
        window.addEventListener('load', () => {
            console.log('SEO Monitor Results:');
            console.log(`Page Load Time: ${this.pageLoadTime.toFixed(2)}ms`);
            
            if (this.seoIssues.length === 0) {
                console.log('No SEO issues found!');
            } else {
                console.log('SEO Issues Found:', this.seoIssues);
            }
        });
    }
    
    measurePageLoadTime() {
        const start = performance.now();
        window.addEventListener('load', () => {
            this.pageLoadTime = performance.now() - start;
        });
    }
    
    checkMetaTags() {
        const title = document.querySelector('title');
        const description = document.querySelector('meta[name="description"]');
        
        if (!title || title.textContent.length < 10) {
            this.seoIssues.push('Title tag missing or too short (should be at least 10 characters)');
        }
        
        if (!description || !description.getAttribute('content') || description.getAttribute('content').length < 50) {
            this.seoIssues.push('Meta description missing or too short (should be at least 50 characters)');
        }
    }
    
    checkHeadings() {
        const h1Tags = document.querySelectorAll('h1');
        
        if (h1Tags.length === 0) {
            this.seoIssues.push('No H1 tag found');
        } else if (h1Tags.length > 1) {
            this.seoIssues.push('Multiple H1 tags found (should have only one)');
        }
    }
    
    checkImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.getAttribute('alt')) {
                this.seoIssues.push(`Image missing alt text: ${img.src}`);
            }
        });
    }
    
    checkLinks() {
        const links = document.querySelectorAll('a');
        
        links.forEach(link => {
            if (!link.getAttribute('href')) {
                this.seoIssues.push('Link found without href attribute');
            }
        });
    }
}

// Initialize SEO monitor
document.addEventListener('DOMContentLoaded', () => {
    new SEOMonitor();
});
