# Decisions — Toggl home assignment

> Finalized decisions and their rationale. Append-only; supersede rather than edit.
>
> **Why this file exists:** Toggl grades "what you added on top — where your thinking came in,
> where you disagreed with AI." Every override Josip makes gets logged here at the moment it
> happens, so the written rationale is sourced from a record rather than reconstructed from memory.
>
> Columns: **Proposed** = what Claude suggested. **Decided** = what Josip chose. When those differ,
> that row is material for the rationale.

## 2026-08-17 — Setup day

| # | Decision | Proposed | Decided | Rationale |
| --- | --- | --- | --- | --- |
| 1 | Build process | research → plan → annotate → execute; no code before an approved `plan.md` | same | Planning holds the thinking; execution stays mechanical. The markdown artifacts also carry context across compaction in a long session. |
| 2 | Stack | Vite + React 19 + TS + Tailwind v4 + Lucide + React Router | same | Specified in the brief. Lean, no backend, deploys to Vercel as a static SPA. |
| 3 | GitHub repo visibility | private | same | Interview prep does not need to be world-readable. Vercel deploys private repos without friction. |
| 4 | Vercel project name | `toggl-kit` | same | Vercel rejected the directory-derived name `Toggle` (uppercase not allowed). Production URL is `toggl-kit.vercel.app`. |
| 5 | SPA routing | `vercel.json` rewrite of `/(.*)` → `/index.html` | same | Vite's Vercel preset does not add an SPA fallback. Without this, a hard refresh on `/kit` 404s — an explicit requirement. |
| 6 | TypeScript strictness | `strict: true` added to `tsconfig.app.json` | same | The Vite 9 scaffold ships without it. The working agreement bans `any`/`unknown`, which is unenforceable with strict off. |
| 7 | Design tokens | placeholders committed, clearly marked, pending browser extraction | same | Deploy chain had to be provable before the Toggl login existed. Placeholders are labelled in `src/index.css` so they cannot be mistaken for extracted values. |

## Open — need Josip's call

### A. Typeface — GT Haptik vs Inter

Toggl 2.0 uses **GT Haptik** (Grilli Type, commercial licence), self-hosted at `assets.focus.toggl.com`, weights 400/500/700, with a `GT Haptik Rotalic` companion for italics. Their own declared fallback is **Inter**.

| Option | Fidelity | Risk |
| --- | --- | --- |
| Hotlink Toggl's woff2 files | Exact | Uses a paid font we have no licence for. Reviewers are Toggl themselves, so it is unlikely to read as theft — but it is still someone else's licensed asset, and a broken asset host would break the prototype. |
| Use Inter | Very close — it is their own fallback, near-identical metrics | Slightly different letterforms in headings |

Leaning **Inter**: it is what Toggl themselves fall back to, it removes a licensing question and an external dependency, and at 11–14px the difference is nearly invisible. Not decided.

### B. Icons — Lucide will not match

The brief assumed Lucide. The real set is **bespoke: 16×16 viewBox, filled paths, `fill="currentColor"`**. Lucide is 24×24 **stroked** at stroke-width 2 — a visibly lighter, different construction.

| Option | Fidelity | Cost |
| --- | --- | --- |
| Extract Toggl's own icons from the public bundle | Exact | Some effort; same licensing question as the font, though these are plain SVG paths |
| Use a filled 16px set (e.g. Phosphor Fill, Material Symbols Filled) | Close | Free, quick |
| Use Lucide as specified | Noticeably off | Free, already installed |

Leaning **a filled 16px set** over Lucide. Not decided.

### C. Theme — dark or light?

The app ships both. The account was in dark. The assignment prototype should pick one deliberately; tokens for both are documented.
