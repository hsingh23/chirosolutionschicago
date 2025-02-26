"use client";
import { useState, useEffect } from 'react';

interface PWAState {
  canInstall: boolean;
  isOnline: boolean;
  isInstalled: boolean;
  offlineReady: boolean;
  installPrompt: any;
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    canInstall: false,
    isOnline: true,
    isInstalled: false,
    offlineReady: false,
    installPrompt: null,
  });

  useEffect(() => {
    // Handle online/offline status
    const handleOnlineStatus = () => {
      setPwaState((prev) => ({ ...prev, isOnline: navigator.onLine }));
    };

    // Check if app is installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      setPwaState((prev) => ({ ...prev, isInstalled: isStandalone }));
    };

    // Handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaState((prev) => ({ ...prev, canInstall: true, installPrompt: e }));
    };

    // Handle SW installation complete
    const handleSWInstalled = (event: any) => {
      const swRegistration = event.detail;
      setPwaState((prev) => ({ ...prev, offlineReady: true }));
    };

    if (typeof window !== 'undefined') {
      // Set up event listeners
      window.addEventListener('online', handleOnlineStatus);
      window.addEventListener('offline', handleOnlineStatus);
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', checkInstalled);
      window.addEventListener('PWA_READY', handleSWInstalled);

      // Initialize status
      handleOnlineStatus();
      checkInstalled();

      // Service worker setup
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          // When the service worker is updated, notify user or auto-refresh
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, refresh is needed
                  setPwaState(prev => ({ 
                    ...prev, 
                    offlineReady: true 
                  }));
                }
              });
            }
          });

          registration.update();
        });

        // Handle controller change (when a new SW takes over)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      }
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', checkInstalled);
      window.removeEventListener('PWA_READY', handleSWInstalled);
    };
  }, []);

  // Function to prompt installation
  const promptInstall = async () => {
    if (!pwaState.installPrompt) return false;
    
    try {
      (pwaState.installPrompt as any).prompt();
      const choiceResult = await (pwaState.installPrompt as any).userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setPwaState(prev => ({ ...prev, canInstall: false, installPrompt: null }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Installation prompt error:', error);
      return false;
    }
  };

  return {
    ...pwaState,
    promptInstall,
  };
}