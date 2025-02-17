// Verifique se o navegador suporta service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service Worker registrado com sucesso:', registration);
  }).catch(function(error) {
    console.log('Falha ao registrar o Service Worker:', error);
  });
}

// Verifique se o navegador suporta a instalação de PWA
let deferredPrompt;
const installBtn = document.getElementById('installShortcutBtn');
const redirectBtn = document.getElementById('redirectToLinktreeBtn');
const instructions = document.getElementById('installationInstructions');
const iosInstructions = document.getElementById('iosInstructions');

window.addEventListener('beforeinstallprompt', (e) => {
  // Impedir o mini-infobar de aparecer no mobile
  e.preventDefault();
  // Salvar o evento para que possa ser acionado posteriormente
  deferredPrompt = e;
  // Mostrar o botão de instalação
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', (e) => {
  // Ocultar o botão de instalação
  installBtn.style.display = 'none';
  // Mostrar o prompt de instalação
  deferredPrompt.prompt();
  // Verificar o que o usuário escolheu
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('Usuário aceitou a instalação do PWA');
    } else {
      console.log('Usuário dispensou a instalação do PWA');
    }
    deferredPrompt = null;
  });
});

// Redireciona para a página do Linktree
redirectBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';
});

// Detecta se o navegador é Safari em um dispositivo iOS
function isIOS() {
  const userAgent = window.navigator.userAgent;
  return /iPhone|iPad|iPod/.test(userAgent) && /Safari/.test(userAgent) && !/CriOS/.test(userAgent);
}

if (isIOS()) {
  iosInstructions.style.display = 'block';
}
