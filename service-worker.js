// Durante a instalação, armazenamos os arquivos essenciais
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('meu-cache').then(function(cache) {
      return cache.addAll([
        '/',  // Página inicial
        '/index.html',
        '/manifest.json',
        '/icon.png',  // Ícone do PWA
        '/service-worker.js'  // Garantir que o próprio service-worker esteja na cache
      ]);
    })
  );
});

// Intercepta as requisições e usa o cache ou busca na rede
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Se o recurso está na cache, retorna da cache
      if (response) {
        return response;
      }

      // Caso contrário, busca o recurso na rede e o adiciona à cache
      return fetch(event.request).then(function(networkResponse) {
        // Se a resposta da rede for válida, adicionamos ao cache
        if (networkResponse && networkResponse.status === 200) {
          caches.open('meu-cache').then(function(cache) {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      });
    })
  );
});
