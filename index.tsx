import React from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import App from './App.tsx';

/**
 * FSS Commercial Cleaning Services
 * React 19 Entry Point
 */

// 1. Initialize Leaflet globally before any components mount
if (typeof window !== 'undefined') {
  (window as any).L = L;
}

// 2. Locate the mounting point
const container = document.getElementById('root');

if (container) {
  try {
    console.log("Initializing FSS Application...");
    
    // 3. Create the React Root
    const root = createRoot(container);
    
    // 4. Render the App
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("FSS Application Mounted Successfully.");
  } catch (err) {
    console.error("FATAL: Failed to mount React application:", err);
    // Fallback UI in case of total mount failure
    container.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
        <div style="text-align: center; padding: 20px;">
          <h1 style="color: #0a1a2f; margin-bottom: 10px;">Startup Failed</h1>
          <p style="color: #666;">The application encountered a fatal error during initialization.</p>
          <code style="display: block; background: #f1f5f9; padding: 10px; border-radius: 8px; margin-top: 20px; font-size: 12px;">${String(err)}</code>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #f59e0b; color: #0a1a2f; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Retry</button>
        </div>
      </div>
    `;
  }
} else {
  console.error("CRITICAL ERROR: Root container '#root' was not found in the DOM. Ensure index.html is correctly configured.");
}