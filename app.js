// Verifique se o navegador suporta service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service Worker registrado com sucesso:', registration);
  }).catch(function(error) {
    console.log('Falha ao registrar o Service Worker:', error);
  });
} else {
  console.log('Navegador não suporta Service Workers');
}

let deferredPrompt;
const installBtn = document.getElementById('installShortcutBtn');
const redirectBtn = document.getElementById('redirectToLinktreeBtn');
const instructions = document.getElementById('installationInstructions');
const iosInstructions = document.getElementById('iosInstructions');

// Exibir o botão de instalação manualmente (para fins de teste)
installBtn.style.display = 'block';

installBtn.addEventListener('click', (e) => {
  console.log('Botão de instalação clicado');
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação do PWA');
      } else {
        console.log('Usuário dispensou a instalação do PWA');
      }
      deferredPrompt = null;
    });
  } else {
    console.log('deferredPrompt não está disponível');
  }
});

// Redireciona para a página do Linktree
redirectBtn.addEventListener('click', () => {
  console.log('Botão de redirecionamento clicado');
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
