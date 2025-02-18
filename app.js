const installPWABtn = document.getElementById('installPWABtn');
const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');
const installationInstructions = document.getElementById('installationInstructions');

// Função para detectar o dispositivo (Android ou iOS) e exibir as instruções de instalação
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

// Exibe as instruções de acordo com o dispositivo
const displayInstallationInstructions = () => {
  installationInstructions.style.display = 'block'; // Exibe as instruções
  installationInstructions.innerHTML = getDeviceInstructions();
};

// Função para redirecionar o usuário para o Linktree
redirectToLinktreeBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';  // Redireciona para o Linktree
});

// Função para exibir as instruções após o clique no botão de instalação
installPWABtn.addEventListener('click', () => {
  displayInstallationInstructions(); // Exibe as instruções de instalação
});
