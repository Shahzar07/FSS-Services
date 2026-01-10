import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

// Ensure Leaflet is globally available
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("FATAL: Root element not found in DOM.");
} else {
  console.log("App initialization sequence starting...");
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App render command issued to React root.");
  } catch (err) {
    console.error("Fatal React Mounting Error:", err);
    rootElement.innerHTML = `<div style="padding: 40px; text-align: center; color: #ef4444; font-family: sans-serif;">
      <h2 style="margin-bottom: 10px;">Application Error</h2>
      <p>The website failed to initialize. Please check the browser console for details.</p>
    </div>`;
  }
}