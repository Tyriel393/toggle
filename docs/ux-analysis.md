# Toggl 2.0 — UX analysis

**Independent read, written before seeing Josip's friction log.** Deliberately so: three separate reads (Josip's, this one, and a UX/UI designer as tie-breaker) are only worth having if they're formed independently.

## How this was produced

1. **Live walkthrough** of Toggl 2.0 on 2026-08-17 — dark theme, Premium trial, near-empty workspace. Core loops actually exercised: start/stop a timer, create a task with every field, delete a task, delete a time entry, allocate to the Timeline, read Reports. 57 numbered observations recorded in [`ux-raw-observations.md`](ux-raw-observations.md).
2. **Six analysis passes** over that evidence, each with a different lens: first-run, interaction cost, naming coherence, the tracking↔planning seam, craft detail, discoverability.
3. **Adversarial verification.** Every blocker/major/praise finding went to a reviewer whose job was to *defend Toggl's design team* — check the citations, build the strongest case that the choice was deliberate, then rule.
4. **Completeness critic** to surface what fell through and what couldn't be tested.

Result: 45 raw findings → 33 verified. **Zero refuted. 21 downgraded.** The downgrade rate is the useful signal — most criticism was real but overweighted. Six majors and six praise findings survived a genuine defence.

Every finding cites observation numbers. If a claim isn't traceable to the evidence log, it isn't here.

---

## The headline

**The gap between Toggl's ceiling and floor is the most interesting thing about this product.**

The ceiling is genuinely high — high enough to learn from. The running timer writes its live duration into the **browser tab title**, so you can see it from another tab. The Reports y-axis rescales to *seconds* when you've tracked 28 of them. A `Repeat` field materialises only once dates exist. Delete confirms state the consequence — "will remove all related planned time" — not "are you sure."

The floor, in the same product, on the same day: a progress bar rendered **100% full and labelled "0h"**. Your first tracked entry **physically unclickable** where you made it. A typed task draft **silently destroyed** by a stray click, in a product that wraps deletion in three separate protection registers.

That isn't a team with a low bar. It's a team with a very high bar applied unevenly — and the unevenness has a shape, which is the finding that matters most (§3).

---

## 1. Confirmed majors

Six findings survived adversarial defence at `major`. None were refuted.

### 1.1 The first entry is unreachable where you made it
`obs 15, 4, 17, 18` · confirmed

A ~28-second entry draws as a sliver under the current-time indicator. Click, double-click and element-targeted click **all fail** to open any editor on the calendar. The same entry is fine in List view — behind one of four unlabelled view icons — where the only edit path is inline, since the `⋮` menu has no "Edit" item to signpost it.

Your first-ever entry sits at the current-time line *by definition*, because you just stopped it.

**Defence considered:** tiny-event hit targets are hard; List view may be the designed home for micro-entries. **Why it failed:** minimum-render-height for short events is standard in Google Calendar and Outlook, and the element-targeted click failure points to pointer interception, not a tradeoff. Nothing routes the stuck user to List view — the post-stop spotlight points at *Reports*. It also recurs beyond first run: false-starts and quick-stops always land exactly under that line.

### 1.2 Outside-click silently destroys a task draft
`obs 32, 33, 28, 54, 55, 22` · confirmed · *found independently by two lenses*

The create-task drawer is 500px on the right edge — so roughly two-thirds of the screen is a silent discard button. Everything typed is lost. No confirm, no draft restore on reopen (verified: the title was gone).

What makes this incoherent rather than merely unfortunate is the company it keeps. The same product gives you a **consequence-stating modal** when deleting a saved task, an **undo toast with a shortcut hint** when deleting a time entry, and **global Ctrl+Z**. Three protection registers, applied to recoverable actions — and none to the one case that's irrecoverable.

**Defence considered:** light-dismiss is the standard drawer contract; confirms on every stray click are their own tax; a header lock icon exists as an opt-in guard. **Why it failed:** the defence protects *light-dismiss*, and the finding indicts *silent loss* — separable concerns. A dirty-state guard costs nothing on an empty drawer. And opt-in protection inverts the safe default: you discover the lock exactly one lost draft too late.

### 1.3 A whole feature tier has no front door
`obs 19, 22, 23, 27` + `design-system §0`, `company-research §2, §4` · confirmed · *found independently by four lenses*

**Focus mode — with a full Pomodoro implementation — exists only behind the `F` key.** No entry point anywhere in the chrome. Press `F` without a running timer and nothing happens, silently. **Goals** — templates, creation flow, the whole thing — lives behind an unlabelled panel toggle and appears in no nav group. Manual theme override is `Alt+D`, documented only inside the `?` panel.

The structural irony is fully sourced: the product **was named Focus**, is served from **focus.toggl.com**, its only brand class in the CSS is `.focus` — and **"focus mode" is a named feature on the Free tier of their own pricing page.** A marketed conversion-ladder rung that a mouse-first user cannot reach.

**Defence considered:** "no bloat" is stated positioning twice over; a deliberate keyboard-first tier documented in a first-class `?` panel is a real philosophy. **Why it partly failed:** the minimalism argument collapses against how the chrome *is* spent — a fake-meeting card advertising calendar connect, suggestion cards, mobile-app and trial banners. Zero pixels for a feature on their own pricing table. The verifier trimmed two sub-claims: Goals sits behind a *visible but unlabelled* toggle (with shortcut `L`), and personal settings were never swept, so "theme override exists only as Alt+D" is unproven.

### 1.4 The keyboard layer fails silently at exactly its seams
`obs 22, 23, 26, 27, 31` · confirmed

The shortcut layer is richly invested-in. Three verified failures share one pattern — **silence**:

- `N` (new task) no-ops after navigation until you click the page once. No way to know focus is missing.
- `F` does nothing without a running timer.
- **`Ctrl+↵` — documented as "Save and close task modal" — reopens the date picker instead**, when pressed from the Dates field.

A silent no-op is worse than a missing shortcut: you can't tell "wrong context" from "broken," and after two unexplained failures you stop trusting the layer entirely and revert to the mouse — forfeiting all its savings, not just the failed keystroke.

**Why the defence failed:** SPA focus-after-navigation is genuinely a platform constraint, and context-gating `F` is reasonable. But `Ctrl+↵` is neither — it's advertised behaviour that actively does the wrong thing, in the drawer's most click-expensive field (bare date grid, no presets), which is the input that feeds allocation and Timeline capacity.

### 1.5 The entry↔task join is optional, invisible when missing, misdiagnosed when it fails
`obs 7, 8, 35, 45, 52` + `product-map §6, §8`, `company-research §4` · **downgraded from blocker**

Every intelligence surface joins on the task: the drawer's Logged/Planned/Estimate triptych, the report breakdown at `MEMBER|TASK` grain with a first-class `ESTIMATED TIME` column, `TIME STATUS` and `VARIANCE` on the Projects table.

But the default gesture — type into "What are you working on?" and hit play — attaches a task only via a separate optional `@ Task` button. The path of least resistance produces entries that don't feed the machinery above. And "time actuals vs. estimates" is the **headline Premium gate at $16/seat**.

When the intelligence layer does come up empty, its self-diagnosis is wrong: the project Dashboard says *"No logged cost — Start by logging time"* when time **is** logged and the actual missing input is a member cost rate. A user who follows that remedy logs more unattached time and stays stuck.

**Why it was downgraded:** the verifier caught real overreach. "Every intelligence surface joins on the task" is false — Projects-table columns plausibly join at *project* grain, and Utilization/Profitability join on working hours and rates. The 28s entry did reach Reports. Frictionless capture is also Toggl Track's actual moat, so entry-first/categorise-later is a defensible philosophy. What survives: the *misdiagnosing remedy copy*, and the absence of any surface reconciling unattached time.

### 1.6 Sub-minute first-run reporting reads as zero
`obs 13, 14, 16, 50, 51` · **downgraded from major** · *found independently by four lenses*

Stopping a sub-minute first timer can produce **"Logged time 0h / Avg daily 0h."** The Timer list header reads **"Today — 0h"** directly above a seconds-level row, while the Logged week-strip can render as a **100%-filled bar labelled "0h."**

**Fresh-account correction:** the original analysis still overstated the range. At **1m 5s**, Reports correctly rendered `1m`, Average daily hours `1m`, and the breakdown `1m 5s`. The defect is therefore limited to the **first minute**, not the first hour. It should be treated as polish rather than a meaningful W0-retention problem.

**What survives:** the full-at-zero bar is wrong under *any* formatting policy, and zero expressed as `0h` beside seconds-level data is inconsistent. The business impact is narrow because realistic first sessions normally exceed one minute.

---

## 2. What is genuinely excellent

Six praise findings survived verification. This half matters as much as the defects — Toggl grades on attention to detail, so being able to name *theirs* precisely is the difference between a critique and a teardown.

| | Evidence |
| --- | --- |
| **The running-timer state machine** — play morphs to stop, a hatched block grows live on the grid, the sidebar gains a live badge, the project chip fills with project colour, and the **browser tab title becomes `3s • Toggl 2.0`**. There's even a dedicated `--background-stop-timer` colour token, distinct from both `destructive` and `error`. The craft budget visibly went here. | `obs 11`, design-system §2 |
| **The allocation loop closes with honest arithmetic at three zoom levels** — lane header `34h free` (40−6), per-day headers `6h 48m` (8h−1h12m), task bar `1h 12m /day`. The planning→capacity math is shown, not asserted. | `obs 39, 46` |
| **Tracking is live on the planning surfaces** — a play button on the saved task's title tracks that task directly. The seam is physical, not conceptual. | `obs 35` |
| **`Logged / Planned / Estimate` is a coherent conceptual spine**, and `Auto-log time` is named exactly on it. The naming discipline the rest of the product should be measured against. | `obs 35, 36` |
| **The onboarding checklist verifies real behaviour, not clicks** — it advanced 2/4 → 3/4 only when a timer actually started. | `obs 12` |
| **A coherent interaction grammar on the happy path** — correct Escape layering (Esc closes the date picker, not the drawer), progressive disclosure (`Repeat` appears only after dates exist), consequence-stating confirm copy, value-framed feature toggles on the project rail ("Monitor spending against the fixed fee"). | `obs 28, 33, 43, 54` |

That last row is the one to hold onto: **the project right rail proves the team knows exactly how to make hidden capability discoverable** — feature name, benefit sentence, switch. The pattern exists, works, and never left the monetised surfaces.

---

## 3. The pattern underneath

Four of the six majors are the same shape, and it's sharper than any individual defect:

> **Where the product sells, it is loud. Where the product retains, it is silent.**

The chrome spends real estate on a fake meeting card advertising calendar connect, suggestion cards, a mobile-app banner, trial badges, upgrade CTAs, and a spotlight tour. It spends **zero** on Focus mode (named on their own pricing page), on Goals, on the inline `+project P1` syntax, on the fact that Board columns are the group-by dimension.

The discoverability machinery is excellent — it's just pointed almost entirely at the funnel. Every retention feature is behind an unlabelled toggle, an undocumented keypress, or a `?` panel you have to know to open.

The second pattern: **protection is inverted.** Recoverable actions (deleting a saved task, deleting an entry) get confirms and undo. The one irrecoverable action — losing an unsaved draft — gets nothing, and its guard is opt-in.

---

## 4. Minor and polish

Real, verified, lower stakes. Full text in the workflow output.

- **Nine duration formats coexist** — `0:00:00`, `28s`, `0h`, `6h 48m`, `1h 12m /day`, `34h free`, `3s`, plus `Aug 17 - 21` vs `Aug 17 - Aug 21` in different views.
- **Naming can't settle**: one view is Timer (nav) / Calendar (URL) / untitled (page), Tasks tab-titles as **"Inbox"**, and "Timeline" means capacity lanes globally but project schedule inside a project.
- **`Auto-log time` is default-on** and converts planned slots into logged time — inverting "real data" — disclosed as one `ⓘ` in a per-task `⋮` menu.
- **Vocabulary drift**: the shortcut panel says `P1 P2 P3`; the priority menu says High / Medium / Low / None.
- **Attributed timer start is a three-popover mouse path**, while inline token syntax that would collapse it exists one surface away in the task modal.
- **A dead click after popover close** — observed twice, *not reproduced*; flagged as unconfirmed.
- **Date picker has no presets** (today / this week / next week) — a bare month grid in a planning product.
- **`"— tap to use"`** in Goals: mobile vocabulary on desktop web, suggesting the panel was ported without a desktop discovery pass.

---

## 5. What this analysis cannot see

Stated plainly, because a designer reviewing it should know the boundaries:

- **Single user, single day, one project, one task.** Fresh-account validation later proved duration rendering is correct from roughly one minute onward. Variance, Time status, forecasts, and the Workload / Utilization / Profitability reports **never rendered populated.**
- **Premium trial**, so the Free boundary — where "focus mode" is actually sold — was never observed. **Time off is paywalled even on trial; Approvals never exercised.**
- **No second member**: assignee≠self, the "No assignee" lane, roles and permissions, and the fix for the Dashboard empty state (setting a member cost rate) are all untested.
- **Dark theme only, desktop only, one viewport.** No mobile — despite "tap to use" and a mobile-app banner.
- **Untested**: global Ctrl+Z (the entire undo-based delete contract), CSV import, saved views, filters, search, org/workspace switching, error/offline/validation states, timers across midnight, timezone/DST, idle detection.
- **No accessibility pass at all** — contrast, focus visibility, tab order, reduced motion, screen readers. Given that a keyboard layer is one of the majors, this is the largest single gap.
- **The AI surface is untouched** — the `✨` action on Tasks, `✨ IMPORT TASKS`, and three shipped AI animations in the bundle.
- **`Targets` in Admin settings may be the same object as `Goals`** — unopened. If so, the Goals finding changes.

---

## 6. Where I'd expect to be wrong

For the tie-breaker's benefit, the three claims I hold most loosely:

1. **The entry↔task join.** I initially called it a blocker; the verifier downgraded it and was right to. Frictionless capture is Toggl Track's moat, and "categorise later" is a legitimate philosophy, not laziness. What I still believe: the *misdiagnosing* Dashboard copy is indefensible.
2. **The 0h/seconds reporting.** Fresh-account measurement confirms this is only a sub-minute edge case. It is polish, not a meaningful retention finding.
3. **Focus mode's absence.** If it's a soft-launch held out of nav deliberately, the discoverability half of the criticism evaporates — the "tap to use" copy slip supports an in-flight-rollout reading. **The silent-failure half has no defence** regardless of intent.

---

## 7. For the three-way comparison

Worth checking against Josip's log and the designer's read:

- Did either of you hit the **unclickable first entry**? It should be reproducible — track ~30 seconds and try to click it on the calendar.
- Did either of you **lose a draft** to an outside click?
- Did either of you find **Focus mode or Goals** without being told they exist?
- Does the **"loud where it sells, silent where it retains"** pattern match what you felt, or is that me over-reading?

Where all three of us independently hit the same thing, it's real. Where we differ, the disagreement is more interesting than the finding.
