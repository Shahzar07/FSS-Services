import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * React 19 / ESM Initialization script for FSS
 */

// Global Leaflet check (required for react-leaflet components)
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const mountApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("FSS Application successfully mounted.");
  } catch (err) {
    console.error("Failed to mount React app:", err);
    container.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; font-family: sans-serif; padding: 20px;">
        <div>
          <h1 style="color: #0a1a2f; margin-bottom: 10px;">Connection Error</h1>
          <p style="color: #666;">We're having trouble loading the site. Please refresh the page.</p>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #f59e0b; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Refresh Page</button>
        </div>
      </div>
    `;
  }
};

// Start application
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mountApp();
} else {
  document.addEventListener('DOMContentLoaded', mountApp);
}
