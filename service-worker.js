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
  }, 100);
};

// Função para esconder a barra de progresso
const hideProgressBar = () => {
  progressBar.style.display = 'none';
};

// Verifica se o navegador suporta o evento beforeinstallprompt
if ('beforeinstallprompt' in window) {
  window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt disparado');
    event.preventDefault();
    deferredPrompt = event;

    installShortcutBtn.style.display = 'block'; // Exibe o botão

    // Ao clicar no botão "Instalar Atalho"
    installShortcutBtn.addEventListener('click', () => {
      console.log('Botão de instalação clicado');
      showProgressBar();  // Exibe a barra de progresso
      deferredPrompt.prompt();  // Mostra o prompt

      deferredPrompt.userChoice.then((choiceResult) => {
        hideProgressBar();  // Esconde a barra de progresso
        if (choiceResult.outcome === 'accepted') {
          installationInstructions.innerText = 'Atalho instalado com sucesso!';
        } else {
          installationInstructions.innerText = 'Instalação do atalho recusada.';
        }
        deferredPrompt = null;  // Limpa o evento
      });
    });
  });
}

// Função para redirecionar o usuário para o Linktree
redirectToLinktreeBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';  // Redireciona para o Linktree
});
