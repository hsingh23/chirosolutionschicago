// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available workbox modules

// Force a service worker update cycle on each page load
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// Cache names
const CACHE_NAME = 'chiro-solutions-cache-v1';
const OFFLINE_PAGE = '/offline';

// Cache the offline page during installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_PAGE,
        '/favicon.png',
      ]);
    })
  );
});

// Network-first strategy with offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip some requests that shouldn't be cached
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // Skip cross-origin requests
  if (event.request.url.includes('/api/')) return; // Skip API requests
  
  // Handle navigation requests specially to show offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_PAGE);
        })
    );
    return;
  }

  // Use network-first strategy for other requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the fresh response
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request).then((cacheResponse) => {
          return cacheResponse || caches.match(OFFLINE_PAGE);
        });
      })
  );
});

// Handle push notifications
self.addEventListener('push', function (event) {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    title: data.title || 'Natural Chiropractic Solutions',
    body: data.body || 'You have a new notification',
    icon: data.icon || '/favicon.png',
    badge: '/icons/badge-icon.png',
    vibrate: data.vibrate || [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window/tab is open with the URL, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url || '/');
      }
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});