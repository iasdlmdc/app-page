// Verifica se o navegador suporta Service Worker (para garantir que PWA seja funcional)
if ('serviceWorker' in navigator) {
  const registerShortcutBtn = document.getElementById('registerShortcutBtn');
  const instructions = document.getElementById('instructions'); // Div para exibir instruções

  // Detecta o sistema operacional
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Exibe o botão "Instalar" somente em Android ou quando o dispositivo não for iOS
  if (isAndroid) {
    // Android pode criar o atalho automaticamente, então exibe o botão "Instalar"
    registerShortcutBtn.style.display = 'inline-block';
  } else if (isIOS) {
    // iOS não tem suporte completo ao PWA, então exibe instruções para instalação manual
    instructions.innerHTML = `
      <p>Para adicionar o atalho à tela inicial, siga estas instruções:</p>
      <ol>
        <li>Toque no ícone de compartilhamento (quadrado com a seta para cima) no Safari.</li>
        <li>Selecione "Adicionar à Tela de Início".</li>
        <li>Escolha um nome para o atalho e toque em "Adicionar".</li>
      </ol>
    `;
  } else {
    // Para outros sistemas operacionais, mostra instruções padrões
    instructions.innerHTML = "<p>Para adicionar o atalho à tela inicial, use as opções do navegador.</p>";
  }

  // Função para instalar o atalho automaticamente (para Android)
  const addShortcutToHomeScreen = () => {
    // Para Android, o navegador deve adicionar o PWA automaticamente
    if ('launchQueue' in window) {
      navigator.launchQueue.setAppLaunchUrl('https://linktr.ee/iasdlm.dc');
      alert("Atalho adicionado à tela inicial!");
    }
  };

  // Ao clicar no botão "Instalar"
  registerShortcutBtn.addEventListener('click', addShortcutToHomeScreen);
}
