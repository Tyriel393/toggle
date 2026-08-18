# Plan — "Make room" (Toggl 2.0 · Freelancer · W0)

> **Phase 2 artifact.** Josip annotates inline; Claude addresses every note and reports what changed. **No implementation, and no todo list, until the plan is approved.**

**Status:** revision 2 — all annotation-round-0 notes addressed
**Date:** 2026-08-18
**Supersedes:** the client-attribution plan and the estimate-learning plan (abandoned; see `docs/verification-estimates.md`, `docs/plan-reality-check-deep-research.md`, `docs/pre-plan-verification.md`).

---

## 1. The idea (locked)

> **When an unfinished task exhausts its estimate, Toggl asks what remains, uses its existing capacity intelligence to identify which client commitment no longer fits, and lets the freelancer approve how to make room — before a promise quietly becomes impossible.**

The freelancer's danger isn't the extra 2 hours on one job. It's that those hours are silently borrowed from time already promised to another client — discovered only after they're late. Toggl today shows the overrun, and separately shows the week is over capacity. It never connects them or helps decide what changes.

**Why it survived a dozen eliminations:** it cannot die of "Toggl already has it." The product has the scattered ingredients — variance, capacity, remaining-hours, a burn-up chart, a scheduler beta — and performs **none** of the triggered, freelancer-facing, deadline-aware, cross-client decision built here. Verified in `docs/pre-plan-verification.md` (8 live checks) and `docs/plan-reality-check-deep-research.md`.

**Retention logic:** the value compounds through use — every tracked session either confirms the plan still holds or catches a collision while it is still cheap to fix. Continued tracking is what keeps the plan honest; that is the reason to come back, and the thing we measure.

---

## 2. Persona & constraint

| | |
| --- | --- |
| **Persona** | **Freelancer** — multiple clients, rates, deadlines; the record is a business instrument |
| **Brief language served** | *"plan realistically"* · *"avoiding overcommitment"* · *"estimating future work without good historical data"* |
| **W0** | Product tenure, not career tenure. The target user arrives with active clients, imports/creates their week on day 1 (AI importer verified live), tracks day 2, overruns and replans day 3. |
| **Eligibility** | Behavioral: has dated, estimated work and tracks against it. Does **not** depend on onboarding personalization. Cohort size is unknown — named as the primary business risk in §10, instrumented not assumed. |

---

## 3. Honesty rules (non-negotiable in copy, rationale, Loom)

Earned by live testing. Breaking any hands an evaluator an easy kill.

1. **Never say Toggl lacks "remaining hours" or "overtime."** The Workload report (Premium) has both — team-framed ("invite your team"), passive, never asks what remains, never names a deadline. Say it lacks the *freelancer's triggered, deadline-aware* version.
2. **Never say we plug into Toggl's Scheduler.** It is a documented beta, not enabled in the test workspace, and **currently documented as not supporting tracked time or past entries**. Make room is the bridge between what happened and the replan. The prototype simulates the reshuffle with deterministic logic.
3. **State the Dashboard finding as one tested scenario.** In the scenario we set up (dates + 40h estimate), the Dashboard showed an actual-vs-estimated burn-up with no completion-date forecast. That is what we observed; it is not proof a forecast never appears.

---

## 4. The demo cast (used consistently everywhere)

| Object | Role | Data |
| --- | --- | --- |
| **Northstar — Homepage revisions** | The source: task being tracked | Estimated **3h** · logged **3h 12m** · user confirms **2h left** |
| **Atlas — Final handoff** | The protected commitment | Due **Thursday** |
| **Internal — Portfolio polish** | The safe move | **No deadline** |

Expected total for the source task: `3h 12m logged + 2h confirmed = 5h 12m` against an original 3h estimate — the estimation evidence the concept depends on, preserved intact.

---

## 5. The flow

### Trigger

**Production definition:** the prompt fires when **any completed or edited time entry** causes an unfinished task to reach or exceed its estimate — timer stop, manual entry, corrected entry, auto-tracked entry alike.

**Suppression:** shown **once per estimate-crossing state**. It does not reappear on every subsequent stop; it re-arms only after a meaningful change — new time logged against the task, the estimate edited, or previously confirmed remaining time exhausted again.

**Prototype behavior:** demonstrates the trigger through timer stop (the most legible instance), and the deployed root opens with the prompt already visible (§8).

### Step 1 — Ask what remains

Toggl cannot know future work from a historical overrun — there is **no remaining-effort field** (verified). So it asks:

> **You've reached your 3h estimate on *Homepage revisions*.**
> `✓ Done` · `30m left` · `1h left` · `2h left` · `Custom…`
> `Logged to wrong task` · `Not sure yet`

Chips state **remaining time left**, not additions to the estimate — `2h left` is unambiguous where `+2h` is not. One tap. This confirmation is the entire reason this isn't a "you went over" alarm.

### Step 2 — Evaluate and name the consequence

The confirmed remainder becomes `confirmedRemainingMins` — the **original estimate is never modified**. The week is re-evaluated deterministically:

- **Fits:** → Step 5.
- **Conflict:** name what no longer fits, factually:

> Fitting 2h more into this week puts **Wednesday 2h over**. **Atlas — Final handoff** (due Thursday) no longer fits before its deadline.

Name the collision; never rank the clients.

### Step 3 — Make room (safe moves only)

**Rule:** a move is *recommended* only when the task to move has **no deadline** and the destination day has **capacity for it**. Anything else is shown as a collision for the user to resolve — the system never proposes risking a dated commitment.

> **Make room** — suggested: move *Portfolio polish* to Friday.
> *It has no deadline — moving it doesn't put a dated commitment at risk. Wednesday fits again.*
> `Move it` · `Other options` · `Keep current plan`

- **One** safe recommendation, with `Other options` expanding the remaining candidates (each labeled with its deadline consequence, including second-order knock-ons: *"Moving Atlas frees Wednesday but Atlas is due Thursday — you'd have 4h Thursday, which still fits"*).
- **If no safe move exists, say so:** *"Nothing can move without touching a dated commitment"* → offer manual review or consciously accepted overtime. Honesty over false helpfulness.
- `Keep current plan` saves the confirmed remaining time and leaves the conflict **acknowledged, not hidden**.

### Step 4 — Preview, approve, undo

Preview the resulting week on the mini-week timeline → `Approve` → toast with **Undo** (announced via ARIA live region).

- **Undo restores the schedule but retains the confirmed remaining effort** — the user's answer about reality is never thrown away with the layout.
- **Stale preview:** any change to underlying task data while a preview is open invalidates it; re-evaluate before approving.
- Toggl never silently moves a client commitment.

### Step 5 — "You're actually fine"

If the confirmed remainder fits:

> Still on track — your week has room for the extra 2h. Nothing to move.

A tool that only warns is noise; showing "fine" is what makes the warnings trustworthy. If the user has **no dated commitments at all**, the remaining time is saved with no deadline claim made — never invent a threatened promise.

---

## 6. Non-goals

- ❌ Autonomous planner / auto-moving work
- ❌ Ranking clients by importance or profitability
- ❌ General scheduling optimizer (safe-move rule only — anything cleverer is dishonest to what we verified)
- ❌ Onboarding redesign; end-of-day review/categorize *(the poisoned direction)*; new notifications
- ❌ Rebuilding variance, capacity, or Workload — they exist; we connect them
- ❌ Invoicing, rates, mobile, team, permissions

*(Rationale-only note: fixed-price freelancers are still served — 2h of overrun displaces 2h of something regardless of billing model. No unique behavior, so it lives in the rationale, not the edge-case matrix.)*

---

## 7. States to build

**P0 — the demo spine (all manually verified before submission):**

| State | Behaviour |
| --- | --- |
| Estimate reached → prompt | The four-option ask, chips as "left" amounts |
| Conflict named | Wednesday +2h · Atlas due Thursday no longer fits |
| Safe move offered | Portfolio polish → Friday, reasoning shown |
| Preview → approve → undo | Undo restores schedule, keeps confirmed remaining |
| Fits — "still on track" | No false alarm |
| No safe move | Say so; manual review or accepted overtime |

**P1 — high-risk states (built, shown via scenario switch or `Other options`):**

| State | Behaviour |
| --- | --- |
| `Not sure yet` | Quiet marker on the task; prompt suppressed until new relevant activity |
| `Done` | No future capacity created; no alarm |
| `Logged to wrong task` | Offer entry correction; never replan from bad data |
| No dated commitments | Save remaining time; no deadline claim |
| `Keep current plan` | Conflict acknowledged and visible, not hidden |
| Stale preview | Invalidated on data change; re-evaluate |
| Multiple safe candidates | `Other options` lists them with per-move deadline consequences |
| Overtime chosen | Allowed, never recommended |

---

## 8. Demo design — cold-open first

- **Deployed root redirects to `/calendar`** and lands with the **estimate-reached prompt already visible**. A cold evaluator sees the moment in second zero — they are never required to discover that stopping a timer starts the demo.
- **Demo chrome** (outside product chrome, bottom corner): `Restart demo` — replays from the running timer so the Loom can show the stop → trigger transition — and a **scenario switch**: `Conflict` / `Fits` / `No safe move`. No day-navigation; the concept doesn't require simulating multiple days.
- Theme follows OS; a manual theme toggle sits in the demo chrome, not the product chrome.
- `/kit` remains available as the component reference.

---

## 9. Affected files

Builds on the deployed kit (real tokens, Toggl's own icons, Inter, both themes). Confirmed present: `Shell.tsx`, `Icon.tsx`, `EmptyState.tsx`, `Button.tsx`, `Field.tsx`, `Surface.tsx`, `Data.tsx`, `mock.ts`.

| Path | Change |
| --- | --- |
| `src/routes/TimerPage.tsx` | **new** — entry list, running/stopped states, prompt mount |
| `src/components/toggl/RemainingPrompt.tsx` | **new** — Step 1 ask, chips, quiet-dismiss states |
| `src/components/toggl/MakeRoomDrawer.tsx` | **new** — Steps 2–4 in Toggl's **500px right drawer** pattern (measured), not a centered modal |
| `src/components/toggl/WeekStrip.tsx` | **new** — mini-week timeline: days, capacity, blocks; **work visibly moves** on preview/approve |
| `src/lib/planEval.ts` | **new** — **deterministic plan evaluation and safe-move generation**: `evaluate(week) → fits \| conflict(named)`, `safeMoves(week) → Move[]` (no-deadline + destination-capacity only), pure and unit-testable |
| `src/data/demo.ts` | **new** — demo state machine + the §4 cast; scenario presets |
| `src/App.tsx` | root → `/calendar`; keep `/kit` |
| `src/components/toggl/Shell.tsx` | Timer active; other nav dead links (permitted) |

### Data model

```ts
type DemoTask = {
  id: string
  name: string
  client: string | null              // null = Internal
  originalEstimateMins: number       // never modified by this flow
  confirmedRemainingMins: number | null  // null until the user answers
  loggedMins: number
  dueDate: string | null             // null = no deadline = safe-move candidate
  scheduledDay: Weekday
  status: 'todo' | 'in-progress' | 'done'
}
// Derived, never stored:
// expectedTotalMins = loggedMins + confirmedRemainingMins
// varianceMins     = expectedTotalMins - originalEstimateMins

type SafeMove = {
  taskId: string
  toDay: Weekday
  reason: 'no-deadline'              // the only auto-recommendation basis
  destinationFits: true
}

type Decision =
  | 'idle' | 'asking' | 'fits' | 'conflict'
  | 'previewing' | 'approved' | 'kept-with-conflict' | 'deferred'
```

Keeping `originalEstimateMins` untouched and `confirmedRemainingMins` separate **is the concept**: the gap between them is the estimation evidence. (A community report describes estimate edits resetting task status; our flow never edits the estimate field, so the risk doesn't arise.)

---

## 10. Measurement (rationale, not build)

- **Primary (W0):** among eligible new freelancers, do more return to track/plan on ≥3 distinct days in their first 7? Exposed vs. matched eligible control.
- **Value:** % of detected conflicts returned to a feasible plan **before the affected deadline**.
- **Supporting:** % confirming remaining work · % of confirmations creating real conflicts · % opening Make room · % approving · % of moves intact after 24h.
- **Guardrails:** prompt latency added at stop · moves undone <24h · work pushed past deadlines without explicit approval · overtime trends · capacity math corrected/rejected · `Done` used merely to silence the prompt.
- **Eligibility is the primary business risk:** the share of W0 freelancers with enough dated, estimated work to reach the trigger is unknown. Instrument first; no invented baseline.
- **Kill criteria:** eligible cohort too rare · most overruns are already-done tasks · users won't confirm remaining effort · consequences distrusted/undone · no W0 return lift.

---

## 11. Acceptance & deployment criteria

- [ ] Root redirects to `/calendar`; `/kit` remains reachable
- [ ] Prompt and drawer fully keyboard-operable; focus returns to the invoking control on close
- [ ] Undo toast announced through an ARIA live region
- [ ] Light and dark theme visually checked on every P0 state
- [ ] `tsc --noEmit`, lint, and production build all clean (no `any`/`unknown`)
- [ ] Deployed `/calendar` verified with a hard refresh (SPA rewrite intact)
- [ ] Every P0 state manually walked on the deployed URL
- [ ] Scenario switch reaches Conflict / Fits / No-safe-move without code changes

## 12. Submission package

- **Insights doc (public):** problem → evidence (live-verified capability map, incl. what Toggl already has) → the seam → flow → measurement → eligibility risk → kill criteria. Sources: `pre-plan-verification.md`, `plan-reality-check-deep-research.md`.
- **README update:** what this is, deployed URL, run/build steps, mock-data note, scope statement.
- **Deployed verification pass** (§11) before recording.
- **Loom outline (≤5 min, camera on):** the borrowed-hours problem (30s) → cold open on the prompt (60s) → confirm remaining → named consequence → safe move + preview + undo (90s) → "still fits" beat (30s) → restraint: what Toggl may know vs. may decide, what already exists and why this is the seam (60s) → metric + eligibility honesty (45s).
- **Pre-record golden-path check** on the live trial: track a task past its estimate once more and confirm no hidden prompt fires.

## 13. Locked decisions (this round)

| Question | Decision |
| --- | --- |
| Consequence visual | **Mini-week timeline** (`WeekStrip`) — the value is *seeing work move* |
| Suggestions | **One** safe recommendation + `Other options` |
| `Not sure yet` | Quiet task marker; reconsidered only after new activity |
| Demo chrome | `Restart demo` + scenario switch; **no day navigation** |
| Theme | Follow OS; manual toggle in demo chrome only |
| Placement | Toggl's existing **500px right drawer** pattern, not a centered modal |

## 14. Remaining open questions

1. Suppression re-arm threshold: does *any* new logged minute re-arm the prompt after `Not sure yet`, or a meaningful amount (e.g. ≥15m)? Proposed: ≥15m.
2. `Other options`: flat list of candidate moves, or grouped safe-vs-risky? Proposed: safe first, risky collapsed behind a divider with per-move consequence labels.

---

## 15. Todo list (approved for execution)

**Phase A — logic (pure, testable)**
- [x] A1 `src/lib/planEval.ts` — day loads, evaluate (fits/overload/at-risk naming), safe-move generation, risky-move labeling, applyMove. *Fix during verification: the task whose remainder was just confirmed is excluded from move candidates — we make room FOR it, never move it.*
- [x] A2 `src/data/demo.ts` — §4 cast, three scenario presets, state machine + reducer

**Phase B — components**
- [x] B1 `WeekStrip.tsx` — verified: per-day aria labels ("Wednesday: 10h of 8h — 2h over (today)"), +2h error label, preview ghosting clears the overload
- [x] B2 `RemainingPrompt.tsx` — verified: chips, custom parse ("1h 30m" → dynamic consequence), wrong-task reassign updates the entry row, Not-sure leaves quiet marker
- [x] B3 `MakeRoomDrawer.tsx` — verified: conflict named with Atlas at risk, one safe recommendation, risky options carry per-move consequences incl. second-order ("puts Thursday over — Atlas is due that day"), no-safe-move honest state, Escape = acknowledged, focus restore
- [x] B4 `TimerPage.tsx` — verified: cold open on prompt, restart → ticking timer → stop → prompt with focus, fits/done/deferred/reassigned/kept states, undo toast aria-live, demo chrome bottom-left (moved twice — it overlapped the toast, then the drawer footer)

**Phase C — integration**
- [x] C1 `App.tsx` — root → `/calendar`, `/kit` intact
- [x] C2 `tsc -b` clean · lint clean (one pre-existing Icon.tsx fast-refresh warning) · production build clean

**Phase D — ship**
- [x] D1 README rewritten around Make room + scenario table
- [x] D2 Pushed 92e39e3; deploy verification in progress
- [x] D3 All P0 + P1 states walked locally via scripted DOM checks (golden path, undo retains remainder, fits, no-safe-move, overtime, done, wrong-task, defer, custom, Escape)

*plan.md revision 2 approved — executed.*

**Phase E — enhancement round (approved separately)**
- [x] E1 Keyboard layer: prompt `D / 1 / 2 / 3 / C / W / N`, drawer `P / Enter / K / Esc`, timer `S`, toast `Ctrl+Z` — with Toggl-style kbd hints (aria-hidden; the button text is the accessible control)
- [x] E2 Instrumentation stub: `src/lib/track.ts` + `emitEvents` — the full funnel (`estimate_prompt_shown → remaining_confirmed → conflict_detected/week_fits → make_room_opened → move_previewed → move_approved/undone → plan_kept`) emitted to console + a live Events panel in the demo pill
- [x] E3 Premium ★ on the Make room header (ask = free, capacity intelligence = Premium, consistent with Toggl's existing ★ fence)
- [x] E4 Light-theme + resize pass: pill dropped to z-30 (drawer wins at narrow widths), kbd bumped to fg-secondary, no horizontal scroll at 1024/800

**Adversarial review (20-agent workflow): 16 findings, 10 confirmed, all fixed**
- [x] Focus restore was dead code on every path → replaced with focus handoff (Review button autofocus on close; verified focus lands on `Review` after Escape)
- [x] Unstable `onClose` re-ran the drawer effect every render → routed through ref, deps `[open]`
- [x] Held Enter could preview *and* approve in one keystroke → key-repeat guards everywhere + single autoFocus (footer Preview; Keep/Accept when no recommendation)
- [x] Two autoFocus buttons per commit / no focus in no-safe-move → single-autofocus policy
- [x] IME composition Enter submitted the custom input → `isComposing` guard
- [x] Approving a risky move hid a still-broken week behind a success toast → honesty banner: "Moved — but Wednesday is still 2h over."
- [x] A commitment due *on* the overloaded day was never flagged at-risk → same-day check first in `findAtRisk`
- [x] "Atlas — Final handoff" name embedded the client → task renamed `Final handoff`, `taskLabel()` prefixes client where context needs it
- [x] White 10px labels on the orange project measured 2.29:1 → luminance-based label color (black on light blocks, 9.18:1)
- [x] Running timer could tick past the hardcoded stopped value → tick capped at 3:12:04
