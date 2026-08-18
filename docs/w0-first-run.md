# W0 first-run — captured on a virgin account

**Account:** `gajsak.business@gmail.com`, org `21611304`, workspace `21610533`, user id `7670578`. Created 2026-08-18, dark theme, desktop.
**Why this exists:** the earlier research used an already-onboarded account. The brief's hard constraint is **W0 retention — value within week one** — so the true signup→first-value path had to be captured cold. It is single-use; this document is the record so nobody has to burn another account.

---

## 1. The onboarding flow — 3 steps, verbatim

### Step 1 of 3 — intent

> **Welcome to Toggl 2.0**
> **What will you mainly use Toggl for?**
> We'll tailor your first experience to help you get there.

Three options, single-select, `Continue →` disabled until one is picked. No skip.

| Option | Sub-copy |
| --- | --- |
| **See where time goes** | Log hours and spot where they really go |
| **Plan and assign work** | Map out tasks, then track against the plan |
| **Keep projects on track** | Watch progress, profitability, and capacity in one place |

Selection is stored as `localStorage['onboarding-v2-intent']` — value `"track"` for the first option.

**The IC/freelancer answer is option 1.** That is the persona the brief targets.

### Step 2 of 3 — mandatory project

> **Create your first project**
> Projects keep your work and time logs organized

Single field, `PROJECT` label, placeholder "Project name", with a colour swatch. `Continue →` disabled until filled. **No skip.** `‹ BACK` available.

⚠️ **Note the tailoring gap:** the user just said their goal is *"see where time goes"* — a tracking intent — and step 2 immediately requires them to **create a project** before they can do anything. For a freelancer whose stated problem is *forgetting to track* and *fast context-switching*, the first mandatory act is project admin.

Also: **"organized"** (US) here, versus **"organised"** (British) in the Tasks empty state. Same product, two spellings.

### Step 3 of 3 — calendar connect

> **Log time from your meetings and events**
> Connect your calendar and your meetings and events are ready to track

Two buttons: `Connect Google Calendar`, `Connect Outlook Calendar`. **`SKIP FOR NOW`** top-right — the first skippable step.

Layout note: the card animates in from an off-centre position; a screenshot taken ~1s in catches it mid-transition with controls in the wrong place. Clicking during that window misses.

### Landing

Straight into **Timer**, in **list** view (`m=list`), right panel open showing **Goals** (with one `Example` goal, "Work 5 hours every day / at least 5h · every day — tap to use") and **Tasks** (bare "Add task" input).

Main area empty state:

> **No time logged in the selected time range**
> Looks like you haven't tracked anything for this time period. Start a timer to get things rolling!

Sidebar footer: `Upgrade` + `31 DAYS` badge — Premium trial active from signup.

---

## 2. Verified: onboarding state is browser-scoped, not user-scoped

**On first landing, the checklist read `3/4`** with *Create a project*, ***Start a time entry*** and ***View your reports*** all struck through — on an account that had **never tracked a second** and never opened Reports. The same screen said "you haven't tracked anything."

**Mechanism, confirmed in `localStorage`:**

```
onboarding-checklist-tracked-time-seen : "true"
onboarding-v2-reports-viewed-seen      : "true"
onboarding-v2-track-complete-seen      : "true"
onboarding-plan-ghost-armed            : ["7667433"]   ← the PREVIOUS account's user id
onboarding-ever-completed              : "7670578"     ← this account's user id
```

`onboarding-plan-ghost-armed` still held user `7667433` — the first Toggl account used in this browser. **Onboarding progress is persisted per browser profile, not per user.**

**Scope, stated honestly:** this is *not* what every new user sees. Clearing the `onboarding*` keys and reloading produced the correct **`1/4`** (only *Create a project* ticked). So the bug hits anyone who signs up a second account in a browser that has already seen Toggl — agency owners setting up for a client, anyone re-testing, shared machines, or a user who previously trialled and returns.

For those users, the primary first-week guidance mechanism opens **pre-completed**, telling them they have already done the single most important action in the product.

---

## 3. Corrections to earlier findings

Measuring the virgin account corrected two things. Both were over-claims made from an already-used account.

### ✅ The checklist DOES verify real behaviour — praise finding stands

Starting a real timer moved it `1/4 → 2/4`, ticking *Start a time entry*. The `3/4` was entirely the leakage bug above, not a design flaw. The original praise finding was right; it just had to survive a scope check.

### ❌ "The first hour of a user's data reads as zero" — WRONG, it is the first **minute**

Measured on this account:

| Entry duration | Day header | Reports "Logged time" | Breakdown row |
| --- | --- | --- | --- |
| 39s (running) | **0h** | — | — |
| **1m 5s (stopped)** | **1m** | **1m** | **1m 5s** |

At **1m 5s everything renders correctly** — Reports KPI shows `1m`, average daily hours `1m`, breakdown `1m 5s`. The `0h` display only occurs **below one minute**.

So the UX analysis claim that the first *hour* reads as zero is wrong, and the finding shrinks accordingly: a realistic first entry (a call, a task, a focus block) exceeds a minute and reports correctly. What remains is a narrow sub-minute formatting bug, plus the oddity that zero renders as `0h` rather than `0m`.

**This is the third error in this research caught by measuring rather than inferring.** The pattern is consistent enough to be worth naming: token- and sample-based reasoning has been wrong every time it wasn't checked against a live render.

---

## 4. New W0 observation — the running entry is invisible in list view

Starting the first timer **blanked the main content area**. The empty-state illustration disappeared and **no entry took its place**. For 39 seconds the screen showed nothing at all in the content region; the only evidence anything was happening was the top-bar counter, the sidebar `Timer 5s` badge, and the browser tab title.

The entry only appeared in the list once ~1 minute had elapsed (row visible at 39s in a later capture — see §3 table; the initial blank persisted several seconds after start).

For a first-time user, the moment immediately after their first-ever action is a blank screen.

---

## 5. Still not captured

- Whether the intent choice at step 1 **actually changes anything** downstream — needs a second virgin account picking a different option
- Mobile signup and first-run
- The free-plan boundary (this account is on a 31-day Premium trial from signup)
- Multi-client / multi-project freelancer context-switching

---

## 6. Capture-flow verification (2026-08-18, second account)

Run to settle two claims that the direction depended on. Both had been asserted without evidence.

### `+ Create a project` from the timer — **opens the full New Project modal**

Sequence: type description → click `Project` chip → picker lists existing projects under `NO CLIENT` with `+ Create a project` → **the full 480px New Project modal opens**, containing:

`NAME` · `Draft` toggle · `CLIENT` · `PRIVACY` (Private / Shared) ★ · `INVITE MEMBERS` · `More options` · `Create project`

**Two of those fields — Privacy and Invite Members — are collaboration controls with no meaning for a solo freelancer**, presented at the moment they are trying to start tracking.

### …but the flow chains correctly — this is the part earlier claims got wrong

After `Create project`:

- the project is **created and attached to the pending entry** (chip turns the project's colour)
- the typed description **survives intact**
- the picker **auto-advances to the Task picker** (`Find or create a task` / `No tasks in {project}` / `+ Create task`)

So the honest claim is **not** "you have to leave the timer" — context is preserved and the flow guides onward. The cost is a six-field modal, two fields of which are irrelevant to the persona.

**This weakens the friction argument and strengthens the precision of any claim built on it.** Corrected accordingly.

### No default-project setting exists — confirmed

Full `Settings → Preferences` inventory:

| Group | Settings |
| --- | --- |
| Default page | **Open on startup** → `My time` |
| Time preferences | Account timezone |
| Calendar | `Project color as planned time background` (on) |
| Language | Display language — "Toggl 2.0 is multi-lingual" |
| Time format | Time display (12-hour) · Date display (MM/DD/YYYY) · **Duration display format** · Start week on (Monday) |
| Keyboard shortcuts | `Enable keyboard shortcuts` (on) |
| Email notifications | **Email me when a timer runs over 8 hours** (on) · **Email me a daily brief every weekday morning** (on) |

**There is no default-project option.** Nothing carries the onboarding project onto the first entry, and nothing lets a user set one.

### Three incidental findings that matter more than the thing I was testing

1. **`Duration display format` is user-configurable:** `Classic (47m 6s)` — default · `Improved (0:47:06)` · `Decimal (0.79 h)`. So the duration-format inconsistency documented elsewhere is partly a setting, not purely a bug. Note Toggl labels one option **"Improved"** — a self-judging name for a format choice.
2. **`Email me a daily brief every weekday morning` is ON by default.** Toggl already ships a W0 re-engagement mechanism. Any proposal about "bringing the user back" must account for the fact that a daily email already exists and is enabled without asking.
3. **`Email me when a timer runs over 8 hours` is ON by default** — forgotten-timer protection already exists, which is directly adjacent to the freelancer pain of "forgetting to track".

### Also observed

- Both projects — including the mandatory onboarding one — sit under **`NO CLIENT`**. The onboarding step that forces project creation does not capture a client, which is the object a multi-client freelancer actually organises by.

---

## 7. Goals capability check (2026-08-18) — decisive for direction

`+ New goal` opens **Create a goal**:

- Name (placeholder: "e.g. Billable hours, Deep work, Admin") + optional description
- **LOGGED TO ⓘ: `+ Projects` · `+ Tasks` · `+ Tags` · `+ Clients` · `$ Billable`** — helper: "Anything logged on client or internal projects counts."
- FOR: `At least ▾` · hours · **`every day / weekdays / every week / every month`**
- UNTIL: optional end date
- Constraint: **"Projects, tasks, tags, billable, and recurrence can't be changed after a goal is created."**

**Conclusion: client-scoped time commitments already exist as a capability.** "At least 10h every week logged to Client X" is fully expressible today. No ★ premium marker observed on the modal or the Goals panel.

**What does NOT exist (verified across this account's first run):**
- Nothing in onboarding or first-run mentions Goals or client commitments
- The Goals panel lives behind an unlabelled toggle (obs 19), with mobile copy ("tap to use")
- The example goal steers to a **generic total** — "Work 5 hours every day" — not a per-client commitment
- Goal scoping is **immutable after creation** — heavy for a correction path
- And the capability is starved by the attribution gap: a client-scoped goal can count nothing while entries carry `PROJECT: —`

## 8. Remaining verification answers

- **Q4 retroactivity:** assigning a client to a project **regroups its historical entries** in Reports immediately (7m 23s entry, tracked pre-client, showed under "Acme Advisory" post-assignment). Client-on-project rewrites history — good for healing, a caveat for corrections.
- **Q3 path:** Project page → `Choose client` → `+ Create client` → **inline name field + ↵** — lightweight, two clicks + typing. Toast: "Client created". This inline pattern is the exact template for the prototype's client ask.
- **Q5 labels:** project picker groups by client with **`NO CLIENT`** headers; client-grouped Reports breakdown ("Client and task breakdown") labels clientless time **"Without client"**.
- **Q7:** "View your reports" checklist item completes on **page visit** (`onboarding-v2-reports-viewed-seen` flips on navigation) — even when the report shown contains an unattributed entry. Checklist rewards navigation, not value.
- **Timer list rows display the client** (`Passion Project · Acme Advisory`) once one exists.
- **Dead-click after popover close: now observed 4×** — after closing any picker, the next click on another control does not register; the identical second click does. Reproducible enough to state as a product defect.

---

## 9. Client-scoped goal — end-to-end mechanism test (2026-08-18)

**Purpose:** ChatGPT correctly flagged that the whole "Act 2" payoff depends on tracked time actually advancing a client-scoped goal. That had never been observed. Tested end-to-end.

### Setup

- Client `Acme Advisory` assigned to project `Passion Project`
- Goal created: **"Acme Advisory — weekly commitment" · at least 5h · every week · LOGGED TO: Acme Advisory**
- Existing tracked time under that client at creation: **7m 23s**

### Verified: a dedicated Goals page exists

`/goals` — a full route with `REACHED 0/1` · `SUCCESS RATE` · `BEST STREAK 🔥` · `LOGGED · THIS WEEK` KPI row, and a table: NAME · DESCRIPTION · FOR · LOGGED TO · PROGRESS · STATE · STREAK · END DATE.

**It is not in the sidebar navigation.** Reachable only via the Goals rail's `View all (1) →`. Another shipped surface with no front door — the same pattern as Focus mode.

### The creation form previews progress live

Before saving, the modal showed **"Already logged today · 0/5 hours · 0% · NOT STARTED"**, updating as the target changed, and switching cadence to `every week` revealed an extra **ON: Mon–Sun** day-selector row.

### ⚠️ The finding: goal progress did not move

| Moment | Acme Advisory tracked time | Goal progress |
| --- | --- | --- |
| At goal creation | 7m 23s | 0/5 hours · 0% · NOT STARTED |
| After tracking a further 1m 10s | **8m 59s** (~9m) | **0/5 hours · 0% · NOT STARTED** |
| Goals page after reload | ~10m total tracked this week | **0/5 hours · 0%**, STATE `NOT STARTED`, STREAK `—` |

The Goals page's own `LOGGED · THIS WEEK` tile correctly reads **10m** — so the workspace total updates while the client-scoped goal stays at zero.

**Candidate explanations, none yet confirmed:**

1. **Rounding** — 9m of a 5h target is 3%, which may floor to `0%` and never leave `NOT STARTED`. Consistent with the sub-minute `0h` rounding defect already documented (§3).
2. **Latency** — goal aggregation may run on a delayed job rather than live.
3. **Scope semantics** — "logged to a client" may require the entry to reach the client by a path this data does not satisfy.

**This must be resolved before Act 2 is locked.** The cheapest decisive test: track **~20 minutes** against Acme Advisory (≈7% of 5h) and re-check. If progress is still `0%`, the mechanism is not live-updating and the prototype must demonstrate the loop with mock data rather than claiming Toggl already does it.

**Either way the direction survives** — arguably it strengthens: if a client goal cannot visibly count client work in week one, the "capability exists but is starved" argument gets sharper. But the claim must match what was observed.

---

## 10. Two findings that reshape the direction (2026-08-18, late)

### 10.1 CONFIRMED: client-scoped goal does not count client time

Follow-up to §9, with a much larger sample. Josip tracked over an hour against the same client.

| Surface | Value |
| --- | --- |
| Timer, week total | **1h 31m** |
| Entry `Passion Project · Acme Advisory` | **1h 30m 28s** |
| Goals page tile `LOGGED · THIS WEEK` | **1.5h** |
| Goal `at least 5h · every week · LOGGED TO: Acme Advisory` | **0/5 hours · 0% · NOT STARTED** |

**1.5 hours of client-attributed time against a 5h weekly client goal renders as 0%.** That is a 30% shortfall, far above any rounding floor — so the §9 rounding hypothesis is dead. Either goal aggregation does not run live, or "logged to a client" does not mean what the label implies.

**Cause still UNVERIFIED.** Do not claim it is broken; claim what was observed.

Incidental: the Goals page renders **`1.5h` decimal**, while Timer renders `1h 31m` classic — a tenth duration format in one product. Also, `END DATE` now shows `August 29 2026` where it previously read `No end date`.

### 10.2 NEW: Toggl already has a post-stop prompt — and it asks about *tomorrow*

Discovered by Josip, tracking for over an hour (a duration none of my second-scale tests ever reached).

On stopping a long entry, a card appears:

> ✅ **1H 44S LOGGED**
> **Working on this tomorrow?**
> ⌗ PLAN — *I am working on an MVP For toggle — researchin…*
> Wed, Aug 19 | 2:38 PM → 3:53 PM | ⏱ 1h 15m
> `+ Add to tomorrow` · `Not now` · `✕`

**Why this matters more than anything else found today:**

1. **The interaction pattern we designed already exists** — post-stop, non-blocking, primary + secondary + dismiss. Our client ask should mirror it exactly rather than invent a new shape. Large fidelity win.
2. **It is Toggl's existing W0 return mechanism** — a fourth one, alongside the daily brief email, the 8h timer warning, and the calendar suggestion cards. Any claim that Toggl lacks a reason-to-return is now false.
3. **It completes the 4th onboarding checklist item** ("Plan a time slot") — closing the loop to 4/4.
4. **The sharp observation:**

> **Toggl has a post-stop prompt asking whether you will do this work again tomorrow. It has no post-stop prompt asking who the work was for.**

The product invests its forward-looking moment in *repetition* while the attribution that makes the record answerable is never asked for. It builds the habit loop on top of data it never structured.

**Trigger threshold UNVERIFIED** — never appeared across many second-scale entries; appeared at ~1h. Duration-gated is likely but unproven.

### Implication for the plan

The prompt slot at post-stop is **occupied**. Our client ask must therefore either:

- **(a)** live at start / during run, leaving post-stop to Toggl's existing plan prompt, or
- **(b)** replace it in the first-run case, arguing that "who was this for?" must precede "will you repeat it?"

**(b) is the stronger product argument and the sharper demo** — but it must be made explicitly as a prioritisation call, not silently.

---

## 11. CORRECTION — client-scoped goals DO work (2026-08-18)

**§9 and §10.1 were wrong.** Both concluded the client-scoped goal was not counting client time. It counts; there is **aggregation latency**.

Observed sequence on one goal (`at least 5h · every week · LOGGED TO: Acme Advisory`):

| Client time tracked | Goal progress | State |
| --- | --- | --- |
| 7m 23s | 0/5 hours · 0% | NOT STARTED |
| ~1h 30m | 0/5 hours · 0% | NOT STARTED |
| **~2h+** | **2/5 hours · 40%** | **ON PACE** ✅ |

Rail card and Goals page both now render a **progress ring, `2/5 hours · 40%`, and a green `ON PACE` state**. The Goals page tile reads `LOGGED · THIS WEEK 3.5h` (all tracked time, across clients).

**This was the sixth over-claim of this research effort, and the third caused by treating a not-yet-updated UI as a defect.** Standing rule for the submission: *do not call anything broken without waiting out a refresh cycle and re-observing.*

### What this changes — the direction gets tighter, not weaker

The mechanism is **good**, and it is exactly the "client runway" card that was being considered as an invention. Building it would be rebuilding working functionality.

What is genuinely wrong is the **path to it**, all verified:

1. **No client data** — onboarding forces a project and never asks who it is for; the fastest capture path leaves entries unattributed
2. **No discovery** — the Goals rail sits behind an unlabelled toggle (obs 19); the `/goals` page is **not in the sidebar**
3. **Wrong exemplar** — the seeded example is *"Work 5 hours every day"*, a generic total, when the freelancer's question is per-client
4. **Never introduced** — nothing in onboarding or the 4-item checklist mentions goals or clients

### Revised build implication

**Do not build the commitment card. Build the route to it.**

- **Act 1 —** attribution at the post-stop moment (Toggl's own card pattern), so client data exists at all
- **Act 2 —** surface the client commitment at the moment a client first exists, replacing the generic "work 5 hours every day" exemplar with a per-client one
- **Act 3 —** Toggl's existing goal card does the rest, unchanged

The submission line becomes: **"I didn't build a feature. I built the path to one you already have."** That is a stronger claim than either "I fixed a dash" or "I invented client runways", and every step of it is screenshot-provable.

---

## 12. CORRECTION — Focus mode is NOT hidden (2026-08-18)

**Every earlier claim that Focus mode has "no UI entry point" was wrong.** It has one.

**Verified path:** start a timer → the running-timer toolbar gains a **`⋮`** overflow menu → it contains:

- **`Enter Focus mode`** with the `F` shortcut shown alongside
- `Discard logged time` (destructive, red)

Clicking it opens a **full-screen focus surface**: giant duration (`1m 12s`), a single rounded input with a stop button, and two controls — **`TIME FOR TASK: 1h`** and **`TIME COUNT: ↑`** (count-up / count-down). Top-right: a **moon icon** (theme/dim) and **`✕`** to exit. Everything else is stripped away.

Also verified: the idle toolbar has **no** Focus control, and the running toolbar shows an extra **`↑`** control (count direction) beside `$`.

**So the earlier framing collapses:**

| Claim made repeatedly today | Reality |
| --- | --- |
| "Focus mode has zero UI entry point" | It is one click into the running-timer `⋮` menu, clearly labelled |
| "`F` silently does nothing" | `F` is **context-gated on a running timer** — correct behaviour, and the menu discloses it |
| "A mouse-first user can never reach it" | False |

**This kills the "surface Focus mode" direction outright.** It is discoverable, well-built, and the full-screen treatment is genuinely good craft.

**Ninth correction of this research effort.** The pattern is now unmistakable and worth stating in the submission itself: *nearly every apparent gap in Toggl 2.0 dissolved on closer inspection.* Not one of them was a missing capability.
