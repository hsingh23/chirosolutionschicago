import { useEffect } from 'react';

export function usePWA() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // When the service worker is updated, automatically reload the page
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('controlling', (event) => {
          window.location.reload();
        });

        // Check for service worker updates
        registration.update();
      });
    }
  }, []);
}