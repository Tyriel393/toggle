# Research — W0 individual first-run in Toggl Focus

> **Phase 1 artifact.** Verified understanding only. No solution proposal.

**Status:** ready for review  
**Evidence:** fresh-account walkthrough on 2026-08-18, seven screenshots, `docs/w0-first-run.md`, earlier product/design/UX research.

## Scope

This pass covers the actual desktop journey from signup through the first tracked minute for the individual/freelancer intent. It exists because the assignment targets value and retention in week zero, while the earlier research used a partially onboarded account.

## Verified first-run sequence

1. **Intent selection — mandatory**
   - “What will you mainly use Toggl for?”
   - Options: **See where time goes**, **Plan and assign work**, **Keep projects on track**.
   - Toggl promises: “We’ll tailor your first experience to help you get there.”
   - The captured path selected **See where time goes**, the individual/freelancer tracking intent.
2. **Create your first project — mandatory**
   - One project-name field; no skip.
   - Copy: “Projects keep your work and time logs organized.”
3. **Calendar connection — optional**
   - Google Calendar, Outlook Calendar, or **SKIP FOR NOW**.
4. **Landing state**
   - Opens in **Timer → List** view.
   - Right rail is already open with **Goals** and **Tasks**.
   - Main empty state prompts the user to start a timer.
   - A 31-day Premium trial starts immediately.
5. **First timer**
   - Starting the timer removes the empty state, but the running entry does not immediately replace it in the list. The main content region appears blank for the first several seconds.
   - Running-state evidence remains in the top-bar counter, sidebar Timer badge, and browser-tab title.
6. **First report**
   - At **1m 5s**, Reports correctly shows `1m` in Logged time and Average daily hours, with `1m 5s` in the breakdown.

## What this corrects

### The earlier “first hour reads as zero” claim was wrong

The measured threshold is the first **minute**, not the first hour:

| Duration | Summary rendering |
| --- | --- |
| 39 seconds | Day total can display `0h` |
| 1 minute 5 seconds | KPIs display `1m`; row displays `1m 5s` |

This is a narrow sub-minute formatting issue, not a credible anchor for the assignment. A realistic call or focus session leaves this state quickly.

### The checklist does verify behaviour

After browser-scoped onboarding keys were cleared, the checklist opened correctly at `1/4`. Starting a real timer advanced it to `2/4`. Earlier apparent over-completion came from state leakage, not from the checklist accepting fake progress.

## Browser-scoped onboarding leakage

On first landing, the fresh account incorrectly showed `3/4`: Create a project, Start a time entry, and View your reports were all complete even though no time had been tracked and Reports had never been opened.

The prior user ID remained in browser-local onboarding state. Clearing the onboarding keys restored the correct `1/4` state.

**Scope:** this does not affect every new user. It affects a new account created in a browser profile that previously used Toggl—for example repeat trialists, shared machines, consultants or agency owners setting up another account, and internal evaluators.

## Product tensions visible in the evidence

These are observations, not proposed changes:

- The chosen intent is **See where time goes**, but the next mandatory action is project creation. The promised tailoring does not visibly remove project administration from the tracking-first path.
- The first optional step—calendar connection—is directly relevant to forgetting to track, but it comes only after mandatory project setup.
- The immediate post-start state removes the instructional empty state before showing the new running object, producing a temporary blank central canvas at the activation moment.
- Goals appears immediately for the tracking-first persona and uses “tap to use” desktop copy.
- The onboarding project copy uses US **organized**, while the Tasks empty state uses British **organised**.

## Established product constraints relevant to W0

- The prototype must fit inside the existing Toggl experience and show value cold, before narration.
- Individual tracking is the Free-tier entry point; team capacity and financial intelligence sit higher in the monetisation ladder.
- The assignment forbids generic convergence in practice: Toggl explicitly warns about repeated AI-generated “review today / categorise logged time” submissions.
- The inspected first-run account begins on a Premium trial, so the actual post-trial Free boundary remains unobserved.

## Still unverified

- Whether choosing either other intent changes onboarding or landing state.
- Mobile signup and first-run.
- Multi-client and multi-project context switching for the freelancer persona.
- Behaviour after the Premium trial expires.
- Populated week-one usage across several days rather than one minute.

## Evidence files

| Path | Role |
| --- | --- |
| `docs/w0-first-run.md` | Verbatim fresh-account journey and measured corrections |
| `docs/ux-raw-observations.md` | Earlier live-product observations |
| `docs/ux-analysis.md` | Synthesised UX findings; its duration claim is corrected below |
| `docs/product-map.md` | Verified product structure and object model |
| `docs/design-system.md` | Measured visual and interaction system |
| `docs/company-research.md` | Strategy, pricing ladder and business context |

I've written my understanding to research.md — does this match your mental model?
