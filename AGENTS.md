# Toggle — working agreement

This project is built with the **research → plan → annotate → execute** workflow.

## The non-negotiable rule

**Never write code until a written plan has been reviewed and approved by Josip.**

Planning is where the thinking happens. Execution is mechanical.

## The loop

### Phase 1 — Research → `research.md`
- Read the relevant code **in depth**. Open the files; don't skim.
- Trace data flow, key modules, invariants, existing patterns and conventions.
- Write findings to `research.md`. This is a **review surface**, not a proposal.
- Do **not** propose changes. End with: *"I've written my understanding to research.md — does this match your mental model?"*

### Phase 2 — Plan → `plan.md`
- Write the goal, affected **file paths**, **code snippets** for important changes, and **trade-off analysis** wherever a choice exists.
- Read the actual source files before proposing changes to them.
- Cite existing in-repo or open-source implementations as concrete guides.
- Do **not** implement. End with: *"plan.md is ready for your review — add inline notes and send it back."*

### Phase 3 — Annotate (the critical loop)
`plan.md` is **shared mutable state**.
1. Josip adds inline notes at exact locations in the file.
2. He sends it back: *"address all the notes. Don't implement yet."*
3. Address every note, update the plan, report what changed.
4. Repeat 1–6 times until production-ready.
5. Finally: *"add a detailed todo list to the plan. Don't implement yet."*

Never jump to code from a first-draft plan.

### Phase 4 — Execute
Only after plan + todo list are approved. Execution contract:

> Implement it all. When you finish a task or phase, mark it **completed in the plan document**. Do not stop until all tasks and phases are done. Do not add unnecessary comments or JSDoc. Do not use `any` or `unknown` types. Continuously run typecheck.

- Implementation is mechanical — all decisions were made in planning.
- Keep the todo list in `plan.md` updated as a live progress tracker (it survives context compaction).
- Run typecheck / tests continuously.
- If an approach turns out wrong, **revert and re-scope** rather than patching incrementally.
- Match existing patterns; don't introduce new conventions mid-stream.

## Artifacts

| File | Role |
| --- | --- |
| `research.md` | Deep understanding of current code. Review surface for Phase 1. |
| `plan.md` | Implementation plan + inline annotations + todo list. Lives through the whole build. |
| `DECISIONS.md` | Log of finalized decisions and their rationale. |

## Code conventions

- No `any` or `unknown` types.
- No unnecessary comments or JSDoc.
- Match surrounding code style; don't introduce new conventions mid-stream.
