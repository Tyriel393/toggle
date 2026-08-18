# Loom outline — Make room

> **Working rehearsal draft. Do not read this word for word.** Toggl asks for camera on and natural reasoning. Learn the sequence, keep the prototype visible, and use the suggested wording as prompts.

**Maximum:** 5:00  
**Target recording:** 4:30–4:45  
**Persona:** Freelancer  
**One sentence to leave behind:**

> Tracking should not only explain what happened. It should keep a Freelancer's remaining promises realistic.

---

## 0:00–0:25 — Open on the problem, not the process

**Screen:** prototype already open at the estimate-reached moment. Camera bubble visible.

Say roughly:

> I focused on Freelancers juggling several clients. This started from watching my wife, a UX designer, and developer friends make promises like “twenty hours for this client, ten for another.” When one job runs long, the dangerous part isn't only the overrun. Those hours were quietly borrowed from another commitment.

> My improvement is called **Make room**. It turns “you went over” into “what does that change, and what do you want to do while there is still time?”

Why this framing works:

- It names the persona immediately.
- It gives a personal origin without pretending one anecdote proves prevalence.
- It introduces the consequence rather than listing features.

Do not spend time introducing yourself or reciting the assignment.

---

## 0:25–0:55 — Establish the verified Toggl seam

**Screen:** briefly point to the task variance and mini-week context in the prototype. If useful, use one supporting screenshot—not slides.

Say roughly:

> I tested the current product before deciding what to build. Toggl already shows `over estimate`. Timeline already shows over-capacity. The Workload report already has remaining hours and overtime. But those pieces are passive and separate: no observed workflow asks whether work remains, names the other client commitment affected, and helps the Freelancer replan.

> That distinction matters. I am not proposing another warning, report, forecast, or autonomous scheduler. I am connecting intelligence Toggl already has at one consequential moment.

Honesty guardrails:

- Say **“no documented or observed workflow”**, not “Toggl cannot do this.”
- Never say Toggl lacks remaining hours, overtime, forecasting, capacity, or rescheduling.
- If mentioning Scheduler: “The documented beta currently does not support tracked time or past entries.”

---

## 0:55–2:35 — Demo the product experience

This is the longest section. Let the interface carry the explanation.

### Beat 1 — The trigger

**Action:** show/restart the running Northstar timer, then stop it. The estimate-reached prompt opens.

Say:

> Homepage revisions was estimated at three hours. I have just crossed that estimate, and the task is still open.

### Beat 2 — Establish missing truth

**Action:** point to `Done`, `Need more time`, `Logged to wrong task`, `Not sure yet`. Choose `Need more time`.

Say:

> Going over does not mean Toggl knows what happens next. I might be done, I might have tracked against the wrong task, or I might still need more time. So the first step is not an alarm. It is one honest question.

**Action:** choose `2h left`.

> I said two hours remain. Notice that the original three-hour estimate stays visible. I don't rewrite history and erase the fact that the estimate was wrong.

### Beat 3 — Name the consequence

**Action:** show the mini-week calculation and named collision.

Say:

> With that missing input, Toggl can now explain the consequence: Wednesday is two hours over, and Atlas no longer has a slot before Thursday's handoff.

> This is conditional, not blame. Toggl shows what collides; it does not decide which client matters more.

### Beat 4 — Make room

**Action:** open `Make room`; show the recommended move and its reasoning.

Say:

> The safest available move is Portfolio polish. It has no deadline, and Friday has capacity, so moving it does not put another dated promise at risk.

**Action:** preview the before/after week, then approve.

> Nothing moves until I approve it. Client commitments are never changed behind my back.

**Action:** point to Undo.

> And the change is reversible. Undo restores the schedule, but keeps the two hours I confirmed—the truth about the work did not disappear.

### Optional ten-second trust beat

Only if the recording is under time:

**Action:** switch to the `Still fits` scenario.

> If the extra work still fits, Toggl says so and moves nothing. A tool that only warns becomes noise; showing “you're fine” is what makes the warning credible.

---

## 2:35–3:10 — Explain W0 value and return

**Screen:** remain on the updated feasible week. Do not switch to slides.

Say roughly:

> Week zero is product tenure, not career tenure. A Freelancer joining Toggl already has clients and deadlines. Toggl can import an existing task list from text or a screenshot.

> So the first-week sequence is credible: bring in the week on day one, track on day two, discover an overrun on day three, and protect a commitment while there is still time to act.

> The reason to return is not the warning itself. Continued tracking now keeps the remaining plan honest. One avoided near-miss demonstrates a value that grows every time the user tracks again.

Avoid claiming that every new Freelancer qualifies. Immediately acknowledge the segment:

> This is for planning-oriented Freelancers who use dates and estimates. The size of that eligible cohort is the biggest assumption in the bet.

---

## 3:10–3:40 — Prioritization and trade-offs

**Screen:** show the narrow flow or the scenario control.

Say roughly:

> I deliberately kept the scope to one handoff: actual work changes the plan, and the user decides what moves.

> I left out onboarding redesign, invoicing, mobile, team workflows, and autonomous AI scheduling. I also rejected the retrospective “review and categorize your day” direction. This acts before a second promise breaks.

> The key trade-off is friction. Asking a question after timer stop can become a nag. That is why it is non-blocking, appears only when an unfinished task reaches its estimate, supports Done, Not sure, and wrong-task paths, and does not repeat without meaningful new activity.

Optional design trade-off if time allows:

> I preserve the original estimate separately from remaining effort. Updating the original to make the plan fit would destroy the learning the time record is supposed to create.

---

## 3:40–4:15 — Measurement and kill criteria

Keep this to three layers and one guardrail sentence.

Say roughly:

> First I would measure reach: how many new Freelancers actually become eligible by creating or importing dated, estimated work. I would not invent a baseline.

> The value metric is the percentage of detected conflicts returned to a feasible plan before the affected deadline.

> The W0 outcome is whether eligible exposed users return for meaningful tracking or planning on a later day in their first week, compared with a matched eligible control.

> Guardrails are dismissals, selecting Done simply to silence the prompt, immediate undo, work pushed past deadlines, and increased planned overtime. I would kill or reframe the concept if the eligible cohort is too small, remaining effort is rarely confirmed, or it resolves conflicts without improving first-week return.

Do not list every supporting metric from `plan.md`.

---

## 4:15–4:45 — AI use and personal judgment

**Screen:** prototype, optionally with the rationale open in another tab only if switching is instant.

Say roughly:

> I used AI extensively for product reconnaissance, adversarial research, interaction exploration, and building the prototype. But the useful part was not accepting its first answer—it was testing and rejecting it.

> AI initially pushed toward retrospective categorization, assumed Toggl lacked capacity warnings, overstated a first-hour reporting bug, and misread parts of the project flow. Browser testing corrected each one. Finding the existing Workload report was especially important because it forced me to narrow the claim rather than pitch something Toggl already has.

> AI helped me search broadly and move quickly. My judgment was choosing the Freelancer, grounding the problem in people I know, setting the trust boundary, preserving the original estimate, and cutting the experience to one user-approved decision.

Only mention corrections you can defend with captured evidence.

---

## 4:45–4:55 — Close on the insight

**Screen:** final feasible week with the success toast visible.

Say:

> The result is small on purpose: Toggl already explains the past. Make room helps a Freelancer keep the promises still ahead realistic.

Stop. Do not add a generic thank-you monologue.

---

## Recording setup checklist

- Prototype opens cold at the estimate-reached prompt.
- `Restart demo`, golden path, still-fits path, approval and Undo all work.
- Camera bubble does not cover the right-hand drawer or buttons.
- Browser zoom and screen resolution keep all primary actions visible.
- Notifications, email and chat popups are disabled.
- Use a clean browser window with no personal tabs visible.
- Test microphone level and cursor visibility.
- Confirm the deployed URL works in a private window.
- Confirm the Loom link is public.
- Record one rehearsal against a 4:30 timer before the final take.

---

## If the first rehearsal runs long

Cut in this order:

1. Remove the optional still-fits demo; name it in one sentence.
2. Remove the detailed Scheduler sentence.
3. Reduce AI corrections to two examples: capacity warning and Workload report.
4. Reduce the trade-off section to friction + preservation of the original estimate.

Never cut:

- the working prototype demonstration;
- why the problem creates W0 value;
- prioritization and deliberate omissions;
- one value metric, one W0 outcome, and kill criteria;
- where you overrode AI.

