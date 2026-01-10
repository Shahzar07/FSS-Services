import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

// Ensure Leaflet is globally available for components that might expect L
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("FATAL: Root element not found in DOM.");
} else {
  console.log("App mounting...");
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App rendered successfully.");
  } catch (err) {
    console.error("Mounting Error:", err);
  }
}