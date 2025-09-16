let deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Evento beforeinstallprompt disparado');
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installShortcutBtn');
  installBtn.style.display = 'inline-block';

  installBtn.addEventListener('click', () => {
    installBtn.disabled = true;
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou instalar o PWA');
      } else {
        console.log('Usuário recusou a instalação');
      }
      deferredPrompt = null;
    });
  });
});

const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');
redirectToLinktreeBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';
});
