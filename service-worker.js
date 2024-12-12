let deferredPrompt;
const installButton = document.createElement('button');
installButton.textContent = 'Adicionar à tela inicial';
document.body.appendChild(installButton);
installButton.style.display = 'none';

// Verificação do evento 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('beforeinstallprompt disparado');

  // Exibe o botão de confirmação após o evento 'beforeinstallprompt'
  document.getElementById('confirmButton').style.display = 'inline-block';
});

// Habilita o botão de confirmação quando o checkbox for marcado
document.getElementById('confirmCheckbox').addEventListener('change', (e) => {
  const confirmButton = document.getElementById('confirmButton');
  confirmButton.disabled = !e.target.checked;
});

// Exibe o prompt de instalação e aguarda a escolha do usuário
document.getElementById('confirmButton').addEventListener('click', () => {
  // Exibe a mensagem de "Aguarde..."
  document.getElementById('waitingMessage').style.display = 'block';
  document.getElementById('confirmButton').style.display = 'none'; // Oculta o botão de confirmação

  // Se o evento 'beforeinstallprompt' foi disparado, mostra o prompt
  if (deferredPrompt) {
    // Exibe o prompt de instalação com atraso
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou o prompt de instalação');
      } else {
        console.log('Usuário rejeitou o prompt de instalação');
      }

      // O redirecionamento agora ocorre após a escolha do usuário
      window.location.href = "https://linktr.ee/iasdlm.dc";

      deferredPrompt = null; // Reseta o deferredPrompt após o uso
    });
  } else {
    console.log('O evento de instalação não foi disparado. Certifique-se de que o PWA está configurado corretamente.');
  }
});

// Verificação e instalação do Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('https://iasdlmdc.github.io/app-page/service-worker.js', { scope: '/app-page/' })
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);

        // Verifica a ativação do Service Worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'activated') {
              console.log('Service Worker ativado');
            }
          };
        };
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
