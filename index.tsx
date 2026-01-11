import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * React 19 Entry Point
 */

// 1. Globally expose Leaflet for react-leaflet dependency resolution
if (typeof window !== 'undefined') {
  (window as any).L = L;
  console.log("FSS: Leaflet initialized.");
}

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
    console.log("FSS: React successfully mounted to DOM.");
  } catch (err) {
    console.error("FSS: React mount failed:", err);
    container.innerHTML = `<div style="padding: 20px; color: red;">Mount Failure: ${String(err)}</div>`;
  }
} else {
  console.error("FSS: #root container missing.");
}