let deferredPrompt;

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator) && window.navigator.standalone;
}

// Registrar service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });
}

// Detectar sistema e mostrar UI adequada
window.addEventListener('load', () => {
  const installBtn = document.getElementById('installShortcutBtn');
  const iosBanner = document.getElementById('iosInstallBanner');

  if (isAndroid() && !isInStandaloneMode()) {
    // No Android, vamos aguardar beforeinstallprompt para mostrar o botão
    // Simulação de scroll para ativar heurística
    setTimeout(() => {
      window.scrollBy(0, 100);
      setTimeout(() => window.scrollBy(0, -200), 750);
    }, 1500);
  } else if (isIos() && !isInStandaloneMode()) {
    // Mostrar banner de instrução iOS
    iosBanner.style.display = 'block';
  }
});

// Botão de instalação para Android
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Evento beforeinstallprompt disparado');
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installShortcutBtn');
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
});

// Botão para fechar banner iOS
document.getElementById('closeIosBannerBtn').addEventListener('click', () => {
  document.getElementById('iosInstallBanner').style.display = 'none';
});

// Botão para redirecionar
document.getElementById('redirectToLinktreeBtn').addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';
});

