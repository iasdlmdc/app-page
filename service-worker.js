self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      const filesToCache = [
        '/app-page/index.html',  // Caminho correto do arquivo HTML
        '/app-page/app.js'       // Caminho correto do arquivo JS
      ];

      console.log('Adicionando arquivos ao cache: ', filesToCache);

      // Tenta adicionar os arquivos ao cache
      return cache.addAll(filesToCache)
        .then(() => {
          console.log('Arquivos adicionados com sucesso ao cache');
        })
        .catch(error => {
          console.error('Falha ao adicionar arquivos ao cache:', error);
        });
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado!');
});

self.addEventListener('fetch', event => {
  // Intercepta as requisições e tenta servir o conteúdo do cache
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
