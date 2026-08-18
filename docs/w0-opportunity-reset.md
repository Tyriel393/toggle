# W0 opportunity reset — both individual personas

> **Research-phase artifact.** This resets the opportunity search after several apparent product gaps disappeared under direct testing. It does not select a feature or authorize implementation.

**Date:** 2026-08-18  
**Hard constraint:** a new user must **return and receive value within the first seven days after signup**.  
**Personas:** Freelancer and Individual Contributor, using the assignment's definitions rather than generic market labels.

---

## 1. Reset principles

### W0 is product tenure, not career tenure

A Week-0 user can already have:

- several active clients;
- a long-running client engagement;
- a full calendar;
- existing deadlines and commitments;
- Jira, Slack, Figma, GitHub, or other client tools;
- an established pricing or billing model.

The feature does not need to solve only the first sixty seconds after signup. It can solve a real event on Day 2–7, provided the prototype makes that timing explicit and the user gets value before the week ends.

### Every candidate must complete this loop

| Requirement | Question |
| --- | --- |
| Week-0 trigger | What naturally happens during the user's first seven days? |
| Immediate value | What becomes easier, safer, clearer, or more useful immediately? |
| Return reason | Why does the user open or use Toggl again on another day that week? |
| Product fit | Does the experience belong inside Toggl's tracking → planning → intelligence model? |
| Existing-capability check | Is Toggl already doing it? |
| Measurement | What observable behavior bridges the feature to W0 retention? |
| Guardrail | What friction, error, pressure, or privacy cost could outweigh the benefit? |

### Evidence labels

- **APP** — observed directly in the signed-in Toggl 2.0 product.
- **DOC** — verified in current official Toggl documentation.
- **COMMUNITY** — user report or request; directional evidence, not prevalence.
- **EXTERNAL** — competitor or broader market behavior.
- **HYPOTHESIS** — plausible but not yet validated.

---

## 2. Expanded capability boundary — what Toggl already solves

The earlier opportunity search repeatedly mistook hidden, delayed, or untested behavior for missing capability. Current evidence establishes:

1. **Focus mode exists and has a visible entry point** in the running timer's overflow menu. **APP**
2. **Client-scoped recurring Goals work**, including progress and On pace/Behind states. **APP**
3. **Daily briefs and long-running-timer emails already create re-engagement and forgotten-timer protection.** **APP**
4. **The post-stop prompt already offers to schedule the work for tomorrow.** **APP**
5. **Calendar connection and calendar-derived tracking already exist.** **APP/DOC**
6. **The browser extension starts timers inside Jira, Slack, Gmail, Notion, Asana, GitHub, and other tools.** **DOC**
7. **Jira sync can import projects, issues, labels, and assignees, while the extension can track directly from an issue.** **DOC**
8. **Auto-Tracker can start, stop, or switch a timer based on active applications and window-title rules.** **DOC**
9. **Smart Suggestions use time-entry history plus active app/window titles, with local processing.** **DOC**
10. **The private Activity Timeline captures application and optional window-title activity and can assign activities to projects/tasks.** **DOC**
11. **Project/task estimate alerts, billable rates, fixed fees, profitability, time status, and variance exist.** **APP/DOC, populated behavior partly unverified**
12. **Time Logs and Summary reports provide detailed, filterable, exportable records.** **APP/DOC**

Consequently, the following are not viable headline ideas:

- surface Focus mode;
- invent Client Goals or weekly commitment cards;
- generic reminders to track;
- warn about an eight-hour timer;
- simple calendar-to-time conversion;
- generic app-triggered auto-tracking;
- generic Jira/Slack tracking integration;
- another retrospective “review and categorize today” queue;
- a normal project/client report;
- a plain estimate threshold alert.

---

## 3. What users repeatedly value or struggle with

Across Toggl Community, Reddit, Hacker News, G2/Capterra, and competitor products, five patterns recur. These are directional, not prevalence estimates.

### 3.1 The switch is harder than the timer

Freelancers describe a short emergency for Client B arriving while Client A's timer keeps running. The switch is too small and urgent to trigger a deliberate tracking ritual, so the weekly record becomes guesswork. A highly engaged web-development discussion described this exact multi-client failure and produced three classes of response: faster switching, automatic observation, or changing the client's interruption policy.

Toggl already has configurable Auto-Tracker rules, so “detect app and switch timer” is not a clean gap. The remaining question is whether a **zero-setup, confidence-aware mismatch intervention** can add value without the destructive behavior of silently stopping or changing a timer.

### 3.2 People want insight inside the work block

Users ask for more detailed app/window activity to understand what occurred inside a tracked block. Competitors such as RescueTime and Rize convert activity into focus, distraction, and switching patterns. Toggl's own context-switching content says short sessions and many task/project changes are signals, while Toggl's Activity Timeline is framed mainly around reconstructing records.

The distinctive Toggl opportunity is to compare **declared intent** (timer/task/project/client) with **observed attention** (private app/window activity), without productivity scoring or surveillance.

### 3.3 Hours alone are weak evidence

Toggl Community's “Add notes to time entries” request has sustained support. Users explicitly distinguish:

- the task as a headline;
- a session note explaining what happened;
- a final summary of what was accomplished;
- significant interruptions or discoveries;
- enough context to invoice or update a client later.

The request is especially relevant to the IC persona's need to show what was done and why it mattered. A blank notes field alone would be too small for the assignment, but **session evidence → weekly client proof** is a broader job supported by the same signal.

### 3.4 Plans are tested by interruptions

Freelancers describe urgent Client B requests interrupting Client A work, misallocated timers, overtime, and commitments that slip. Some plan weekly hours or dedicate days to clients; others deliberately refuse immediate access, charge rush rates, or batch communication.

This means “Make room” is an eligible-segment hypothesis, not a universal freelancer truth. It only works for users who estimate and maintain a plan, and only creates value if seeing the displaced commitment changes their decision.

### 3.5 Collaboration time is real work but weakly explained

Embedded contractors report meetings, Slack, stakeholder support, and cross-tool coordination consuming meaningful time. Toggl can track meetings and client-tool work, but a duration does not preserve:

- what decision was made;
- what request emerged;
- what deliverable changed;
- whether collaboration displaced planned delivery work;
- why the time mattered to the client.

This creates several IC-specific territories beyond simply tracking the meeting.

---

## 4. Freelancer opportunity territories

### F1. Attention inside Client work

**Trigger:** after a qualifying tracked Client work block on Day 2+, when private desktop activity is available.

**Experience territory:** compare the intended timer with attention movement inside it: uninterrupted stretches, brief communication switches, and repeated returns. Keep labels neutral and user-controlled.

**Immediate value:** the user learns why “90 minutes on Northstar” did or did not feel like 90 minutes of progress.

**Return loop:** try a second comparable block and see whether one behavioral change improved continuity.

**Evidence:** APP/DOC capability foundation; Toggl's context-switching content; Toggl Community request for deeper activity inside blocks; RescueTime/Rize category evidence; public context-switching discussions.

**Existing overlap:** Toggl has raw Activity Timeline, Smart Suggestions, and Focus mode. The unverified gap is interpretation **within an intentional Client/task timer**.

**Cold demo:** strong — one declared block, visibly fragmented activity, one next action, one later comparison.

**Measurement:** insight viewed → next comparable block started → change in user-selected switch pattern → multi-day Week-0 use.

**Guardrails:** recording consent, app exclusion, classification correction, guilt, false “distraction” claims, desktop-install friction.

**Status:** **high-potential; requires a two-day populated Activity Timeline check.**

### F2. Confidence-aware Client switch guard

**Trigger:** the running timer is assigned to one Client/task while foreground activity strongly resembles another established Client/task.

**Experience territory:** ask rather than silently switch: “Still working on Northstar?” with Continue / Switch / Ignore this app. The intervention appears only after enough dwell time and confidence.

**Immediate value:** prevents Client A's timer absorbing a quick Client B request.

**Return loop:** the user trusts Toggl to keep billing records accurate during future switches.

**Evidence:** strong public behavioral example; Toggl Auto-Tracker architecture already supports active-window rules.

**Existing overlap:** **high.** Auto-Tracker can already switch active timers based on explicit rules, and extension auto-track exists. The gap would have to be zero-setup learning, confidence, and safe prompting.

**Cold demo:** excellent.

**Measurement:** accepted correction rate, later reassignment rate, prevented mismatches, multi-day tracked Client work.

**Guardrails:** false prompts, broken concentration, accidental timer changes, privacy, loss of trust.

**Status:** **promising pain, dangerous duplication. Do not select without testing Smart Suggestions and Auto-Tracker on a fresh account.**

### F3. Client pulse in the work surface

**Trigger:** while tracking or about to start work for a Client during Week 0.

**Experience territory:** show this week's Client total or remaining commitment in the Timer/desktop surface, without opening Reports or the hidden Goals rail.

**Immediate value:** “Northstar has received 6h 20m this week” is visible at the decision point.

**Return loop:** check the Client pulse before choosing the next work block.

**Evidence:** Toggl Community directly requests Client/project weekly totals in the desktop list; current workaround is Reports. Client Goals already prove the arithmetic and progress states.

**Existing overlap:** high—Reports and Client Goals already answer it elsewhere.

**Cold demo:** strong but incremental.

**Measurement:** pulse views, work started from Client context, report navigation avoided, multi-day Client tracking.

**Guardrails:** clutter, overemphasis on hours, fixed-fee mismatch, wrong goal assumptions.

**Status:** **real request, low originality ceiling.**

### F4. Make room for an urgent Client request

**Trigger:** an unplanned estimated task is added to a day/week without enough free capacity.

**Experience territory:** preview the capacity conflict and identify the existing commitment displaced before the task is scheduled. The user—not Toggl—chooses what moves.

**Immediate value:** converts “yes, then work late” into a visible trade-off before commitment.

**Return loop:** use Timeline whenever Client priorities change during the week.

**Evidence:** APP unplanned-task rail and capacity arithmetic; public Freelancer stories; firsthand designer/developer hypothesis.

**Existing overlap:** Timeline already shows capacity and refined availability. Overbooking behavior during drag remains unverified and may reduce this to better explanation.

**Cold demo:** excellent—conflict → consequence → resolved plan.

**Measurement:** conflicts resolved before work starts, adjusted task later started, changes reversed within 24h, Week-0 Timeline returns.

**Guardrails:** requires estimates and a maintained plan; recommendations may be ignored; can normalize overtime; setup burden.

**Status:** **strong demo, conditional eligibility. Verify current overbooking behavior and interview real planners.**

### F5. First estimate calibration

**Trigger:** the first estimated task completes or materially exceeds its estimate during Week 0.

**Experience territory:** show estimate versus actual in the task's own context and preserve the learning for the next similar estimate.

**Immediate value:** the user sees where their original assumption was wrong while the work is still memorable.

**Return loop:** apply the learning when estimating the next task/project.

**Evidence:** brief explicitly names estimation without historical data; public freelancers track actuals to improve future quotes; Toggl's strategy emphasizes real data over guesses.

**Existing overlap:** Toggl already has Estimate/Planned/Logged, variance, alerts, and Premium actual-vs-estimate reporting. The gap would be a first-week learning loop, not another variance chart.

**Cold demo:** good.

**Measurement:** estimate insight viewed, next estimate created/adjusted, forecast error over later comparable tasks, Week-0 return.

**Guardrails:** one sample is noisy; encourages false precision; Premium overlap; tasks may not be comparable.

**Status:** **strategically aligned but weak with only one week of evidence.**

### F6. Client-ready work receipt

**Trigger:** after a meaningful session or at the end of the first Client workday/week.

**Experience territory:** preserve a concise outcome/evidence note alongside the time record, then aggregate confirmed outcomes into a Client-ready Week-0 summary.

**Immediate value:** the record answers “what did I accomplish?”, not only “how long did I work?”

**Return loop:** continue creating a trustworthy Client update or invoice attachment across the week.

**Evidence:** sustained Toggl Community request for time-entry notes; 2.0 users report that Summary omits entry text; freelancers share detailed reports with clients.

**Existing overlap:** descriptions, task notes, Time Logs, exports, and shared reports exist. A plain note field is insufficient; the opportunity is evidence continuity from session to Client update.

**Cold demo:** medium-high if the weekly receipt is the payoff; weak if shown as a text field.

**Measurement:** outcome confirmations, receipt revisits/exports, editing burden, multi-day evidence accumulation.

**Guardrails:** post-stop friction, vague notes, AI hallucination if generated, privacy, drifting into retrospective cleanup.

**Status:** **strong direct demand; must avoid becoming “review and categorize today.”**

### F7. Quick-request economics

**Trigger:** several short Client interruptions occur inside one day/week.

**Experience territory:** expose the cumulative time and effective cost of “quick” requests, optionally against the user's own minimum billing or rush policy.

**Immediate value:** small requests become commercially visible before they disappear into general Client work.

**Return loop:** check the next request against the emerging pattern before accepting it.

**Evidence:** strong Freelancer anecdotes about five-minute emergencies, minimum billing increments, rush fees, and unpaid revisions.

**Existing overlap:** Reports can total Client/task time; fixed fees/rates exist. Policy modeling does not.

**Cold demo:** strong.

**Measurement:** interruption batches recognized, policy action taken, under-billed time reduced, Week-0 return.

**Guardrails:** niche pricing models, ethical billing concerns, difficult event detection, could encourage charging rather than value.

**Status:** **original but narrow and assumption-heavy.**

---

## 5. Individual Contributor opportunity territories

### I1. Meeting-to-outcome receipt

**Trigger:** a connected Client meeting ends during Week 0.

**Experience territory:** the event already supplies time and participants; the user confirms the task/project and captures one concrete outcome, decision, or new request. The result appears in the engagement record.

**Immediate value:** collaboration time is both tracked and made intelligible.

**Return loop:** use the same lightweight receipt after later meetings and arrive at the first weekly Client update with evidence already assembled.

**Evidence:** brief explicitly names untracked collaboration; calendar tracking exists; community users request session notes/final accomplishments; consulting discussions mention meetings as difficult billable boundaries.

**Existing overlap:** simple calendar-to-time conversion already exists. The new job is **what changed because of the meeting**, not logging its duration.

**Cold demo:** excellent—calendar meeting → confirmed outcome → engagement record.

**Measurement:** eligible meetings with confirmed outcomes, time-to-confirm, later reuse in status/export, return after next meeting.

**Guardrails:** meeting fatigue, prompting after low-value meetings, sensitive content, invented AI summaries, duplicate notes in Client tools.

**Status:** **strongest IC W0 fit if kept outcome-focused rather than auto-logging-focused.**

### I2. Work evidence trail

**Trigger:** a tracked task/session completes during Week 0.

**Experience territory:** attach a small, structured proof item—outcome, artifact, decision, or Client impact—to the session; roll those into a private engagement evidence view.

**Immediate value:** turns a timer into a contemporaneous record of contribution.

**Return loop:** continue the evidence trail so the first Friday update is easy and defensible.

**Evidence:** brief's “what was done, for whom, and why it mattered”; sustained notes request; community report that entry text is absent from Summary; HN users want enough detail to defend billed time.

**Existing overlap:** task notes and attachments exist, but are task-level; time-entry notes do not. Reports emphasize hours rather than outcomes.

**Cold demo:** medium-high; must show the Friday payoff rather than a form.

**Measurement:** evidence items confirmed, reuse/share/export, corrections, multi-day accumulation, Week-0 retained use.

**Guardrails:** added admin, empty/vague outcomes, client confidentiality, AI fabrication, value cannot be reduced to artifacts.

**Status:** **high persona fit and direct demand; interaction must be lighter than manual documentation.**

### I3. Scope-change marker

**Trigger:** the first new Client request is added to an existing engagement plan during Week 0.

**Experience territory:** preserve request provenance and identify whether it extends, replaces, or clarifies agreed work; show cumulative added effort separately from original work.

**Immediate value:** the user can discuss change while it is still a decision, not after overrun.

**Return loop:** maintain an engagement boundary as requests accumulate.

**Evidence:** strong consulting discussions about “one quick question,” change requests, and cumulative revisions; Toggl has tasks, estimates, unplanned work, notes, dates, and variance but no verified request-causality object.

**Existing overlap:** estimates, alerts, variance, Unplanned tasks, and custom fields cover pieces. No verified source/displacement relation exists.

**Cold demo:** excellent—baseline → request → visible added commitment.

**Measurement:** new requests marked before work, Client decision/change action, added-work share, later variance, Week-0 return.

**Guardrails:** needs a credible baseline; politically awkward classification; scope is contractual, not algorithmic; may add project-management bloat.

**Status:** **high originality; evidence and setup risk remain.**

### I4. Collaboration load versus delivery capacity

**Trigger:** connected meetings/communication consume enough time to threaten planned delivery during Week 0.

**Experience territory:** show the individual that collaboration has reduced the time available for an estimated deliverable, without judging the meetings as waste.

**Immediate value:** “Thursday review is now at risk because the Client added 3h of collaboration” is a decision signal, not an activity total.

**Return loop:** revisit the plan after calendar changes and protect delivery time.

**Evidence:** brief names untracked collaboration; public workers describe meetings generating more actions while leaving less execution time; Toggl owns calendar, estimates, planned work, actuals, and capacity.

**Existing overlap:** Timeline capacity and calendar events exist, but no verified causality between meeting load and a specific deliverable risk.

**Cold demo:** strong.

**Measurement:** risk viewed, plan/expectation adjusted, delivery task later started/completed, Week-0 returns after calendar changes.

**Guardrails:** meetings can be valuable; estimates may be poor; warning can create pressure or blame; calendar connection required.

**Status:** **strategically strong, but must avoid simplistic “meetings are bad” logic.**

### I5. Resume context after Client interruption

**Trigger:** the IC leaves a task for a Client message, meeting, or another tool and later returns.

**Experience territory:** preserve the exact next action or working context needed to resume, using a lightweight user-confirmed checkpoint rather than a generic task title.

**Immediate value:** less cognitive reconstruction after interruption.

**Return loop:** trust Toggl as the place that restores work context across the Client's fragmented toolchain.

**Evidence:** external context-switch discussions repeatedly say returning is harder than leaving; time-entry notes request includes interruptions; Toggl observes app/window activity.

**Existing overlap:** Focus mode, task notes, desktop activity, and “Add to tomorrow” cover adjacent pieces but not explicit resume context.

**Cold demo:** good—work → interruption → one-click resume with context.

**Measurement:** resume checkpoint used, time to re-engage, checkpoint correction, multi-day use.

**Guardrails:** hard to measure cognition, extra step before interruption, sensitive window data, may drift away from Toggl's core.

**Status:** **novel but less directly tied to time intelligence and billing.**

### I6. Client-tool capture setup

**Trigger:** the user's first work happens in Jira, Slack, Gmail, Notion, or another Client tool rather than Toggl.

**Experience territory:** personalize Week-0 setup around the actual Client tool and place tracking there.

**Immediate value:** no need to leave the Client's workflow to track.

**Return loop:** timers continue from where the IC already works.

**Evidence:** brief explicitly names working across Client tools.

**Existing overlap:** very high—browser extension, contextual prompts, Jira sync, native integrations, and Auto-Tracker already solve most of this.

**Cold demo:** difficult because value lives outside the Toggl web app.

**Measurement:** integration connected, in-tool entries, multi-day tracking.

**Guardrails:** setup/permissions, prototype cannot convincingly reproduce third-party tools, placement-only solution.

**Status:** **important problem, poor assignment direction because capability already exists and prototype fit is weak.**

### I7. First-week Client update

**Trigger:** the end of the first workweek or a recurring Client check-in.

**Experience territory:** assemble confirmed tasks, outcomes, meeting decisions, time, and upcoming risks into a concise update the IC can edit and share.

**Immediate value:** demonstrates contribution without equating value with hours.

**Return loop:** the IC has a reason to maintain high-quality records during the week because Friday's update becomes easier.

**Evidence:** brief explicitly names proving value and why work mattered; reports/exports exist but focus on hours; community asks for entry text and notes.

**Existing overlap:** shared/saved reports and exports exist; status/outcome synthesis does not appear verified.

**Cold demo:** strong if shown as accumulation → useful Friday output; weak as an AI summary page.

**Measurement:** updates generated, edited, copied/shared, evidence coverage, return before next check-in.

**Guardrails:** needs several days of seeded data, AI accuracy, confidentiality, sharing is outside Toggl, can become reporting bureaucracy.

**Status:** **good payoff, but should be downstream of I1 or I2 rather than a standalone AI feature.**

---

## 6. W0 shortlists before final product verification

These are research shortlists, not a build recommendation.

### Freelancer shortlist

| Rank | Territory | Why it survives | What could kill it |
| --- | --- | --- | --- |
| 1 | **F1 Attention inside Client work** | Low setup after one work block; strong Day-2 return experiment; distinctive join of intent + private activity | Existing Timeline may already provide enough interpretation; privacy/desktop permission |
| 2 | **F4 Make room** | Best consequential decision and cold visual | Users do not plan/estimate; current Timeline already explains overbooking |
| 3 | **F6 Client-ready work receipt** | Direct user demand; makes first week's record useful to a Client | Added admin; resembles retrospective cleanup if badly framed |

### Individual Contributor shortlist

| Rank | Territory | Why it survives | What could kill it |
| --- | --- | --- | --- |
| 1 | **I1 Meeting-to-outcome receipt** | Directly matches untracked collaboration + why it mattered; immediate Week-0 trigger | Calendar flow already captures enough; post-meeting prompts are annoying |
| 2 | **I2 Work evidence trail** | Strongest fit with “prove value” and direct notes demand | Manual evidence capture becomes work; weak cold demo without Friday payoff |
| 3 | **I4 Collaboration load vs delivery** | Uses Toggl's combined planning/time thesis to support a real decision | Simplistic meeting blame; estimate quality; calendar dependency |

### Highest-originality option

**I3 Scope-change marker** has the highest “I would not have seen that” ceiling, but also the largest evidence and setup burden.

---

## 7. Required product verification before selecting anything

### Activity/attention verification

1. Enable the Toggl 2.0 desktop Activity Timeline with app + window titles.
2. Record at least two realistic Client work blocks across two days.
3. Inspect exactly what the desktop and web surfaces show inside each block.
4. Test Smart Suggestions and Auto-Tracker prompts/switching.
5. Confirm whether Toggl already surfaces switch counts, uninterrupted runs, or focus interpretation.

### Timeline/Make-room verification

1. Create a full single-user day with estimated, dated tasks.
2. Drag an unplanned task onto the full day.
3. Record before-drop, during-drag, and after-drop capacity behavior.
4. Check whether the UI identifies only “over capacity” or also the commitment affected.

### Meeting/evidence verification

1. Connect a calendar on a disposable account.
2. Track or auto-track a meeting.
3. Inspect every post-meeting action and where event title/description/participants survive.
4. Confirm whether a time entry can hold notes independently of its task.
5. Inspect what the first-week Summary, Time Logs, and exported/shared report preserve.

---

## 8. Decision rule after verification

Do not choose the idea with the most features. Choose the territory that satisfies all four:

1. The gap remains after the live product test.
2. The Week-0 trigger requires no artificial behavior.
3. The payoff changes a decision or preserves evidence in the same flow.
4. The user has a concrete reason to return on another day that week.

If two survive, prefer the one with the clearer cold-open transformation and the lower need for setup or explanation.

---

## Sources added in this reset

### Toggl product and community

- [Toggl 2.0 Desktop App — Smart Suggestions, Auto-Tracker, reminders](https://docs.toggl.com/toggl-2-0-desktop-app)
- [Desktop Activity Timeline](https://docs.toggl.com/desktop-activity-timeline)
- [Toggl 2.0 Browser Extension and Jira integration](https://docs.toggl.com/toggl-2-0-browser-extension)
- [Time Tracking in Toggl 2.0](https://docs.toggl.com/time-tracking-in-toggl-2-0)
- [Toggl: Context switching](https://toggl.com/blog/context-switching)
- [Toggl Community: Add notes to time entries](https://community.toggl.com/t/add-notes-to-time-entries/1113)
- [Toggl Community: More detailed Activity Monitor](https://community.toggl.com/t/more-detailed-activity-monitor/4428)
- [Toggl Community: Project/Client weekly total in desktop list](https://community.toggl.com/t/can-you-add-project-client-weekly-total-in-the-list-view-in-desktop-app/4260)
- [Toggl Community: Time spent export and logged-time note](https://community.toggl.com/t/time-spent-export-and-logged-time-note/3338)
- [Toggl Community: Introducing Toggl 2.0](https://community.toggl.com/t/introducing-toggl-2-0/4757)

### User and market signals

- [Reddit: multi-Client context switching and lost billable time](https://www.reddit.com/r/webdev/comments/1osekrd/juggling_multiple_clients_is_killing_my_billable/)
- [Reddit: how Freelancers divide time across Clients](https://www.reddit.com/r/webdev/comments/1gbemk8/freelancers_how_do_you_guys_divvy_up_time_between/)
- [Reddit: independent consultants tracking flat-rate project work](https://www.reddit.com/r/consulting/comments/1rew6ez/independent_consultants_how_are_you_tracking_your/)
- [Reddit: scope creep and “one quick question”](https://www.reddit.com/r/consulting/comments/1qax8u0/anyone_else_struggling_with_scope_creep_lately_or/)
- [Hacker News: context-switch trigger is the hard part](https://news.ycombinator.com/item?id=19199719)
- [Capterra: Toggl reviews and aggregated feature feedback](https://www.capterra.com/p/247745/Toggl/reviews/)
- [Timely Memory automatic activity capture](https://www.timely.com/memory-app/)
- [RescueTime productivity report](https://help.rescuetime.com/article/61-the-productivity-report)
- [Rize focus and context-switch analytics](https://rize.io/features/productivity)

External discussions contain self-promotion and cannot establish prevalence. They are used to identify language, counterarguments, and recurring jobs; final claims must remain proportional to the evidence.

I've written my updated understanding to `docs/w0-opportunity-reset.md` — does this match your mental model?
