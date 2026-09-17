// COSAM Rinconada - Advanced Service Worker for Offline Rights & Educational Documents
const CACHE_NAME_CORE = 'cosam-core-v3';
const CACHE_NAME_DOCS = 'cosam-docs-v3';
const CACHE_NAME_FONTS = 'cosam-fonts-v3';

const CURRENT_CACHES = [CACHE_NAME_CORE, CACHE_NAME_DOCS, CACHE_NAME_FONTS];

// Core essential assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap'
];

// Install: Cache core app shell and fonts immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME_CORE).then(async (cache) => {
      // Add local assets
      await cache.addAll(PRECACHE_ASSETS.filter((url) => !url.startsWith('http'))).catch((err) => {
        console.warn('[SW] Core precache non-fatal warning:', err);
      });

      // Try caching Google Fonts CSS as well
      const fontsUrl = PRECACHE_ASSETS.find((url) => url.startsWith('http'));
      if (fontsUrl) {
        try {
          const fontRes = await fetch(fontsUrl, { mode: 'cors' });
          if (fontRes.ok) {
            const fontsCache = await caches.open(CACHE_NAME_FONTS);
            await fontsCache.put(fontsUrl, fontRes);
          }
        } catch {
          // ignore offline install
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!CURRENT_CACHES.includes(key)) {
            console.log('[SW] Deleting obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event handler with specialized strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // 1. Google Fonts Cache Strategy (Cache-First)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME_FONTS).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cachedResponse || new Response('', { status: 408 });
        }
      })
    );
    return;
  }

  // 2. Navigation requests (HTML page): Network-first with offline fallback to cached /index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME_CORE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const indexCached = await caches.match('/index.html') || await caches.match('/');
          if (indexCached) return indexCached;
          return new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Modo Offline COSAM</title></head><body style="font-family:sans-serif;padding:2rem;text-align:center;"><h2>Modo Sin Conexión</h2><p>El portal está en modo offline. Por favor recarga o verifica tu conexión.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // 3. Static assets, JS/CSS bundles & educational documents (Stale-While-Revalidate)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            const targetCache = url.pathname.includes('/assets/') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css')
              ? CACHE_NAME_CORE
              : CACHE_NAME_DOCS;
            caches.open(targetCache).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Support manual caching messages and push notifications from the app
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'CACHE_DOCS_NOW') {
    event.waitUntil(
      caches.open(CACHE_NAME_DOCS).then(async (cache) => {
        try {
          await cache.addAll([
            '/',
            '/index.html',
            '/manifest.json',
            '/icon.svg'
          ]);
          if (event.source && event.source.postMessage) {
            event.source.postMessage({ type: 'DOCS_CACHED_SUCCESS' });
          }
        } catch (err) {
          console.warn('[SW] Manual precache error:', err);
        }
      })
    );
  }

  // Allow trigger notification via SW message
  if (event.data.type === 'TRIGGER_NOTIFICATION') {
    const { title, options } = event.data;
    event.waitUntil(
      self.registration.showNotification(title || 'Recordatorio COSAM Rinconada', {
        body: options?.body || 'Tienes un recordatorio de salud programado.',
        icon: options?.icon || '/icon.svg',
        badge: options?.badge || '/icon.svg',
        tag: options?.tag || 'cosam-reminder',
        vibrate: [200, 100, 200],
        data: options?.data || '/',
        renotify: true
      })
    );
  }
});

// Web Push API event listener
self.addEventListener('push', (event) => {
  let data = {
    title: 'Recordatorio COSAM Rinconada',
    body: 'Tienes un horario de retiro de fármacos o cita clínica programada.'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = {
        title: 'Recordatorio COSAM Rinconada',
        body: event.data.text()
      };
    }
  }

  const notificationOptions = {
    body: data.body,
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: data.tag || 'cosam-reminder',
    vibrate: [200, 100, 200],
    data: data.url || '/',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions)
  );
});

// Handle notification click to bring app window to focus
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

