# Make room — adversarial Q&A

> Rehearsal material, not a script. Answer the question directly, acknowledge the real limitation, then return to the narrow claim. Do not become defensive and do not pretend uncertain data is known.

## The answer pattern

Use this shape under pressure:

1. **Agree with the valid part:** “That's the main risk.”
2. **State the bounded claim:** “I am not claiming X; I am claiming Y.”
3. **Give the evidence or mechanism.**
4. **Name how you would measure or kill it.**

---

## The ten questions most likely to be asked

### 1. Why would this make someone return during their first week?

Because continued tracking now keeps their remaining client commitments realistic. The immediate value is not seeing another warning; it is discovering a collision while there is still time to change the plan. I would test the retention claim rather than assume it: among eligible users exposed to Make room, do more return for meaningful tracking or planning on a later day in Days 2–7 than an eligible control?

### 2. Can this situation genuinely happen in the first week?

Yes, for the target segment. Week zero is product tenure, not career tenure. A Freelancer can join Toggl with active clients and deadlines, import or create the current week on Day 1, track on Day 2, and exhaust an estimate by Day 3. I am not claiming every new Freelancer reaches it; the eligible cohort size is the biggest assumption.

### 3. How many new users will actually be eligible?

I do not know, and I would not invent a number. The first measurement is the eligibility funnel: new Freelancers with at least two dated, estimated commitments who track an unfinished task to its estimate. If that cohort is too small, I would kill or reposition the concept rather than optimize a niche workflow.

### 4. Doesn't the Workload report already show remaining hours and overtime?

It does, and that discovery narrowed my idea. The observed Workload report is passive, team-framed, and compares logged time with weekly work hours. It does not trigger when a task exhausts its estimate, ask what remains, name another dated commitment, or offer a contextual repair. Make room is not another Workload report; it turns existing intelligence into an individual decision at the moment the plan becomes stale.

### 5. Doesn't Timeline already show when the user is over capacity?

Yes. Timeline showed `+12h` immediately when an estimate changed. That is arithmetic, and I am not rebuilding it. The missing workflow is establishing the unknown remaining effort, explaining which dated commitments now collide, and helping the user decide what changes.

### 6. Doesn't the Project Dashboard already forecast lateness?

It provides single-project progress and documented forecasting. In my live scenario it rendered an actual-versus-estimated burn-up chart but no named completion date. Either way, it remains a single-project view. Make room addresses the personal cross-client trade-off and action, not project-level progress reporting.

### 7. Doesn't Toggl already have a Scheduler?

Toggl documents a beta Scheduler, but it was not available in the tested workspace and its documentation says it currently does not support tracked time or past entries. I do not claim the prototype integrates with that beta. Make room supplies the missing handoff from tracked reality to a transparent, user-approved plan adjustment.

### 8. Isn't this just another warning?

No. A warning stops at “you went over” or “you are over capacity.” Make room first asks for information Toggl cannot know, distinguishes Done from more work or bad tracking, calculates whether anything actually changed, and only then offers a previewed action. It also has a still-fits state, so it does not manufacture alarms.

### 9. Why is this more important than reducing everyday timer friction?

Timer friction is broader, but Toggl already invests heavily in capture through timers, calendar integrations, extensions, suggestions, and automated tracking. This opportunity converts that captured reality into a consequential decision and directly demonstrates Toggl 2.0's time-intelligence strategy. I chose depth for a high-intent individual segment, not universal reach.

### 10. Does one saved conflict really cause retention?

I would not claim that it certainly does. My hypothesis is that avoiding an imminent client failure creates stronger perceived value than another retrospective report. The experiment must prove the retention bridge. Conflict resolution is the value metric; subsequent meaningful return is the W0 outcome. If the first improves but the second does not, the experience is useful but does not solve this assignment's retention goal.

---

## Problem and persona challenges

### Why did you choose the Freelancer rather than the Individual Contributor?

The Freelancer's multiple simultaneous clients create frequent cross-commitment trade-offs that can materialize inside one week. It is also personally grounded: my wife is a UX designer and several friends are developers juggling promised hours across clients. That observation generated the hypothesis; it is not presented as prevalence data.

### Aren't you generalizing from your wife and friends?

No. Their experience was the spark, not proof. I tested the relevant behavior in Toggl, checked current documentation and product surfaces, and treat cohort size and retention impact as open assumptions to validate quantitatively.

### What about Freelancers who don't estimate their work?

They are not eligible. That is the concept's largest reach risk. I would not force estimates into their workflow merely to make the feature work. If too few W0 Freelancers use dates and estimates, this is not the right retention investment.

### What about fixed-price Freelancers?

The problem is capacity displacement, not billing method. Two additional hours still consume time promised elsewhere. However, fixed-price work may make the financial pain stronger while making hour estimates less natural, so eligibility still depends on whether the user plans in time.

### Isn't this actually a month-two feature?

Not necessarily. The user is new to Toggl, not new to their profession. Existing client work can be imported on Day 1. The honest statement is that this is a W0-eligible high-intent segment, not a universal first-run experience.

### Why focus on a narrow segment?

The brief asks for one specific area and rewards prioritization. A narrow segment with a consequential, testable job is preferable to a generic feature that superficially serves everyone. The business question is whether the eligible segment is large enough to matter.

---

## Product-duplication challenges

### Project Alerts already notify users when estimates are reached. What's new?

Project Alerts are single-project threshold emails. They do not know whether future work remains, calculate the user's other commitments, identify a displaced deadline, or support replanning. They are an input signal, not the decision experience.

### Couldn't the user just open Timeline and move something manually?

Yes, if they recognize the overrun, know more work remains, remember to update the plan, find Timeline, understand the capacity arithmetic, and choose a safe trade-off. Make room reduces that cognitive stitching at the moment the evidence appears. It does not remove manual control.

### Why not simply improve the Workload report for solo users?

That could improve discoverability, but it would remain a destination the user must remember to visit. The distinctive value here is timing: the plan is questioned when actual work invalidates its assumption. A personal Workload report could become a later supporting surface, but it is not the narrow intervention I chose.

### Are you claiming Toggl cannot connect actual and planned time?

No. Its reporting API already nets tracked time from unfinished scheduled estimates. My claim is narrower: once an unfinished task exhausts its estimate, the model cannot know additional future effort without user input, and no documented or observed workflow turns that input into a named cross-client repair.

### What if Toggl has an undocumented experiment doing this?

That remains possible. I checked the task drawer, Timeline, Workload, Project Dashboard, Alerts, notifications, Admin settings, current documentation, Community releases, and public API. I would say “no documented or observed workflow,” not make an absolute absence claim.

---

## Logic and trust challenges

### Why can't Toggl infer how much work remains from the overrun?

Because the same record can mean the task is finished, more work remains, the timer was wrong, or time was attributed incorrectly. Historical overrun is evidence that the old estimate was wrong; it is not evidence of a precise future amount.

### Why not just update the estimate?

Overwriting the original estimate destroys the historical evidence and weakens later estimate-versus-actual learning. Make room preserves the original estimate, records confirmed remaining effort separately, and derives an expected total from logged plus remaining work.

### Isn't adding a new remaining-effort field excessive?

It is the minimum trustworthy input. Without it, the system must either fabricate future demand or overwrite history. In production, the exact storage model would need validation, but the product distinction must remain.

### What if the user doesn't know how much work remains?

They can choose `Not sure yet`. Toggl should preserve uncertainty rather than present a false two-hour calculation. The prompt stays quiet until meaningful new activity or an explicit reminder.

### What if the timer was wrong or the entry belongs to another task?

The prompt includes `Logged to wrong task` or `Review time entry`. The plan is recalculated only after the source data is corrected. Bad actuals must never move future work.

### How do you know which commitment is affected?

Only name a commitment when the capacity and deadline calculation proves that it has no remaining slot. When causality is ambiguous, say “Wednesday is two hours over” and show the contributing work rather than inventing a victim.

### Aren't deadlines sometimes soft?

Yes. The interface treats them as dated commitments, not moral absolutes. It never changes one silently; the user can explicitly move a deadline or accept the risk.

### How does Toggl choose what to move without knowing client importance?

It should not rank client worth. The prototype recommends a move only when it is structurally safe—for example, undated internal work moving to a day with capacity. Otherwise it presents the collision and asks the user. Commercial judgment stays with the Freelancer.

### What happens when every task has a deadline?

Toggl says no safe move was found. It can show manual choices—change scope, move a deadline, or knowingly accept overtime—but it should not disguise a broken promise as an optimization.

### What if the recommendation is wrong?

The arithmetic and reasoning are visible, nothing changes before approval, and Undo is available. Undo restores the schedule while retaining the confirmed fact that more work remains.

### Why allow the user to accept overtime?

Because it may be a conscious, occasional choice and removing it would be paternalistic. Toggl must never recommend overtime as the default, and planned overtime is a guardrail metric.

### What if the extra work still fits?

Toggl says “You're still on track” and moves nothing. This is an important trust state: the feature responds to reality rather than generating a warning every time an estimate is reached.

---

## UX and scope challenges

### Won't this prompt interrupt the core timer experience?

That is the central UX risk. It appears only after a saved entry crosses an estimate on an unfinished task, is non-blocking, supports immediate dismissal, and is suppressed until meaningful state changes. Prompt dismissal, false Done selections, and time-to-complete tracking are guardrails.

### Why trigger after timer stop?

Timer stop is the first durable moment when the new actual is known and the user has exited active focus. Production should also support manual or edited entries; timer stop is the prototype's demonstration path, not the only conceptual trigger.

### Why not ask for remaining effort during task creation?

At creation, remaining effort is simply the estimate. The new question becomes useful only when actual evidence shows that estimate is stale. Asking earlier would add setup without information.

### Why not redesign onboarding to collect dates and estimates?

That would add friction for every new user to serve a subset. Make room waits until the user has both the context and motivation to answer. Eligibility and import can be improved later if the concept proves valuable.

### Why not use AI to reschedule everything automatically?

Client deadlines are external promises, not preferences. Autonomous changes would create a trust problem larger than the scheduling problem. AI could eventually generate alternatives, but explanation, preview, approval, and Undo should remain.

### Why only one or two suggestions?

The job is to resolve one conflict, not explore a combinatorial schedule. One safe recommendation plus other options reduces cognitive load and avoids pretending the prototype is a general scheduler.

### Why did you leave out mobile, teams, invoicing, and profitability?

The brief prioritizes one individual experience and rewards scope control. Those surfaces add breadth without proving the central interaction. The prototype focuses on the moment actual work invalidates the personal plan.

### Why not show all edge cases in the Loom?

The Loom is capped at five minutes and the prototype is the gate. I demonstrate the golden path and one trust state; the remaining cases are implemented or documented. Showing everything would obscure the core value.

---

## Measurement and business challenges

### What is the primary success metric?

Among eligible W0 Freelancers who see the experience, the percentage who return for meaningful tracking or planning on a subsequent day within their first seven days, compared with an eligible control.

### Why not simply measure clicks on Make room?

Clicks measure curiosity. The value metric is whether a detected conflict is returned to a feasible plan before the affected deadline. Retention then tests whether that value changes first-week behavior.

### What counts as “meaningful return”?

A subsequent-day action that updates the user's real record or plan—such as tracking time, confirming remaining effort, adjusting scheduled work, or reviewing an active commitment—not merely reopening the app.

### How would you avoid selection bias?

Randomize exposure within the eligible cohort, or use a matched eligible control if experimentation constraints prevent randomization. Do not compare planning-heavy exposed users with all signups.

### What's the baseline and target?

Unknown. I would instrument the eligible funnel first and set a target using the observed baseline and minimum meaningful lift. Inventing a number would communicate false precision.

### What are the kill criteria?

- The eligible W0 cohort is too small.
- Most threshold events are already-finished tasks.
- Users will not confirm remaining effort.
- Consequences are frequently corrected or distrusted.
- Repairs are immediately undone or create overtime/deadline harm.
- Conflict resolution improves but subsequent W0 return does not.

### What is the business value for Toggl?

It creates a reason to use tracking and planning together, which is the strategic promise of Toggl 2.0. If successful, it should increase first-week adoption of both behaviors and later retention of planning/capacity functionality. Premium conversion is a later secondary outcome, not the W0 success metric.

### Isn't this Premium-gated and therefore bad for W0?

New assignment signups receive a Premium trial, so the W0 experience is reachable. It can also demonstrate paid planning value during the trial. Whether the final feature belongs wholly or partly in a paid tier is a packaging decision, not something the prototype needs to settle.

### How do you know the feature protected a client relationship?

I do not. “Conflict returned to a feasible plan before deadline” is an in-product proxy. Longer-term research could test delivery outcomes or client communication, but the assignment's W0 horizon requires an observable leading indicator.

---

## Prioritization and strategic challenges

### Why is this the best thing you could have done?

It combines three strengths: a consequential Freelancer problem, value that can materialize in W0, and a seam grounded in Toggl's actual product strategy. It also uses Toggl's distinctive combination of trusted actual time and planning data. The trade-off is narrower reach, which I have made explicit and measurable.

### Isn't the solution too complex for the problem?

The visible interaction is intentionally small: one question, one consequence, one previewed decision. The underlying calculation uses capabilities Toggl already has. The complexity is mostly in trust rules—knowing when not to claim or move something—which is necessary rather than decorative.

### Why not build the more common review-and-categorize flow?

That accepts that context was lost and asks the user to reconstruct it later. Make room uses the moment when actual work changes future feasibility, while the context and options still exist. It is forward-looking and tied to a consequential decision.

### What is the “I wouldn't have seen that” insight?

Toggl has already built the ingredients—actual variance, scheduled remaining work, capacity, project progress, and task rescheduling—but the point where actual work invalidates the plan has no individual decision experience. The missing piece is not another calculation; it is the trust-building handoff from evidence to choice.

### What would you build next if this worked?

First, learn which conflicts and repair choices recur. Then consider a personal commitment view or carefully integrate generated alternatives. I would not expand before proving eligibility, trust, and W0 return.

---

## AI-process challenges

### How much of this idea came from AI?

AI generated and challenged many territories, but the final direction emerged through elimination and firsthand verification. Several AI claims failed in the live product. My contribution was deciding what to test, rejecting duplicated or unsupported ideas, choosing the persona, setting the trust boundary, and preserving the original estimate rather than accepting an easy rewrite.

### Where was AI wrong?

Examples include suggesting the common retrospective categorization direction, overstating a reporting-format bug, assuming project context was lost during capture, assuming capacity warnings were absent, and initially underweighting the existing Workload report. Each correction narrowed the final claim.

### Where did AI genuinely help?

It accelerated product reconnaissance, synthesized documentation and public discussions, generated counterarguments, pressure-tested metrics, and built the prototype quickly. I used it as an adversarial research and execution partner, not as the decision-maker.

### How do you know this isn't just another AI-generated answer?

The first AI answers repeatedly died when checked against Toggl. The final concept rests on observed product seams, a personally grounded Freelancer hypothesis, explicit rejected alternatives, and design decisions made in response to contradictions—especially the Workload overlap and the need to preserve the original estimate.

---

## Short closing defense

If the discussion becomes broad, return to this:

> I am not claiming every Freelancer needs this or that Toggl lacks capacity intelligence. I am targeting a measurable W0 segment whose active plan becomes stale. Toggl already knows the historical overrun and the scheduled commitments, but it cannot know additional work without asking. Make room captures that missing truth, explains the consequence, and keeps the final decision with the user. The experiment succeeds only if it restores feasible plans and increases meaningful first-week return; otherwise I would stop.

