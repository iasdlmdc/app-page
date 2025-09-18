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

  // Permite que o navegador acesse a URL externa sem interceptação
  if (requestUrl.includes('https://linktr.ee/iasdlm.dc')) {
    // Não intercepta, deixa o navegador gerenciar a requisição
    event.respondWith(fetch(event.request));
    return;
  }

  // Para as outras requisições internas, você pode continuar interceptando
  event.respondWith(
    fetch(event.request).catch(() => {
      console.warn('[SW] Falha ao buscar', event.request.url);
    })
  );
});
