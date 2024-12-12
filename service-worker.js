self.addEventListener('install', (event) => {
  // Apenas instalar, sem cache ou complexidade adicional.
  self.skipWaiting();  // Força a ativação imediata.
});

self.addEventListener('activate', (event) => {
  // Ativação simples, sem manipulação de cache ou outras funções.
  console.log('Service Worker Ativado');
});

self.addEventListener('fetch', (event) => {
  // Aqui, você pode adicionar um comportamento básico para o serviço
  // mas no seu caso ele não é necessário se for apenas um redirecionamento simples.
});
