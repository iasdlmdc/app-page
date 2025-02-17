self.addEventListener('install', (event) => {
  console.log('Service Worker instalado!');
  
  // Durante a instalação, vamos cachear os arquivos necessários
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/',  // Cache da página inicial (se necessário)
        'https://linktr.ee/iasdlm.dc',  // Cache da URL do Linktree
        'index.html',
        'app.js',
        'manifest.json',
        'icon-192x192.png',
        'icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado!');
  
  // Vamos ativar imediatamente o SW, removendo os caches antigos (se houver)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'pwa-cache') {
            console.log('Cache antigo removido:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Interceptando requisição para:', event.request.url);

  // Tenta retornar os dados do cache antes de fazer a requisição pela rede
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se encontrar uma resposta no cache, retorna ela
      if (cachedResponse) {
        return cachedResponse;
      }
      // Caso contrário, faz a requisição à rede
      return fetch(event.request).then((response) => {
        // Armazena a resposta da rede no cache para futuras requisições
        if (event.request.url.includes('linktr.ee')) {
          // Cache apenas a URL do Linktree
          caches.open('pwa-cache').then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    })
  );
});
