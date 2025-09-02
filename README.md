Bracket Landing Page (Next.js App Router)
========================================

This is the public landing site for Bracket. It’s a Next.js (App Router) project with a small set of components, a password-gated showcase, and optional Manim animations.

Quick Start
- Install deps: `npm install`
- Dev server: `npm run dev` then open http://localhost:3000
- Build: `npm run build` (see Env below if you hit an email/Resend error)

Project Structure
- `app/page.tsx`: Main landing page (hero video, two feature sections, CTA).
- `app/components/`: Navbar, Footer, UI, and helpers (e.g., `AutoPlayVideo`).
- `app/products/identify`: Personality Quantification page.
- `app/products/optimize`: Compatibility OS page.
- `app/contactus`: Contact form (server route uses Resend email service).
- `app/showcase`: Password-gated Personality Assessment demo.
- `app/password`: Open demo selection page (no password) linking to Showcase and the OS demo.
- `public/`: Static assets (images, videos).
- `manim_scenes/`: Optional Manim CE scenes (see below).

Navigation / Flows
- Products dropdown: two side-by-side items (Personality Quantification, Compatibility OS) linking to their product pages.
- Login button: goes to `/password`, where you can choose:
  - “Quantify Personality” → `/showcase` (password is prompted there)
  - “Full OS Demo” → external `https://demo.thebracket.ai` (handles auth itself)
- Client Portal link was removed from the navbar.

Media & Fitting
- Hero video uses `AutoPlayVideo` with `NodeGridScene_noaudio.mp4` (muted, inline, no controls).
- Section artwork uses Next `<Image>` with `fill + object-contain` to avoid cropping for tall images (e.g., `loneliness.png`, `cash.png`).
- To adjust fit:
  - Keep `object-contain` for no cropping; change the wrapper height classes (e.g., `md:h-72 lg:h-80`) to scale overall size.
  - For full-bleed tiles, use `object-cover` with `style={{ objectPosition: 'center 20%' }}` to shift crop.
  - For perfect wide fit, pre-pad a tall poster to a wide canvas (e.g., with ImageMagick) and keep `object-cover`.

Optional Manim Animations
- Scenes live in `manim_scenes/`:
  - `LonelinessScene.py`
  - `CostTurnoverScene.py`
  - `GlobalReachScene.py`
- Render (from `manim_scenes/`):
  - `manim -qk LonelinessScene.py LonelinessScene -o LonelinessScene.mp4`
  - `manim -qk CostTurnoverScene.py CostTurnoverScene -o CostTurnoverScene.mp4`
  - `manim -qk GlobalReachScene.py GlobalReachScene -o GlobalReachScene.mp4`
- Copy outputs to `public/` and update `app/page.tsx` sources/posters if you switch from static images to videos. Currently, the hero uses video; the two feature sections use static images.

Environment Variables (Email/Resend)
- The contact form API route uses Resend. During `next build`, the route may initialize the client and fail if the key is missing. To avoid build errors, set:
  - `RESEND_API_KEY=your_resend_key`
  - Optionally, `EMAIL_FROM=notifications@yourdomain`
- If you don’t need the contact route in local builds, you can also temporarily comment out its server code.

Common Tasks
- Tweak hero video: `app/components/AutoPlayVideo.tsx` handles autoplay, visibility retries, and control hiding.
- Update product copy:
  - Short blurb on the main page.
  - Longer descriptions on product pages.
- Adjust Products dropdown layout: `app/components/Navbar.tsx` (two-card grid in the popover; mobile menu uses pill links).

Conventions
- Styling uses Tailwind utility classes + CSS variables in `app/globals.css`.
- Colors are set via CSS custom properties (e.g., `--background`, `--brand-k`).
- Images: prefer Next `<Image>` with `fill` for responsive containers; use `sizes` to hint layout.

Troubleshooting
- Build error “Missing API key. Pass it to the constructor new Resend(...)”: define `RESEND_API_KEY` in your environment (see above).
- Video autoplay on iOS: ensure muted, playsInline; handled by `AutoPlayVideo` already.
