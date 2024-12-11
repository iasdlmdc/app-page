self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/icon.png',
        '/index.html'
      ]).catch(function(error) {
        console.error('Falha ao adicionar arquivos à cache:', error);
      });
    })
  );
  self.skipWaiting(); // Ativar o Service Worker imediatamente após a instalação
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== 'static-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Garantir que o service worker ative-se e controle a página imediatamente
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
