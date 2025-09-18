self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativado');
  return self.clients.claim();
});

// Não intercepta a requisição para o start_url
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // Não intercepta o fetch para o start_url externo
  if (requestUrl === 'https://linktr.ee/iasdlm.dc') {
    return;  // Deixa o navegador lidar com isso
  }

  // Para todas as outras requisições internas, vamos processar como esperado
  event.respondWith(
    fetch(event.request).catch(() => {
      console.warn('[SW] Falha ao buscar', event.request.url);
    })
  );
});
