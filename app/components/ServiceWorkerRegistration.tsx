"use client";
import { useEffect } from 'react';

// Add type declaration to prevent TypeScript error
declare global {
  interface Window {
    workbox?: any;
  }
}

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox === undefined) {
      // The service worker URL is the same as the origin host
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
          });
          
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates on page load
          if (registration.waiting) {
            // A new service worker is waiting to activate
            console.log('New service worker waiting to activate');
          }
          
          // When a new service worker is installed but waiting
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content available, refresh to update');
                // You could show a refresh prompt to the user here
                const event = new CustomEvent('PWA_READY', { detail: registration });
                window.dispatchEvent(event);
              }
            });
          });
          
          // Handle service worker updates
          let refreshing = false;
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            console.log('Controller changed - refreshing page');
            window.location.reload();
          });
          
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };
      
      // Register the service worker
      registerServiceWorker();
    }
  }, []);
  
  // This component doesn't render anything
  return null;
}