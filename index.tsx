import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * Resilient Entry Point
 */

console.log("FSS: Starting boot sequence...");

// 1. Initialize Leaflet globally before any React components mount
if (typeof window !== 'undefined') {
  (window as any).L = L;
  console.log("FSS: Global Leaflet initialized.");
}

const container = document.getElementById('root');

if (container) {
  try {
    console.log("FSS: Target container found, initiating React render...");
    const root = createRoot(container);
    // Standard render without StrictMode for maximum compatibility during debug phase
    root.render(<App />);
    console.log("FSS: Render task dispatched successfully.");
  } catch (err) {
    console.error("FSS: Fatal mount error:", err);
    container.innerHTML = `<div style="padding: 20px; text-align: center; color: #ef4444; font-weight: bold;">
      Failed to initialize application.<br/> Error: ${String(err)}
    </div>`;
  }
} else {
  console.error("FSS: Error - Root container '#root' not found in the DOM.");
}