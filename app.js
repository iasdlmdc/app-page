if ('serviceWorker' in navigator) {
  const registerServiceWorker = () => {
    navigator.serviceWorker.register('https://iasdlmdc.github.io/app-page/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  };

  const getDeviceInstructions = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return 'Para adicionar à sua tela inicial no Android, clique no ícone de três pontos no canto superior direito do navegador e selecione "Adicionar à tela inicial".';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return 'Para adicionar à sua tela inicial no iOS, clique no botão "Compartilhar" no canto inferior e selecione "Adicionar à Tela de Início".';
    } else {
      return 'Para adicionar à sua tela inicial, siga as instruções do seu dispositivo.';
    }
  };

  registerServiceWorker();

  const installShortcutBtn = document.getElementById('installShortcutBtn');
  const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');

  installShortcutBtn.addEventListener('click', () => {
    window.location.href = 'https://linktr.ee/iasdlm.dc';
    const instructions = getDeviceInstructions();
    setTimeout(() => {
      document.getElementById('installationInstructions').innerText = instructions;
    }, 1000); // Adiciona um pequeno atraso para garantir que a página tenha redirecionado
  });

  redirectToLinktreeBtn.addEventListener('click', () => {
    window.location.href = 'https://linktr.ee/iasdlm.dc';
  });
}
