import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * Production Bootstrapper
 */

// 1. Initialize Leaflet globally before any components attempt to use it
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
    console.log("FSS App successfully mounted.");
  } catch (err) {
    console.error("FSS Mount Error:", err);
    container.innerHTML = `<div style="padding: 20px; text-align: center;">Startup failed. Please refresh.</div>`;
  }
} else {
  console.error("FSS Critical: Target container '#root' not found in document.");
}