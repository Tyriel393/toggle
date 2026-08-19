# Measurement plan — Make room

**What this fixes.** The prototype currently shows a funnel that reads `1 · 100%` at every step, because it is measuring one person's session. That is a mechanism view wearing a metrics costume. This is the actual plan: what we would measure, in what order, and what each answer would make us do.

---

## 0. The one-line version

> **North star:** among eligible new freelancers, the share who track or plan on **3+ distinct days in their first 7**.
>
> Everything else on this page is either a precondition for that, a mechanism underneath it, or a guardrail against buying it at too high a price.

Deliberately *not* the north star: prompts shown, Make room opens, moves approved. Those are things the feature does to people. The north star is something people do.

---

## 1. Answer eligibility **before building anything**

Our biggest risk is not whether the experience works. It is **how many week-one freelancers ever reach the trigger** — it needs an unfinished task, with an estimate, that runs past it.

This does not need an experiment. It is a query against data Toggl already has:

```
Of freelancer-shaped workspaces (1 member, ≥2 clients) created in the last 6 months:
  what % had, within 7 days of signup —
    ≥2 tasks with both a due date and a non-zero estimate      → the plan exists
    ≥1 of those tasks with logged time exceeding its estimate  → the trigger fires
    … and while still not marked done                          → the question is real
```

**Set the go/no-go line before running it.** The discipline is agreeing a threshold in advance, so the
result cannot be rationalised afterwards — not the specific number, which should come from whoever
knows Toggl's own baselines for feature adoption.

Three outcomes worth planning for:

- **Common enough** — build as scoped; the moment recurs often enough to earn a surface.
- **Marginal** — build, but the onboarding step that asks for dates and estimates becomes the
  primary work rather than a supporting one, because eligibility is the thing to move.
- **Rare** — **do not build this.** The finding is worth more than the feature: week-one
  freelancers are not planning at all, which is a bigger and more useful problem than the one Make
  room solves.

I have not put percentages on those bands, because I have no access to Toggl's data and a number
that merely looked measured would be worse than admitting that.

---

## 2. The measurement stack

Five layers, each answering a different question. A metric that cannot change a decision is not on this list.

### Layer 1 — Precondition (does the moment exist?)

| Metric | Why |
| --- | --- |
| % of W0 freelancers with ≥2 dated, estimated commitments | The eligible denominator for everything below |
| % of those who reach a live overrun in week one | How often the trigger actually fires |

### Layer 2 — Mechanism (does the flow hold together?)

The funnel, per eligible user:

```
estimate_prompt_shown
   └─► remaining_confirmed        ← the only step that requires belief
         └─► conflict_detected     ← product logic, not user behaviour
               └─► make_room_opened
                     └─► move_previewed
                           └─► move_approved
```

The load-bearing step is **remaining_confirmed**. If people will not answer "how much is left?", nothing downstream can happen — and the answer cannot be inferred.

Break it down by choice, because the mix is diagnostic:

| Choice | What a high share means |
| --- | --- |
| `Done` | Estimates are roughly right, or the prompt is being dismissed. Cross-check against whether the task is later reopened. |
| `30m / 1h / 2h / custom` | Working as intended |
| `wrong task` | We surfaced a data-quality problem — valuable, but a different feature |
| `not sure` | The question is being asked too early, or is too hard to answer |

### Layer 3 — Value (did it actually help?)

| Metric | Definition |
| --- | --- |
| **Conflict resolution rate** | % of detected conflicts returned to a feasible plan **before the deadline they threatened** |
| **Repair durability** | % of approved moves still in place after 24h |
| **Lateness avoided** | % of dated commitments delivered on/before their date, exposed vs. control |

Resolution rate is the one to lead with: it measures *help*, not engagement. A user who opens Make room, looks, and closes it has engaged and not been helped.

### Layer 3b — Three metrics worth watching beyond the funnel

Two of these Toggl can compute from data it already holds — worth baselining **before** building anything. The third needs the plan-repair log this feature would create.

| Metric | Definition | Why it matters |
| --- | --- | --- |
| **Replan lead time** *(needs new log)* | Days between a conflict being detected and the deadline it threatened | **The single best proxy for the whole pitch.** The value is not that we warned — it is that we warned *early*. Monday-detection and Thursday-detection are different products. If the median is under a day, we are a late-warning system and the concept has failed on its own terms. |
| **Weekly over-commitment rate** *(computable today)* | % of freelancer weeks planned above capacity | Measurable **today, before building anything** — it sizes the Day-1 problem the same way the eligibility query sizes the Day-3 one. It is also the baseline the feature would move. |
| **Estimate calibration trend** *(computable today)* | Per-client variance (`expected ÷ original estimate`) over successive weeks | Does the user get *better at quoting*? This is the compounding value and the reason the original estimate is never overwritten. A flat trend means we are surfacing pain without teaching anything. |

Three more that fall out for free, useful as diagnostics rather than headlines:

- **Remaining-effort accuracy** — when someone says "2h left", how long does it actually take? Second-order estimate learning, and a check on whether the answers we collect are worth trusting.
- **Resolution mix** — move vs. overtime vs. renegotiate. If overtime dominates, we built a guilt machine; if renegotiate is ever chosen, we have touched the client relationship, which is a different and larger product claim.
- **Plan volatility after Monday** — how much the week changes once set. High volatility means the Monday decision is not sticking, and the Day-1 surface is theatre.

### Layer 4 — Outcome (the north star)

**Primary:** % of eligible W0 freelancers tracking or planning on ≥3 distinct days in days 1–7.
**Comparison:** matched eligible control, randomised at signup.
**Secondary:** week-2 retention among the same cohort — because a week-one bump that does not survive is a novelty effect.

### Layer 5 — Counter-metrics (what might we be breaking?)

This is the layer most likely to be skipped and the one I would look at first.

| Guardrail | The risk it catches |
| --- | --- |
| **Tracked hours per active user, exposed vs. control** | **The existential one.** We are adding a question at timer-stop. If that makes people track less, the feature is net-negative for Toggl no matter how well it performs on its own funnel. |
| Time from stop → prompt dismissed | Friction added to the most-used interaction in the product |
| `Done` rate on tasks later reopened | "Done" being used to silence the prompt |
| Moves undone within 24h | We are proposing changes people regret |
| Planned overtime accepted | We are teaching people to absorb overrun rather than replan — the opposite of the intent |
| Capacity corrections after a warning | Our arithmetic is not trusted (likely, given working hours defaults to 40h and is usually unset) |

---

## 3. Kill criteria

Stated as directions, not invented numbers — there is no baseline yet, and inventing one would be worse than admitting that.

| Kill if | Because |
| --- | --- |
| The eligible cohort is too small to justify a dedicated surface | The moment is too rare to justify the surface |
| `remaining_confirmed` is dominated by `Done` on tasks later reopened | People are dismissing, not answering |
| Tracked hours drop materially in the exposed group | We damaged the core product to serve a feature |
| Conflict resolution rate is flat vs. control | People see the collision and do nothing — the warning is noise |
| No W0 return lift among eligible exposed users | The retention thesis is wrong, which is the entire premise |

---

## 4. Experiment design

- **Unit:** workspace, randomised at signup. Not user — a freelancer workspace is one person, and randomising per-session would contaminate the week-one story.
- **Population:** freelancer-shaped workspaces only (1 member). Team workspaces have a different capacity model and their own manager-facing surfaces.
- **Exposure:** the whole flow, including the onboarding step that asks for dates and estimates. Splitting them would be cleaner science and would not answer the question we care about — those steps only work together.
- **Duration:** minimum 3 weeks — one week for the W0 window, two more so week-2 retention is observable.
- **Analysis gate:** report on eligibility **first**, before touching outcome metrics. If eligibility is tiny, the outcome numbers are noise regardless of what they say.

---

## 5. What success unlocks (the business case)

- **Free → Premium:** capacity intelligence is already Premium (Timeline, Workload — both verified ★). The ask is free; the consequence and repair are the paid moment, arriving when the pain is felt rather than on a pricing page.
- **Data quality compounding:** every confirmed remainder makes estimates, capacity, forecasting, and the Scheduler more accurate. That is the durable asset, and it is worth more than the feature.
- **The strategic line:** Toggl says Track answered *"how much time did this take?"* and 2.0 should answer *"do we have capacity?"* and *"what's the right call?"* — Make room is that promise, for one person.

---

## 6. What I would ship first

1. **Week 0 — the query.** Size eligibility. It may end the project, cheaply.
2. **Week 1–2 — the ask alone.** Ship the prompt with no consequence and no replan. Measures whether people will answer, and starts collecting remaining-effort data with zero risk to the plan.
3. **Week 3+ — consequence and repair,** to the segment where the data now exists.

Shipping in that order means the riskiest assumption is tested first and the expensive part is built last.
