// sw.js — PWA cache for GitHub Pages (Next.js static export)
const VERSION = 'v1.0.0';
const SCOPE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, ''); // '/joiascortantes'
const CACHE_NAME = `pwa-cache-${VERSION}`;

const CORE = [
  `${SCOPE_PATH}/`,
  `${SCOPE_PATH}/index.html`,
  `${SCOPE_PATH}/manifest.webmanifest`,
  `${SCOPE_PATH}/knives.json`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (!url.pathname.startsWith(SCOPE_PATH)) return;

  const accept = req.headers.get('accept') || '';
  const isHTML = accept.includes('text/html');

  if (isHTML && req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req) || await cache.match(`${SCOPE_PATH}/index.html`) || await cache.match(`${SCOPE_PATH}/`);
        return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => cached || Response.error());
    })
  );
});
