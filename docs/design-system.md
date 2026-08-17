# Toggl 2.0 — design system

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
| 11 / 600 | 16.06px | 0.275px | **Sidebar section header** — "Track", "Plan" |
| 11 / 500 | 16.06px | 0.32px | Calendar time gutter — "1:00 AM" |
| 11 / 600 | 16.06px | 0.32px | Avatar initials |

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
