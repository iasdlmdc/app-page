self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativado');
  return self.clients.claim();
});

// Aqui você intercepta as requisições para redirecionar para o 'start_url'
self.addEventListener('fetch', (event) => {
  // Verifique se o pedido é para o start_url
  if (event.request.url.includes('/')) {
    // Redireciona para o link do start_url
    event.respondWith(
      fetch('https://linktr.ee/iasdlm.dc') // Seu start_url
    );
  } else {
    // Processa normalmente para outras requisições
    event.respondWith(
      fetch(event.request).catch(() => {
        console.warn('[SW] Falha ao buscar', event.request.url);
      })
    );
  }
});
