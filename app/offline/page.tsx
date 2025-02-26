"use client";  // Add this directive to mark it as a client component

import Image from 'next/image';

export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <Image 
            src="/favicon.png"
            alt="Natural Chiropractic Solutions Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">You're offline</h1>
        <p className="text-gray-600 mb-6">
          It looks like you're currently offline. Please check your internet connection and try again.
        </p>
        <p className="text-sm text-gray-500">
          Good news! You can still access previously visited pages while offline.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}