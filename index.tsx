import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * Production Bootstrapper
 */

// Initialize Leaflet globally
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    // Directly render the app to avoid any StrictMode side effects during initial load
    root.render(<App />);
  } catch (err) {
    console.error("FSS: Fatal mount error:", err);
    container.innerHTML = `<div style="padding: 20px; color: red;">Startup failed: ${String(err)}</div>`;
  }
} else {
  console.error("FSS: Root container not found.");
}