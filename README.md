# Toggl — home assignment prototype

Vite + React + TypeScript + Tailwind v4. Deployed on Vercel.

- **Live:** https://toggl-kit.vercel.app
- **Component kit:** https://toggl-kit.vercel.app/kit
- **Repo:** https://github.com/Tyriel393/toggle (private)

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
