# FBS SMB Sales Engine — Session Handoff

**Last updated:** 2026-04-22

## How to run

```bash
cd "FBS SMB Solution/app"
npm install       # first time only
npm run dev       # http://localhost:5173
npm run test      # 28 tests
npm run build     # production
```

Env vars (optional — `app/.env.example` has the list):
- `VITE_SUBMIT_WEBHOOK_URL` — if unset, submit logs to console
- `VITE_CALENDLY_URL` — if unset, Schedule modal shows demo banner
- `VITE_PATHFINDER_ENABLED=true|false` — toggles AI chat
- `VITE_ADMIN_KEY` — if set, `/admin?k=<key>` is gated

## Status

All 6 phases of `~/.claude/plans/fbs-smb-sales-engine-deep-quill.md` are implemented:

| Phase | What it delivered | Done |
|---|---|---|
| 0 | Vite + React + TS + Tailwind scaffold, tokens, fonts | ✅ |
| 1 | Zustand store, pricing engine, presets, SummaryPanel | ✅ |
| 2 | Flow A — Landing → 6-step wizard → Review → Confirm | ✅ |
| 3 | Flow C — Quiz → Bundle → Pathfinder chat (graceful degrade) | ✅ |
| 4 | Webhook submit, Admin inbox w/ 6 seeds, Resume hydration, print-to-PDF | ✅ |
| 5 | Mobile drawer, a11y focus rings, print stylesheet | ✅ |

**Tests:** 28 / 28 passing (pricing 16, presets 8, resume 4)
**Build:** 268 KB JS / 29 KB CSS (gzip 81 + 6)

## Routes

```
/                     Landing (8 industry cards + Pathfinder CTA)
/build                Quick quiz (Flow C entry when no industry picked)
/build/bundle         Configurator w/ inline Pathfinder chat
/build/from-scratch   Redirects to /build/step/1
/build/step/:n        Linear wizard (Flow A)
/build/review         Editable line items + submit
/build/confirm/:id    Gratitude + 3 action cards
/build/resume/:token  Decodes LZString+fingerprint, hydrates, redirects
/admin                Inbox (gated by ?k=VITE_ADMIN_KEY)
/debug                Dev-only preset tester
```

## Key files

- `src/store/useBuildStore.ts` — Zustand + persist, full state shape
- `src/lib/pricing.ts` — PRICES constant + `calculateTotal` + `estimateSavings`
- `src/lib/presets.ts` — 8 industry presets + recommend\* helpers
- `src/lib/pathfinder.ts` — `ask()`, `buildContext()`, `isAvailable()`
- `src/lib/webhook.ts` — `submit()` w/ demo fallback, `readLocalSubmissions()`
- `src/lib/resume.ts` — LZString + FNV-1a fingerprint tokens
- `src/content/copy.ts` — verbatim wireframe microcopy (do not invent)
- `src/content/industries.ts` — 8 IndustryCardMeta entries

## UX decisions from this session (override the original plan)

1. **Landing industry click skips the quiz.** `Landing.pickIndustry()` routes straight to `/build/bundle` (Apple configurator feel). The 3-question quiz at `/build` is reserved for the "AI Pathfinder: suggest a bundle" CTA, when no industry is known. Reason: user feedback that picking industry twice felt redundant.
2. **ServiceTile layout** — price moved from the top-right (where it collided with the selected-checkmark) into the content block, below the description. Checkmark is absolute top-right.

## Known not-yet-done (future phases, optional)

- `@react-pdf/renderer` client-side PDF (currently using `window.print()` + print stylesheet — works, but a styled PDF component would be richer)
- Real `window.claude.complete()` wiring — chat uses graceful degrade today; flip `VITE_PATHFINDER_ENABLED=true` and run inside a Claude artifact to exercise the live path
- Viewport matrix smoke test (375/390/768/1024/1280/1440) — built mobile-first but not manually audited on every width
- Full a11y audit (VoiceOver / keyboard-only walkthrough)

## Gotchas

- The symlink `app/public/assets → ../../assets` keeps `colors_and_type.css` + `logo.png` single-sourced — don't break it when moving files
- Zustand store is `partialize`d — only business/services/meta persist, not actions
- `/debug` route is meant to be removed before production
- `localStorage['fbs.submissions']` is seeded with 6 mock orders on first `/admin` visit — clear it to see a fresh inbox
- The outer working dir has a space: `FBS SMB Solution/` — always quote in shell commands
- The app lives at `FBS SMB Solution/FBS SMB Solution/app/` (the project is a nested folder). `npm run dev` must be run from inside `app/`.

## Wireframes + spec (source of truth)

- `FBS SMB Self-Serve Wireframes.html` — multi-tab reference (Build Spec, Flow A, Flow C, Review, Admin, Mobile)
- `assets/colors_and_type.css` — design tokens
- `CLAUDE_HANDOFF.md` — original brief / hard rules
- `wf-*.jsx` — wireframe-aesthetic mocks (pattern-match shape, do NOT import)
