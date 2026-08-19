# Make room — insights

**Josip Gajsak · Toggl Focus home assignment · August 2026**

- **Prototype:** https://toggl-kit.vercel.app (opens on onboarding; keyboard-complete; `?` re-opens orientation)
- **Source:** https://github.com/Tyriel393/toggle
- **Persona:** Freelancer · **Constraint:** W0 retention, treated as hard

---

## The one-sentence pitch

> Toggl already tells a freelancer when a job ran past its estimate. It never tells them what that overrun just cost — which client promise those hours were silently borrowed from. **Make room** asks what's left, names the commitment that no longer fits, and helps replan it while there is still time to act.

---

## 1 · How I chose this area — by killing everything else

I didn't start with this idea. I started by using the product — a fresh account, the full onboarding, then days of testing — and by trying to find something Toggl *lacks*. That search failed eleven consecutive times, and the failures turned out to be the insight.

Client goals, Focus mode, Pomodoro, inline capture, calendar sync, daily-brief emails, estimate capture, estimate-vs-actual variance, over-capacity flags, remaining-hours, task rescheduling — every "Toggl is missing X" hypothesis died on contact with the live product. Estimates are the third field in the New task drawer. Variance renders beautifully, unprompted, with no paywall. Timeline flags an over-booked day in the error colour. The Workload report computes weekly remaining hours and overtime.

What survived every test is a different claim:

> **Toggl is not missing capability. Its capabilities never meet.**

The overrun lives in the task drawer. The capacity math lives in Timeline — behind Premium, framed for managers ("invite your team to see who's at capacity"). The weekly number exists in four places (Timeline lane, capacity filter, Workload report, working-hours field) and is *acted on in none*. Blowing an estimate does not make your Wednesday go red. Nothing connects what happened to what it now puts at risk.

For a freelancer — whose brief-stated pains are *avoiding overcommitment* and *planning realistically* — that seam is the product. So the improvement is not a new feature. It is a connection: **actual drift → confirmed remaining work → named cross-client consequence → user-approved repair.**

### The design insight that makes it safe

An overrun is history. A task at 4h logged against a 3h estimate might be finished (timer left running), mislogged, or genuinely unfinished — and Toggl's task model has **no remaining-effort field** (verified against the API). So the system cannot infer risk; it must **ask**: *"Done, or how much is left?"* That one question is what separates Make room from a dumb `logged > estimate` alarm — and the answer becomes data Toggl has never had.

---

## 2 · Why a first-week user comes back

W0 was the filter that killed most alternatives, so I want to be precise about how this passes it.

**W0 means new to Toggl, not new to freelancing.** The target user signs up on Monday already carrying clients and deadlines. The prototype shows the honest first week:

- **Day 1 — value before any tracking.** The week is planned: 42h of committed work against a 40h week. Toggl already knows the weekly number; Make room finally says it — *"your week is 2h over before it starts"* — and offers three honest ways out: move the one job with no deadline, accept the overtime explicitly, or take the *fact* (not an auto-drafted message) to the client. Choosing one updates the week live. That is value on day one, at the cheapest moment the problem will ever be fixable.
- **Day 3 — the moment.** A job runs past its estimate. Toggl asks what's left, computes that Wednesday no longer fits, names the deadline at risk (*Atlas — Final handoff, due Thursday*), and offers the one safe move. Preview → approve → undo.
- **Day 5 — the payoff that requires a week.** *"You quoted Homepage revisions at 3h. It took 5h 12m — 73% over."* A fact about their own pricing that did not exist on Monday, and structurally *cannot* exist on day one.

The return logic is not a notification (Toggl already ships two, on by default). It is that **continued tracking is what keeps the plan honest** — every session either confirms the week still fits or catches a collision early. The contrast is built into the UI: Toggl's real activation checklist (all four items completable in ~90 seconds — "View your reports" ticks on page load, verified) sits beside a week-shaped arc that cannot be finished in one sitting.

---

## 3 · What I deliberately left out

The brief asks what I cut. In rough order of how tempting each was:

- **Automatic rescheduling.** Motion and Reclaim auto-move work; Toggl's own Scheduler beta reshuffles tasks. I rejected the whole category on principle: **a dated task is a client promise, not a preference.** Toggl may reason about time; it may not decide which client matters. The rule I shipped instead: only work *with no deadline* is ever suggested, alternatives are shown with their cost, and "keep it, I'll work over" is a legitimate answer. Notably, Toggl documents its Scheduler as unable to use tracked time — Make room is precisely the bridge that limitation leaves open.
- **The Individual Contributor persona.** Their strongest W0 pain ("Toggl isn't where I work") honestly resolves to *surface the browser extension earlier* — placement, not product.
- **The "review and categorise your day" direction.** Retrospective cleanup is the obvious AI answer and adds admin. Everything here is forward-looking.
- **New notifications, mobile layout, rebuilt reports.** Toggl ships two default nudges already; Toggl 2.0 web literally gates small screens ("works better on bigger screens" — verified in its DOM), so the prototype mirrors that and names the honest split: the *ask* belongs on a phone as an actionable notification, the *replan* is desktop work. And I never rebuilt variance, capacity, or Workload — they exist; the work is connecting them.
- **A production backend.** Mock data, as invited. The real build needs exactly one new field (`confirmed_remaining_mins` — never overwriting the original estimate, because the gap between them *is* the evidence) and one new object (a `plan_repair` log, which is what makes regret measurable).

**Assumptions, stated:** capacity defaults to 8h/day because Toggl's working-hours field is unset by default yet Workload still asserts 40h — so the prototype cites the source of every capacity number and offers to correct it. Both onboarding intents beyond the one I tested, and the Dashboard's documented completion-forecast, are labelled as documented-not-observed wherever they matter.

---

## 4 · How I'd measure it

**North star:** among *eligible* new freelancers, the share who track or plan on **3+ distinct days in their first 7**, against a matched control. Deliberately not prompts-shown or moves-approved — those are things the feature does to people; the north star is something people do.

**The first step is a query, not a build.** The concept's biggest risk is eligibility: how many week-one freelancers ever have two dated, estimated commitments? Toggl's data answers that in a day of SQL. Over ~15%: build as scoped. 5–15%: the onboarding step that asks for dates and estimates becomes the primary work. **Under ~5%: don't build this** — fix why week-one users have no plan first.

**The load-bearing step** is `remaining_confirmed` — the only step requiring belief. Watch the *mix*: a high "Done" rate on tasks later reopened means people are dismissing, not answering.

**Three metrics this flow makes possible that Toggl cannot measure today** — each worth more than the funnel, because each only exists once remaining effort is captured and plan repairs are logged:

- **Replan lead time** — days between detecting a collision and the deadline it threatened. This is the best single proxy for the whole pitch: the value isn't that we warned, it's that we warned *early*. A median under a day means we built a late-warning system and failed on our own terms.
- **Weekly over-commitment rate** — % of freelancer weeks planned above capacity. Measurable *today*, before building — it sizes the Day-1 problem the way the eligibility query sizes the Day-3 one.
- **Estimate calibration trend** — does per-client variance shrink week over week? The compounding value, and precisely why the original estimate is never overwritten.

**The existential counter-metric:** we are adding a question at timer-stop, the most-used interaction in the product. If tracked hours drop in the exposed group, the feature is net-negative no matter how well its own funnel performs. Other guardrails: moves undone within 24h (regret), overtime trending up (we taught absorption instead of replanning), capacity figures corrected (our arithmetic isn't trusted).

**Kill criteria:** eligible cohort under ~5% · tracked hours drop · collisions seen but nothing changes · no W0 return lift. **Ship order:** the query → the ask alone (zero-risk, starts collecting remaining-effort data) → consequence and repair.

**Business case:** capacity intelligence is already Toggl's Premium fence (Timeline ★, Workload ★). The ask stays free; the consequence-and-repair is the paid moment, arriving when the pain is felt rather than on a pricing page. And every confirmed remainder improves estimates, capacity, forecasting and the Scheduler — the data asset outlasts the feature. It is also, literally, Toggl's stated 2.0 thesis — *"do we have the capacity to take this on?"* — delivered to one person.

---

## 5 · How I used AI — and where I overrode it

AI fluency is part of the brief, so honestly:

- **Claude (agentic) built and verified everything** — but the working rule that mattered was *no claim ships without being reproduced in the live product*. That rule executed ~30 live checks and killed eleven AI-generated hypotheses, including several I was attached to.
- **A second model (ChatGPT) was used adversarially**, not as a co-writer. Its best contribution was four "killers" against an earlier idea — three were testable in-product within minutes, two landed, and the idea died. It also caught that my original causal claim ("overrun ⇒ deadline at risk") was unsafe, which produced the confirm-what-remains step — the heart of the design.
- **I overrode AI in both directions.** Early on, AI read Toggl's CSS `@font-face` and reported the brand typeface; I pushed on it, we measured the computed styles, and the app actually renders Inter — the extracted design system was rebuilt on measurements, not source-reading. Later, an AI verdict declared the concept "a month-two feature"; I rejected the framing — W0 is product tenure, not career tenure — and the eligibility risk moved into the measurement plan where it belongs, instead of killing the idea.
- **AI reviewed AI:** a 20-agent adversarial pass over my own build produced 16 findings; 10 survived verification and were fixed — including a focus-restore mechanism that was provably dead code and a success state that hid a still-broken week.

Where AI guided: breadth, speed, and relentless verification. Where I decided: the persona, the seam, the no-auto-move principle, what got cut, and every claim that was allowed into this document.

---

## 6 · With more time

Test whether Timeline warns *before* a drag commits (post-hoc is verified; pre-commit isn't) · a second account per onboarding intent, to test the "we'll tailor your experience" promise · run my prepared friend-validation script (behaviour-first, concept hidden until after) · the mobile ask as a real actionable notification · revisit once the Scheduler beta is enabled, since Make room is the trigger it lacks.

---

*Every capability claim above was either reproduced live on a trial account or is explicitly labelled as documented-only. The full verification logs are in the repo: `pre-plan-verification.md`, `plan-reality-check-deep-research.md`, `integration-map.md`, `measurement-plan.md`, `user-flow-map.md`.*
