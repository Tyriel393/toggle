# UX sweep — raw observations (evidence log)

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
51. **Same-page rounding conflict, corrected by fresh-account measurement:** KPI row "Logged time 0h / Avg daily 0h" while the breakdown row shows "28s". Day header in Timer list: "0h" over a "28s" row. A virgin-account test showed that at **1m 5s**, Reports correctly renders `1m` and the row `1m 5s`; this is a sub-minute formatting edge case, not a first-hour problem.
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
