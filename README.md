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

## Notes

- Design tokens in `src/index.css` are **placeholders**. They must be replaced with values extracted from the live Toggl 2.0 app before any fidelity work. See `docs/design-system.md`.
- `vercel.json` rewrites all paths to `index.html` so client-side routes survive a hard refresh.
- Path alias `@/` maps to `src/`.
