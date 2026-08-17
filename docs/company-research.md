# Toggl — company, market, business model

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
