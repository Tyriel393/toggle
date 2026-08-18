# "Make room" — Toggl 2.0 home assignment prototype

**When an unfinished task exhausts its estimate, Toggl asks what remains, identifies which client
commitment no longer fits, and lets the freelancer approve how to make room — before a promise
quietly becomes impossible.**

Vite + React + TypeScript + Tailwind v4. Deployed on Vercel.

- **Live demo:** https://toggl-kit.vercel.app (root lands on the moment — no setup needed)
- **Component kit:** https://toggl-kit.vercel.app/kit
- **Repo:** https://github.com/Tyriel393/toggle (private)

## The demo

The deployed root opens at `/calendar` with the estimate-reached prompt already visible. The pill
bottom-left restarts the demo (to watch the timer-stop trigger) and switches scenarios:

| Scenario | What it shows |
| --- | --- |
| **Conflict** | 2h more no longer fits Wednesday → Atlas (due Thursday) at risk → safe move offered → preview → approve → undo |
| **Fits** | The confirmed remainder fits — "still on track", no false alarm |
| **No safe move** | Nothing can move without touching a dated commitment — honest options only |

All data is mock (allowed by the brief): a day-3 freelancer week — Northstar *Homepage revisions*
(3h estimated, 3h 12m logged), Atlas *Final handoff* (due Thursday), internal *Portfolio polish*
(no deadline). The plan-evaluation logic (`src/lib/planEval.ts`) is pure and deterministic: it
recommends a move only when the task has no deadline and the destination has capacity — Toggl may
reason about time, never about which client matters.

## Redeploy

Pushing to `master` auto-deploys — the GitHub repo is connected to the Vercel project.

```bash
git add -A && git commit -m "message" && git push
```

To deploy the working tree immediately without a commit:

```bash
vercel --prod --yes
```

## Develop

```bash
npm run dev
```

## Typecheck

Run continuously while building.

```bash
npm run typecheck
```

## What's here

| Path | |
| --- | --- |
| `src/components/toggl/` | Component kit — Button, Field, Surface, Data, EmptyState, Icon, Shell |
| `src/data/mock.ts` | 12 people, 5 clients, 6 projects, 28 tasks, ~4 weeks of time entries, time off |
| `docs/design-system.md` | Tokens extracted from the live app |
| `docs/product-map.md` | Verified navigation, object model, flows |
| `docs/assignment-guidance.md` | Toggl's official guidance — reread at the start of each session |
| `DECISIONS.md` | Decision log, including where Josip overrode Claude |

## Notes

- **Design tokens are real**, pulled from the live app's stylesheet and computed styles. See `docs/design-system.md`.
- **Both themes ship**, driven by `prefers-color-scheme`, because Toggl 2.0 follows the OS and the reviewer's machine decides which one they see. `.dark` / `.light` classes override manually.
- **Inter is self-hosted** from `public/fonts/`. Toggl declares GT Haptik but a later `!important` rule means the app actually renders Inter.
- **Icons are Toggl's own**, extracted from the live DOM — 16×16 viewBox, filled paths. Not Lucide.
- `vercel.json` rewrites all paths to `index.html` so client-side routes survive a hard refresh.
- Path alias `@/` maps to `src/`.
