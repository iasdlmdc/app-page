let deferredPrompt;

if ('serviceWorker' in navigator) {
  const enableServiceWorkerCheckbox = document.getElementById('enableServiceWorker');
  const registerShortcutBtn = document.getElementById('registerShortcutBtn');

  // Função para registrar o Service Worker
  const registerServiceWorker = () => {
    navigator.serviceWorker.register('https://iasdlmdc.github.io/app-page/service-worker.js') // Caminho absoluto
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  };

  // Quando o checkbox é marcado, o Service Worker é registrado e o botão aparece
  enableServiceWorkerCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      // Registra o Service Worker assim que o checkbox for marcado
      registerServiceWorker();

      // Exibe o botão "Adicionar à Tela Inicial"
      registerShortcutBtn.style.display = 'inline-block';
    } else {
      // Esconde o botão se o checkbox for desmarcado
      registerShortcutBtn.style.display = 'none';
    }
  });

  // Captura o evento beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    // Previne que o prompt seja exibido automaticamente
    e.preventDefault();
    // Armazena o evento para ser disparado mais tarde
    deferredPrompt = e;

    // Quando o botão de instalação for clicado
    registerShortcutBtn.addEventListener('click', () => {
      // Exibe o prompt
      deferredPrompt.prompt();

      // Quando o usuário escolher se quer ou não instalar
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou o prompt de instalação');
        } else {
          console.log('Usuário rejeitou o prompt de instalação');
        }
        // Após a escolha, descarta o evento
        deferredPrompt = null;
      });
    });
  });
}
