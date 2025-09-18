self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativado');
  return self.clients.claim();
});

// Interceptando as requisições
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // Se a requisição for para o link externo (Linktree), não deve ser interceptada
  if (requestUrl.includes('https://linktr.ee/iasdlm.dc')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Para outras requisições internas, o Service Worker pode interceptá-las
  event.respondWith(
    fetch(event.request).catch(() => {
      console.warn('[SW] Falha ao buscar', event.request.url);
    })
  );
});
