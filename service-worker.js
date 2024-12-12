self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        // Usando URLs absolutas para garantir que os recursos sejam encontrados
        'https://iasdlmdc.github.io/app-page/', // Página inicial
        'https://iasdlmdc.github.io/app-page/index.html', // Página index
        'https://iasdlmdc.github.io/app-page/app-page/icon.png', // Ícone
        'https://iasdlmdc.github.io/app-page/manifest.json', // Manifesto
        'https://iasdlmdc.github.io/app-page/app-page/icon-192x192.png', // Ícone 192x192
        'https://iasdlmdc.github.io/app-page/app-page/icon-512x512.png' // Ícone 512x512
      ]).catch((error) => {
        console.error('Falha ao adicionar recursos ao cache:', error);
      });
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
