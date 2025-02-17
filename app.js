if ('serviceWorker' in navigator) {
  const enableServiceWorkerCheckbox = document.getElementById('enableServiceWorker');
  const registerShortcutBtn = document.getElementById('registerShortcutBtn');

  // Função para registrar o Service Worker
  const registerServiceWorker = () => {
    navigator.serviceWorker.register('/service-worker.js') // URL do arquivo do Service Worker
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

  // Função para adicionar o atalho à tela inicial
  const addShortcutToHomeScreen = () => {
    // Neste caso, o link do PWA está sendo direcionado para a página do Linktree
    if ('launchQueue' in window) {
      navigator.launchQueue.setAppLaunchUrl('https://linktr.ee/iasdlm.dc'); // URL personalizada para o Linktree
    }

    alert('Atalho adicionado à tela inicial com sucesso!');
  };

  // Ao clicar no botão "Adicionar à Tela Inicial"
  registerShortcutBtn.addEventListener('click', addShortcutToHomeScreen);
}
