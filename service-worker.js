self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      // Aqui, adicione apenas os arquivos internos ao seu domínio para cache
      return cache.addAll([
        '/app-page/index.html', // Exemplo de arquivo local
        '/app-page/style.css',  // Arquivo CSS
        '/app-page/script.js'   // Arquivo JS
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado!');
});

// Interceptar requisições apenas para arquivos do mesmo domínio
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Se a requisição for para o mesmo domínio, cacheia
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  } else {
    // Caso contrário, apenas deixe a requisição passar
    event.respondWith(fetch(event.request));
  }
});
