import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * Production-Ready Entry Point
 */

// Initialize Leaflet global immediately
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    // Render the App component
    root.render(<App />);
  } catch (err) {
    console.error("FSS: Fatal mount error:", err);
    container.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">Mounting failed: ${String(err)}</div>`;
  }
} else {
  console.error("FSS: Root container not found.");
}