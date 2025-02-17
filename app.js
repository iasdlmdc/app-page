document.addEventListener('DOMContentLoaded', () => {
  // Verifica se o navegador suporta Service Worker (para garantir que PWA seja funcional)
  if ('serviceWorker' in navigator) {
    const registerShortcutBtn = document.getElementById('registerShortcutBtn');
    const instructions = document.getElementById('instructions'); // Div para exibir instruções

    // Detecta o sistema operacional
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Exibe o botão "Instalar" somente em Android ou quando o dispositivo não for iOS
    if (isAndroid) {
      // Exibe o botão de "Instalar" se o dispositivo for Android
      registerShortcutBtn.style.display = 'inline-block';
    } else if (isIOS) {
      // Para iOS, exibe as instruções manuais de como adicionar o atalho
      instructions.innerHTML = `
        <p>Para adicionar o atalho à tela inicial, siga estas instruções:</p>
        <ol>
          <li>Toque no ícone de compartilhamento (quadrado com a seta para cima) no Safari.</li>
          <li>Selecione "Adicionar à Tela de Início".</li>
          <li>Escolha um nome para o atalho e toque em "Adicionar".</li>
        </ol>
      `;
    }

    // Função para mostrar a instrução quando o botão é clicado no Android
    const addShortcutToHomeScreen = () => {
      if (isAndroid) {
        // Quando o usuário clicar em "Instalar" no Android
        // O PWA será instalado automaticamente, com base nas configurações do manifest.json
        alert("Atalho será adicionado à tela inicial!");

        // Caso precise instruções para o Android:
        instructions.innerHTML = "<p>O atalho será adicionado automaticamente à tela inicial!</p>";
      }
    };

    // Ao clicar no botão "Instalar"
    registerShortcutBtn.addEventListener('click', addShortcutToHomeScreen);
  }
});
