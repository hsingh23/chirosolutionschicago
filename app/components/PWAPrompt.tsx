"use client";
import { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';

export default function PWAPrompt() {
  const { isOnline, canInstall, promptInstall, offlineReady, isInstalled } = usePWA();
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);

  // Show offline toast when status changes
  useEffect(() => {
    if (!isOnline) {
      setShowOfflineToast(true);
      const timer = setTimeout(() => setShowOfflineToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  // Show update toast when new content is available
  useEffect(() => {
    if (offlineReady) {
      setShowUpdateToast(true);
    }
  }, [offlineReady]);

  // Handle refresh when update is available
  const handleRefresh = () => {
    window.location.reload();
  };

  if (isInstalled) {
    return null; // Don't show any prompts if already installed
  }

  return (
    <>
      {/* Offline notification */}
      {showOfflineToast && (
        <div className="fixed bottom-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>You are currently offline. Some content may not be available.</span>
          <button onClick={() => setShowOfflineToast(false)} className="ml-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Update notification */}
      {showUpdateToast && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>New version available!</span>
          <button onClick={handleRefresh} className="ml-2 bg-white text-blue-600 px-2 py-1 rounded text-sm">
            Update
          </button>
          <button onClick={() => setShowUpdateToast(false)} className="ml-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Install prompt - only on mobile */}
      {canInstall && showInstallPrompt && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-5/6 max-w-md bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg z-50 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/favicon.png" alt="App Icon" className="w-10 h-10 mr-3 rounded-lg" />
              <div>
                <h4 className="font-semibold">Install our app</h4>
                <p className="text-sm text-gray-600">Add to home screen for a better experience</p>
              </div>
            </div>
            <div className="flex">
              <button 
                onClick={() => promptInstall()}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Install
              </button>
              <button 
                onClick={() => setShowInstallPrompt(false)} 
                className="ml-2 text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}