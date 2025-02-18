const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');
const installationInstructions = document.getElementById('installationInstructions');

// Função para mostrar a barra de progresso
const showProgressBar = () => {
  const progressBar = document.getElementById('progressBar');
  const progress = document.getElementById('progress');
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
  const progressBar = document.getElementById('progressBar');
  progressBar.style.display = 'none';
};

// Função para detectar o sistema operacional e exibir as instruções
const detectOSAndDisplayInstructions = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('android')) {
    installationInstructions.innerHTML = 'Para adicionar o atalho à tela inicial no Android:<br>- Abra o menu de opções (os 3 pontos no canto superior direito)<br>- Selecione "Adicionar à tela inicial".';
  } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    installationInstructions.innerHTML = 'Para adicionar o atalho à tela inicial no iOS:<br>- Toque no ícone de compartilhamento (quadrado com seta)<br>- Selecione "Adicionar à Tela de Início".';
  } else {
    installationInstructions.innerHTML = 'Para adicionar o atalho à tela inicial, siga as instruções do seu dispositivo.';
  }
};

// Verifica o sistema operacional e exibe as instruções
detectOSAndDisplayInstructions();

// Função para redirecionar o usuário para o Linktree
redirectToLinktreeBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';  // Redireciona para o Linktree
});
