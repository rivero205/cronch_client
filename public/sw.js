// Service Worker for Cronch - Push Notifications Support
const CACHE_NAME = 'cronch-v2';

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['/']);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Handle Push Notifications - THIS IS KEY FOR BACKGROUND NOTIFICATIONS
self.addEventListener('push', (event) => {
    console.log('Push notification received:', event);
    
    let notificationData = {
        title: 'Cronch',
        body: 'Tienes una nueva notificación.',
        icon: '/AppIcons/playstore.png',
        badge: '/AppIcons/playstore.png',
        vibrate: [200, 100, 200],
        tag: 'cronch-notification',
        requireInteraction: false,
        data: {
            url: '/',
            dateOfArrival: Date.now()
        }
    };

    // Parse notification data from the push event
    if (event.data) {
        try {
            const payload = event.data.json();
            notificationData = {
                title: payload.title || notificationData.title,
                body: payload.body || payload.message || notificationData.body,
                icon: payload.icon || notificationData.icon,
                badge: payload.badge || notificationData.badge,
                vibrate: notificationData.vibrate,
                tag: payload.tag || notificationData.tag,
                requireInteraction: payload.requireInteraction || false,
                data: {
                    url: payload.url || payload.link || '/',
                    dateOfArrival: Date.now(),
                    ...payload.data
                }
            };
        } catch (error) {
            console.error('Error parsing push notification data:', error);
        }
    }

    event.waitUntil(
        self.registration.showNotification(notificationData.title, notificationData)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.notification);
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Check if there's already a window open
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.focus().then(() => {
                            if ('navigate' in client) {
                                return client.navigate(urlToOpen);
                            }
                        });
                    }
                }
                // If no window is open, open a new one
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
    console.log('Notification closed:', event.notification.tag);
});
