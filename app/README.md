# Reference output

Vite + React + TypeScript with [`@torii-js/torii-react`](https://docs.torii.so).

```bash
pnpm install
cp ../.env.example .env    # paste your pk_test_… key
pnpm dev                   # http://localhost:5173
```

In the Torii dashboard, add `http://localhost:5173` under
**Settings → Allowed origins**, or the API rejects browser calls with a CORS error.

## What's where

| File | Role |
|------|------|
| `src/main.tsx` | `<ToriiProvider>`: publishable key, `proxyOrigin`, `languages={['en','da']}` |
| `src/App.tsx` | `<AuthLoading>` / `<SignedOut><SignIn>` / `<SignedIn><UserDashboard>` + `<LanguageSelector>` |
| `src/labels.ts` | en/da copy for this app's own chrome (the SDK translates its own) |
| `vite.config.ts` | `/_torii` dev proxy that keeps the session cookie first-party |

## First-party session cookie in local dev

Two halves, and both are needed:

1. `vite.config.ts` forwards `/_torii` to your Frontend API host with
   `changeOrigin: true`, so Torii sees its own host and `Set-Cookie` lands on
   `localhost`.
2. `proxyOrigin={window.location.origin}` in `src/main.tsx` makes the SDK post to
   that path instead of straight to the FAPI host.

Verify with `curl -i http://localhost:5173/_torii/client`: JSON means the proxy
works, HTML means the request never left Vite, `403` means the Host header isn't
being rewritten.

The proxy target comes from `VITE_TORII_FAPI_URL` (dashboard →
**Settings → Domains → Primary domain**, e.g. `https://your-app.shrines.dev`). If
that variable is unset, `vite.config.ts` tries to decode the host out of the
publishable key and fails with an explicit message if it can't; the encoding is
not part of Torii's public contract, so set the variable if dev startup complains.

Production needs the real thing: a reverse proxy or a CNAME custom domain. See
[first-party cookies](https://docs.torii.so/guides/before-production/first-party-cookies).

## Languages

`languages={['en', 'da']}` on the provider. The SDK auto-detects the browser
locale against that list, `<LanguageSelector />` in the header switches it live,
and signed-in users get the same switch in the profile's Language row. Both
locales ship in the SDK; a third language means passing a full `LanguageConfig`
with your own label set.
