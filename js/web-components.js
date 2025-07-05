// Interactive Project Showcase Web Component
class InteractiveProject extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isExpanded = false;
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    static get observedAttributes() {
        return ['title', 'description', 'image', 'tags', 'demo-url', 'github-url'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Project Title';
        const description = this.getAttribute('description') || 'Project description';
        const image = this.getAttribute('image') || '';
        const tags = (this.getAttribute('tags') || '').split(',').filter(t => t.trim());
        const demoUrl = this.getAttribute('demo-url') || '';
        const githubUrl = this.getAttribute('github-url') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 20px 0;
                }

                .project-card {
                    background: rgba(30, 41, 59, 0.25);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    border-radius: 16px;
                    padding: 24px;
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: pointer;
                    overflow: hidden;
                    position: relative;
                }

                .project-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
                    transition: left 0.5s;
                    z-index: 1;
                }

                .project-card:hover::before {
                    left: 100%;
                }

                .project-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
                    border-color: rgba(139, 92, 246, 0.4);
                }

                .project-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 16px;
                    position: relative;
                    z-index: 2;
                }

                .project-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #8b5cf6;
                    margin: 0;
                    text-decoration: none;
                }

                .project-tags {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .tag {
                    background: rgba(51, 65, 85, 0.8);
                    color: #e2e8f0;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .tag:hover {
                    background: rgba(139, 92, 246, 0.8);
                    transform: scale(1.05);
                }

                .project-content {
                    position: relative;
                    z-index: 2;
                }

                .project-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin: 16px 0;
                    transition: transform 0.3s ease;
                }

                .project-image:hover {
                    transform: scale(1.05);
                }

                .project-description {
                    color: #cbd5e1;
                    line-height: 1.6;
                    margin: 16px 0;
                }

                .project-links {
                    display: flex;
                    gap: 12px;
                    margin-top: 20px;
                }

                .project-link {
                    padding: 10px 20px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .primary-link {
                    background: linear-gradient(135deg, #8b5cf6, #6366f1);
                    color: white;
                }

                .primary-link:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
                }

                .secondary-link {
                    background: rgba(51, 65, 85, 0.8);
                    color: #e2e8f0;
                    border: 1px solid rgba(139, 92, 246, 0.3);
                }

                .secondary-link:hover {
                    background: rgba(139, 92, 246, 0.2);
                    border-color: rgba(139, 92, 246, 0.6);
                }

                .expand-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .expand-content.expanded {
                    max-height: 500px;
                }

                .live-demo {
                    margin-top: 20px;
                    padding: 20px;
                    background: rgba(15, 23, 42, 0.8);
                    border-radius: 12px;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .demo-iframe {
                    width: 100%;
                    height: 300px;
                    border: none;
                    border-radius: 8px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 16px;
                    margin-top: 20px;
                }

                .stat-item {
                    text-align: center;
                    padding: 16px;
                    background: rgba(30, 41, 59, 0.5);
                    border-radius: 8px;
                    border: 1px solid rgba(139, 92, 246, 0.1);
                }

                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #8b5cf6;
                    display: block;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: #94a3b8;
                    margin-top: 4px;
                }

                .expand-btn {
                    background: none;
                    border: none;
                    color: #8b5cf6;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    z-index: 3;
                }

                .expand-btn:hover {
                    background: rgba(139, 92, 246, 0.1);
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .project-header {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .project-links {
                        flex-direction: column;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <div class="project-card">
                <button class="expand-btn" id="expandBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.924 1.617l4 9a1 1 0 0 0 1.848 0l4-9z"/>
                    </svg>
                </button>

                <div class="project-header">
                    <h3 class="project-title">${title}</h3>
                    <div class="project-tags">
                        ${tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
                    </div>
                </div>

                <div class="project-content">
                    ${image ? `<img class="project-image" src="${image}" alt="${title}" loading="lazy">` : ''}
                    
                    <p class="project-description">${description}</p>

                    <div class="project-links">
                        ${demoUrl ? `<a href="${demoUrl}" class="project-link primary-link" target="_blank">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zM21 3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/>
                            </svg>
                            Live Demo
                        </a>` : ''}
                        
                        ${githubUrl ? `<a href="${githubUrl}" class="project-link secondary-link" target="_blank">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View Code
                        </a>` : ''}
                    </div>

                    <div class="expand-content" id="expandContent">
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-number">5.2k</span>
                                <span class="stat-label">Lines of Code</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">24</span>
                                <span class="stat-label">Components</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">98%</span>
                                <span class="stat-label">Test Coverage</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">A+</span>
                                <span class="stat-label">Performance</span>
                            </div>
                        </div>

                        ${demoUrl ? `
                        <div class="live-demo">
                            <h4 style="color: #8b5cf6; margin: 0 0 16px 0;">Live Preview</h4>
                            <iframe class="demo-iframe" src="${demoUrl}" loading="lazy"></iframe>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const expandBtn = this.shadowRoot.getElementById('expandBtn');
        const expandContent = this.shadowRoot.getElementById('expandContent');

        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isExpanded = !this.isExpanded;
            
            if (this.isExpanded) {
                expandContent.classList.add('expanded');
                expandBtn.style.transform = 'rotate(180deg)';
            } else {
                expandContent.classList.remove('expanded');
                expandBtn.style.transform = 'rotate(0deg)';
            }

            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('projectToggle', {
                detail: { expanded: this.isExpanded },
                bubbles: true
            }));
        });

        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        observer.observe(this);
        
        // Initial state
        this.style.opacity = '0';
        this.style.transform = 'translateY(30px)';
        this.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
}

// Skill Demonstration Component
class SkillDemo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.initDemo();
    }

    static get observedAttributes() {
        return ['skill', 'level', 'demo-type'];
    }

    render() {
        const skill = this.getAttribute('skill') || 'Skill';
        const level = this.getAttribute('level') || '0';
        const demoType = this.getAttribute('demo-type') || 'progress';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 16px 0;
                }

                .skill-container {
                    background: rgba(30, 41, 59, 0.25);
                    backdrop-filter: blur(10px);
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    transition: all 0.3s ease;
                }

                .skill-container:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
                }

                .skill-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .skill-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #8b5cf6;
                }

                .skill-level {
                    font-size: 0.9rem;
                    color: #94a3b8;
                }

                .progress-container {
                    position: relative;
                    height: 8px;
                    background: rgba(51, 65, 85, 0.5);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #8b5cf6, #6366f1);
                    border-radius: 4px;
                    width: 0%;
                    transition: width 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                }

                .progress-bar::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background-image: linear-gradient(
                        -45deg,
                        rgba(255, 255, 255, .2) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, .2) 50%,
                        rgba(255, 255, 255, .2) 75%,
                        transparent 75%,
                        transparent
                    );
                    background-size: 30px 30px;
                    animation: move 1s linear infinite;
                }

                @keyframes move {
                    0% { background-position: 0 0; }
                    100% { background-position: 30px 0; }
                }

                .code-demo {
                    margin-top: 16px;
                    background: rgba(15, 23, 42, 0.8);
                    border-radius: 8px;
                    padding: 16px;
                    font-family: 'Courier New', monospace;
                    font-size: 0.875rem;
                    color: #e2e8f0;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .typing-animation {
                    overflow: hidden;
                    border-right: 2px solid #8b5cf6;
                    white-space: nowrap;
                    margin: 0 auto;
                    letter-spacing: .15em;
                    animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
                }

                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #8b5cf6; }
                }
            </style>

            <div class="skill-container">
                <div class="skill-header">
                    <span class="skill-name">${skill}</span>
                    <span class="skill-level">${level}%</span>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" id="progressBar"></div>
                </div>

                ${demoType === 'code' ? `
                <div class="code-demo">
                    <div class="typing-animation" id="codeContent"></div>
                </div>
                ` : ''}
            </div>
        `;
    }

    initDemo() {
        const level = parseInt(this.getAttribute('level')) || 0;
        const progressBar = this.shadowRoot.getElementById('progressBar');
        const demoType = this.getAttribute('demo-type');

        // Animate progress bar when component comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = level + '%';
                    }, 200);

                    if (demoType === 'code') {
                        this.startCodeDemo();
                    }
                }
            });
        });

        observer.observe(this);
    }

    startCodeDemo() {
        const skill = this.getAttribute('skill');
        const codeContent = this.shadowRoot.getElementById('codeContent');
        
        const codeExamples = {
            'Python': 'def ai_model(): return "Building the future!"',
            'JavaScript': 'const magic = () => console.log("Interactive web!");',
            'React': '<Component state={awesome} />',
            'HTML/CSS': '<div class="beautiful-design">Modern Web</div>',
            'SQL': 'SELECT * FROM opportunities WHERE skills = "amazing";'
        };

        const code = codeExamples[skill] || 'console.log("Hello World!");';
        
        setTimeout(() => {
            codeContent.textContent = code;
            codeContent.classList.add('typing-animation');
        }, 1000);
    }
}

// Register components
customElements.define('interactive-project', InteractiveProject);
customElements.define('skill-demo', SkillDemo);

// Export for use in other modules
window.InteractiveProject = InteractiveProject;
window.SkillDemo = SkillDemo;