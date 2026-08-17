# Toggl 2.0 — product map

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
