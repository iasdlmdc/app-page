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

  // Quando o checkbox é marcado, o botão de instalação aparece
  enableServiceWorkerCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      // Registra o Service Worker
      registerServiceWorker();
      // Exibe o botão "Adicionar à Tela Inicial"
      registerShortcutBtn.style.display = 'inline-block';
    } else {
      // Esconde o botão se o checkbox não estiver marcado
      registerShortcutBtn.style.display = 'none';
    }
  });

  // Quando o botão "Adicionar à Tela Inicial" é clicado
  registerShortcutBtn.addEventListener('click', () => {
    // Simula a criação do atalho
    alert('O atalho foi adicionado à sua tela inicial!');
    // Pode-se dar instruções para o usuário adicionar o atalho manualmente
    alert('Para adicionar este atalho à sua tela inicial, clique no ícone de três pontos no canto superior direito do navegador e selecione "Adicionar à tela inicial".');
  });
}
