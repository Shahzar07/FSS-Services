import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

const init = () => {
  console.log("Starting FSS Application...");
  
  // Ensure Leaflet is globally available for the react-leaflet components
  if (typeof window !== 'undefined') {
    (window as any).L = L;
  }

  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error("FATAL: Root element '#root' not found in DOM.");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React successfully mounted to #root.");
  } catch (err) {
    console.error("CRITICAL: React Mounting Error:", err);
    rootElement.innerHTML = `<div style="padding: 40px; text-align: center; color: #ef4444; font-family: sans-serif;">
      <h2 style="margin-bottom: 10px;">Application Initialization Failed</h2>
      <p>Error: ${err instanceof Error ? err.message : String(err)}</p>
      <p style="margin-top: 20px; font-size: 14px; color: #666;">Please try refreshing the page or check the console for more details.</p>
    </div>`;
  }
};

// Handle both deferred and non-deferred script loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}