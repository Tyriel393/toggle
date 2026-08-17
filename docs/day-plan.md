# Assignment day — operating plan

Written 2026-08-17, the day before. Reread this before opening the link.

**The clock starts when you open the assignment link.** Don't open it until you're at your desk, rested, with a clear runway. Not last thing at night.

---

## The one rule that matters most

> **The prototype is the gate.** If it doesn't meet the bar, the rationale, metrics and video are never read.

So the time budget is: **decide fast, build well, leave a real buffer.** Everything below serves that.

---

## Before you open the link (10 min, clock not running)

- [ ] Confirm the kit still deploys: open https://toggl-kit.vercel.app/kit on your phone
- [ ] Have Toggl 2.0 open in a tab, logged in
- [ ] Have your friction log in front of you
- [ ] Screen recorder tested — **camera on**, know the time limit
- [ ] Tell me: *"I'm opening the brief now"* so I know the clock is live

---

## Phase 0 — Read (30 min)

You do this alone. Don't paste it to me yet.

1. **Read the brief twice.** Their guidance says being specific about *what they asked for* is half the work.
2. On the second pass, write down literally:
   - What improvement are they asking for?
   - **Who is it for?** (which role/segment)
   - **What exactly must be submitted?** (formats, limits)
   - What did they explicitly rule in or out?
3. Then paste it to me with those four answers.

**Why you read it before I do:** if I read it first and start reasoning aloud, my framing anchors yours. Your read is the one being graded.

---

## Phase 1 — Verify and decide (60–90 min) ← the highest-leverage hour

This is where the assignment is won or lost. Not in the build.

**Step 1 — I verify assumptions (15 min, parallel).** Give me the brief and I'll check every product claim in it against [`product-map.md`](product-map.md) and the live app. Toggl explicitly warns that AI makes false claims about their product. Some of what the brief implies may not match what's actually shipped — that's worth knowing before you design.

**Step 2 — You bring your direction first.** Tell me what you're thinking *before* asking what I think. Then I pressure-test it against:

- [`ux-analysis.md`](ux-analysis.md) — 33 verified findings, six confirmed majors
- [`accessibility-audit.md`](accessibility-audit.md) — measured, both themes
- [`company-research.md`](company-research.md) — the monetisation ladder and strategy
- your friction log

**Step 3 — the three gates.** A direction ships only if it clears all three:

| Gate | Test |
| --- | --- |
| **Answers the brief** | Not adjacent to it. Literally what they asked. |
| **Not the AI-default** | Would a candidate typing the brief into ChatGPT land here? If yes, either drop it or make execution unmistakably stronger. **"Review today / categorize logged time" is poisoned** unless the brief demands it. |
| **Has the insight** | Can you finish: *"Most people would assume X — actually Y."* If not, keep looking. That sentence is the "I wouldn't have seen that." |

**Step 4 — write the scope cut.** Before any code, write down what you are deliberately **not** building. You'll say this once in the video, confidently. Cutting is on-strategy — "no bloat" is their own stated positioning, twice.

**Hard gate: no code until this phase is done.**

---

## Phase 2 — Plan (45 min)

I write `plan.md`: goal, non-goals, affected files, real code snippets, trade-offs, edge cases, and the mock data shape.

You annotate it inline and send it back: *"I added notes, address all of them. Don't implement yet."*

Expect **2–3 rounds**, not one. Then: *"add a detailed todo list to the plan. Don't implement yet."*

The todo list is what survives context compaction — it's the progress tracker for the whole build.

---

## Phase 3 — Build (4–6 hours)

Execution contract, verbatim:

> Implement it all. When you finish a task or phase, mark it completed in the plan document. Do not stop until all tasks and phases are done. Do not add unnecessary comments or JSDoc. Do not use `any` or `unknown` types. Continuously run typecheck.

What's already done, so you don't spend the window on it:

- Shell, sidebar, top bar, 16 components, Toggl's own icons, Inter self-hosted
- Both themes via `prefers-color-scheme`
- Realistic agency mock data — 12 people, 6 projects, 4 weeks of entries
- Deploy chain proven, SPA routing works, one-command redeploy

**Deploy early and often.** First deploy within the first hour of building, not at the end. A broken deploy discovered at hour 20 is the classic failure.

**Checkpoints** — I'll surface these, you decide:
- Is this still the smallest version that shows the idea?
- Does every button inside the feature actually work?
- Does it still look native beside the real app?

---

## Phase 4 — The cold-open test (30 min) ← do not skip

They open it **before** watching your video. Value must be obvious in **one minute, with no narration.**

Do this literally:

1. Open the deployed link **on your phone**, cold
2. Start a timer for 60 seconds
3. Ask: *without knowing anything, is it obvious what this does and why it's better?*

If not, the fix is usually **cutting**, not adding — copy, empty states, and what's on screen first.

Then the edge cases they grade on: empty state, one item, many items, long names, overflow. And re-check the two things my analysis found Toggl itself gets wrong:

- Does anything read as **"0h"** when it isn't zero?
- Can every element you can create actually be **clicked and edited**?

---

## Phase 5 — Video + rationale (90 min)

**Video:** camera on, real screen recording, demo the prototype itself. Say **"I chose to focus on X"** once, confidently, then move on. Don't apologise for cuts.

**Rationale — this is your known weak spot.** Open answers scored 55% while closed scored 93%, and your own post-mortem named the pattern: stopping at *"I would measure X"* without saying what decision X drives.

So every metric claim gets all five:

1. **Baseline** — what is it now?
2. **Target** — what would success be?
3. **Attribution** — how would you know it was your change? (control/cohort)
4. **Trade-off** — what you gave up
5. **Decision rule** — *"if it does X, I scale; if Y, I kill it"*

And tie it to the ladder from [`company-research.md`](company-research.md): Free→Starter is team capacity, Starter→Premium is money questions. Naming which gate you strengthen turns a feature argument into a business one.

**Where you disagreed with me** — [`DECISIONS.md`](DECISIONS.md) already logs it: you overrode me on icons and on GT Haptik (and that second one made me find the real bug — the app renders Inter, not GT Haptik). That's exactly the "what you added on top" they say they grade.

---

## Phase 6 — Submit with buffer

- [ ] Deployed link opens cold on a device that never saw the dev server
- [ ] Hard-refresh a sub-route — no 404
- [ ] Every button inside the feature works
- [ ] Dead links out of the feature are fine
- [ ] Video within the time limit, camera on
- [ ] Rationale has baseline / target / attribution / trade-off / kill criteria

**Submit with hours to spare, not minutes.**

---

## Realistic shape of the day

| | |
| --- | --- |
| 0:00–0:30 | Read the brief twice, alone |
| 0:30–2:00 | **Verify + decide direction + scope cut** |
| 2:00–3:00 | plan.md, annotate, todo list |
| 3:00–9:00 | Build, deploying throughout |
| 9:00–9:30 | Cold-open test + edge cases |
| 9:30–11:00 | Video + rationale |
| 11:00–12:00 | Buffer, final checks, submit |

**~12 hours of the 24.** The rest is sleep and slack. Do not plan to use all 24 — the tail is for when something breaks.

---

## Two risks worth naming

**Session limits.** We hit one today at 17:20 Zagreb; a multi-agent run died mid-flight. If it happens tomorrow, work continues — the docs, plan and todo list are all on disk and in git, so nothing is lost to a dropped session. Don't rely on long parallel agent runs during the build.

**Me over-contributing.** They grade *your* thinking. If I hand you a direction and you build it, the submission is weaker even if the prototype is better. Keep me on: verification, plan drafting, execution, and pressure-testing. Keep yourself on: the direction, the cut, and the insight.

---

## What I'll say when you open the brief

I'll read it, then ask you the four questions from Phase 0 before offering any opinion — so your read lands first.
