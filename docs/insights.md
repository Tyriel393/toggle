# Make room — insights

**Josip Gajsak · Toggl Focus home assignment · August 2026**

- **Prototype:** https://toggl-kit.vercel.app (opens on onboarding; keyboard-complete; `?` re-opens orientation)
- **Source:** https://github.com/Tyriel393/toggle
- **Persona:** Freelancer · **Constraint:** W0 retention, treated as hard

---

## The one-sentence pitch

> Toggl already tells a freelancer when a job ran past its estimate. It never tells them what that overrun just cost — which client promise those hours were silently borrowed from. **Make room** asks what's left, names the commitment that no longer fits, and helps replan it while there is still time to act.

---

## 1 · How I picked this problem

I didn't start with this idea. I signed up for a new account, went through onboarding properly, then spent a few hours going through features looking for something Toggl was missing. I kept not finding one. That turned out to be the useful result. Ten of the checks below I ran in the product myself; the eleventh (task rescheduling) comes from Toggl's own docs, because the Scheduler beta wasn't enabled on my trial.

Client goals, Focus mode, Pomodoro, inline capture, calendar sync, daily-brief emails, estimate capture, estimate-vs-actual variance, over-capacity flags, remaining-hours, task rescheduling — every "Toggl is missing X" idea I had turned out to be wrong. Estimates are the third field in the New task drawer. Variance renders beautifully, unprompted, with no paywall. Timeline flags an over-booked day in the error colour. The Workload report computes weekly remaining hours and overtime.

What survived every test is a different claim:

> **Toggl has the capability. The pieces just don't talk to each other.**

The overrun lives in the task drawer. The capacity math lives in Timeline — behind Premium, framed for managers ("invite your team to see who's at capacity"). The weekly number exists in four places (Timeline lane, capacity filter, Workload report, working-hours field) and is *acted on in none*. Blowing an estimate does not make your Wednesday go red. Nothing connects what happened to what it now puts at risk.

For a freelancer — whose brief-stated pains are *avoiding overcommitment* and *planning realistically* — that seam is the product. So this isn't a new feature. It's a connection: **the overrun → what's actually left → which client commitment that breaks → a fix the freelancer approves.**

### Why it has to ask

An overrun is history. A task at 4h logged against a 3h estimate might be finished (timer left running), mislogged, or genuinely unfinished — and there is nowhere to record what remains: the task drawer exposes only Logged, Planned and Estimate (reproduced live), and Toggl's published API docs list no remaining-effort field. So the system cannot infer risk; it must **ask**: *"Done, or how much is left?"* So it has to ask. That question is the difference between this and a simple `logged > estimate` alarm, and the answer is data Toggl has never collected.

---

## 2 · Why they come back

Week-zero retention is what killed most of my other ideas, so I want to be specific about how this one survives it.

**W0 means new to Toggl, not new to freelancing.** The target user signs up on Monday already carrying clients and deadlines. The prototype shows the honest first week:

- **Setup — the number everything rests on.** Onboarding asks how long their week actually is, because Toggl's own working-hours field ships unset and the product still asserts 40h. A four-day freelancer would otherwise get wrong warnings all week.
- **Day 1 — value before any tracking.** The week is planned: 42h of committed work against their stated week. Toggl already knows the weekly number; Make room finally says it — *"your week is 2h over before it starts"* — and offers three honest ways out: move the one job with no deadline, accept the overtime explicitly, or take the *fact* (not an auto-drafted message) to the client. Choosing one updates the week live. That is value on day one, at the cheapest moment the problem will ever be fixable.
- **Day 3 — the moment.** A job runs past its estimate. Toggl asks what's left, computes that Wednesday no longer fits, names the deadline at risk (*Atlas — Final handoff, due Thursday*), and offers the one safe move. Preview → approve → undo.
- **Day 5 — the payoff that requires a week.** *"You quoted Homepage revisions at 3h. It took 5h 12m — 73% over."* A fact about their own pricing that did not exist on Monday, and structurally *cannot* exist on day one.

The return logic is not a notification (Toggl already ships two, on by default). It is that **continued tracking is what keeps the plan honest** — every session either confirms the week still fits or catches a collision early. The contrast is built into the UI: Toggl's real activation checklist (every item completes on a single interaction; "View your reports" ticks on page load — verified) sits beside a week-shaped arc that cannot be finished in one sitting.

---

## 3 · What I left out

Roughly in order of how much I wanted to build them:

- **Automatic rescheduling.** Motion and Reclaim auto-move work; Toggl's own Scheduler beta reshuffles tasks. I rejected the whole category on principle: **a dated task is a client promise, not a preference.** Toggl may reason about time; it may not decide which client matters. The rule I shipped instead: only work *with no deadline* is ever suggested, alternatives are shown with their cost, and "keep it, I'll work over" is a legitimate answer. Notably, Toggl documents its Scheduler as unable to use tracked time — Make room is precisely the bridge that limitation leaves open.
- **The Individual Contributor persona.** Their strongest W0 pain ("Toggl isn't where I work") honestly resolves to *surface the browser extension earlier* — placement, not product.
- **The "review and categorise your day" direction.** Retrospective cleanup is the obvious AI answer and adds admin. Everything here is forward-looking.
- **New notifications, mobile layout, rebuilt reports.** Toggl ships two default nudges already; Toggl 2.0 web literally gates small screens ("works better on bigger screens" — verified in its DOM), so the prototype mirrors that and names the honest split: the *ask* belongs on a phone as an actionable notification, the *replan* is desktop work. And I never rebuilt variance, capacity, or Workload — they exist; the work is connecting them.
- **A production backend.** Mock data, as invited. The real build needs exactly one new field (`confirmed_remaining_mins` — never overwriting the original estimate, because the gap between them *is* the evidence) and one new object (a `plan_repair` log, which is what makes regret measurable).

**Assumptions:** Toggl's working-hours field ships **unset** while Workload still asserts a 40h week — so every capacity warning it could give a four-day freelancer would be wrong by construction. Rather than assume the number, the prototype **asks for it during setup** (40h · 32h · part-time, recalculating live) and cites the source of every capacity figure afterwards. That step is small and easy to miss, but the entire feature rests on that number being true. Both onboarding intents beyond the one I tested, and the Dashboard's documented completion-forecast, are labelled as documented-not-observed wherever they matter.

---

## 4 · How I would measure it

**North star:** among *eligible* new freelancers, the share who track or plan on **3+ distinct days in their first 7**, against a matched control. Not prompts shown or moves approved. Those are things the feature does to people. This is something people do.

**The first step is a query, not a build.** The biggest risk here is eligibility: how many week-one freelancers ever have two dated, estimated commitments at the same time? Toggl's existing data can answer that in a day of SQL, before anyone writes feature code.

I would run it first and agree the go/no-go line before seeing the result, so nobody can argue with the number afterwards. If the eligible share is small, that finding is worth more than the feature: it would mean week-one freelancers aren't planning at all, which is a bigger problem than this one.

The step everything rests on is `remaining_confirmed`, because it's the only one that asks the user to believe something. Watch the mix of answers: a high "Done" rate on tasks that get reopened later means people are dismissing the question, not answering it.

**Three metrics beyond the funnel.** Two of them Toggl can compute from data it already holds, and I would baseline both before building anything. The third needs the plan-repair log this feature creates:

- **Replan lead time** *(needs the new plan-repair log)* — days between detecting a collision and the deadline it threatened. It's the best single proxy for the whole idea, because the value isn't the warning, it's the warning arriving early enough to act on. A median under a day would mean we built a late-warning system and failed on our own terms.
- **Weekly over-commitment rate** *(computable today)* — % of freelancer weeks planned above capacity. Toggl already has dated tasks, estimates and working hours. Worth baselining now, because it sizes the Day-1 problem before a line of code is written.
- **Estimate calibration trend** *(computable today)* — does per-client variance shrink week over week? Toggl already holds estimates and logged time. What changes is that the feature gives someone a reason to care. This is the part that compounds, and the reason the original estimate is never overwritten.

**The counter-metric that could sink it:** we're adding a question to timer-stop, the most-used interaction in the product. If tracked hours drop in the exposed group, the feature is net-negative however well its own funnel performs. Other guardrails: moves undone within 24h (regret), overtime trending up (we taught absorption instead of replanning), capacity figures corrected (our arithmetic isn't trusted).

**Kill criteria:** eligible cohort too small to justify the surface · tracked hours drop · collisions seen but nothing changes · no W0 return lift. **Ship order:** the query → the ask alone (zero-risk, starts collecting remaining-effort data) → consequence and repair.

**On the business side:** Timeline and Workload are already Premium, so capacity is where Toggl draws the paid line. Asking what's left stays free. Seeing the consequence and fixing it is the paid moment, and it arrives when someone actually feels the problem rather than on a pricing page. Every answer collected also improves estimates, capacity and forecasting, which outlasts the feature itself.

---

## 5 · How I used AI — and where I overrode it

The brief asks about AI use, so plainly:

- **Claude did the building and the checking.** The rule I worked to was that nothing goes in this document as fact unless I'd reproduced it in the live product. That rule killed most of the hypotheses above, including a few I liked.
- **I used ChatGPT to argue against me, not with me.** Its most useful contribution was four attacks on an earlier version of this idea. Three were testable in Toggl within minutes, two landed, and the idea died. It also caught that my original claim — overrun means the deadline is at risk — doesn't actually hold, which is where the confirm-what's-left step came from. That step is the whole design.
- **I overrode it in both directions.** It read Toggl's CSS and told me the brand typeface. I pushed back, we measured what actually renders, and it was Inter, so the design system was rebuilt from measurements. Later it decided the concept was a "month two" feature. I disagreed — week zero means new to Toggl, not new to freelancing — and moved that risk into the measurement plan instead of letting it kill the idea.
- **I had AI review AI.** A 20-agent adversarial pass over my own build produced 16 findings; 10 held up and were fixed, including a focus-restore that was dead code and a success state that hid a week still over capacity.

Where AI helped: coverage, speed, and checking things faster than I could alone. What I decided: the persona, the moment to intervene, the rule that Toggl never moves work on its own, what got cut, and every claim allowed into this document.

---

## 6 · What I ran out of time for

Check whether Timeline warns *before* you drop a task on a full day — I only confirmed it warns afterwards. Sign up a second account picking a different onboarding intent, to see whether "we'll tailor your experience" means anything. Run the validation script I wrote for a handful of freelancer friends, asking about their behaviour before showing them the concept. Build the phone version of the question as a real notification. And revisit this once the Scheduler beta is switched on, since it's missing exactly the trigger this provides.

---

*Everything I claim about Toggl above I either reproduced on a trial account myself, or have marked as documentation-only.*
