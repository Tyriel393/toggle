# Pre-plan verification — "Make room"

**Purpose:** before writing `plan.md`, prove the product does NOT already do what we're proposing, and nail down the facts the plan and Loom will rest on. Every claim tested live on the trial account, 2026-08-18.

**Rule:** a ✅ means I saw it with my own eyes and can cite where. A ❓ means I couldn't reach it. Nothing goes in the plan as fact unless it's ✅ here.

---

## The seven checks

| # | Question | Why it matters | Result |
| --- | --- | --- | --- |
| 1 | Does Toggl already connect an overrun to its cross-client consequence and offer a replan? | **Kill criterion.** If yes, the whole idea is dead. | _pending_ |
| 2 | Is there a Scheduler, and does it use tracked time? | We claim "Toggl has the pieces." Must not oversell. | _pending_ |
| 3 | Does the task model have a "remaining work" field? | The "what remains?" question is the core insight — only valid if the field doesn't exist. | _pending_ |
| 4 | With project dates set, does the Dashboard forecast a late completion? | If Toggl already predicts lateness, part of our value is taken. | _pending_ |
| 5 | Does the over-capacity warning appear before commitment, or only after? | Shapes whether we're "warn before" or "catch after." | _pending_ |
| 6 | When an estimate changes, does capacity update and name the affected task/deadline? | Tests whether the consequence is already surfaced. | _pending_ |
| 7 | What do Project Alerts actually fire on? | Could already be the "warning" half. | _pending_ |

Plus one that needs a second account (I can't create accounts): do the three onboarding intents differ? — flagged for Josip.

---

## Findings

### Check 1 — Does Toggl already connect overrun → consequence → replan? ❌ NO (the idea survives)

Looked everywhere the behaviour could live:

- **Notifications** (bell): empty. The two shipped defaults (daily brief, 8h-timer email — documented earlier in `w0-first-run.md`) don't connect an overrun to anything.
- **Task drawer, over estimate**: shows `1h 14s over estimate` + coral bar. Names no other task, no deadline, no consequence. Stops at the fact.
- **Timeline**: shows `+12h` over capacity. Names no cause, no deadline, offers no replan.
- **Project Alerts** (see Check 7): threshold email on a single project. Blind to other clients and to capacity.

**Nowhere does the product take "you went over" and turn it into "here's what that costs you, and here's what to do."** The kill criterion is not triggered. The seam is real.

### Check 7 — What do Project Alerts fire on? ✅ Two threshold types only

`Add alert` dialog: `ALERT TYPE` has exactly two options — **Time estimate** (%, default 80%) and **Fixed fee budget** (%). Emails a chosen recipient when the threshold is hit.

This is a **single-project budget-approach email**. It knows nothing about the freelancer's other commitments, their week's capacity, or any deadline. It is the generic "you're nearing your estimate" warning the reality-check doc explicitly said *not* to rebuild. Does not overlap with "Make room."

### ⭐ Check 8 (new, from doc §2.7) — The Workload report — ✅ EXISTS, and this is the one that matters

`Reports → Workload` (⭐ Premium). Report types available: Summary, Utilization⭐, **Workload⭐**, Profitability⭐, Time logs, Time off⭐.

**What it already shows:**
- Headline: `Work hours 40h · Logged 6h 9m · Billable 3h 30m 42s · **Remaining hours 33h 51m**`
- Chart "What is my workload?" with a legend that includes **`Overtime (>100% time logged)`**
- Table "Am I over worked?" — per-day logged vs. a `40h/week` capacity, `TOTAL 6h of 40h`

So **"remaining hours" and "overtime" already exist as first-class concepts.** I must never claim in the plan or Loom that Toggl has no notion of remaining capacity or overtime. It does.

**Why it still does NOT close our loop — five specific gaps:**
1. **Team-framed, not solo.** It literally interrupts a solo user: *"One person's bars can't show balance. Invite your team to see who's at capacity and who's ready for more work." → Invite members.* The freelancer is told this view is for managing other people.
2. **Passive, not triggered.** It's a report you must go and open. Nothing surfaces it at the moment an estimate is blown.
3. **Backward/current-looking.** The headline `Remaining hours` = 40h work − logged-so-far. It is "how much of your week is unfilled," not "does your committed work still fit before its deadlines."
4. **No "what remains?" step.** It rolls the estimate already stored on a task; it never asks the user whether *more* work remains on an overrunning task. That confirmation — our core insight — is absent.
5. **No consequence naming, no action.** It never says "Atlas no longer fits before Friday," and offers no replan. It's a scoreboard, not a decision.

**Net:** the strongest "Toggl already does this" objection an evaluator could raise. Now answered: the *metrics* exist (remaining hours, overtime), inside a **Premium, team-oriented, passive report** — not as a freelancer's triggered, deadline-aware, cross-client decision. That distinction is now the spine of the pitch, and it's defensible because I've seen both sides of it.

### Check 2 — Is there a Scheduler, and does it use tracked time? ❌ NOT available in this workspace (checked three ways)

Looked in every reasonable place:
1. **Timeline interactive tree** (accessibility, not eyeballing): no `Scheduler`/`AI`/`auto-arrange`/`schedule` control — only the capacity gear + panel toggles.
2. **Tasks AI icon**: it's the **importer** (Photo/Prompt/Text — "turn it into a list of tasks"), not a scheduler.
3. **Admin settings**: sections are Access, Tags, Statuses, Required/Custom fields, Alerts & reminders, Targets, Billable rates, Currency, Data import. **No beta/labs/Scheduler section.**

**Conclusion:** the Scheduler is an officially-documented beta **not rolled out to this workspace** — I could not observe it, having genuinely looked. Per its own docs it **cannot use tracked time or past entries** — so even where it runs, it does not consume the overrun that triggers our experience. Honest framing for the Loom: *"Toggl is building task rescheduling; it deliberately doesn't look at what actually happened. Make room is the bridge between the two."* Do **not** claim we plug into a live Toggl scheduler — mark it **documented, not observed**, and the prototype simulates the reshuffle.

### Check 3 — Is there a "remaining work" field on a task? ❌ NO (confirmed)

Task drawer exposes exactly: `Logged`, `Planned`, `Estimate` (plus the over/under bar). There is **no "remaining effort" field** — matches the API (§2.6). This is *why* the "how much is left?" question is necessary: the product structurally cannot know remaining work without asking. Our core insight stands.

### Check 6 — Does an estimate change propagate to capacity, and name the affected work? ✅ propagates / ❌ names nothing

Observed earlier: setting a task estimate to `20h` on a dated day made Timeline show `+12h` in the error colour **immediately**. But it named no affected task and no threatened deadline — it's a bare arithmetic badge. The propagation exists; the **consequence framing does not**. That's the gap we fill.

### Check 4 — Dashboard forecast of a late completion — ✅ NOW REPRODUCED, and it's softer than the docs claim

Set up the prerequisites live: project dates `Aug 17–20`, project estimate `40h` (only 3h 31m logged). Dashboard → Time progress rendered:
- Headline: `Estimated time 40h · Logged time 3h 31m · Remaining time 36h 29m`
- Chart **"Actual vs estimated time"**: a flat `Estimated time: 40h` target line, a `Logged time` actuals line, and `Start date / Today / End date` markers across the window.

**What it does NOT show:** no explicit forecast/projection line, and **no stated "estimated completion date"** — even with every prerequisite the docs said were needed. So Toggl gives you a **burn-up progress chart** you can eyeball to see you're behind pace; it does not draw a predicted finish date.

**Bearing:** "project completion forecasting" is real but weaker than the doc's wording — it's progress-vs-target, not a named forecast date. And it's **single-project** regardless: it never says "your *other* client's Friday delivery no longer fits." Does not overlap with Make room; if anything, softer than feared.

### Check 5 — Pre-commit vs post-commit warning — ⚠️ left open (and not central)

The Timeline `+12h` I saw appeared **after** the estimate was applied. Whether a warning shows *during* a drag onto a full day is untested (the drag automation kept mis-zooming). **Lower priority than it first seemed:** our trigger is *an overrun*, which is post-hoc by definition — you can only exceed an estimate after the work has started. So "warn before vs. after commit" is a Timeline-drag question, not a Make-room question.

### Needs a second account (I cannot create accounts): do the 3 onboarding intents differ? ❓

Unverified. If the plan keys off a "planning-oriented" signup intent, this needs one more free account (~10 min, **Josip's action** — I decline account creation). Until then, treat "intent shapes the first run" as an **assumption**, not a fact, in the plan.

---

## Verdict

| # | Question | Answer | Bearing |
| --- | --- | --- | --- |
| 1 | Overrun → consequence → replan already connected? | **No** | Kill criterion not met — idea survives |
| 2 | Scheduler using tracked time? | **No** (beta, tracked-time-blind, not enabled here) | We simulate; frame honestly |
| 3 | "Remaining work" field exists? | **No** | The "what remains?" ask is necessary |
| 4 | Dashboard forecasts lateness? | **Reproduced: burn-up "actual vs estimated" chart, single-project — but NO named completion date** | Softer than docs; not our cross-client decision |
| 5 | Warn before commit? | Open, not central | Our trigger is post-overrun anyway |
| 6 | Estimate change → named consequence? | **Propagates, unnamed** | We add the naming |
| 7 | Project alerts = the warning? | **No** (single-project threshold email) | Not overlapping |
| 8 | Workload report already does this? | **Remaining hrs + overtime exist, but team-framed, passive, Premium** | The one real overlap — and precisely bounded |

**Bottom line: the foundation is solid.** Nothing in the product performs the triggered, freelancer-facing, deadline-aware, cross-client decision we're proposing. The pieces exist and are scattered exactly as the concept claims. Two honesty constraints for the plan/Loom, both now precise:

1. **Never say Toggl lacks "remaining hours" or "overtime"** — the Workload report has both. Say it lacks the *freelancer's triggered, deadline-aware version* of them.
2. **Never say we plug into Toggl's scheduler** — it's a tracked-time-blind beta. Say Make room is the bridge between what happened and the replan.

One open assumption to carry, not resolve tonight: whether onboarding intent shapes the first run (needs Josip's second account).
