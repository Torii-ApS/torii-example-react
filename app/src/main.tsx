import { ToriiProvider } from '@torii-js/torii-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_TORII_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_TORII_PUBLISHABLE_KEY. Copy .env.example to app/.env and add your key.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToriiProvider
      publishableKey={PUBLISHABLE_KEY}
      // The /_torii proxy in vite.config.ts serves this origin, so the session
      // cookie is first-party in local dev exactly as it must be in production.
      proxyOrigin={window.location.origin}
      // Both locales ship in the SDK; it auto-detects the browser locale against
      // this list and translates everything it renders.
      languages={['en', 'da']}
    >
      <App />
    </ToriiProvider>
  </StrictMode>,
);
