// Antes
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });
}

// Depois
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker-v2.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });
}
