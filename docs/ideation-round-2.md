# Ideation round 2 — both personas, W0-constrained

**Written after nine eliminations.** Round 1 hunted for missing capability and found almost none. This round starts from a different question.

**Date:** 2026-08-18

---

## 0. What changed in how I'm thinking

Round 1 asked: *what is Toggl missing?* Answer, nine times over: **almost nothing.** Client goals, Focus mode, Pomodoro, inline capture syntax, activity tracking, calendar sync, plan-tomorrow prompts, daily-brief emails, undo, keyboard layer — all shipped, all working.

So the productive question is not what's missing. It's:

> **Why does a new freelancer's first week fail to assemble any of it?**

And the answer the evidence keeps giving is **setup debt**:

Toggl asks for exactly **three things** during onboarding — intent, a project name, an optional calendar. Then it **never asks for anything again.**

But almost everything that makes Toggl valuable is optional and unprompted:

| Unlocks | Asked for? |
| --- | --- |
| Client — reports by client, client goals | **Never** |
| Estimate — variance, forecasting, the Premium hook | **Never** |
| Billable + rate — the money question | **Never** |
| Goal — the return loop, the `ON PACE` card | **Never** |
| Capture surface (extension/desktop/calendar) | Once, last, skippable |

A week-one user therefore ends the week with a pile of durations and no answers — not because Toggl can't answer, but because it never collected what it needed.

**That reframing generates different ideas than "find the bug".**

---

## 1. W0 retention mechanics — what actually makes someone come back

Useful to name explicitly, because every idea should attach to one:

| Mechanism | Toggl today |
| --- | --- |
| **External cue** | ✅ Daily brief email, weekday mornings, on by default |
| **Open loop** (unfinished thing) | ⚠️ Goals do this — if you find them and scope them |
| **Accumulating payoff** | ❌ Needs data *and* structure; structure never collected |
| **A question only this tool answers** | ❌ Blocked by the same gap |
| **Habit trigger in-app** | ❌ No daily start/end moment inside the product |

The cue exists. **What's missing is something worth returning to.**

---

## 2. Freelancer ideas

### F1 · The estimate Toggl never asks for ⭐ NEW

**Verified:** the task drawer defaults `Estimate: 0h`. Nothing ever prompts for it. Yet `ESTIMATED TIME` is a first-class Reports column, `VARIANCE` is a Projects column, and **"time actuals vs. estimates" is the headline Premium ($16/seat) feature.**

> **Toggl sells estimate-versus-actual as its paid tier. It never once asks you for an estimate.**

**Why it's freelancer-native:** quoting *is* the job. "How long will this take?" is asked before every piece of client work, and being wrong costs real money on fixed-price jobs.

**W0 loop:** estimate on day 1 → work it → **day 2–3 you learn whether you were right.** Genuinely reachable in week one, and the payoff is a fact about *you*, not a chart.

**Return driver:** an open loop with a personal answer. "Was I right?" is more compelling than "did I log hours?"

**Business:** feeds the Premium gate directly — arguably the strongest monetisation argument of any idea here.

### F2 · The money question is unanswerable in week one

Billable is a per-entry toggle defaulting off; rates are Starter-tier. A freelancer finishes week one unable to answer *"what did I earn?"* — the question they actually care about.

**Risk:** rates are plan-gated, so the answer may legitimately belong behind a paywall. Weaker for that reason.

### F3 · No daily bookend inside the app ⭐ NEW

Toggl's daily brief arrives by **email**. Open the app itself and there's no "here's today" — just a grid.

For someone juggling four clients, the morning question is *"who needs me today?"* and that has no home in the product. The Goals rail is the closest thing, and it's behind an unlabelled toggle.

**Careful:** an end-of-day version drifts straight into the poisoned "review today" territory. **Morning only.**

### F4 · Make room *(carried from round 1 — still open)*

Urgent client work lands on a full day; Toggl shows you're over and what's already there before you commit.

**Still the only fully unfalsified direction.** One gate untested: does Timeline already flag over-capacity?

### F5 · Attention inside tracked work *(blocked)*

Timer knows intent, desktop activity knows where attention went, nothing joins them. **Strongest insight, unbuildable tonight** — needs the desktop app, two days of data to verify, and can't run in a browser.

---

## 3. Individual Contributor ideas

### I1 · Toggl isn't where the IC works, and W0 never fixes it

An embedded contractor lives in the client's Jira/Slack/Figma. Toggl's answers — browser extension (100+ tools), desktop app, calendar sync — are respectively: not mentioned in onboarding, a sidebar footer link, and one skippable final step.

**The single biggest reason an embedded IC stops tracking is "I wasn't in Toggl", and week one never addresses it.**

**Weakness:** the honest fix may be "surface the extension earlier", which is placement, not product.

### I2 · Nothing helps an IC show what they did ⭐ NEW

The brief names *"keeping a clear record of what work was done, for whom, and why it mattered."* Toggl records duration, project, task, tags — nothing about **outcome**. An IC proving value to a client has hours, and hours aren't value.

**Weakness:** payoff is monthly, not weekly. Hard W0 fit. And "add a notes field" is a poor demo.

### I3 · Scope creep / provenance of unplanned work

Timeline has an *Unplanned tasks* rail that records the task but not why it appeared or what it displaced.

**Weakness:** needs an engagement baseline that doesn't exist — adds setup, which is the opposite of a W0 intervention.

---

## 4. Cross-persona ideas

### C1 · The checklist rewards clicks, not value ⭐ NEW

**Verified:** `View your reports` completes the moment you *navigate* — `onboarding-v2-reports-viewed-seen` flips on page load, even when the report shown is empty or shows `PROJECT: —`.

All four items are "did you click this once": create a project · start a timer · view reports · plan a time slot. **You can complete 4/4 and have a record that answers nothing.**

> **Toggl's activation checklist measures whether you touched the product, not whether the product did anything for you.**

That's a genuinely sharp observation about how a company defines activation — a very Senior-PM-shaped finding. And it reframes every other idea here: the checklist is the natural place to ask for the things that are never asked for.

### C2 · Onboarding intent may be cosmetic — **UNVERIFIED, cheap to test**

Onboarding promises *"We'll tailor your first experience."* We only ever tested **"See where time goes."** If all three intents produce an identical experience, the personalisation promise is empty — and that's a strong, verifiable finding.

**Cost to check: one more free account, ~10 minutes.** Highest evidence-per-minute of anything left on the table.

---

## 5. Scoring

| Idea | W0 fit | Evidence | Not-duplicate | Buildable | Distinct insight |
| --- | --- | --- | --- | --- | --- |
| **F1 Estimate never asked** | **Strong** | **Strong** | **Yes** | **Yes** | **Strong** |
| **C1 Checklist measures clicks** | **Strong** | **Strong** | **Yes** | **Yes** | **Strong** |
| F4 Make room | Medium | Medium | **Untested** | Yes | Strong |
| F3 Daily bookend | Strong | Medium | Partial (email exists) | Yes | Medium |
| C2 Intent cosmetic | Strong | **Untested** | Yes | Yes | Strong if true |
| I1 Not where IC works | Strong | Strong | Partial | Weak demo | Medium |
| F2 Money question | Medium | Strong | Yes | Plan-gated | Medium |
| F5 Attention | Strong | Medium | **Untested** | **No** | Strongest |
| I2 Show value | Weak | Medium | Yes | Weak demo | Medium |
| I3 Scope creep | Weak | Medium | Yes | Heavy | Strong |

---

## 6. Recommendation

**Lead: F1 + C1 together.** They are the same insight seen from two ends, and they reinforce rather than dilute:

> Toggl counts you as activated when you click four things. It never asks for the one input — an estimate — that its own paid tier is built on. So a week-one freelancer finishes with hours and no answers, and Toggl records that as success.

**The build:** week one asks *"how long do you think this will take?"* at the moment a task is created, then closes the loop when the work is done — *"you thought 3h, it took 4h 20m."* Activation stops meaning *clicked four things* and starts meaning *learned something about your own work*.

- **W0-native:** estimate day 1, answer by day 2–3
- **Freelancer-native:** quoting is the job; being wrong costs money
- **Return driver:** an open loop with a personal answer
- **Business:** feeds the $16/seat Premium hook directly
- **Not duplicating:** the fields exist; the *asking* does not
- **Cold-readable:** "3h estimated → 4h 20m actual" needs no narration
- **Not the poisoned direction:** forward-looking, not retrospective cleanup

**Backup:** F4 (Make room), pending its over-capacity gate.

**Do first, 10 minutes:** C2 — a second free account choosing *"Plan and assign work"*. If the three intents are cosmetic, that's a headline finding for whatever we build.

---

## 7. What would kill F1

Stated up front so it can be tested rather than discovered late:

- Freelancers who **don't estimate at all** — then asking is friction with no payoff
- If a task's estimate **is** already prompted somewhere we haven't looked
- If variance is **Premium-gated** so a free user never sees the payoff *(needs checking — `ESTIMATED TIME` appeared unstarred in Reports, but `VARIANCE` sits on the Projects table which had a ★ on Tags)*
- If the answer *"you were wrong by 40%"* feels like judgement rather than insight — the same guilt trap that sinks productivity scoring
