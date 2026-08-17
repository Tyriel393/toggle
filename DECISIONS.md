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

### ~~A. Typeface~~ — DECIDED 2026-08-17: **Inter, self-hosted**

Claude initially reported GT Haptik as Toggl's typeface, read from the `@font-face` declarations in their stylesheet. **That was wrong**, and the error would have shipped a prototype in the wrong font.

Josip pushed back ("if we are trying to match it exactly shouldn't we go with GT Haptik") — which forced a proper check of what the browser actually resolves rather than what the CSS declares. It resolves to **Inter**:

- computed `font-family` on body contains no GT Haptik
- canvas probe: `"GT Haptik"` measures identically to a nonexistent font
- all GT Haptik faces report `unloaded`; only Inter is `loaded`
- a `font-family: Inter, sans-serif !important` rule overrides the declared stack everywhere

**Decision: self-host Inter Variable (100–900, normal + italic) from `public/fonts/`.** SIL OFL, no licensing question, no external CDN, no hash-rotation risk, and true 500/600 weights rather than synthesised ones.

Lesson recorded: *read computed values, not declarations.* The same failure mode — trusting the stylesheet over the render — is exactly what the assignment guidance warns about when it says to verify claims about the product in the app itself.

### D. Themes — BOTH, decided 2026-08-17

Josip: build light and dark. Reinforces the evidence in C — the app follows the OS, so the reviewer's machine decides. Kit ships both, driven by `prefers-color-scheme`.

### ~~B. Icons~~ — DECIDED 2026-08-17

**Extract Toggl's own SVGs from the public bundle.** Josip's call.

Claude proposed a free filled 16px substitute (Phosphor Fill / Material Symbols Filled) as the lower-effort option. Josip chose exact extraction instead — fidelity is the graded criterion, and a substitute set still reads as foreign at 16px.

Rejected: Lucide (24×24 stroked, visibly wrong weight) despite being named in the original brief and already installed.

### ~~C. Theme~~ — RESOLVED BY EVIDENCE 2026-08-17

Not a preference question. **Toggl 2.0 follows the OS setting.**

Evidence: no theme key in `localStorage`; the OS reports `prefers-color-scheme: dark`; the root element carries `class="fixed dark"`. No stored override exists, so the class is system-driven.

**Implication: the reviewer sees whatever their own machine is set to.** A prototype hard-coded to one theme has a coin-flip chance of clashing with the app they open it next to. The kit therefore supports **both themes, driven by `prefers-color-scheme`** — which the extracted tokens already make cheap, since every role has a light and dark value.

**UNVERIFIED:** whether a manual theme override also exists in Admin settings.
