self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app-page/icon.png',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Tenta buscar a resposta do cache, se não encontrar, faz uma busca na rede
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        // Se a resposta da rede for válida, armazena ela no cache
        if (networkResponse && networkResponse.status === 200) {
          return caches.open('my-cache').then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        } else {
          return networkResponse;
        }
      });
    }).catch((error) => {
      // Caso ocorra algum erro na busca do cache ou da rede, exibe o erro no console
      console.error('Erro ao buscar o recurso:', error);
      throw error;
    })
  );
});
