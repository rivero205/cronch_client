import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './queryClient'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
// Hide initial splash added in index.html as soon as React is mounted.
// Using setTimeout 0 to ensure render commit completed before the fade.
setTimeout(() => {
  try { if (window.__CRONCH_HIDE_SPLASH) window.__CRONCH_HIDE_SPLASH(); } catch (e) {}
}, 0);
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW Registered!', reg))
      .catch(err => console.error('SW Registration failed:', err));
  });
}
