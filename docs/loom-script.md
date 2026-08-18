# Loom — beat sheet (target 3:30, hard cap 5:00)

**Supersedes `loom-outline.md`.**

**Ground rules from the brief:** camera on · no script-reading (this is a beat sheet — know the beats, say them your way) · going over 5 minutes counts against you. Every bullet the brief grades is mapped below with a ⏱ budget.

**Setup before recording:** window ≥1280px wide · open a fresh incognito tab on `toggl-kit.vercel.app` (so the start screen shows) · dark theme · close everything else. The whole demo is keyboard-driven: `3 → P → Enter` is the golden path.

---

## 0:00 – 0:25 · The hook (the problem, in one story)

*Face on camera, prototype behind you on the start screen.*

> "Hi, I'm Josip. A freelancer quotes a job at three hours. It takes five. Toggl already tells them they went over — but those two extra hours came out of time they'd promised to another client, and today they only find out when they're already late. I built the moment where Toggl tells them *before*."

**Beat:** name the feature — *Make room* — and click **"Walk me through it."**

## 0:25 – 0:55 · Why this area, and why it survives scrutiny

*Talk over the Day 1 screen.*

> "I chose it by elimination. I spent the first hours on a fresh account trying to find something Toggl is missing — and failed eleven times. Estimates, variance, capacity flags, weekly remaining hours — it's all shipped, and it's good. What's missing is that none of it meets: the overrun is in the task drawer, the capacity math is in Timeline behind a manager-framed Premium screen, and nothing connects them. So this isn't a new feature — it's a connection Toggl's own data already supports."

## 0:55 – 1:30 · Day one value (the W0 constraint, shaping the choice)

*You're on Day 1 — the week-over card is visible.*

> "The brief made week-zero retention a hard constraint, and that killed most of my ideas — anything needing history is a month-two feature in a week-one costume. So the demo is an honest first week. Day one: this freelancer signed up Monday with three clients and planned the week — 42 hours committed into a 40-hour week. Toggl computes that number in four places and never says it. Make room says it, and offers three honest ways out — move the one job with no deadline, accept the overtime explicitly, or take the *fact* to the client. Watch the week update."

**Beat:** click **"Move Portfolio polish to next week"** → the roadmap updates live. Then click **Day 3**.

## 1:30 – 2:25 · The core moment (interactions — the golden path)

*Day 3. Prompt is on screen.*

> "Wednesday, the real moment. Homepage revisions was estimated at three hours; three-twelve is logged and it's not done. Here's the design decision I care most about: an overrun is *history* — it can't tell you how much work is left. Maybe I'm done and forgot the timer. So Toggl doesn't guess. It asks."

**Beat:** press **`3`** ("2h left"). Drawer opens.

> "Two more hours have to come from somewhere. Wednesday's now two over, and Toggl names the real consequence — Atlas, due Thursday, no longer fits. And here's the restraint: it only ever suggests moving work with *no deadline*. Toggl may do calendar math; it may not decide which client matters."

**Beat:** press **`P`** — the card visibly moves in preview. Then **`Enter`** — approved, toast with Undo.

> "Preview, approve, undo. Nothing ever moves without my say-so. And notice — the whole thing was three keystrokes."

## 2:25 – 2:50 · The payoff and the return loop (value)

**Beat:** click **Day 5**, point at the week panel.

> "Friday closes the loop: 'You quoted three hours, it took five-twelve — 73% over.' That's a fact about your own pricing that didn't exist Monday — and structurally *can't* exist on day one. That's the retention argument: next to it is Toggl's real activation checklist, which I verified completes in about ninety seconds — 'view your reports' ticks on page load. A week-one measure has to take a week."

## 2:50 – 3:20 · Measurement and impact

*Optionally click **Metrics** in the demo bar.*

> "What I'd measure: the north star is eligible new freelancers tracking or planning on three-plus distinct days in week one, versus a control — not prompts shown; that's something the feature does to people. The first step isn't a build, it's a query: how many week-one freelancers even have two dated, estimated commitments? Under five percent, I don't build this. And the counter-metric I'd watch first: we're adding a question at timer-stop — if tracked hours drop, the feature's net-negative no matter how pretty its funnel is. Business-wise it lands on Toggl's existing Premium fence: the ask is free, the capacity intelligence is the paid moment."

## 3:20 – 3:50 · AI usage, honestly — and close

*Face on camera.*

> "On AI: Claude built and verified everything under one rule — no claim ships unless I reproduced it in the live product. That rule killed eleven of AI's ideas, including ones I liked. I used a second model adversarially — its attack on my earlier concept was right twice, and that's where the 'ask what's left' step came from. And I overrode AI both ways — it misread Toggl's typeface from the CSS until we measured the real computed styles, and it called this concept 'month-two' until I separated product tenure from career tenure. The judgment calls — the persona, the no-auto-move rule, what got cut — those were mine. Thanks — links to the prototype, the insights doc and the repo are below."

---

## If you're running long — cut in this order

1. The checklist comparison inside the Day-5 beat (keep the payoff line itself)
2. The Metrics panel click (say the north star to camera instead)
3. The Monday *renegotiate* option (mention only "three ways out")

**Never cut:** the ask-what's-left rationale · the no-auto-move principle · the eligibility query · the AI-overridden examples.

## Submission text (paste into the answer box)

> Prototype: https://toggl-kit.vercel.app — opens on onboarding; press ? anytime for orientation; the core flow is keyboard-driven (3 → P → Enter).
> Insights: [public artifact link — share it from the artifact page first]
> Source: https://github.com/Tyriel393/toggle [make repo accessible before sending]
> Notes: all data is mock per the brief; every product claim was verified on a live trial account — verification logs are in /docs.
