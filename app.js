let deferredPrompt = null;

const installBtn = document.getElementById('installShortcutBtn');
const redirectBtn = document.getElementById('redirectToLinktreeBtn');
const iosBanner = document.getElementById('iosInstallBanner');
const closeIosBannerBtn = document.getElementById('closeIosBannerBtn');

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && window.navigator.standalone)
  );
}

// Redireciona para o linktree se aberto em modo standalone (atalho)
if (isInStandaloneMode()) {
  window.location.replace("https://linktr.ee/iasdlm.dc");
} else {
  // Mostrar conteúdo normalmente
  document.getElementById("mainBody").style.display = "block";
}

// Registrar service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker-v8.js')
    .then(reg => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch(err => {
      console.error('[SW] Erro ao registrar:', err);
    });
}

// Mostrar botão instalar para Android sem interação
window.addEventListener('load', () => {
  if (isAndroid() && !isInStandaloneMode()) {
    installBtn.style.display = 'inline-block';
  }
  if (isIos() && !isInStandaloneMode()) {
    iosBanner.style.display = 'block';
  }
});

// Captura evento beforeinstallprompt para salvar e usar depois
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('[PWA] Evento beforeinstallprompt capturado');
});

// Clicar para instalar PWA
installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] Usuário aceitou instalar');
      } else {
        console.log('[PWA] Usuário recusou a instalação');
      }
      deferredPrompt = null;
    });
  } else {
    alert("Instalação ainda não disponível, tente novamente em alguns segundos.");
  }
});

// Fechar banner iOS
closeIosBannerBtn.addEventListener('click', () => {
  iosBanner.style.display = 'none';
});

// Redirecionar botão para linktree
redirectBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';
});

// Atualizar service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(reg => {
    reg.update();
  });
}
