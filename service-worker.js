self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalado');
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativado');
});

self.addEventListener('fetch', (event) => {
  // Simplesmente responde com a requisição original
});
