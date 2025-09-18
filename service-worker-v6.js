self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativado');
  return self.clients.claim();
});

// Alteração no fetch para evitar bloqueio de requisições externas (CORS)
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // Se a requisição for para o start_url ou para um recurso externo, não intercepta
  if (requestUrl === 'https://linktr.ee/iasdlm.dc') {
    return; // Não intercepta, apenas deixa o navegador lidar com o fetch
  }

  // Para outras requisições internas, como os arquivos da sua PWA, você pode interceptar
  event.respondWith(
    fetch(event.request).catch(() => {
      console.warn('[SW] Falha ao buscar', event.request.url);
    })
  );
});
