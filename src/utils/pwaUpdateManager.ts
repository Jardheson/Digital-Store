// Gerenciador de atualização do PWA
// Adicione este código ao seu componente principal ou ao main.tsx para notificar usuários sobre atualizações

export class PWAUpdateManager {
  private registration: ServiceWorkerRegistration | null = null;
  private updateCallback: ((hasUpdate: boolean) => void) | null = null;

  // Inicializar o gerenciador
  async init(onUpdateAvailable?: (hasUpdate: boolean) => void) {
    this.updateCallback = onUpdateAvailable || null;

    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/service-worker.js');
        this.setupUpdateListener();
        this.checkForUpdates();
      } catch (error) {
        console.error('Erro ao registrar Service Worker:', error);
      }
    }
  }

  // Configurar listener para atualizações
  private setupUpdateListener() {
    if (!this.registration) return;

    // Verificar se há novo service worker waiting
    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration?.installing;

      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Nova versão disponível
          console.log('Nova versão do app disponível!');
          if (this.updateCallback) {
            this.updateCallback(true);
          }
        }
      });
    });
  }

  // Verificar atualizações periodicamente
  checkForUpdates() {
    if (!this.registration) return;

    // Verificar a cada 6 horas
    setInterval(() => {
      this.registration?.update();
    }, 6 * 60 * 60 * 1000);

    // Verificar também ao voltar do foco
    window.addEventListener('focus', () => {
      this.registration?.update();
    });
  }

  // Ativar nova versão (recarregar página)
  activateUpdate() {
    if (!this.registration?.waiting) return;

    // Enviar mensagem ao service worker para ativar
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Recarregar quando o novo service worker tomar conta
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }

  // Desinstalar o app
  async uninstall() {
    if (!this.registration) return;

    const success = await this.registration.unregister();
    if (success) {
      console.log('Service Worker desinstalado');
      // Limpar cache
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
    return success;
  }

  // Obter informações do registro
  getInfo() {
    return {
      isRegistered: !!this.registration,
      hasWaitingWorker: !!this.registration?.waiting,
      hasActiveWorker: !!this.registration?.active,
    };
  }
}
