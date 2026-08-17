# Toggl 2.0 — accessibility audit

**Method:** programmatic measurement against the live DOM, 2026-08-17. Contrast computed via the WCAG relative-luminance formula on **rendered** foreground/background pairs (walking up the ancestor chain for effective background), not on token values in isolation. Semantics, focus management, and motion checked in-page and against the real stylesheet.

**Standard:** WCAG 2.2 Level AA.

**Scope limit, stated up front:** dark theme only, desktop only, one viewport (1718×1276), Timer/Projects/Tasks views, single-user workspace. No mobile, no light-theme render check, no screen-reader listening session, no automated axe-core sweep. This is a targeted audit, not a certification.

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

Two caveats I can't resolve without more testing:
- **Light theme unverified by render.** Token math suggests `foreground-tertiary` on white would be **2.15:1** if used for text — but the dark-theme measurement proved my token assignment for those elements was wrong, so I won't repeat that error. Needs a light-theme render pass.
- **Placeholder text** (`Project name`, `What are you working on?`) wasn't in the measured set — placeholders are a common failure point and should be checked separately.

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
| 6 | Border contrast 1.52:1 on input boundaries | Low-vision users | Medium (token change) |
| 7 | Checklist mis-roled as `dialog` | Confusing announcement | Trivial |
| 8 | Looping animations unguarded | Vestibular | Low |
| 9 | Sub-24px touch targets | Motor impairment | Low |

---

## 6. Honest summary

**Toggl 2.0 is not an inaccessible product.** Contrast passes comfortably, focus management on modals is textbook — including focus restoration, which most products get wrong — reduced motion is handled for the animations that matter, `focus-visible` is systematically implemented, and more than a third of icon buttons carry proper labels.

The failures cluster in one place: **things that are announced rather than seen.** No live regions, no `H1`, no skip link, unnamed icon-only controls. The visual layer got real accessibility investment; the **non-visual layer got much less**.

That mirrors the pattern from the UX analysis almost exactly. There, the finding was *"loud where it sells, silent where it retains."* Here it's *"strong where it's visible, thin where it's spoken."* Both describe a team with a high bar applied unevenly — and in both cases the gap is on the surface fewer people look at.

**The single most serious item** is the combination in §2: deleting a time entry has no confirmation dialog, its toast is not announced, and the undo affordance exists only in that unannounced toast. A screen-reader user can destroy data and receive no feedback that anything happened.
