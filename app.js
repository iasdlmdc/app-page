let deferredPrompt; // Armazenará o evento beforeinstallprompt
const installShortcutBtn = document.getElementById('installShortcutBtn');
const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const installationInstructions = document.getElementById('installationInstructions');

// Função para mostrar a barra de progresso
const showProgressBar = () => {
  progressBar.style.display = 'block';
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
    } else {
      width++;
      progress.style.width = `${width}%`;
    }
  }, 100); // A barra vai ser preenchida aos poucos (100ms de intervalo)
};

// Função para esconder a barra de progresso
const hideProgressBar = () => {
  progressBar.style.display = 'none';
};

// Verifica se o navegador suporta o evento beforeinstallprompt
if ('beforeinstallprompt' in window) {
  // O evento beforeinstallprompt será disparado quando o site puder ser instalado
  window.addEventListener('beforeinstallprompt', (event) => {
    // Previne o comportamento padrão de exibição automática do prompt
    event.preventDefault();
    deferredPrompt = event; // Armazena o evento para ser usado depois

    // Exibe o botão de instalação
    installShortcutBtn.style.display = 'block';

    // Ao clicar no botão "Instalar Atalho"
    installShortcutBtn.addEventListener('click', () => {
      // Exibe a barra de progresso enquanto o evento é aguardado
      showProgressBar();

      // Mostra o prompt de instalação
      deferredPrompt.prompt();

      // Aguarda a resposta do usuário ao prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // Esconde a barra de progresso depois que o prompt for exibido
        hideProgressBar();

        if (choiceResult.outcome === 'accepted') {
          installationInstructions.innerText = 'Atalho instalado com sucesso!';
        } else {
          installationInstructions.innerText = 'Instalação do atalho recusada.';
        }
        
        // Limpa a referência do evento
        deferredPrompt = null;
      });
    });
  });
}

// Função para redirecionar o usuário para o Linktree
redirectToLinktreeBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';  // Redireciona para o Linktree
});

// Registro do Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
