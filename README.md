# torii-example-react

A React + Torii app built from one prompt, using Torii's docs MCP server
[`mcp.torii.so`](https://docs.torii.so/guides/mcp-server).

> **Status:** the reference output lives in `app/`. If it isn't there yet, run
> the prompt below — that's the whole exercise.

## Run it

Two minutes: create an account at [app.torii.so](https://app.torii.so) and
generate a publishable key.

```bash
cp .env.example .env   # paste your key
cd app
pnpm install
pnpm dev
```

The key is yours, not ours — this repo ships no working key on purpose.

## The prompt

Paste this into an AI editor connected to `mcp.torii.so`. It reads the SDK's
components, props and setup from the docs server.

```text
Build a minimal Vite + React + TypeScript app with Torii authentication.

Use the Torii docs MCP server as the source of truth for the SDK API. Look up
the components, props and setup rather than guessing imports or prop names.

Requirements:
- Signed-out visitors see a sign-in card, with a way to sign up
- Signed-in users see their profile and can sign out
- The UI must be available in English and Danish, with a way to switch
- Read the publishable key from VITE_TORII_PUBLISHABLE_KEY
- Local dev must keep the Torii session cookie first-party
```

## Run the prompt yourself

1. **Connect the MCP server.** This repo ships a `.mcp.json`, so Claude Code
   picks it up when you open the directory. For other editors, see the
   [MCP guide](https://docs.torii.so/guides/mcp-server).

   Verify with *"list the Torii docs"* — you should get a page index back.

2. **Paste the prompt**, then run whatever dev command it scaffolded.

Output varies between models and runs.

## Before you call it done

Two steps live in the Torii dashboard, not in code. The app looks finished
without them.

**OAuth providers** — configure them under your environment's auth provider
settings. No code change needed: the SDK reads them from your environment's
config and renders the buttons automatically.

**Legal documents** — set your Terms of Service and Privacy Policy URLs, and
turn on **Require express consent to legal documents**. This is enforced, not
decorative: the SDK renders an acceptance line on the sign-up form, and the
server rejects sign-up with `legal_consent_required` (HTTP 422) until the user
accepts.

## Languages

English and Danish ship in the SDK, with browser auto-detection and a picker.
Adding a third means supplying your own label set — see the customization docs.

## Links

- [Documentation](https://docs.torii.so)
- [Quickstart](https://docs.torii.so/guides/getting-started/quick-start)
- [First-party cookies](https://docs.torii.so/guides/before-production/first-party-cookies)
- [MCP server](https://docs.torii.so/guides/mcp-server)
