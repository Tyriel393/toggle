# Complete user flow map — every state, every decision

**Purpose:** the prototype must behave like a product, not a rail. This maps every screen, every choice a user can make, and every way back — then audits what is actually wired.

**Audited live, 2026-08-18.** 52 interactive elements on `/calendar`.

---

## 1. Routes

| Route | What it is | Status |
| --- | --- | --- |
| `/` | redirect → `/onboarding` | ✅ |
| `/onboarding` | 4-step signup (intent · project · week · calendar) | ✅ full |
| `/calendar` | Timer — where Make room lives | ✅ full |
| `/setup` | Task creation (name · client · due · estimate) | ✅ full |
| `/kit` | Component reference | ✅ |
| `/reports` `/projects` `/tasks` `/timeline` `/members` `/approvals` `/time-off` | Toggl's other sections | ⚠️ stub page |

---

## 2. Onboarding — decisions available

```
STEP 1  intent          → 3 options, one required (prefilled: "See where time goes")
        ‹ none          → Continue (enabled once chosen)
STEP 2  project name    → free text (prefilled) + 12 colour swatches
        ‹ Back          → Continue (disabled while empty)
STEP 3  the week        → 3 items, each toggleable on/off
        ‹ Back          → Continue (always enabled)
        live feedback: ≥2 dated = green "enough to work with"; <2 = amber "needs two dated commitments"
STEP 4  calendar        → Connect Google / Connect Outlook (decorative) · SKIP FOR NOW
        ‹ Back          → Finish setup
ANY STEP  Skip all      → straight to /calendar
```

**Verdict:** complete. Back works at every step, nothing traps.

---

## 3. Timer — the core state machine

### Day gate (demo bar, Day 1–5)

| Day | Page state |
| --- | --- |
| 1 Mon | pre-moment: no prompt, Monday's entries, week fits |
| 2 Tue | pre-moment: Tuesday's entries |
| **3 Wed** | **the moment** — full state machine below |
| 4 Thu | post-repair |
| 5 Fri | payoff line in week-one panel |

### Phase machine (Day 3+)

```
running ──[Stop / S]──► asking
                          │
    ┌─────────────────────┼──────────────────────┬─────────────────┐
    │                     │                      │                 │
 ✓ Done / D        30m·1h·2h / 1·2·3        Custom… / C     Wrong task / W    Not sure / N
    │                     │                      │                 │              │
marked-done          evaluate()             custom input      wrong-task      deferred
    │                     │                   │    │              │              │
    │              ┌──────┴──────┐      submit│    │Back      pick task      quiet marker
    │              │             │            ▼    ▼          │                  │
    │            fits        conflict      evaluate  asking  reassigned          │
    │              │             │                              │                │
    └──────────────┴─────────────┼──────────────────────────────┴────────────────┘
                                 │                    (all end states → Restart)
                    ┌────────────┴────────────┐
              drawer opens               [Esc / ✕]
                    │                          │
        ┌───────────┼───────────┐            kept ──[Review]──► drawer
        │           │           │
   Preview / P   Other options  Keep plan / K
        │           │               │
    previewing   risky move        kept
        │        preview
        │           │
    ┌───┴───┐       │
 Approve  Cancel    │
 Enter      │       │
    │       └───────┘
 approved
    │
 [Undo / Ctrl+Z] ──► back to conflict (schedule restored, remaining kept)
```

### Every terminal state has an exit

| State | Exits |
| --- | --- |
| `marked-done` | Restart · scenario switch · day switch |
| `reassigned` | Restart · scenario · day |
| `deferred` | Restart · scenario · day |
| `fits` | Restart · scenario · day |
| `approved` | **Undo** · Restart · scenario · day |
| `kept` | **Review** (reopens drawer) · Restart · scenario · day |
| drawer open | Esc · ✕ · Keep plan · approve a move |

**Verdict:** no dead ends. Every state reaches every other state via Restart or the day bar.

---

## 4. Audit — what is NOT wired (the gap)

Of 52 controls, **20 are decorative**:

| Group | Controls | Behaviour today |
| --- | --- | --- |
| Rail | Toggle Sidebar · Notifications · Share feedback · Help | nothing |
| Sidebar | workspace switcher · Upgrade · Download apps · Admin settings | nothing |
| Capture bar | `@ Task` · `+ Project` · `# Tags` · `$` | nothing |
| Week toolbar | ‹ week › · 4 view icons · Settings | nothing |
| Meters | View reports | nothing |
| Nav | 7 sections | land on a stub page |

**This is the "is it a real product?" gap.** A tester clicking `@ Task` or `View reports` gets silence, which reads as broken rather than out-of-scope.

---

## 5. The comprehension gap

Reported by a real tester: **"I wasn't sure what feature I was testing or looking at."**

Diagnosis — the prototype tells you *what to do next* (the coach) but never states, up front and plainly:

1. **What the feature is** — Make room
2. **What problem it solves** — a job runs long and silently eats another client's deadline
3. **What you are being asked to judge** — interactions, design, and whether the value is clear
4. **That you may explore freely** rather than follow a script

The brief asks evaluators to assess *the interactions, the design, and the value*. Nothing in the prototype orients them to that.

---

## 6. What to build

| # | Fix | Why |
| --- | --- | --- |
| 1 | **Start screen** naming the feature, the problem, and two ways in — *Guided* or *Explore on my own* | Directly answers the tester's confusion |
| 2 | **Wire every decorative control** to an honest response instead of silence | Removes the "is it broken?" read |
| 3 | **Real content on `/reports`** — the Friday payoff | Turns the most-clicked dead nav item into the retention argument |
| 4 | **A "what am I looking at?" affordance** always available (`?` in the demo bar) | Lets a lost tester re-orient without restarting |
