# Research — W0 opportunity space for Toggl's two individual personas

> **Phase 1 artifact.** This is a review surface, not an implementation proposal. It separates verified product behavior, brief-supplied persona definitions, external signals, and hypotheses. No feature direction is selected here.

**Status:** ready for review  
**Updated:** 2026-08-18  
**Scope:** compare the Week-0 opportunity space for **Freelancers** and **Individual Contributors**, including measurable outcomes and what a convincing prototype could demonstrate.

## 1. Research questions

1. What does the assignment mean by each persona?
2. Which Week-0 problems are directly supported by the observed Toggl experience?
3. Which problems are plausible but still assumptions?
4. What does Toggl already solve, so the submission does not duplicate existing behavior?
5. What observable user behavior could measure value for each persona?
6. What could a cold evaluator understand from a prototype in under one minute?
7. Where is there room for a non-generic insight without drifting outside Toggl's product model?

## 2. Evidence hierarchy

Claims in this document use four evidence levels:

| Level | Meaning |
| --- | --- |
| **Verified in app** | Directly observed in the signed-in Toggl 2.0 web product and recorded in the repository. |
| **Brief-defined** | Supplied in the assignment wording by Josip. This controls persona meaning even when Toggl marketing uses broader language. |
| **External signal** | Toggl marketing/support material or user discussion. Useful for triangulation, not proof of prevalence. |
| **Hypothesis** | Plausible interpretation that still requires validation. |

Primary local evidence:

- `docs/w0-first-run.md` — virgin-account onboarding, first timer, first report, and capture-flow verification.
- `docs/product-map.md` — navigation, object model, reports, planning, capacity, and plan gates.
- `docs/ux-raw-observations.md` — 57 direct observations from the live product.
- `docs/ux-analysis.md` — adversarially checked synthesis, including corrections and limitations.
- `docs/company-research.md` — positioning, pricing ladder, and market context.
- `docs/assignment-guidance.md` — prototype bar and explicit warning against “review today / categorize logged time.”

**Correction (2026-08-18):** an earlier draft stated that the live-browser continuation failed and that no new live-app claims were introduced. That applied to one tooling attempt, not to the session overall. A live pass **did** complete and produced the verified claims now in §4.3 and §4.4 — the inline project-creation modal, the full Preferences inventory, the default-on email mechanisms, and the duration-format options. Those are verified-in-app, not inferred.

## 3. Persona definitions — keep them separate

### Freelancer

**Brief-defined:** Freelancers juggle multiple clients, projects, rates, and deadlines simultaneously and switch contexts throughout the day.

Their unit of concern is usually the **client/project portfolio**. Their time record may support invoicing, profitability, prioritization, and deciding which work is worth continuing.

### Individual Contributor

**Brief-defined:** Individual Contributors are embedded within client organizations, usually on longer-term engagements.

Their unit of concern is usually the **engagement and its boundaries**. Their problem is not necessarily choosing among clients. It is more likely to involve showing progress or value, protecting agreed scope, and making changes in client demand visible.

### Correction to the earlier research

`docs/w0-first-run.md` calls “See where time goes” the “IC/freelancer answer.” That collapses two personas the brief explicitly distinguishes. Treat that line as superseded.

Toggl's own marketing also uses “consultant” broadly and often describes consultants as juggling several clients. That language is useful market context but cannot override the assignment's narrower Individual Contributor definition. The submission should use **Freelancer** and **Individual Contributor** exactly as the brief does.

## 4. Shared Week-0 product baseline

### 4.1 Verified onboarding sequence

1. Mandatory intent selection:
   - **See where time goes** — “Log hours and spot where they really go”
   - **Plan and assign work** — “Map out tasks, then track against the plan”
   - **Keep projects on track** — “Watch progress, profitability, and capacity in one place”
2. Mandatory **Create your first project** step with one project-name field and no skip.
3. Optional Google or Outlook calendar connection.
4. Landing in Timer → List with Goals and Tasks in the right rail, a four-step checklist, and a 31-day Premium trial.

The exact downstream differences between the three intent choices remain **UNVERIFIED**. Only “See where time goes” was captured on a virgin account.

### 4.2 The verified setup-to-value discontinuity

The first-run test established all of the following:

- The user must create a project before tracking.
- The onboarding step does not ask for or attach a client.
- The created project appears under `NO CLIENT`.
- There is no default-project preference.
- The first tracked entry can remain unassigned even though a project was just created.
- In the captured report, the first entry rendered with `PROJECT: —`.

The correct conclusion is not that the mandatory project “does nothing.” It creates a valid object. The narrower conclusion is:

> Toggl guarantees that an initial project exists, but does not guarantee that the project is carried into the user's first captured data or that the first report answers the selected “See where time goes” intent.

This is a distinction between:

- **Technical activation:** a timer was started.
- **Value activation:** the resulting record answers a question the user cares about.

### 4.3 The verified inline project-creation flow

From the Timer, `+ Create a project` opens the full New Project modal:

`Name · Draft · Client · Privacy · Invite members · More options`

The flow is better than initially assumed:

- The typed timer description survives.
- The new project attaches to the pending entry.
- The picker advances to Task.
- The user does not lose or leave the capture context.

For a solo Freelancer, Privacy and Invite Members are collaboration controls with little immediate relevance. The evidence supports **persona-irrelevant modal weight**, not a broken flow.

### 4.4 Existing mechanisms that remove several tempting directions

Verified settings and product behavior already include:

- A weekday morning daily brief, enabled by default.
- A warning when a timer runs longer than eight hours, enabled by default.
- Optional Google and Outlook calendar connection during onboarding.
- Multiple duration-display formats: Classic, Improved, and Decimal.
- A behavior-verified onboarding checklist.
- Undo for deleted time entries.

Consequences for the opportunity search:

- “Bring users back with a reminder” duplicates an existing mechanism.
- “Warn about forgotten running timers” duplicates an existing mechanism.
- Duration formatting is configurable and the remaining sub-minute inconsistency is too narrow for the assignment.
- The generic “review and categorize today” direction is explicitly warned against by Toggl and remains out of bounds unless the brief demands it.

## 5. Freelancer opportunity research

### 5.1 Week-0 job

**Brief-defined:** keep an accurate, useful record while work moves among clients, projects, rates, deadlines, and non-billable responsibilities.

A new Toggl user is not necessarily new to freelancing. They may arrive on day one with several existing clients. Week 0 describes product tenure, not career tenure.

### 5.2 Product fit

Toggl already models the relevant structure:

- A Client can group multiple Projects.
- Time is associated with a Client indirectly through a Project; direct Client-to-entry association is not supported in Toggl's documented model.
- Projects can carry client, billable state, rate, fixed fee, estimate, dates, tags, and variance.
- Tasks can carry project, estimate, assignee, status, tags, and billable state.
- Reports can break time down by project and client.

Toggl's support documentation explicitly says Clients provide another level of reporting structure and that several Projects may belong to one Client. Its freelancer positioning emphasizes accurate billing and assigning time to projects/clients. These are **external signals**, consistent with the brief but not evidence of frequency.

### 5.3 Problem territories

These are research territories, not selected features.

#### F1. Setup-to-capture continuity

**Verified evidence:** The user creates a mandatory project, but the first entry can still be unattributed and Reports can show `PROJECT: —`.

**Underlying question:** Does Toggl recognize setup completion more readily than it recognizes a useful first record?

**Week-0 reach:** guaranteed exposure to project creation; actual unattributed first entry is possible but its prevalence is unknown.

**Observable value:** first entry carries useful project/client context without later correction.

**Prototype proof:** the evaluator can see the context supplied earlier survive into the first tracked result and first report.

**Risk:** automatic carry-forward can silently misattribute work. Visibility and reversibility are necessary.

#### F2. Progressive client/project structure

**Verified evidence:** Onboarding creates one project with no client. Creating another Project from the timer uses a six-field modal, although it preserves the pending entry correctly.

**Underlying question:** Can the user's real working structure become richer through actual tracking rather than a separate configuration session?

**Week-0 reach:** plausible on the first different client or non-client work context, potentially day one; frequency is **UNVERIFIED**.

**Observable value:** a second meaningful work context becomes reusable structure at capture, without duplicate objects or abandonment.

**Prototype proof:** demonstrate one initial context, the first different context, and the resulting project/client breakdown.

**Risk:** every extra decision weakens Toggl's core advantage of fast capture.

#### F3. First useful answer to “See where time goes”

**Verified evidence:** The selected intent promises an outcome, while the checklist counts Create project, Start a time entry, View reports, and Plan a time slot. The captured first report contained time but no project attribution.

**Underlying question:** What should count as successful activation: opening Reports, or reaching a report with enough structure to answer the user's selected question?

**Week-0 reach:** the checklist actively routes users to Reports in their first session.

**Observable value:** a report contains a meaningful breakdown the user can interpret or act on.

**Prototype proof:** the same first-session data changes from an undifferentiated total into a useful explanation.

**Risk:** if the intervention lives mainly in Reports, it can drift into the poisoned retrospective-cleanup pattern. Reports should prove value, not become a queue of chores.

#### F4. Billable versus non-billable visibility

**External signal:** Toggl repeatedly positions Freelancer value around missed billable time, client trust, and distinguishing billable from non-billable work. Reddit anecdotes similarly describe unpaid “small” requests and discovering low effective hourly rates only later.

**Verified product evidence:** billable state, rates, amount, fixed fee, Revenue/Cost/Profit, and profitability surfaces exist, but several are Premium-gated and were not fully exercised with populated data.

**Underlying question:** Does a new Freelancer understand early enough which captured work contributes to revenue and which work erodes it?

**Week-0 reach:** hourly client work can occur immediately; useful profitability generally requires rate and project setup.

**Observable value:** correctly marked billable time and fewer later corrections; eventual effective-rate or margin visibility.

**Prototype proof:** a small client-work scenario can show financial consequence immediately.

**Risk:** this may become invoice administration, require premium fields, or over-assume that all Freelancers bill hourly.

#### F5. Capture confidence after starting

**Verified evidence:** Starting the first timer temporarily removes the empty state before the running entry appears in the central list. Peripheral evidence remains in the top bar, sidebar, and browser title.

**Underlying question:** Is the user's first action visibly acknowledged in the surface where it occurred?

**Week-0 reach:** first-session and universal for the tested path.

**Observable value:** fewer duplicate starts, immediate recognition of running state, lower first-action abandonment.

**Prototype proof:** extremely clear before/after state.

**Risk:** this is likely a craft fix rather than the strategic product improvement the brief expects.

### 5.4 Freelancer measurement candidates

No single metric is final. Each candidate measures a different hypothesis.

| Outcome | Observable proxy | Attribution | Guardrail / failure signal |
| --- | --- | --- | --- |
| First useful record | % of “See where time goes” users whose first entry is project/client-attributed at capture and unchanged after 24h | Randomized exposure to the new experience | Time to first entry; reassignment rate |
| Structure grows in Week 0 | % of eligible users producing two meaningful work contexts by Day 7 | Cohort comparison among users who encounter a second context | Duplicate projects/clients; modal abandonment |
| Habit formation | % tracking attributed work on 3+ distinct days in first 7 | Experiment cohort and pre-period retention model | Notification unsubscribes; low-quality zero-description entries |
| Intent delivered | % reaching a report with a non-empty project/client breakdown | New flow versus control | Report opens without subsequent action; forced object creation |
| Financial usefulness | % of client time carrying a valid billable state/rate | Eligible hourly-billing segment only | Incorrect billing changes; setup completion time |

Important denominator issue: “two projects by Day 7” is not universally valuable. A Freelancer may work for only one client that week. The cleaner denominator is users who actually encounter or attempt a second context.

## 6. Individual Contributor opportunity research

### 6.1 Week-0 job

**Brief-defined:** operate effectively inside one client organization over a longer engagement while preserving boundaries, showing progress/value, and responding to changing client demand.

The central difference from the Freelancer is not importance. It is the unit of change:

- Freelancer: **Which client/project is this work for?**
- Individual Contributor: **Is this still the work and value the engagement was meant to produce?**

### 6.2 Product fit

Toggl already contains several ingredients relevant to an engagement:

- Project description, dates, milestones, alerts, estimate, fixed fee, billable state, and client.
- Tasks with estimates, dates, priorities, statuses, notes, attachments, subtasks, and allocation.
- A visible Logged / Planned / Estimate conceptual spine.
- Project-level Time status and Variance.
- Reports with Logged time and Estimated time columns.
- Project Dashboard with Revenue, Cost, Profit, and member/task breakdown.
- Timeline with planned allocations and an Unplanned tasks rail.

However, no verified object explicitly represents:

- The agreed engagement boundary or statement of work.
- The source of a new request.
- Why planned work changed.
- Which original commitment was displaced.
- A client-facing articulation of outcomes or value created.

Workspace custom fields and task notes could theoretically hold some of this, but whether they are suitable or discoverable is **UNVERIFIED**.

### 6.3 External signals

Toggl's own project-monitoring content frames scope creep as changes to scope, timeline, and budget and says status reporting should show how change requests affect those constraints. Its consultant content says fixed-price or retainer work requires early visibility before the engagement becomes unprofitable.

Reddit discussions provide anecdotal support for “one quick question” becoming several unpaid hours and for consultants discovering only later that revisions consumed a large share of a project. These discussions are illustrative, not representative research.

An important caveat: Toggl marketing often uses “consultant” to mean a multi-client operator. The assignment's Individual Contributor is narrower, so external consultant evidence must be filtered carefully.

### 6.4 Problem territories

#### I1. Engagement baseline visibility

**Verified product evidence:** Toggl has estimates, dates, milestones, project descriptions, planned work, and actual time, but the inspected first-run path does not establish an engagement promise or boundary.

**Underlying question:** What must be true before Toggl can distinguish normal work from scope drift?

**Week-0 reach:** baseline creation can happen immediately, but it adds setup and may duplicate a statement of work stored elsewhere.

**Observable value:** a user establishes a minimal, usable engagement baseline and refers to it during actual work.

**Prototype proof:** show agreed work and current work in one coherent surface.

**Risk:** creating the baseline may become heavier than the problem it solves.

#### I2. Provenance of unplanned client work

**Verified product evidence:** Timeline has an Unplanned tasks rail, but the current object model records the task, not why it appeared or what it displaced.

**External signal:** client change requests are a common mechanism of scope creep in Toggl's own content and in consultant discussions.

**Underlying question:** Can time data preserve the cause of changed work rather than only its duration?

**Week-0 reach:** the first unexpected request can occur on day one; cumulative proof of scope drift may take longer.

**Observable value:** unplanned work is connected to a request/source and its consequence becomes visible before a missed commitment.

**Prototype proof:** a planned week receives a new request and visibly exposes the trade-off.

**Risk:** asking “in scope or not?” at every capture point creates friction and political discomfort. Toggl also cannot know contract scope without a baseline.

#### I3. Early plan-versus-actual divergence

**Verified product evidence:** Logged, Planned, Estimate, Time status, Variance, Timeline allocation, and Reports already exist, but populated behavior was not fully exercised.

**Underlying question:** Does Toggl show divergence early enough to change a decision, or mainly after time has already been spent?

**Week-0 reach:** possible if the engagement begins with estimates/planned work and actuals accumulate quickly.

**Observable value:** the user notices a material divergence and adjusts scope, plan, or expectation before an overrun.

**Prototype proof:** one plan receives actual work and crosses a meaningful threshold, producing a clear decision.

**Risk:** this may duplicate existing alerts or Premium reporting; alert configuration and populated variance behavior remain partly **UNVERIFIED**.

#### I4. Evidence of value rather than activity

**Verified product evidence:** Reports emphasize hours, billable time, amount, costs, estimates, and breakdown dimensions. Tasks support descriptions and notes. No inspected surface explicitly connects time to an outcome achieved.

**Underlying question:** Can an embedded IC demonstrate contribution without equating value with hours worked?

**Week-0 reach:** outcomes or decisions can occur in the first week, but durable proof of engagement value may require longer history.

**Observable value:** captured work produces a usable progress/value narrative tied to real tasks or decisions.

**Prototype proof:** transform the same work history from an activity list into evidence of movement toward an agreed outcome.

**Risk:** vague AI summaries, additional note-taking, and overlap with status-reporting tools. “Value” is difficult to instrument directly.

#### I5. Boundary pressure inside one client

**Verified product evidence:** Timeline can show planned allocation and remaining capacity; member working hours are a capacity input. Reports and projects show estimates and actuals.

**Underlying question:** Can the IC see when incoming client demand no longer fits the engagement's available time or agreed priorities?

**Week-0 reach:** possible as soon as planned demand exceeds an agreed weekly allocation.

**Observable value:** earlier renegotiation, reprioritization, or explicit acceptance of a trade-off.

**Prototype proof:** show a new demand consuming remaining engagement capacity and the consequence for a promised item.

**Risk:** contracted capacity is not the same as engagement boundary. A capacity indicator can become a surveillance or utilization tool rather than protection for the IC.

### 6.5 Individual Contributor measurement candidates

| Outcome | Observable proxy | Attribution | Guardrail / failure signal |
| --- | --- | --- | --- |
| Baseline established | % of new ICs who create a minimal engagement baseline and use it in a later action | Eligible IC cohort exposed versus control | Setup abandonment; time to first track |
| Scope change made visible | % of new/unplanned requests linked to a source or affected commitment before work completes | Event-level experiment | False “out of scope” classification; capture friction |
| Earlier intervention | Median time from material plan/actual divergence to plan, estimate, or priority adjustment | Cohort comparison against historical behavior | Excessive plan churn; ignored signals |
| Boundary protection | % of over-capacity weeks with an explicit reprioritization before the deadline | Eligible users with a declared allocation | Users simply increase planned hours; no real client action |
| Value communication | % of generated progress evidence edited/shared/exported or used in a status workflow | New experience versus control | Generic output; editing burden; low share rate |
| W0 retention | % tracking or planning meaningful engagement work on 3+ days in first 7 | Persona-qualified experiment | More administrative actions without more retained use |

The IC has a harder measurement problem than the Freelancer. “Protected scope” and “proved value” are outcomes outside Toggl. In-product proxies must be labelled as leading indicators, not proof of business impact.

#### I6. Untracked collaboration time (meetings)

**Merged in from `docs/persona-comparison.md`. This territory was absent from the earlier draft and is the IC's most Week-0-native and most demonstrable option — but it carries a disqualifying risk, stated below.**

**Brief-defined:** "untracked collaboration time" is named explicitly as an IC challenge. For someone embedded in a client organisation, meetings *are* a large share of the work — client calls, standups, reviews.

**Verified in app:** the Timer calendar renders a **fake ghost meeting** — `MEETING? / Connect calendar →` — positioned on a real working-day slot (obs 6). Toggl is using a simulated meeting as an advertisement in precisely the place a real meeting would appear.

**Week-0 reach:** high. Meetings occur in week one by definition for an embedded contractor. No accumulated history required.

**Observable value:** meeting time enters the record without the user having to remember to start a timer during or after a call.

**Prototype proof:** strong. The calendar surface already has the slot; mock events render immediately and read in one glance without narration.

**⚠️ Disqualifying risk — this likely duplicates a shipped feature.** Onboarding step 3 states: *"Connect your calendar and your meetings and events are ready to track."* That is close to a description of the capability itself. Building "turn meetings into tracked time" may therefore rebuild something Toggl already ships — the same failure mode that rules out F3/reminders in §4.4.

**Remaining non-duplicative angle:** the *discoverability and placement* of the mechanism — it is offered once, last, is the only skippable onboarding step, and is never re-offered. That is a thinner, more placement-oriented problem than a product-experience improvement.

**Status: UNVERIFIED.** Calendar connect was never completed (it requires an OAuth grant on a real account). Until someone completes it and observes what it actually produces, this territory cannot be responsibly selected.

## 6.6 Buildability and cold-read scoring

The earlier draft scored territories on evidence and Week-0 reach but not on whether they can be **built in roughly six hours** or **understood cold in sixty seconds** — both hard constraints of the assignment. Added here.

| Territory | Cold read (60s, no narration) | Build in ~6h, frontend only | Duplicates existing feature? |
| --- | --- | --- | --- |
| **F1** Setup-to-capture continuity | Good — needs one beat of setup context | Good | No |
| **F2** Progressive structure | Good | Good | No |
| **F3** First useful answer to intent | Strong — before/after report is vivid | Good | Partly (Reports exist) |
| **F4** Billable visibility | Medium — needs rates configured | Medium — Premium fields | No |
| **F5** Capture confidence | Weak — too small to be the submission | Trivial | No |
| **I1** Engagement baseline | Medium — requires explaining a new object | Heavy — new object model | No |
| **I2** Provenance of unplanned work | Strong — plan, request, consequence | Medium | No |
| **I3** Early divergence | Medium | Medium | Partly (alerts/variance exist) |
| **I4** Evidence of value | Weak — risks vague AI summary | Medium | No |
| **I5** Boundary pressure | Medium | Heavy — capacity model | Partly (Timeline exists) |
| **I6** Meetings | **Strongest** | **Strongest** | **Likely yes — disqualifying** |

Two conclusions follow:

1. **The most demonstrable IC territory (I6) is also the most likely to duplicate shipped functionality.** The IC's remaining territories (I1, I2, I5) all require an engagement baseline that does not exist in the product and would have to be introduced — which adds setup, the opposite of what a Week-0 intervention should do.
2. **F1/F3 are the only territories that combine verified firsthand evidence, Week-0 universality, no duplication, and six-hour buildability.** They are also closely related: F1 is the mechanism, F3 is the payoff.

## 7. Comparative findings

This table describes the evidence, not a final choice.

| Dimension | Freelancer | Individual Contributor |
| --- | --- | --- |
| Brief behavior | Multiple clients/projects and frequent switching | One longer client engagement and changing internal demand |
| Strongest verified W0 evidence | Mandatory project → no client → first entry can remain unattributed → first report can show `—` | Existing plan/estimate/actual/unplanned machinery, but no verified first-run engagement baseline |
| First plausible value moment | First attributed entry or first different work context | First unexpected request or first material plan divergence |
| Directness of evidence | High | Medium-low |
| Week-0 reachability | High if the user arrives with active clients; first-entry gap is immediate | Possible on day one, but useful interpretation usually requires a baseline |
| Measurability | Strong behavioral proxies around attribution and repeat tracking | Strong interaction proxies, weaker proof of real scope/value outcomes |
| Cold-demo clarity | High: setup → entry → useful breakdown | Potentially high: agreed work → new request → visible consequence |
| Originality ceiling | Medium-high if focused on setup/value continuity; low if it becomes categorization | High around causality of scope change, not just hours |
| Main product risk | Added capture friction or silent misattribution | Added setup, political classification, or project-management bloat |
| Main evidence risk | One test account does not establish prevalence | Core pain is plausible but not observed firsthand in this account |
| Monetization connection | Individual tracking and eventual billable/profitability value | Premium estimate/actual, planning, and financial intelligence |

## 8. What a convincing prototype must showcase

The assignment says the prototype is opened cold and its value must be clear within one minute. Regardless of persona, a demonstrable research territory needs five visible beats:

1. **Recognizable starting state** inside an existing Toggl surface.
2. **Persona-specific trigger** that occurs in Week 0.
3. **One consequential decision**, not a feature tour.
4. **Visible payoff in the same flow**, without relying on narration.
5. **One edge or reversal** proving the experience is controlled rather than magical.

### Freelancer showcase test

Can the evaluator see how a new user's first work data becomes meaningfully attributable without a separate cleanup ritual—and understand why the first report is now more useful?

### Individual Contributor showcase test

Can the evaluator see how a new client request changes an existing engagement commitment—and understand the trade-off before the original commitment silently slips?

If either story needs several dashboards, a settings explanation, or historical data spanning months, it is too broad for this assignment.

## 9. Measurement framework required in the rationale

Every final metric should include:

- **Baseline:** current behavior or an explicitly labelled assumption.
- **Target:** the threshold that would count as meaningful improvement.
- **Attribution:** experiment or comparison method.
- **Trade-off:** the behavior likely to worsen.
- **Decision rule:** scale, iterate, or kill.

Illustrative numbers should be labelled as assumptions. A precise invented baseline is less credible than saying it would be measured during an initial instrumentation period.

For both personas, retention should remain an outcome metric rather than the only metric. The chosen feature needs a nearer behavioral signal explaining *why* retention might change.

## 10. Claims we should not make

- “The user has to leave the timer to create a project.” **False:** the modal preserves and advances the pending capture flow.
- “The mandatory onboarding project produces nothing.” **Overstated:** it creates a valid object, but the handoff to capture is not guaranteed.
- “Every Week-0 user has only one project.” **False:** onboarding starts them with one; they can add others.
- “The selected intent is never fulfilled by Day 7.” **Unverified:** the current onboarding does not guarantee it.
- “Individual Contributors require team collaboration features.” **Not supported by the brief.** They are individuals embedded in a client organization.
- “Scope creep is automatically measurable from time.” **False:** time shows effort; distinguishing scope change requires an agreed baseline and causality.
- “Two projects by Day 7 is inherently better.” **False:** it only matters for users who encounter a second context.
- “Trustworthy record” is a metric. **False:** it needs a proxy such as unchanged attribution, correction rate, or downstream use.

## 11. Open evidence gaps before planning

1. Exact assignment-brief text should be saved locally so persona wording and submission requirements are not reconstructed from chat.
2. Whether the three onboarding intents produce different downstream experiences.
3. Whether the onboarding-created project can be deliberately preselected through any path not found in Preferences.
4. Populated project Time status and Variance behavior.
5. Existing alert behavior for estimate/budget thresholds.
6. Whether Unplanned tasks preserve any provenance or relation to displaced planned work.
7. How custom fields and required fields behave for a solo user.
8. Whether a useful client breakdown is available on the Free plan after the trial.
9. Whether users who choose “See where time goes” actually represent the brief's Freelancer segment.
10. Firsthand qualitative evidence from a real embedded Individual Contributor using Toggl 2.0.

## 12. Research interpretation for review

The evidence currently supports two distinct opportunity narratives:

- **Freelancer:** the first-run experience creates structure but does not reliably connect it to the first data or first insight. The strongest evidence is firsthand and Week-0-native.
- **Individual Contributor:** Toggl records planned and actual effort but does not visibly preserve why client demand changed or what commitment was displaced. The originality ceiling is higher, but the causal baseline and first-run evidence are weaker.

The comparison should therefore not be “safe idea versus bold idea.” It is a trade-off between **evidence strength** and **novelty potential**, plus whether the IC's baseline can be made credible without adding setup or inventing a problem the product evidence did not reveal.

## External sources consulted

- [Toggl: Managing Clients](https://support.toggl.com/managing-clients)
- [Toggl: How to track time for a client](https://support.toggl.com/how-to-track-time-for-a-client)
- [Toggl: Freelance time tracking](https://toggl.com/track/freelance-time-tracking/)
- [Toggl: Project management tools for consultants](https://toggl.com/blog/consultant-project-management-software)
- [Toggl: Project monitoring — scope, time and budget](https://toggl.com/blog/project-monitoring)
- [Toggl: How to track billable hours](https://toggl.com/blog/how-to-track-billable-hours)
- [Reddit discussion: scope creep and consultant boundaries](https://www.reddit.com/r/consulting/comments/1qax8u0/anyone_else_struggling_with_scope_creep_lately_or/)
- [Reddit discussion: independent consultants and project time](https://www.reddit.com/r/consulting/comments/1rew6ez/independent_consultants_how_are_you_tracking_your/)

External sources supply language and anecdotes, not representative prevalence estimates.

I've written my understanding to research.md — does this match your mental model?
