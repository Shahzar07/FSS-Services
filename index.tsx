import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

// Ensure Leaflet is available globally for react-leaflet components
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
    console.log("FSS Application Mounted Successfully.");
  } catch (error) {
    console.error("FATAL: React Mounting Error:", error);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #ef4444; font-family: sans-serif; background: white; height: 100vh;">
        <h2>Startup Failed</h2>
        <p>The application encountered a fatal error during initialization.</p>
        <pre style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 8px; font-size: 12px; margin-top: 20px; overflow-x: auto;">${error}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0a1a2f; color: white; border: none; border-radius: 8px; cursor: pointer;">Try Again</button>
      </div>`;
  }
} else {
  console.error("CRITICAL: Root element #root not found in the DOM.");
}