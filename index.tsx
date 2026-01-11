import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * React 19 Stable Entry Point
 */

// Initialize Leaflet globally before any React components mount
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("FSS Application Loaded Successfully.");
} else {
  console.error("FSS Error: Root container '#root' was not found.");
}