const CACHE_NAME = 'pwa-cache-v1'; // Mude o nome do cache a cada nova atualização
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'app.js',
  'background-image.png',
  'icon-192x192.png',
  'icon-512x512.png'
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando e pré-armazenando o cache.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativado. Limpando caches antigos.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Excluindo cache antigo:', cacheName);
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
    caches.match(event.request)
      .then((response) => {
        // Retorna a versão em cache se encontrada
        if (response) {
          return response;
        }
        // Caso contrário, busca da rede
        return fetch(event.request);
      })
  );
});
