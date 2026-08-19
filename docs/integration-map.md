# Integration map — what Make room plugs into

**Verified live on the trial account, 2026-08-18.** Checked *before* building the integration surfaces, so the prototype reflects the real product rather than an assumed one.

---

## 1. Where the capacity number actually comes from

Make room's whole argument rests on "your Wednesday is 2h over." That number has four inputs, and I checked each:

| Input | Where it lives | State on a fresh account | Bearing on Make room |
| --- | --- | --- | --- |
| **Working hours** | `Members` table, per-member column | **`-` — unset.** Yet the Workload report still reported `40h/week` and `Work hours 40h` | **The capacity we reason about is an unset default.** |
| **Time off** | `Members` column (`0 days taken / 0 days booked`) + sidebar section | **Paid add-on — $2/user/month**, marketed as *"Time off that powers capacity planning… approved leave automatically reflected in team capacity"* | Reduces available capacity; gated behind a second purchase |
| **Calendar events** | Onboarding step 3, skippable; documented as a Timeline capacity input | Never connected on this account | Meetings consume capacity invisibly if unconnected |
| **Dated task estimates** | Task drawer `Estimate` + `Dates` | Present, optional, default `0h` | The demand side of the equation |

### Build vs. already-there — the precise split

| | Exists today | Verified how |
| --- | --- | --- |
| A weekly capacity **number** | ✅ Yes | Timeline lane reads `40h free`; `Capacity: This week` filter; Workload reports `Work hours 40h` |
| A place to **store** working hours | ✅ Yes | `Members` table has a `WORKING HOURS` column — but it ships **unset** |
| **Asking** the user for it | ❌ No | Onboarding is three steps: intent, project, calendar. Capacity is never requested. |
| A **warning** when commitments exceed it | ❌ No | Nothing fires. The number is displayed, never enforced. |
| A way to **act** on it | ❌ No | No resolution path of any kind |

**So we are not building the capacity engine — it exists.** We build the ask, the warning, and the resolution.

**One distinction worth being precise about:** Workload's `Remaining hours` is `40h − logged so far` — *how much of your week is still unfilled*. That is a **backward-looking** figure. Make room compares `40h` against **what you have committed** — a forward-looking one. Same units, opposite direction, and only the second can tell you a week is over before it starts.

### The finding that matters

> **A freelancer's capacity is a default nobody set.** Working hours reads `-` on the only member of the workspace, and the product still asserts a 40h week.

For a freelancer who works 6-hour days, a 4-day week, or around school pickup, every "you're 2h over" is wrong by construction. That is precisely the *"capacity calculation is distrusted"* kill criterion from `plan-reality-check-deep-research.md` §11 — and it is reachable on day one, not hypothetically.

**Design consequence, now built:** Make room never states a capacity figure without naming its source, and offers to correct it inline. A number you can see the provenance of is a number you can trust; an unexplained one gets dismissed once and ignored forever.

---

## 2. Mobile — settled, and not by us

While inspecting the members page, Toggl 2.0 rendered its own gate:

> **"Toggl 2.0 works better on bigger screens."**
> *"Toggl 2.0 is still in the early stages, so for now, we recommend using it on a larger screen for the smoothest experience."*

Verified: the element exists in the DOM at 1703px wide with a zero-size bounding box — rendered but hidden above the breakpoint, shown below it. This is the same hidden small-screen warning recorded in `accessibility-audit.md` §2.

**So Toggl 2.0 web is explicitly desktop-first, by its own admission.** That settles three things:

1. A desktop-only prototype is **faithful**, not a shortcut. Building a responsive Toggl 2.0 would diverge from the product.
2. The honest mobile answer is a **split**: the *ask* ("done, or more time?") is perfectly suited to a phone — it's one tap and it's where timers actually get stopped. The *replan* (a week grid, trade-offs, preview) is desktop work.
3. Our prototype should **mirror Toggl's own behaviour** below the breakpoint rather than invent a mobile layout — and say why.

---

## 3. Feature adjacencies — what Make room must not duplicate

| Existing feature | Verified state | Relationship |
| --- | --- | --- |
| Task estimate + variance | Task drawer: `Logged / Planned / Estimate`, `1h 14s over estimate` | **Our trigger.** Never rebuild it. |
| Timeline capacity | `+12h` in `text-error`, `20h free` lane header | **Our consequence surface.** We add the naming and the decision. |
| Workload report | `Remaining hours`, `Overtime`, team-framed, Premium | **Closest neighbour.** Passive, retrospective, manager-shaped — never triggered, never names a deadline. |
| Project Dashboard | `Actual vs estimated` burn-up, single project | Adjacent, not overlapping — one project, no cross-client view |
| Project alerts | Two types only: `Time estimate %`, `Fixed fee budget %`, by email | A budget-threshold email. Blind to other clients and to capacity. |
| Scheduler (beta) | Not enabled in-workspace; documented as not supporting tracked time | The action half — we simulate it, and say so |
| Time off | $2/user/mo add-on, feeds capacity | Capacity input, second paywall |

---

## 4. What this changes in the build

1. **Cite the capacity source** wherever a capacity claim is made, with an inline correction path.
2. **Mirror Toggl's small-screen behaviour** instead of inventing a mobile layout, and explain the ask/replan split.
3. **Solve eligibility in onboarding, not by assumption.** The research named "does the W0 user have dated, estimated work?" as the primary business risk. The product answer is to *ask for it during setup, framed by what it buys them in week one* — which is what the onboarding tip now does.
