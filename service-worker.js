// service-worker.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/', // Aqui você adiciona a raiz do site (index.html)
        '/index.html',
        '/style.css',
        '/icon-192x192.png',
        '/icon-512x512.png'
      ]);
    })
  );
});

// A lógica de fetch pode ser mais simples ou personalizada conforme necessário
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request); // Se não houver cache, busca a requisição na rede
    })
  );
});
