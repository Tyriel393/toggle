# Plan — First useful record (Toggl 2.0 · Freelancer · W0)

> **Phase 2 artifact.** Josip annotates inline; Claude addresses every note and reports what changed. **No implementation until the plan and its todo list are approved.**

**Status:** ready for review
**Date:** 2026-08-18

---

## 1. Locked decisions

Carried from `research.md` and the conversation. Not up for re-litigation unless annotated.

| | |
| --- | --- |
| **Persona** | **Freelancer** (Toggl's own label) — juggles multiple clients, switches context, needs capture fast |
| **Problem** | Onboarding forces a project, never asks who it's for, and doesn't reliably carry it into the first entry. On the fastest capture path the first entry can be unattributed — so when the checklist routes the user to Reports, Toggl shows a dash where the context should be. |
| **Insight** | Toggl treats *creating a project* and *starting a timer* as activation. For a Freelancer, activation is when the record can explain **which client** consumed the time. |
| **Retention mechanism** | Not day-one delight. **Avoid an early product-generated disconfirmation**, and **preserve context while it is still cheap**, so the Week-0 report is answerable at all. |
| **Spine** | **Client-led.** Project carry-forward is the quiet setup; the client question is the intervention; the report naming a client is the payoff. |
| **Onboarding** | **Shown faithfully, visually unchanged.** Deliberate trade-off, not a time saving. |

### The claim, in the form that survives questioning

> One attributed entry does not make a user return. It removes an avoidable signal that the product failed to keep what the user supplied, and it preserves context that becomes expensive to recover. Necessary for a useful Week-0 record; not sufficient alone.

**Language discipline** — these overclaims were caught during research and must not reappear in the prototype copy, rationale, or Loom:

- ❌ "guaranteed" disconfirmation → ✅ "on the path of least resistance"
- ❌ "cannot reconstruct later" → ✅ "recovery costs memory and corrective admin"
- ❌ "most first-week churn" → ✅ stated as a hypothesis
- ❌ "the mandatory project does nothing" → ✅ "the handoff to capture is not guaranteed"

---

## 2. Goal

A cold evaluator, in under 60 seconds and with no narration, sees:

1. A project created during setup
2. That project already present when work starts — visibly, removably
3. A non-blocking ask: **who is this for?**
4. A report that names **the client**

And can answer: *what changed, why it helps, why it belongs in Toggl.*

---

## 3. Non-goals — the scope cut

Say once, confidently, in the Loom. Cutting is on-strategy: "no bloat" is Toggl's own stated positioning, twice.

- ❌ Onboarding redesign — considered and **rejected on principle** (below)
- ❌ AI/automatic client inference
- ❌ End-of-day review, categorisation, or cleanup queue *(the poisoned direction)*
- ❌ Notifications or reminders — Toggl already ships two, both on by default
- ❌ Profitability, rates, invoicing
- ❌ New navigation section
- ❌ Multiple report types
- ❌ Mobile
- ❌ Team, sharing, permissions

**Why onboarding was not changed** — the line for the Loom:

> I considered collecting the client during onboarding and rejected it. "See where time goes" doesn't necessarily mean client work, and another mandatory field increases cost before value. I moved the question into the first real work context and kept it non-blocking, so structure grows without slowing capture.

---

## 4. The flow

### Screen 1 — Onboarding step 2 (faithful reproduction)

Exact copy: **"Create your first project"** / *"Projects keep your work and time logs organized"*. Single field, placeholder `Project name`, colour swatch, `Continue →` disabled until filled.

Demo input: **`Website redesign`**

*Purpose: the evaluator must watch this object be created, or the carry-forward means nothing.*

### Screen 2 — Timer, project pre-selected

- Lands on Timer, list view, right rail with Goals + Tasks (as verified)
- **`Website redesign` already in the project chip**, in project colour
- No "From setup" label — pre-selection is ordinary; reversibility does the trust work
- User types `Homepage concepts`, presses play. **Nothing blocks the start.**

### Screen 3 — The client ask (non-blocking)

**Appears immediately on start**, persists through the run, still present at stop.

> **Who is Website redesign for?**
> Add a client so your reports can show where time went.
> `Add client` · `Not client work` · `✕`

**Placement — proposed:** an inline row directly beneath the running entry in the list, using the existing card border treatment. Not a toast (toasts auto-dismiss and are unannounced), not a modal (blocks), not the right rail (competes with Goals).

**Dismiss rule — proposed:** `✕` silences it for this entry only. The project row keeps a quiet `+ client` affordance, so the path stays open without nagging.

### Screen 4 — Adding the client

Lightweight. **Not** the six-field New Project modal.

- Single combobox: search existing / create new
- Enter commits. Escape cancels.
- Applies to **the project**, so it persists for future entries — stated in one line of helper text
- Toast confirms, with undo

Demo input: **`Northstar Labs`**

### Screen 5 — Stop, then Reports (Day 1 state)

Entry completes already carrying valid context. Report shows:

```
Northstar Labs  ›  Website redesign  ›  Homepage concepts   1h 12m
```

### Screen 6 — Day 5 (the value beat)

**Added after challenge: the brief defines W0 retention as "returns and gets value within their first week." A one-entry report is not value — the demo must show the week answered, not just the mechanism working.**

A visible time-skip control (e.g. `Later that week ›` in demo chrome) advances to a populated Day-5 state:

- Timer list shows entries across several days (seeded from mock data — some attributed to a second client, some `Not client work`)
- Reports answers the selected intent for real:

```
This week · 18h 40m
Northstar Labs      9h 15m
Meridian Studio     5h 30m
Not client work     3h 55m
```

**The causal line, for the Loom:** this report is only possible because entry one kept its context. The dash prevented on Monday is why Friday has an answer.

**The demo ends here** — on the week explained, not on the first entry.

On **"returns"**: a prototype cannot depict a user coming back. Toggl already ships the return vehicle — the weekday daily-brief email, on by default (verified in Preferences). Cite it in the rationale; build nothing.

**Friction framing (for Loom + rationale):** the prompt adds one interaction; the friction removed is the six-field project modal at capture and the end-of-week reconstruction that costs memory the user no longer has.

---

## 5. The three paths

| Path | What it proves |
| --- | --- |
| **Golden** | Setup → track → ask → report names the client |
| **Correction** | Change or remove the suggested project; change the client after the fact |
| **Non-client** | `Not client work` → entry is explicitly, validly non-client — **not** a dash |

The third is the one that shows the feature was thought through. Without it we force false attribution or recreate the dash we're fixing.

---

## 6. Affected files

Building on the existing kit (`toggl-kit.vercel.app`), which already carries real tokens, Toggl's extracted icons, Inter, and both themes.

| Path | Change |
| --- | --- |
| `src/routes/OnboardingProject.tsx` | **new** — screen 1 |
| `src/routes/TimerPage.tsx` | **new** — screens 2–3, running state, client prompt |
| `src/routes/ReportsPage.tsx` | **new** — screen 5, breakdown grouped by client |
| `src/components/toggl/ClientPrompt.tsx` | **new** — the non-blocking ask |
| `src/components/toggl/ClientCombobox.tsx` | **new** — search / create |
| `src/components/toggl/EntryRow.tsx` | **new** — list row, running + completed states |
| `src/data/demo.ts` | **new** — demo state machine (separate from `mock.ts`) |
| `src/App.tsx` | routes |
| `src/components/toggl/Shell.tsx` | mark Timer active; keep other nav as dead links (explicitly permitted) |

### Demo state — proposed shape

```ts
type DemoState = {
  project: { name: string; color: string; clientId: string | null }
  clients: { id: string; name: string }[]
  entry: {
    description: string
    projectId: string | null
    startedAt: number | null
    stoppedAt: number | null
    clientDecision: 'pending' | 'assigned' | 'not-client-work' | 'dismissed'
  } | null
}
```

`clientDecision` is the field the whole prototype turns on, and the one the metric definition maps to.

---

## 7. Edge cases to build

Graded explicitly by the brief.

| Case | Behaviour |
| --- | --- |
| Client prompt dismissed | Silenced for this entry; `+ client` stays on the project row |
| `Not client work` chosen | Entry shows an explicit non-client marker; report groups it under **Not client work**, never a dash |
| Project removed from entry | Client prompt disappears — nothing to ask about |
| Client added mid-run | Running entry updates live |
| Client added after stop | Completed entry updates; report reflects it |
| Duplicate client name | Combobox surfaces the existing match before offering create |
| Long client/project names | Truncate with ellipsis; full value in `title` |
| Empty report | Uses Toggl's **inline** empty-state pattern, not the illustrated one |
| Sub-minute entry | Shows seconds, never `0h` — the bug we documented |

---

## 8. Trade-offs

| Decision | Alternative | Why this way |
| --- | --- | --- |
| Client asked at capture | Client field in onboarding | Intent ≠ client work; avoids another mandatory setup decision before value |
| Non-blocking prompt | Ask before play | Play is the moment Toggl must never tax |
| Project pre-selected silently | "From setup" badge | Explaining the mechanism is over-explaining; reversibility earns trust instead |
| Client applies to project | Client on the entry | Matches Toggl's real model — entries relate to clients *through* projects |
| Onboarding shown, unchanged | Skip it | Without watching the project get created, the carry-forward is invisible |
| Report as final beat | End at the timer | Ending on a client name is what reads cold |

---

## 9. Measurement (for the rationale, not the build)

**Primary — disconfirmation avoided:** % of first Reports visits where the most recent entry appears under its expected named context rather than a dash.

**Supporting:**
- *Mechanism* — % of first completed entries with valid context **by completion**, unchanged after 24h
- *Outcome* — % recording validly attributed work on 3+ distinct days in the first 7

**Valid context** = client work: project **and** client · non-client work: project **plus explicit** `Not client work`. Invalid: unintentionally unattributed, duplicated, or corrected shortly after.

**Baseline:** unknown — state as an assumption, instrument in week one. Do not invent a number.
**Attribution:** cohort, new signups exposed vs not.
**Trade-off:** carried context can be wrong; any capture-time decision risks slowing the thing freelancers most want fast.
**Kill criterion:** if median time-to-first-entry rises materially, or suggested context is frequently reassigned, the convenience isn't worth the attribution risk — roll back.

Lead with the primary in the Loom. The other two belong in the written rationale.

---

## 10. Open questions for annotation

1. **Prompt placement** — inline under the running entry (proposed), or right rail?
2. **Dismiss rule** — silence per entry (proposed), or per session?
3. **Client scope** — applies to the project (proposed, matches Toggl's model) or to the entry?
4. ~~Does the demo include a second entry?~~ **Resolved: yes — a Day-5 beat (Screen 6), because the brief's W0 definition requires showing value, not just mechanism.** Remaining sub-question: how the time-skip is presented (demo chrome button vs. date navigation).
5. **Theme** — follow OS (proposed), or force dark to match your Loom recording?
6. **Do we show the "before"** — a dash state — anywhere, or trust the sequence to carry it?

---

*plan.md is ready for your review — add inline notes and send it back.*
