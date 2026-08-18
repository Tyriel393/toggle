# Verification — the estimate direction (F1)

**Date:** 2026-08-18. Tested live, trial account, ~5h into the 24h window.
**Verdict: F1 is dead.** Two of the four killers landed. Recorded so it is not re-litigated.

---

## Killer (a) — "is the estimate already prompted somewhere?" → **YES. F1's central claim is false.**

The **New task** drawer (`+ Add task`, Tasks view) shows:

```
Project    Empty
Dates      Empty
Estimate   0h   total ⌄     ← third field, at creation, not hidden, not collapsed
Priority   Empty
Tags       Empty
Assignee   Gajsak Business
Status     Todo
Billable   ⓘ ★              ← note the ★
```

F1's headline was:

> "Toggl sells estimate-versus-actual as its paid tier. It never once asks you for an estimate."

**That is not true.** The estimate is a first-class field in the task creation form. It is optional and defaults to `0h`, but it is *offered*, in the primary create surface, above Priority and Tags.

This is the **tenth consecutive** "Toggl is missing X" hypothesis to collapse on contact with the product.

---

## Killer (b) — "is variance Premium-gated?" → **NO. But that hurts F1 more than it helps.**

Set `Estimate: 1h` on a task with `2h 14s` already logged. The task drawer rendered, unprompted:

```
Logged 2h 14s   |   Planned 2h 15m   |   Estimate 1h

1h 14s over estimate
████████████████████████████████████████  1h estimated
```

Coral bar, plain-language delta, no upgrade wall. Two further signals it is not plan-gated:

- In that same drawer **`Billable` carries a ★** (Toggl's plan-gate marker) and **`Estimate` does not.**
- `Allocation` expands to: *"Add an estimate and assign members to allocate the task."* — estimate feeds allocation feeds Timeline capacity.

So the payoff loop F1 proposed to build **already exists and is well built.** F1 shrinks from "build the estimate learning loop" to "nag harder for a field that's already on the form." That is a defaults-and-emphasis argument, and thin is exactly what killed the previous nine.

**Caveat, stated honestly:** verified on a 31-day trial. Free-tier behaviour is inferred from the absent ★, not directly observed.

---

## Killer (d) — "the return loop collapses into the same session" → **stands, unrefuted**

A 45-minute task estimated at 09:00 and finished at 09:45 opens and closes the loop before lunch. Nothing pulls the user into day two. For a W0 *retention* brief this is the most damaging of the four, and it was the one I had missed.

---

## Killer (c) — "do freelancers estimate at task level?" → still untested

Moot. (a) and (d) already settle it.

---

## Not tested, and now moot

`F4 Make Room`'s gate — *does Timeline flag an over-capacity day?* Attempted: New task → Dates → Aug 19 → the date did not persist (clicking the same day twice sets then clears it). Abandoned rather than burn more clock, because the direction had already changed. **Still formally unverified.**

---

## What this leaves

Ten eliminations have quietly proven the same thing each time:

> **Toggl Focus is not missing capability.** Client, estimate, variance, allocation, goals, Focus mode, Pomodoro, activity tracking, calendar sync, daily-brief email — all shipped, all working, most of them good.

The failure is not that the product lacks answers. It is that **week one never assembles them** — and Toggl's own activation checklist certifies that non-assembly as success.

That claim has gotten *stronger* with every elimination. It is the only thing left standing, and it is what `plan.md` is now built on.

---

# Addendum — the Timeline capacity test (F4's gate)

**Run:** 2026-08-18, same trial account. **Result: Toggl already flags over-capacity.**

## Method

`testing the task creation` → `Dates: Aug 19` (single day) → `Estimate: 20h`. Then Timeline.

## Result

Timeline rendered the task on Wed 19 with, directly above it:

| Element | Value | Computed |
| --- | --- | --- |
| Over-capacity badge | `+12h` | class `text-error`, `rgb(250, 184, 172)` |
| Block label | `20h/day` | `rgb(242, 232, 181)` |
| Lane header | `40h free` → `20h free` | `rgb(179, 176, 178)` |

20h assigned against an 8h day = `+12h`, in the error colour. **The capacity warning exists and works.**

That is the eleventh consecutive "Toggl is missing X" hypothesis to die on contact.

## Also learned, and it matters

- **Timeline is Premium** (★ in the sidebar, alongside Approvals and Time off).
- **Its empty state is explicitly team-framed:** *"Plan capacity across your team. See who's overbooked or under capacity at a glance. This space fills with a lane for each person you invite."* → CTA `Invite members`.
- The **Unplanned tasks** rail already renders logged-against-estimate inline: `testing the task creation — 2h 14s / 1h`.
- The task drawer's estimate bar has **two states**: over (`1h 14s over estimate`, coral) and under (`10% · 17h 59m 46s left`, pink, with a `Logged / Estimate` legend).

## What is NOT there — the surviving gap

1. **The overrun and the capacity view never meet.** The overrun lives in the task drawer. The capacity flag lives in Timeline, a different Premium section. **Nothing connects them.** An overrun does not propagate to "your Wednesday is now over."
2. **No consequence is named.** `+12h` is an arithmetic fact. It does not say *which* commitment is at risk, or which deadline it threatens.
3. **No replan is offered.** No move-this, no reschedule, no trade-off.
4. **The capacity surface is sold to managers, not freelancers.** A solo freelancer opening Timeline is told to invite their team.

**UNVERIFIED:** whether any warning appears *before* commitment. We set dates via the task drawer, not by dragging onto the Timeline grid; the drag attempt failed. The `+12h` we saw appeared **after** placement. Do not claim "Toggl only tells you afterwards" without testing the drag path.

## Bearing on the proposed direction

Josip's framing — *"Toggl already tells freelancers when a task exceeded its estimate; the improvement is showing what that overrun now puts at risk, and helping them replan"* — **survives this test, but narrows.**

It is no longer "build a capacity warning." Both halves already exist. It is:

> **Connect the two things Toggl already computes** — the estimate overrun and the day's remaining capacity — **and reframe a manager's staffing view as a freelancer's commitment view.**

Narrower than it looked. Also more defensible, because it does not depend on Toggl lacking anything.
