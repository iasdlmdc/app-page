let deferredPrompt = null;

const installBtn = document.getElementById('installShortcutBtn');
const redirectBtn = document.getElementById('redirectToLinktreeBtn');
const iosBanner = document.getElementById('iosInstallBanner');
const closeIosBannerBtn = document.getElementById('closeIosBannerBtn');

// Funções de detecção
function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

// Função única de isInStandaloneMode declarada aqui
function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && window.navigator.standalone)
  );
}

// Se estiver em modo standalone (app aberto via atalho), redireciona para o linktree
if (isInStandaloneMode()) {
  window.location.replace("https://linktr.ee/iasdlm.dc");
} else {
  // Caso contrário, mostra o conteúdo normal
  document.getElementById("mainBody").style.display = "block";
}

// Registrar o service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker-v8.js')
    .then((reg) => {
      console.log('[SW] Registrado com sucesso:', reg);
    })
    .catch((err) => {
      console.error('[SW] Erro ao registrar:', err);
    });
}

// Mostrar botão "Instalar Atalho" imediatamente para Android se não estiver em standalone
window.addEventListener('load', () => {
  if (isAndroid() && !isInStandaloneMode()) {
    installBtn.style.display = 'inline-block';
  }

  if (isIos() && !isInStandaloneMode()) {
    iosBanner.style.display = 'block';
  }
});

// Armazena o evento antes da instalação para usar depois
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Evento beforeinstallprompt disparado');
  e.preventDefault();
  deferredPrompt = e;
});

// Clique no botão para instalar
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
    alert("A instalação ainda não está disponível. Tente novamente em alguns segundos.");
  }
});

// Fechar banner iOS
closeIosBannerBtn.addEventListener('click', () => {
  iosBanner.style.display = 'none';
});

// Redirecionar para Linktree no botão
redirectBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';
});

// Atualiza o service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(reg => {
    reg.update();
  });
}
