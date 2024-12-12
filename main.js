let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previna o prompt padrão
  e.preventDefault();
  // Salve o evento para acioná-lo mais tarde
  deferredPrompt = e;

  document.getElementById('pwa-prompt').style.display = 'block';

  document.getElementById('confirm-button').addEventListener('click', () => {
    if (document.getElementById('add-to-home-checkbox').checked) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  });
});
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/service-worker.js') .then((registration) => { console.log('Service Worker registered with scope:', registration.scope); }).catch((error) => { console.log('Service Worker registration failed:', error); }); }
