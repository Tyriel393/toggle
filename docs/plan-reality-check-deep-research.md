# Deep research — Plan Reality Check / “Make room”

> **Research-phase artifact.** This document pressure-tests the proposed Freelancer opportunity. It is not an implementation plan and does not authorize code changes.

**Date:** 2026-08-18  
**Hard constraint:** the experience must create value and support a return within the first seven days after signup.  
**Concept under test:** connect task-level actual-versus-estimate divergence to the personal commitments and capacity it changes, then help the Freelancer make a deliberate trade-off.

---

## 0. Executive verdict

The opportunity **survives**, but the original causal statement was too strong.

This is not safe:

> “A task ran 1h 14m over estimate, therefore Atlas is now at risk.”

An overrun is historical. If the task is finished, it may require no future capacity. If the task remains unfinished, Toggl does not currently store a separate user-entered **remaining-effort estimate**. The product therefore cannot reliably infer how much future work needs to move from the overrun alone.

The defensible opportunity is:

> **When tracked reality shows that an unfinished task’s plan is stale, help the Freelancer confirm what remains, reveal whether the updated plan still fits before their client deadlines, and make room without silently moving a promise.**

This is stronger than a generic capacity warning because Toggl already ships the relevant components:

1. Task-level logged-versus-estimate variance.
2. Timeline capacity based on dated estimates and availability.
3. Project-level forecasting from current logging patterns.
4. A beta Scheduler that can move and reorganize tasks.

The non-obvious seam is that these capabilities do not form one individual workflow. Most importantly, Toggl documents that the Scheduler **does not support tracked time or past entries**, while Timeline capacity is calculated from estimates rather than actual logged time.

The opportunity is therefore not “invent a warning” or “invent rescheduling.” It is to connect **actual drift → confirmed remaining work → cross-client capacity consequence → user-approved plan repair**.

---

## 1. The exact research question

The original proposition was:

> Toggl already tells Freelancers when a task exceeded its estimate. The improvement is showing what that overrun now puts at risk and helping them replan before breaking another client commitment.

This contains four independent assumptions:

| Assumption | Status |
| --- | --- |
| Toggl exposes task overruns | **VERIFIED** |
| Toggl exposes over-capacity | **VERIFIED** |
| The two are joined into a downstream commitment-risk experience | **No evidence found; surviving seam** |
| An overrun alone proves another commitment is at risk | **FALSE / unsafe inference** |

The final item changes the product logic materially. Actual time can establish that the original estimate was wrong; it cannot establish future remaining effort without another signal.

---

## 2. What Toggl already does

### 2.1 Task variance is already good

Live testing on the trial account established:

- Estimate is the third field in the New task drawer.
- A task with `1h` estimated and `2h 14s` logged renders `1h 14s over estimate` in a coral treatment.
- An under-estimate state shows percentage progress and time left.
- Logged, Planned, and Estimate are presented together.
- Estimate does not carry the visible paid-feature star that Billable carries.

Conclusion: do not propose a new estimate field, a variance bar, or a generic “you went over” alert.

### 2.2 Timeline capacity is already functional

Live testing with a 20-hour task on an eight-hour day produced:

- `+12h` above the day in the error colour;
- `20h/day` on the task block;
- the lane’s free-capacity total reducing accordingly.

Official documentation says Timeline capacity starts with working time and subtracts:

- dated task estimates;
- time off and public holidays;
- connected calendar meetings/events.

Capacity is therefore a planning calculation based on **estimated scheduled demand**, not a direct propagation of logged actuals. [Timeline View in Toggl 2.0](https://docs.toggl.com/timeline-view), [Tasks in Toggl 2.0](https://docs.toggl.com/tasks-in-toggl-2-0), [Capacity API](https://engineering.toggl.com/docs/focus/api/capacities/).

### 2.3 Project Dashboards already forecast completion

Project Dashboards provide:

- estimated, logged, remaining time and variance;
- a forecast line based on current logging patterns;
- a dynamically updated estimated completion date;
- project start and end dates;
- task, member and status breakdowns.

This means we must not claim that Toggl lacks forecasts or cannot signal a late project. The remaining possible gap is **cross-project, personal consequence and action**, not project forecasting itself. [Project Dashboards in Toggl 2.0](https://docs.toggl.com/project-dashboards-in-toggl-2-0).

### 2.4 Project alerts already notify on thresholds

Toggl supports time-estimate and fixed-fee/budget alerts, with configurable recipients and email delivery when a threshold is reached. These are project-level threshold notifications, not a personal cross-client replanning experience. [Time Tracking Reminders and Project Alerts](https://docs.toggl.com/time-tracking-reminders-and-project-alerts).

### 2.5 The Scheduler already moves work

The beta Scheduler can:

- create and place tasks;
- schedule unplanned tasks;
- reschedule existing tasks;
- move/reorganize tasks in bulk;
- clear time and propose new slots;
- respect configured working hours and time off.

Its documented limitations are decisive:

- it does not use tracked time or past entries;
- it does not support connected calendar events;
- it cannot maintain conversational context;
- it does not support overlapping tasks or recurring tasks.

So “Make room” should not be framed as inventing a scheduling engine. The stronger seam is giving the existing planning capability a trustworthy trigger and context derived from actual work. [Scheduler in Toggl 2.0](https://community.toggl.com/t/scheduler-in-toggl-2-0/4438).

### 2.6 The underlying task model has no remaining-effort field

The public API exposes, among other things:

- `estimated_mins`;
- `estimate_type` (`total` or `daily`);
- `start_date` and `end_date`;
- `priority` and `status`;
- total tracked and scheduled blocked time;
- time-block completion counts.

No separate “remaining effort” field appears in the documented task model. Capacity computations sum estimated minutes against working minutes. [Tasks API](https://engineering.toggl.com/docs/focus/api/tasks/), [Task Groups API](https://engineering.toggl.com/docs/focus/api/task-groups/), [Capacity API](https://engineering.toggl.com/docs/focus/api/capacities/).

This establishes an invariant for any credible solution: **the product must not manufacture future effort from historical overrun.**

### 2.7 Workload reporting already nets tracked time from unfinished estimates

The current Workload report API exposes `sum_scheduled_remaining_minutes`. Toggl documents this value as netting each assignee's tracked time from scheduled work and rolling unfinished estimates forward from the workspace-local current day. This is important overlap: the platform already has an actual-aware **remaining scheduled work** calculation in its reporting layer. [Reports API](https://engineering.toggl.com/docs/focus/api/reports/).

It does not close the proposed loop:

- the documented Workload UI is a team/member report showing work hours, logged time, remaining hours and overtime, not a task-triggered cross-client decision;
- the API calculation can only consume the estimate already stored on the task;
- once actual time has consumed the estimate, it cannot represent additional unestimated effort unless the estimate is changed;
- the task model still has no separate user-entered remaining-effort field;
- no official documentation found a flow that asks whether an over-estimate task is done, names the other dated commitment affected, or opens a contextual plan repair.

Therefore the safe claim is not that Toggl has never connected actuals and plans. It has done so in reporting. The surviving gap is the handoff from **estimate exhausted but work unfinished** to **confirmed additional demand and a named, actionable plan consequence**.

### 2.8 Solo planning is an intended use case, despite team-oriented copy

The live Timeline empty state is team-framed and asks the user to invite members. Toggl’s capacity announcement similarly describes managers monitoring team workload. However, Toggl also publishes a dedicated onboarding guide for **solo Toggl Plan users**, describing Toggl 2.0 as “visual planning meets powerful time tracking” and explicitly directing solo users to Timeline, capacity, Tasks, My Time and Reports.

Therefore the correct claim is not “capacity is aimed at the wrong person.” It is:

> Solo planning is supported, but the capacity surface and explanatory language privilege team-management mental models over a Freelancer’s own client commitments.

[Solo-user onboarding guide](https://community.toggl.com/t/toggl-2-0-onboarding-guide-for-toggl-plan-solo-users/3158), [Capacity management announcement](https://community.toggl.com/t/capacity-management-is-out/3151).

---

## 3. The surviving product seam

Today the relevant information and actions are fragmented:

| Surface | What it knows | What it does not do |
| --- | --- | --- |
| Task drawer | Actual logged time versus estimate | Does not establish remaining work or show cross-client plan consequence |
| Project Dashboard | Project forecast and estimated end date | Does not reconcile the project against the user’s other client commitments |
| Timeline | Dated estimated work versus availability | Does not appear to incorporate task actuals or explain the cause of stale capacity |
| Workload report/API | Nets tracked time from scheduled remaining work and rolls unfinished estimates forward | Uses the existing estimate; does not capture extra work beyond an exhausted estimate or lead into a named plan repair |
| Project alert | A threshold was crossed | Does not help the individual choose what changes |
| Scheduler | Can move and reorganize Toggl tasks | Explicitly does not use tracked time or past entries |

The strategic seam is exactly Toggl’s stated direction. Its June 2026 announcement says Track answered “how much time did this take?” while Toggl 2.0 should answer “do we have the capacity to take this on?” and “what’s the right call?” [Toggl 2.0 announcement](https://community.toggl.com/t/toggl-2-0-for-toggl-track-users-your-questions-answered/4798).

The proposed experience becomes meaningful only if it joins those questions:

1. **What happened?** Actual work reached or exceeded the estimate.
2. **What remains?** The user confirms that the task is done or supplies an updated total/remaining effort.
3. **Does the week still fit?** Capacity is recalculated across dated commitments and calendar availability.
4. **What changes?** The user previews and approves a plan repair.

---

## 4. Why the “remaining work” confirmation is essential

Consider two identical records:

```
Estimate: 3h
Logged:   4h
Status:   In progress
```

They can mean completely different things:

- Scenario A: the work is actually finished; the status was simply not updated.
- Scenario B: another two hours are still required.
- Scenario C: scope changed and the user cannot yet estimate the remainder.
- Scenario D: time was logged against the wrong task.

Automatically moving Atlas because Northstar logged four hours would be wrong in A and D, premature in C, and only potentially useful in B.

The safe trigger is therefore not simply `logged > estimate`. It is closer to:

```
logged >= estimate
AND task is not done
AND the user confirms more effort remains (or updates the estimate)
AND the updated demand creates a capacity shortfall before a dated commitment
```

This is not merely an edge case. It is the trust boundary of the entire concept.

---

## 5. Freelancer need: what external evidence supports

Public discussions cannot establish prevalence, but they consistently reveal the job and language:

- A solo developer with up to three clients describes difficulty estimating and meeting deadlines. Responses recommend buffers, planning to roughly 80% capacity, checking workload before promising, and renegotiating before overload. [Freelancer deadline discussion](https://www.reddit.com/r/freelance/comments/1cb0c46/how_do_you_guys_manage_your_deadlines/).
- A freelancer describes quoting 4–5 hours, logging 7.5 after client requests expanded the work, and facing an uncomfortable billing/scope conversation because the overrun was not raised while it happened. [Estimate-overrun discussion](https://www.reddit.com/r/freelance/comments/n6f6jq/).
- Freelancers describe one client consuming far more time than expected and creating pressure on promises made to another client. [Overpromised-deadlines discussion](https://www.reddit.com/r/freelance/comments/1gm7zvq/).
- Multi-client work creates mental overhead even at the same total hours; respondents use client-specific time blocks and explicit scheduling boundaries. [Multiple-client mental load](https://www.reddit.com/r/freelance/comments/1dlyqa1/).

The recurring job is not “show me a red number.” It is:

> Help me notice early enough that the work I already accepted no longer fits, so I can move, reduce, renegotiate or decline something before a client is disappointed.

The evidence also warns against assuming all Freelancers operate this way. Some avoid task estimates, work hourly with flexible deadlines, deliberately serve one client at a time, or price deliverables rather than hours. The eligible segment must therefore be explicit.

---

## 6. Eligible Week-0 segment

W0 is product tenure, not career tenure. A Freelancer joining Toggl can already have active clients, deadlines and commitments. But the product still requires enough structured data to compute consequence.

### Eligibility conditions

A credible W0 user for this experience has:

1. selected a planning-oriented intent or otherwise begun using Tasks/Timeline;
2. at least two dated tasks or milestones across active work;
3. estimates or scheduled blocks sufficient to calculate demand;
4. personal working hours, default capacity or connected calendar availability;
5. tracked time against at least one unfinished task;
6. confirmed that additional effort remains after the original plan becomes stale.

This is not universal W0. It is a high-intent sub-cohort.

### Why the setup can still be legitimate

- A new Toggl user may import existing work rather than create it from scratch.
- Toggl’s AI task importer accepts screenshots or text from an existing planner.
- The universal CSV importer supports task estimates and start/end dates.
- Toggl Plan/Track importers can bring existing projects, tasks, time entries and some estimates, though not every planning field transfers.
- Every assignment signup receives a Premium trial, so Timeline availability is not a first-week entitlement blocker.

[Tasks in Toggl 2.0](https://docs.toggl.com/tasks-in-toggl-2-0), [Universal CSV Importer](https://docs.toggl.com/universal-csv-importer), [Toggl import guide](https://docs.toggl.com/importing-data-from-toggl-plan-and-toggl-track-to-toggl-2-0).

### Honest W0 sequence

1. **Day 1:** import or create the current client week; track against the first planned task.
2. **Day 2–3:** tracked work reaches the original estimate while the task remains unfinished.
3. **Same moment:** confirm completion or update the expected remaining effort.
4. **Immediate value:** see whether existing commitments still fit before their deadlines.
5. **Action:** preview and approve a plan repair or consciously accept the conflict.
6. **Return:** continue tracking/replanning later in the week to see whether the revised commitments remain feasible.

The value is not the warning. It is preserving a client promise while there is still time to act.

---

## 7. Comparable product patterns

| Product | Pattern | Lesson for Toggl |
| --- | --- | --- |
| Sunsama | Personal daily workload threshold with colour-coded overcommitment warnings | Simple personal framing; warning alone does not resolve the trade-off |
| Asana Workload | Team capacity view with task drill-down and drag/drop rescheduling | Makes the contributing work visible; remains team/workload oriented |
| Motion | Automatically schedules and updates plans from priorities, deadlines and availability | High actionability, but automation can silently change externally promised work |
| Reclaim | Auto-reschedules lower-priority work around higher-priority items and deadlines | Strong planning engine; relies on explicit priority and scheduling rules |
| Toggl 2.0 | Actual time, estimates, capacity, forecasts and a Scheduler all exist | Unique opportunity is to let **actual tracked reality** trigger a controlled plan repair |

Sources: [Sunsama workload threshold](https://help.sunsama.com/docs/settings/user-settings/), [Asana Workload](https://help.asana.com/s/article/portfolio-workload-and-universal-workload), [Motion auto-scheduling](https://www.usemotion.com/help/time-management/auto-scheduling/auto-scheduling-how-to-guide), [Reclaim automatic scheduling](https://help.reclaim.ai/en/articles/6207587-how-reclaim-manages-your-schedule-automatically).

### Differentiation principle

Do not copy automatic scheduling wholesale. A Freelancer’s dated task may represent an external client promise, not an internal preference. The product should:

- calculate and explain;
- preview alternatives;
- preserve deadlines by default;
- require approval before moving work;
- provide undo;
- allow “keep the risk” as a valid decision.

---

## 8. Product-behaviour implications (not an implementation plan)

The research supports a narrow interaction territory:

### Trigger

An estimated task reaches/exceeds its estimate and is still not Done.

### First decision

Do not immediately announce another task is at risk. Establish whether work remains:

- Done;
- Need more time;
- Logged against the wrong task / review entry.

### Recalculation

Only after the user supplies an updated estimate or remaining effort should the system recalculate capacity before all relevant deadlines.

### Consequence language

Prefer factual feasibility language:

- “You are 2h short before Friday.”
- “These commitments no longer fit in your available time.”
- “Atlas has no remaining slot before its Friday deadline.”

Avoid deterministic blame or unsupported causality:

- “Northstar will make you miss Atlas.”
- “Atlas is definitely late.”
- “We fixed your schedule.”

### Action

“Make room” is a strong action label because it describes the job, not the mechanism. It can invoke existing scheduling behavior while presenting a small, reviewable set of alternatives.

---

## 9. Edge cases that determine credibility

| Case | Research implication |
| --- | --- |
| Task is actually finished | Mark Done; do not create future capacity |
| Work remains but amount is unknown | Permit “Not sure yet”; do not fabricate an exact risk calculation |
| Time was logged to wrong task | Offer correction; do not replan from bad data |
| Updated work still fits | Confirm “Your week still fits”; no unnecessary warning |
| Multiple tasks could move | Present the set and let the user choose; do not pretend one is objectively expendable |
| No deadline | Show capacity consequence only; do not claim a client promise is threatened |
| No estimate | Concept is ineligible until the user supplies one |
| Total estimate spread across days | Explain how the additional total changes daily allocation |
| Daily estimates | Preserve the explicit daily distribution |
| Calendar meeting occupies the only free slot | Treat it as protected unless the user changes it |
| Time off / public holiday | Include it in available time |
| User chooses overtime | Allow conscious acceptance, but do not recommend overwork as the default fix |
| Private client task | Preserve masking/permissions in shared views |
| Task priority missing | Do not infer commercial priority solely from dates |
| Edit estimate changes task status | Current community reports indicate a status-reset bug; the experience must preserve status when estimates change |
| Capacity calculation is distrusted | Show the arithmetic and inputs; allow correction before rescheduling |

The last two matter because a user report describes estimate edits unexpectedly resetting task status, while another report describes capacity miscalculation caused by a custom split workday. These reports establish risk, not prevalence. [Estimate/status report](https://community.toggl.com/t/bug-task-status-resets-to-default-to-do-whenever-estimate-is-edited/4874), [Capacity calculation report](https://community.toggl.com/t/issue-with-timeline-capacity-calculation/3370).

---

## 10. Measurement model

### Eligibility denominator

Do not measure this against all new signups. Measure against W0 Freelancers who have:

- at least two dated estimated commitments;
- tracked time against a still-open task;
- reached or exceeded that task’s estimate.

The size of this cohort is currently unknown and is the first business-risk question.

### Mechanism metrics

- % of eligible overruns where the user confirms Done versus more work remains.
- % of confirmed remaining-work events that produce a genuine capacity conflict.
- % of conflicts where the user opens the plan-repair experience.
- Time from trigger to a resolved/accepted plan.

### Value proxies

- % of conflicts returned to feasible capacity before the affected deadline.
- % where the user explicitly moves, reduces, reprioritizes or accepts work.
- % of plan repairs still intact after 24 hours.
- Reduction in tasks moved only after their original deadline.

These are in-product proxies. They do not prove a client relationship was protected.

### W0 outcome

- Return to meaningful tracking or planning on another day in Days 2–7 among eligible exposed users versus an eligible control.
- Secondary: number of distinct tracking/planning days in the first seven.

### Business outcome

- Trial users who adopt both tracking and planning, then retain Timeline/Scheduler use after trial.
- Premium conversion is a lagging secondary outcome, not the W0 success definition.

### Guardrails

- Added friction at timer stop or task update.
- “Done” used merely to silence the prompt.
- Plan churn or changes undone within 24 hours.
- Tasks pushed beyond deadlines without an explicit acknowledgement.
- Increased planned overtime.
- Warning dismissal and feature disablement.
- Corrections indicating the capacity arithmetic was wrong.

---

## 11. Kill criteria

The concept should be killed or materially reframed if any of these are true:

1. **Eligibility is too rare:** very few planning-intent W0 Freelancers reach the trigger because they do not create dated estimated work.
2. **No remaining-work need:** most over-estimate tasks are already finished, making plan repair irrelevant.
3. **Existing behavior already closes the loop:** the live product or Scheduler already consumes tracked divergence, identifies the cross-project consequence and supports user-approved repair.
4. **The input cost is too high:** users will not confirm remaining effort or maintain estimates.
5. **The consequence is not trusted:** users frequently correct, undo or ignore the proposed capacity impact.
6. **No retention bridge:** eligible exposed users resolve conflicts but do not return to meaningful tracking/planning more often in W0.

No baseline is available, so numeric thresholds should be set after instrumenting the eligible cohort rather than invented in the assignment.

---

## 12. Claims that are safe versus unsafe

### Safe

- Toggl already exposes task variance and Timeline over-capacity.
- Timeline capacity uses dated estimates and availability inputs.
- Project Dashboards already forecast estimated completion from current tracking patterns.
- Scheduler can reorganize Toggl tasks but explicitly does not use tracked time or past entries.
- Solo planning is an intended Toggl 2.0 use case, even though capacity copy is team-oriented.
- No separate remaining-effort field appears in the documented task model.
- The proposed opportunity is a connection and decision experience, not a missing calculation.

### Unsafe without further verification

- Toggl only warns after commitment; pre-drop behavior remains unverified.
- Toggl never identifies deadline risk; Project Dashboards already forecast project completion, and exact late-state copy has not been exercised live.
- The three onboarding intents produce identical downstream experiences.
- Most W0 Freelancers create enough planning structure to qualify.
- An overrun necessarily threatens another commitment.
- Automatically moving the lowest-priority task is always the correct decision.

---

## 13. Remaining focused verification

These are the only checks still worth doing before planning:

1. **Project Dashboard late state:** populate a dated project whose forecasted completion exceeds its end date and capture the exact copy/actions.
2. **Scheduler access and behavior:** confirm where it lives in the current trial, how proposals are previewed/approved, and whether it exposes an undo path.
3. **Pre-commit Timeline behavior:** drag an unplanned estimated task onto an already-full day and record whether the warning appears during the drag, before save, or only after placement.
4. **Estimate update propagation:** update a dated task estimate and observe whether Timeline capacity changes immediately and whether any affected task/deadline is named.

These checks refine the interaction and wording. Only #1 or #2 would kill the central seam if they already connect actual drift to cross-client, user-approved replanning.

---

## 14. Final research judgment

The concept remains the strongest current Freelancer territory, but its defensible core is more precise than the original pitch:

> **Toggl already measures actual drift, forecasts individual projects, computes planned capacity and can reschedule tasks. The W0 opportunity is to help a solo Freelancer turn an unfinished task’s newly confirmed remaining work into a transparent, cross-client plan decision before a dated promise stops fitting.**

The “I wouldn’t have seen that” insight is not that Toggl lacks a warning. It is that Toggl has built the four ingredients of plan repair in separate surfaces, while its Scheduler explicitly cannot use the tracked reality that makes repair necessary.

The strongest restraint is also now clear: do not build an autonomous planner. Build trust at the handoff between evidence and decision.

I've written my understanding to `docs/plan-reality-check-deep-research.md` — does this match your mental model?

---

## 15. Live verification of §2 claims (Claude, 2026-08-18, trial account)

Opened the surfaces the research leaned on. Results:

| Doc claim | Live result |
| --- | --- |
| §2.3 Project Dashboard exists | **VERIFIED.** `Dashboard` tab per project; `Show:` toggle offers `Budget progress` / `Time progress`. |
| §2.3 Dashboard shows logged/estimated/variance | **VERIFIED.** Time progress: `Logged 3h 31m`, breakdown table `LOGGED 3h 30m 42s · ESTIMATED 20h · VARIANCE −16h 29m 18s`, per project/member/task. |
| §2.3 Dashboard **forecasts a completion date / forecast line** | **OFFICIALLY VERIFIED; NOT REPRODUCED — test prerequisites missing.** Toggl documents dates as feeding forecasting and a dynamically-updated completion date; the tested project had no start/end dates, so the forecast could not render. Absence here is a missing prerequisite, not disconfirmation. [Project Dashboards](https://docs.toggl.com/project-dashboards-in-toggl-2-0) |
| §6 AI task importer (photo/text) | **VERIFIED.** AI icon → `Photo` / `Prompt` / `Text` ("we'll turn it into a list of tasks"). |
| §2.5 Scheduler that moves tasks | **OFFICIALLY DOCUMENTED; not enabled/discoverable in this workspace.** Not reachable via the AI icon (importer) or Timeline gear on this trial — but Toggl documents it as a beta that reschedules tasks and *cannot use tracked time or past entries*. That limitation strengthens the seam. Not-found here ≠ absent. [Scheduler](https://community.toggl.com/t/scheduler-in-toggl-2-0/4438) |
| §2.4 Project alerts / milestones | **VERIFIED** incidentally: project Overview has `Add alert`, `Add milestone`, and an `Estimate` toggle. |

**Bearing on the decision.** W0 is *product* tenure, not *career* tenure. A Freelancer can join with four active clients on day 1, import their current task list (AI importer, verified above), overrun an underestimated task on day 2, and need to replan on day 3 — a legitimate first-week sequence. The setup I earlier mistook for elapsed time is collapsed by import. So the honest risk is **eligibility, not timing**: we do not know how many W0 Freelancers create or import enough dated, estimated work to reach the trigger. That belongs in the assumptions and kill criteria (§6, §11) — it is not grounds for a "month-two" verdict.

**Correction (supersedes the earlier draft of this line).** An earlier version of this section concluded the concept was a "month-two feature for a high-intent sub-cohort." That converted an eligibility risk into an unsupported timing claim — the same overclaim pattern this project has been disciplined about. The accurate conclusion:

> **Net: the concept remains W0-eligible for an experienced, planning-oriented Freelancer who arrives with active commitments, but it is not a universal first-run intervention. Its largest business risk is the size of that eligible first-week cohort — not whether the experience can create value within seven days.**

---

## 16. Duplication audit before planning (Codex, 2026-08-18)

This audit searched current Toggl Knowledge Base pages, official Toggl Community release/how-to posts, and the public Toggl 2.0 API reference for the complete proposed workflow. Documentation cannot prove that an undocumented experiment does not exist, so “not found” is recorded as **no official evidence found**, not as absolute product absence.

| Proposed capability | Current Toggl overlap | Duplication verdict |
| --- | --- | --- |
| Detect that logged time reached/exceeded an estimate | Task variance, project Time Status, project threshold alerts | **Already exists** |
| Know that the task is still unfinished | Task status and time-block completion are stored | **Already exists as data** |
| Ask “Done, or is there more to do?” at the exhausted-estimate moment | No matching interaction found in task, timer, alert, Timeline, report, Scheduler or API documentation | **No official evidence found** |
| Capture additional remaining effort | User can edit the total/daily estimate; no separate remaining-effort field exists | **Partial primitive, not the proposed decision** |
| Recalculate future work using actuals | Workload API nets tracked time from scheduled remaining work and rolls unfinished estimates forward | **Already exists in reporting logic** |
| Show planned over-capacity | Timeline capacity indicators and dated estimates | **Already exists** |
| Forecast a project finishing late | Project Dashboard forecast line and dynamic estimated completion date | **Already exists** |
| State which other client commitment no longer fits after newly confirmed extra work | No task-triggered, cross-project named consequence found | **No official evidence found** |
| Suggest how to create space | Scheduler can move/reorganize tasks and propose slots when clearing time | **Partially exists** |
| Derive that suggestion from the overrun/actual tracked history | Scheduler explicitly does not support tracked time or past entries | **Explicitly not supported** |
| Preview, approve and undo the exact repair | Scheduler documentation mentions proposed slots, but its confirmation and undo behavior was not documented or reachable in the tested workspace | **UNVERIFIED interaction detail** |
| Preserve client deadlines unless the user explicitly accepts a change | No documented policy found; dates, priorities and milestones exist as inputs | **No official evidence found** |

### Foundation verdict

Toggl does **not** appear to ship the complete “Make room” workflow in its documented product. It already ships substantially more of the underlying intelligence than the first concept statement implied: threshold detection, actual-aware scheduled-remaining reporting, capacity, project forecasting and generic rescheduling all exist.

The defensible invention is narrower and stronger:

> **At the moment an unfinished task exhausts its estimate, capture the additional work the existing model cannot know, then turn Toggl's existing calculations into a named cross-client consequence and a user-approved repair.**

This must be presented as connecting and productizing existing Toggl intelligence—not as inventing overrun detection, capacity warnings, forecasts or scheduling.

### Remaining uncertainty that does not block plan drafting

The only unresolved duplication risk is an undocumented or gated in-product experiment that already performs this exact task-triggered handoff. The current trial evidence did not reveal it, the Scheduler was not discoverable in that workspace, and no official source found during the audit describes it. Before recording the final Loom, run one live golden-path check on the deployed Toggl account if browser control is restored; until then, use “no documented/currently observed workflow” rather than “Toggl cannot do this.”

I've written my understanding to `docs/plan-reality-check-deep-research.md` — does this match your mental model?
