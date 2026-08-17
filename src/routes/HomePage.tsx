export function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Toggl kit — deploy check</h1>
      <p className="mt-3 text-ink-secondary">
        Scaffold only. Design tokens are placeholders until they are extracted from the live app.
      </p>
      <p className="mt-6 text-sm text-ink-muted">
        Hard-refresh <code className="rounded bg-surface-hover px-1.5 py-0.5">/kit</code> on the
        deployed URL to confirm client-side routing survives a cold load.
      </p>
    </main>
  )
}
