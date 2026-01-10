import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * React 19 Unified Entry Point
 */

// 1. Initialize Leaflet globally for react-leaflet components
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
    console.log("FSS App Mounted Successfully.");
  } catch (err) {
    console.error("Mount Error:", err);
    container.innerHTML = `<div style="padding: 40px; text-align: center; font-family: sans-serif;">
      <h2 style="color: red;">Failed to start</h2>
      <p>${String(err)}</p>
    </div>`;
  }
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}