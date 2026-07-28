# torii-example-react

A React + Torii app built from **one prompt**, using Torii's docs MCP server.

The point of this repo is not the app. It's that an AI editor connected to
[`mcp.torii.so`](https://docs.torii.so/guides/mcp-server) can read the real
component props and setup guides and write a working integration in a single
shot, without you feeding it API details.

> **Status:** the reference output lives in `app/`. If it isn't there yet, run
> the prompt below — that's the whole exercise.

## The prompt

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

It deliberately never names a package, a component, or a prop. Everything the
assistant needs is in the docs, and looking it up is the test. The last
requirement is the interesting one: keeping the session cookie first-party in
local dev needs a specific setup that the docs describe and a guess gets wrong.

## Run the prompt yourself

1. **Connect the MCP server.** This repo ships a `.mcp.json`, so Claude Code
   picks it up when you open the directory. For other editors, see the
   [MCP guide](https://docs.torii.so/guides/mcp-server).

   Verify with: *"list the Torii docs"* — you should get a page index back.

2. **Get a publishable key.** Create a free project at
   [torii.so](https://torii.so), then copy the sandbox `pk_test_…` key.

   ```bash
   cp .env.example .env
   # paste your key into VITE_TORII_PUBLISHABLE_KEY
   ```

3. **Paste the prompt.** Then run whatever dev command it scaffolded.

Output varies between models and runs. That's expected — the claim is "the docs
are good enough to one-shot this," not "every run is byte-identical."

## Or just run the reference output

```bash
cd app
pnpm install
cp ../.env.example .env   # add your key
pnpm dev
```

The key is yours, not ours: this repo ships no working key on purpose. Creating
your own project takes about two minutes and is the thing the example is
actually demonstrating.

## Before you call it done

Two steps live in the Torii dashboard, not in code. The prompt cannot do them
for you, and the app looks finished without them.

### OAuth providers

Configure providers (Google, GitHub, …) under your environment's auth provider
settings. **No code change is needed** — the SDK reads them from your
environment's config and renders the buttons automatically. Add a provider,
reload, and it appears.

### Legal documents

Set your Terms of Service and Privacy Policy URLs, and turn on **Require
express consent to legal documents**.

This is enforced, not decorative. With it on, the SDK renders an acceptance line
on the sign-up form, and the server rejects sign-up with `legal_consent_required`
(HTTP 422) until the user has accepted. Leave it off and you ship a sign-up flow
with no record that anyone agreed to anything.

## Languages

English and Danish both ship in the SDK. The browser locale is auto-detected,
with a picker for switching. Adding a third language means supplying your own
label set — see the customization docs.

## Links

- [Documentation](https://docs.torii.so)
- [Quickstart](https://docs.torii.so/guides/getting-started/quick-start)
- [First-party cookies](https://docs.torii.so/guides/before-production/first-party-cookies)
- [MCP server](https://docs.torii.so/guides/mcp-server)
