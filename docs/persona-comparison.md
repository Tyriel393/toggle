# Persona comparison — IC vs Freelancer, W0-filtered

**Purpose:** the brief names two personas. We anchored on one without seriously testing the other. This compares both against the constraints that actually decide the assignment.

**Method:** brief text verbatim, plus what we have *verified in the product* (`w0-first-run.md`, `ux-raw-observations.md`, `product-map.md`). Opportunities are only listed where we have evidence, and marked **UNVERIFIED** where we don't.

**Date:** 2026-08-18, brief open, clock running.

---

## 0. The scoring criteria

Every opportunity below is judged on six things, in this order of importance:

| # | Criterion | Why it decides |
| --- | --- | --- |
| 1 | **W0 fit** | Hard constraint. "Your solution must change what a user experiences in week one." If the pain lands in month three, it's out. |
| 2 | **Firsthand evidence** | "If it's clear you didn't use Toggl Focus beyond a surface glance, that's a dealbreaker." |
| 3 | **Distance from the AI-default** | The "review today / categorize" graveyard. |
| 4 | **Showcase-ability** | Must read cold in 60s, no narration, and be buildable in ~6h frontend-only. |
| 5 | **Measurability** | Needs a behavioural metric with a real kill criterion. |
| 6 | **Strategic fit** | Toggl's ladder: Free→Starter is team capacity, Starter→Premium is money questions. |

---

## 1. The two personas, as Toggl defines them

### Individual Contributor (aka Independent Contractor)

> "…often work **embedded within client organizations**, usually on **longer-term engagements**. They need to track their time accurately so they can demonstrate value, protect contractual boundaries, maintain compliance, and justify their rates or renewals."
>
> Challenges: **scope creep, untracked collaboration time, working across client tools**, proving productivity remotely, keeping a clear record of what work was done, for whom, and why it mattered.
>
> "Time tracking is not just admin. It is a way to **protect their work**, show their value, and stay in control of their professional boundaries."

**Shape:** one client, long engagement, embedded in *someone else's* tooling. Defensive posture — the record is evidence.

### Freelancer

> "…juggle **multiple clients, projects, rates, and deadlines at the same time**. They need time tracking to be fast, reliable, and easy to maintain while **switching contexts throughout the day**."
>
> Challenges: **forgetting to track, reconstructing their day**, estimating future work without good historical data, understanding which clients or projects are actually profitable, avoiding overcommitment.
>
> "It helps them make better business decisions, plan realistically, and understand where their effort actually goes."

**Shape:** many clients, rapid switching, own tooling. Commercial posture — the record is a business instrument.

**They are not variations of each other.** One switches constantly; the other doesn't switch at all.

---

## 2. Sorting each persona's stated pains by W0 fit

The brief is explicit that not every listed pain is a valid target. Sorted honestly:

### Individual Contributor

| Pain | W0 fit | Reasoning |
| --- | --- | --- |
| **Working across client tools** | Strong | Bites on day one. An embedded IC lives in the client's Jira/Slack/Figma — Toggl is not where they work. |
| **Untracked collaboration time** | Strong | Meetings happen in week one. An embedded contractor's day is meeting-heavy by definition. |
| Record of what was done, for whom, why | Partial | The habit starts in week one; the payoff is later. |
| Proving productivity remotely | Weak | Needs accumulated record. |
| Scope creep | Weak | Requires a baseline to deviate from — months. |
| Justifying rates / renewals | Weak | Explicitly a renewal-cycle event. |

### Freelancer

| Pain | W0 fit | Reasoning |
| --- | --- | --- |
| **Forgetting to track** | Strong | Day one, every day. |
| **Reconstructing the day** | Strong | But this is the poisoned direction's home turf. |
| **Which clients/projects are profitable** | Partial | Needs structure to exist; rates are a Starter feature. |
| Estimating future work from history | Weak | Requires history. |
| Avoiding overcommitment | Weak | Requires a populated forward plan. |

**Both personas have two genuinely W0-native pains.** Neither is disqualified.

---

## 3. Opportunity areas — Individual Contributor

### IC-1 · Toggl is not where the IC works, and onboarding never solves it

**Evidence (verified):** Onboarding is three steps — intent, mandatory project, **calendar connect (last, and the only skippable one)**. The mechanisms that make tracking survive an embedded workflow are:

- **Browser extension** — works inside 100+ tools including Jira, Asana, Trello, Gmail *(external sources; the extension itself is UNVERIFIED by us)*
- **Desktop / mobile apps** — `Download apps` sits in the sidebar footer, never mentioned in onboarding
- **Calendar sync** — offered once, last, skippable
- **Jira sync** — Premium tier, and **we could not find any integrations surface in-product** (`product-map.md §9`)

So the single biggest reason an embedded IC stops tracking — *"I wasn't in Toggl"* — is addressed by features that onboarding either buries or never mentions.

| Criterion | Assessment |
| --- | --- |
| W0 fit | Strong — failure occurs day one |
| Evidence | Onboarding sequence verified firsthand |
| AI-default distance | Good — nobody's first AI answer is "fix the onboarding step order" |
| Showcase | Hard — the fix may be an extension or an email, neither of which prototypes well in a browser |
| Measurability | Good — % connecting a capture surface in week one; days tracked |
| Strategy | Neutral |

**Risk:** the honest solution might be "surface the extension earlier," which is a *marketing placement* change, not a product experience. Thin for a prototype.

### IC-2 · Meetings are invisible unless the user connects a calendar

**Evidence (verified):** The Timer calendar renders a **fake ghost meeting** — `MEETING? / Connect calendar →` — placed on a real working-day slot (obs 6). Toggl is using a simulated meeting as an advertisement in the exact place a real one would appear.

For an embedded IC, meetings *are* the work — client calls, standups, reviews. That time is collaboration time, and it is exactly what the brief names as **"untracked collaboration time."**

| Criterion | Assessment |
| --- | --- |
| W0 fit | Strong — meetings happen in week one |
| Evidence | Ghost card verified; calendar step verified |
| AI-default distance | Good |
| Showcase | **Strong** — the calendar surface already has the slot; mock calendar events prototype beautifully and read instantly |
| Measurability | Good — % of week-one tracked time that is meeting-derived; entries created per meeting |
| Strategy | Feeds the data foundation the whole "time intelligence" thesis rests on |

**This is the strongest IC direction.** Visual, W0-native, and the product already gestures at it with a fake card.

**Caveat:** genuinely useful only with a connected calendar — in a prototype that's mock data, which is explicitly allowed.

### IC-3 · No place to record *why* work mattered

A time entry carries description, project, task, tags, billable. Nothing captures the **"why it mattered"** the brief names. **UNVERIFIED** whether task notes/attachments partly serve this.

| Criterion | Assessment |
| --- | --- |
| W0 fit | Partial — habit starts week one, value lands later |
| Showcase | Weak — a text field is not a compelling demo |
| AI-default distance | Risks becoming "add notes to entries" |

**Weak. Not recommended.**

---

## 4. Opportunity areas — Freelancer

### FL-1 · Mandatory onboarding project produces nothing

**Evidence (verified, the strongest single finding we have):**

- Onboarding **forces** project creation — no skip
- The first tracked entry came out with **`Project: —`**
- The forced project has **no client** — it sits under `NO CLIENT`
- **No default-project setting exists** anywhere in Preferences

The user is made to do setup, and the setup does not apply itself to the thing they do next. They declared *"See where time goes"* and the product cannot answer it.

| Criterion | Assessment |
| --- | --- |
| W0 fit | **Strongest** — minute one, every user, guaranteed |
| Evidence | **Strongest** — verified twice on a fresh account |
| AI-default distance | Strong — not a categorize-later flow |
| Showcase | Demonstrable in 30 seconds |
| Measurability | Strong — % of first entries attributed at capture; reassignment rate within 24h |
| Strategy | Attribution is what makes every paid report work |

### FL-2 · Attribution friction at the second work context

**Evidence — partially refuted by testing.** Creating a project mid-capture opens the **full 6-field New Project modal** including `Privacy` and `Invite Members` (collaboration fields meaningless to a solo user). **But** the flow chains correctly: project created and attached, description preserved, auto-advances to the Task picker.

| Criterion | Assessment |
| --- | --- |
| W0 fit | Partial — requires a second context to exist |
| Evidence | **The friction claim did not survive the test** |
| Showcase | Good |
| Measurability | Good |

**Weakened.** Usable as supporting material, not as the spine.

### FL-3 · Forgetting to track

**Evidence (verified):** Toggl **already ships** two mechanisms, both **ON by default**:

- `Email me when a timer runs over 8 hours`
- `Email me a daily brief every weekday morning`

| Criterion | Assessment |
| --- | --- |
| W0 fit | Strong |
| AI-default distance | **Poor** — "remind people to track" is the second most obvious AI answer |
| Novelty | Toggl already does this, unasked |

**Not recommended** unless the angle is that these defaults are wrong.

---

## 5. Head-to-head

| | **IC-2** Meetings invisible | **FL-1** Forced setup produces nothing |
| --- | --- | --- |
| W0 fit | Strong | **Strongest** — minute one |
| Firsthand evidence | Ghost card + onboarding step | **Two fresh-account runs** |
| Distance from AI-default | Good | Strong |
| 60-second cold read | **Excellent** — visual, calendar-native | Good — needs a beat of setup |
| 6-hour buildability | **Excellent** — mock events on an existing surface | Good |
| Measurability | Good | **Strong** — capture-attribution + reassignment |
| Strategic fit | Feeds the data thesis | Feeds every paid report |
| Biggest risk | Depends on calendar connection | Could drift into onboarding redesign |

---

## 6. Recommendation

**Both are viable, strong in different ways. This is a genuine trade-off, not a right answer.**

- **FL-1 wins on evidence and W0 purity.** It happens in minute one to every user, we verified it twice, and "forced setup that produces nothing" is sharp and defensible under questioning.
- **IC-2 wins on demonstrability.** The calendar already has the visual slot, mock meetings prototype beautifully, and it reads in a single glance — which is what the cold-open test rewards.

**If forced to pick one: FL-1**, because the brief weights *"the reasoning why you chose to improve what you did"* as heavily as the prototype itself, and FL-1 has the strongest verified reasoning behind it. Evidence quality is what we can prove; visual appeal is what execution can compensate for.

**The strongest hybrid** — worth serious consideration — is FL-1 as the problem with IC-2's *surface*: attribution made visible on the calendar, where time already has shape. That keeps the verified reasoning and borrows the demonstrability.

**Do not pick:** IC-3 (weak demo), FL-3 (Toggl already does it, and it's an AI-default).

---

## 7. Still unverified — would change this if checked

- The **browser extension** — never installed or tested. If it is excellent, IC-1 collapses.
- What **calendar connect actually produces** after authorising — never completed (OAuth, out of scope).
- Whether **intent selection changes anything downstream** — needs a third account picking a different option.
- **Mobile** — untested, and freelancers switch contexts on phones.
- Whether **task notes/attachments** partly serve IC-3.
