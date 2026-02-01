# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This is a TypeScript-based [Next.js](https://nextjs.org) App Router application (bootstrapped with `create-next-app`) that implements the **CreatorOS** product: an AI-powered "business OS" for creators. The UI is organized into several product surfaces (Persona Engine, Growth Strategist, Sponsorship Match, Creator Network) with a shared shell layout and styling.

Key technologies:
- Next.js 16 with the App Router (routes defined under `src/app`)
- React 19 with the React Compiler enabled via `reactCompiler: true` in `next.config.ts`
- TypeScript (see `tsconfig.json`)
- ESLint with `eslint-config-next` (see `eslint.config.mjs`)
- Tailwind CSS v4 (via `@tailwindcss/postcss` and `postcss.config.mjs`)
- OpenAI (via `openai` SDK) for AI-powered routes
- Supabase (via `@supabase/supabase-js`) for persistence

Source layout (high level):
- `src/app/layout.tsx` – Root layout and navigation shell shared by all routes.
- `src/app/page.tsx` – Landing page and Persona Engine mini-demo.
- `src/app/growth-strategist/page.tsx` – Growth Strategist surface.
- `src/app/sponsor-match/page.tsx` – Sponsorship Match surface.
- `src/app/creator-network/page.tsx` – Creator Network surface.
- `src/app/persona-output/page.tsx` – Persona Output surface.
- `src/lib/openaiClient.ts` – Thin OpenAI client initialization, reading `OPENAI_API_KEY`.
- `src/lib/supabaseClient.ts` – Supabase browser client initialization, reading `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

At the time of writing, the UI pages are primarily prototypes and call `fetch` against `/api/*` routes (e.g., `/api/persona`, `/api/growth-strategist`, `/api/sponsor-match`). Those API routes are expected to be implemented using the shared OpenAI and Supabase clients under `src/lib`.

Environment:
- OpenAI integration is gated by `process.env.OPENAI_API_KEY`. If it is unset, `openaiClient` logs a warning and evaluates to `null`.
- Supabase integration is gated by the public env vars `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; missing values cause a console warning on startup.

## Common commands

All commands are intended to be run from the repository root (`creatoros`). Package manager examples use `npm`; adapt to `yarn`, `pnpm`, or `bun` as desired.

### Development server

Start the Next.js dev server on port 3000:

```bash
npm run dev
```

The main entrypoint is `src/app/page.tsx`. Other product surfaces are under `src/app/*/page.tsx`.

### Build

Create a production build:

```bash
npm run build
```

Start the production server (after `npm run build`):

```bash
npm start
```

### Linting

Run ESLint using the Next.js + TypeScript config in `eslint.config.mjs`:

```bash
npm run lint
```

If you need to target specific files or directories, you can pass globs directly to `eslint` if you add/adjust scripts in `package.json` (the current `lint` script is simply `eslint`).

### Testing

There is no test framework or `test` script defined in `package.json` yet. If you add tests (e.g., Jest, Vitest, Playwright, or Next.js built-in testing), ensure you:
- Add an appropriate `"test"` script to `package.json`.
- Document how to run a single test case or test file here.

## High-level architecture & patterns

### Routing & layout

- **App Router**: Routing is handled by the Next.js App Router rooted at `src/app`.
  - Each directory under `src/app` that contains a `page.tsx` defines a route (`/`, `/growth-strategist`, `/sponsor-match`, `/creator-network`, `/persona-output`).
- **Root layout**: `src/app/layout.tsx` defines the shared HTML structure, navigation, and shell styling (the "CreatorOS" chrome, navigation links, and auth CTA buttons).
  - It imports `globals.css` and Geist fonts and wires Tailwind-style utility classes.
  - All route components are rendered inside this shell via `children`.

### Feature surfaces (pages)

Each feature surface is implemented as a focused React component that renders a two-column layout (hero/description + interactive panel) with shared styling conventions (`creatoros-*` CSS classes):

- **Persona Engine (`src/app/page.tsx`)**
  - Marked `'use client'`; uses React state to capture a `videoUrl` and submit it to `/api/persona` via `fetch`.
  - Displays in-place error messaging and a set of preview outputs (script, thumbnails, captions, hashtags) but currently logs the API result to the console.
  - Intended to later redirect to `/persona-output` and persist persona data to Supabase.

- **Growth Strategist (`src/app/growth-strategist/page.tsx`)**
  - `'use client'` component with a `channelUrl` input.
  - Calls `/api/growth-strategist` and logs the returned strategy; UI shows a static strategy blueprint as a prototype.

- **Sponsorship Match (`src/app/sponsor-match/page.tsx`)**
  - `'use client'` component capturing sponsor details (`brand`, `budget`, `niche`, `region`).
  - Calls `/api/sponsor-match` and logs the returned matches; UI shows static prototype matches and a contract preview.

- **Creator Network (`src/app/creator-network/page.tsx`)**
  - Static server component rendering a list of example creators and a conceptual "collab map" visualization.

- **Persona Output (`src/app/persona-output/page.tsx`)**
  - Static server component showing example outputs (script, thumbnail text, captions, hashtags, and style notes) that will eventually be populated from AI + Supabase.

All of these surfaces share a consistent design language via `creatoros-*` CSS classes defined in `globals.css`.

### Shared services

- **OpenAI client (`src/lib/openaiClient.ts`)**
  - Centralizes OpenAI initialization.
  - Exposes a single `openai` export constructed with `OPENAI_API_KEY` when present; otherwise logs a warning and exports `null`.
  - API route handlers should import this client rather than instantiating `OpenAI` directly, and must handle the `null` case gracefully (e.g., by returning a 503 or informative error message).

- **Supabase client (`src/lib/supabaseClient.ts`)**
  - Creates a Supabase browser client via `createClient` using the public environment variables.
  - Enables `persistSession: true` in the `auth` options.
  - Any client components that need to read/write persistent creator data should import and reuse this client instead of creating new instances.

### Configuration

- **Next.js config (`next.config.ts`)**
  - Enables the React Compiler via `reactCompiler: true`.
  - Additional Next.js config (e.g., redirects, experimental flags, image domains) should be added here.

- **TypeScript config (`tsconfig.json`)**
  - Strict TypeScript configuration with `noEmit`, `strict: true`, and `moduleResolution: "bundler"`.
  - Path alias `@/*` is mapped to `./src/*`; use this for shared utilities/components if you grow beyond the current flat structure.

- **ESLint config (`eslint.config.mjs`)**
  - Uses `eslint-config-next` core web vitals + TypeScript presets.
  - Overrides ignore patterns explicitly via `globalIgnores` to exclude build artifacts (`.next/**`, `out/**`, `build/**`) and `next-env.d.ts`.

## Notes for future Warp agents

- Prefer adding new routes under `src/app` using the App Router conventions (folders with `page.tsx`, `layout.tsx`, `loading.tsx`, etc.).
- Reuse `src/lib/openaiClient.ts` and `src/lib/supabaseClient.ts` when implementing or extending API routes; keep provider-specific configuration isolated there.
- Keep the shared shell and navigation in `src/app/layout.tsx` aligned with any new product surfaces so the top-level nav remains the single source of truth for available tools.
- When introducing tests or additional tooling, update `package.json` scripts and mirror any important usage here in `WARP.md` so future agents see the canonical commands.
