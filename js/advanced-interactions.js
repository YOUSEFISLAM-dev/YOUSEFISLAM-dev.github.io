// Advanced Interactions and Animations Manager
class AdvancedInteractions {
    constructor() {
        this.particles = [];
        this.isPlaying = true;
        this.init();
    }

    init() {
        this.createParticleBackground();
        this.initScrollAnimations();
        this.initSkillAnimations();
        this.init3DEffects();
        this.initParallaxScroll();
        this.initTextRevealAnimations();
        this.createFloatingActionButtons();
        this.initAdvancedHoverEffects();
        this.initIntersectionObserver();
        this.initPerformanceMonitoring();
    }

    // Particle Background System
    createParticleBackground() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        document.body.appendChild(particlesContainer);

        // Create 50 particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }

        // Add new particles every 2 seconds
        setInterval(() => {
            if (this.isPlaying && this.particles.length < 100) {
                this.createParticle(particlesContainer);
            }
        }, 2000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and size
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.width = particle.style.height = (Math.random() * 4 + 1) + 'px';
        
        container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 12000);
    }

    // Scroll-triggered Animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.card, .skill-item, .certificate-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    
                    // Add staggered animation delay
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.transform = 'translateY(50px)';
            el.style.opacity = '0';
            el.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease';
            observer.observe(el);
        });
    }

    // Enhanced Skill Progress Animations
    initSkillAnimations() {
        const skills = [
            { name: 'HTML/CSS/JS/PHP', level: 90 },
            { name: 'Python', level: 85 },
            { name: 'AI/ML', level: 80 },
            { name: 'React', level: 75 },
            { name: 'API\'S', level: 85 },
            { name: 'Arduino', level: 70 },
            { name: 'SQL', level: 80 },
            { name: 'Docker', level: 75 },
            { name: 'GIT/Github', level: 90 }
        ];

        const skillsContainer = document.querySelector('#skills .grid, #skills > div:last-child');
        if (!skillsContainer) return;

        // Clear existing skills and create enhanced version
        skillsContainer.innerHTML = '';
        skillsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

        skills.forEach((skill, index) => {
            const skillElement = this.createSkillElement(skill, index);
            skillsContainer.appendChild(skillElement);
        });

        // Trigger animations when skills come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    const progress = entry.target.querySelector('.skill-progress');
                    if (progressBar && progress) {
                        progress.classList.add('in-view');
                        progressBar.style.transform = `translateX(-${100 - skill.level}%)`;
                    }
                }
            });
        });

        skillsContainer.querySelectorAll('.skill-item').forEach(skill => {
            observer.observe(skill);
        });
    }

    createSkillElement(skill, index) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item glass p-6 rounded-xl hover-glow';
        skillDiv.style.animationDelay = (index * 100) + 'ms';
        
        skillDiv.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-semibold text-primary-light">${skill.name}</h3>
                <span class="text-sm text-gray-400">${skill.level}%</span>
            </div>
            <div class="skill-progress">
                <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
            </div>
        `;
        
        return skillDiv;
    }

    // 3D Transform Effects
    init3DEffects() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.classList.add('card-3d');
            
            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            
            // Move all card content into the inner container
            while (card.firstChild) {
                cardInner.appendChild(card.firstChild);
            }
            card.appendChild(cardInner);

            // Add mouse tracking for 3D effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                cardInner.style.transform = 'rotateX(0) rotateY(0)';
            });
        });
    }

    // Parallax Scroll Effects
    initParallaxScroll() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Text Reveal Animations
    initTextRevealAnimations() {
        const textElements = document.querySelectorAll('h1, h2, h3, .text-reveal');
        
        textElements.forEach(element => {
            if (!element.classList.contains('text-reveal')) {
                element.classList.add('text-reveal');
            }
            
            const content = element.innerHTML;
            element.innerHTML = `<div class="text-content">${content}</div>`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        });

        textElements.forEach(el => observer.observe(el));
    }

    // Floating Action Buttons
    createFloatingActionButtons() {
        const fabContainer = document.createElement('div');
        fabContainer.className = 'fab-container';
        
        const buttons = [
            { icon: 'fas fa-arrow-up', action: this.scrollToTop, title: 'Scroll to Top' },
            { icon: 'fas fa-palette', action: this.toggleTheme, title: 'Toggle Theme' },
            { icon: 'fas fa-play-circle', action: this.toggleAnimations, title: 'Toggle Animations' }
        ];

        buttons.forEach(btn => {
            const fab = document.createElement('button');
            fab.className = 'fab';
            fab.innerHTML = `<i class="${btn.icon}"></i>`;
            fab.title = btn.title;
            fab.addEventListener('click', btn.action.bind(this));
            fabContainer.appendChild(fab);
        });

        document.body.appendChild(fabContainer);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        // You can expand this to implement a full light/dark theme toggle
    }

    toggleAnimations() {
        this.isPlaying = !this.isPlaying;
        document.body.classList.toggle('animations-paused', !this.isPlaying);
    }

    // Advanced Hover Effects
    initAdvancedHoverEffects() {
        const hoverElements = document.querySelectorAll('.card, .skill-item, a');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Enhanced Intersection Observer for Performance
    initIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;
                
                // Apply different effects based on intersection ratio
                if (ratio > 0.5) {
                    element.classList.add('fully-visible');
                } else if (ratio > 0.25) {
                    element.classList.add('partially-visible');
                }
                
                // Trigger custom events for other scripts to listen to
                element.dispatchEvent(new CustomEvent('visibilitychange', {
                    detail: { ratio, isIntersecting: entry.isIntersecting }
                }));
            });
        }, observerOptions);

        document.querySelectorAll('section, .card, .project-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Performance Monitoring
    initPerformanceMonitoring() {
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkFPS = (currentTime) => {
            frameCount++;
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                console.log(`FPS: ${fps}`);
                
                // Adjust animation quality based on performance
                if (fps < 30) {
                    document.body.classList.add('reduce-motion');
                } else {
                    document.body.classList.remove('reduce-motion');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);

        // Memory usage monitoring
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                console.log(`Memory: ${Math.round(memory.usedJSHeapSize / 1048576)}MB`);
            }, 10000);
        }
    }

    // Morphing blob shapes
    createMorphingBlobs() {
        const blobsContainer = document.createElement('div');
        blobsContainer.className = 'morphing-blobs';
        blobsContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        for (let i = 0; i < 3; i++) {
            const blob = document.createElement('div');
            blob.className = 'morph-blob';
            blob.style.cssText = `
                position: absolute;
                width: 300px;
                height: 300px;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation-delay: ${i * 2}s;
            `;
            blobsContainer.appendChild(blob);
        }

        document.body.appendChild(blobsContainer);
    }
}

// Enhanced Loading Manager
class LoadingManager {
    constructor() {
        this.loadedResources = 0;
        this.totalResources = 0;
        this.init();
    }

    init() {
        this.countResources();
        this.trackResourceLoading();
        this.createAdvancedLoader();
    }

    countResources() {
        const images = document.querySelectorAll('img');
        const scripts = document.querySelectorAll('script[src]');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        this.totalResources = images.length + scripts.length + stylesheets.length;
    }

    trackResourceLoading() {
        const updateProgress = () => {
            this.loadedResources++;
            const progress = (this.loadedResources / this.totalResources) * 100;
            this.updateLoader(progress);
            
            if (this.loadedResources >= this.totalResources) {
                this.hideLoader();
            }
        };

        // Track image loading
        document.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                updateProgress();
            } else {
                img.addEventListener('load', updateProgress);
                img.addEventListener('error', updateProgress);
            }
        });

        // Track script and stylesheet loading
        document.querySelectorAll('script[src], link[rel="stylesheet"]').forEach(resource => {
            resource.addEventListener('load', updateProgress);
            resource.addEventListener('error', updateProgress);
        });
    }

    createAdvancedLoader() {
        const loader = document.getElementById('page-loader');
        if (!loader) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #8b5cf6, #6366f1);
            transition: width 0.3s ease;
            margin-top: 20px;
            border-radius: 2px;
        `;

        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressText.textContent = '0%';
        progressText.style.cssText = `
            color: #e2e8f0;
            margin-top: 10px;
            font-size: 14px;
        `;

        const loaderContent = loader.querySelector('.loader-content');
        if (loaderContent) {
            loaderContent.appendChild(progressBar);
            loaderContent.appendChild(progressText);
        }
    }

    updateLoader(progress) {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar) progressBar.style.width = progress + '%';
        if (progressText) progressText.textContent = Math.round(progress) + '%';
    }

    hideLoader() {
        setTimeout(() => {
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }
        }, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedInteractions();
    new LoadingManager();
    
    // Add reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
});

// Export for use in other modules
window.AdvancedInteractions = AdvancedInteractions;
window.LoadingManager = LoadingManager;