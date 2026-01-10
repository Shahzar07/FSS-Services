import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

// Global Leaflet Setup
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
  console.error("Root element not found.");
}