// service-worker.js

// Evento de instalação do Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker instalado');
  
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log('Service Worker cache aberto');
      return cache.addAll([
        '/app-page/',  // Página inicial
        '/app-page/index.html',  // Arquivo principal da página
        '/app-page/style.css',  // Caso tenha algum arquivo CSS
        '/app-page/icon-192x192.png',  // Ícone 192x192
        '/app-page/icon-512x512.png'   // Ícone 512x512
      ]);
    })
  );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker ativado');
  event.waitUntil(clients.claim());
});

// Evento de captura das requisições
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Responde com o cache se a requisição já tiver sido armazenada
      return response || fetch(event.request);
    })
  );
});
