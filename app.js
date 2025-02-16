if ('serviceWorker' in navigator) {
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

  // Função para detectar o dispositivo (Android ou iOS)
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

  // Registra o Service Worker assim que a página for carregada
  registerServiceWorker();

  // Obtém o elemento do botão de instalação
  const installShortcutBtn = document.getElementById('installShortcutBtn');
  
  // Obtém o elemento do botão para redirecionamento
  const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');

  // Quando o botão de instalação for clicado
  installShortcutBtn.addEventListener('click', () => {
    // Exibe as instruções de instalação personalizadas
    const instructions = getDeviceInstructions();
    document.getElementById('installationInstructions').innerText = instructions;
  });

  // Quando o botão de redirecionamento for clicado
  redirectToLinktreeBtn.addEventListener('click', () => {
    // Aqui o Linktree será aberto, pois o start_url é uma URL externa
    window.location.href = 'https://linktr.ee/iasdlm.dc';  // Redireciona para o Linktree
  });

  // Verifica se o PWA foi aberto como um aplicativo instalado
  if (window.matchMedia('(display-mode: standalone)').matches) {
    // Redireciona para o Linktree se o PWA foi aberto como um aplicativo instalado
    window.location.href = 'https://linktr.ee/iasdlm.dc';
  }
}
