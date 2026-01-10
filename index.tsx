import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

// Ensure Leaflet is globally available for react-leaflet components
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
    console.log("FSS Commercial Cleaning Application Mounted Successfully.");
  } catch (error) {
    console.error("CRITICAL: React Mounting Failed:", error);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #ef4444; font-family: sans-serif; background: white;">
        <h2 style="margin-bottom: 10px;">Application Load Error</h2>
        <p>A technical error occurred while starting the application.</p>
        <p style="font-size: 14px; color: #666; margin-top: 20px;">Error Details: ${error instanceof Error ? error.message : String(error)}</p>
      </div>`;
  }
} else {
  console.error("FATAL: Root container #root not found.");
}