// service-worker.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/app-page/',  // Página inicial
        '/app-page/index.html',
        '/app-page/style.css',  // Caso tenha algum arquivo CSS
        '/app-page/icon-192x192.png',
        '/app-page/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
