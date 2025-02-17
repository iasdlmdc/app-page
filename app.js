// Verifica se o navegador suporta Service Worker (para garantir que PWA seja funcional)
if ('serviceWorker' in navigator) {
  // Elementos da interface
  const enableServiceWorkerCheckbox = document.getElementById('enableServiceWorker');
  const registerShortcutBtn = document.getElementById('registerShortcutBtn');

  // Quando o checkbox é marcado, o botão de instalação aparece
  enableServiceWorkerCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      registerShortcutBtn.style.display = 'inline-block';  // Exibe o botão "Adicionar à Tela Inicial"
    } else {
      registerShortcutBtn.style.display = 'none';  // Esconde o botão
    }
  });

  // Função para registrar o atalho na tela inicial
  const addShortcutToHomeScreen = () => {
    if ('launchQueue' in window) {
      navigator.launchQueue.setAppLaunchUrl('https://linktr.ee/iasdlm.dc'); // URL do link personalizado
    }

    // Lógica para "adicionar" o atalho na tela inicial manualmente (sem o `beforeinstallprompt`)
    alert('Atalho adicionado à tela inicial com sucesso!');
  };

  // Ao clicar no botão "Instalar"
  registerShortcutBtn.addEventListener('click', addShortcutToHomeScreen);
}
