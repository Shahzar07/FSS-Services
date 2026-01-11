import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * Resilient Production Entry Point
 */

console.log("FSS: Boot sequence initiated...");

// Ensure Leaflet is globally available for react-leaflet components
if (typeof window !== 'undefined') {
  (window as any).L = L;
  console.log("FSS: Leaflet library attached to window.");
}

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    console.log("FSS: React root created. Rendering application...");
    root.render(<App />);
    console.log("FSS: Render command sent.");
  } catch (err) {
    console.error("FSS: Fatal Error during React mounting:", err);
    container.innerHTML = `<div style="padding: 20px; color: red;">Mounting failed: ${String(err)}</div>`;
  }
} else {
  console.error("FSS: Target container '#root' not found.");
}