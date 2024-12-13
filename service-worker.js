self.addEventListener('install', (event) => {
    self.skipWaiting(); // Força o 'service worker' a ser ativado imediatamente
    event.waitUntil(
        caches.open('site-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                'https://iasdlmdc.github.io/app-page/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); // Faz com que o service worker atue imediatamente sobre as páginas
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
