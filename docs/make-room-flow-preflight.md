# Make room — flow and edge-case preflight

> **Pre-plan research artifact.** This locks product behavior before `plan.md`. It is not an implementation plan and authorizes no code changes.

**Date:** 2026-08-18  
**Persona:** planning-oriented Freelancer with multiple active client commitments  
**W0 eligibility:** new to Toggl, not new to freelancing; has at least two dated, estimated commitments and tracks an unfinished task to its estimate within the first seven days.

---

## 1. Experience contract

The experience begins only when Toggl has evidence that a plan may be stale:

```text
task has an estimate
AND logged time >= estimate
AND task is not Done
AND the threshold was crossed by a completed/edited time entry
```

It must then do four things:

1. Establish whether future work actually remains.
2. Preserve the original estimate as historical evidence.
3. Recalculate whether dated commitments still fit.
4. Let the user preview and approve any plan change.

It must never infer that an overrun automatically caused another task to become late, manufacture remaining effort, or silently move a client commitment.

---

## 2. Recommended golden path

### Starting state

- `Homepage concepts` for Atlas Studio was estimated at `3h`.
- It is due Wednesday and currently has `3h 12m` logged.
- Its status is `In progress`.
- Thursday already contains a Northstar Labs handoff due Thursday.

### Step 1 — Trigger after the timer stops

The prompt appears after the time entry is saved, not while the timer is running and not as a blocking modal.

```text
3h estimate reached
Is Homepage concepts done?

[Mark done]  [I need more time]
Not sure yet · Review time entry
```

Why here: the timer remains fast, the actual entry is durable, and the question is asked while the user still understands the work.

### Step 2 — Confirm what remains

If the user chooses `I need more time`:

```text
How much work is left?

[30m] [1h] [2h] [Custom]

Original estimate   3h
Logged              3h 12m
Expected total      5h 12m
```

The user is answering **remaining effort**, not adding hours to the old estimate. If `3h 12m` is already logged and `2h` remains, the expected total is `5h 12m`.

### Step 3 — Explain the consequence

After `2h` is confirmed:

```text
Wednesday is now 2h over

Keeping Atlas due Wednesday leaves no slot for
Northstar handoff before its Thursday deadline.

[Make room]  [Keep current plan]
```

This language is conditional and factual. It does not claim Atlas “caused” Northstar to be late unless the calculation can show that relationship.

### Step 4 — Preview alternatives

`Make room` opens a preview, not an automatic rescheduler:

1. **Preserve both client deadlines** — move `Portfolio maintenance` (internal, no deadline) from Wednesday to Friday.
2. **Move Northstar work** — use an available Thursday morning slot before its deadline.
3. **Change a commitment** — adjust a deadline or scope manually.
4. **Keep the crunch** — accept `2h` planned overtime explicitly.

Only alternatives supported by the current data are shown. If no safe move exists, Toggl says so.

### Step 5 — Approve and recover

The selected alternative is shown on a before/after Timeline. Nothing changes until `Update plan` is clicked.

After approval:

```text
Plan updated · 2h made available before Thursday     Undo
```

Undo restores the moved work. It does **not** erase the user's confirmed remaining-effort information.

---

## 3. Critical data decision: preserve the original estimate

The original estimate must not be overwritten with `logged + remaining`.

If a `3h` estimate becomes `5h 12m`, replacing the original destroys the evidence that the task was underestimated and makes later estimate-versus-actual learning dishonest.

The experience therefore distinguishes:

| Value | Meaning |
| --- | --- |
| Original estimate | What the user originally believed or quoted |
| Logged | What has already happened |
| Remaining effort | The user's current statement of future work |
| Expected total | `logged + remaining effort` |

For the prototype, remaining effort is a new planning adjustment attached to the task. The final rationale should acknowledge that production implementation would require a model decision: persist a separate remaining-effort/forecast value or represent it through another planning primitive without mutating the original estimate.

This is not scope creep. It is the trust boundary of the concept.

---

## 4. State machine

```text
Estimate not reached
  → no prompt

Estimate reached + task open
  → decision prompt
      → Mark done
          → task Done; no future effort added
      → Need more time
          → capture remaining effort
              → plan still fits
                  → reassuring confirmation; no replan
              → conflict found
                  → consequence
                      → preview repair
                          → approve + undo available
                      → keep current plan
                          → risk remains explicit
      → Not sure yet
          → dismiss without inventing a calculation
      → Review time entry
          → correct bad attribution/duration before calculation
```

The prompt is keyed to the estimate version/threshold event. Dismissing it must not produce a prompt after every subsequent minute. It may return only after a meaningful change, such as a new time entry, estimate edit, status change, or an explicit reminder choice.

---

## 5. P0 edge cases — must shape the prototype

| Case | Required behavior | Why it matters |
| --- | --- | --- |
| Task is actually finished | `Mark done`; remove future demand; no warning | Overrun does not prove future work |
| More work remains | Ask for remaining effort; then calculate | Core path |
| User cannot estimate the remainder | `Not sure yet`; no exact risk claim | Never manufacture precision |
| Time was logged to the wrong task | `Review time entry`; recalculate only after correction | Bad actuals must not move work |
| Additional effort still fits | “Your week still fits” and remaining free time | The feature must not manufacture drama |
| No dated future commitments | Save remaining effort; explain that no deadline conflict can be calculated | Useful state without a false warning |
| More than one commitment could move | Show the contributing set and let the user choose | Commercial priority cannot be inferred safely |
| No safe alternative exists | Say “No room before Thursday”; offer manual deadline/scope review or accepted overtime | Honesty beats fake automation |
| User keeps the conflict | Preserve the updated reality and mark the risk as acknowledged | Keeping risk is a valid decision |
| Proposed move crosses a deadline | Block it by default; require explicit deadline change | Never silently break a promise |
| User undoes the repair | Restore the old schedule, retain confirmed remaining effort | The facts did not become untrue |
| Prompt repeats | Suppress until a meaningful state change | Prevent nagging and fake `Done` behavior |

---

## 6. P1 edge cases — demonstrate product depth if time allows

| Case | Behavior |
| --- | --- |
| Task has no estimate | Ineligible; do not show Make room |
| Task is already past its deadline | Use “already overdue,” not “at risk”; focus on recovery |
| Task has a daily estimate | Preserve daily allocations; add remaining effort to a chosen day or let the user place it |
| Calendar meeting occupies the only slot | Treat it as protected; do not move external events |
| Time off/public holiday reduces availability | Include it in the arithmetic and disclose it |
| Only internal work can move | Prefer it only when it lacks a protected deadline; label why it is suggested |
| Two client deadlines have equal priority | Do not recommend one client over another; ask the user |
| Task is private | Preserve masking and permissions in shared views |
| Very large overrun | Avoid dozens of options; state that no automatic safe repair exists |
| Manual estimate edit after prompt | Recalculate from the latest values; invalidate stale preview |
| Task status changes while preview is open | Invalidate preview and return to current state |
| Long names/localized durations | Truncate visually, preserve full accessible labels, use locale-aware duration copy |

---

## 7. Calculation and explanation rules

The prototype does not need a production scheduler, but its seeded result must obey explicit rules:

1. Working hours, time off, holidays and protected calendar events define available time.
2. Dated remaining task demand defines committed time.
3. Original estimates remain historical; confirmed remaining effort defines the new future demand.
4. Deadlines remain fixed unless the user explicitly changes one.
5. Work without a hard deadline is the first candidate to move, but only as a transparent suggestion.
6. When causality is ambiguous, name the overloaded period and contributing commitments—not a fabricated victim.
7. Show the arithmetic behind every consequence.

Example:

```text
Wednesday availability          8h
Existing committed work         8h
Atlas work newly remaining     +2h
Shortfall                       2h
```

---

## 8. UX hierarchy

The cold evaluator should understand the experience in this order:

1. **Fact:** `3h estimate reached`.
2. **Missing truth:** `Is this done, or is there more?`
3. **Consequence:** `Wednesday is 2h over; Northstar no longer has a slot before Thursday.`
4. **Decision:** `Make room`.
5. **Control:** preview, approve, undo.

Avoid adding dashboards, AI chat, a new navigation section, or a general planning assistant. The hero is one consequential handoff.

---

## 9. Demo path

The main demo should use one golden path and two short branches:

### Golden path

Stop Atlas timer → estimate reached → `I need more time` → `2h` → named conflict → `Make room` → preview moving internal work → approve → feasible week + Undo.

### Branch A

Choose `Mark done` → no plan change. Demonstrates that overrun alone is not treated as future demand.

### Branch B

Choose `2h`, but use a state where capacity still fits → “Your week still fits.” Demonstrates that Make room is not a generic alarm.

The evaluator does not need to see every P1 edge case. They should be implemented or documented, not paraded through the five-minute Loom.

---

## 10. Measurement hooks implied by the flow

| Event | What it answers |
| --- | --- |
| Estimate threshold reached while task open | Eligible W0 denominator |
| Prompt shown/dismissed | Is the intervention perceived as relevant or as a nag? |
| Done / more / unsure / review chosen | Was future demand actually missing? |
| Remaining effort confirmed | Did the user supply the missing planning input? |
| Conflict found | How often does the input materially change the plan? |
| Repair opened/approved | Did the user act? |
| Conflict restored to feasible before deadline | Did the experience deliver value? |
| Repair undone within 24h | Was the suggestion wrong or untrusted? |
| Meaningful return on another day in Days 2–7 | Did the eligible user return and get value in W0? |

---

## 11. Decisions to lock before `plan.md`

Recommended defaults:

1. **Remaining effort is preserved separately from the original estimate.** Do not rewrite history.
2. **The first prompt is non-blocking and appears after timer stop/save.** Do not slow capture.
3. **Plan repair moves Toggl work only and preserves deadlines by default.** Calendar events remain protected.
4. **Suggestions are deterministic and explained, not presented as autonomous AI.**
5. **The prototype builds the golden path, Mark done, still-fits, keep-risk and Undo states.** P1 cases can be documented unless they materially affect those states.

I've written the flow and edge-case model to `docs/make-room-flow-preflight.md` — does this match your mental model?
