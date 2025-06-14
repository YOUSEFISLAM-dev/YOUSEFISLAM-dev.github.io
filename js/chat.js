class ChatBot {
    constructor() {
        this.apiKey = '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';
        this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        this.currentUser = 'YOUSEFISLAM-dev';
        this.currentDateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        this.messages = [{
            role: "system",
            content: "You are an intelligent, friendly, and professional AI assistant that lives on the personal portfolio website of a creative developer and designer named Yousef. Your job is to welcome visitors, help them navigate the site, answer questions about Yousef's projects, skills, services, and experience, and collect leads for collaboration opportunities. Speak in a clear, concise, and warm tone. If asked about Yousef, share his background, expertise, and recent work. If asked about availability or collaboration, offer to take contact details. You can speak both English and Arabic (Egyptian dialect) based on the visitor's preference. Always stay helpful, polite, and conversational, More about Yousef Skills (HTML/CSS/JS/PHP , Python , AI/ML , React , API'S , Arduino ) , Certificates Data Analysis with Python , Fundamentals of IP Addressing and Subnetting , Network Exploitation Basics . Contact youseffo2fo2@gmail.com he has 8  years of experience in web , app , UI/Ux , AI , python"
        }];
        
        // Configure marked for security
        marked.setOptions({
            breaks: true,
            gfm: true
        });
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.chatBubble = document.getElementById('chatBubble');
        this.chatWindow = document.getElementById('chatWindow');
        this.closeBtn = document.getElementById('closeBtn');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.typingIndicator = document.getElementById('typingIndicator');
    }

    bindEvents() {
        this.chatBubble.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.messageInput.addEventListener('input', () => this.toggleSendButton());
    }

    toggleChat() {
        this.chatWindow.classList.toggle('active');
        this.chatBubble.classList.toggle('active');
        if (this.chatWindow.classList.contains('active')) {
            this.messageInput.focus();
        }
    }

    closeChat() {
        this.chatWindow.classList.remove('active');
        this.chatBubble.classList.remove('active');
    }

    toggleSendButton() {
        this.sendBtn.disabled = this.messageInput.value.trim() === '';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.toggleSendButton();
        this.showTyping();

        try {
            const response = await this.callAPI(message);
            this.hideTyping();
            this.addMessage(response, 'bot', true); // true indicates to render markdown
        } catch (error) {
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
            console.error('API Error:', error);
        }
    }

    addMessage(content, sender, useMarkdown = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'bot' && useMarkdown) {
            // Parse markdown and sanitize HTML
            const parsedContent = marked.parse(content);
            const sanitizedContent = DOMPurify.sanitize(parsedContent);
            contentDiv.innerHTML = sanitizedContent;
        } else {
            contentDiv.textContent = content;
        }
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addTimestamp() {
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp';
        timestampDiv.textContent = this.currentDateTime + ' UTC';
        this.chatMessages.appendChild(timestampDiv);
    }

    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async callAPI(userMessage) {
        this.messages.push({ role: "user", content: userMessage });

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-0528-qwen3-8b",
                messages: this.messages,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        
        this.messages.push({ role: "assistant", content: assistantMessage });
        
        return assistantMessage;
    }
}
