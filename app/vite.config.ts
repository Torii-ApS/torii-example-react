import { decodeFapiUrl } from '@torii-js/torii-react';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const DEV_PORT = 5173;

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: DEV_PORT,
      strictPort: true,
      // Forwarding /_torii keeps the session cookie first-party on localhost and
      // is what the OAuth callback (/_torii/auth/session/establish) lands on.
      // Pairs with proxyOrigin in src/main.tsx.
      proxy:
        command === 'serve'
          ? {
              '/_torii': {
                // The Frontend API host is encoded in the publishable key, so
                // the key in .env is the only value this needs.
                target: resolveFapiOrigin(env.VITE_TORII_PUBLISHABLE_KEY),
                // Torii resolves the tenant from Host, so the upstream must see
                // the FAPI host. Without this every proxied call returns 403.
                changeOrigin: true,
                secure: true,
              },
            }
          : undefined,
    },
  };
});

function resolveFapiOrigin(publishableKey: string | undefined): string {
  if (!publishableKey) {
    throw new Error(
      'Missing VITE_TORII_PUBLISHABLE_KEY. Copy .env.example to app/.env and add your key.',
    );
  }
  return decodeFapiUrl(publishableKey);
}
