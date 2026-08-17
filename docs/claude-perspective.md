# Claude's perspective — pre-brief

**Status: written before the brief exists.** Everything here is grounded in our own evidence — the 57-observation walkthrough, the 33 verified UX findings, the accessibility audit, and the company research. None of it is grounded in what Toggl actually asked for, because that arrives tomorrow.

**So treat it as ingredients, not a recipe.** Realistically the brief kills two of the three directions below. That's fine — §1 and §4 survive almost any brief, and they're the parts worth reading twice.

**How to use it:** take a sentence, an angle, a metric. Don't take a direction whole. If you build my proposal you submit my thinking, and they grade yours.

---

## 1. Insight candidates — the part that survives any brief

Their bar is *"one insight that makes us think: I wouldn't have seen that."*

The test I'd hold: can you finish **"Most people would assume X — actually Y"** with something a candidate who spent 20 minutes in the app could not say? Each of these came out of our specific evidence.

### A. Toggl plans against contracted hours while sitting on observed hours

> Most people would assume the world's most trusted time tracker plans capacity against how much people *actually* work — actually it plans against how much they're *contracted* to work.

`Timeline` says **"40h free"** for a 40h week and **"6h 48m"** per day against an 8h day. That's contract math. Meanwhile the product holds four weeks of evidence that nobody logs 8.0h — meetings, admin, context-switching, and the plain fact that tracked hours run well below contracted ones.

So the planning layer is optimistic *by construction*, in the one product that has the data to know better. Their own marketing names the symptom — deadlines on "gut feel", teams burning out because capacity is ignored — while the capacity number itself is a gut feel dressed as arithmetic.

**Why it's not the AI-default:** it requires having read the capacity math off a live Timeline lane and noticed it's derived from `workingHours`, not from history. It also inverts their marketing rather than repeating it.

### B. The foundation of "time intelligence" is optional

> Most people would assume the entry↔task join is required — actually the fastest way to track produces data that feeds none of the intelligence layer.

Type into "What are you working on?", hit play: you get an entry with a description and maybe a project. Attaching a **task** takes a separate optional button. But every intelligence surface joins on the task — the Logged/Planned/Estimate triptych, the `MEMBER|TASK` report grain, `ESTIMATED TIME` as a column.

And **estimate-vs-actual is the headline $16/seat Premium gate.** The top rung of the monetisation ladder depends on a join the product never requires, never prompts for, and never reconciles.

⚠️ **Handle with care.** This is adjacent to the poisoned "review today / categorize logged time" flow. The difference is framing: that flow is *backward-looking hygiene chore*. This observation is about *whether the number you're being sold can be trusted*. If you use this, you must land on the trust framing, not the chore framing — otherwise you're in the graveyard with the other candidates.

### C. Auto-log time manufactures actuals from plans

> Most people would assume "actual time" means time someone actually spent — actually a default-on setting converts planned slots into logged time.

`Auto-log time` sits in a per-task `⋮` menu, marked "Global setting active", disclosed by a single `ⓘ`. When on, planned time becomes logged time without anyone tracking anything.

For a company whose entire pitch is **"real data" vs "spreadsheet guesses"**, a default that turns guesses into data is a strategically loaded piece of design. It may well be a deliberate, good trade for adoption — but it's undisclosed at the moment it matters, and it silently changes what every downstream number means.

**Why it's not the AI-default:** you only find this by opening a saved task's overflow menu and reading a tooltip.

### D. Capacity is blind to leave unless you pay extra

> Most people would assume a capacity planner knows who's on holiday — actually that costs $2/user/month on top.

Time off is a **separate paid add-on**, paywalled even on the Premium trial, marketed as *"Time off that powers capacity planning — approved leave automatically reflected in team capacity."*

Which is an explicit admission: **without it, capacity is wrong.** Free and Starter users are planning against a number that ignores holidays.

### E. The product's best feature has no front door

> Most people would assume the feature the product was *named after* is in the navigation — actually Focus mode exists only behind an undocumented `F` keypress, and it's sold on the Free tier.

Named on their pricing page. Hosted at `focus.toggl.com`. Zero pixels of chrome. Press `F` without a running timer and nothing happens, silently.

---

## 2. Three direction sketches

Deliberately thin. Enough to react to, not enough to build from. Each names what's missing that only you can supply.

### Direction 1 — Capacity you can believe

**Insight:** A. Plan against observed capacity, not contracted.

**Shape:** the Timeline lane stops claiming "40h free" and starts showing what history says is actually available — with the assumption visible and adjustable rather than hidden in a `workingHours` field.

**Why it fits Toggl:** it is *literally* their thesis — better tracking → better data → better planning. It uses tracking data to fix a planning number. Nobody else in the market can do it, because Float and Runn don't own the tracker.

**Ladder:** strengthens Free→Starter (capacity is the Starter gate).

**Measure:** planned-vs-actual variance per person per week. Baseline it on the mock data. Target: variance narrows. Kill criterion: if plans get *less* accurate, the historical baseline is wrong and you revert.

**What only you can add:** whether an agency lead would trust a computed capacity number or feel patronised by it. That's a judgment about how planners actually think, and I don't have it.

---

### Direction 2 — Know whether the number is real

**Insight:** B + C. Trust in the intelligence layer, not entry hygiene.

**Shape:** where the product shows a number that depends on joins and settings (variance, utilization, profitability), it also shows what that number is built from — how much is tracked vs auto-logged, how much is attached to a task vs floating.

**Why it fits Toggl:** they sell "real data vs spreadsheet guesses". This makes the realness legible at the point of decision.

**Ladder:** protects Starter→Premium — the tier people churn from when they stop believing the reports.

**Measure:** trust is hard to instrument. Proxy: do people act on a report after seeing provenance — export, filter, change a plan? Leading indicator, and say so.

**⚠️ The trap:** one wrong turn and this becomes "review your uncategorized time," which is the poisoned flow. The discipline is that it must never become a chore list. If it renders as a queue of things to fix, you've built the generic answer.

**What only you can add:** whether a PM or agency lead actually distrusts these numbers today, or whether they never look closely enough to doubt them. If it's the latter, this direction is solving a problem nobody feels.

---

### Direction 3 — The estimate feedback loop

**Insight:** adjacent to A. Estimation is a skill; the product has the data to teach it and doesn't.

**Shape:** `VARIANCE` exists as a column, so the product knows you estimated 6h and spent 11h. Nothing closes that loop — nobody learns, and the next estimate is as bad as the last. Their own copy names the pain: deadlines set on "gut feel", proposals priced on "hope."

**Why it fits:** forward-looking rather than backward hygiene, which is what puts real distance between it and the poisoned flow.

**Ladder:** strengthens Premium (estimate-vs-actual is the headline gate).

**Measure:** estimate accuracy over successive estimates by the same person. Requires several cycles — say so honestly rather than pretending it's a week-one metric.

**What only you can add:** at PwC you restructured ~100 backlog items into a 32-item MVP — you have real, non-hypothetical intuition about how estimates go wrong and whether anyone would actually change behaviour from feedback. That's a genuine edge and it's yours, not mine.

---

## 3. What I'd cut, in all three

Scope discipline is on-strategy — "no bloat" is their stated positioning, twice. Say the cut once, confidently.

- No settings screen. One sensible default, adjustable inline if at all.
- No onboarding, no tour, no empty-state education. They open it cold and it must read in a minute.
- No new nav section. Build **into** an existing surface — that's an explicit requirement.
- No second view. If it needs two screens to make sense, it isn't focused enough.
- No AI. Toggl ships AI surfaces already; adding one is the fastest route to looking generic.

---

## 4. Metrics kit — brief-independent, use it regardless

You flagged metrics, and this is your known weak spot: **93% closed / 55% open**, with the gap being *"I would measure X"* without saying what X decides.

### Every metric claim gets five parts

| Part | The question it answers | Failure mode |
| --- | --- | --- |
| **Baseline** | What is it now? | "Improve engagement" — from what? |
| **Target** | What counts as success? | No threshold = unfalsifiable |
| **Attribution** | How do you know it was *your* change? | Correlation dressed as cause |
| **Trade-off** | What got worse, or what you gave up | Claiming pure upside |
| **Decision rule** | *If X → scale. If Y → kill.* | The one you keep dropping |

Say the numbers are illustrative when they are. Inventing precise figures for a mock prototype reads worse than saying "I'd baseline this in week one."

### Metric shapes that fit Toggl specifically

Pick the row that matches whatever the brief targets:

| If the brief is about… | Leading indicator | Lagging / business |
| --- | --- | --- |
| Capacity / planning | % of people whose plan is within ±10% of actual | Starter conversion; retained after week 4 |
| Estimates | Estimate accuracy trend across successive estimates | Premium conversion (estimate-vs-actual is that gate) |
| Tracking habit | Days tracked per week; time-to-first-track | Week-4 retention |
| Reporting / trust | Report → action rate (export, filter, plan change) | Premium churn |
| Onboarding / activation | % reaching first *useful* report, not first click | Free→paid |

### Two framings that will land with them

**Speak to the ladder.** Free→Starter is *team capacity*; Starter→Premium is *money questions*. Naming which gate you strengthen converts a feature argument into a business one — and it's the language a bootstrapped company actually uses.

**Bootstrapped changes the vocabulary.** No VC since 2007. "Massive growth" is not their scoreboard. **Conversion, expansion, retention, efficiency** are.

### The kill criterion — the single highest-leverage sentence

Your post-mortem says you stop at measurement and don't state the decision. So make it explicit and slightly uncomfortable:

> *"If after four weeks fewer than X% of teams whose plans are inside ±10% — I'd kill it rather than iterate, because the hypothesis was that people would trust a computed number, and that would be the disproof."*

Naming what would make you **abandon your own idea** is the strongest possible signal of product judgment, and almost no candidate does it.

---

## 5. How I'd want you to use this

1. **Read the brief and form your view first.** Don't open this file until you have one.
2. **Then read §1 only.** The insight candidates are the durable part.
3. **Steal a sentence, not a direction.** If one of the "most people would assume X" lines sharpens your own idea, use it — in your words, tested against your friction log.
4. **Ignore §2 unless the brief points straight at it.** Those are guesses written blind.
5. **Use §4 regardless.** The five-part metric structure and the kill criterion apply to whatever you build.

The honest summary: **§1 and §4 are worth your time. §2 probably isn't, and I'd rather say so than pretend I've solved a brief I haven't read.**
