// Service Worker for Progressive Web App functionality
const CACHE_NAME = 'yousef-portfolio-v1.0';
const STATIC_CACHE = 'static-cache-v1.0';
const DYNAMIC_CACHE = 'dynamic-cache-v1.0';

// Files to cache for offline functionality
const staticAssets = [
    '/',
    '/index.html',
    '/css/chat.css',
    '/css/advanced-animations.css',
    '/js/chat.js',
    '/js/advanced-interactions.js',
    '/js/web-components.js',
    '/js/seo-monitor.js',
    '/data/certificates.json',
    '/favicon.ico',
    // External CDN resources for offline fallback
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(staticAssets);
            })
            .catch(err => console.log('Service Worker: Cache failed', err))
    );
    
    // Force the new service worker to activate immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                        console.log('Service Worker: Clearing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    
    // Take control of all clients immediately
    self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip chrome-extension and other protocols
    if (!request.url.startsWith('http')) return;
    
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(request)
                    .then(networkResponse => {
                        // Don't cache if not a successful response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Clone the response
                        const responseToCache = networkResponse.clone();
                        
                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                console.log('Service Worker: Caching dynamic content', request.url);
                                cache.put(request, responseToCache);
                            });
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // Return offline fallback for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        // Return offline fallback for images
                        if (request.destination === 'image') {
                            return new Response(
                                `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="100%" height="100%" fill="#1e293b"/>
                                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#8b5cf6" font-family="Arial, sans-serif" font-size="16">
                                        Image unavailable offline
                                    </text>
                                </svg>`,
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                    });
            })
    );
});

// Background sync for form submissions and chat messages
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered');
    
    if (event.tag === 'chat-message') {
        event.waitUntil(syncChatMessages());
    }
    
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

// Push notification handler
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Portfolio',
                icon: '/favicon.ico'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/favicon.ico'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Yousef Islam Portfolio', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        const urls = event.data.payload;
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then(cache => cache.addAll(urls))
        );
    }
});

// Sync functions
async function syncChatMessages() {
    try {
        // Get pending chat messages from IndexedDB
        const messages = await getPendingChatMessages();
        
        for (const message of messages) {
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message)
                });
                
                if (response.ok) {
                    await removePendingChatMessage(message.id);
                }
            } catch (error) {
                console.log('Failed to sync chat message:', error);
            }
        }
    } catch (error) {
        console.log('Error during chat sync:', error);
    }
}

async function syncContactForm() {
    try {
        // Get pending contact form submissions from IndexedDB
        const submissions = await getPendingContactSubmissions();
        
        for (const submission of submissions) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(submission)
                });
                
                if (response.ok) {
                    await removePendingContactSubmission(submission.id);
                    
                    // Show success notification
                    self.registration.showNotification('Message Sent!', {
                        body: 'Your message has been delivered successfully.',
                        icon: '/favicon.ico',
                        tag: 'contact-success'
                    });
                }
            } catch (error) {
                console.log('Failed to sync contact form:', error);
            }
        }
    } catch (error) {
        console.log('Error during contact form sync:', error);
    }
}

// IndexedDB helper functions (simplified)
async function getPendingChatMessages() {
    // In a real implementation, this would use IndexedDB
    return [];
}

async function removePendingChatMessage(id) {
    // In a real implementation, this would remove from IndexedDB
    console.log('Removing pending chat message:', id);
}

async function getPendingContactSubmissions() {
    // In a real implementation, this would use IndexedDB
    return [];
}

async function removePendingContactSubmission(id) {
    // In a real implementation, this would remove from IndexedDB
    console.log('Removing pending contact submission:', id);
}

// Periodic background tasks
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-portfolio-data') {
        event.waitUntil(updatePortfolioData());
    }
});

async function updatePortfolioData() {
    try {
        // Fetch latest certificates data
        const response = await fetch('/data/certificates.json');
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            await cache.put('/data/certificates.json', response);
        }
    } catch (error) {
        console.log('Failed to update portfolio data:', error);
    }
}

// Analytics tracking for offline usage
function trackOfflineUsage() {
    // Track offline interactions
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'OFFLINE_ANALYTICS',
                data: {
                    timestamp: Date.now(),
                    action: 'offline_access'
                }
            });
        });
    });
}

// Cache management utilities
async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name.startsWith('yousef-portfolio-') && name !== CACHE_NAME
    );
    
    return Promise.all(
        oldCaches.map(name => caches.delete(name))
    );
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
    const start = performance.now();
    
    event.respondWith(
        handleRequest(event.request).then(response => {
            const end = performance.now();
            const duration = end - start;
            
            // Log performance metrics
            console.log(`Service Worker: ${event.request.url} took ${duration.toFixed(2)}ms`);
            
            return response;
        })
    );
});

async function handleRequest(request) {
    // Implementation of the fetch logic from above
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok && request.method === 'GET') {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Return offline fallbacks
        if (request.mode === 'navigate') {
            return caches.match('/index.html');
        }
        throw error;
    }
}