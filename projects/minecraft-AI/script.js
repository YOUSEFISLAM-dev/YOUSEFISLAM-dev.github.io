// Minecraft AI Player - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize download tracking
    initDownloadTracking();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize notifications system
    initNotifications();
    
    // Add loading states
    initLoadingStates();
    
    console.log('Minecraft AI Player website initialized successfully!');
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                updateActiveNavItem(this);
            }
        });
    });
}

// Update active navigation item
function updateActiveNavItem(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Download functionality
function downloadFile(filename) {
    // Show download progress
    showDownloadProgress(filename);
    
    // Simulate download process
    simulateDownload(filename);
    
    // Track download analytics
    trackDownload(filename);
}

function showDownloadProgress(filename) {
    const progressHtml = `
        <div class="download-progress" id="downloadProgress">
            <h3><i class="fas fa-download"></i> Downloading ${filename}</h3>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <p id="progressText">Preparing download...</p>
            <button class="btn btn-secondary" onclick="cancelDownload()">Cancel</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', progressHtml);
    document.getElementById('downloadProgress').style.display = 'block';
}

function simulateDownload(filename) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            completeDownload(filename);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = `Downloading... ${Math.round(progress)}%`;
        
        // Add realistic download messages
        if (progress > 25 && progress < 30) {
            progressText.textContent = 'Verifying file integrity...';
        } else if (progress > 75 && progress < 80) {
            progressText.textContent = 'Finalizing download...';
        }
    }, 200);
}

function completeDownload(filename) {
    const progressText = document.getElementById('progressText');
    progressText.innerHTML = '<i class="fas fa-check"></i> Download completed successfully!';
    
    // Create and trigger download
    createDownloadLink(filename);
    
    // Show success notification
    showNotification('Download completed successfully!', 'success');
    
    // Hide progress after delay
    setTimeout(() => {
        const progressElement = document.getElementById('downloadProgress');
        if (progressElement) {
            progressElement.remove();
        }
    }, 2000);
}

function createDownloadLink(filename) {
    // Create a sample download file (in real implementation, this would be actual files)
    const sampleContent = generateSampleFile(filename);
    const blob = new Blob([sampleContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateSampleFile(filename) {
    // Generate sample content based on file type
    if (filename.includes('.zip')) {
        return `# Minecraft AI Player - ${filename}
# This is a sample download file

README.txt - Installation instructions
minecraft-ai.jar - Main application file
config.json - Configuration file
blueprints/ - Building blueprints folder
plugins/ - Plugins folder
docs/ - Documentation folder

Installation:
1. Extract this ZIP file
2. Install Java 17+
3. Run: java -jar minecraft-ai.jar
4. Follow the setup wizard

For support, visit: https://github.com/minecraft-ai/support
`;
    } else if (filename.includes('.jar')) {
        return `# Minecraft AI Player JAR File
# This is a sample JAR file for demonstration
# In production, this would be the actual compiled Java application

Main-Class: com.minecraftai.Main
Version: 2.1.0
Build-Date: ${new Date().toISOString()}
`;
    }
    
    return `# Minecraft AI Player - ${filename}
# Sample file for demonstration purposes
# Created: ${new Date().toISOString()}
`;
}

function cancelDownload() {
    const progressElement = document.getElementById('downloadProgress');
    if (progressElement) {
        progressElement.remove();
    }
    showNotification('Download cancelled', 'info');
}

// Download tracking and analytics
function trackDownload(filename) {
    const downloadData = {
        filename: filename,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // Store in local storage for demo purposes
    let downloads = JSON.parse(localStorage.getItem('minecraftAIDownloads') || '[]');
    downloads.push(downloadData);
    localStorage.setItem('minecraftAIDownloads', JSON.stringify(downloads));
    
    console.log('Download tracked:', downloadData);
}

function initDownloadTracking() {
    // Display download statistics
    const downloads = JSON.parse(localStorage.getItem('minecraftAIDownloads') || '[]');
    console.log(`Total downloads this session: ${downloads.length}`);
}

// Interactive elements
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .doc-card, .support-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click handlers for documentation cards
    const docCards = document.querySelectorAll('.doc-card');
    docCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const cardTitle = card.querySelector('h3').textContent;
                showNotification(`${cardTitle} will be available soon!`, 'info');
            });
        }
    });
    
    // Add keyboard navigation
    initKeyboardNavigation();
}

function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals
        if (e.key === 'Escape') {
            const progressElement = document.getElementById('downloadProgress');
            if (progressElement) {
                cancelDownload();
            }
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = document.querySelectorAll('.section');
            const currentSection = getCurrentSection();
            
            if (currentSection !== -1) {
                let nextSection;
                if (e.key === 'ArrowDown') {
                    nextSection = Math.min(currentSection + 1, sections.length - 1);
                } else {
                    nextSection = Math.max(currentSection - 1, 0);
                }
                
                sections[nextSection].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 100;
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.offsetHeight) {
            return i;
        }
    }
    return -1;
}

// Notifications system
function initNotifications() {
    // Create notifications container if it doesn't exist
    if (!document.getElementById('notificationsContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationsContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notificationsContainer');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.style.pointerEvents = 'auto';
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        ${message}
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            float: right;
            cursor: pointer;
            font-size: 1.2rem;
            margin-left: 10px;
        ">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Loading states
function initLoadingStates() {
    // Add loading animation to buttons when clicked
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                
                // Remove loading state after action completes
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

// Configuration validator
function validateConfiguration(config) {
    const required = ['server', 'ai', 'behavior'];
    const missing = required.filter(key => !config.hasOwnProperty(key));
    
    if (missing.length > 0) {
        return {
            valid: false,
            errors: [`Missing required sections: ${missing.join(', ')}`]
        };
    }
    
    return { valid: true, errors: [] };
}

// System requirements checker
function checkSystemRequirements() {
    const requirements = {
        java: checkJavaVersion(),
        memory: checkAvailableMemory(),
        disk: checkDiskSpace(),
        network: checkNetworkConnection()
    };
    
    return requirements;
}

function checkJavaVersion() {
    // This would require a server-side check or browser plugin
    // For demo purposes, we'll simulate it
    return {
        available: true,
        version: '21.0.1',
        meets_requirements: true
    };
}

function checkAvailableMemory() {
    // Get approximate memory info if available
    if (navigator.deviceMemory) {
        return {
            available: true,
            total_gb: navigator.deviceMemory,
            meets_requirements: navigator.deviceMemory >= 4
        };
    }
    
    return {
        available: false,
        message: 'Memory information not available'
    };
}

function checkDiskSpace() {
    // This would require a native application or special permissions
    return {
        available: false,
        message: 'Disk space check requires application installation'
    };
}

function checkNetworkConnection() {
    return {
        available: navigator.onLine,
        connection_type: navigator.connection?.effectiveType || 'unknown',
        meets_requirements: navigator.onLine
    };
}

// Search functionality (for future implementation)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.className = 'search-input';
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        searchContent(query);
    });
}

function searchContent(query) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const matches = content.includes(query);
        
        if (query === '') {
            section.style.display = 'block';
        } else {
            section.style.display = matches ? 'block' : 'none';
        }
    });
}

// Analytics and tracking
function initAnalytics() {
    // Track page views
    trackPageView();
    
    // Track user interactions
    trackUserInteractions();
    
    // Track performance metrics
    trackPerformanceMetrics();
}

function trackPageView() {
    const pageData = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Page view tracked:', pageData);
}

function trackUserInteractions() {
    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            const interactionData = {
                type: 'button_click',
                element: e.target.textContent.trim(),
                timestamp: new Date().toISOString()
            };
            
            console.log('Interaction tracked:', interactionData);
        }
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }
    });
    
    // Track scroll depth on page unload
    window.addEventListener('beforeunload', function() {
        console.log('Max scroll depth:', maxScroll + '%');
    });
}

function trackPerformanceMetrics() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log('Page load time:', Math.round(loadTime) + 'ms');
    });
    
    // Track resource loading
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver(function(entries) {
            entries.getEntries().forEach(entry => {
                console.log('Resource loaded:', entry.name, Math.round(entry.duration) + 'ms');
            });
        });
        
        observer.observe({ entryTypes: ['resource'] });
    }
}

// Utility functions
function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initAnalytics();
});

// Export functions for external use
window.MinecraftAI = {
    downloadFile,
    showNotification,
    checkSystemRequirements,
    validateConfiguration
};
