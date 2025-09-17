# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages, layouts, and API routes.
  - `app/components/`: UI and feature components (PascalCase files).
  - `app/hooks/`: React hooks (files start with `use`).
  - `app/api/*`: Route handlers (dynamic segments like `[request_id]`).
- `public/`: Static assets (images, video, svg).
- `app/globals.css`: Tailwind v4 utilities + CSS variables.
- Root configs: `next.config.ts`, `tsconfig.json` (alias `@/*`), `eslint.config.mjs`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev (Turbopack) at `http://localhost:3000`.
- `npm run build` — Production build. Requires email env when contact route is active.
- `npm start` — Run production server from build output.
- `npm run lint` — Lint with Next/ESLint rules.
- API smoke test example: `curl -X GET http://localhost:3000/api/summary/123`.

## Coding Style & Naming Conventions
- Language: TypeScript preferred; indentation: 2 spaces. No Prettier config—match existing style.
- Components: `PascalCase` (e.g., `AutoPlayVideo.tsx`). Hooks: `camelCase` starting with `use`.
- App Router conventions: keep server code in route files only.
- Styling: Tailwind v4 utilities; prefer semantic CSS variables in `globals.css`.
- Imports: use `@/*` alias where appropriate.

## Testing Guidelines
- No unit test framework in repo. Validate by running `npm run lint`, exercising pages locally, and hitting API routes via `curl`.
- If adding tests later, place under `__tests__/` with `*.test.ts(x)` and document the test runner in the PR.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subjects (≤72 chars); add descriptive bodies when helpful. Reference issues (e.g., `Fixes #123`).
- PRs: include summary/scope, screenshots or clips for UI changes, a clear test plan (steps, routes, data), and any env requirements. Ensure lint passes and the project builds.

## Security & Configuration Tips
- Do not commit secrets; use `.env.local` for development.
- Contact route uses Resend. Set `RESEND_API_KEY` (and `EMAIL_FROM`) to avoid build errors during `npm run build`.

## Agent-Specific Instructions
- Follow these guidelines across the repo. Keep changes minimal, aligned with existing patterns, and avoid adding heavy dependencies or restructuring without discussion.

