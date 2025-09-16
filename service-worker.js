let deferredPrompt;
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
  // Escuta o evento antes que o prompt seja exibido automaticamente
  window.addEventListener('beforeinstallprompt', (event) => {
    // Previne o comportamento padrão
    event.preventDefault();
    deferredPrompt = event;

    // Exibe o botão para o usuário
    installShortcutBtn.style.display = 'block';

    // Ao clicar no botão, mostra o prompt manualmente
    installShortcutBtn.addEventListener('click', () => {
      // Exibe a barra de progresso enquanto o evento é aguardado
      showProgressBar();

      // Exibe o prompt manualmente
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
