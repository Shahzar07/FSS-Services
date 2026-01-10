import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

// Initialize global Leaflet instance for components
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
    console.log("FSS Application Mounted Successfully.");
  } catch (error) {
    console.error("Mounting Error:", error);
    container.innerHTML = `<div style="padding: 40px; text-align: center; color: red;">React Mounting Error: ${error}</div>`;
  }
} else {
  console.error("Critical Error: Root container #root not found.");
}