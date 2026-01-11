import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * Resilient Production Bootstrapper
 */

console.log("FSS: Starting application sequence...");

// Initialize Leaflet globally before any React components mount
if (typeof window !== 'undefined') {
  (window as any).L = L;
  console.log("FSS: Leaflet library initialized globally.");
}

const container = document.getElementById('root');

if (container) {
  try {
    console.log("FSS: Target container found. Initializing React Root...");
    const root = createRoot(container);
    
    // Explicitly render without StrictMode to ensure maximum module stability
    root.render(<App />);
    
    console.log("FSS: Initial render dispatched.");
  } catch (err) {
    console.error("FSS: Fatal mount error:", err);
    container.innerHTML = `
      <div style="padding: 20px; color: red; font-family: sans-serif; text-align: center;">
        <h3 style="margin-bottom: 10px;">Application Startup Failed</h3>
        <p>Technical Error: ${String(err)}</p>
      </div>`;
  }
} else {
  console.error("FSS: CRITICAL - Root container '#root' not found in the DOM.");
}