const installPWABtn = document.getElementById('installPWABtn');
const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');
const installationInstructions = document.getElementById('installationInstructions');

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

// Função para exibir o prompt de instalação PWA
installPWABtn.addEventListener('click', () => {
  alert('Agora, você pode adicionar o atalho à sua tela inicial utilizando as instruções acima!');
});
