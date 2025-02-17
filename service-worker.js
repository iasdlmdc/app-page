self.addEventListener('install', (event) => {
  console.log('Service Worker instalado!');

  // Durante a instalação, vamos tentar cachear os arquivos necessários
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/',  // Cache da página inicial (se necessário)
        'index.html',
        'app.js',
        'manifest.json',
        'icon-192x192.png',
        'icon-512x512.png'
      ]).catch((error) => {
        console.error('Falha ao adicionar arquivos ao cache:', error);
      });
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
        // Cache da resposta de recursos apenas do seu domínio
        if (event.request.url.startsWith('https://iasdlmdc.github.io')) {
          caches.open('pwa-cache').then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch((error) => {
        console.error('Falha ao buscar na rede:', error);
      });
    })
  );
});
