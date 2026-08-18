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
