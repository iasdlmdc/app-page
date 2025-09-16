let deferredPrompt;

// Função para detectar se o sistema é iOS
function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

// Função para verificar se o app já está em modo standalone
function isInStandaloneMode() {
  return ('standalone' in window.navigator) && window.navigator.standalone;
}

// Registro do Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker-v4.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });

  // Força a atualização do Service Worker em cada visita
  navigator.serviceWorker.ready.then(reg => {
    reg.update();
  });
}

// Evento beforeinstallprompt (mostra o botão de instalação)
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Evento beforeinstallprompt disparado');
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installShortcutBtn');
  if (installBtn) {
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', () => {
      installBtn.disabled = true;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] Usuário aceitou instalar');
        } else {
          console.log('[PWA] Usuário recusou a instalação');
        }
        deferredPrompt = null;
      });
    });
  }
});

// Evento appinstalled (quando o usuário instala o PWA)
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App instalado com sucesso!');
  // Esconde o botão após a instalação
  const installBtn = document.getElementById('installShortcutBtn');
  if (installBtn) {
    installBtn.style.display = 'none';
  }
});

// Lógica para o banner de instalação no iOS
window.addEventListener('load', () => {
  const iosBanner = document.getElementById('iosInstallBanner');
  if (isIos() && !isInStandaloneMode()) {
    if (iosBanner) {
      iosBanner.style.display = 'block';
    }
  }
});

// Botão para fechar o banner do iOS
const closeIosBtn = document.getElementById('closeIosBannerBtn');
if (closeIosBtn) {
  closeIosBtn.addEventListener('click', () => {
    const iosBanner = document.getElementById('iosInstallBanner');
    if (iosBanner) {
      iosBanner.style.display = 'none';
    }
  });
}

// Botão para redirecionar
const redirectToBtn = document.getElementById('redirectToLinktreeBtn');
if (redirectToBtn) {
  redirectToBtn.addEventListener('click', () => {
    window.location.href = 'https://linktr.ee/iasdlm.dc';
  });
}
