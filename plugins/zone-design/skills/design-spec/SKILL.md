---
name: design-spec
description: Use when a Zone PM or designer starts shaping a new feature, screen, redesign, or product flow and needs a design specification and/or a Claude Design prompt grounded in Zone's design strategy. Use when asked to "design", "spec out", "write a PRD for", or "make a Claude Design prompt for" a Zone product surface.
---

# Zone Design Spec

## Overview
Layer Zone's design strategy onto superpowers to produce two artifacts: a **design
specification** and a ready-to-paste **Claude Design prompt**. Orchestrate only — do not
reimplement brainstorming.

**REQUIRED SUB-SKILL:** superpowers:brainstorming is the conversation engine.
**Visual identity (color, type, tokens) lives in Claude Design — never restate it.**

## Workflow

Announce: "Using the Zone design-spec skill."

1. **Load context.** Read all three `references/` files (design strategy, spec template,
   prompt template) before asking anything.
2. **Confirm save location.** Write to the user's own location, never this repo. Default
   `./docs/superpowers/{specs,prompts}`; if not in a project directory, fall back to
   `~/zone-design-specs/<slug>/`. Confirm first; create `plans/` and `roadmap/` only on demand.
3. **Intake — one question at a time.** Open: "I'll ask a few short questions one at a time —
   paste a link, file path, or text for each, or type **skip**. The more you share, the less
   I'll ask later." Ask these in order, one by one, waiting for each answer (never dump the
   list); accept **skip** for any:
   - Project name + tracker ID (the Jira design ticket)?
   - In 1–2 sentences: what are we building, for which finance persona/job? What does success
     look like?
   - Functional design doc?
   - Technical design doc?
   - PRD / user stories / acceptance criteria?
   - Other context — research, Gong calls, Slack threads, prior decisions?
   - Which existing screens does this touch? Figma links for them?
   - Screenshots of the current screens?
   - Any POC, competitor, or inspiration references?

   Ingest each item as it's given (Atlassian MCP = Jira/Confluence, Google Drive MCP =
   Docs/Slides, Figma MCP = Figma, WebFetch = public URLs, Read = local files/images). Save
   screenshots to `specs/screenshots/`. Pre-fill the spec; flag skips/gaps as open questions
   rather than stalling. Then summarize captured-vs-missing.
4. **Brainstorm with Zone lenses.** Invoke `/superpowers:using-superpowers` (it routes into
   `/superpowers:brainstorming`). Add the questions the stock flow omits: which of the 4 Core
   Values / 4 Interface Principles apply, the finance persona/job, design-system implications
   (Ant / ZIN UI Kit, gaps), every state (empty/loading/error/success), and UI copy against
   the voice rules. **Tell the user to say yes when brainstorming offers the Visual Companion**
   — its mockups and diagrams help shape the prototype.
5. **Write the spec** to `specs/` from `design-spec-template.md`: fill the header, tag open
   questions (🚦/🧭/💼/✅), map acceptance criteria.
6. **Generate the Claude Design prompt automatically** once the spec is approved, to `prompts/`
   from `claude-design-prompt-template.md`. Self-review: map each spec section to a prompt
   section; confirm no color/type restated, out-of-scope mirrors the spec, named states match.
   Extending an existing prototype → use the follow-up prompt pattern.
7. **Stop.** Hand over the spec + prompt; point to `/superpowers:writing-plans` for a plan. Do
   not write the plan here.

## Red flags — STOP
- Restating colors, fonts, or tokens → they live in Claude Design.
- Writing outputs into this plugin repo → they go to the user's location.
- Skipping intake or asking cold mid-brainstorm → run intake first.
- Producing the implementation plan here → that's `/superpowers:writing-plans`.
