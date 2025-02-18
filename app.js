const installPWABtn = document.getElementById('installPWABtn');
const redirectToLinktreeBtn = document.getElementById('redirectToLinktreeBtn');

// Função para detectar o sistema operacional (Android ou iOS)
const getDeviceInstructions = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/android/i.test(userAgent)) {
    return 'Para adicionar à sua tela inicial no Android, usando o Chrome, clique no ícone de três pontos no canto superior direito do navegador e selecione "Adicionar à tela inicial".';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'Para adicionar à sua tela inicial no iOS, clique no botão "Compartilhar" no canto inferior e selecione "Adicionar à Tela de Início".';
  } else {
    return 'Para adicionar à sua tela inicial, siga as instruções do seu dispositivo.';
  }
};

// Exibir o modal com as instruções
const showInstructionsModal = () => {
  const instructions = getDeviceInstructions();

  // Cria o modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  // Cria o conteúdo do modal
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.maxWidth = '400px';
  modalContent.style.textAlign = 'center';

  // Adiciona a mensagem ao modal
  const modalText = document.createElement('p');
  modalText.textContent = instructions;
  modalText.style.fontSize = '16px';
  modalText.style.color = '#333';

  // Cria o botão de fechar
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.style.marginTop = '10px';
  closeButton.style.padding = '10px 20px';
  closeButton.style.backgroundColor = '#4caf50';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';

  // Adiciona evento de fechar o modal
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Fecha o modal
  });

  // Monta o conteúdo no modal
  modalContent.appendChild(modalText);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  // Adiciona o modal à página
  document.body.appendChild(modal);
};

// Evento para o botão "Instalar Atalho"
installPWABtn.addEventListener('click', () => {
  showInstructionsModal(); // Exibe o modal com as instruções
});

// Evento para o botão "Ir para o Linktree"
redirectToLinktreeBtn.addEventListener('click', () => {
  window.location.href = 'https://linktr.ee/iasdlm.dc';  // Redireciona para o Linktree
});
