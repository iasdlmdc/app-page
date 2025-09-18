let deferredPrompt;

// Funções para verificar sistema operacional
function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator) && window.navigator.standalone;
}

// Registrar o service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker-v5.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });
}

// Evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Evento beforeinstallprompt disparado');
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installShortcutBtn');
  installBtn.style.display = 'inline-block'; // Garantir que o botão sempre apareça

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

// Evento appinstalled
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App instalado com sucesso!');
});

// Detectar sistema e mostrar UI adequada
window.addEventListener('load', () => {
  const installBtn = document.getElementById('installShortcutBtn');
  const iosBanner = document.getElementById('iosInstallBanner');

  if (isAndroid() && !isInStandaloneMode()) {
    // Simulação de engajamento (scroll + clique)
    setTimeout(() => {
      window.scrollBy(0, 200);
      setTimeout(() => window.scrollBy(0, -200), 750);
    }, 1500);

    document.body.addEventListener('click', () => {
      console.log('[PWA] Clique detectado (ajuda na heurística)');
    }, { once: true });

  } else if (isIos() && !isInStandaloneMode()) {
    iosBanner.style.display = 'block';
  }
});

// Botão para fechar banner iOS
document.getElementById('closeIosBannerBtn').addEventListener('click', () => {
  document.getElementById('iosInstallBanner').style.display = 'none';
});

// Botão para redirecionar
document.getElementById('redirectToLinktreeBtn').addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';
});

// Verifica e atualiza o service worker em cada visita
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(reg => {
    reg.update();
  });
}


