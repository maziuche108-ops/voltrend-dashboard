const CACHE_NAME = 'voltrend-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './_sdk/market_sdk.js',
  './_sdk/data_sdk.js',
  './_sdk/guardian_sdk.js',
  './_sdk/ai_validator.js',
  './_sdk/guardian_ml.js',
  './_sdk/seed_data.js',
  './_sdk/wasm_loader.js',
  './_sdk/webrtc_c2.js',
  './_sdk/element_sdk.js'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(ASSETS);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache Hit - Return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate Event (Cleanup old caches)
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
