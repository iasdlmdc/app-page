const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  'https://iasdlmdc.github.io/app-page/',  // Caminho completo
  'https://iasdlmdc.github.io/app-page/index.html',
  'https://iasdlmdc.github.io/app-page/redirect.html',
  'https://iasdlmdc.github.io/app-page/manifest.json',
  'https://iasdlmdc.github.io/app-page/icon-192x192.png',
  'https://iasdlmdc.github.io/app-page/icon-512x512.png',
  'https://iasdlmdc.github.io/app-page/app.js'
];

// Instalando o Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Falha ao armazenar no cache', error);
      });
    })
  );
});

// Ativando o Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Recuperando arquivos do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch((error) => {
        console.error('Falha na requisição', error);
      });
    })
  );
});
