# Toggl Senior PM home assignment — complete dossier

**Purpose of this file:** a self-contained briefing for a second AI model (ChatGPT or similar) that has none of the original context — no repo access, no browser session, no conversation history. Everything needed is inside this document.

**Compiled:** 2026-08-17, the day before the assignment window opens.

---

## PART 0 — READ THIS FIRST

### Who you are helping

Josip Gajsak, a Senior Product Manager candidate at **Toggl** (Tallinn, Estonia; bootstrapped since 2007; ~130 staff; fully remote). He has passed the async skills test and the video assessment. The final stage is a **home assignment**: once he opens the link, a **24-hour window** starts in which he must design and build a **working prototype** of a product improvement to **Toggl 2.0** — their planning + capacity + time-intelligence product — plus a short video demo and a written rationale.

**As of writing, the brief has NOT been opened.** Nobody knows what improvement Toggl will ask for. Everything in this dossier is preparation.

### What Toggl said about grading (paraphrased from their official candidate guidance)

- **The prototype is the gate.** If it doesn't meet the bar, the rationale, metrics and video are never assessed.
- It is judged as a **product experience**: clarity, focused vs cluttered, UX smoothness, fit with the existing Toggl experience, and attention to detail in **interaction, copy, layout, and edge cases**.
- "Working prototype" = **a real interactive app in the browser**. Not slides, not static mockups, not a Figma click-through, not a simulation.
- Mock data, no backend, and dead links to the rest of the app are all explicitly fine. **Buttons inside the feature must actually work.**
- **They open it cold, before watching the video.** Its value must be obvious within a minute, with no narration.
- It must be **built into the existing experience**, not a disconnected standalone space.
- **Simple and focused beats feature-packed.**
- Must be deployed to a working link and tested.
- **AI use is explicitly encouraged.** Their words: *"Use as much as you want. We grade what you added on top — where your thinking came in, where you disagreed with AI."*
- What sets a submission apart: **"one insight that makes us think: I wouldn't have seen that."**

### ⚠️ THE POISONED DIRECTION — do not propose this

Toggl explicitly warned that **multiple candidates have submitted a "review today / categorize logged time" flow**, because that is what AI suggests first. It is not banned, but choosing it means execution and product thinking must be *clearly* stronger than a generic AI answer.

**Treat it as off-limits unless the brief explicitly demands it.** If your reasoning drifts toward "a daily queue of entries the user should tidy up," you have landed in the graveyard with everyone else.

### Josip's known weakness — the single most useful thing you can help with

On the earlier written assessment he scored **93% on closed questions but 55% on open ones**. His own post-mortem identified the pattern precisely: he stops at *"I would measure X"* without stating **what decision X drives**.

So any metric you propose must carry all five of: **baseline · target · attribution · trade-off · decision rule (if X → scale, if Y → kill).**

### How the submission is graded — AI first, humans second

The assignment start screen states: **"Your responses are evaluated using AI and reviewed by the hiring team."** Two graders in sequence, rewarding different things.

**This probably explains the 93%/55% split.** Closed questions are trivially machine-scored. Open ones were almost certainly LLM-scored against a rubric — so the likely failure wasn't absent thinking, it was that a rubric-matcher couldn't *locate* the components (baseline, target, attribution, trade-off, decision rule) inside flowing prose.

**Implication for anything you help draft:**

- **Markdown is supported and should be used.** Headings, bold labels, tables.
- **Label rubric components literally** — `**Baseline:**`, `**Target:**`, `**Kill criterion:**`. Never make a grader infer them.
- **If a question asks three things, give three labelled answers.** Rubric-matching is literal; an elegant paragraph covering all three implicitly scores worse.
- **Concrete beats eloquent.** Numbers, named trade-offs, explicit decision rules.

**But note the paradox:** an AI grader rewards structure, while the *human* reviewer is there to catch content that reads like generic AI output. Toggl said it outright — *"AI's first answer tends to be the same for everyone."*

So the target shape is: **machine-legible structure, unmistakably personal content.** Specifics from Josip's own use of the product, his real uncertainty, and explicitly where he disagreed with the AI (which Toggl says it grades).

**Other mechanics:** the timer runs continuously once started even with the tab closed; answers auto-save; files (PDF/image/doc) can be attached to any question; nothing can be edited after submission.

### What already exists (do not redo this work)

A previous AI session (Claude) spent a full day on preparation. Already done and verified:

1. **A component kit and app shell**, live at `https://toggl-kit.vercel.app/kit` — React + TypeScript + Vite + Tailwind v4, deployed on Vercel, with Toggl's real design tokens, their actual extracted SVG icons, self-hosted Inter, and both light and dark themes.
2. **Realistic mock data** — 12 people with varied contracts, 5 clients, 6 projects, 28 tasks, four weeks of time entries generated so nobody logs a clean 8.0h.
3. **A verified design system** (Part 2), **a verified product map** (Part 3), **company/market research** (Part 4), **a UX analysis** (Part 5), **an accessibility audit** (Part 6), and **an operating plan for the day** (Part 7).

### ⭐ What is actually wanted from YOU

**A genuinely different perspective — not a better-written version of what Claude already concluded.**

Claude's own pre-brief thinking is included in **Part 8** *specifically so you can avoid duplicating it*. The most valuable things you can do:

1. **Disagree with Part 8.** Where is Claude's reasoning weak, overconfident, or anchored on the wrong thing? Its headline claim — that Toggl plans against contracted rather than observed hours — deserves adversarial scrutiny.
2. **Find insights it missed.** Part 5.2 lists what could not be tested (no mobile, no second team member, no populated reports, paywalled modules). Some of the best observations may live in those gaps.
3. **Pressure-test against the brief once it exists.** The brief is not in this file. When Josip pastes it, check every direction against it literally.
4. **Sharpen the metrics** (Part 8 §4), given the 55%/93% gap above.
5. **Be blunt about generic ideas.** If a direction sounds like something any candidate would produce, say so plainly.

### How confident to be about what follows

- Facts marked **verified** were measured or observed directly in the live app.
- Items marked **UNVERIFIED** were not confirmed — do not build reasoning on them.
- The environment inspected was a **single-user workspace on a 31-day Premium trial, dark theme, desktop only, with almost no data**. Anything about populated reports, teams, mobile, or the free-plan boundary is untested.
- Claude was wrong twice during this work — both times by inferring from design tokens instead of measuring rendered output. Both corrections are documented. Treat unmeasured inference with suspicion.

---

## CONTENTS

| Part | Contents |
| --- | --- |
| 1 | Toggl's official assignment guidance (verbatim structure) |
| 2 | Design system — real extracted tokens, components, voice |
| 3 | Product map — verified navigation, object model, flows |
| 4 | Company, market and business model research |
| 5 | UX analysis — 33 adversarially verified findings |
| 5b | Raw UX observation log — 57 numbered observations (the evidence) |
| 6 | Accessibility audit — measured, both themes |
| 7 | Operating plan for the 24-hour window |
| 8 | Claude's pre-brief perspective — **read to diverge from, not to copy** |
| 9 | Decision log — including where Josip overrode the AI |

---


---

# PART 1 — Toggl's official assignment guidance


> Verbatim guidance issued by Toggl before the home assignment. Reread at the start of every working session.
> Source: Toggl candidate guide linked from Valeria Tassinari's 14 Aug 2026 email.

## Timing

The 24-hour window starts the moment the assessment is opened and the brief is read. The link expires one week after issue (14 Aug 2026 + 7 days).

## Do before the clock starts

- The assignment touches on **Toggl 2.0** (https://toggl.com/focus/) — it's free. Use the web app before starting the timer so assessment time goes to the work, not first-time exploration. **"Firsthand product experience is the single biggest differentiator."**
- Get comfortable with an AI build tool (Lovable, v0, Bolt, Cursor, Claude Code…). "Mid-assignment is a bad time to learn one." AI-prototyping is a must-have PM skill at Toggl.

## Once the brief is open

- **Read it twice.** The brief is specific about the improvement wanted, who it's for, and what to submit. "Answering exactly that is half the work."
- **Check assumptions in the app.** Do not rely on AI's claims about the product. Verify before building.

## The prototype

- 🔑 **The prototype is the main decision point.** If it does not meet the bar, they will not move forward — even with strong rationale, metrics, video, or writing.
- Used to assess: product judgment, scope control, UX instincts, attention to detail, and the ability to turn an idea into a convincing, usable product experience.
- Not just an explanation of the idea. It should show **how the real product experience should look, feel, and behave.**
- Assessed as a product experience: clarity, focused vs cluttered, UX smoothness, fit with Toggl Focus, and attention to detail in **interaction, copy, layout, and edge cases**.
- **"Working prototype" = a real interactive app in the browser** — not slides, static mockups, a Figma click-through, or a simulation.
- Mock data, no backend, dead links to the rest of the app: all fine. **Buttons inside the feature must actually work.**
- **They open it cold, before the video.** Value must be obvious within a minute, without narration.
- **Simple and focused beats feature-packed.**
- **Build it into the existing experience**, not as a disconnected standalone space.
- Deploy to a link and test it. "If we can open it, we can judge it."
- 💡 **Avoid the obvious first AI answer.** Several candidates landed on a similar *"review today / categorize logged time"* flow. Not forbidden — but choosing a common direction means execution, product thinking, and trade-offs must be "clearly stronger and more personal than a generic AI suggestion."

## The video

- Demo the prototype — the thing itself, not slides or talking head.
- **Camera on**, real screen recording, within the time limit.
- **Own the scope.** Cutting is expected. Say "I chose to focus on X" once, confidently, then move on.

## AI

- "Use as much as you want. We grade what you added on top — where your thinking came in, where you disagreed with AI."
- "AI's first answer tends to be the same for everyone. Your judgment is what makes the work yours."

## The differentiator

> "What sets a submission apart: one insight that makes us think **'I wouldn't have seen that.'** The rest — what you pick, what you build, what you cut, how you'd measure it — is the assignment."

---

## Operating notes for this project

1. **Toggl's own naming is inconsistent.** This guidance says "Toggl Focus"; the marketing URL is `/focus`; the app's tab title says **"Toggl 2.0"**. In-prototype copy should match the app (Toggl 2.0), since that is what a reviewer sees next to it.
2. **"Firsthand product experience is the single biggest differentiator"** applies to Josip, not to Claude. Claude's browser recon documents the product; it cannot substitute for Josip using it. This must happen before the clock starts.
3. **Rule 3 from the setup brief holds:** Claude does not propose feature directions. Josip's friction log forms first, uncontaminated.
4. **The "review today / categorize logged time" direction is treated as poisoned** unless the brief demands it.
5. **`DECISIONS.md` is the record of disagreements and overrides** — the direct answer to "where your thinking came in, where you disagreed with AI."


---

# PART 2 — Design system (extracted from the live app)


**Source:** live app at `focus.toggl.com`, workspace `21607809`, extracted 2026-08-17.
**Method:** raw stylesheet `assets.focus.toggl.com/assets/index-DZSIMAc0.css` (355 KB, publicly served, no auth) plus `getComputedStyle` on live DOM nodes. No values were read off screenshots or recalled.

Anything not confirmed by direct inspection is marked **UNVERIFIED**.

---

## 0. What the product calls itself

- Browser tab title: **"Toggl 2.0 - Calendar"** — so *Toggl 2.0* is the in-product name. Verified.
- App host: `focus.toggl.com`. Asset host: `assets.focus.toggl.com`.
- URL shape: `/{orgId}/workspaces/{workspaceId}/{view}` — an **organization** layer sits above workspaces.
- The CSS carries a brand scope class **`.focus`**. It is the only brand class present in the bundle; there is no `.track` or `.plan` scope. Accent tokens are defined under it, so accent colour is brand-scoped rather than global.
- Copy in the UI still says "Toggl 2.0" (e.g. the notice "Toggl 2.0 works be…"). Marketing name "Toggl Focus" from the job ad does **not** appear in the app chrome.

## 1. Foundations

Tailwind **v4**, tokens exposed as CSS custom properties.

| | |
| --- | --- |
| Base spacing unit | `--spacing: .25rem` → **4px** |
| Default transition | `.15s cubic-bezier(.4, 0, .2, 1)` |
| Easing | `--ease-out: cubic-bezier(0,0,.2,1)`, `--ease-in-out: cubic-bezier(.4,0,.2,1)` |
| Letter spacing | tight `-.025em`, normal `0`, wide `.025em`, wider `.05em` |
| Blur | xs `4px`, sm `8px`, md `12px`, lg `16px` |
| Containers | 3xs `16rem` → 4xl `56rem` |

### Theme

The app ships **both light and dark themes**, toggled by a `.dark` / `.light` class on the root. The account inspected was in **dark**. Every semantic token below has a value in each theme.

## 2. Colour

Colours are stored as **space-separated RGB triples** (`28 26 28`), the Tailwind v4 pattern that allows `rgb(var(--token) / <alpha>)`. Overlay tokens are hex-with-alpha instead.

### Naming convention

```
--{property}-{role}[-{state}]
  property: background | foreground | stroke | illustration | elevation
  role:     primary | secondary | tertiary | inverted | light | dark | muted |
            accent | success | warning | error | destructive | affirmative |
            on-surface | on-surface-inverted | stop-timer | data | data-muted | data-charts
  state:    (base) | hover | active | disabled
```

Every role carries all four states. This is unusually complete — matching it is the single cheapest way to look native.

### Neutrals — the full ramp

Both themes are built from one 9-step neutral ramp:

| Hex | RGB | Used as |
| --- | --- | --- |
| `#000000` | `0 0 0` | dark: page background (tertiary) |
| `#131213` | `19 18 19` | dark: secondary bg; light: primary text |
| `#1C1A1C` | `28 26 28` | dark: card/primary bg; light: inverted bg |
| `#3C393B` | `60 57 59` | dark: borders, hover |
| `#575456` | `87 84 86` | dark: tertiary text; light: secondary text |
| `#827F81` | `130 127 129` | mid grey |
| `#B3B0B2` | `179 176 178` | dark: secondary text; light: tertiary text |
| `#CFCDCF` | `207 205 207` | light: secondary border |
| `#E9E8E8` | `233 232 232` | light: tertiary bg / primary border |
| `#F5F5F5` | `245 245 245` | light: secondary bg |
| `#FFFFFF` | `255 255 255` | light: page/card bg |

### Semantic tokens — light / dark

Values are RGB triples.

| Token | Light | Dark |
| --- | --- | --- |
| `foreground-primary` | `19 18 19` | `255 255 255` |
| `foreground-primary-hover` | `28 26 28` | `245 245 245` |
| `foreground-primary-active` | `60 57 59` | `233 232 232` |
| `foreground-primary-disabled` | `130 127 129` | `87 84 86` |
| `foreground-secondary` | `87 84 86` | `179 176 178` |
| `foreground-secondary-hover` | `60 57 59` | `207 205 207` |
| `foreground-secondary-active` | `28 26 28` | `233 232 232` |
| `foreground-secondary-disabled` | `207 205 207` | `87 84 86` |
| `foreground-tertiary` | `179 176 178` | `87 84 86` |
| `foreground-tertiary-hover` | `130 127 129` | `130 127 129` |
| `foreground-tertiary-active` | `87 84 86` | `179 176 178` |
| `foreground-tertiary-disabled` | `245 245 245` | `19 18 19` |
| `foreground-inverted` | `255 255 255` | `19 18 19` |
| `foreground-light` | `255 255 255` | `255 255 255` |
| `background-primary` | `255 255 255` | `28 26 28` |
| `background-primary-hover` | `245 245 245` | `60 57 59` |
| `background-primary-active` | `233 232 232` | `87 84 86` |
| `background-secondary` | `245 245 245` | `19 18 19` |
| `background-secondary-hover` | `233 232 232` | `28 26 28` |
| `background-secondary-active` | `207 205 207` | `60 57 59` |
| `background-tertiary` | `233 232 232` | `0 0 0` |
| `background-tertiary-hover` | `207 205 207` | `19 18 19` |
| `background-tertiary-active` | `179 176 178` | `28 26 28` |
| `background-inverted` | `28 26 28` | `255 255 255` |
| `background-inverted-secondary` | `87 84 86` | `179 176 178` |
| `background-dark` | `28 26 28` | `60 57 59` |
| `background-dark-hover` | `60 57 59` | `87 84 86` |
| `background-dark-active` | `87 84 86` | `130 127 129` |
| `stroke-primary` | `233 232 232` | *see note* |
| `stroke-secondary` | `207 205 207` | *see note* |
| `stroke-tertiary` | `179 176 178` | *see note* |
| `stroke-muted` | `245 245 245` | *see note* |

Note: dark-theme `stroke-*` values follow the same inversion pattern; the measured sidebar border renders `rgb(60, 57, 59)`.

### Overlay tokens

Used for hover/press on top of arbitrary surfaces rather than replacing the background.

| Token | Light | Dark |
| --- | --- | --- |
| `background-on-surface` | `#0000` | `#fff0` |
| `background-on-surface-hover` | `#00000014` (8%) | `#ffffff1f` (12%) |
| `background-on-surface-active` | `#00000029` (16%) | `#ffffff33` (20%) |
| `background-on-surface-disabled` | `#0000` | `#fff0` |

### Accent — brand scope `.focus`

Magenta/orchid. Note it **flips direction** between themes: light uses the saturated mid-tone, dark uses a lighter tint.

| Token | Light | Dark |
| --- | --- | --- |
| `foreground-accent` | `168 76 157` `#A84C9D` | `194 130 185` `#C282B9` |
| `foreground-accent-hover` | `99 46 92` | `220 167 211` |
| `foreground-accent-active` | `66 36 62` | `236 204 230` |
| `foreground-accent-disabled` | `220 167 211` | `168 76 157` |
| `background-accent` | `168 76 157` | `194 130 185` |
| `background-accent-hover` | `99 46 92` | `220 167 211` |
| `background-accent-active` | `66 36 62` | `236 204 230` |
| `background-muted` | `246 229 243` | `55 31 52` |
| `background-muted-hover` | `236 204 230` | `66 36 62` |
| `stroke-accent` | `236 204 230` | `66 36 62` |

Focus ring: `--color-accent-ring: #A84C9D`, hover `#632E5C`, dark `#C282B9`.

### Semantic status

| Role | Light bg | Light fg | Dark bg | Dark fg |
| --- | --- | --- | --- | --- |
| success | `216 240 216` | `30 112 42` | `18 61 23` | `157 204 159` |
| warning | `253 232 198` | `105 69 0` | `88 61 0` | `243 194 106` |
| error | `248 213 207` | `138 7 1` | `73 0 0` | `250 184 172` |

Two **action** roles sit apart from the status roles — solid button fills rather than tinted surfaces:

| Role | Light | Dark |
| --- | --- | --- |
| `background-destructive` | `161 40 28` | `175 62 48` |
| `background-affirmative` | `47 134 58` | `70 148 77` |

And one product-specific token: **`background-stop-timer`** — light `198 91 76`, hover `175 62 48`, active `161 40 28`. A dedicated colour for the stop-timer control, distinct from both `destructive` and `error`. Worth mirroring; it is the kind of detail that reads as native.

There is also `--color-gold: #C8910A`, used for premium/upgrade affordances. **UNVERIFIED** where exactly it renders.

### Data-visualisation palette

`--background-data-*`, `--foreground-data-*`, `--stroke-data-*`, `--background-data-charts`, `--background-data-charts-strong` all resolve to `var(--*-data-light)` / `var(--*-data-dark)`.

**Those source variables are never defined in the stylesheet** — they compute to empty at `:root`. They are injected inline per element, so each project/task carries its own data colour. Confirmed by reading computed root values (all empty) and grepping the bundle (zero definitions).

Implication for the kit: chart and project colours must be set as inline CSS variables on the element, not picked from a global palette.

**The project colour palette — verified**, read directly from the colour picker in the New Project modal. Twelve colours, presented as a 6×2 grid of round swatches:

| # | Hex | RGB |
| --- | --- | --- |
| 1 | `#DD3919` | `221 57 25` |
| 2 | `#E54C87` | `229 76 135` |
| 3 | `#9447E1` | `148 71 225` |
| 4 | `#5252D6` | `82 82 214` |
| 5 | `#5AA4D8` | `90 164 216` |
| 6 | `#79A02C` | `121 160 44` |
| 7 | `#1DA58C` | `29 165 140` |
| 8 | `#C7A600` | `199 166 0` |
| 9 | `#FA9200` | `250 146 0` |
| 10 | `#1AB233` | `26 178 51` |
| 11 | `#E024E0` | `224 36 224` |
| 12 | `#6C6C7A` | `108 108 122` |

Below the grid: a **`CUSTOM COLOR`** action (accent, uppercase) and a **`NONE`** radio option. So project colour is optional.

Note this palette is entirely separate from the UI accent — a project is never magenta by default. The primitive families in the bundle (`grape`, `plum`, `purple`, `orange`) are UI-side tints, not this set.

### Elevation

Shadows are colour tokens consumed by Tailwind shadow utilities, not full shadow definitions.

| Token | Light | Dark |
| --- | --- | --- |
| `elevation-raised-5` | `#0000000a` | `#00000033` |
| `elevation-raised-10` | `#00000014` | `#00000052` |
| `elevation-raised-20` | `#00000029` | `#00000063` |
| `elevation-raised-50` | `#0000003d` | `#00000080` |
| `elevation-sunken-10` | `#0000000f` | `#0000003d` |
| `elevation-sunken-10-secondary` | `#ffffff1f` | `#ffffff05` |
| `elevation-sunken-20` | `#0000000f` | `#0000003d` |
| `elevation-sunken-20-secondary` | `#ffffff66` | `#ffffff05` |

Sunken variants pair an inset top shadow with an inset bottom highlight:
`inset 0 1px 0 0 var(--elevation-sunken-10), inset 0 -1px 0 0 var(--elevation-sunken-10-secondary)`.

Measured on the calendar view, live elements carried **no active box-shadow** — the interface is flat, separated by 1px borders rather than elevation. Shadows appear reserved for overlays. **UNVERIFIED** for modals/dropdowns until those are opened.

## 3. Typography

### Family — the app renders in Inter, not GT Haptik

**Computed** `font-family` on `body` and on every sampled text node:

```
Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
```

The bundle *declares* a GT Haptik stack, but a later `font-family: Inter, sans-serif !important` rule overrides it everywhere. **GT Haptik never renders.**

Evidence:

| Check | Result |
| --- | --- |
| Computed `font-family` | GT Haptik absent from the resolved stack |
| Canvas width probe, 40px "Handgloves 123" | `"GT Haptik"` → 261px · nonexistent font → **261px** · `Inter` → 277px |
| `document.fonts` status | all 5 GT Haptik faces `unloaded`; Inter `loaded` |
| Network | `GT-Haptik-Regular-*.woff2` is fetched, then never applied |

Inter is served as a **variable font, weight range 100–900**, normal + italic, with `unicode-range` subsetting (Latin, Latin-ext, Cyrillic, Greek, Vietnamese) — the Google Fonts delivery pattern.

Consequences:

- Weights 500 and 600 are **real**, not synthesised. A variable Inter reproduces them exactly.
- Inter is **SIL Open Font License** — free to self-host, no licensing question.
- Mono stack: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, …`

Dead code in their bundle, recorded so nobody re-derives it: `GT Haptik` @font-face at weights 400/500/700 plus `GT Haptik Rotalic` at 400/500. The **500 and Rotalic-500 sources point at an unresolved bundler alias** (`@toggl/fonts/gt-haptik/gt-haptik-medium.woff2`) rather than a URL, so they could never have loaded even without the `!important` override.

### Scale — measured from rendered DOM

| px / weight | Line height | Tracking | Used for |
| --- | --- | --- | --- |
| 22 / 400 | 22px | normal | Calendar date numeral (inactive day) |
| 22 / 600 | 22px | normal | Calendar date numeral (today) |
| 20 / 600 | 28.6px | normal | Page title — "What are you working on?" |
| 20 / 600 | 32px | normal | Notice/banner heading |
| 16 / 400 | 24px | normal | Body large |
| 14 / 600 | 20.02px | normal | Emphasised body, workspace name |
| 14 / 500 | 20.02px | normal | **Body / default UI label** — the workhorse |
| 14 / 600 | 14px | normal | Calendar weekday (today) |
| 14 / 500 | 14px | normal | Calendar weekday |
| 12 / 500 | 16.08px | normal | Secondary label, card body |
| 12 / 500 | 16.08px | 0.3px | Badge — "Suggested" |
| 12 / 500 | 12px | normal | Compact inline label |
| 11 / 600 | 16.06px | 0.275px | **Sidebar section header** — "Track", "Plan" ¹ |
| 11 / 500 | 16.06px | 0.32px | Calendar time gutter — "1:00 AM" |
| 11 / 600 | 16.06px | 0.32px | Avatar initials |

¹ **Corrected 2026-08-17.** An earlier draft assigned these uppercase labels to `foreground-tertiary`. Measured contrast is **9.77:1**, which `foreground-tertiary` cannot produce (it would give 2.31:1) — so the token assignment was wrong. Also note the source text is **title-case ("Track") with CSS `text-transform: uppercase`**, not literal capitals. That is the screen-reader-correct choice and worth reproducing exactly. See `accessibility-audit.md`.

Observations worth copying:

- Weights in use are **400 / 500 / 600**. 500 is the default, not 400 — UI text is medium by default. But `@font-face` only ships 400/500/700, so **600 is synthesised** by the browser. A prototype using a variable font at true 600 will look slightly heavier than the real app.
- Line-height ratio is consistently ≈**1.43** (20.02/14, 28.6/20, 16.06/11).
- Tracking is applied only at 11–12px, at 0.275–0.32px (≈0.025em, i.e. `tracking-wide`). Larger sizes run at normal.
- The scale is tight: 11, 12, 14, 16, 20, 22. No 18, no 24+ in this view.

## 4. Spacing, layout, radius

| | Measured |
| --- | --- |
| Base unit | 4px |
| Sidebar | **249px** total (248px + 1px right border `rgb(60,57,59)`); transparent background |
| Header / top bar | **64px** |
| Workspace switcher button | 64px tall, padding `10px 8px 10px 16px` |
| Standard button height | **32px** |
| Icon button | 32px, some 36px |
| Small/compact button | 26px, padding `6px 8px` |
| Primary action (play) | 36px, fully rounded, `background-accent` |

### Radius scale

Measured frequency across the live DOM:

| Radius | Count | Use |
| --- | --- | --- |
| **8px** | 37 | Default — buttons, cards, inputs |
| **4px** | 10 | Small elements, badges |
| **full** (`9999px`) | 9 | Avatars, play button, pills |
| 8px 0 0 8px / 0 8px 8px 0 | 4 | Segmented control ends |
| 6px | 1 | one-off |
| 32px | 1 | one-off |

Effectively a **4 / 8 / full** scale. 8px is the default for almost everything.

### Button padding

| Variant | Padding |
| --- | --- |
| Labelled (top bar: "Task", "Project", "Tags") | `0 14px`, h32 |
| Sidebar nav item | `0 8px`, h32 |
| Compact icon | `6px 8px`, h26 |
| Segmented control | `0 12px`, h32 |

## 5. Iconography

**Not Lucide.** A bespoke Toggl set:

- viewBox **`0 0 16 16`** on 44 of 47 icons in view
- Rendered at **16×16** (Tailwind `size-4`); also 12, 14, 18, 20, 24
- **Filled, not stroked** — `fill="currentColor"` on paths, `fill="none"` on the `<svg>` root; 43 of 47 carry no `stroke-width`
- `stroke-linecap="round" stroke-linejoin="round"` present on the root even for filled paths
- Inlined per-component as React SVG — no sprite sheet, no `<use>` reference
- Common classes: `pointer-events-none size-4 shrink-0 text-current`

> ⚠️ The brief assumed Lucide. Lucide is 24×24 **stroked** at stroke-width 2 — visibly different weight and construction. Dropping Lucide icons into a Toggl-native frame will read as foreign. See `DECISIONS.md`.

## 6. Motion

| Token | Value |
| --- | --- |
| Default duration | `.15s` |
| Default easing | `cubic-bezier(.4, 0, .2, 1)` |
| `animate-spin` | `spin 1s linear infinite` |
| `animate-pulse` | `pulse 2s cubic-bezier(.4,0,.6,1) infinite` |
| `animate-ping` | `ping 1s cubic-bezier(0,0,.2,1) infinite` |
| `animate-ping-dot` | `ping-dot 1.4s cubic-bezier(0,0,.2,1) infinite` |
| `animate-bounce` | `bounce 1s infinite` |
| `animate-onboarding-pulse` | `onboarding-pulse 1.4s ease-in-out infinite` |
| `animate-onboarding-loader` | `onboarding-loader 1.3s ease-in-out forwards` |
| `animate-settings-section-glow` | `settings-section-glow 1.4s ease-out` |
| `animate-ai-rotating-enter` | `ai-rotating-enter .28s cubic-bezier(.4,0,.2,1) both` |
| `animate-ai-rotating-exit` | `ai-rotating-exit .28s cubic-bezier(.4,0,.2,1) both` |
| `animate-ai-reveal-in` | `ai-reveal-in .35s ease-out both` |

The bundle also ships a **`motion-*` preset library** (`motion-preset-slide-up-md`, `motion-preset-fade`, `motion-preset-fade-lg`, `-motion-translate-x-in-100`) — a third-party Tailwind motion plugin.

Three dedicated **AI animations** exist in the shipped bundle. Noting as fact only.

## 7. Components

Measured across Calendar, Projects, the New Project modal, and Reports.

### Buttons — two sizes

| Context | Height | Radius | Padding | Font |
| --- | --- | --- | --- | --- |
| Toolbar / nav / compact | **32px** | 8px | `0 14px` labelled, `0 8px` nav | 14/500 |
| Form / modal / primary | **36px** | 8px | — | 14/**600** |
| Small icon | 26px | 8px | `6px 8px` | — |

Form buttons are one weight heavier than toolbar buttons. Easy to miss, cheap to match.

| Variant | Background | Foreground | Border |
| --- | --- | --- | --- |
| Primary | `background-accent` `194 130 185` | `19 18 19` (dark ink on accent) | none |
| Secondary | `background-primary` | `foreground-primary` | 1px `87 84 86` |
| Ghost / toolbar | transparent | `foreground-primary` | none |
| Play / start timer | `background-accent`, 36px circle | — | none |

Primary buttons put **dark text on the accent**, not white. Getting this backwards is the most visible possible mismatch.

### Form controls

| Component | Measured |
| --- | --- |
| Input / select field | h**36**, r8, padding `0 12px`, 1px border, bg `background-primary`, text 14/500 |
| Field border (focused) | `179 176 178` |
| Field label | uppercase, small, `foreground-secondary` |
| Helper text | *italic*, below field — e.g. "Only visible to project members" |
| Toggle / switch | track **32×20**, r-full; thumb **16px** circle; `data-state="checked"｜"unchecked"` |
| Segmented control | h36 in forms, h32 in toolbars; r8 outer corners only (`8px 0 0 8px` / `0 8px 8px 0`); active segment filled `background-muted` with accent text |
| Colour picker | popover, 6×2 grid of round swatches, + `CUSTOM COLOR` link + `NONE` radio |

### Modal

| | |
| --- | --- |
| Width | **480px** |
| Radius | 8px |
| Background | `background-primary` (`28 26 28` dark) |
| Border | **1px `60 57 59`** |
| Shadow | **none** — flat, separated by border alone |
| Padding | 0 on the shell; sections carry their own |
| Header | Title Case title, left; optional action + close ✕ right |
| Footer | secondary left, primary right; primary shows a `↵` shortcut hint |
| Dismiss | **Escape closes it** (verified) |

The absence of a shadow is worth repeating — this UI separates layers with 1px borders, not elevation, even for overlays.

### Card

| | |
| --- | --- |
| Radius | 8px |
| Background | `background-primary` |
| Border | 1px `60 57 59` |
| Padding | `12px 24px` |
| Header | label left, control(s) right on the same row |

### Table

Columns observed on Projects: `PROJECT · CLIENT · BILLABLE · RATE · DATES · TIME STATUS · FIXED FEE · VARIANCE · TAGS★`

- Header row: **uppercase**, small, `foreground-tertiary`
- Sortable columns carry a vertical double-chevron affordance
- Leading select-all checkbox; per-row checkbox
- Row selection reveals a contextual action bar: `Edit · Archive · Delete · Cancel selection`
- Horizontal scroll for overflow columns
- Below the last row, an inline **`+ ADD PROJECT`** action (uppercase)

### KPI / stat row

Four metrics in a row separated by vertical rules — Logged time, Billable time, Amount, Average daily hours.

- Label **14/600**, `foreground-primary`
- Value **20/600**, line-height 32px
- Secondary qualifier inline in parentheses and dimmed — e.g. `0h (0%)`

### Drawer / slide-over

Used for the task editor. Verified.

| | |
| --- | --- |
| Width | **500px**, full height, right-anchored |
| Background | `background-primary` |
| Border | 1px left, `60 57 59` |
| Header | status checkbox · `New task ▾` · lock icon · close ✕ |
| Body | title field, description placeholder, then a label/value field list |
| Collapsible sections | `› Subtasks`, `› Allocation` — chevron rotates on expand |
| Footer | `Cancel` (ghost) + `Create task` (primary), right-aligned |

Field rows are a two-column list — icon + label on the left, value or `Empty` placeholder on the right. `Empty` is the literal placeholder string.

### Empty states — two distinct patterns

An earlier draft of this document generalised from Reports and claimed empty states never use illustrations. **That is wrong.** There are two patterns, and which one is used depends on scope:

**A. Inline / in-container** — used when a *section* has no data (chart body, card body):

- No illustration, no icon, no button
- Title **20/600 / 32px**, `foreground-primary` — "No logged time"
- Body 14/500, `foreground-secondary`, with **underlined inline links** rather than buttons — "Schedule or log time", "Log time to see where your time goes"
- Centred in its container, not the page

**B. Full-view** — used when an entire *view* has no data:

- **Illustration** — flat geometric shapes in accent magenta + gold + neutral, or a cluster of avatars
- Title 20/600 — "What do you plan to work on today?", "Plan capacity across your team"
- Body, two lines, `foreground-secondary`, centred
- **Primary button** — `＋ Create a new task`, `Invite members`
- Optionally a secondary route below: `OR` then `✨ IMPORT TASKS` (uppercase, accent)

The distinction is worth copying exactly: a feature that shows an illustrated empty state inside a card, or a bare text one for a whole view, will read as subtly wrong.

### Banner / promo

Full-width inside content area, `background-muted` (dark `55 31 52`), icon left, accent-coloured heading + secondary body, action button right, `✕` dismiss far right.

### Menus / popovers

Radix-based (`[data-radix-popper-content-wrapper]`). Pattern:

- Uppercase group heading — `DEFAULTS`, `STATUSES`
- Item rows: icon or emoji + label, current item marked with a **✓** on the right
- Premium items carry a trailing **★**
- A divider, then a create action — `＋ Save as new view`

Verified menus: Timeline group-by (`People / Projects / Tags`), report type (`Summary / Utilization ★ / Workload ★ / Profitability ★ / Time logs / Time off ★`), task status (`🗒️ Todo / 🚧 In Progress / 🚫 Blocked / ✅ Done`), capacity window (`Auto / This·Next·Last week / This·Next·Last month / Off`).

Emoji are used as status icons — not the custom SVG set.

### Still unverified

Tooltip, Toast, Tabs, Skeleton vs spinner, DatePicker, ProgressBar / capacity bar, destructive-confirm dialog, and hover/focus/disabled states for inputs and selects.

## 8. Voice and copy — observed so far

Real strings captured verbatim:

- `What are you working on?` — timer prompt, page title
- `Task` · `Project` · `Tags` — top-bar entity buttons, **sentence case**
- `Track` · `Analyze` · `Plan` · `Manage` — sidebar section headers, **uppercase** at 11/600
- `Timer` · `Reports` · `Projects` · `Tasks` · `Timeline` · `Members` · `Approvals` · `Time off`
- `This week • W34` — date range with ISO week number
- `5 Days` — view-length selector
- `SUGGESTED` / `Plan tomorrow's first task` — suggestion card
- `Meeting?` / `Connect calendar →` — calendar-connect prompt, trailing arrow
- `Get started` `2/4` — onboarding checklist with fraction progress
- `Create a project` · `Start a time entry` · `View your reports` · `Plan a time slot` — checklist items, **imperative**
- `DON'T SHOW THIS AGAIN` — dismissal, uppercase
- `Upgrade` `31 DAYS` · `Download apps` · `Admin settings`

From Projects, the New Project modal, and Reports:

- `New Project` — modal title, **Title Case**
- `START FROM TEMPLATE ›` — uppercase, with `›`
- `NAME` · `CLIENT` · `PRIVACY` · `INVITE MEMBERS` — field labels, **uppercase**
- `Project name` · `Search` — placeholders, sentence case
- `Draft` — inline toggle label
- `Private` / `Shared` — segmented options
- `Only visible to project members` — helper text, *italic*
- `More options` · `Create project` — modal buttons, sentence case
- `CUSTOM COLOR` · `NONE` — colour picker
- `ADD PROJECT` — inline table action, uppercase
- `Active` · `Filters` · `Group by` · `Sort by` — toolbar controls
- `PROJECT · CLIENT · BILLABLE · RATE · DATES · TIME STATUS · FIXED FEE · VARIANCE · TAGS` — table headers, uppercase
- `Edit` · `Archive` · `Delete` · `Cancel selection` — row actions
- `Rounding off` · `Export` · `Shown in USD` — Reports header
- `Summary` · `This week • W34` — report type and range
- `Logged time` · `Billable time` · `Amount` · `Average daily hours` — KPI labels
- `Member and task breakdown` / `Breakdown by: Member` / `and: Task` — a sentence split across two dropdowns
- `No logged time` — empty-state title
- `Schedule or log time` — empty-state body, underlined inline links
- `Log time to see where your time goes` — empty-state body
- `Checking your numbers on the web?` / `See your tracked time from anywhere, right on your phone.` / `Get the mobile app` — promo banner
- `Premium trial — 31 days left. View plans` — trial affordance, em dash
- `Share feedback` · `Help` · `Switch Workspace` · `Toggle Sidebar` — aria labels

### Tone — verified read

- **Sentence case is the default** for buttons, placeholders, nav, KPI labels, and body.
- **Uppercase is a deliberate register**, not decoration. It marks: sidebar section headers, form field labels, table headers, inline table actions, and dismissal links. Small (11–12px), 600 weight, slight positive tracking.
- **Title Case appears only in modal titles** ("New Project"). Nowhere else.
- **Contractions are used** — "Plan tomorrow's first task", "DON'T SHOW THIS AGAIN".
- **Imperative, second person** for actions — "Create a project", "View your reports", "Log time to see where your time goes".
- Empty states **explain the consequence**, not just the state: "…to see where your time goes" rather than "No data".
- Questions are used as headings — "What are you working on?", "Checking your numbers on the web?"
- Punctuation: `•` separates date range from week number, `—` (em dash) in the trial notice, `→` and `›` as inline affordances instead of chevron icons.
- No exclamation marks, no marketing voice, no jargon anywhere in the app chrome.

**UNVERIFIED:** error messages, destructive-confirmation copy, tooltips, toasts. Those need to be triggered.

---

## Open items

1. Component states — hover/focus/disabled for inputs, selects, and buttons.
2. Interaction patterns — drawers, toast position and duration, loading (skeleton vs spinner), destructive confirmation.
3. Tooltip, Tabs, DatePicker, ProgressBar / capacity bar.
4. Light theme rendered check — tokens are known, appearance is not.
5. Where `--color-gold` renders (likely the premium ★ markers on Timeline / Approvals / Time off).
6. Whether the sidebar is user-resizable (249px is an odd fixed width).
7. Timeline and Time off views not yet opened — they carry the capacity UI.


---

# PART 3 — Product map (verified)


**Source:** live app at `focus.toggl.com`, organization `21608580`, workspace `21607809`, on a **31-day Premium trial**. Extracted 2026-08-17.
**Method:** direct navigation and DOM inspection. Nothing recalled from training data.

Anything not confirmed by direct inspection is marked **UNVERIFIED**. Plan-gating conclusions are limited by the fact that this account is on a trial — see §10.

---

## 1. Naming and URL structure

Tab titles say **"Toggl 2.0 — {View}"**. The hostname is `focus.toggl.com`. Toggl's own candidate guidance calls it "Toggl Focus". All three are in play; the app's own chrome says Toggl 2.0.

```
focus.toggl.com/{orgId}/workspaces/{workspaceId}/{view}
                21608580            21607809
```

An **organization** layer sits above workspaces. The workspace switcher is labelled "Switch Workspace"; the top-left control shows the org name ("Josip Gajsak393's organization").

Views append their own state to the URL as query params — e.g. Tasks is `?s=-priority&f=auid%3D7667433&v=gb%3Ddates` (sort, filter, view-grouping). Sub-views append a path segment (`/timeline/users`, `/reports/summary`, `/time-off/team-requests`).

## 2. Navigation

Sidebar, four labelled groups. ★ marks a premium/add-on feature.

| Group | Item | Route |
| --- | --- | --- |
| **TRACK** | Timer | `/calendar` |
| **ANALYZE** | Reports | `/reports` |
| **PLAN** | Projects | `/projects` |
| | Tasks | `/tasks` |
| | Timeline ★ | `/timeline` |
| **MANAGE** | Members | `/members` |
| | Approvals ★ | `/approvals?status=submitted` |
| | Time off ★ | `/time-off` |

Note the mismatch worth remembering: the nav item is **"Timer"** but the route is **`/calendar`**, and the Tasks route renders a page titled "Tasks · List" while the browser tab says **"Inbox"**. Internal naming and user-facing naming have drifted apart in at least two places.

Sidebar footer: `Upgrade` (with a `31 DAYS` trial badge), `Download apps`, `Admin settings`. Rail icons: avatar, Notifications, Share feedback (→ Typeform), Help. A "Toggle Sidebar" control collapses it.

**There is no top-level "Board" or "Capacity" section.** Both exist, but as modes inside other views — see §3.

## 3. The views

### Timer — `/calendar`

Week calendar grid. Default range **5 Days**; time gutter down the left; today's column marked in accent with a live time indicator line.

- Top bar: the prompt **"What are you working on?"**, then entity buttons `@ Task`, `+ Project`, `# Tags`, a `$` billable toggle, a running duration `0:00:00`, and a round accent **play** button.
- View controls: `‹` `This week • W34` `›`, a `5 Days` selector, then four layout icons, a settings gear, and a right-panel toggle.
- Suggestion cards appear inline on the grid with a dashed border and a `SUGGESTED` label — e.g. "Plan tomorrow's first task", with ✓ / ✕ accept-dismiss controls.
- A calendar-connect prompt appears as a ghost event: "Meeting?" / "Connect calendar →".

**UNVERIFIED:** what the four layout icons switch between, and what the right-hand panel contains.

### Tasks — `/tasks`

Page header reads **"Tasks · List"**. Two view modes via a toggle: **List** and **Board** (button label: "Switch to board view"). This is the "Board" from the brief — a mode, not a section.

- Toolbar: `My tasks ▾` · `Filters` (with a count badge) · `Group by: Date` + `＋` · `Sort by: Priority ↓`
- Right: list/board toggle, search, a sparkle (AI) action, settings
- Primary action: `Add task`
- Empty state: illustration + "What do you plan to work on today?" + `＋ Create a new task` + `OR` + `✨ IMPORT TASKS`

### Timeline — `/timeline/users` ★

**This is the capacity view.** Horizontal swimlane chart: one row per person (or project/tag), days across the top grouped into weeks (`W34`, `W35`) under a month header.

- Group by: **People / Projects / Tags**, plus `Save as new view`
- Toolbar: `Filters` · `Sort by: Name ↑` · `Capacity: This week`
- Right: date nav, a `Weeks` zoom selector, zoom −/+, settings, panel toggle
- Rows show a capacity bar and a remaining figure — e.g. **"40h free"**
- A permanent **"No assignee"** lane sits above the people lanes
- Primary action: `Add member`

**Capacity window options:** `Auto` (follows the timeline zoom) · This week · Next week · Last week · This month · Next month · Last month · `Off`.

Empty state: illustration + "Plan capacity across your team" / "See who's overbooked or under capacity at a glance. This space fills with a lane for each person you invite." + `Invite members`.

### Projects — `/projects`

Table view.

- Columns: `PROJECT · CLIENT · BILLABLE · RATE · DATES · TIME STATUS · FIXED FEE · VARIANCE · TAGS ★`
- Toolbar: `Active ▾` (status filter) · `Filters` · `Group by` · `Sort by`; right: search, `Manage project templates`, settings
- Row selection reveals `Edit · Archive · Delete · Cancel selection`
- Inline `＋ ADD PROJECT` below the last row, plus a `New project` primary button

**`VARIANCE` and `TIME STATUS` are project-level columns** — estimate-vs-actual surfaced in the list, not only in reports. See §6.

### Members — `/members`

Table. Columns: `MEMBER · ROLE · TIME OFF · RATE · COST · WORKING HOURS`.

Observed values: role `Organization Owner`; time off rendered as two lines, **"0 days taken / 0 days booked"**; Rate `None`; Cost `None`; Working hours `-`.

Empty/CTA state: "Set rates and costs per person — Invite your team to calculate profitability."

**Rate and cost are separate fields** — billing rate vs internal cost, which is what makes the Profitability report possible.

### Approvals — `/approvals` ★

"Review and approve timesheets — Let your team submit timesheets for approval — review, approve, and lock time in one place."

Actions: `Invite members`, `New timesheet setup`. Status is a URL param (`?status=submitted`), implying at least submitted/approved/rejected states. **UNVERIFIED:** the full status set.

### Time off — `/time-off/team-requests` ★

**Paywalled even on the Premium trial.** Shown as a separate paid add-on:

> "Time off that powers capacity planning — Manage time off where you plan and track work, with approved leave automatically reflected in team capacity."
>
> Track balances & accruals · See who's available before you plan work · Approve time off requests—or auto-approve
>
> **Start 30-day free trial — $2/user/month billed annually**

So approved leave feeds capacity, but only if the add-on is bought. **UNVERIFIED:** how holidays and partial availability are modelled, since the module is not accessible.

### Reports — `/reports/summary`

Six report types under a `DEFAULTS` heading, plus `＋ Save as new view`:

| Report | Premium |
| --- | --- |
| **Summary** | — (current default) |
| **Utilization** | ★ |
| **Workload** | ★ |
| **Profitability** | ★ |
| **Time logs** | — |
| **Time off** | ★ |

Summary layout: a 4-metric KPI row — `Logged time · Billable time (with %) · Amount · Average daily hours` — then a **Logged time** bar chart with a metric selector, then a **Member and task breakdown** panel with two chained dropdowns reading as a sentence: `Breakdown by: Member` `and: Task`.

Header controls: `Rounding off ▾`, `Export ▾`, `Summary ▾`, date range `‹ This week • W34 ›`, `Filters`, `Shown in USD ▾`, settings.

## 4. Object model

Verified from the create/edit forms.

### Project

From the **New Project** modal:

| Field | Required | Notes |
| --- | --- | --- |
| Colour | optional | 12-swatch palette + `CUSTOM COLOR` + `NONE` |
| Name | required | placeholder "Project name" |
| Draft | toggle | defaults off |
| Client | optional | searchable select |
| Privacy ★ | Private / Shared | Private = "Only visible to project members" |
| Invite members | — | defaults to "1 member selected" |

`More options` reveals further fields — **UNVERIFIED**. From the Projects table, a project also carries: **Billable, Rate, Fixed fee, Dates, Tags, Status (Active/…), Time status, Variance**.

Projects can be created **from templates** (`Manage project templates`, `START FROM TEMPLATE ★`).

### Task

From the **New task** drawer:

| Field | Default | Notes |
| --- | --- | --- |
| Task name | — | |
| Description | — | "Add task description" |
| Project | Empty | |
| Dates | Empty | |
| **Estimate** | `0h` + **`total ▾`** | the mode dropdown implies at least one alternative to "total" — **UNVERIFIED** |
| Priority | Empty | values **UNVERIFIED** |
| Tags | Empty | |
| **Assignee** | current user, with `＋` | **multiple assignees supported** |
| Status | `Todo` | |
| Billable ★ | off | |
| Subtasks | collapsed | |
| **Allocation** | collapsed | "Add an estimate and assign members to allocate the task." |
| Attachments / Notes | — | `Add attachment`, `Add notes` |

**Statuses:** `🗒️ Todo` · `🚧 In Progress` · `🚫 Blocked` · `✅ Done` — configurable in Settings → Statuses.

**Allocation is the hinge between planning and capacity:** estimate + assignee is what places a task into someone's Timeline lane and consumes their capacity.

### Member

`role · time off (days taken / days booked) · rate · cost · working hours`

Role observed: `Organization Owner`. **UNVERIFIED:** full role list.

### Workspace-level configurables

From Admin settings:

- **WORKSPACE SETUP** — Access (per-role permissions for clients, tags, statuses), Tags, Statuses, **Required fields**, **Custom fields**
- **TRACKING & RATES** — Alerts & reminders, **Targets**, Billable rates, Default currency
- **CONNECTIONS** — Data import

"Required fields" and "Custom fields" mean the task/project schema is **workspace-configurable**, not fixed.

## 5. Core flows

**Create a project:** Projects → `New project` (or inline `＋ ADD PROJECT`) → modal → name (+ optional colour, client, privacy, members) → `Create project`. `↵` submits.

**Create a task:** Tasks → `Add task` → right-hand drawer (500px) → fill fields → `Create task` / `Cancel`.

**Assign + estimate:** both live in the task drawer; together they form "Allocation".

**View capacity:** Timeline → group by People → read each lane's free/booked figure against the selected capacity window.

**Generate a report:** Reports → pick type → set date range → filter → optionally change breakdown dimensions → `Export`.

**UNVERIFIED (needs data in the account to exercise):** tracking time against a task, logging time from the Timer, adding time off, the approval submit→approve cycle, and what the Board view's columns are.

## 6. Estimated vs actual

Surfaced in three places:

1. **Task** — `Estimate` field with a `total` mode selector.
2. **Projects table** — dedicated **`TIME STATUS`** and **`VARIANCE`** columns, so over/under-estimate is visible in the list without opening a report.
3. **Reports** — `Workload` ★ and `Utilization` ★ report types.

**UNVERIFIED:** the exact presentation (bar, %, ±hours) — the account has no logged time, so these columns render empty.

## 7. Capacity

- Lives in **Timeline**, one lane per person.
- Capacity is expressed as remaining hours against a window — observed **"40h free"** for a full week.
- Window is selectable (Auto / week / month / Off), so capacity is a **rolling calculation**, not a fixed weekly number.
- Per-person **Working hours** on the Members table is the input.
- **Time off** feeds capacity — but only via the paid add-on ("approved leave automatically reflected in team capacity").
- A **"No assignee"** lane collects unallocated work above the people lanes.

**UNVERIFIED:** holidays, partial-day availability, and whether capacity respects per-person working-hour patterns (e.g. a 3-day week) — all require the Time off add-on or a populated team.

## 8. What reports answer — and don't

**Answer:** how much time was logged, how much was billable, what it's worth, average daily hours, breakdown by member/task/project, utilization, workload, profitability, and a raw time-log list.

**Don't answer, as far as is visible:** anything about forecast vs. capacity beyond the Timeline; there is no report that combines planned allocation with actual logged time in one view. Estimate-vs-actual appears as project columns and in Workload/Utilization, but **UNVERIFIED** whether any single report shows planned-vs-actual per person over time.

Four of six report types are premium.

## 9. Jira sync — not found

The brief asked what the Jira sync maps. **No Jira integration is present** in this workspace.

`Settings → CONNECTIONS` contains exactly one item — **Data import**:

> **Universal CSV Importer** — "Map columns from any CSV file. Import files from Harvest, Clockify, ClickUp, Asana, Teamwork, or another tool."

Jira is not among the named sources, and there is no integrations/marketplace section in workspace settings. Tasks also offers an `✨ IMPORT TASKS` action — **UNVERIFIED** whether that is the same CSV importer.

**Update after market research — the discrepancy is now sharper, not resolved.** Toggl's marketing site *does* advertise a **Jira integration (one-way sync)**, and their pricing page lists "Jira and Asana integrations" as a **Premium** feature. This workspace is on a **Premium trial** and still shows no integrations surface anywhere.

So one of these is true, and it is untested which: the integration is excluded from trials; it lives at organization rather than workspace level; or it is configured from the Jira side. What is verified: **CSV import is the only connection surfaced in workspace settings, and it is one-way import, not sync.**

## 10. Plan gating

This account runs a **31-day Premium trial**, so the free-plan boundary cannot be observed directly. What *is* observable:

- ★ appears on **Timeline**, **Approvals**, **Time off** in the nav, and on **Utilization / Workload / Profitability / Time off** reports, **Privacy** on projects, **Billable** on tasks, **Tags** column on projects, and `START FROM TEMPLATE`.
- ★ therefore marks premium features, and they are **usable** during the trial (Timeline works).
- **Time off is different** — it is paywalled *even on the trial*, priced separately at **$2/user/month billed annually** with its own 30-day trial. It is an add-on, not a plan tier.

**UNVERIFIED:** exactly which features disappear when the trial ends, and the free plan's member/project caps. Determining this needs either a second free account or the pricing page.

---

## Open items

1. Priority values; Estimate mode options beyond "total".
2. Board view columns and behaviour.
3. Time-entry creation flow and the Timer's right-hand panel.
4. Approval status set and the submit→approve cycle.
5. Whether an org-level integrations surface exists (Jira question).
6. Free-plan limits — needs a non-trial account or the pricing page.
7. Report detail once the workspace has data; all views currently render empty states.


---

# PART 4 — Company, market and business model


**Purpose:** context for the *rationale*, not for feature ideas. The written rationale is where the previous assessment scored weakest (55% on open answers), and "why this matters to Toggl's business" is much easier to argue when you know how they make money and who they lose to.

**Scope note:** this deliberately excludes user-complaint mining. Per the working agreement, Josip's friction log forms first. Compiled 2026-08-17.

---

## 1. The company

| | |
| --- | --- |
| Founded | ~2007, Tallinn, Estonia. Began as an Estonian IT consultancy building client software |
| Founder | Alari Aho |
| Funding | **100% bootstrapped, $0 VC** — stated prominently by Toggl itself |
| Team | "130+ Togglers" per their about page; third-party estimates 121–146. Fully remote, ~40 countries |
| Users | "600k active users" (their figure) |
| Revenue | ~$32.8M ARR (Latka estimate, 2024). **Treat as unverified** — third-party ARR estimates are frequently wrong, and a jump from $14.7M to $32.8M in one year is implausible enough to doubt the series |

**Origin story, in their words:** they were an agency, they couldn't track project time or bill accurately, so they built a tool for themselves. Clients asked for access and "Toggl Track was born."

That origin matters more than it looks. **Toggl is its own ICP.** A remote services business that bills time is exactly the customer they're building for — which is why "agency" framing lands with them.

**Why bootstrapped changes the argument.** No VC means no growth-at-all-costs mandate and no board demanding a land-grab. It means margin, retention, and capital efficiency are the real scoreboard. A proposal justified by "this could drive massive top-of-funnel growth" is speaking a language they don't use. A proposal justified by *conversion to paid, expansion within existing accounts, or reduced churn* is.

## 2. Product portfolio

| Product | What it does |
| --- | --- |
| **Toggl Track** | Time tracking and reporting. The cash cow — "the world's most trusted time tracker" |
| **Toggl 2.0** (formerly Focus, formerly Plan) | Planning + capacity + time intelligence. The strategic bet |
| **Toggl Work** | Expense management. New |
| Fourth product | Their about page says "4 tools" but names only three. Almost certainly Toggl Hire — **UNVERIFIED** |

### The Plan → Focus → 2.0 migration

Toggl Plan was folded into Focus, and **Toggl Plan stopped working for users around 28 October 2025**. This was a forced migration of an existing paying user base, not a greenfield launch.

Two consequences worth holding:

1. There is an installed base who **did not choose** this product — they were moved into it. Their expectations were set by a different tool.
2. Toggl ran a public "help shape Focus into an upgrade in every way" thread, so they know the migration created friction and they are actively soliciting input on it.

**There is no published feature roadmap.** The community "roadmap" thread contains user requests, not Toggl statements. So there's no public list of already-planned work to accidentally collide with — but equally, no way to check.

## 3. Positioning and strategy

**Headline:** "Toggl 2.0 turns time data into your next smart decision"

**Subhead:** "We built the world's most trusted time tracker. Toggl 2.0 is the next chapter — capacity, profitability, planning, and what to take on next"

**Category claim:** *"Time Intelligence for Teams That Plan Seriously"*

**The strategic sentence** — this is the one to internalise:

> **"Time intelligence is the foundation, not a feature."**

The whole bet: better time tracking → better data → that data powers planning, capacity, profitability and forecasting. Competitors bolt tracking onto a planning tool; Toggl claims tracking *first* and builds planning on top of real data.

**The problem they say they're solving** (their framing, quoted from the product page):

- Deadlines estimated on "gut feel"
- Teams burning out because capacity is ignored
- Proposals priced on "hope"
- Time data and planning data disconnected

**Their claimed differentiators:** "15+ yrs of time-tracking expertise" · "real data" vs "spreadsheet guesses" · "no bloat" that "teams actually stick with."

**Stated audiences:**

1. Individuals and freelancers — "plan your work, track your billable hours"
2. Growing teams — visibility and alignment "without enterprise bloat"

Note what's absent: enterprise. "No bloat" and "without enterprise bloat" are repeated positioning, not accidents. **Anything that reads as enterprise-heavy is off-strategy for them** — which aligns with the assignment's own "simple and focused beats feature-packed."

## 4. Business model and pricing

| Tier | Price | Gate |
| --- | --- | --- |
| **Free** | $0 | Up to 3 users ("invite up to 2 people for free"). Manual + real-time timers, focus mode, calendar integrations, tasks, boards, task estimates, individual reports |
| **Starter** | **$9** /licence/mo | Billable rates · Timeline views · tags · milestones · PTO, public holidays, flexible hours · team reports |
| **Premium** | **$16** /licence/mo | Labor costs · Profitability reports · Utilization & workload reporting · **time actuals vs. estimates** · smart forecasts · **Jira and Asana integrations** · SSO |
| **Enterprise** | Custom | Turnkey |
| **Time Off Pro** | Add-on (in-app: **$2/user/mo billed annually**) | Approvals, balances, policies; connects leave to capacity |

Product-led growth: free tier → self-serve upgrade, with sales-assist for larger accounts (Latka reports ~11 quota-carrying reps).

**Where the money is:** the jump from Free to Starter is *team capacity* (timeline, PTO, team reports). The jump from Starter to Premium is *financial intelligence* (profitability, labor cost, utilization, estimate-vs-actual, forecasts). So the monetisation ladder is:

> individual tracking → team visibility → **money questions**

If a proposal makes the money questions easier to answer, it is arguing for the highest-value tier.

### Discrepancy worth knowing

The marketing site advertises a **Jira integration (one-way sync)** at Premium. The workspace I inspected is on a **Premium trial**, and there is **no integrations surface at all** — `Settings → Connections` contains only a Universal CSV importer, which lists Harvest, Clockify, ClickUp, Asana and Teamwork but *not* Jira. Either the integration lives at organization level, is excluded from trials, or is configured from the Jira side. Recorded in `product-map.md` as unresolved.

## 5. Competitive landscape

| Competitor | Position |
| --- | --- |
| **Float** | Resource management and scheduling for professional services. Strong on matching people to projects |
| **Runn** | Forecasting 6–12 months out; strategic rather than task-level. Used to test hiring scenarios before committing headcount |
| **Productive** | Blends capacity planning with financial performance — how billable hours become revenue. The closest competitor to Toggl's profitability angle |
| **Harvest (+ Forecast)** | Time tracking with a separate forecasting product — the "two tools" pattern Toggl positions against |
| **Clockify / Everhour** | Time-tracking-first, cheaper, lighter on planning |

**The structural gap Toggl is attacking:** most of these are planning tools that treat time tracking as an input someone else supplies, or trackers with planning bolted on. Toggl's claim is that owning both, with 600k users already tracking, makes their planning data real rather than estimated.

**The structural risk:** Float and Runn are specialists with mature resource-management depth. Productive owns the agency-profitability story. Toggl arrives with better raw data but less planning maturity — and a migrated Plan user base to keep happy.

## 6. What this means for the assignment

Not feature direction — argument structure.

1. **Frame value in their language.** "Time intelligence", capacity, profitability, estimate-vs-actual, utilization. Avoid generic productivity framing.
2. **Tie impact to the monetisation ladder.** Free → Starter is team capacity; Starter → Premium is money questions. Naming which gate a proposal strengthens is a business argument, not a feature argument.
3. **Bootstrapped means efficiency metrics.** Conversion, expansion, retention, support deflection. Not "10x growth."
4. **"No bloat" is a stated value, twice.** Cutting scope is on-strategy, and saying so out loud is aligned rather than defensive.
5. **They are their own customer.** A remote services team that bills time. Concrete agency scenarios will read as familiar rather than hypothetical.
6. **The migrated Plan base is real context.** Users who were moved rather than chose.

---

## Sources

- [Toggl — About](https://toggl.com/about/)
- [Toggl 2.0 — product page](https://toggl.com/focus/)
- [Toggl 2.0 — pricing](https://toggl.com/focus/pricing/)
- [Toggl Community — switching from Toggl Plan](https://community.toggl.com/t/toggl-focus-faqs-when-switching-from-toggl-plan/3242)
- [Toggl Community — feature roadmap thread](https://community.toggl.com/t/toggl-focus-feature-roadmap/3323)
- [Latka — Toggl revenue and team](https://getlatka.com/companies/toggl) *(third-party estimate, unverified)*
- [Runn — capacity planning software landscape](https://www.runn.io/blog/capacity-planning-software)
- [Float — capacity planning tools compared](https://www.float.com/resources/capacity-planning-software)
- [Productive — Float alternatives](https://productive.io/blog/float-alternatives/)


---

# PART 5 — UX analysis — 33 verified findings


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

### 1.6 First-run reporting reads as zero
`obs 13, 14, 16, 50, 51` · **downgraded from major** · *found independently by four lenses*

Stopping your first timer fires a spotlight — "See where your time goes" — that dims the UI and routes you to Reports. Reports answers **"Logged time 0h / Avg daily 0h."** The Timer list header reads **"Today — 0h"** directly above a **"28s"** row. The new Logged week-strip renders as a **100%-filled bar labelled "0h."**

**Why it was downgraded to minor:** the same page shows the 28s datum twice — a visible chart bar and a breakdown row — so "reads as zero on every surface" was overstated, and "user concludes their data was lost" requires missing three adjacent truthful displays. Everything ≥1h renders fine, so this is a sub-one-hour state users exit permanently within a day.

**What survives and still matters:** the full-at-zero bar is wrong under *any* formatting policy, and the seconds-scaled axis on the same page proves hour-flooring is an intra-page inconsistency rather than a considered policy. It happens at the guaranteed-exposure moment, on a product whose pitch is *"real data vs spreadsheet guesses."*

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

- **Single user, single day, 28 seconds of data, one project, one task.** Every "reads as zero" finding is a low-data claim — ≥1h renders fine. Variance, Time status, forecasts, and the Workload / Utilization / Profitability reports **never rendered populated.**
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
2. **The 0h/28s reporting.** Strong first-run smell, weak steady-state impact. A designer might reasonably call this polish, not minor.
3. **Focus mode's absence.** If it's a soft-launch held out of nav deliberately, the discoverability half of the criticism evaporates — the "tap to use" copy slip supports an in-flight-rollout reading. **The silent-failure half has no defence** regardless of intent.

---

## 7. For the three-way comparison

Worth checking against Josip's log and the designer's read:

- Did either of you hit the **unclickable first entry**? It should be reproducible — track ~30 seconds and try to click it on the calendar.
- Did either of you **lose a draft** to an outside click?
- Did either of you find **Focus mode or Goals** without being told they exist?
- Does the **"loud where it sells, silent where it retains"** pattern match what you felt, or is that me over-reading?

Where all three of us independently hit the same thing, it's real. Where we differ, the disagreement is more interesting than the finding.


---

# PART 5b — Raw UX observation log — the underlying evidence


Live walkthrough of Toggl 2.0, 2026-08-17, dark theme, Premium trial, near-empty workspace.
Each item is an observation with the state that produced it. Severity and interpretation come later — this file is evidence, not analysis.

## Timer / Calendar view

1. **Naming triple.** Sidebar nav: "Timer". URL + tab title: "Calendar". On-page title: none — the page header IS the tracking input. Three identities for one surface.
2. Idle timer displays `0:00:00` rather than being hidden or dimmed.
3. Default range "5 Days" (Mon–Fri), weekend hidden by default. `This week • W34` with ISO week.
4. Grid auto-scrolls to business hours on load; current-time indicator is an accent line with a dot on today's column only.
5. "SUGGESTED — Plan tomorrow's first task" card sits at Tue 9 AM with ✓/✕. Dashed border. Why Tue 9 AM is unexplained.
6. "MEETING? / Connect calendar →" ghost card at Tue 1 PM — fake meeting as calendar-connect ad, placed on a working day slot.
7. Typing a description into "What are you working on?" happens inline in the top bar — no dropdown, no inline `@`/`#` parsing observed (the @ Task / # Tags affordances are separate buttons; Track's inline shorthand appears absent or undiscoverable).
8. @ Task picker: "Find or create a task" + "No tasks found" + `+ Create task` — creation offered in-context. Good recovery.
9. Project picker groups by client: "NO CLIENT — 1 project ⌃", rows in project colour, `+ Create a project` at bottom.
10. **Dead-click after popover close (observed twice, not fully reproduced):** after closing a picker, the immediately following click on another control (Project chip, then Play) did not register; an identical second click did. Needs manual repro — if real, it makes rapid timer workflows feel lossy.
11. **Running state is excellent craft:** play → stop morph; live hatched entry block grows on the grid in real time; sidebar Timer row gains a live `3s` badge + pencil; **browser tab title becomes "3s • Toggl 2.0 - Calendar"** (live duration visible from other tabs); project chip fills with project colour.
12. Onboarding checklist items auto-complete on the real action (2/4 → 3/4 when timer started). Checklist floats bottom-left, overlapping sidebar footer actions at 952px height.
13. **On stop, three simultaneous events:** (a) spotlight education tooltip "See where your time goes" anchored to Reports with rest of UI dimmed; (b) a "Logged" week-strip appears at the top of the grid; (c) checklist collapses. A lot of motion at the moment of task completion.
14. **Defect — Logged strip:** full-width accent bar rendered 100% filled, labelled "Logged ——— 0h". A progress-looking bar that is always full (or full at zero) communicates nothing or the wrong thing. Zoomed screenshot confirms.
15. **Defect/friction — micro-entry unreachable on the grid:** a ~28s entry renders as a thin sliver under the current-time indicator line. Click, double-click, and element-targeted click all fail to open any editor from the calendar. The same entry is fully accessible in List view. First-session risk: your first-ever entry is where the current-time line is, by definition.
16. Day total in list view: "Today Mon, Aug 17 — **0h**" while the row shows "28s". Totals floor to `0h` rather than showing exact duration.
17. Entry row (list): hover reveals checkbox, `$` billable, play-again, `⋮`. Description is inline-editable on click. `⋮` menu: Duplicate / Go to project / Copy description / **Delete** (red). No "Edit" item — inline is the only edit path.
18. View modes (4 icons top-right): calendar / split / list / grid(?). List view URL: `?v=sce%3Dtrue%26sct%3Dfalse%26slt%3Dtrue%26swv%3Dtrue%26m%3Dlist%26ly%3Dstandard` — view state is shareable but double-encoded.
19. **Right panel (toggle, far top-right): "Goals" + "Tasks".** Goals: example goal "Work 5 hours every day / at least 5h · every day — tap to use", `+ New goal`. Tasks: bare "Add task" input. Goals appear nowhere else in the nav — a whole feature living only behind an unlabelled panel toggle.
20. **Copy slip:** "— tap to use" on a desktop web surface (mobile vocabulary).
21. First-run education arrives as three stacked mechanisms on one surface: floating checklist + suggested-slot cards + spotlight tooltips.

## Keyboard & power layer

22. `?` opens a full **Keyboard shortcuts** panel: S start/stop, F Focus mode, N/A new task, T today, L side panel, Alt+drag duplicate, +/- zoom, Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y global undo/redo, **Alt+D "Cycle between themes"** (a manual theme override exists after all).
23. **Focus mode with Pomodoro** (F → U count-up / D count-down / O Pomodoro / OS settings) exists **only** behind the keyboard layer — no visible entry point anywhere in the chrome. Pressing F with no timer running does nothing, silently.
24. Inline title syntax in task modal: `+` project picker, `#` tag, `P1 P2 P3` priority, natural-language dates. Verified `+` and `P1` live — tokens render as chips, stripped correctly on save. Excellent Track-DNA power feature.
25. **Vocabulary mismatch:** shortcut panel says priorities are "P1 P2 P3"; the priority menu says High / Medium / Low / None.
26. **`Ctrl+↵` ("Save and close task modal") failed from the Dates field** — it reopened the date picker instead. The save shortcut only works from some fields.
27. `N` (new task) silently no-ops right after navigation until the page has been clicked once — shortcuts need focus the user has no way to know about.

## Task creation / editing

28. Create-task drawer fields: name, description, Project, Dates, Estimate (`0h` + mode), Priority, Tags, Assignee (defaults to self, `+` for more), Status (Todo), Billable ★, Subtasks, Allocation, attachment/notes. **Repeat appears only after Dates are set** — good progressive disclosure.
29. **Estimate modes: `Total` / `Per day`** (the `total ▾` dropdown).
30. Priority values: High / Medium / Low / None, with signal-bar icons.
31. Date picker: bare month grid, Mon-first, today outlined, `CLEAR` — **no presets** (today / this week / +1w), no keyboard date typing hint inside the picker.
32. **Draft loss:** clicking outside the create drawer silently discards everything typed. No confirm, no draft restore on reopen (verified: title was gone). The header 🔒 lock icon is presumably the opt-in guard — protection is opt-in rather than default.
33. Escape layering is correct: Esc closes the date picker, not the drawer.
34. Create confirms with a bottom-right toast: `ⓘ Task created`, no action link.
35. Saved-task drawer adds: **play button on the title** (track this task directly — the single best tracking↔planning affordance in the product), a **Time section** (Logged ⓘ / Planned ⓘ / Estimate ⓘ + progress bar), Repeat field, deep-linkable URL (`?tid=…`).
36. Task ⋮ menu: Share / Mark as done / Duplicate / Archive / **Auto-log time ⓘ ("Global setting active", per-task toggle)** / Delete (red) / "Created on Aug 17 · 3:50 PM by Josip Gajsak393". Auto-log = planned slots silently become logged time; philosophically huge, one small ⓘ explains it.

## Tasks views

37. List columns: TASKS / DATES / PROJECT / BILLABLE / PRIORITY / STATUS / ESTIMATE (inline-editable `6h total ⌄`) / LOGGED / ASSIGNEE. Grouped ("Today · 1"), inline `+ ADD TASK` per group.
38. **Board columns are the group-by dimension** — grouped by Date the board is Overdue / Today / Tue / Wed…, not status lanes. Kanban-by-status is only one configuration. Board is a separate route (`/board`).
39. Board card chips: [Todo] [priority] [Aug 17 - Aug 21] [**1h 12m /day**] [Test] — the per-day spread of the estimate is computed and shown on the card.
40. Tab title for Tasks view is "Toggl 2.0 - Inbox" — internal name leaks into the browser tab.

## Project page

41. A project is a **sub-app**: back arrow + tabs Overview / Tasks / Board / Timeline / Dashboard / Members, own "Saved views", Invite. So "Board" and "Timeline" exist at global AND project level — "Timeline" means capacity lanes globally but project schedule here.
42. Overview: Draft toggle, "Complete project" checkbox, client, date range, Private/Shared, +TAG, description, + Add alert / milestone / attachment.
43. Right rail of value-framed toggles: Recurring ("service your retainer project…"), Estimate ("See how tracked hours compare to your time budget"), Billable ("Calculate the value of tracked hours"), Fixed fee ("Monitor spending against the fixed fee"). Feature = benefit sentence + switch. Strong pattern.
44. Trial banner: "★ You're trying 10 Premium features on this project — recurring, estimate, billing & more [Upgrade now]".
45. Project **Dashboard** tab: Revenue / Cost / Profit KPI row, Cost chart, member+task breakdown. Empty state says "No logged cost — **Start by logging time** to see progress." — but time IS logged; the missing input is a cost rate on the member. Remedy copy misdiagnoses.

## Timeline (capacity)

46. After allocation the loop closes visibly: lane header "34h free" (40 − 6), per-day headers "6h 48m" (8h − 1h12m), task bar labelled "1h 12m /day" spanning Mon–Fri in project colour.
47. Right rail: **Unplanned tasks** + Add task — backlog for drag-to-plan.
48. The "Plan capacity across your team / Invite members" illustrated empty state still fills the canvas below the single real lane — invite prompt dominates a view that is in active use.
49. Weekend columns (Sat/Sun) shown dimmed on Timeline while the Timer calendar defaults to hiding them (5 Days).

## Reports (with 28s of data)

50. Chart y-axis auto-scales to seconds (30s…2m 30s) — handles micro-data gracefully.
51. **Same-page rounding conflict:** KPI row "Logged time 0h / Avg daily 0h" while the breakdown row shows "28s". Day header in Timer list: "0h" over a "28s" row. Everything ≥1h is fine; the first hour of a user's life on the product reads as zero.
52. Breakdown table: MEMBER|TASK / PROJECT / CLIENT / LOGGED TIME / ESTIMATED TIME ⓘ / BILLABLE / AMOUNT / COST / BILLABLE % / `+` (add column). Estimate-vs-actual is a first-class report column.
53. Notifications popover: Unread filter, gear, illustrated "You're all caught up", `MARK ALL AS READ`.

## Destructive patterns — split by object

54. **Task delete: confirm modal** — "Delete this task?" + consequence copy ("will remove all related planned time") + Cancel + solid-red Delete. **No undo toast after.**
55. **Time-entry delete: no confirm, undo toast** — "ⓘ Time log deleted — UNDO CTRL Z" bottom-right. Two philosophies; also third vocabulary ("Time log" vs time entry).
56. Loading states: skeleton shimmer (side panel tasks) — skeletons, not spinners.
57. Post-delete empty state (Timer list): truck illustration + "No time logged in the selected time range" + "…Start a timer to get things rolling!" — exclamation mark; view-level empty uses illustration, consistent with the two-pattern rule.

## Format inventory (durations, one product)

`0:00:00` (idle timer) · `28s` (row) · `0h` (totals) · `6h 48m` (capacity remaining) · `1h 12m /day` (board chip) · `34h free` (lane) · `3:36 PM` (times) · `Aug 17 - 21` (list dates) vs `Aug 17 - Aug 21` (drawer dates) · `3s` (sidebar badge)

## Side effects of this sweep (disclosed)

- Onboarding checklist advanced 2/4 → 3/4 ("Start a time entry" completed). Not reversible; harmless.
- Test task and test time entry created and then deleted (deletions exercised the destructive patterns above).
- Nothing in Admin settings was touched; checklist not dismissed; no invitations sent.


---

# PART 6 — Accessibility audit


**Method:** programmatic measurement against the live DOM, 2026-08-17. Contrast computed via the WCAG relative-luminance formula on **rendered** foreground/background pairs (walking up the ancestor chain for effective background), not on token values in isolation. Semantics, focus management, and motion checked in-page and against the real stylesheet.

**Standard:** WCAG 2.2 Level AA.

**Scope limit, stated up front:** **both themes rendered and measured**, desktop only, one viewport (1718×1276), Timer/Projects/Tasks views, single-user workspace. No mobile, no screen-reader listening session, no automated axe-core sweep. This is a targeted audit, not a certification.

---

## Two corrections to my own earlier work

Recording these because both were wrong in ways that would have misled you.

1. **I initially reported "reduced motion is honoured for exactly one loader."** That came from scanning `document.styleSheets` in-page — but Toggl's stylesheet is cross-origin, so `cssRules` threw and my `try/catch` silently swallowed it. I was reading only an embedded third-party widget's CSS. The real stylesheet has **four** reduced-motion blocks and handles motion substantially better (see §3).

2. **[`design-system.md`](design-system.md) claims sidebar section headers use `foreground-tertiary`.** Measured, they render at **9.77:1** — far lighter than tertiary would give (2.31:1). The doc's token assignment for that element is wrong.

---

## 1. Colour contrast — passes, and by a real margin

**49 rendered text nodes examined across Timer and Projects. Zero AA failures.** Lowest ratio measured: **5.10:1** against a 4.5:1 requirement.

| Element | Measured | Required |
| --- | --- | --- |
| Body text on card | 17.30:1 | 4.5 |
| Secondary text on page | 8.69:1 | 4.5 |
| Sidebar nav items | 9.77:1 | 4.5 |
| Sidebar section headers (11px/600) | 9.77:1 | 4.5 |
| `2.0` badge, `31 DAYS` trial badge | 5.10:1 | 4.5 |
| `Upgrade` (accent) | 7.19:1 | 4.5 |
| Workspace name | 21.00:1 | 4.5 |

This is a genuinely good result and worth saying plainly: **contrast is the thing most products fail, and Toggl passes it comfortably in dark theme.**

### Light theme — rendered and measured

**Done 2026-08-17.** Switched via **Settings → Appearance → Theme → Light** (a personal setting, not Admin — which is why the earlier sweep missed it; this also resolves the "manual override" UNVERIFIED item in `DECISIONS.md` §C). Account restored to **System** afterwards.

Two views measured, 50 text nodes each. **3 failures, identical in both** — one root cause:

| Measured | Required | Element |
| --- | --- | --- |
| **4.16:1** | 4.5 | **Active nav item** — "Timer" / "Projects", 14px/600 |
| **4.16:1** | 4.5 | `2.0` product badge, 11px/600 |
| **4.16:1** | 4.5 | `31 DAYS` trial badge, 11px/600 |

All three are the same token pairing:

```
--foreground-accent  168 76 157   on
--background-muted   246 229 243   =  4.16:1   (needs 4.5:1)
```

This is a **token-level failure, not an instance-level one** — it fails everywhere that pairing is used, and it lands on the **selected navigation state**, which is persistent, on every page, for every user in light theme. Dark theme's equivalent (`194 130 185` on `55 31 52`) passes comfortably, so this is specifically a light-theme regression.

It is also a *near* miss — 4.16 vs 4.5. Darkening `foreground-accent` slightly when used on `background-muted` would clear it without a visible design change.

Everything else in light theme passes:

- Sidebar nav items: **6.86:1** (AA, below AAA)
- Table headers, body text, buttons, badges: pass
- **Placeholders pass** — the timer duration placeholder measures **7.48:1**. This was flagged as a risk in the first pass; it is not one.
- `foreground-tertiary` on white computes to **2.15:1**, but measurement confirms **it is not used for rendered text** in either theme — so the theoretical failure is not a real one. (This is the exact error I made in the first draft; measuring rather than inferring is what caught it.)

### Non-text contrast is the weaker half

Borders measure **1.52:1** (`stroke-primary` vs card) and **2.31:1** (`stroke-secondary`) against a 3:1 requirement for UI component boundaries (WCAG 1.4.11).

This matters more here than in most products because — per the UX analysis — **Toggl separates every layer with 1px borders and no shadows.** Modal, card, drawer, and input boundaries are all carried by a border that doesn't meet the non-text minimum. For decorative dividers this is fine and not a violation; for **input field boundaries** it is one, because the border is the only thing defining the control's extent.

---

## 2. Semantics and structure

### ✗ Heading hierarchy is not navigable

Actual document order:

```
H4  Josip Gajsak393's organization
H6  Track      H6  Analyze      H6  Plan      H6  Manage
H3  No time logged in the selected time range
H4  Tasks
H1  Toggl 2.0 works better on a bigger screen   ← hidden small-screen warning
H5  Get started
```

Three problems compounding:

- **The only `H1` is a hidden small-screen warning.** The page's actual title has no heading at all — "What are you working on?" is an `<input>` placeholder, which is not exposed as a heading and vanishes on focus.
- **Levels skip in both directions** — H4 → H6 → H3 → H4 → H1 → H5. Heading level should communicate nesting depth; here it communicates nothing.
- **Sidebar group labels are `H6`**, making nav labels the deepest headings on the page.

Screen-reader users navigate by heading (`H` key) as the primary way to skim a page. Here that produces a scrambled list where the loudest item is a warning meant for a viewport they aren't using.

### ✗ No skip link — 26 tab stops to reach content

Measured: **45 focusable elements**, and the first one inside `<main>` is **tab stop #27**. Every keyboard user traverses the icon rail, workspace switcher, eight nav items, and three footer actions before reaching the page — **on every navigation**.

A skip link is the single cheapest fix in this document.

### ✗ Eight icon-only controls with no accessible name

All in the toolbar at `y=64` — the view-mode toggles and panel controls. A screen reader announces these as "button", nothing more.

**This converges with a finding from the UX pass** (obs 18): those same four view-mode icons have no visible label either. So the control that switches between Calendar / Split / List / Grid is unlabelled *both* visually and programmatically.

Credit where due: **14 of 35 buttons do carry `aria-label`**, including the primary `Start timer` control, `Toggle Sidebar`, `Previous period` / `Next period`, and `Select timer mode`. The labelling habit exists; it just isn't complete.

### ✗ Both inputs are unlabelled

The timer description field and the duration field have **no `<label>`, no `aria-label`, no `aria-labelledby`** — placeholder text only. Placeholders are not accessible names: they disappear on input and are inconsistently announced.

### ✗ Zero live regions — toasts are silent to screen readers

`aria-live` regions: **0**. `role="status"` or `role="alert"`: **0**.

Consequences, in order of severity:

1. **The delete-undo toast is announced to nobody.** From the UX pass (obs 55): deleting a time entry shows *"Time log deleted — UNDO CTRL Z"* and no confirm dialog. For a screen-reader user, the destructive action produces **no feedback at all**, and the only recovery affordance is invisible. That combination — no confirm, silent toast, hidden undo — is the most serious finding in this audit.
2. `Task created` confirmation is unannounced.
3. **The running timer's duration is not in a live region**, so elapsed time is not observable without polling manually.

### ✗ The onboarding checklist is marked `role="dialog"`

The persistent "Get started" panel carries `role=dialog`. It is not a dialog — it's a non-modal persistent panel. Screen readers will announce it as a dialog, implying modality that doesn't exist.

### ⚠ 39 of 42 SVGs are not `aria-hidden`

Only 3 icons are hidden from the accessibility tree, and none carry `<title>`. Icons inside labelled buttons are largely harmless, but standalone decorative SVGs may be announced as unnamed graphics.

### ✓ Correct

- `lang="en"` on `<html>`
- **No positive `tabindex`** anywhere — DOM order is tab order
- All 4 `<img>` elements have `alt`
- `aria-expanded` on 14 controls; `aria-current` on the active nav item
- Landmarks present: `main`, `nav`, `header`, 2× `aside`

---

## 3. Motion — better than my first read

Four `prefers-reduced-motion` blocks in the real stylesheet:

| Block | Coverage |
| --- | --- |
| 1 | `.dots-loader span` → `animation: none` |
| 2 | **The entire `motion-*` preset keyframe library gated behind `no-preference`** |
| 3 | **AI ambient shape-drift animations gated behind `motion-safe:`** (34s/38s infinite alternate) |
| 4 | `motion-reduce:hidden`, `motion-reduce:animate-none`, `motion-reduce:transition-none` utilities available |

The important part: the **long-running ambient decorative motion** — the AI background drift and the motion-preset library — is correctly gated. That's the category that actually triggers vestibular symptoms, and Toggl handled it.

**The gap:** 11 `--animate-*` utilities are defined outside any guard, two of which loop indefinitely — `animate-onboarding-pulse` (1.4s infinite) and `animate-ping-dot` (1.4s infinite). In the DOM I found 5 elements using `animate-*` classes and **none paired with `motion-reduce:`**, though those observed instances were short enter/exit transitions rather than loops. So: infrastructure is right, application is incomplete. Persistent looping indicators are the ones to check.

`focus-visible` is a real system, not an afterthought: **106 occurrences and 264 ring utilities** in the stylesheet.

---

## 4. Focus management — the strongest area

Tested on the New Project modal:

| Check | Result |
| --- | --- |
| `role="dialog"` | ✓ |
| `aria-labelledby` → valid element | ✓ ("New Project") |
| Focus moves into dialog on open | ✓ lands on the first input |
| Background made unreachable | ✓ **49 of 61** outside elements `inert`/`aria-hidden` |
| **Focus restored to trigger on Escape** | ✓ returns to the "New project" button |

That last one is the check most implementations fail, and Toggl passes it. `aria-modal` is absent, but they use `inert` instead — which is the more robust technique, so this is a non-issue.

**Touch targets** below the WCAG 2.2 AA 24×24 minimum (2.5.8): `Collapse checklist` **16×16**, `Goals` 39×20, `Save task` 65×20, trial badge 56×16.

---

## 5. Priority order

| # | Finding | Impact | Effort |
| --- | --- | --- | --- |
| 1 | **Destructive actions are silent** — no confirm, no announced toast, invisible undo | Data loss for SR users | Low — one live region |
| 2 | Heading hierarchy has no `H1` and skips levels | Page unskimmable by SR | Low |
| 3 | No skip link (26 tab stops) | Every keyboard user, every page | Trivial |
| 4 | 8 unnamed icon controls incl. view switcher | Feature unusable by SR | Low |
| 5 | 2 unlabelled inputs incl. the timer's primary field | Core action unlabelled | Trivial |
| 6 | **Light-theme accent-on-muted 4.16:1** — hits the active nav item on every page | Low-vision users, light theme only | Trivial (one token) |
| 7 | Border contrast 1.52:1 on input boundaries | Low-vision users | Medium (token change) |
| 8 | Checklist mis-roled as `dialog` | Confusing announcement | Trivial |
| 9 | Looping animations unguarded | Vestibular | Low |
| 10 | Sub-24px touch targets | Motor impairment | Low |

---

## 6. Honest summary

**Toggl 2.0 is not an inaccessible product.** Contrast passes comfortably, focus management on modals is textbook — including focus restoration, which most products get wrong — reduced motion is handled for the animations that matter, `focus-visible` is systematically implemented, and more than a third of icon buttons carry proper labels.

The failures cluster in one place: **things that are announced rather than seen.** No live regions, no `H1`, no skip link, unnamed icon-only controls. The visual layer got real accessibility investment; the **non-visual layer got much less**.

That mirrors the pattern from the UX analysis almost exactly. There, the finding was *"loud where it sells, silent where it retains."* Here it's *"strong where it's visible, thin where it's spoken."* Both describe a team with a high bar applied unevenly — and in both cases the gap is on the surface fewer people look at.

**The single most serious item** is the combination in §2: deleting a time entry has no confirmation dialog, its toast is not announced, and the undo affordance exists only in that unannounced toast. A screen-reader user can destroy data and receive no feedback that anything happened.


---

# PART 7 — Operating plan for assignment day


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


---

# PART 8 — Claude's pre-brief perspective — READ TO DIVERGE FROM


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


---

# PART 9 — Decision log


> Finalized decisions and their rationale. Append-only; supersede rather than edit.
>
> **Why this file exists:** Toggl grades "what you added on top — where your thinking came in,
> where you disagreed with AI." Every override Josip makes gets logged here at the moment it
> happens, so the written rationale is sourced from a record rather than reconstructed from memory.
>
> Columns: **Proposed** = what Claude suggested. **Decided** = what Josip chose. When those differ,
> that row is material for the rationale.

## 2026-08-17 — Setup day

| # | Decision | Proposed | Decided | Rationale |
| --- | --- | --- | --- | --- |
| 1 | Build process | research → plan → annotate → execute; no code before an approved `plan.md` | same | Planning holds the thinking; execution stays mechanical. The markdown artifacts also carry context across compaction in a long session. |
| 2 | Stack | Vite + React 19 + TS + Tailwind v4 + Lucide + React Router | same | Specified in the brief. Lean, no backend, deploys to Vercel as a static SPA. |
| 3 | GitHub repo visibility | private | same | Interview prep does not need to be world-readable. Vercel deploys private repos without friction. |
| 4 | Vercel project name | `toggl-kit` | same | Vercel rejected the directory-derived name `Toggle` (uppercase not allowed). Production URL is `toggl-kit.vercel.app`. |
| 5 | SPA routing | `vercel.json` rewrite of `/(.*)` → `/index.html` | same | Vite's Vercel preset does not add an SPA fallback. Without this, a hard refresh on `/kit` 404s — an explicit requirement. |
| 6 | TypeScript strictness | `strict: true` added to `tsconfig.app.json` | same | The Vite 9 scaffold ships without it. The working agreement bans `any`/`unknown`, which is unenforceable with strict off. |
| 7 | Design tokens | placeholders committed, clearly marked, pending browser extraction | same | Deploy chain had to be provable before the Toggl login existed. Placeholders are labelled in `src/index.css` so they cannot be mistaken for extracted values. |

## Open — need Josip's call

### ~~A. Typeface~~ — DECIDED 2026-08-17: **Inter, self-hosted**

Claude initially reported GT Haptik as Toggl's typeface, read from the `@font-face` declarations in their stylesheet. **That was wrong**, and the error would have shipped a prototype in the wrong font.

Josip pushed back ("if we are trying to match it exactly shouldn't we go with GT Haptik") — which forced a proper check of what the browser actually resolves rather than what the CSS declares. It resolves to **Inter**:

- computed `font-family` on body contains no GT Haptik
- canvas probe: `"GT Haptik"` measures identically to a nonexistent font
- all GT Haptik faces report `unloaded`; only Inter is `loaded`
- a `font-family: Inter, sans-serif !important` rule overrides the declared stack everywhere

**Decision: self-host Inter Variable (100–900, normal + italic) from `public/fonts/`.** SIL OFL, no licensing question, no external CDN, no hash-rotation risk, and true 500/600 weights rather than synthesised ones.

Lesson recorded: *read computed values, not declarations.* The same failure mode — trusting the stylesheet over the render — is exactly what the assignment guidance warns about when it says to verify claims about the product in the app itself.

### D. Themes — BOTH, decided 2026-08-17

Josip: build light and dark. Reinforces the evidence in C — the app follows the OS, so the reviewer's machine decides. Kit ships both, driven by `prefers-color-scheme`.

### ~~B. Icons~~ — DECIDED 2026-08-17

**Extract Toggl's own SVGs from the public bundle.** Josip's call.

Claude proposed a free filled 16px substitute (Phosphor Fill / Material Symbols Filled) as the lower-effort option. Josip chose exact extraction instead — fidelity is the graded criterion, and a substitute set still reads as foreign at 16px.

Rejected: Lucide (24×24 stroked, visibly wrong weight) despite being named in the original brief and already installed.

### ~~C. Theme~~ — RESOLVED BY EVIDENCE 2026-08-17

Not a preference question. **Toggl 2.0 follows the OS setting.**

Evidence: no theme key in `localStorage`; the OS reports `prefers-color-scheme: dark`; the root element carries `class="fixed dark"`. No stored override exists, so the class is system-driven.

**Implication: the reviewer sees whatever their own machine is set to.** A prototype hard-coded to one theme has a coin-flip chance of clashing with the app they open it next to. The kit therefore supports **both themes, driven by `prefers-color-scheme`** — which the extracted tokens already make cheap, since every role has a light and dark value.

**UNVERIFIED:** whether a manual theme override also exists in Admin settings.


---

# PART 10 — HOW TO USE THIS FILE

## Note on internal links

The parts above were originally separate files and cross-reference each other by filename — e.g. `docs/product-map.md`. Those links are dead here; the content is in the corresponding Part. Mapping:

`design-system.md` → Part 2 · `product-map.md` → Part 3 · `company-research.md` → Part 4 · `ux-analysis.md` → Part 5 · `ux-raw-observations.md` → Part 5b · `accessibility-audit.md` → Part 6 · `day-plan.md` → Part 7 · `claude-perspective.md` → Part 8 · `DECISIONS.md` → Part 9

## Suggested opening prompt

Paste this file, then:

> You are helping me prepare for a Senior Product Manager home assignment at Toggl. The attached dossier contains everything known so far — Toggl's grading criteria, a verified design system and product map, company research, a UX analysis, an accessibility audit, and a previous AI's pre-brief thinking.
>
> **I have not opened the brief yet.** Do not propose a solution to a brief you haven't read.
>
> Three things I want from you now:
>
> 1. **Attack Part 8.** That's the previous AI's thinking. Where is it weak, overconfident, or anchored on the wrong thing? Its headline claim is that Toggl plans capacity against contracted hours while holding data on observed hours. Is that as strong as it sounds, or is there an obvious reason a planning tool *should* use contracted hours?
> 2. **Find what it missed.** Part 5 §5 lists what could not be tested. Part 5b is the raw 57-observation log — several observations are cited by no finding at all. Go through the raw log yourself and tell me what a fresh reader would flag that the analysis skipped.
> 3. **Give me three "most people would assume X — actually Y" candidate insights** that do NOT appear in Part 8, grounded in evidence from this dossier rather than general product intuition.
>
> Be blunt. If an idea sounds like something any candidate would produce, say so. Do not be agreeable.

## Then, once the brief is open

> Here is the actual brief: [paste].
>
> Check every product claim it makes against Part 3 (product map) and flag anything that contradicts what was verified in the live app. Then: which of the directions we discussed still answers the brief *literally*, and which are now irrelevant? Kill the ones that don't fit rather than bending them.

## What is deliberately NOT in this file

- **The assignment brief itself** — not yet opened.
- **Josip's personal friction log** — his own observations from using the product, kept separate so the three perspectives (his, his wife's as a UX/UI designer, and the AI's) stay independent.
- **Source code** for the component kit. It is live at `https://toggl-kit.vercel.app/kit` and the specs are in Part 2 — but no external model needs the code to reason about the product.
- **Credentials.** None appear anywhere in this file.

## A caution about this dossier's own confidence

This document is long and reads authoritatively. It should not be treated as ground truth wholesale:

- Every finding came from **one day, one workspace, one user, ~28 seconds of tracked data, dark theme, desktop only**.
- Reports were never seen populated. Teams, mobile, Approvals and Time off were never exercised.
- The previous AI made **two factual errors** during this work, both from inferring rather than measuring — see Part 6's opening section. Assume more remain.
- Anything marked **UNVERIFIED** genuinely is.

The most useful thing a second model can do is find the third error.
