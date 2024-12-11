self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-v1').then(function(cache) {
      return cache.addAll([
        '/app-page/index.html',
        '/app-page/icon.png',
        // Adicione outras URLs necessárias aqui
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/app-page/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
