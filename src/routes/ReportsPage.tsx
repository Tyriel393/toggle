import { Link } from 'react-router-dom'
import { PageContainer, TopBar } from '@/components/toggl/Shell'
import { Button } from '@/components/toggl/Button'
import { Card } from '@/components/toggl/Surface'
import { fmtMins } from '@/lib/planEval'

type Row = {
  name: string
  client: string
  color: string
  estimateMins: number
  loggedMins: number
}

const ROWS: readonly Row[] = [
  { name: 'Homepage revisions', client: 'Northstar', color: '#fa9200', estimateMins: 180, loggedMins: 312 },
  { name: 'Final handoff', client: 'Atlas', color: '#5252d6', estimateMins: 420, loggedMins: 395 },
  { name: 'Portfolio polish', client: 'Internal', color: '#6c6c7a', estimateMins: 120, loggedMins: 118 },
]

/*
 * The week-one payoff, in the product's own analysis surface: what you quoted
 * against what it took. Only produceable after a week of tracking — which is
 * exactly why it is a reason to come back.
 */
export function ReportsPage() {
  const estimate = ROWS.reduce((s, r) => s + r.estimateMins, 0)
  const logged = ROWS.reduce((s, r) => s + r.loggedMins, 0)
  const variance = Math.round((logged / estimate - 1) * 100)

  return (
    <>
      <TopBar
        title="Reports"
        actions={<span className="text-[14px] font-medium text-fg-secondary">Week one · Mon 17 – Fri 21 Aug</span>}
      />
      <PageContainer>
        <div className="mx-auto max-w-4xl space-y-4 pt-1 pb-10">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Estimated" value={fmtMins(estimate)} />
            <Stat label="Logged" value={fmtMins(logged)} />
            <Stat
              label="Variance"
              value={`${variance > 0 ? '+' : ''}${variance}%`}
              tone={variance > 10 ? 'error' : 'default'}
            />
          </div>

          <Card title="Estimated vs actual">
            <div className="space-y-3 pb-2">
              {ROWS.map((row) => {
                const over = row.loggedMins > row.estimateMins
                const pct = Math.round((row.loggedMins / row.estimateMins - 1) * 100)
                const max = Math.max(row.estimateMins, row.loggedMins)
                return (
                  <div key={row.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
                        <span className="truncate text-[14px] font-medium text-fg">
                          {row.client} — {row.name}
                        </span>
                      </span>
                      <span
                        className={[
                          'shrink-0 text-[13px] font-medium tabular-nums',
                          over ? 'text-fg-error' : 'text-fg-secondary',
                        ].join(' ')}
                      >
                        {fmtMins(row.loggedMins)} vs {fmtMins(row.estimateMins)} · {pct > 0 ? '+' : ''}
                        {pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 space-y-1">
                      <Bar mins={row.estimateMins} max={max} color="rgb(var(--stroke-tertiary))" label="estimated" />
                      <Bar mins={row.loggedMins} max={max} color={row.color} label="logged" />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="rounded-lg border border-line-accent bg-bg-muted px-4 py-3.5">
            <p className="text-[15px] leading-6 font-semibold text-fg">
              You quote Northstar low. Homepage revisions took {variance > 0 ? '' : ''}
              {fmtMins(ROWS[0].loggedMins)} against a {fmtMins(ROWS[0].estimateMins)} estimate — 73%
              over. Atlas and your own work landed within minutes.
            </p>
            <p className="mt-1.5 text-[13px] leading-5 font-medium text-fg-secondary">
              That is not a number of hours. It is a fact about how you price one client, and it did
              not exist on Monday. Next time you quote Northstar, you have something better than a
              guess.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/calendar">
              <Button variant="secondary" size="md">
                ← Back to Timer
              </Button>
            </Link>
            <span className="text-[12px] font-medium text-fg-tertiary">
              Prototype — this view exists in Toggl today; the estimate-vs-actual framing is the
              proposal.
            </span>
          </div>
        </div>
      </PageContainer>
    </>
  )
}

function Stat({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'error' }) {
  return (
    <div className="rounded-lg border border-line bg-bg px-4 py-3">
      <p className="uppercase-label">{label}</p>
      <p
        className={[
          'mt-0.5 text-[22px] leading-7 font-semibold tabular-nums',
          tone === 'error' ? 'text-fg-error' : 'text-fg',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  )
}

function Bar({ mins, max, color, label }: { mins: number; max: number; color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-[10px] font-medium text-fg-tertiary">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-secondary">
        <div className="h-full rounded-full" style={{ width: `${(mins / max) * 100}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
