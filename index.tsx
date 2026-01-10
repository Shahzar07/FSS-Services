import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * React 19 / ESM Initialization script for FSS
 * Ensuring a single, clean mounting point.
 */

// Shimming Leaflet globally for react-leaflet components
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("FSS Application successfully mounted with React 19.0.0");
  } catch (err) {
    console.error("CRITICAL: React Mounting Failed:", err);
    container.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; font-family: sans-serif; padding: 20px;">
        <div>
          <h1 style="color: #0a1a2f; margin-bottom: 10px;">Connection Error</h1>
          <p style="color: #666;">There was a problem loading the application framework.</p>
          <p style="font-size: 12px; color: #999; margin-top: 10px;">${err instanceof Error ? err.message : String(err)}</p>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #f59e0b; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; color: #0a1a2f;">Reload Page</button>
        </div>
      </div>
    `;
  }
} else {
  console.error("FATAL: Root container '#root' not found in HTML.");
}