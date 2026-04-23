# FBS SMB Self-Serve — Claude 4.7 Build Brief

You are building a React + Vite + Tailwind app for **Future Bridge Solutions** — a
self-service ordering platform that lets SMB owners configure internet, phones,
Wi-Fi, cybersecurity, AI tools, and a one-time energy audit in under 10 minutes.

**Your source of truth is `FBS SMB Self-Serve Wireframes.html`** — open it and
read every tab (Overview, Landing, Intake, Flow A/B/C, Review, Admin, Mobile,
Build Spec). The Build Spec tab has the exact stack, state shape, pricing
engine, copy deck, routes, and a paste-ready prompt seed.

## Ship this direction

**Landing C (industry picker) + Flow C (AI Pathfinder).**
Keep Flow A (linear 7-step) as the "start from scratch" fallback.

## Hard rules

- Brand colors: `#193359` primary, `#41A3D8` secondary, `#CB2D27` accent
  (Submit button and error state ONLY), `#77777A` neutral, `#F8FAFC` bg
- Fonts: Manrope (display) + Inter (body). No substitutions.
- One decision per step in linear mode. Defaults always pre-selected.
- Sticky summary on desktop; bottom drawer on mobile. CTA never scrolls away.
- Save-and-resume on every step (email link).
- "Schedule a call" fallback CTA on every step.
- Use `window.claude.complete()` for the Pathfinder chat bubble.
- No backend. Submit → webhook (Zapier/Make) + email.
- Persist full state to localStorage (Zustand `persist` middleware).

## Deliver

Working app at `/`. Flows per the Build Spec tab. Admin inbox at `/admin`.

Start by reading the wireframe file end to end. Do not invent copy — the
wireframes include verbatim microcopy for every screen.
